import express from 'express'
var bodyParser = require('body-parser')


// get an instance of router
var router = express.Router();
router.use(bodyParser.json())

import connection from './db.js'


export function getArtist(name){
    var value = req.body.songName

    return new Promise(function(resolve, reject){
        connection.query('SELECT top 1 from dimartists where artist_name = ?', [name], function(err, rows, fields) {
            if (err) return reject(err);

            var result = rows[0]

            resolve(result)

        });
    })
}

export function getArtistID(name){
    var value = req.body.songName

    return new Promise(function(resolve, reject){
        connection.query('SELECT artist_id FROM dimartists where artist_name like "?"', [name], function(err, rows, fields) {
            if (err) return reject(err);

            var result = rows[0]

            resolve(result)

        });
    })
}


export function getSongsByArtist(id){
    var value = req.body.artistName

    return new Promise(function(resolve, reject){
        connection.query('SELECT * FROM dimsongs where artist_id = ?', [id] , function(err, rows, fields) {
            if (err) return reject(err);

            var result = rows[0]

            resolve(result)

        });
    })
}


export function createArtist(name){
    var value = req.body.artistName

    return new Promise(function(resolve, reject){
        connection.query('INSERT INTO dimartists (artist_name) VALUES(?)', [name] , function(err, rows, fields) {
            if (err) return reject(err);

            var result = rows[0]

            resolve(result)

        });
    })
}




