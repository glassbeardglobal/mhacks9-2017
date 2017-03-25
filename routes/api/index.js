'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    success: true,
    message: "API Root"
  });
});

router.use('/users', require('./users'));

module.exports = router;
