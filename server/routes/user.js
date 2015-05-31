var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Group = require('../models/group');
var Food = require('../models/food');

//음식 업데이트
router.put('/food/:_id', function(req, res, next) {
  if (!req.params._id || !req.body.foodid) {
    return next(new Error('invalid params'));
  }
  var userid = req.params._id;
  var foodid = req.body.foodid;

  console.log(userid + " " + foodid);
  // Food.findByIdAndUpdate(userid, {"todayfood" : foodid}, function(err, user) {
  User.findByIdAndUpdate(userid, {"todayfood" : foodid}, function(err, user) {
    console.log(user);
    if (err) {
      return next(err);
    }

    res.send({user : user, flag : true});
  })
})

router.post('/', function(req, res, next) {
  var userModel = new User(req.body);

  console.log(userModel);

  userModel.save(function(err, user) {
    if (err) {
      return next(err);
    }

    res.send(user);
  });
});

router.get('/', function(req, res, next) {
  User.find().exec(function(err, users) {
    if (err) {
      return next(err);
    }

    res.send(users);
  });
});

router.get('/:_id', function(req, res, next){
  if (!req.params._id) {
    return next(new Error('invalid params'));
  }

  var userId = req.params._id;
  User.findById(userId, function(err, user){
    if (err) {
      return next(err);
    }
    res.send(user);
	console.log(user);
  })
});

router.get('/findkey/:key', function(req, res, next){
  if (!req.params.key) {
    res.send({isValidKey: false});
  }
  else{
    var key = req.params.key;
    console.log(key);
    User.find({keys : key}, function(err, user){
      if (err) {
        return next(err);
      }
      if ( user == "") {
        console.log("user not exist");
        res.send({isValidKey: false});
      } else {
        console.log(user);
        console.log("user exist");
        res.send({isValidKey: true});
      }
    });
  }
});

router.put('/:_id', function(req, res, next){
  var user = {
    name : req.body.name,
    comments : req.body.comments
  }

  if (req.body.thumbnail) {
    user.thumbnail = req.body.thumbnail;
  }
  console.log(user);

  User.findByIdAndUpdate(req.params._id, user, function(err, user){
      if (err) {
        return next(err);
      }
      res.send(user);
  });
});

router.delete('/:_id', function(req, res, next){
  User.remove({email: req.params._id}, function(err) {
    if (err) {
      return next(err);
    }
    res.send();
  });
});

router.get('/result/:_id', function(req, res, next) {
  var userId = req.params._id;

  Group.find({users : userId}).populate('todayfood').exec(function(err, groups) {
    if (err) {
      return next(err);
    }

    res.send(groups);
  })
});

// todo: 음식선택페이지에 이미 선택한 todayfood 사진보여주기
router.get('/todayfood/:_id', function(req, res){
  if (!req.params._id) {
    res.send(new Error('invalid params'));
  }
  var userId = req.params._id;
  User.findById(userId, function(err, user){
    if (err) {
      res.send(err);
    }
  	if(user != undefined){
  		Food.findById(user.todayfood, function(err, food){
  		  if (err) {
  			res.send(err);
  		  }
  		  res.send(food);
  		});
  	}
  })
});

router.put('/deleteTodayFood/:_id', function(req, res, next){
  if (!req.params._id) {
    console.log("no user id");
    return;
  }

  var userid = req.params._id;
  User.findByIdAndUpdate(userid, {$unset: {todayfood: ""}}, function(err, user){
      if (err) {
        return next(err);
      }
      console.log(user);
      res.send(user);
  });
});

module.exports = router;
