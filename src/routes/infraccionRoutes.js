const Infraccion = require ('../models/infraccion');


module.exports = function (app)
{
app.get('/infraccion', (req, res) => {
Infraccion.getInfraccion((err, data) =>{
  res.status(200).json({"datos":data});
});


});
app.post('/infraccion', (req, res) => {
const infraccionData = {
id: null,
lugar_infraccion:req.body.lugar_infraccion,
municipio_infraccion:req.body.municipio_infraccion,
fecha_infraccion:req.body.fecha_infraccion,
hora_infraccion:req.body.hora_infraccion,
datos_vehiculo_id:req.body.datos_vehiculo_id

};

Infraccion.insertInfraccion(infraccionData, (err, data) => {
  if (data && data.insertId) {
    console.log(data);
  res.json ({
    success: true,
    msg: 'Infraccion Insertada',
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
app.put('/infraccion/:id', (req, res) => {
  const infraccionData = {
  id: req.params.id,
  lugar_infraccion: req.body.lugar_infraccion,
  municipio_infraccion:req.body.municipio_infraccion,
  fecha_infraccion:req.body.fecha_infraccion,
  hora_infraccion:req.body.hora_infraccion,
  datos_vehiculo_id:req.body.datos_vehiculo_id

  };

  Infraccion.updateInfraccion(infraccionData, (err, data) =>{
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


app.delete('/infraccion/:id', (req, res) => {
  Infraccion.deleteInfraccion(req.params.id, (err, data) => {

    if (data && data.msg === 'deleted' || data.msg ==='not exists') {
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
