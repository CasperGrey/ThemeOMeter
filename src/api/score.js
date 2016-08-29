import express from 'express'
var bodyParser = require('body-parser')


// get an instance of router
var router = express.Router();
router.use(bodyParser.json())


import {enterScore} from './../db/.js'


// route with parameters (http://localhost:8080/hello/:name)
router.post('/', async function(req, res, next) {

        var theme_id = req.body.theme_id
        var song_id = req.body.song_id
        var score = req.body.score
        var song_comment = req.body.song_comment

    try {
            var score = await enterScore(theme_id,song_id,score,song_comment)

        }
    }catch(err){

        console.error(err)
        next(err)


    }


});

export default router
