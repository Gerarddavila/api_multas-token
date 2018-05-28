const database = require ('../db/db');

let agenteModel = {};

agenteModel.getAgente = (callback) => {
  if (database.connection) {
    database.connection.query('SELECT * FROM datos_agente ORDER BY id',
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

agenteModel.insertAgente = (agenteData, callback) => {
  if (database.connection){
    database.connection.query('INSERT INTO datos_agente SET ?', agenteData,
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

agenteModel.updateAgente = (agenteData, callback) => {
  if (database.connection) {
const sql = `UPDATE datos_agente SET
no_identificacion = ${database.connection.escape(agenteData.no_identificacion)},
firmo_agente = ${database.connection.escape(agenteData.firmo_agente)},
firmo_infractor = ${database.connection.escape(agenteData.firmo_infractor)},
nego_firmar_infractor = ${database.connection.escape(agenteData.nego_firmar_infractor)},
datos_vehiculo_id = ${database.connection.escape(agenteData.datos_vehiculo_id)},
articulo_infringido_id = ${database.connection.escape(agenteData.articulo_infringido_id)},
datos_infraccion_id = ${database.connection.escape(agenteData.datos_infraccion_id)}
WHERE id= ${database.connection.escape(agenteData.id)}
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


agenteModel.deleteAgente = (id, callback)=>{
  if (database.connection) {
    let sql = `SELECT * FROM datos_agente WHERE id = ${database.connection.escape(id)}`;
    database.connection.query(sql, (err, row)=> {
      if (row) {
        let sql = `DELETE FROM datos_agente WHERE id = ${id}`;
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

module.exports = agenteModel;
