const Vehiculo = require('../models/vehiculo');
module.exports = function (app) {

  app.get('/vehiculo', (req, res) => {
      Vehiculo.getVehiculo((err, data) => {
      res.status(200).json({"datos":data});
    });
  });

  app.get('/vehiculo/:id', (req, res) => {
    const vehiculoData ={
      id: req.params.id
    };
      Vehiculo.getVehiculoIndividual(vehiculoData,(err, data) => {
      res.status(200).json({"datos":data});
    });
  });

  app.post('/vehiculo', (req, res) => {

    const vehiculoData = {
      id:null,
      no_multa:req.body.no_multa,
      no_placa:req.body.no_placa,
      no_tarjeta_cir:req.body.no_tarjeta_cir,
      tipo_vehiculo:req.body.tipo_vehiculo,
      marca:req.body.marca,
      color:req.body.color
    };

  Vehiculo.insertVehiculo(vehiculoData, (err, data) => {
  if (data && data.insertId) {
    console.log(data);
  res.json ({
    success: true,
    msg: 'Vehiculo Insertado',
    data:data
  })
} else {
  res.status(500).json({
    success:false,
    msg: 'Error'
  })
}
})
});

app.put('/vehiculo/:id', (req, res) => {
  const vehiculoData = {
  id: req.params.id,
  no_multa:req.body.no_multa,
  no_placa:req.body.no_placa,
  no_tarjeta_cir:req.body.no_tarjeta_cir,
  tipo_vehiculo:req.body.tipo_vehiculo,
  marca:req.body.marca,
  color:req.body.color
  };

  Vehiculo.updateVehiculo(vehiculoData, (err, data) =>{
  if (data && data.msg) {
    res.json(data)
  }  else {
    res.json({
      success: false,
      msg: 'Error'
    })
  }
  })

});


app.delete('/vehiculo/:id', (req, res) => {
  Vehiculo.deleteVehiculo(req.params.id, (err, data) => {

    if (data && data.msg === 'Eliminado' || data.msg ==='No Existe') {
res.json ({
  success: true,
data

})
} else {
  res.status(500),json({
    msg: 'Error'
  })
}
  });

});
}
