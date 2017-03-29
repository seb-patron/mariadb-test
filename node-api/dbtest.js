// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
require('dotenv').config();
var Client = require('mariasql');

var connection =  new Client({
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASS,
     db: 'hoodmvp'
});

connection.connect();

let prep = connection.prepare('SELECT * FROM team WHERE first_name = :name');
// let prep = connection.prepare('SELECT * FROM bus_stops');
let name = 'Sebastian';
// let prep = connection.prepare('SELECT * FROM team');

// return all rows
connection.query(prep({name : name}), function(err, rows, fields) {
     if (!err) {
          console.log("The solution is ", rows);
     } else {
          console.log(err);
     }
});

// Following code is for showing all DATABASES

// connection.query('SHOW DATABASES', function(err, rows) {
//      if (err){
//           throw err;
//      }
//      console.dir(rows);
// });

connection.end();



// client.on
// (
// 	'connect', function() { console.log('Clientnected'); }
// ).on
// (
// 	'error', function(err) { console.log('Clientor: ' + err); }
// ).on
// (
// 	'close', function(hadError) { console.log('Clientsed'); }
// );

// client.query('SHOW DATABASES').on
// (
// 	'result', 
// 	function(result) 
// 	{
// 		result.on
// 		(
// 			'row', 
// 			function(row) { console.log('Result: ' + (row)); }
// 		).on
// 		(
// 			'error', 
// 			function(err) { console.log('Resultor: ' + (err)); }
// 		).on
// 		(
// 			'end', 
// 			function(info) { console.log('Resultished successfully'); }
// 		);
//  	}
// ).on
// (
// 	'end', 
// 	function() { console.log('Doneh all results'); }
// );

// client.end();