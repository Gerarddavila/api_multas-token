const Observaciones = require('../models/observaciones');
module.exports = function (app) {
  app.get('/observaciones', (req, res) => {
    //res.json([]);
    Observaciones.getObservaciones((err, data) => {
      res.status(200).json({"datos":data});
    });
  });

  app.post('/observaciones', (req, res) => {
    //console.log(req, body);
    const observacionesData = {
      id:null,
      observacion:req.body.observacion,
      datos_agente_id:req.body.datos_agente_id
    };
  //});
  Observaciones.insertObservaciones(observacionesData, (err, data) => {
  if (data && data.insertId) {
    console.log(data);
  res.json ({
    success: true,
    msg: 'Observación Insertada',
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

app.put('/observaciones/:id', (req, res) => {
  const observacionesData = {
  id: req.params.id,
  observacion: req.body.observacion,
  datos_agente_id:req.body.datos_agente_id
  };

  Observaciones.updateObservaciones(observacionesData, (err, data) =>{
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


app.delete('/observaciones/:id', (req, res) => {
  Observaciones.deleteObservaciones(req.params.id, (err, data) => {

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
