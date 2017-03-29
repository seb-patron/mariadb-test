const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
var Client = require('mariasql');

app.use(bodyParser.json());

var connection =  new Client({
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASS,
     db: 'hoodmvp'
});

connection.connect();

let prep = connection.prepare('SELECT * FROM team WHERE first_name = :first_name');
let name = 'Jonny';
// let prep = connection.prepare('SELECT * FROM team');

// return all rows
// connection.query(prep({first_name : name}), function(err, rows, fields) {
//      if (!err) {
//           console.log("The solution is ", rows);
//      } else {
//           console.log(err);
//      }
// });



app.get('/', function(req, res) {
    res.send('hello world!');
});

app.get('/team', function(req, res) {
     connection.query('SELECT * from team', function(err, rows, fields) {
     connection.end();
     if (err) {
          console.log(err);
          throw err;
     } 
     console.log('The solution is: ', rows);
     res.json(rows);
     });
});

app.get('/team/:id', function(req, res) {
     let id = req.params.id;
     let prep = connection.prepare('SELECT * FROM team WHERE team_id = :team_id');
     connection.query(prep({team_id : id}), function(err, rows, result) {
     connection.end();
     if (err) {
          console.log(err);
          throw err;
     } 
     console.log('The solution is: ', rows);
     res.json(rows);
     });
});

// app.get('/team/:id', function(req, res) {
//      let id = req.params.id;
//      let prep = connection.prepare('SELECT * FROM bus_stops WHERE team_id = :team_id');
//      connection.query(prep({team_id : id}), data, function(err, result) {
//      connection.end();
//      if (err) {
//           console.log(err);
//           throw err;
//      } 
//      console.log('The solution is: ', rows);
//      res.json(rows);
//      });
// });

app.use(function(req, res) {
     res.sendStatus(404);
});

const server = app.listen(process.env.PORT || 5000, function () {
    var port = server.address().port;
    console.log("App now running on port %s.", port);
    console.log("\n...no body probably notices my messages :(");
  });