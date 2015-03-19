var mongoose = require('mongoose');
var Food = require('../models/food');

mongoose.connect('mongodb://localhost/masijja');

var food_data = {
	name : "짜장면",
	thumbnail : "files/image/testimg/zzajang.jpg",
	description : "일요일은 내가 짜파게티는 개뿔 짜장면"
};

var food = new Food(food_data);

food.save(function(err, food) {
	if(err) {
		console.log(err);
		return err;
	}
	console.log(food);
});

var food_data = {
	name : "부대찌개",
	thumbnail : "files/image/testimg/budae.jpg",
	description : "보글보글 스팸찌개"
};

var food = new Food(food_data);

food.save(function(err, food) {
	if(err) {
		console.log(err);
		return err;
	}
	console.log(food);
});

var food_data = {
	name : "라면",
	thumbnail : "files/image/testimg/ramen.jpg",
	description : "싸고 맛있는 라면"
};

var food = new Food(food_data);

food.save(function(err, food) {
	if(err) {
		console.log(err);
		return err;
	}
	console.log(food);
});

var food_data = {
	name : "장어",
	thumbnail : "files/image/testimg/janga.jpg",
	description : "힘이 넘쳐흐른다 우워어워워워어"
};

var food = new Food(food_data);

food.save(function(err, food) {
	if(err) {
		console.log(err);
		return err;
	}
	console.log(food);
});

var food_data = {
	name : "치킨",
	thumbnail : "files/image/testimg/chicken.jpg",
	description : "바삭바삭한 튀김옷을 입은 치킨"
};

var food = new Food(food_data);

food.save(function(err, food) {
	if(err) {
		console.log(err);
		return err;
	}
	console.log(food);
});


