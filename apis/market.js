var request = require('request');

var base = 'http://dev.markitondemand.com/MODApis/Api/v2/';
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

function processTimeSeries(ts, attr) {
  var res = [];
  console.log(ts);
  var tseries = ts[attr];
  for (var time in tseries) {
    if (tseries.hasOwnProperty(time)) {
      res.push({
        date: new Date(time),
        price: tseries[time]["4. close"]
      });
    }
  }

  res.sort(function(a, b) {
    if (a.date < b.date) {
      return -1;
    } else if (a.date == b.date) {
      return 0;
    } else {
      return 1;
    }
  });

  res.forEach(function(d) {
    d.date = d.date.toISOString();
  });

  return res;
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
      interval: '5min',
      outputsize: 'full',
      apikey: aa_key
    },
    json: true
  }, function(err, resp, data) {
    cb(err, processTimeSeries(data, 'Time Series (5min)'));
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
    cb(err, processTimeSeries(data, 'Time Series (Daily)'));
  });
}

module.exports = {
  lookup: lookup,
  quote: quote,
  interdayChart: interdayChart,
  intradayChart: intradayChart,
  dailyChart: dailyChart
}
