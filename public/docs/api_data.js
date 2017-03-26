define({ "api": [
  {
    "type": "get",
    "url": "/api/stocks/daily",
    "title": "Daily Prices",
    "name": "DailyStocks",
    "group": "Stocks",
    "description": "<p>Get Daily Prices of a given stock</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ticker",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/api/stocks.js",
    "groupTitle": "Stocks"
  },
  {
    "type": "get",
    "url": "/api/stocks/intraday",
    "title": "Intraday Prices",
    "name": "IntradayStocks",
    "group": "Stocks",
    "description": "<p>Get Intraday Prices of a given stock</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ticker",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/api/stocks.js",
    "groupTitle": "Stocks"
  },
  {
    "type": "get",
    "url": "/api/users/company-data",
    "title": "Get a Company's Historical Market Data",
    "name": "GetCompanyData",
    "group": "Users",
    "description": "<p>Gets a company's historical stock data</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "company",
            "description": "<p>ticker</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/api/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/api/users/auth",
    "title": "Authenticate User",
    "name": "GetUserAuth",
    "group": "Users",
    "description": "<p>Authenticate a user with phone number</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phoneNumber",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/api/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/api/users/user-proportional-purchases",
    "title": "Get Proportional Purchases",
    "name": "GetUserProportionalPurchases",
    "group": "Users",
    "description": "<p>Get the proportion of user's purchases</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phoneNumber",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/api/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/api/users/purchases",
    "title": "Get User Purchases",
    "name": "GetUserPurchases",
    "group": "Users",
    "description": "<p>Get a users purchases</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phoneNumber",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/api/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/api/users/purchase",
    "title": "Create User Purchase",
    "name": "PostUserPurchase",
    "group": "Users",
    "description": "<p>Make a purchase for the user</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phoneNumber",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "amount",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "company",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/api/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/api/users",
    "title": "Create Users",
    "name": "PostUsers",
    "group": "Users",
    "description": "<p>Create a new User</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phoneNumber",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "username",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/api/users.js",
    "groupTitle": "Users"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./public/docs/main.js",
    "group": "_home_jj_Desktop_mhacks9_2017_public_docs_main_js",
    "groupTitle": "_home_jj_Desktop_mhacks9_2017_public_docs_main_js",
    "name": ""
  }
] });
