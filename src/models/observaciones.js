const database = require ('../db/db');

let observacionesModel = {};

observacionesModel.getObservaciones = (callback) => {
  if (database.connection) {
    database.connection.query('SELECT * FROM observaciones ORDER BY id',
    (err, rows) => {
      if (err) {
        throw err;
      }else {
        callback(null, rows);
      }
    }
  )
  }
};

observacionesModel.insertObservaciones = (observacionesData, callback) => {
  if (database.connection){
    database.connection.query('INSERT INTO observaciones SET ?', observacionesData,
(err, result) => {
  if (err)
  {
    throw err;
  }
  else {
    callback(null, {'insertId': result.insertId})

  }
}
  )
  }
};

observacionesModel.updateObservaciones = (observacionesData, callback) => {
  if (database.connection) {
const sql = `UPDATE observaciones SET
observacion = ${database.connection.escape(observacionesData.observacion)},
datos_agente_id = ${database.connection.escape(observacionesData.datos_agente_id)}
WHERE id= ${database.connection.escape(observacionesData.id)}
`
database.connection.query(sql, (err, result) => {
  if (err)
  {
    throw err;
  }else {
    callback(null, {
      "msg": "Satisfactorio"
    });
  }
})

  }
};


observacionesModel.deleteObservaciones = (id, callback)=>{
  if (database.connection) {
    let sql = `SELECT * FROM observaciones WHERE id = ${database.connection.escape(id)}`;
    database.connection.query(sql, (err, row)=> {
      if (row) {
        let sql = `DELETE FROM observaciones WHERE id = ${id}`;
        database.connection.query(sql, (err, result) => {
if (err) {
  throw err;
}else {
  callback (null,{
    msg: 'Eliminado'
  })
}

        })
      }else {
        callback (null,{
          msg: 'No Existe'
        })

      }
    });
  }
};

module.exports = observacionesModel;
