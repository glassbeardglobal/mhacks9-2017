'use strict';

var request = require('request');
var market = require('./market');

const API_KEY = '65be1ee16b2fbd6faade515551491370';
const BASE_URL = 'http://api.reimaginebanking.com';
const CARD_TYPE = ['Credit Card', 'Savings', 'Checking'];
const MERCHANT_ID = '58d632301756fc834d9064e9';


/* NOTE: RETURNS ARRAY OF OBJECTS
{
    _id: "56c66be6a73e492741507b69",
    rewards: 29461,
    balance: 38759,
    customer_id: "56c66be5a73e49274150728d",
    nickname: "Mrs.'s Account",
    type: "Checking"
}
*/
function getAllAccountInfo(cb) {
    request({
        url: BASE_URL + '/accounts?key=' + API_KEY,
        method: 'GET'
    }, function(err, res, body) {
        cb(JSON.parse(err), JSON.parse(body));
    });
}


/* NOTE: RETURNS ARRAY OF OBJECTS
{
    _id: "56c66be5a73e49274150728d",
    last_name: "McConaughey",
    address: {
        city: "Homeworth",
        street_name: "Bowman Street Northeast",
        zip: "44634",
        state: "Ohio",
        street_number: "24500"
    },
    first_name: "Matthew"
}
*/
function getAllCustomers(cb) {
    request({
        url: BASE_URL + '/customers?key=' + API_KEY,
        method: 'GET'
    }, function(err, res, body) {
        cb(JSON.parse(err), JSON.parse(body));
    })
}


/*
{
    code: 201,
    message: "Account created",
    objectCreated: {
        type: "Credit Card",
        nickname: "fstname's account",
        rewards: 0,
        balance: 0,
        customer_id: "58d6283d1756fc834d9064e5",
        _id: "58d6283d1756fc834d9064e6"
    }
}
*/
function createAccount(first_name, last_name, cb) {
    // First we need to create the customer
    request({
        url: BASE_URL + '/customers?key=' + API_KEY,
        json: {
            "first_name": first_name,
            "last_name": last_name,
            "address": {
                "street_number": " ",
                "street_name": " ",
                "city": " ",
                "state": "ZZ",
                "zip": "99999"
            }
        },
        method: 'POST'
    }, function(err, res, body) {
        // Once the customer is created, now we create their account
        // cb(err, body);
        var id = body.objectCreated._id;
        var nick = body.objectCreated.first_name;
        request({
            url: BASE_URL + '/customers/' + id + '/accounts?key=' + API_KEY,
            json: {
                "type": CARD_TYPE[0],
                "nickname": nick + "'s account",
                "rewards": 0,
                "balance": 0,
            },
            method: 'POST'
        }, function(err_n, res_n, body_n) {
            cb(err_n, body_n);
        });
    });
}


/* 
{
    message: "Created purchase and added it to the account",
    code: 201,
    objectCreated: {
        merchant_id: "58d632301756fc834d9064e9",
        medium: "balance",
        amount: 9.63,
        status: "pending",
        type: "merchant",
        payer_id: "56c8f105061b2d440baf43ed",
        _id: "58d6334d1756fc834d9064ed"
    }
}
*/
function makePurchase(id, amount, company, date, cb) {
    market.lookup(company, function(err, companies) {
        var ticker = "NO SYMBOL (" + company + ")";
        if (companies.length > 0) {
            ticker = companies[0].Symbol;
        }
        request({
            url: BASE_URL + '/accounts/' + id + '/purchases',
            qs: { key: API_KEY },
            json: {
                "merchant_id": MERCHANT_ID,
                "medium": "balance",
                "amount": amount,
                "purchase_date": date.toString(),
                "description": ticker
            },
            method: 'POST'
        }, function(err, res, body) {
            cb(err, body);
        });
    });
}

function getPurchases(id, cb) {
    request({
        uri: '/accounts/' + id + '/purchases',
        baseUrl: BASE_URL,
        method: 'GET',
        qs: { key: API_KEY },
        json: true
    }, function(err, resp, data) {
        cb(err, data);
    });
}

module.exports = {
    getAllAccountInfo: getAllAccountInfo,
    getAllCustomers: getAllCustomers,
    createAccount: createAccount,
    makePurchase: makePurchase,
    getPurchases: getPurchases
}
