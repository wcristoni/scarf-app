var express = require('express');
var router = express.Router();

var cripto = require('../util');
var Promise = require('promise');

let resultSetQuery = [];
 
router.post('/painel', (req, res)=>{

  var origem = parseInt(req.body.origem);
  var login = cripto.Descripta(req.body.usuario);
  var dbAux;

  // console.log('ValidarUsuario-before');
  let promiseValidaUsuario = ValidarUsuario(login);        
  let promiseProcessar = promiseValidaUsuario.then( function(){

    dbAux = JSON.parse(resultSetQuery.data);
    
    // se não foi encontrada uma pesquisa
    if (parseInt(resultSetQuery.statusCode) == 404){  
      console.log('direcionar para responder à pesquisa');
      res.render('index.ejs',{ data: {'pergunta':(parseInt(0)), 'usuario': req.body.usuario } });
    }
    
    var registro =  { 
      'usuario': dbAux[0].usuario,
      'questionario': dbAux[0].questionario,
      'resultado': dbAux[0].resultado
    }

    res.render('resultado.ejs', { registro } );

  }, console.error);

  resultSetQuery = null;
  
})

function ValidarUsuario(login){
  return new Promise(function(resolve,reject) {
      db.collection("data").find({'usuario': login}).toArray(function(err, result) {
          if (err){
              reject(err);
          } 
          else{
              resultSetQuery = {data: JSON.stringify(result), statusCode: (result.length > 0) ? 200 : 404 };
              resolve(resultSetQuery);
              // console.log('ValidarUsuario-end => F ' + resultSetQuery);
          }
      });
  });
}

module.exports = router;