import express from 'express'
var bodyParser = require('body-parser')


// get an instance of router
var router = express.Router();
router.use(bodyParser.json())

import connection from './db.js'



export function getUser(name){

    return new Promise(function(resolve, reject){
      connection.query('SELECT * from dimagents where agent_name = ?', [name], function(err, rows, fields) {
          if (err) return reject(err);

          var result = rows[0]

          resolve(result)

        });
  })
}

export function getuserbyId(accessToken){

    return new Promise(function(resolve, reject){
      connection.query('SELECT * from dimagents where access_token = ?', [accessToken], function(err, rows, fields) {
          if (err) return reject(err);

          var result = rows[0]

          resolve(result)

        });
  })
}


export function getUsers(){

    return new Promise(function(resolve, reject){
      connection.query('SELECT * from dimagents', function(err, rows, fields) {
          if (err) return reject(err);

          var result = rows[0]

          resolve(result)

        });
  })
}

export function createUser(name,accessToken){

    return new Promise(function(resolve, reject){
      connection.query('INSERT INTO dimagents (agent_name,agent_valid,access_token) VALUES(?,1,?)', [name,accessToken] , function(err, result) {
          if (err) return reject(err);

          resolve(result)

        });
    })
}
