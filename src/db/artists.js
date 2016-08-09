import express from 'express'
var bodyParser = require('body-parser')


// get an instance of router
var router = express.Router();
router.use(bodyParser.json())

import connection from './db.js'


export function getArtist(name){
    var value = req.body.songName

    return new Promise(function(resolve, reject){
        connection.query('SELECT top 1 from dimartists where name = ?', [name], function(err, rows, fields) {
            if (err) return reject(err);

            var result = rows[0]

            resolve(result)

        });
    })
}
