const database = require ('../db/db');

let placaModel = {};

placaModel.getPlaca = (callback) => {
  if (database.connection) {
    database.connection.query(`SELECT datos_vehiculo.no_placa , datos_infractor.nombres, datos_infractor.apellidos, datos_infraccion.lugar_infraccion,
datos_infraccion.municipio_infraccion,datos_infraccion.fecha_infraccion, datos_infraccion.hora_infraccion
FROM datos_vehiculo
INNER JOIN datos_infractor ON datos_vehiculo.id = datos_infractor.datos_vehiculo_id
INNER JOIN datos_infraccion ON datos_vehiculo.id = datos_infraccion.datos_vehiculo_id
INNER JOIN articulo_infringido ON datos_vehiculo.id = articulo_infringido.datos_vehiculo_id;`,
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

placaModel.getPlacaIndividual = (placaData, callback) => {
  if (database.connection) {
    database.connection.query(`SELECT datos_vehiculo.no_placa , datos_infractor.nombres, datos_infractor.apellidos, datos_infraccion.lugar_infraccion,
datos_infraccion.municipio_infraccion,datos_infraccion.fecha_infraccion, datos_infraccion.hora_infraccion
FROM datos_vehiculo
INNER JOIN datos_infractor ON datos_vehiculo.id = datos_infractor.datos_vehiculo_id
INNER JOIN datos_infraccion ON datos_vehiculo.id = datos_infraccion.datos_vehiculo_id
INNER JOIN articulo_infringido ON datos_vehiculo.id = articulo_infringido.datos_vehiculo_id
WHERE datos_vehiculo.no_placa =  ${database.connection.escape(placaData.placa)} ;`,
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


module.exports = placaModel;
