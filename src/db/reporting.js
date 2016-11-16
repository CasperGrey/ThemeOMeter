import express from 'express'
var bodyParser = require('body-parser')


// get an instance of router
var router = express.Router();
router.use(bodyParser.json())

import connection from './db.js'


export function getCurrentAgentAverageScores(agent_id,theme_id){
    return new Promise(function(resolve, reject){
        connection.query('SELECT da.agent_name, avg(fs.song_raw_score) as Score FROM factscores fs JOIN dimagents da on da.agent_id = fs.agent_id WHERE fs.song_picker_id = ? AND theme_id = ? and fs.valid_vote = 1 group by da.agent_name;', [agent_id,theme_id], function(err, rows, fields) {
            if (err) return reject(err);

            var result = rows

            resolve(result)

        });
    })
}

export function getCurrentAgentAverageScoring(agent_id,theme_id){
    return new Promise(function(resolve, reject){
        connection.query(`SELECT
                            agentpicking.agent_name AS agent_name,
                            avg(f.song_raw_score) as Score
                          FROM 		factscores 	f
                          LEFT JOIN 	dimthemes 	dt 			    	on f.theme_id = dt.theme_id
                          LEFT JOIN 	dimagents 	agentscoring 	on f.agent_id = agentscoring.agent_id
                          LEFT JOIN 	dimagents 	agentpicking 	on f.song_picker_id = agentpicking.agent_id
                          WHERE
                        	1 = 1
                            AND f.valid_vote = 1
                            AND f.theme_id = ?	-- given theme
                            AND f.agent_id = ?	-- given user
                          GROUP BY
                        	agentscoring.agent_name,
                          agentpicking.agent_name,
                        	dt.theme_name;`, [theme_id,agent_id], function(err, rows, fields) {
            if (err) return reject(err);

            var result = rows

            resolve(result)

        });
    })
}


export function getScoringComparisonCurrentTheme(agent_id,theme_id){
    return new Promise(function(resolve, reject){
        connection.query('SELECT da.agent_name, avg(fs.song_raw_score) as Score FROM factscores fs JOIN dimagents da on da.agent_id = fs.agent_id WHERE fs.song_picker_id = ? AND theme_id = ? and fs.valid_vote = 1 group by da.agent_name;', [agent_id,theme_id], function(err, rows, fields) {
            if (err) return reject(err);

            var result = rows

            resolve(result)

        });
    })
}
