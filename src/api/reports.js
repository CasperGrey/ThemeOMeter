import express from 'express'
var bodyParser = require('body-parser')


// get an instance of router
var router = express.Router();
router.use(bodyParser.json())


import {getCurrentAgentAverageScores,getCurrentAgentAverageScoring} from './../db/reporting.js'
import { getCurrentTheme} from './../db/theme.js'


// route with parameters (http://localhost:8080/hello/:name)
router.post('/userscore', async function(req, res, next) {

    try {

      var user_id = req.body.user_id

      console.log(require('util').inspect(req.body))

      var currentTheme = await getCurrentTheme()

      console.log(currentTheme.theme_id)

      var scoredata = await getCurrentAgentAverageScores(user_id,currentTheme.theme_id)

      return res.send(scoredata)

    } catch(err){
        console.error(err)
        reject(err)
    }


});

router.post('/userscoring', async function(req, res, next) {

    try {

      var user_id = req.body.user_id

      console.log(require('util').inspect(req.body))

      var currentTheme = await getCurrentTheme()

      console.log(currentTheme.theme_id)

      var scoringdata = await getCurrentAgentAverageScoring(user_id,currentTheme.theme_id)

      return res.send(scoringdata)

    } catch(err){
        console.error(err)
        reject(err)
    }


});

export default router
