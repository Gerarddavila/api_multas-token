const Datos = require('../models/datos');
module.exports = function (app) {

  app.get('/v2/datos', (req, res) => {
      Datos.getDatosTop((err, data) => {
      res.status(200).json({"datos":data});
    });
  });

  app.get('/v2/datos-placa/:placa', (req, res) => {
    const datosMulta ={
      placa: req.params.placa
    };
      Datos.getDatosPlaca(datosMulta,(err, data) => {
      res.status(200).json({"datos":data});
    });
  });

  app.get('/v2/datos-monto/:placa', (req, res) => {
    const datosMulta ={
      placa: req.params.placa
    };
      Datos.getDatosPlaca(datosMulta,(err, data) => {
      res.status(200).json({"datos":data});
    });
  });

  app.post('/v2/multa', (req, res) => {

    const vehiculoData = {
      idmultas:null,
      no_multa:req.body.no_multa,
      placa:req.body.placa,
      no_tarjeta_cir:req.body.no_tarjeta_cir,
      tipo_vehiculo:req.body.tipo_vehiculo,
      marca:req.body.marca,
      color:req.body.color,
      nombres:req.body.nombres,
      apellidos:req.body.apellidos,
      no_licencia:req.body.no_licencia,
      tipo_licencia:req.body.tipo_licencia,
      conductor_ausente:req.body.conductor_ausente,
      genero:req.body.genero,
      no_documento_dpi:req.body.no_documento_dpi,
      domicilio:req.body.domicilio,
      lugar_infraccion:req.body.lugar_infraccion,
      fecha:req.body.fecha,
      articulo_infringido:req.body.articulo_infringido,
      base_legal:req.body.base_legal,
      monto:req.body.monto,
      observaciones:req.body.monto
    };

  Datos.insertDatos(vehiculoData, (err, data) => {
  if (data && data.insertId) {
    console.log(data);
  res.json ({
    success: true,
    msg: 'Datos Insertado',
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

app.get('/v2/usuario_vehiculo', (req, res) => {
    Datos.getVehiculo((err, data) => {
    res.status(200).json({"datos":data});
  });
});

app.get('/v2/usuario_vehiculo/:id', (req, res) => {
  const vehiculoData ={
    id: req.params.id
  };
    Datos.getVehiculoIndividual(vehiculoData,(err, data) => {
    res.status(200).json({"datos":data});
  });
});

app.post('/v2/usuario_vehiculo', (req, res) => {

  const vehiculoData = {
    id:null,
    placa_usuario:req.body.placa_usuario,
    nombre_carro:req.body.nombre_carro,
    credenciales_id:req.body.credenciales_id
  };

Datos.insertVehiculo(vehiculoData, (err, data) => {
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

app.put('/v2/usuario_vehiculo/:id', (req, res) => {
const vehiculoData = {
id: req.params.id,
placa_usuario:req.body.placa_usuario,
nombre_carro:req.body.nombre_carro,
credenciales_id:req.body.credenciales_id
};

Datos.updateVehiculo(vehiculoData, (err, data) =>{
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


app.delete('/v2/usuario_vehiculo/:id', (req, res) => {
Datos.deleteVehiculo(req.params.id, (err, data) => {

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
