var express = require('express');
var router = express.Router();
var User = require('../models/user');


router.get('/foods', function(req, res) {
  var foods = [
    { "Name" : "짜장", "Thumbnail" : "http://star.koreandrama.org/wp-content/uploads/2011/05/JooJinMo1958.jpg", "Description" : "짜장짜장"},
    { "Name" : "한식", "Thumbnail" : "", "Description" : "한국식"},
    { "Name" : "짬뽕", "Thumbnail" : "http://star.koreandrama.org/wp-content/uploads/2011/05/JooJinMo1958.jpg", "Description" : "짜장짬뽕"},
    { "Name" : "커피", "Thumbnail" : "", "Description" : "씀"},
    { "Name" : "허니자몽티", "Thumbnail" : "", "Description" : "닮"},
    { "Name" : "콜라", "Thumbnail" : "", "Description" : "쏨"},
    { "Name" : "김밥", "Thumbnail" : "", "Description" : "말림"},
    { "Name" : "라면", "Thumbnail" : "", "Description" : "3분"}
    ];

  res.send(foods);
});


module.exports = router;
