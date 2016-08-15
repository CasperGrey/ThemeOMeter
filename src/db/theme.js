


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
