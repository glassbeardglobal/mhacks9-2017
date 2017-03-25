var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

var phone = '847-102-2123';

describe('User functions', function() {
  /*it('should add a SINGLE user on /api/users POST', function(done) {
    this.timeout(5000);
    chai.request(server)
      .post('/api/users')
      .send({
        'firstName': 'Ted',
        'lastName': 'Moseby',
        'password': 'foobar',
        'phoneNumber': phone
      }).end(function(err, res) {
        console.log(res.body);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.success.should.equal(true);
        res.body.should.have.property('user');
        res.body.user.should.have.property('_id');
        done();
      });
  });*/

  it('should add a transaction on /api/users/purchase POST', function(done) {
    this.timeout(5000);
    chai.request(server)
      .post('/api/users/purchase')
      .send({
        'phoneNumber': phone,
        'amount': 17.83,
        'company': 'McDonalds',
        'date': (new Date()).toString()
      }).end(function(err, res) {
        console.log(res.body);

        done();
      });
  });

  it('should get transaction history on /api/users/purchases GET', function(done) {
    chai.request(server)
      .get('/api/users/purchases')
      .query({ phoneNumber: phone })
      .end(function(err, res) {
        console.log(res.body);

        done();
      });
  });
});
