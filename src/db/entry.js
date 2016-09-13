import express from 'express'
var bodyParser = require('body-parser')


// get an instance of router
var router = express.Router();
router.use(bodyParser.json())

import connection from './db.js'


export function getSongsInTheme(id){
    return new Promise(function(resolve, reject){
        connection.query('SELECT f.* , ds.song_url ,ds.video_id from factentry f join dimsongs ds on f.song_id = ds.song_id where theme_id = ?;', [id], function(err, rows, fields) {
            if (err) return reject(err);

            var result = rows

            resolve(result)

        });
    })
}


export function createEntry(theme_id,agent_id,song_id,user_comment){
    return new Promise(function(resolve, reject){
        connection.query('INSERT INTO factentry (theme_id,agent_id,song_id,user_comment) VALUES(?,?,?,?)',[theme_id,agent_id,song_id, user_comment], function(err, rows, fields) {
            if (err) return reject(err);

            var result = rows[0]

            resolve(result)

        });
    })
}
