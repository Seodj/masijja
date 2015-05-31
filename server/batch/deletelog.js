var mongoose = require('mongoose');
var User = require('../models/user');
var Group = require('../models/group');

mongoose.connect('mongodb://localhost/masijja');

var TEN_DAY_MILLISEC = 1008000000;

var userFinish = false;
var groupFinish = false;

//todo: 10일마다 log 10일만 남기고 삭제
User.update({},{$pull: {logs:  { date: { $lt : new Date() - TEN_DAY_MILLISEC}}}},{multi: true},function(err,user){
   if(err){
       console.log(err);
   }
   userFinish = true;
   isAllFinish();
   console.log('delete user log end');
});

Group.update({},{$pull: {logs:  { date: { $lt : new Date() - TEN_DAY_MILLISEC}}}},{multi: true},function(err,group){
   if(err){
       console.log(err);
   }
   groupFinish = true;
   isAllFinish();
   console.log('delete group log end');
});

function isAllFinish(){
	if( userFinish && groupFinish ) {
   		console.log('all deletelog end');
		process.exit(0);
   }
}
