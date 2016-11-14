import mysql from 'mysql'

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Jenna83!',
    database : 'thegreys_weekly_music'
});


// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'Password1',
//     database : 'thegreys_weekly_music'
// });

connection.connect();

export default connection

//connection.end();
