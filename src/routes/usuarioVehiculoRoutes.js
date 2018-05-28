const Vehiculo = require('../models/usuario_vehiculo');
module.exports = function (app) {

  app.get('/usuario_vehiculo', (req, res) => {
      Vehiculo.getVehiculo((err, data) => {
      res.status(200).json({"datos":data});
    });
  });

  app.get('/usuario_vehiculo/:id', (req, res) => {
    const vehiculoData ={
      id: req.params.id
    };
      Vehiculo.getVehiculoIndividual(vehiculoData,(err, data) => {
      res.status(200).json({"datos":data});
    });
  });

  app.post('/usuario_vehiculo', (req, res) => {

    const vehiculoData = {
      id:null,
      placa_usuario:req.body.placa_usuario,
      nombre_carro:req.body.nombre_carro,
      credenciales_id:req.body.credenciales_id
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

app.put('/usuario_vehiculo/:id', (req, res) => {
  const vehiculoData = {
  id: req.params.id,
  placa_usuario:req.body.placa_usuario,
  nombre_carro:req.body.nombre_carro,
  credenciales_id:req.body.credenciales_id
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


app.delete('/usuario_vehiculo/:id', (req, res) => {
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
