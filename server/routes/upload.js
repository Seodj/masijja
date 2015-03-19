var express = require('express');
var router = express.Router();
var util = require('util');
var fs = require('fs');
var gm = require('gm');
var formidable = require('formidable');

var filedir = "files/";
var imagedir = "files/image/";

var thumbSize = 100;

router.post('/thumb', function(req, res, next) {
    fileUpload(req, res, next, function(req, res, next) {
        gm(req.body.thumbnail)
        .noProfile()
        .gravity('Center')
        .thumb(thumbSize, thumbSize, req.body.thumbnail,90, function(err){
            if(err) {
                return next(err);
            }
            res.send({thumbnail : req.body.thumbnail, flag : true});
        });
    });
})

router.post('/', function(req, res, next) {
    fileUpload(req, res, next, function(req, res, next) {
        console.log('im callback');
        console.log(req.body);
        res.send(req.body);
    });
})

var fileUpload = function(req, res, next, callback) {
    var date = new Date();
    var form = new formidable.IncomingForm();
    form.uploadDir =  imagedir + date.getFullYear() + (date.getMonth()+1) + date.getDate();

    console.log(form.uploadDir);
    if (!fs.existsSync(form.uploadDir)) {
        console.log('dir not exist - make : ' + form.uploadDir);
        fs.mkdirSync("./" + form.uploadDir);
    }

    form.keepExtensions = true;

    form.on('error', function(err) {
            console.log('err');
            throw err;
        })
        .on('field', function(field, value) {
            console.log(field, value);
            req.body[field] = value;
        })
        .on ('fileBegin', function(name, file){
            file.path = form.uploadDir + "/" + file.name;
         })
        .on('file', function(field, file) {
            req.body[field] = file.path;
            console.log('file uploaded in \'' + file.path + '\'');
        })
        .on('end',function(req,res){
            console.log('form parse end');
        });

    console.log('parse start');
    form.parse(req, function(err){
        if (err) {
            console.log('err : ' + err);
            return next(err);
        }
        if (callback) {
            return callback(req, res, next);
        }

        return next(new Error('callback is undefined'));
    });
};

module.exports = router;
module.exports.fileUpload = fileUpload;
// module.exports = {fileUpload : fileUpload};