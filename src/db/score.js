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

export function getSongPickerId(song_id){

    return new Promise(function(resolve, reject){
        connection.query('SELECT agent_id from factentry where song_id = ?', [song_id], function(err, rows, fields) {
            if (err) return reject(err);

            var result = rows[0]

            resolve(result)

        });
    })
}




export function enterScore(theme_id,user_id,song_id,score,song_comment,song_picker_id){
    console.log("ScoreEnteredRun")
    return new Promise(function(resolve, reject){
        connection.query('INSERT INTO factscores (theme_id,agent_id,song_picker_id, song_id, valid_vote,song_raw_score,song_comments) VALUES(?,?,?,?,1,?,?)', [theme_id,user_id,song_picker_id,song_id,score,song_comment] , function(err, result) {
            if (err) return reject(err);

            resolve(result)

        });
    })
}

export function getTotalSongsScoredByUser(theme_id,user_id){

    return new Promise(function(resolve, reject){
        connection.query('select count(*) as count from factscores where theme_id = ? and agent_id = ? and valid_vote = 1;', [theme_id,user_id], function(err, rows, fields) {
            if (err) return reject(err);

            var result = rows[0]

            resolve(result)

        });
    })
}
export function getAllScoredSongs(theme_id){
    return new Promise(function(resolve, reject){
        connection.query('SELECT * from factscores where theme_id = ?;',[theme_id], function(err, rows, fields) {
            if (err) return reject(err);

            var result = rows

            resolve(result)

        });
    })
}

export function getTopScoredSongs(theme_id,number_of_songs){
    return new Promise(function(resolve, reject){
        connection.query('SELECT dimartists.artist_name, dimsongs.song_name, factscores.song_id, avg(factscores.song_raw_score) as avgscore from factscores left join dimsongs on dimsongs.song_id = factscores.song_id left join dimartists on dimartists.artist_id = dimsongs.artist_id where theme_id = ? and valid_vote = 1 group by factscores.song_id order by avgscore desc LIMIT ?;',[theme_id, number_of_songs], function(err, rows, fields) {
            if (err) return reject(err);

            var result = rows

            resolve(result)

        });
    })
}

export function getBottomScoredSongs(theme_id,number_of_songs){
    return new Promise(function(resolve, reject){
        connection.query('SELECT dimartists.artist_name, dimsongs.song_name, factscores.song_id, avg(factscores.song_raw_score) as avgscore from factscores left join dimsongs on dimsongs.song_id = factscores.song_id left join dimartists on dimartists.artist_id = dimsongs.artist_id where theme_id = ? and valid_vote = 1 group by factscores.song_id order by avgscore asc LIMIT ?;',[theme_id, number_of_songs], function(err, rows, fields) {
            if (err) return reject(err);

            var result = rows

            resolve(result)

        });
    })
}
