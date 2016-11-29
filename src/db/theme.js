


import connection from '../db/db.js'


export function getCurrentTheme(){
  console.log('Getting current theme')
    return new Promise(function(resolve, reject){
        connection.query('SELECT * FROM dimthemes WHERE theme_current = 1;', function(err, rows, fields) {
            if (err) return reject(err);

            if (rows.length == 0){
                return reject(null)
            }

            resolve(rows[0])
        });
    })
}


export function getCurrentThemeProgress(theme_id){
  console.log(`Getting current theme progress id: ${theme_id}`)
    return new Promise(function(resolve, reject){
        connection.query('SELECT COUNT(factentry.entry_id) AS entries, COUNT(factscores.seqNo) AS scores, (COUNT(factentry.entry_id) / COUNT(factscores.seqNo)) AS progress, "Progress" AS xAxisName FROM factentry LEFT JOIN factscores ON factentry.theme_id = factscores.theme_id WHERE factentry.theme_id = ? and factentry.valid_entry = 1;',[theme_id], function(err, rows, fields) {
            if (err) return reject(err);

            var result = rows[0]

            resolve(result)
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



export function toggleCurrentTheme(theme_id){
    return new Promise(function(resolve, reject){
        connection.query('UPDATE dimthemes SET theme_current = 1 WHERE theme_id = ?;',[theme_id], function(err, rows, fields) {
            if (err) return reject(err);
            resolve()
        });
    })
}


export function toggleCurrentThemeOff(theme_id){
    return new Promise(function(resolve, reject){
        connection.query('UPDATE dimthemes SET theme_current = 0 WHERE theme_id = ?;',[theme_id], function(err, rows, fields) {
            if (err) return reject(err);
            resolve()
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

export function clearTheme(theme_id){
    return new Promise(function(resolve, reject){
        connection.query('DELETE FROM factentry WHERE theme_id = ?;',[theme_id], function(err, rows, fields) {
            if (err) return reject(err);
            resolve()
        });
    })
}


export function createTheme(theme_name){
    return new Promise(function(resolve, reject){
        connection.query('INSERT INTO dimthemes (theme_name,theme_agent_id,theme_num_ppl,theme_used,theme_current) VALUES (?,100,7,0,0);',[theme_name], function(err, rows, fields) {
            if (err) return reject(err);
            resolve()
        });
    })
}


export function getAllInTheme(theme_id){
  console.log('Getting current theme total')
    return new Promise(function(resolve, reject){
        connection.query('select count(*) as total from factentry where theme_id = ? and valid_entry = 1;',[theme_id], function(err, rows, fields) {
            if (err) return reject(err);

            if (rows.length == 0){
                return reject(null)
            }
            var result = rows
            resolve(result)
        });
    })
}
