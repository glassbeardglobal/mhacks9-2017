var yahoo = require('yahoo-finance');

function lookup(ticker, cb) {
  yahoo.snapshot({
    symbol: ticker,
    fields: ['s', 'y', 'k', 'j', 'j1', 'v', 'a2', 'e', 'r'],
  }, function (err, snapshot) {
    cb(err, snapshot);
  });
}

module.exports = {
  lookup: lookup
};
