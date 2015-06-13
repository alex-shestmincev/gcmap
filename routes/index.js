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



exports.index = function(req, res){
  getSavedObjects(function(data){
    res.render('index', { title: 'Express', airports: data.reverse() });
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