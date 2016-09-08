import express from 'express'
var bodyParser = require('body-parser')


// get an instance of router
var router = express.Router();
router.use(bodyParser.json())


import {getUser, createUser} from './../db/user.js'

// route with parameters (http://localhost:8080/hello/:name)
router.post('/', async function(req, res, next) {

    try {

        var name = req.body.name
        var accessToken = req.body.accessToken

        console.log(require('util').inspect(req.body))

        var user = await getUser(name)
        if (!user) {
            var user = await createUser(name,accessToken)
        }

    }catch(err){

        console.error(err)
        next(err)


    }

});

export default router
