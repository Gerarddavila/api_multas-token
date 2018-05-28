//--------------------Configuracion de la conexion--------------------------------
const database = require ('../db/db');

//--------------------Metodo para obtener datos --------------------------------
let articuloModel = {};

articuloModel.getArticulo = (callback) => {
  if (database.connection)
  {
    database.connection.query ('SELECT *  FROM articulo_infringido',
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
//-----------------Metodo para enviar datos-------------------------------------
articuloModel.insertArticulo = (ArticuloData, callback) => {
  if (database.connection){
    database.connection.query('INSERT INTO articulo_infringido SET ?', ArticuloData,
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
//------------------Metodo para actualiar datos---------------------------------
articuloModel.updateArticulo = (ArticuloData, callback) => {
  if (database.connection) {
const sql = `UPDATE articulo_infringido SET
no_articulo = ${database.connection.escape(ArticuloData.no_articulo)},
descripcion_articulo = ${database.connection.escape(ArticuloData.descripcion_articulo)},
base_legal = ${database.connection.escape(ArticuloData.base_legal)},
monto_infraccion  = ${database.connection.escape(ArticuloData.monto_Articulo)},
datos_vehiculo_id = ${database.connection.escape(ArticuloData.datos_vehiculo_id)},
datos_infraccion_id  = ${database.connection.escape(ArticuloData.datos_infraccion_id)}
WHERE id= ${database.connection.escape(ArticuloData.id)}
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
//-------------------------Metodo de eliminacion--------------------------------
articuloModel.deleteArticulo = (id, callback)=>{
  if (database.connection) {
    let sql = `SELECT * FROM articulo_infringido WHERE id = ${database.connection.escape(id)}`;
    database.connection.query(sql, (err, row)=> {
      if (row) {
        let sql = `DELETE FROM articulo_infringido WHERE id = ${id}`;
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
module.exports = articuloModel;
