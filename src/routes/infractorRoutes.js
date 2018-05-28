/*const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([]);
});*/
const Infractor = require('../models/infractor');
module.exports = function (app) {
  app.get('/infractor', (req, res) => {
    //res.json([]);
    Infractor.getInfractor((err, data) => {
      res.status(200).json({"datos":data});
    });
  });

  app.post('/infractor', (req, res) => {

    const infractorData = {
      id:null,
      nombres:req.body.nombres,
      apellidos:req.body.apellidos,
      conductor_ausente:req.body.conductor_ausente,
      genero:req.body.genero,
      no_licencia:req.body.no_licencia,
      tipo_licencia:req.body.tipo_licencia,
      no_documento_dpi:req.body.no_documento_dpi,
      domicilio:req.body.domicilio,
      datos_vehiculo_id:req.body.datos_vehiculo_id
    };//console.log(req.body);
  //});

  Infractor.insertInfractor(infractorData, (err, data) => {
  if (data && data.insertId) {
    console.log(data);
  res.json ({
    success: true,
    msg: 'Infractor Insertado',
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

app.put('/infractor/:id', (req, res) => {
  const infractorData = {
  id: req.params.id,
  nombres: req.body.nombres,
  nombres:req.body.nombres,
  apellidos:req.body.apellidos,
  conductor_ausente:req.body.conductor_ausente,
  genero:req.body.genero,
  no_licencia:req.body.no_licencia,
  tipo_licencia:req.body.tipo_licencia,
  no_documento_dpi:req.body.no_documento_dpi,
  domicilio:req.body.domicilio,
  datos_vehiculo_id:req.body.datos_vehiculo_id
  };

  Infractor.updateInfractor(infractorData, (err, data) =>{
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


app.delete('/infractor/:id', (req, res) => {
  Infractor.deleteInfractor(req.params.id, (err, data) => {

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
