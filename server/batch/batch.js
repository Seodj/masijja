var mongoose = require('mongoose');
var User = require('../models/user');
var Group = require('../models/group');
var Food = require('../models/food');
var GroupResult = require('../models/groupresult');

mongoose.connect('mongodb://localhost/masijja');

// Group.find().deepPopulate('users.todayfood').exec(function (err, groups) {
// 	console.log(groups[0].users[0].todayfood);
// });

var USER_SELECT_VALUE = 100;
var GROUP_ATE_VALUE = -37;
var DAY_MILLISEC = 86400000;

function choiceGroupFood(group) {
	var result = {groupid : group._id, result : []};
	var foods = group.users.map(function(user){ 
		if (user.todayfood) {
			return {foodid : user.todayfood.toString(), value : USER_SELECT_VALUE}
		}
	});

	var ids = [], values = [];

	// log로 인한 변수 추가
	foods = foods.concat(group.logs.map(function(log, index, arr){ 
		var dayTerm = Math.ceil((new Date() - log.date) / DAY_MILLISEC);
		var ateValue = GROUP_ATE_VALUE * group.users.length;
		return {foodid : log.foodid.toString(), value : Math.round(ateValue / dayTerm)}
	}));

	// 분석 및 추가 
	foods.forEach(function(food) {
		if (!food) {
			return;
		}
		var foodid = food.foodid;
		var index = ids.indexOf(foodid);

		if (index < 0) {
			index = ids.push(foodid) - 1;
			values[index] = 0;
		}

		values[index] += food.value;
	});

	var max = Math.max.apply(null, values);
	var todayfood = ids[values.indexOf(max)];

	ids.forEach(function(id, index) {
		result.result.push({foodid : id, value : values[index]});
	});

	result.todayfood = todayfood;
	////다 구한뒤 가장 높은 values 검색
	return result;
}

var promise = Group.find().populate('users').exec();
promise.then(function(groups){
	var resultTable = [];
	groups.forEach(function(group) {
		var result = choiceGroupFood(group);
		resultTable.push(result);
	});

	// 저장
	var resultCount = resultTable.length;
	var todayfoodCount = resultTable.length;
	for(var index in resultTable){
		var groupresult = new GroupResult(resultTable[index]);

		groupresult.save(function(err, result) {
			resultCount--;
			if ( resultCount <= 0 && todayfoodCount <= 0) {
				console.log('batch end');
				process.exit(0);
			}
		});

		Group.findOneAndUpdate({_id: resultTable[index].groupid},{todayfood: resultTable[index].todayfood}, function(err,todayfood){
			todayfoodCount--;
			if ( resultCount <= 0 && todayfoodCount <= 0) {
				console.log('batch end');
				process.exit(0);
			}
		});
	}
	
});


//process.exit(0);
