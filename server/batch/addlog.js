var mongoose = require('mongoose');
var User = require('../models/user');
var Group = require('../models/group');

mongoose.connect('mongodb://localhost/masijja');

//todo: 로그 추가(밤 11시?? 하루 한번)
User.find().exec(function(err, users) {
	if (err) {
		console.log(err);
	}
	for (var index in users) {
		if(users[index].todayfood==undefined){
			console.log("todayfood is not exist.");
			continue;
		}
		User.update({_id : users[index]._id}, {$push: { logs : {foodid: users[index].todayfood} }}, function (err, user) {
			if (err) {
				console.log(err);
			}
			console.log('user log add');
		});
	}
});

Group.find().exec(function(err, groups) {
	if (err) {
		console.log(err);
	}
	for (var index in groups) {
		if(groups[index].todayfood==undefined){
			console.log("todayfood is not exist.");
			continue;
		}
		Group.update({_id : groups[index]._id}, {$push: { logs : {foodid: groups[index].todayfood} }}, function (err, group) {
			if (err) {
				console.log(err);
			}
			console.log('group log add');
		});
	}
});