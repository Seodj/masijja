var mongoose = require('mongoose');
var User = require('../models/user');
var Group = require('../models/group');
var GroupResult = require('../models/groupresult')

mongoose.connect('mongodb://localhost/masijja');

User.update({},{$unset: {todayfood: ""} },{upsert :true, multi : true},function(err,user){
	 if(err){
	   console.log(err);
	 }
	 console.log('삭제');
});

Group.update({},{$unset: {todayfood: ""} },{upsert :true, multi : true},function(err,group){
	 if(err){
	   console.log(group);
	 }
	 console.log('삭제');
});

GroupResult.remove().exec(function(err,group){
   if(err){
       console.log(err);
       }
       console.log(group);
});