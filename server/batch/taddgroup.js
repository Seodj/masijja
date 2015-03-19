var mongoose = require('mongoose');
var Group = require('../models/group');
var User = require('../models/user');
var Food = require('../models/food');
mongoose.connect('mongodb://localhost/masijja');

User.find().select('_id').exec(function(err,user){

Food.find().exec(function(err,food){

	var group_data = {
		name : "멋쟁이그룹",
		created : new Date(),
		users : [user[0], user[1], user[2]],
		admin : user[0],
		comment : "우리는 짜장.",
		logs : [{ foodid : food[0]._id, date : new Date()-86400000},{ foodid : food[1]._id, date : new Date()-172800000}]
	};

	var group = new Group(group_data);

	group.save(function(err, group) {
		if(err) {
			console.log(err);
			return err;
		}
		console.log(group);
	});

	var group_data = {
		name : "부대그룹",
		created : new Date(),
		users : [user[1], user[2], user[3], user[4]],
		admin : user[1],
		comment : "우리는 부대쟁이.",
		logs : [{ foodid : food[1]._id, date : new Date()-86400000},{ foodid : food[3]._id, date : new Date()-172800000}]
	};

	var group = new Group(group_data);

	group.save(function(err, group) {
		if(err) {
			console.log(err);
			return err;
		}
		console.log(group);
	});

	var group_data = {
		name : "치킨그룹",
		created : new Date(),
		users : [user[4], user[5], user[6]],
		admin : user[4],
		comment : "우리는 치킨쟁이.",
		logs : [{ foodid : food[3]._id, date : new Date()-86400000},{ foodid : food[4]._id, date : new Date()-172800000}]
	};

	var group = new Group(group_data);

	group.save(function(err, group) {
		if(err) {
			console.log(err);
			return err;
		}
		console.log(group);
	});


	});
});