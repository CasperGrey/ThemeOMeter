import express from 'express'
var bodyParser = require('body-parser')


// get an instance of router
var router = express.Router();
router.use(bodyParser.json())

import connection from './db.js'


// route with parameters (http://localhost:8080/hello/:name)
router.post('/', function(req, res, next) {


    var value = req.body.songName

    connection.query('INSERT INTO dimsongs SET ?', {song_name: req.body.songName}, function(err, rows, fields) {
        if (err) return next(err);

        return res.send({
            message: `${value} song added.`,
        })

    });

});

export default router