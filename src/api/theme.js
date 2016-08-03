import express from 'express'


// get an instance of router
var router = express.Router();

import connection from './db.js'


// route with parameters (http://localhost:8080/hello/:name)
router.get('/current', function(req, res, next) {



    connection.query('SELECT theme_name FROM dimthemes WHERE theme_current = 1;', function(err, rows, fields) {
        if (err) return next(err);

        if (rows.length == 0){
            return res.status(404).send({
                message: "No current theme"
            })
        }

        return res.send({
            name: rows[0].theme_name
        })

    });

});

export default router