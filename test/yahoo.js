var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

var yahoo = require('../apis/yahoo');

describe('Market API Functions', function() {
  it('get yahoo finance stats', function(done) {
    this.timeout(5000);
    yahoo.lookup('NVDA', function(err, data) {
      console.log(data);

      done();
    });
  });

  it('should add a transaction on /api/users/purchase POST', function(done) {
    this.timeout(5000);
    chai.request(server)
      .get('/api/stocks/stats')
      .query({
        'ticker': 'AAPL'
      }).end(function(err, res) {
        console.log(res.body);

        done();
      });
  });
});

