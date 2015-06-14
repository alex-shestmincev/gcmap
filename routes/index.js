var gcmapParser = require('gcmap-parser');
var Airports = require('../models/Airports');





exports.index = function(req, res){
  Airports.getSavedObjects(function(data){
    res.render('index', { title: 'Express', airports: data.reverse() });
  });

};

exports.delete = function(req, res){
  var key = req.params.key;
  Airports.deleteByKey(key,function(){
    res.redirect('/');
  });

};

exports.update = function(req, res){
  Airports.UpdateByKey(req.body,function(){
    res.redirect('/');
  });

};

exports.indexpost = function(req, res){
  var key = req.body.key;
  gcmapParser.parse(key,function(data){

    Airports.saveNewObj(key,data, function(airports){
      res.render('index', { title: 'Express', airports: airports.reverse() });
    });

  });

};