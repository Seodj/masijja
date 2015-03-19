var mongoose = require('mongoose');
var User = require('../models/user');
var Food = require('../models/food');
mongoose.connect('mongodb://localhost/masijja');

Food.find().exec(function(err,foods){

var user_data = {
	name : "서동진",
	email : "abc1@naver.com",
	thumbnail : "files/image/testimg/짜장면.jpg",
	todayfood : foods[0]._id,
	keys : "12345",
	comments : "임시데이터입니돠",
	created : new Date()
};

var user = new User(user_data);

user.save(function(err, user) {
	if(err) {
		console.log(err);
		return err;
	}
	console.log(user);
});

var user_data = {
	name : "서동진2",
	email : "abc2@naver.com",
	thumbnail : "files/image/testimg/짜장면.jpg",
	todayfood : foods[0]._id,
	keys : "12345",
	comments : "임시데이터입니돠",
	created : new Date()
};

var user = new User(user_data);

user.save(function(err, user) {
	if(err) {
		console.log(err);
		return err;
	}
	console.log(user);
});

var user_data = {
	name : "김형재",
	email : "NTS@naver.com",
	thumbnail : "files/image/testimg/부대찌개.jpg",
	todayfood : foods[1]._id,
	keys : "12345",
	comments : "임시데이터입니돠",
	created : new Date()
};

var user = new User(user_data);

user.save(function(err, user) {
	if(err) {
		console.log(err);
		return err;
	}
	console.log(user);
});

var user_data = {
	name : "재형김",
	email : "NOOOOOM@naver.com",
	thumbnail : "files/image/testimg/부대찌개.jpg",
	todayfood : foods[1]._id,
	keys : "12345",
	comments : "임시데이터입니돠",
	created : new Date()
};

var user = new User(user_data);

user.save(function(err, user) {
	if(err) {
		console.log(err);
		return err;
	}
	console.log(user);
});

var user_data = {
	name : "진동서",
	email : "YEEEEEEEESSSSS@naver.com",
	thumbnail : "files/image/testimg/부대찌개.jpg",
	todayfood : foods[1]._id,
	keys : "12345",
	comments : "임시데이터입니돠",
	created : new Date()
};

var user = new User(user_data);

user.save(function(err, user) {
	if(err) {
		console.log(err);
		return err;
	}
	console.log(user);
});

var user_data = {
	name : "석인송",
	email : "GOOOOOOOOODDDDDDD@naver.com",
	thumbnail : "files/image/testimg/치킨.jpg",
	todayfood : foods[4]._id,
	keys : "12345",
	comments : "임시데이터입니돠",
	created : new Date()
};

var user = new User(user_data);

user.save(function(err, user) {
	if(err) {
		console.log(err);
		return err;
	}
	console.log(user);
});

var user_data = {
	name : "인송석",
	email : "MOOOOOOOONNNNNN@naver.com",
	thumbnail : "files/image/testimg/치킨.jpg",
	todayfood : foods[4]._id,
	keys : "12345",
	comments : "임시데이터입니돠",
	created : new Date()
};

var user = new User(user_data);

user.save(function(err, user) {
	if(err) {
		console.log(err);
		return err;
	}
	console.log(user);
});

});