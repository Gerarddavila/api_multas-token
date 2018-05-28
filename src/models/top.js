const database = require ('../db/db');

let topModel = {};

topModel.getTop= (callback) => {
  if (database.connection) {
    database.connection.query(`SELECT datos_vehiculo.no_placa AS placa, COUNT(datos_vehiculo.no_placa) AS multas FROM datos_vehiculo
INNER JOIN datos_infractor ON datos_infractor.datos_vehiculo_id = datos_vehiculo.id
INNER JOIN articulo_infringido ON articulo_infringido.datos_vehiculo_id = datos_vehiculo.id
GROUP BY datos_vehiculo.no_placa
ORDER BY COUNT(datos_vehiculo.no_placa) desc;`,
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

topModel.getTopCosto= (callback) => {
  if (database.connection) {
    database.connection.query(`SELECT datos_vehiculo.no_placa AS placa, COUNT(datos_vehiculo.no_placa) AS multas,SUM(articulo_infringido.monto_infraccion) AS total FROM datos_vehiculo
INNER JOIN datos_infractor ON datos_infractor.datos_vehiculo_id = datos_vehiculo.id
INNER JOIN articulo_infringido ON articulo_infringido.datos_vehiculo_id = datos_vehiculo.id
GROUP BY datos_vehiculo.no_placa
ORDER BY COUNT(datos_vehiculo.no_placa) desc;`,
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


module.exports = topModel;
