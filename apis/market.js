var request = require('request');

var base = 'http://dev.markitondemand.com/Api/v2/';

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

module.exports = {
  lookup: lookup,
  quote: quote
}
