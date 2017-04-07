var mariadb = require("mysql");

var sql =  mariadb.createConnection({
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASS,
     database: 'hoodmvp'
});

sql.connect(function (err) {
     if(err){
          console.log("error");
     } else{
          console.log("connected");
     }
});

let Team = {

}

Team.findTeam = function findTeam(callback, limit) {
     // newUser.password = hash;
     if (typeof limit !== 'number') {
        var query = sql.query('SELECT * FROM team', callback)   
     } else {
     var query = sql.query('SELECT * FROM team LIMIT ?', [limit], callback) 
     }
     // {
     //      if(err) {
     //           console.log(err);
     //           throw err;
     //      }

     //      // console.log(res.insertId);
     //      console.log(response);
     //      return response;
     // });
}

Team.getMembersByParams = function getMembersByParams(params, callback, limit) {
     // newUser.password = hash;
     let value = params.username;
     if (typeof limit !== 'number') {
        var query = sql.query('SELECT * FROM team WHERE username = ?', callback)   
     } else {
     var query = sql.query('SELECT * FROM team WHERE username = ? LIMIT ?', ['sebp', limit], callback) 
     }
}

module.exports = Team;

// module.exports.getMembersByParams = function(params, callback, limit) {
//     Team.find(params, callback).limit(limit); 
// }