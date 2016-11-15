import mysql from 'mysql'
//
// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'Jenna83!',
//     database : 'thegreys_weekly_music'
// });


// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'Password1',
//     database : 'thegreys_weekly_music'
// });


var connection = mysql.createConnection({
-    host     : 'sp6xl8zoyvbumaa2.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
 -    user     : 'x8ivvovilk7yv04i',
 -    password : 'oir3i2jx3tr2pbv9',
 -    database : 'aqfcbi1hdv24qagc'
});
connection.connect();

export default connection

//connection.end();
