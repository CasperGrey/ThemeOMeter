import express from 'express'
var bodyParser = require('body-parser')


// get an instance of router
var router = express.Router();
router.use(bodyParser.json())

import connection from './db.js'


export function getArtistId(name){
    var value = req.body.songName
    console.log("fired")
    return new Promise(function(resolve, reject){
        connection.query('SELECT top 1 from dimartists where artist_name = ?', [name], function(err, rows, fields) {
            if (err) return reject(err);

            var result = rows[0]

            resolve(result)

        });
    })
}

export function getArtist(name){
    console.log("fired2")

    return new Promise(function(resolve, reject){
        connection.query('SELECT * FROM dimartists where artist_name like ? limit 1', [name], function(err, rows, fields) {
            if (err) return reject(err);

            var result = rows[0]

            resolve(result)

        });
    })
}

export function getArtistById(id){
    return new Promise(function(resolve, reject){
        connection.query('SELECT * FROM dimartists where artist_id = ?', [id], function(err, rows, fields) {
            if (err) return reject(err);

            var result = rows[0]

            resolve(result)

        });
    })
}


export function getSongsByArtist(id){

    return new Promise(function(resolve, reject){
        connection.query('SELECT * FROM dimsongs where artist_id = ?', [id] , function(err, rows, fields) {
            if (err) return reject(err);

            var result = rows[0]

            resolve(result)

        });
    })
}


export function createArtist(name){

    return new Promise(function(resolve, reject){
        connection.query('INSERT INTO dimartists (artist_name) VALUES(?);', [name] , function(err, result) {
            if (err) return reject(err);

            var artistId = result.insertId

            resolve(getArtistById(artistId))

        });
    })
}







