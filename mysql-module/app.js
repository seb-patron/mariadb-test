const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
var mariadb = require('mysql');
const url = require('url');

// models import
const team = require('./models/team');

app.use(bodyParser.json());

// var connection =  mariadb.createConnection({
//      host: process.env.DB_HOST,
//      user: process.env.DB_USER,
//      password: process.env.DB_PASS,
//      database: 'hoodmvp'
// });

// connection.connect();

app.get('/', function(req, res) {
     res.send('got to /team to start the api!');
});

app.get('/team', function(req, res) {
     let ans = team.findTeam(function(err, data) {
          if (err) {
               console.log(err);
               throw err;
          }
          res.json(data);
     });
})


//access team_members thru api with search queries
app.get('/team*', function(req, res) {
     let queries = url.parse(req.url);
     console.log(queries)
     const params = _parseKeys(queries.query);
     let limit = _getLimit(params);
     team.getMembersByParams(params, function(err, ans) {
        if (err) {
            console.log(err);
            throw err;
        }
        res.json(ans);
        console.log('\nthe search params would be: ', params);
    }, limit);
});

app.use(function(req, res) {
     res.sendStatus(404);
});


// ---------- Helper functions --------------
// parses the query keys into an object
function _parseKeys(queryString) {
     let queryArray = queryString.split('&');
     let params = {};
     queryArray.forEach((query) => {
          // replaces all +'s with spaces (+'s used to conjoin words in single param)
          if ( query.indexOf("+") > -1 ) {
               query = query.replace(/\+/g, " ");
          }
          let splitQuery = query.split('=');
          params[splitQuery[0]] = splitQuery[1];
     });
     console.log("the params are: ", params);
     return params;
}

// gets limit if it is specified. if no limit specified defaults to 100
// also removes limit from params
function _getLimit(params) {
     if (params.hasOwnProperty('limit')) {
          let limit = parseInt(params.limit, 10)
          delete params.limit;
          return limit;
     } else {
          return 100;
     }
}

const server = app.listen(process.env.PORT || 5000, function () {
     var port = server.address().port;
     console.log("App now running on port %s.", port);
     console.log("\n...no body probably notices my messages :(");
});