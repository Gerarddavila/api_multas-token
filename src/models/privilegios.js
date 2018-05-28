const database = require ('../db/db');

let privilegiosModel = {};

privilegiosModel.getPrivilegios = (callback) => {
  if (database.connection) {
    database.connection.query('SELECT * FROM privilegios ORDER BY id',
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

privilegiosModel.insertPrivilegios = (privilegiosData, callback) => {
  if (database.connection){
    database.connection.query('INSERT INTO privilegios SET ?', privilegiosData,
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

privilegiosModel.updatePrivilegios = (privilegiosData, callback) => {
  if (database.connection) {
const sql = `UPDATE privilegios SET
privilegio = ${database.connection.escape(privilegiosData.privilegio)}
WHERE id= ${database.connection.escape(privilegiosData.id)}
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


privilegiosModel.deletePrivilegios = (id, callback)=>{
  if (database.connection) {
    let sql = `SELECT * FROM privilegios WHERE id = ${database.connection.escape(id)}`;
    database.connection.query(sql, (err, row)=> {
      if (row) {
        let sql = `DELETE FROM privilegios WHERE id = ${id}`;
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

module.exports = privilegiosModel;
