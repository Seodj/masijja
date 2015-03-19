var express = require('express');
var router = express.Router();
var User = require('../models/user');
var AccessInfo = require('../models/accessinfo');
var nodemailer = require('nodemailer');


router.post('/', function(req, res, next) {
    if (!req.body.email) {
        return next(new Error('invalid params'));
    }
    var data = {};
    //code key 생성 
    var generatedCode = "" + Math.floor((Math.random() * 10000) + 10000);
    data.code = generatedCode.slice(1,5);
    data.key = Math.floor((Math.random() * 100000000000) + 100000000000).toString(16);

    data.email = req.body.email;

    var accessInfo = new AccessInfo(data);
    accessInfo.save(function (err, resultInfo){
        if (err) {
            return next(err);
        }
        //todo : send email
        sendEmail(resultInfo.email, resultInfo.code);
        res.send({id : resultInfo._id});
    });
});

function sendEmail(email, code) {
    var smtpTransport = nodemailer.createTransport('SMTP', {
        service: "Gmail",
        auth: {
            user : "masijja7@gmail.com",
            pass: "masijjamasijja"
        }
    });

    var mailOptions = {
        from: "masijja <masijja7@gmail.com>",
        to: email,
        subject: "마.시.짜 인증번호",
        html : "인증번호 :<strong>" + code + "</strong>"
    };

    console.log(code + ':: fake message send to ' + mailOptions.to);
    // smtpTransport.sendMail(mailOptions, function(error, response) {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log('message send to ' + mailOptions.to + ' code ' + code);
    // })
}

router.put('/:_id', function(req, res, next) {
    if (!req.params._id || !req.body.code) {
        return next(new Error('invalid params'));
    }

    var id = req.params._id;
    var code = req.body.code;

    AccessInfo.findById(id, function(err, accessInfo) {
        if (err) {
            return next(err);
        }
        console.log(accessInfo);
        if (!accessInfo || accessInfo.code != code) {
            console.log('invalid Code error');
            return next(new Error('invalid code error'));
        }

        User.findOne({email : accessInfo.email}, function(err, user) {
            if (err) {
                return next(err);
            }

            if (user) {
                user.keys = undefined;
            }

            res.send({user : user, key : accessInfo.key, flag : true});
        });
    });
});

router.post('/:_id', function(req,res, next) {
    if (!req.params._id || !req.body.name || !req.body.code) {
        return next(new Error('invalid params'));
    }

    AccessInfo.findOne({_id : req.params._id, code : req.body.code}, function(err, accessinfo) {
        if (err || !accessinfo) {
            return next('invalid params');
        }

        var params = {
            "email" : accessinfo.email,
            "name" : req.body.name,
            "created" : Date.now()
        };

        if (req.body.thumbnail) {
            params.thumbnail = req.body.thumbnail;
        }
        if (req.body.comments) {
            params.comments = req.body.comments;
        }
        console.log("accessinfo = " + accessinfo);
        console.log("params1 = " + params.email);

        var xx = {$set : params, $push : {keys : accessinfo.key}};
        User.findOneAndUpdate({email : params.email}, xx, {upsert : true}, function(err, user) {
            if (err) {
                return next(err);
            }

            if (!user) {
                return next(new Error('user not found'));
            }
            console.log('user = ' + user);
            user.keys = undefined;
            res.send({user : user, key : accessinfo.key});
        });
    })

    
});

module.exports = router;
