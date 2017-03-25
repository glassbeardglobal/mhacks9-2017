'use strict';

var express = require('express');
var router = express.Router();

var User = require('../../models/User');
var cap1 = require('../../apis/capital_one.js');

function findUser(req, cb) {
  if (!req.query.phoneNumber)
    return cb({
      status: 404,
      message: "query parameter phoneNumber must be supplied"
    });

  User.findOne({ 'phoneNumber': req.query.phoneNumber }, function(err, user) {
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
    cap1.getPurchases(user.nessieId, function(err, data) {
      if (err)
        return next(err);
      res.json({
        success: true,
        purchases: data
      });
    });
  });
});

module.exports = router;
