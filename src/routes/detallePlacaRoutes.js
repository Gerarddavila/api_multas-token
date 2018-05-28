const Placa = require('../models/placa');
module.exports = function (app) {

  app.get('/placa', (req, res) => {
      Placa.getPlaca((err, data) => {
      res.status(200).json({"datos":data});
    });
  });

  app.get('/placa/:placa', (req, res) => {
    const placaData ={
      placa: req.params.placa
    };
      Placa.getPlacaIndividual(placaData,(err, data) => {
      res.status(200).json({"datos":data});
    });
  });
}
