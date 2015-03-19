var mongoose = require('mongoose');
var User = require('../models/user');
var Group = require('../models/group');
var GroupResult = require('../models/groupresult');

mongoose.connect('mongodb://localhost/masijja');

var result = { name : {} , value: {}};

GroupResult.find().exec(function(err,groupresult) {
	 if(err){
	   console.log(err);
	 }
	 for(var index in groupresult){
	 	var max = groupresult[index].result[0].value;
		var maxIndex = 0;
		for(var index2 in groupresult[index].result){
		    if (groupresult[index].result[index2].value > max) {
		        maxIndex = index2;
		        max = groupresult[index].result[index2].value;
		    }
		}
		Group.update({_id:groupresult[index].groupid},{todayfood : groupresult[index].result[maxIndex].foodid},function(err,group){
			if(err){
				console.log(err);
			}
			console.log(group);
		});
	 }
});