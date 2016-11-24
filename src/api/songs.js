import express from 'express'
var bodyParser = require('body-parser')


// get an instance of router
var router = express.Router();
router.use(bodyParser.json())


import {getArtist, createArtist } from './../db/artists.js'
import {createSong, getSong, getSongsByUserinTheme,getTotalSongsByUserinTheme,getTotalSongsinThemeWithoutUsers} from './../db/song.js'
import {getTotalSongsScoredByUser} from './../db/score.js'
import * as entryDb from './../db/entry.js'
import { getCurrentTheme } from './../db/theme.js'

// route with parameters (http://localhost:8080/hello/:name)
router.post('/', async function(req, res, next) {

    try {

        var songName = req.body.songName
        var user_id =  req.body.user_id
        var artistName = req.body.artistName
        var comment = req.body.comment
        var url = req.body.songURL
        var videoId = req.body.videoId


        console.log(require('util').inspect(req.body))

        console.log('Searching for Artist:',artistName)
        var artist = await getArtist(artistName)

        if (!artist) {
        console.log('Artist not found - Creating new Artist:',artistName)
        var artist = await createArtist(artistName)
        }
        console.log('Artist:',artist)
        console.log('Searching for Song:',songName)
        var song = await getSong(songName, artist.artist_id);
        if (!song) {
          console.log('Song not found - Creating new Song:',songName)
          song = await createSong(songName, artist.artist_id, url , videoId)
          var theme = await getCurrentTheme()
          console.log('Creating Song Entry:',songName)
          var entry = await entryDb.createEntry(theme.theme_id,user_id,song.song_id, comment || '')
          console.log('Entry Added:',entry)
          res.send('success');
         } else {
            console.log('Song Already Exists')
            res.send('failure');
          }
    }catch(err){

        console.error(err)
        next(err)
    }


});


router.post('/validate', async function(req, res, next) {

    try {

        var songName = req.body.songName
        var artistName = req.body.artistName

        console.log(require('util').inspect(req.body))

        console.log('Searching for Artist:',artistName)
        var artist = await getArtist(artistName)

        if (!artist) {
        console.log('Artist not found - Creating new Artist:',artistName)
        var artist = await createArtist(artistName)
        }
        console.log('Artist:',artist)
        // I put the parameters this way around because it's more about the song and the
        // artist could be an optional parameter
        console.log('Searching for Song:',songName)
        var song = await getSong(songName, artist.artist_id);

        // If we don't have a song then create one
        if (!song) {
          res.send('Not Found');
         } else {
            console.log('Song Already Exists')
            res.send('Found');
          }
    }catch(err){

        console.error(err)
        next(err)
    }


});


router.post('/complete', async function(req, res, next) {

    try {

        var agent_id = req.body.userId

        var theme = await getCurrentTheme()

        console.log(require('util').inspect(req.body))

        console.log('Searching for total entries:',agent_id,theme.theme_id)
        var total = await getTotalSongsinThemeWithoutUsers(agent_id,theme.theme_id)

        if (!total) {
        console.log('No Entries For This User')
        }
        console.log('Total entries:',total.count)
        console.log('Searching for total scores by user:',agent_id)
        var scoredSoFar = await getTotalSongsScoredByUser(theme.theme_id, agent_id);
        console.log('Scored so far:',scoredSoFar.count)
        // If we don't have a song then create one
        if (!scoredSoFar) {
          res.send('0');
         }
        var complete = (scoredSoFar.count/total.count)*100

        console.log('Complete %',complete)

        if(complete >= 100){
          res.send('100')
        }

    }catch(err){

        console.error(err)
        next(err)
    }


});


router.post('/entered', async function(req, res, next) {

    try {

        var agent_id = req.body.userId

        var theme = await getCurrentTheme()

        console.log(require('util').inspect(req.body))

        console.log('Searching for total entries:',agent_id,theme.theme_id)
        var total = await getTotalSongsByUserinTheme(agent_id,theme.theme_id)

        if (!total) {
        console.log('No Entries For This User')
        }

        console.log(total.count)

        if(total.count == '5'){
          res.send('Finished')
        }else{
          res.send('Nothing')
        }



    }catch(err){

        console.error(err)
        next(err)
    }


});



router.post('/in-current-theme', async function(req, res, next) {

    try {

        var agent_id = req.body.user_id

        var theme = await getCurrentTheme()

        console.log(require('util').inspect(req.body))

        console.log('Searching for Songs By User:',user_id)
        var songs = await getSongsByUserinTheme(agent_id,theme.theme_id)

        if (!songs) {
        console.log('No Songs Currently IN Theme For',User_id)
      } else {
            res.send(songs);
          }
    }catch(err){

        console.error(err)
        next(err)
    }


});

router.get('/by-theme',  async function(req, res, next) {
    try{
        var theme = await getCurrentTheme()
        var songs = await entryDb.getSongsInTheme(theme.theme_id)
        res.send(songs)
    } catch (err){
        next(err)
    }
})

export default router
