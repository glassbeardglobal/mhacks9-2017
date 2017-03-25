'use strict';

var express = require('express');
var router = express.Router();
var cap_one = require('../apis/capital_one.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	// cap_one.createAccount('fstname', 'lstname', function(err, data) {
	// 	if(!err) {
	// 		res.json(data);
	// 	} else {
	// 		console.log(err);
	// 	}
	// });
	// cap_one.getAllAccountInfo(function(err, data) {
	// 	if(!err) {
	// 		res.json(data);
	// 	} else {
	// 		res.status(404).send();
	// 	}
	// });
	// cap_one.getAllCustomers(function(err, data) {
	// 	if(!err) {
	// 		res.json(data);
	// 	} else {
	// 		res.status(404).send();
	// 	}
	// });
	// cap_one.makePurchase('56c8f105061b2d440baf43ed', 9.63, function(err, data) {
	// 	if(!err) {
	// 		res.json(data);
	// 	} else {
	// 		res.status(404).send();
	// 	}
	// });
	res.json({data: "hi"});
});


router.get('/test/:uuid', function(req, res, next) {
	var uuid = req.params.uuid;
});


module.exports = router;
