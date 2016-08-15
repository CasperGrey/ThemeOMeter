import express from 'express'
var bodyParser = require('body-parser')


// get an instance of router
var router = express.Router();
router.use(bodyParser.json())

import connection from './db.js'


export function createSong(songName,artist_id, url){
    console.log("CreateSongRun")
    return new Promise(function(resolve, reject){
        connection.query('INSERT INTO dimsongs (song_name,artist_id,genre_id, song_url) VALUES(?,?,0,?)', [songName,artist_id,url] , function(err, result) {
            if (err) return reject(err);

            resolve(getSongById(result.insertId))

        });
    })
}

export function getSongById(id){
    console.log(`getSongById id: ${id}`)
    return new Promise(function(resolve, reject){
        connection.query('SELECT * FROM dimsongs where song_id = ?', [id] , function(err, rows, fields) {
            if (err) return reject(err);

            var result = rows[0]

            resolve(result)

        });
    })
}


export function getSong(songName,artist_id){
    console.log(`getSongRun songName: ${songName}, artist_id: ${artist_id}`)
    return new Promise(function(resolve, reject){
        connection.query('SELECT * FROM dimsongs where song_name = ? and artist_id = ?', [songName,artist_id] , function(err, rows, fields) {
            if (err) return reject(err);

            var result = rows[0]

            resolve(result)

        });
    })
}








