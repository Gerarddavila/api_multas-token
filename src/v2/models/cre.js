const database = require ('../db/db');

let credencialesModel = {};


credencialesModel.getDatosCredenciales= (credencialesData, callback) => {
  if (database.connection) {
    database.connection.query(`SELECT password, privilegios_id FROM credenciales where usuario = ${database.connection.escape(credencialesData.usuario)};`,
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





credencialesModel.getCredenciales = (callback) => {
  if (database.connection) {
    database.connection.query('SELECT * FROM credenciales ORDER BY id',

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

credencialesModel.insertCredenciales = (credencialesData, callback) => {
  if (database.connection){
    database.connection.query('INSERT INTO credenciales SET ?', credencialesData,
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

credencialesModel.updateCredenciales = (credencialesData, callback) => {
  if (database.connection) {
const sql = `UPDATE credenciales SET
usuario = ${database.connection.escape(credencialesData.usuario)},
password = ${database.connection.escape(credencialesData.password)},
privilegios_id = ${database.connection.escape(credencialesData.privilegios_id)}
WHERE id= ${database.connection.escape(credencialesData.id)}
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


credencialesModel.deleteCredenciales = (id, callback)=>{
  if (database.connection) {
    let sql = `SELECT * FROM credenciales WHERE id = ${database.connection.escape(id)}`;
    database.connection.query(sql, (err, row)=> {
      if (row) {
        let sql = `DELETE FROM credenciales WHERE id = ${id}`;
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

module.exports = credencialesModel;
