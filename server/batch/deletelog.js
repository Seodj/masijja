var mongoose = require('mongoose');
var User = require('../models/user');
var Group = require('../models/group');

mongoose.connect('mongodb://localhost/masijja');

//todo: 10일마다 log 10일만 남기고 삭제
User.update({},{$pull: {logs:  { date: { $lt : new Date()-1008000000}}}},{multi: true},function(err,user){
   if(err){
       console.log(err);
       }
       console.log(user);
});

Group.update({},{$pull: {logs:  { date: { $lt : new Date()-1008000000}}}},{multi: true},function(err,group){
   if(err){
       console.log(err);
       }
       console.log(group);
});