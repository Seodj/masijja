var mongoose = require('mongoose');
var User = require('../models/user');
var Group = require('../models/group');
var GroupResult = require('../models/groupresult');

mongoose.connect('mongodb://localhost/masijja');

var result = { foodid : {} , value: {}};
var resultArray = [result];

Group.find().populate('users').exec(function(err,groups) {
	 if(err){
	   console.log(err);
	 }
	 for(var index in groups){
	 	for(var index2 = 0 ; index2 < groups[index].users.length ; index2++){
	 		if(groups[index].users[index2].todayfood!= undefined){
	 			var issame = false;
	 			if(index2==0){
	 						resultArray[0] = {foodid : groups[index].users[index2].todayfood, value : 1};
	 						continue;
	 			}
	 			for(var index3 = 0 ; index3 < resultArray.length ; index3++){
	 				if((resultArray[index3].foodid.toString()).localeCompare(groups[index].users[index2].todayfood)==0){
	 					resultArray[index3].value++;
	 					issame=true;
	 				}
	 			}
	 			if(issame==false){
	 				resultArray[resultArray.length] = {foodid : groups[index].users[index2].todayfood, value : 1};
	 			}
	 		}
	 	}

	 	var result_data = {
			groupid : groups[index]._id,
			result : resultArray,
		};

		var groupresult = new GroupResult(result_data);

	 	groupresult.save(function(err, groupresult) {
			if(err) {
				console.log(err);
				return err;
			}
			console.log(groupresult);
		});
	 	//console.log(resultArray);
	 	resultArray = [result];
	 }
});