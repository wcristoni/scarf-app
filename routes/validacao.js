var express = require('express');
var router = express.Router();

var cripto = require('../util');
var Promise = require('promise');

let resultSetQuery = [];
let data;
 
router.post('/validacao', (req, res)=>{

    var login = req.body.login;
    var senha = req.body.senha;
    var usuario = '';
    var ctrl = 0;

    console.log('ValidarUsuario-before');
    let promiseValidaUsuario = ValidarUsuario(login);        
    let promiseRedirecionar = promiseValidaUsuario.then( function(){

        if (resultSetQuery.statusCode == 404)
            ctrl = 1 // usuario não encontrado
        
        else if (resultSetQuery.statusCode == 200){

            var dbAux = JSON.parse(resultSetQuery.data);
            
            if (dbAux[0].matricula == login)
                console.log('login feito pela MATRICULA');
            
            if (dbAux[0].apelido == login)
                console.log('login feito pela APELIDO');
            
            if (dbAux[0].senha != cripto.Encripta(senha)){
                ctrl = 2; //senha incorreta
            }
        }

        if (ctrl == 0)
            // login ok
            // res.render('index.ejs',{ data: {'pergunta':(parseInt(0)), 'usuario': dbAux[0].usuario} });
            res.render('painel.ejs',{ data: {'pergunta':(parseInt(0)), 'usuario': dbAux[0].usuario, 'origem':(parseInt(1))} });
        else
            // 1 = usuario nao encontrado
            // 2 = senha incorreta
            res.render('login.ejs', {data:{'acaoLogin': ctrl, 'login': login} });

        console.log('promiseRedirecionar[F] -> ' + ctrl);
    }, console.error);

}, console.error);


function ValidarUsuario(login){
    return new Promise(function(resolve,reject) {
        db.collection("usuario").find({$or:[{'matricula': login}, {'apelido': login}]}).toArray(function(err, result) {
            if (err){
                reject(err);
            } 
            else{
                resultSetQuery = {data: JSON.stringify(result), statusCode: (result.length > 0) ? 200 : 404 };
                resolve(resultSetQuery);
                console.log('ValidarUsuario-end => F ' + resultSetQuery);
            }
        });
    });
}

module.exports = router;