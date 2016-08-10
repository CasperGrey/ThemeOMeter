import express from 'express'
var bodyParser = require('body-parser')


// get an instance of router
var router = express.Router();
router.use(bodyParser.json())


import {getArtist, createArtist } from './../db/artists.js'
import {createSong, getSong} from './../db/song.js'

// route with parameters (http://localhost:8080/hello/:name)
router.post('/', async function(req, res, next) {


    var songName = req.body.songName
    var artistName = req.body.artistName
    var comment = req.body.comment

    console.log(require('util').inspect(req.body))

    var artist = await getArtist(artistName)
    if (!artist){
        var artist = await createArtist(artistName)
    }

    // I put the parameters this way around because it's more about the song and the
    // artist could be an optional parameter
    var song = await getSong(songName, artist.id);

    // If we don't have a song then create one
    if (!song){
        song = await createSong(songName, artist.id)
    }



    /*connection.query('INSERT INTO dimsongs SET ?', {song_name: req.body.songName}, function(err, rows, fields) {
        if (err) return next(err);

        return res.send({
            message: `${value} song added.`,
        })

    });*/

});

export default router