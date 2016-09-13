import express from 'express'
var bodyParser = require('body-parser')


// get an instance of router
var router = express.Router();
router.use(bodyParser.json())

import connection from './db.js'


export function getScoreBySongId(id){

    return new Promise(function(resolve, reject){
        connection.query('SELECT * from factscores where song_id = ?', [id], function(err, rows, fields) {
            if (err) return reject(err);

            var result = rows[0]

            resolve(result)

        });
    })
}


export function enterScore(theme_id,user_id,song_id,score,song_comment){
    console.log("ScoreEnteredRun")
    return new Promise(function(resolve, reject){
        connection.query('INSERT INTO factscores (theme_id,agent_id,song_picker_id, song_id, valid_vote,song_raw_score,song_comments) VALUES(?,?,1,?,1,?,?)', [theme_id,user_id,song_id,score,song_comment] , function(err, result) {
            if (err) return reject(err);

            resolve(result)

        });
    })
}
