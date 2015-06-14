var http = require('http');
var gcmapParser = require('gcmap-parser');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var airports_path = path.join(__dirname, '../data/airports.json');

function saveNewObj(key,obj, callback){
  getSavedObjects(function(data){
    obj.key = key;

    var index =_.findIndex(data, 'key', key);
    if (index != -1){
      data[index] =obj;
    }else{
      data.push(obj);
    }

    fs.writeFile(airports_path, JSON.stringify(data), function (err) {
      if (err) return console.log(err);
      callback(data);
    });
  });
}

function getSavedObjects(callback){
  fs.readFile(airports_path, function (err, data) {
    if (err) throw err;
    if (data.length > 0){
      data = JSON.parse(data);
    }else{
      data = [];
    }
    callback(data);
  });
}

function deleteByKey(key,callback){
  getSavedObjects(function(data){
    var index =_.findIndex(data, 'key', key);
    if (index === -1){
      callback();
    }else{
      data.splice(index,1);
    }

    fs.writeFile(airports_path, JSON.stringify(data), function (err) {
      if (err) return console.log(err);
      callback();
    });
  });
}

function UpdateByKey(params,callback){
  var key = params.key;
  var valid = validateParams(params);
  if (valid){
    getSavedObjects(function(data){
      var index =_.findIndex(data, 'key', key);
      if (index === -1){
        throw new Error("No key find");
      }else{
        data[index] = params;
      }

      fs.writeFile(airports_path, JSON.stringify(data), function (err) {
        if (err) return console.log(err);
        callback();
      });
    });
  }

}

function validateParams(params){
  var key = params.key,
    name = params.name,
    latitude = params.latitude,
    longitude = params.longitude,
    timezone = params.timezone;

  var keyMatches = /^(\w{3})$/.test(key);
  var nameMatches = /^[\w\s]+$/.test(name);
  var latMatches = /\(\d{1,2}([.]\d+)\)/.test(latitude);
  var longMatches = /\(\d{1,3}([.]\d+)\)/.test(longitude);
  var timezoneMatches = /^(UTC)[-+]\d/.test(timezone);

  if (keyMatches === false){
    throw new Error("Field 'key' is invalid");
  }else if(nameMatches === false){
    throw new Error("Field 'name' is invalid");
  }else if(latMatches === false){
    throw new Error("Field 'latitude' is invalid");
  }else if(longMatches === false){
    throw new Error("Field 'longitude' is invalid");
  }else if(timezoneMatches === false){
    throw new Error("Field 'timezone' is invalid");
  }

  return true;
}



exports.index = function(req, res){
  getSavedObjects(function(data){
    res.render('index', { title: 'Express', airports: data.reverse() });
  });

};

exports.delete = function(req, res){
  var key = req.body.key;
  deleteByKey(key,function(){
    res.redirect('/');
  });

};

exports.update = function(req, res){
  UpdateByKey(req.body,function(){
    res.redirect('/');
  });

};

exports.indexpost = function(req, res){
  var key = req.body.key;
  gcmapParser.parse(key,function(data){

    saveNewObj(key,data, function(airports){
      res.render('index', { title: 'Express', airports: airports.reverse() });
    });

  });

};