import express from 'express'
var bodyParser = require('body-parser')


// get an instance of router
var router = express.Router();
router.use(bodyParser.json())

//import connection from '../db/db.js'

//import { getArtist, createArtist } from './../db/artists.js'


// route with parameters (http://localhost:8080/hello/:name)
router.post('/', function(req, res, next) {


    var songName = req.body.songName
    var artistName = req.body.artistName
    var comment = req.body.comment

    console.log(require('util').inspect(req.body))

    /*var artist = await getArtist(artistName)
    if (!artist){
        var artist = await createArtist(artistName)
    }

    var song = await getSong(songName, artist.name);
    if (!song){
        var song = await createSong(songName, artist.id)
    }*/



    /*connection.query('INSERT INTO dimsongs SET ?', {song_name: req.body.songName}, function(err, rows, fields) {
        if (err) return next(err);

        return res.send({
            message: `${value} song added.`,
        })

    });*/

});

export default router