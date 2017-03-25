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

});

module.exports = router;
