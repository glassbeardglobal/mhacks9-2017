'use strict';

var express = require('express');
var router = express.Router();

var market = require('../../apis/market.js');

/**
 * @api {get} /api/stocks/intraday Intraday Prices
 * @apiName IntradayStocks
 * @apiGroup Stocks
 * @apiDescription Get Intraday Prices of a given stock
 * @apiParam {String} ticker
*/
router.get('/intraday', function(req, res, next) {
  if (!req.query.ticker)
    return next({
      status: 400,
      message: "Missing ticker field"
    });

  market.intradayChart(req.query.ticker, function(err, data) {
    if (err)
      return next(err);
    res.json({
      success: true,
      data: data
    });
  });
});

/**
 * @api {get} /api/stocks/daily Daily Prices
 * @apiName DailyStocks
 * @apiGroup Stocks
 * @apiDescription Get Daily Prices of a given stock
 * @apiParam {String} ticker
*/
router.get('/daily', function(req, res, next) {
  if (!req.query.ticker)
    return next({
      status: 400,
      message: "Missing ticker field"
    });

  market.dailyChart(req.query.ticker, function(err, data) {
    if (err)
      return next(err);
    res.json({
      success: true,
      data: data
    });
  });
});

module.exports = router;
