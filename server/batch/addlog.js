var mongoose = require('mongoose');
var User = require('../models/user');
var Group = require('../models/group');

mongoose.connect('mongodb://localhost/masijja');

var userCount;
var groupCount;

//todo: 로그 추가(밤 11시?? 하루 한번)
User.find().exec(function(err, users) {
	if (err) {
		console.log(err);
	}
	userCount = users.length;

	for (var index in users) {
		if(users[index].todayfood==undefined){
			console.log("todayfood is not exist.");
			userCount--;
			isAllFinish();
			continue;
		}
		User.update({_id : users[index]._id}, {$push: { logs : {foodid: users[index].todayfood} }}, function (err, user) {
			userCount--;
			if (err) {
				console.log(err);
			}
			isAllFinish();
			console.log('user log add');
		});
	}
});

Group.find().exec(function(err, groups) {
	if (err) {
		console.log(err);
	}
	groupCount = groups.length;

	for (var index in groups) {
		if(groups[index].todayfood == undefined){
			console.log("todayfood is not exist.");
			groupCount--;
			isAllFinish();
			continue;
		}
		Group.update({_id : groups[index]._id}, {$push: { logs : {foodid: groups[index].todayfood} }}, function (err, group) {
			groupCount--;
			if (err) {
				console.log(err);
			}
			isAllFinish();
			console.log('group log add');
		});
	}
});

function isAllFinish(){
	console.log("userCount: ",userCount);
	console.log("groupCount: ",groupCount);
	if ( userCount <= 0 && groupCount <= 0)  {
		console.log('all batch end');
		process.exit(0);
	}
}