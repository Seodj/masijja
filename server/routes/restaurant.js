var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurant');
var ObjectId = require('mongoose').Types.ObjectId;

//get Restaurant
router.get('/', function(req, res, next) {
  Restaurant.find().exec(function(err, restaurants) {
    if(err) {
      return next(err);
    }
    res.send(restaurants);
  });
});

//post Restaurant
router.post('/', function(req, res, next) {
  var restaurant = new Restaurant(req.body);
  restaurant.save(function(err, restaurant) {
    if(err) {
      return next(err);
    }
    res.send(restaurant);
  });
});

//put Restaurant
router.put('/:_id', function(req, res, next) {
  if(!req.params._id) {
    return next(new Error('invalid params'));
  }
  var id = req.params._id;
  var restaurant = {};
  if (req.body.name) {
    restaurant.name = req.body.name;
  }
  if (req.body.description) {
    restaurant.description = req.body.description;
  }
  if(req.body.thumbnail) {
    restaurant.thumbnail = req.body.thumbnail;
  }
  if (req.body.foods) {
    restaurant.foods = req.body.foods;
  }
  if (req.body.pointx) {
    restaurant.pointx = req.body.pointx;
  }
  if(req.body.pointy) {
    restaurant.pointy = req.body.thumbnail;
  }

  Restaurant.findByIdAndUpdate(id, restaurant, function(err, result) {
    if(err) {
      return next(err);
    }

    res.send(result);
  });
});


//관리자 페이지에서 해당 레스토랑의 음식 추가
router.put('/', function(req, res, next) {
  var restaurantId = req.body.restaurantId;
  var foodId = req.body.foodId;
  if(!restaurantId || !foodId) {
    return next(new Error('invalid params'));
  }
  Restaurant.update({_id: restaurantId, foods: { $ne : foodId}}, {$push: {foods: foodId}},  function(err, restaurants) {
    if (err) {
      console.log("error");
      return next(err);
    }
    res.send(restaurants);
  });
});

router.get('/:_id', function(req, res, next){
  var todayFoodId = req.params._id;
  if(!todayFoodId) {
    return next(new Error('invalid params'));
  }
  Restaurant.find({foods:todayFoodId}).populate('foods').exec(function(err, restaurant){
    if(err) {
      return next(err);
    }
    res.send(restaurant);
  });
});

module.exports = router;