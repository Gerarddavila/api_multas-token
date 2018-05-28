const database = require ('../db/db');

let vehiculoModel = {};

vehiculoModel.getVehiculo = (callback) => {
  if (database.connection) {
    database.connection.query('SELECT * FROM datos_vehiculo ORDER BY id',
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

vehiculoModel.getVehiculoIndividual= (vehiculoData, callback) => {
  if (database.connection) {
    database.connection.query(` SELECT * FROM datos_vehiculo WHERE id = ${database.connection.escape(vehiculoData.id)} ;`,
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


vehiculoModel.insertVehiculo = (vehiculoData, callback) => {
  if (database.connection){
    database.connection.query('INSERT INTO datos_vehiculo SET ?', vehiculoData,
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

vehiculoModel.updateVehiculo = (vehiculoData, callback) => {
  if (database.connection) {
const sql = `UPDATE datos_vehiculo SET
no_placa = ${database.connection.escape(vehiculoData.no_placa)},
no_multa = ${database.connection.escape(vehiculoData.no_multa)},
no_tarjeta_cir = ${database.connection.escape(vehiculoData.no_tarjeta_cir)},
tipo_vehiculo = ${database.connection.escape(vehiculoData.tipo_vehiculo)},
marca = ${database.connection.escape(vehiculoData.marca)},
color = ${database.connection.escape(vehiculoData.color)}
WHERE id= ${database.connection.escape(vehiculoData.id)} `
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


vehiculoModel.deleteVehiculo = (id, callback)=>{
  if (database.connection) {
    let sql = `SELECT * FROM datos_vehiculo WHERE id = ${database.connection.escape(id)}`;
    database.connection.query(sql, (err, row)=> {
      if (row) {
        let sql = `DELETE FROM datos_vehiculo WHERE id = ${id}`;
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

module.exports = vehiculoModel;
