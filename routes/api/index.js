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
router.use('/stocks', require('./stocks'));

router.use(function(req, res, next) {
  var err = new Error('API Route Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;
