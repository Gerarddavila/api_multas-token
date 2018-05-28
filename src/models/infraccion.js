const database = require ('../db/db');

let infraccionModel = {};

  infraccionModel.getInfraccion = (callback) => {

    if (database.connection)
    {
      database.connection.query ('SELECT *  FROM datos_infraccion ORDER BY id',
    (err,rows) => {
  if (err) {
  throw err;
  }

  else {
    callback(null, rows);
  }

    }
  )
    }
  };
  infraccionModel.insertInfraccion = (infraccionData, callback) => {
    if (database.connection){
      database.connection.query('INSERT INTO datos_infraccion SET ?', infraccionData,
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

  infraccionModel.updateInfraccion = (infraccionData, callback) => {
    if (database.connection) {
  const sql = `UPDATE datos_infraccion SET
  lugar_infraccion = ${database.connection.escape(infraccionData.lugar_infraccion)},
  municipio_infraccion = ${database.connection.escape(infraccionData.municipio_infraccion)},
  fecha_infraccion = ${database.connection.escape(infraccionData.fecha_infraccion)},
  hora_infraccion = ${database.connection.escape(infraccionData.hora_infraccion)},
  datos_vehiculo_id = ${database.connection.escape(infraccionData.datos_vehiculo_id)}
  WHERE id= ${database.connection.escape(infraccionData.id)}
  `
  database.connection.query(sql, (err, result) => {
    if (err)
    {
      throw err;
    }else {
      callback(null, {
        "msg": "success"
      });
    }
  })

    }
  };


  infraccionModel.deleteInfraccion = (id, callback)=>{
    if (database.connection) {
      let sql = `SELECT * FROM datos_infraccion WHERE id = ${database.connection.escape(id)}`;
      database.connection.query(sql, (err, row)=> {
        if (row) {
          let sql = `DELETE FROM datos_infraccion WHERE id = ${id}`;
          database.connection.query(sql, (err, result) => {
  if (err) {
    throw err;
  }else {
    callback (null,{
      msg: 'deleted'
    })
  }

  })
        }else {
          callback (null,{
            msg: 'Not exists'
          })

        }
      });
    }
  };
module.exports = infraccionModel;
