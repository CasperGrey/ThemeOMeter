import express from 'express'
var bodyParser = require('body-parser')


// get an instance of router
var router = express.Router();
router.use(bodyParser.json())


import {enterScore,getScoreBySongId,getSongPickerId} from './../db/score.js'


// route with parameters (http://localhost:8080/hello/:name)
router.post('/', async function(req, res, next) {

    try {

      var theme_id = req.body.theme_id
      var user_id = req.body.user_id
      var song_id = req.body.song_id
      var score = req.body.score
      var song_comment = req.body.song_comment

      console.log(require('util').inspect(req.body))

      var song_picker_id = await getSongPickerId(song_id)
      console.log(song_picker_id)
      await enterScore(theme_id,user_id,song_id,score,song_comment,song_picker_id.agent_id)

    } catch(err){
        console.error(err)
        reject(err)
    }


});

export default router
