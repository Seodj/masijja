var express = require('express');
var router = express.Router();
var Group = require('../models/group');
var User = require('../models/user');
var ObjectId = require('mongoose').Types.ObjectId;
var GroupResult =require('../models/groupresult');

//make Group
router.post('/makeGroup/', function(req, res, next) {
  if (!req.body.name) {
    res.send({nameFlag : true});
    return next(new Error('invalid params'));
  }

  var checkCode = /^\d{4}$/g;
  if(req.body.isCheck && (!req.body.code || !checkCode.test(req.body.code))){
    res.send({codeFlag : true});
    return next(new Error('invalid params'));
  }
  req.body.users = [req.body.admin];
  var groupModel = new Group(req.body);

  console.log(groupModel);
  groupModel.save(function(err, group) {
    if(err) {
      return next(err);
    }
    res.send({group : group, flag : true});
  });
});

router.put('/:_id', function(req, res, next) {
  if (!req.params._id) {
    return next(new Error('invalid params'));
  }

console.log(req.body);
  Group.update({_id: req.params._id}, {$set : req.body}, function(err, group) {
    if (err) {
      return next(new Error('invalid param'));
    }
    res.send(group);
  });
});

//join Groups
router.put('/joinGroup/:_id', function(req, res, next) {
  if(!req.params._id || !req.body.userid) {
    return next(new Error('invalid params'));
  }
  var userId = req.body.userid;
  var groupId = req.params._id;
  var code = req.body.code;
  if(code === undefined){
    code = "";
  }
  Group.findById(groupId, function(err,group){
    if (err) {
      return next(err);
    }
    if (!group || group.code != code) {
      res.send({codeFlag : true});
      console.log("password fault");
      return;
    }
    Group.update({_id: groupId, users: { $ne : userId}, code: code}, {$push: {users: userId}},  function(err, group) {
      if (err) {
        return next(err);
      }
      if (!group) {
        res.send({flag : false});
        return;
      }
      res.send({group : group, flag : true});
    });
  });
});

//outGroup Group
router.put('/outGroup/:_id', function(req, res, next) {
  if(!req.params._id || !req.body.userid) {
    return next(new Error('invalid params'));
  }
  var userId = req.body.userid;
  var groupId = req.params._id;
  Group.update({_id: groupId, admin:{$ne: userId}}, {$pull: {users: userId}},  function(err, group) {
    if (err) {
      return next(err);
    }
    if (!group) {
      res.send({flag : false});
      return;
    }
    res.send({group : group, flag : true});
  });
});

// get All Group
router.get('/allGroupList/', function(req, res, next) {
  Group.find().populate('admin').exec(function(err, groups) {
    if(err) {
      return next(err);
    }
    groups.forEach(function(group, index, groups){
      if(group.code) {
        group.code = true;
      } else {
        group.code = undefined;
      }
    });
    res.send(groups);
  });
});

// get MY Group
router.get('/myGroupList/:_id', function(req, res, next){
  if(!req.params._id) {
    return next(new Error('invalid params'));
  }
  var userId = req.params._id;
  Group.find({users:userId}).populate('users').populate('admin').exec(function(err, group){
    if(err) {
      return next(err);
    }
    res.send(group);
  });
});

// get One Group
router.get('/oneGroup/:_id', function(req, res, next){
  Group.findById(req.params._id).populate('admin').populate('users').exec(function(err, group){
    if(err) {
      return next(err);
    }
    res.send(group);
  });
});

//delete Group
router.put('/deleteGroup/:_id', function(req, res, next){
  if(!req.params._id || !req.body.userid) {
    return next(new Error('invalid params'));
  }
  var groupId = req.params._id;
  var userId = req.body.userid;
  Group.remove({_id : groupId, admin: userId}, function(err, group){
    if (err) {
      return next(err);
    }
    if (!group) {
      res.send({flag : false});
      return;
    }
    res.send({group : group, flag : true});
  });
});

// get my group food
router.get('/myGroupFood/:_id', function(req, res, next){
  if(!req.params._id) {
    return next(new Error('invalid params'));
  }
  var userId = req.params._id;
  Group.find({users:userId}).populate('users').populate('admin').populate('todayfood').exec(function(err, group){
    if(err) {
      return next(err);
    }
    console.log(group);
    res.send(group);
  });
});

// get my group result 
router.get('/myGroupResult/:_id', function(req, res, next){
  if(!req.params._id) {
    return next(new Error('invalid params'));
  }
  var groupId = req.params._id;
  GroupResult.find({groupid:groupId}).populate('result.foodid').exec(function(err, result){
    if(err) {
      return next(err);
    }
    console.log(result);
    res.send(result);
  });
});

module.exports = router;