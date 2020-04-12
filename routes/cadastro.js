var express = require('express');
var router = express.Router();

var cripto = require('../util');
var Promise = require('promise');

let resultSetQuery;

router.post('/cadastro', (req, res)=>{
    
    var acao = req.body.acao;
    //console.log(req.body);

    if (acao == 0)
        res.render('cadastro.ejs', {data:{'acao': '1'}});
    else{
        // TODO: Criar toda lógica de negócio 
        // para salvar e direcionar para o inicio da pesquisa

        var usuario = req.body.usuario;
        var apelido = req.body.apelido;
        var matricula = req.body.matricula;
        var email = req.body.email;
        var senha = req.body.senha;
        var confirmacao = req.body.confirmacao;

        var matriculaAux;
        var ctrl = 0;  
     
        let promiseValidaUsuario = ValidarUsuario(apelido, matricula);
        
        let promiseRedirecionar = promiseValidaUsuario.then( function(){
            //console.log('[x]->' + resultSetQuery.statusCode);

            if (resultSetQuery.statusCode == 404){
                ctrl = 1; // novo usuario

                console.log('cadastrar usuario. -> ' + ctrl);
        
                var registro = {  'usuario': cripto.Encripta(usuario), 
                                  'apelido': apelido,
                                'matricula': matricula,
                                    'email': cripto.Encripta(email), 
                                    'senha': cripto.Encripta(senha),
                              'confirmacao': cripto.Encripta(confirmacao)};                

                console.log('cadastrando novo usuario');
                var dbAux2 = JSON.parse(resultSetQuery.data);
                console.log(dbAux2);
                // Salvar Dados
                db.collection('usuario').insertOne(registro,(err, result)=>{
                    if (validar(err)==false)
                        res.send(err);
                });
            }
            else {
                //console.log(resultSetQuery.data);
                var dbAux = JSON.parse(resultSetQuery.data);

                console.log('xxxxxx -> ' +  dbAux.length);
                console.log('xxxxxx -> ' +  JSON.stringify(dbAux));
                console.log('xxxxxx -> ' +  dbAux[0]);

                if (dbAux[0].matricula == matricula && dbAux[0].apelido == apelido){
                    // usuário já cadastrado
                    ctrl = 2;
                }
                else if (dbAux[0].matricula == matricula || dbAux[0].apelido == apelido){
                    matriculaAux = dbAux[0].matricula;
                    // login ou matrícula associado a outro usuário
                    ctrl = 3;
                }
            }
        
            console.log('promiseRedirecionar -> ' + ctrl );
            
        }, console.error);
        
        promiseRedirecionar.then(function(){

            var data = {    'usuario': cripto.Encripta(usuario), 
                            'apelido': apelido, 
                          'matricula': matricula, 
                              'email': cripto.Encripta(email),
                         'orientacao': ctrl, 
                           'pergunta': '0',
                       'matriculaAux': matriculaAux};

            console.log('acao -> ' + ctrl );
            console.log(data);

            // 1: usuario acabou de ser cadastrado              -> login
            // 2: usuário já cadastrado                         -> login (recuperar senha)
            // 3: login ou matrícula associado a outro usuário  -> login (recuparar senha ou falar com o admin)
            
            if (ctrl == 1)
                res.render('index.ejs', { 'data': data });
                // ORIGINAL
                // res.render('index.ejs',{ data: {'pergunta':(parseInt(0)), 'usuario': cripto.Encripta(usuario), 'apelido': apelido, 'matricula': matricula} });
            else{
                data.usuario = usuario;
                data.email = email;
                res.render('cadastro.ejs', { 'data': data });
            }
                
            
            resultSetQuery = '';

        },console.error);
        
    }
    
    
});


function ValidarUsuario(apelido, matricula){
    return new Promise(function(resolve,reject) {
        // console.log('ValidarUsuario => I')
        db.collection("usuario").find({$or:[{'matricula': matricula}, {'apelido': apelido}]}).toArray(function(err, result) {
            if (err){
                reject(err);
            } 
            else{
                resultSetQuery = {data: JSON.stringify(result), statusCode: (result.length > 0) ? 200 : 404 };
                resolve(resultSetQuery);
                //console.log('ValidarUsuario => F ' + resultSetQuery);
            }
        });
    });
}

function validar(err){
    if (err){
        console.log(err);
        return false;
    }
    return true;
}

module.exports = router;