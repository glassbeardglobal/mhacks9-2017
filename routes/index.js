'use strict';

var express = require('express');
var zfill = require('zfill');
var router = express.Router();
var cap_one = require('../apis/capital_one.js');
var User = require('../models/User.js');


function getFormattedDate() {
	var today = new Date();
	var year = today.getFullYear();
	var month = zfill(today.getMonth(), 2);
	var day = zfill(today.getDay(), 2);
	return year + '-' + month + '-' + day;
}


/* GET home page. */
router.get('/test', function(req, res, next) {

    // "nessieId": "56c66be5a73e49274150728d"
    // "accountId": "56c66be6a73e492741507b69"

	// cap_one.getAllAccountInfo(function(err, data) {
	// 	res.json(data);
	// });

	// cap_one.makePurchase('56c66be6a73e492741507b69',
	// 					150.00, 'google',
	// 					getFormattedDate(), function(err, data) {
	// 	res.json(data);
	// });

	cap_one.getPurchases('56c66be6a73e492741507b69', function(err, data) {
		res.json(data);
	});

});


router.get('/test/:uuid', function(req, res, next) {
	var uuid = req.params.uuid;
});


module.exports = router;
