const Credenciales = require('../models/credenciales');

module.exports = function (app) {
  app.get('/v2/credenciales', (req, res) => {
    //res.json([]);
    Credenciales.getCredenciales((err, data) => {
      res.status(200).json({"datos":data});
    });
  });

///////////// Solicitud de Gerardo
app.get('/v2/datos-credenciales/:usuario', (req, res) => {
  const credencialesData ={
    usuario: req.params.usuario
  };
    Credenciales.getDatosCredenciales(credencialesData,(err, data) => {
    res.status(200).json({"datos":data});
  });
});


app.get('/v2/datos-login/:usuario', (req, res) => {
  const credencialesData ={
    usuario: req.params.usuario
  };
    Credenciales.getDatosLogin(credencialesData,(err, data) => {
    res.status(200).json(data);
  });
});
///////////

  app.post('/v2/credenciales', (req, res) => {
    //console.log(req, body);
    const credencialesData = {
      id:null,
      usuario:req.body.usuario,
      password:req.body.password,
      privilegios_id:req.body.privilegios_id
    };
  //});

  Credenciales.insertCredenciales(credencialesData, (err, data) => {
  if (data && data.insertId) {
    console.log(data);
  res.json ({
    success: true,
    msg: 'Credencial Insertada',
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

  app.put('/v2/credenciales/:id', (req, res) => {
  const credencialesData = {
  id: req.params.id,
  usuario: req.body.usuario,
  password:req.body.password,
  privilegios_id:req.body.privilegios_id
  };

  Credenciales.updateCredenciales(credencialesData, (err, data) =>{
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


  app.delete('/v2/credenciales/:id', (req, res) => {
  Credenciales.deleteCredenciales(req.params.id, (err, data) => {

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
