'use strict';

const API_KEY = '65be1ee16b2fbd6faade515551491370';
var request = require('request');

function getAllAccountInfo() {
    request({
        url: 'http://api.reimaginebanking.com/accounts?key=' + API_KEY,
        method: 'GET'
    }, function(err, res, body) {
        
    });
}

function createAccount(id) {
    request({
        url: ''
    });
}
