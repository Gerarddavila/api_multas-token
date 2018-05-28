const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const morgan = require ('morgan');
const bodyParser = require('body-parser');

//variables
var router=express.Router();
var authenticateController=require('../login/login');
process.env.SECRET_KEY="thisismysecretkey";
//Configuracion del puerto

app.set('port', process.env.PORT || 3000);

// middlewares

app.use (morgan('dev'));
app.use (bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.post('/login',authenticateController.authenticate);
app.use('/agente',router);
app.use('/articulo',router);
app.use('/credenciales',router);
app.use('/detalle',router);
app.use('/infraccion',router);
app.use('/infractor',router);
app.use('/observaciones',router);
app.use('/placa',router);
app.use('/privilegios',router);
app.use('/top',router);
app.use('/vehiculo',router);
app.use('/cre',router);
app.use('/datos',router);
//routes
require ('./routes/articuloRoutes')(app);
require('./routes/agenteRoutes') (app);
require('./routes/observacionesRoutes') (app);
require('./routes/privilegiosRoutes') (app);
require('./routes/credencialesRoutes') (app);
require ('./routes/infraccionRoutes')(app);
require('./routes/infractorRoutes')(app);
require('./routes/vehiculoRoutes')(app);
require('./routes/detalleRoutes')(app);
require('./routes/detallePlacaRoutes')(app);
require('./routes/topRoutes')(app);
require('./v2/routes/datosRoutes')(app);
require('./v2/routes/credencialesRoutes') (app);
require('./v2/routes/creRoutes') (app);

// validation middleware

router.use(function(req,res,next){
    var token=req.body.token || req.headers['token'];
    if(token){
        jwt.verify(token,process.env.SECRET_KEY,function(err,ress){
            if(err){
                res.status(500).send('Token Invalido');
            }else{
                next();
            }
        })
    }else{
        res.send('Por favor envía un token')
    }
})

app.listen(app.get('port'), () => {
  console.log('Servidor en puerto 3000');
});
