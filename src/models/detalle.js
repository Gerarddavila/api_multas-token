const database = require ('../db/db');

let detalleModel = {};

detalleModel.getDetalle = (callback) => {
  if (database.connection) {
    database.connection.query(' SELECT * FROM datos_vehiculo INNER JOIN datos_infractor ON datos_infractor.datos_vehiculo_id = datos_vehiculo.id INNER JOIN datos_infraccion ON datos_infraccion.datos_vehiculo_id = datos_vehiculo.id INNER JOIN articulo_infringido ON articulo_infringido.datos_vehiculo_id = datos_vehiculo.id INNER JOIN datos_agente ON datos_agente.datos_vehiculo_id = datos_vehiculo.id',
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

detalleModel.getDetalleIndividual = (detalleData, callback) => {
  if (database.connection) {
    database.connection.query(` SELECT * FROM datos_vehiculo
INNER JOIN datos_infractor ON datos_infractor.datos_vehiculo_id = datos_vehiculo.id
INNER JOIN datos_infraccion ON datos_infraccion.datos_vehiculo_id = datos_vehiculo.id
INNER JOIN articulo_infringido ON articulo_infringido.datos_vehiculo_id = datos_vehiculo.id
INNER JOIN datos_agente ON datos_agente.datos_vehiculo_id = datos_vehiculo.id
WHERE datos_vehiculo.no_placa = ${database.connection.escape(detalleData.placa)} ;`,
    (err, rows) => {
      if (err) {
        throw err;
      }else {
        callback(null, rows);
      }
    }
  )}
};
module.exports = detalleModel;
