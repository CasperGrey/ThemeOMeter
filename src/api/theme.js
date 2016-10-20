import express from 'express'
var bodyParser = require('body-parser')


// get an instance of router
var router = express.Router();
router.use(bodyParser.json())

import connection from '../db/db.js'
import { getCurrentTheme , getThemes, toggleCurrentTheme, toggleCurrentThemeOff,clearTheme} from './../db/theme.js'

// route with parameters (http://localhost:8080/hello/:name)

router.post('/', async function(req, res, next) {



    try {

      var theme_id = req.body.theme_id

      console.log(require('util').inspect(req.body))

      var currentTheme = await getCurrentTheme()

      console.log('Turning off current theme')

      await toggleCurrentThemeOff(currentTheme.theme_id)

      console.log('Turning on new theme')

      var theme = await  toggleCurrentTheme(theme_id)
      }
     catch(err){
        console.error(err)
        reject(err)
      }

});

router.post('/wipe', async function(req, res, next) {



    try {

      var theme_id = req.body.theme_id

      console.log(require('util').inspect(req.body))

      console.log('Wiping All Songs From Current Theme')

      await clearTheme(theme_id)

      }
     catch(err){
        console.error(err)
        reject(err)
      }

});

router.get('/current', async function(req, res, next) {

    try {
        var currentTheme = await getCurrentTheme()
        if (currentTheme == null)
            return res.status(404).send({
                message: "No current theme"
            })

        return res.send({
            name: currentTheme.theme_name,
            theme_id: currentTheme.theme_id
        })
    } catch (err){
        reject(err);
    }

});

router.get('/all', async function(req, res, next) {

  try{
      var themes = await getThemes()
      res.send(themes)
  } catch (err){
      next(err)
  }

});

export default router
