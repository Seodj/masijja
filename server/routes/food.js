var express = require('express');
var router = express.Router();
var Food = require('../models/food');

router.get('/', function(req, res, next) {
	Food.find().exec(function(err, foods) {
		if(err) {
			return next(err);
		}
		res.send(foods);
	});
});

router.post('/', function(req, res, next) {
	var food = new Food(req.body);

	food.save(function(err, food) {
		if(err) {
			return next(err);
		}

		res.send(food);
	});
});

router.put('/:_id', function(req, res, next) {
	if(!req.params._id) {
		return next(new Error('invalid params'));
	}
	var id = req.params._id;
	var food = {};
	if (req.body.name) {
		food.name = req.body.name;
	}
	if (req.body.description) {
		food.description = req.body.description;
	}
	if(req.body.thumbnail) {
		food.thumbnail = req.body.thumbnail;
	}

	Food.findByIdAndUpdate(id, food, function(err, result) {
		if(err) {
			return next(err);
		}

		res.send(result);
	});
});

router.get('/:_id', function(req, res, next) {
if(!req.params._id) {
		return next(new Error('invalid params'));
	}
	var id = req.params._id;

	Find.findById(function(err, food) {
		if (err) {
			return next(err);
		}

		res.send(food);
	})
});

module.exports = router;