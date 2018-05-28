const articulo = require ('../models/articulo');

module.exports = function (app)
{
//-----------------------Obtener datos------------------------------------------
app.get('/articulo', (req, res) => {
articulo.getArticulo((err, data) =>{
  res.status(200).json({"datos":data});
});


});
//-------------------------Enviar de datos--------------------------------------
app.post('/articulo', (req, res) => {
const articuloData = {
id: null,
no_articulo:req.body.no_articulo,
descripcion_articulo:req.body.descripcion_articulo,
base_legal:req.body.base_legal,
monto_infraccion:req.body.monto_infraccion,
datos_vehiculo_id:req.body.datos_vehiculo_id,
datos_infraccion_id:req.body.datos_infraccion_id

};
articulo.insertArticulo(articuloData, (err, data) => {
  if (data && data.insertId) {
    console.log(data);
  res.json ({
    success: true,
    msg: 'articulo Insertado',
    data:data
  })
} else {
  res.status(500).json({
    success:false,
    msg: 'Error en enviar dato al servidor de BD'
  })
}
})
});
//------------------------Actualizacion-----------------------------------------
app.put('/articulo/:id', (req, res) => {
  const articuloData = {
  id: req.params.id,
  no_articulo:req.body.no_articulo,
  descripcion_articulo:req.body.descripcion_articulo,
  base_legal:req.body.base_legal,
  monto_infraccion:req.body.monto_infraccion,
  datos_vehiculo_id:req.body.datos_vehiculo_id,
  datos_infraccion_id:req.body.datos_infraccion_id

  };

  articulo.updateArticulo(articuloData, (err, data) =>{
  if (data && data.msg) {
    res.json(data)
  }  else {
    res.json({
      success: false,
      msg: 'Error en la Actualizacion'
    })
  }
  })

});
//------------------------Eliminacion-------------------------------------------
app.delete('/articulo/:id', (req, res) => {
  articulo.deleteArticulo(req.params.id, (err, data) => {

    if (data && data.msg === 'deleted' || data.msg ==='not exists') {
res.json ({
  success: true,
data

})
} else {
  res.status(500),json({
    msg: 'Error articulo no existe!'
  })
}
  });

});
}
