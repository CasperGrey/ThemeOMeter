import express from 'express'


// get an instance of router
var router = express.Router();

import connection from '../db/db.js'
import { getCurrentTheme } from './../db/theme.js'

// route with parameters (http://localhost:8080/hello/:name)
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

export default router
