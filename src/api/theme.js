import express from 'express'


// get an instance of router
var router = express.Router();

import connection from '../db/db.js'
import { getCurrentTheme , getThemes, toggleCurrentTheme } from './../db/theme.js'

// route with parameters (http://localhost:8080/hello/:name)

router.post('/', async function(req, res, next) {

    var theme_id = req.body.theme_id

    console.log(require('util').inspect(req.body))

    try {
      var theme = await  toggleCurrentTheme(theme_id)
      }
     catch(err){
        console.error(err)
        next(err)
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
            name: currentTheme.theme_name
        })
    } catch (err){
        next(err);
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
