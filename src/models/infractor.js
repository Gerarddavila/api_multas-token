const database = require ('../db/db');

let infractorModel = {};

infractorModel.getInfractor = (callback) => {
  if (database.connection) {
    database.connection.query('SELECT * FROM datos_infractor ORDER BY id',
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

infractorModel.insertInfractor = (infractorData, callback) => {
  if (database.connection){
    database.connection.query('INSERT INTO datos_infractor SET ?', infractorData,
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

infractorModel.updateInfractor = (infractorData, callback) => {
  if (database.connection) {
const sql = `UPDATE datos_infractor SET
nombres = ${database.connection.escape(infractorData.nombres)},
apellidos = ${database.connection.escape(infractorData.apellidos)},
conductor_ausente = ${database.connection.escape(infractorData.conductor_ausente)},
genero = ${database.connection.escape(infractorData.genero)},
no_licencia = ${database.connection.escape(infractorData.no_licencia)},
tipo_licencia = ${database.connection.escape(infractorData.tipo_licencia)},
no_documento_dpi = ${database.connection.escape(infractorData.no_documento_dpi)},
domicilio = ${database.connection.escape(infractorData.domicilio)},
datos_vehiculo_id = ${database.connection.escape(infractorData.datos_vehiculo_id)}
WHERE id= ${database.connection.escape(infractorData.id)}
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


infractorModel.deleteInfractor = (id, callback)=>{
  if (database.connection) {
    let sql = `SELECT * FROM datos_infractor WHERE id = ${database.connection.escape(id)}`;
    database.connection.query(sql, (err, row)=> {
      if (row) {
        let sql = `DELETE FROM datos_infractor WHERE id = ${id}`;
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

module.exports = infractorModel;
