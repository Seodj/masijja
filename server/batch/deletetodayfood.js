var mongoose = require('mongoose');
var User = require('../models/user');
var Group = require('../models/group');
var GroupResult = require('../models/groupresult')

mongoose.connect('mongodb://localhost/masijja');

var userFinish = false;
var groupFinish = false;
var groupResultFinish = false;

User.update({},{$unset: {todayfood: ""} },{upsert :true, multi : true},function(err,user){
	 if(err){
	   console.log(err);
	 }
	 userFinish = true;
	 isAllFinish();
	 console.log('delete user todayfood end');
});

Group.update({},{$unset: {todayfood: ""} },{upsert :true, multi : true},function(err,group){
	if(err){
		console.log(err);
	}
	groupFinish = true;
	isAllFinish();
	console.log('delete group todayfood end');
});

GroupResult.remove({}).exec(function(err,group){
	if(err){
		console.log(err);
	}
	groupResultFinish = true;
	isAllFinish();
	console.log('delete groupResult end');
});

function isAllFinish(){
	if( userFinish && groupFinish && groupResultFinish ) {
   		console.log('all deletelog end');
		process.exit(0);
   }
}