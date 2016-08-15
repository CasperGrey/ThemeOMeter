import express from 'express'
var bodyParser = require('body-parser')


// get an instance of router
var router = express.Router();
router.use(bodyParser.json())

import connection from './db.js'


export function getSongsInTheme(id){
    return new Promise(function(resolve, reject){
        connection.query('SELECT * from factentry where theme_id = ?', [id], function(err, rows, fields) {
            if (err) return reject(err);

            var result = rows

            resolve(result)

        });
    })
}


export function createEntry(theme_id,song_id,user_comment){
    return new Promise(function(resolve, reject){
        connection.query('INSERT INTO factentry (theme_id,agent_id,song_id,user_comment) VALUES(?,1,?,?)',[theme_id,song_id, user_comment], function(err, rows, fields) {
            if (err) return reject(err);

            var result = rows[0]

            resolve(result)

        });
    })
}








