const Detalle = require('../models/detalle');
module.exports = function (app) {

  app.get('/detalle', (req, res) => {
      Detalle.getDetalle((err, data) => {
      res.status(200).json({"datos":data});
    });
  });

  app.get('/detalle/:placa', (req, res) => {
    const detalleData ={
      placa: req.params.placa
    };
      Detalle.getDetalleIndividual(detalleData,(err, data) => {
      res.status(200).json(data);
    });
  });
}
