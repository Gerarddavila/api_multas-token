const Agente = require('../models/agente');
module.exports = function (app) {
  app.get('/agente', (req, res) => {
    //res.json([]);
    Agente.getAgente((err, data) => {
      res.status(200).json({"datos":data});
    });
  });

  app.post('/agente', (req, res) => {
    //console.log(req, body);
    const agenteData = {
      id:null,
      no_identificacion:req.body.no_identificacion,
      firmo_agente:req.body.firmo_agente,
      firmo_infractor:req.body.firmo_infractor,
      nego_firmar_infractor:req.body.nego_firmar_infractor,
      datos_vehiculo_id:req.body.datos_vehiculo_id,
      articulo_infringido_id:req.body.articulo_infringido_id,
      datos_infraccion_id:req.body.datos_infraccion_id
    };
  //});

  Agente.insertAgente(agenteData, (err, data) => {
  if (data && data.insertId) {
    console.log(data);
  res.json ({
    success: true,
    msg: 'Agente Insertado',
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

  app.put('/agente/:id', (req, res) => {
  const agenteData = {
  id: req.params.id,
  no_identificacion: req.body.no_identificacion,
  firmo_agente:req.body.firmo_agente,
  firmo_infractor:req.body.firmo_infractor,
  nego_firmar_infractor:req.body.nego_firmar_infractor,
  datos_vehiculo_id:req.body.datos_vehiculo_id,
  articulo_infringido_id:req.body.articulo_infringido_id,
  datos_infraccion_id:req.body.datos_infraccion_id
  };

  Agente.updateAgente(agenteData, (err, data) =>{
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


  app.delete('/agente/:id', (req, res) => {
  Agente.deleteAgente(req.params.id, (err, data) => {

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
