var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Group = require('../models/group');
var Food = require('../models/food');
var GroupResult = require('../models/groupresult');

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

function updateGroupResult(groupresult){
	GroupResult.update({groupid: groupresult.groupid}, {$set : {result : groupresult.result}} , {upsert :true}, function(err, result, next) {
		if(err) {
			console.log(err);
			return;
		}
		console.log(result);
	});
}

function addGroupResult(groupresult){
	groupresult.save(function(err, result, next) {
		if(err) {
			console.log(err);
			return;
		}
		console.log(result);
	});
}

function updateTodayFood(resultTable){
	if(resultTable.todayfood){
		Group.update({_id : resultTable.groupid}, {$set : {todayfood: resultTable.todayfood}}, {upsert :true}, function(err,todayfood,next){
			if(err) {
				console.log(err);
				return;
			}
				console.log("update todayfood");
		});
	}
	else{
		Group.update({_id : resultTable.groupid}, {$unset : {todayfood: ""}}, {upsert :true}, function(err,todayfood,next){
			if(err) {
				console.log(err);
				return;
			}
				console.log("no todayfood");
		});	
	}
}

router.put('/:_id', function(req, res, next){
	if (!req.params._id) {
    	console.log('invalid params');
    	return;
  	}
  	var groupid = req.params._id;

	var promise = Group.findOne({_id:groupid}).populate('users').exec();
		promise.then(function(group){
		var resultTable = [];

		var result = choiceGroupFood(group);
		resultTable.push(result);

		// update
		var groupresult = new GroupResult(resultTable[0]);
		console.log("update result = " + groupresult);

		GroupResult.findOne({groupid: groupresult.groupid}, function(err,result,next){
			if(err){
				console.log(err);
    			return;
			}

			if(result){
				console.log('update groupresult');
				updateGroupResult(groupresult);
			} else{
				console.log('add groupresult');
				addGroupResult(groupresult);
			}

			updateTodayFood(resultTable[0]);
		});
	});
	console.log("update complete");
	res.send("성공");
});

module.exports = router;