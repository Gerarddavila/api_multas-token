var express=require("express");
var bodyParser=require('body-parser');
var jwt=require('jsonwebtoken');
//var connection = require('../src/db/db');
const database = require('../src/db/db');
module.exports.authenticate=function(req,res){
    var usuario=req.body.usuario;
    var password=req.body.password;
    database.connection.query('SELECT * FROM credenciales WHERE usuario = ?',[usuario], function (error, results, fields) {
      if (error) {
          res.json({
            Estado:'Erróneo',
            Mensaje:'Hay algún error con la consulta'
            })
      }else{
        if(results.length >0){
            if(password==results[0].password){
                var token=jwt.sign({id:usuario.id},process.env.SECRET_KEY,{
                    expiresIn:5000
                });
                res.json({
                    Estado:'Verdadero',
                    Token:token
                })
            }else{
                res.json({
                  Estado:'Erróneo',
                  Mensaje:"El usuario y la contraseña no coinciden"
                 });
            }

        }
        else{
          res.json({
              Estado:'Erróneo',
            Mensaje:"El usuario no existe"
          });
        }
      }
    });
}
