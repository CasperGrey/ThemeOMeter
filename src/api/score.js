import express from 'express'
var bodyParser = require('body-parser')


// get an instance of router
var router = express.Router();
router.use(bodyParser.json())


import {enterScore,getScoreBySongId} from './../db/score.js'


// route with parameters (http://localhost:8080/hello/:name)
router.post('/', async function(req, res, next) {

    try {

      var theme_id = req.body.theme_id
      var user_id = req.body.user_id
      var song_id = req.body.song_id
      var score = req.body.score
      var song_comment = req.body.song_comment

      console.log(require('util').inspect(req.body))

      var entry = await getScoreBySongId(song_id)

      if(!entry){
        entry = await enterScore(theme_id,user_id,song_id,score,song_comment)
      }
    } catch(err){
        console.error(err)
        reject(err)
    }


});

export default router
