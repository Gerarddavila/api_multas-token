const Privilegios = require('../models/privilegios');
module.exports = function (app) {
  app.get('/privilegios', (req, res) => {
    //res.json([]);
    Privilegios.getPrivilegios((err, data) => {
      res.status(200).json({"datos":data});
    });
  });

  app.post('/privilegios', (req, res) => {
    //console.log(req, body);
    const privilegiosData = {
      id:null,
      privilegio:req.body.privilegio
    };
  //});
  Privilegios.insertPrivilegios(privilegiosData, (err, data) => {
  if (data && data.insertId) {
    console.log(data);
  res.json ({
    success: true,
    msg: 'Privilegio Insertado',
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

app.put('/privilegios/:id', (req, res) => {
  const privilegiosData = {
  id: req.params.id,
  privilegio: req.body.privilegio
  };

  Privilegios.updatePrivilegios(privilegiosData, (err, data) =>{
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


app.delete('/privilegios/:id', (req, res) => {
  Privilegios.deletePrivilegios(req.params.id, (err, data) => {

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
