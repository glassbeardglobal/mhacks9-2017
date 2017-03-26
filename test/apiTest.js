var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

var market = require('../apis/market.js');
var cap1 = require('../apis/capital_one.js');

chai.use(chaiHttp);

describe('Market API Functions', function() {
  it('should search listed companies', function(done) {
    this.timeout(5000);
    market.lookup('Nvidia', function(err, data) {
      console.log(data);

      data.should.be.a('array');
      data[0].should.be.a('object');
      data[0].Symbol.should.equal('NVDA');
      done();
    });
  });

  it('should search unlisted companies', function(done) {
    this.timeout(5000);
    market.lookup('Amazon', function(err, data) {
      console.log(data);

      done();
    });
  });

  it('should quote a given ticker symbol', function(done) {
    this.timeout(5000);
    market.quote('NVDA', function(err, data) {
      console.log(data);

      done();
    });
  });

  it('should get interdayChart data for a ticker', function(done) {
    this.timeout(5000);
    market.interdayChart('NVDA', 10, function(err, data) {
      console.log(data);

      data.should.be.a('object');
      done();
    });
  });

  it('should get intradayChart data for a ticker', function(done) {
    this.timeout(5000);
    market.intradayChart('NVDA', function(err, data) {
      data.should.be.a('array');

      done();
    });
  });
});

describe('Capital One API Functions', function(done) {
  var fn = 'Hick' + ~~(1000*Math.random());
  var ln = 'Norcher' + ~~(1000*Math.random());
  it('should create a user', function(done) {
    cap1.createAccount(fn, ln, function(err, data) {
      console.log(data);

      done();
    });
  });
});
