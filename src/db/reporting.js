import express from 'express'
var bodyParser = require('body-parser')


// get an instance of router
var router = express.Router();
router.use(bodyParser.json())

import connection from './db.js'


export function getCurrentAgentAverageScores(agent_id,theme_id){
    return new Promise(function(resolve, reject){
        connection.query('SELECT da.agent_name, avg(fs.song_raw_score) FROM factscores fs JOIN dimagents da on da.agent_id = fs.agent_id WHERE fs.song_picker_id = ? AND theme_id = ? and fs.valid_vote = 1 group by da.agent_name;', [agent_id,theme_id], function(err, rows, fields) {
            if (err) return reject(err);

            var result = rows

            resolve(result)

        });
    })
}
