const database = require ('../db/db');

let datosModel = {};

datosModel.getDatosTop = (callback) => {
  if (database.connection) {
    database.connection.query('SELECT placa, COUNT(placa) as multas FROM datos GROUP BY placa ORDER BY COUNT(placa) desc;',
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



datosModel.getDatosPlaca= (datosMulta, callback) => {
  if (database.connection) {
    database.connection.query(`SELECT nombres,apellidos,lugar_infraccion, fecha,monto FROM datos WHERE placa=${database.connection.escape(datosMulta.placa)};`,
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

datosModel.getDatosPlacaMonto= (datosMulta, callback) => {
  if (database.connection) {
    database.connection.query(`SELECT placa,monto FROM apimultas2.datos WHERE placa=${database.connection.escape(datosMulta.placa)};`,
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

datosModel.insertDatos = (datosMulta, callback) => {
  if (database.connection){
    database.connection.query('INSERT INTO apimultas2.datos SET ?', datosMulta,
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

datosModel.getVehiculo = (callback) => {
  if (database.connection) {
    database.connection.query('SELECT * FROM placa_usuario ORDER BY id',
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

datosModel.getVehiculoIndividual= (vehiculoData, callback) => {
  if (database.connection) {
    database.connection.query(` SELECT * FROM placa_usuario WHERE id = ${database.connection.escape(vehiculoData.id)} ;`,
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


datosModel.insertVehiculo = (vehiculoData, callback) => {
  if (database.connection){
    database.connection.query('INSERT INTO placa_usuario SET ?', vehiculoData,
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

datosModel.updateVehiculo = (vehiculoData, callback) => {
  if (database.connection) {
const sql = `UPDATE placa_usuario SET
placa_usuario = ${database.connection.escape(vehiculoData.placa_usuario)},
nombre_carro = ${database.connection.escape(vehiculoData.nombre_carro)},
credenciales_id = ${database.connection.escape(vehiculoData.credenciales_id)},
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

datosModel.deleteVehiculo = (id, callback)=>{
  if (database.connection) {
    let sql = `SELECT * FROM placa_usuario WHERE id = ${database.connection.escape(id)}`;
    database.connection.query(sql, (err, row)=> {
      if (row) {
        let sql = `DELETE FROM placa_usuario WHERE id = ${id}`;
        database.connection.query(sql, (err, result) => {
if (err) {
  throw err;
}else {
  callback (null,{
    msg: 'Eliminado'
  })
}        })
      }else {
        callback (null,{
          msg: 'No Existe'
        })
      }
    });
  }
};


module.exports = datosModel;
