


import connection from '../db/db.js'


export function getCurrentTheme(){
    return new Promise(function(resolve, reject){
        connection.query('SELECT * FROM dimthemes WHERE theme_current = 1;', function(err, rows, fields) {
            if (err) return next(err);

            if (rows.length == 0){
                return reject(null)
            }

            resolve(rows[0])
        });
    })
}

export function getThemeById(id){
    console.log(`getthemeById id: ${id}`)
    return new Promise(function(resolve, reject){
        connection.query('SELECT * FROM dimthemes where theme_id = ?', [id] , function(err, rows, fields) {
            if (err) return reject(err);

            var result = rows[0]

            resolve(result)

        });
    })
}

export function createTheme(theme_name,theme_agent_id){
    return new Promise(function(resolve, reject){
      connection.query('INSERT INTO dimthemes (theme_name,theme_agent_id,theme_youtube, theme_num_ppl,seqNoCommentofWeek,theme_used,theme_current) VALUES(?,?,0,0,0,0,0)', [theme_name,theme_agent_id] , function(err, result) {
          if (err) return reject(err);

          resolve(getThemeById(result.insertId))

      });
    })
}


export function toggleCurrentTheme(theme_id){
    return new Promise(function(resolve, reject){
        connection.query('UPDATE dimthemes SET theme_current = 1 WHERE theme_id = ?;',[theme_id], function(err, rows, fields) {
            if (err) return reject(err);

        });
    })
}


export function getThemes(){
    return new Promise(function(resolve, reject){
        connection.query('SELECT * from dimthemes;', function(err, rows, fields) {
            if (err) return reject(err);

            var result = rows

            resolve(result)

        });
    })
}
