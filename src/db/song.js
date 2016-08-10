import express from 'express'
var bodyParser = require('body-parser')


// get an instance of router
var router = express.Router();
router.use(bodyParser.json())

import connection from './db.js'


export function createSong(songName,artist_id){

    return new Promise(function(resolve, reject){
        connection.query('INSERT INTO dimsongs (song_name,artist_id,genre_id) VALUES(?,?,0)', songName,artist_id , function(err, rows, fields) {
            if (err) return reject(err);

            var result = rows[0]

            resolve(result)

        });
    })
}


export function getSong(songName,artist_id){

    return new Promise(function(resolve, reject){
        connection.query('SELECT * FROM dimsongs where song_name = ? and artist_id = ?', songName,artist_id , function(err, rows, fields) {
            if (err) return reject(err);

            var result = rows[0]

            resolve(result)

        });
    })
}








