var request = require('request');

var base = 'http://dev.markitondemand.com/Api/v2/';
var aa_base = 'http://www.alphavantage.co/';

var aa_key = '7103';

function lookup(queryString, cb) {
  request({
    uri: '/Lookup/json',
    baseUrl: base,
    method: 'GET',
    qs: { input: queryString },
    json: true
  }, function(err, resp, data) {
    cb(err, data);
  });
}

function quote(ticker, cb) {
  request({
    uri: '/Quote/json',
    baseUrl: base,
    method: 'GET',
    qs: { symbol: ticker },
    json: true
  }, function(err, resp, data) {
    cb(err, data);
  });
}

function interdayChart(ticker, numDays, cb) {
  var dataInput = {
    "NumberOfDays": numDays,
    "DataPeriod": "Day",
    "Elements":[{ "Symbol": ticker, "Type": "price", "Params": ["c"] }]
  };

  var param = JSON.stringify(dataInput);

  request({
    uri: '/InteractiveChart/json',
    baseUrl: base,
    method: 'GET',
    qs: { parameters: param },
    json: true
  }, function(err, resp, data) {
    cb(err, data);
  });
}

/*
 * Gets most recent stock data divided into 15 min intervals
*/
function intradayChart(ticker, cb) {
  request({
    uri: '/query',
    baseUrl: aa_base,
    method: 'GET',
    qs: {
      function: 'TIME_SERIES_INTRADAY',
      symbol: ticker,
      interval: '15min',
      outputsize: 'full',
      apikey: aa_key
    },
    json: true
  }, function(err, resp, data) {
    cb(err, data);
  });
}

function dailyChart(ticker, cb) {
  request({
    uri: '/query',
    baseUrl: aa_base,
    method: 'GET',
    qs: {
      function: 'TIME_SERIES_DAILY',
      symbol: ticker,
      outputsize: 'full',
      apikey: aa_key
    },
    json: true
  }, function(err, resp, data) {
    cb(err, data);
  });
}

module.exports = {
  lookup: lookup,
  quote: quote,
  interdayChart: interdayChart,
  intradayChart: intradayChart,
  dailyChart: dailyChart
}
