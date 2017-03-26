'use strict';

var express = require('express');
var router = express.Router();

var User = require('../../models/User');
var cap1 = require('../../apis/capital_one.js');

function findUser(req, cb) {
  if (!req.query.phoneNumber && !req.body.phoneNumber)
    return cb({
      status: 404,
      message: "query parameter phoneNumber must be supplied"
    });

  var pn = req.query.phoneNumber;
  if (!pn)
    pn = req.body.phoneNumber;
  User.findOne({ 'phoneNumber': pn }, function(err, user) {
    if (err)
      return cb(err);
    if (!user)
      return cb({
        status: 404,
        message: "User not found"
      });

    cb(null, user);
  });
}


router.get('/', function(req, res, next) {
  User.find(function(err, users) {
    if (err)
      return next(err);

    res.json({
      success: true,
      users: users
    });
  });
});


/**
 * @api {post} /api/users Create Users
 * @apiName PostUsers
 * @apiGroup Users
 * @apiDescription Create a new User
 * @apiParam {String} firstName
 * @apiParam {String} lastName
 * @apiParam {String} password
 * @apiParam {String} phoneNumber
 * @apiParam {String} [username]
*/
router.post('/', function(req, res, next) {
  if (!req.body.firstName || !req.body.lastName)
    return next({
      status: 400,
      message: "Must supply first and last name"
    });

  cap1.createAccount(req.body.firstName, req.body.lastName, function(err, body) {
    if (err)
      return next(err);

    req.body.nessieId = body.objectCreated.customer_id;
    req.body.accountId = body.objectCreated._id;
    User.create(req.body, function(err, user) {
      if (err) {
        return next(err);
      }
      res.json({
        success: true,
        user: user
      });
    });
  });
});


/**
 * @api {get} /api/users/auth Authenticate User
 * @apiName GetUserAuth
 * @apiGroup Users
 * @apiDescription Authenticate a user with phone number
 * @apiParam {String} phoneNumber
*/
router.get('/auth', function(req, res, next) {
  findUser(req, function(err, user) {
    if (err)
      return next(err);
    res.json({
      success: true,
      user: user
    });
  });
});


/**
 * @api {post} /api/users/purchase Create User Purchase
 * @apiName PostUserPurchase
 * @apiGroup Users
 * @apiDescription Make a purchase for the user
 * @apiParam {String} phoneNumber
 * @apiParam {Number} amount
 * @apiParam {String} company
 * @apiParam {String} date
*/
router.post('/purchase', function(req, res, next) {
  findUser(req, function(err, user) {
    if (err)
      return next(err);
    if (!req.body.amount || !req.body.company || !req.body.date)
      return next({
        status: 400,
        message: "Proper parameters must be provided"
      });

    req.body.amount = Number(req.body.amount);

    cap1.makePurchase(
      user.accountId,
      req.body.amount,
      req.body.company,
      new Date(req.body.date),
      function(err, data) {
        // console.log(data);
        if (data.code >= 400)
          return next({
            status: data.code,
            err: data
          });
        res.json({ success: true });
      }
    );
  });
});


/**
 * @api {get} /api/users/purchases Get User Purchases
 * @apiName GetUserPurchases
 * @apiGroup Users
 * @apiDescription Get a users purchases
 * @apiParam {String} phoneNumber
*/
router.get('/purchases', function(req, res, next) {
  findUser(req, function(err, user) {
    if (err)
      return next(err);
    cap1.getPurchases(user.accountId, function(err, data) {
      if (err)
        return next(err);
      res.json({
        success: true,
        purchases: data
      });
    });
  });
});

/**
 * @api {get} /api/users/delete-purchases Delete User Purchases
 * @apiName DeleteUserPurchases
 * @apiGroup Users
 * @apiDescription Delete a users purchases
 * @apiParam {String} phoneNumber
*/
router.get('/delete-purchases', function(req, res, next) {
  findUser(req, function(err, user) {
    if (err)
      return next(err);
    cap1.clearPurchases(user.accountId);
    res.json({
      success: true
    });
  });
});

/**
 * @api {get} /api/users/delete-account Delete User Account
 * @apiName DeleteUserPurchases
 * @apiGroup Users
 * @apiDescription Delete a users account
 * @apiParam {String} phoneNumber
*/
router.get('/reset', function(req, res, next) {
  findUser(req, function(err, user) {
    if (err)
      return next(err);
    User.remove({ _id: user._id }, function(err) {
      if (err)
        return next(err);
      cap1.createAccount(user.firstName, user.lastName, function(err, body) {
        if (err)
          return next(err);

        var doc = {};
        doc.nessieId = body.objectCreated.customer_id;
        doc.accountId = body.objectCreated._id;
        doc.firstName = user.firstName;
        doc.lastName = user.lastName;
        doc.phoneNumber = user.phoneNumber;
        doc.password = user.password;
        console.log(doc);
        User.create(doc, function(err, user) {
          if (err) {
            return next(err);
          }
          res.json({
            success: true,
            user: user
          });
        });
      });
    })
  });
});


/**
 * @api {get} /api/users/user-proportional-purchases Get Proportional Purchases
 * @apiName GetUserProportionalPurchases
 * @apiGroup Users
 * @apiDescription Get the proportion of user's purchases
 * @apiParam {String} phoneNumber
*/
router.get('/user-proportional-purchases', function(req, res, next) {
  findUser(req, function(err, user) {
    if(err)
      return next(err);
    cap1.getPurchases(user.accountId, function(err, data) {
      if(err)
        return next(err);
      // Constructing a custom object to send back
      var mapping = {};
      var ret = [];
      var total = 0;
      for(var i = 0; i < data.length; ++i) {
        total += data[i].amount;
        if(mapping.hasOwnProperty(JSON.parse(data[i].description).symbol)) {
          mapping[JSON.parse(data[i].description).symbol].amount += data[i].amount;
        } else {
            mapping[JSON.parse(data[i].description).symbol] = {
              "amount": data[i].amount,
              "percentage": 0
          };
        }
      }

      for(var key in mapping) {
        if(mapping.hasOwnProperty(key)) {
            mapping[key].percentage = mapping[key].amount / total;
          }
        }

      for(key in mapping) {
          if(mapping.hasOwnProperty(key)) {
            var currObject = {
              "ticker": key,
              "amount": mapping[key].amount,
              "percentage": mapping[key].percentage
            };
          ret.push(currObject);
          }
      }

      res.json(ret);

    });
  });
});


/**
 * @api {get} /api/users/company-data Get a Company's Historical Market Data
 * @apiName GetCompanyData
 * @apiGroup Users
 * @apiDescription Gets a company's historical stock data
 * @apiParam {String} company ticker
*/
router.get('/company-data', function(req, res, next) {
  dailyChart(req, function(err, data) {
    if(err)
      return next(err);
    res.json(data);
  });
});


router.get('/the-beast', function(req, res, next) {
  findUser(req, function(err, user) {
    if(err)
      return next(err);
  });
});

module.exports = router;
