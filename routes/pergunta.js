var express = require('express');
var router = express.Router();

var utils = require('../util');
var Promise = require('promise');

let dbPesquisa = [];

let questionario = [];
questionario.push({});

// #1 C, R, F, A, S
let pergunta = {  'situacao': 1,
                'titulo': 'Várias pessoas do time ao qual você pertence estão em desacordo e procuram por você para ajudá-los.', 
                  'a':'Você esclarece o que eles esperam de você.', 
                  'b':'Você fala com os dois grupos separadamente para ouvir seu ponto de vista',
                  'c':'Você procura por uma solução que satisfaça a todos',
                  'd':'Você tenta resolver o problema sozinho',
                  'e':'Você gostaria de estar no comando de modo que você pudesse dizer-lhes o que fazer',
                  'h1':'C',
                  'h2':'R',
                  'h3':'F',
                  'h4':'A',
                  'h5':'S'
            };
questionario.push(pergunta);

// #2 - F, C, R, A, S
pergunta = {  'situacao': 2,
                'titulo': 'Alguém está atrasado para uma reunião com você. Qual sua reação mais provável?', 
                'a':'Você se sente incomodado porque você se esforçou para ser pontual', 
                'b':'Você se certifica que as informações que você tem sobre horário, data e local estão corretas',
                'c':'Você se pergunta o que pode tê-lo atrasado',
                'd':'Você deseja que tivesse trazido seu laptop para usar o tempo produtivamente',
                'e':'Você se sente desapontado com as pessoas',
                'h1':'F', 
                'h2':'C',
                'h3':'R',
                'h4':'A',
                'h5':'S'
            };
questionario.push(pergunta);

// # 3 - F, C, A, R, S
pergunta = {  'situacao': 3,
                'titulo': 'Seu chefe lhe dá um feedback de que você não se saiu bem em um importante projeto. Você:', 
                'a':'Pensa que o feedback leva em conta só um lado', 
                'b':'Pede por mais detalhes sobre o feedback',
                'c':'Decide executar os projetos a seu modo no futuro',
                'd':'Sente-se desconfortável com seu chefe e o evita pelo resto da semana',
                'e':'Sente-se decepcionado por ter desapontado seu chefe',
                'h1':'F',
                'h2':'C',
                'h3':'A',
                'h4':'R',
                'h5':'S'
            };
questionario.push(pergunta);

// #4 - S, C, A, R, F
pergunta = {  'situacao': 4,
                'titulo': 'Você aguarda na linha para uma importante assistência técnica. Você:', 
                'a':'Se aborrece porque eles não estão atendendo sua demanda imediatamente', 
                'b':'Quer saber quanto tempo você terá que esperar',
                'c':'Usa o tempo para responder e-mails',
                'd':'Sente pela pessoa que o atende e que parece estar tão estressada',
                'e':'Espera pacientemente - todos estão no mesmo barco',
                'h1':'S',
                'h2':'C',
                'h3':'A',
                'h4':'R',
                'h5':'F'
            };
questionario.push(pergunta);

// #5 - R, S, C, F, A
pergunta = {  'situacao': 5,
                'titulo': 'É seu primeiro dia no cargo de gerente e você está pensando em seu novo time. A primeira reunião que você marca é:', 
                'a':'Um almoço descontraído para conhecer uns aos outros, com todo o time. ', 
                'b':'Com seu chefe para saber o que é importante para ele.',
                'c':'Com todo o time para esclarecer expectativas',
                'd':'Com o RH para comparar seu salário com o do resto do time',
                'e':'Com cada membro do time para descobrir como eles querem que você proceda',
                'h1':'R',
                'h2':'S',
                'h3':'C',
                'h4':'F',
                'h5':'A'
            };
questionario.push(pergunta);

// #6 - C, S, A, R, F
pergunta = {  'situacao': 6,
                'titulo': 'Você vai pegar um longo voo para fora do país. Voce:', 
                'a':'Chega no aeroporto com bastante antecedência - atrasar estressa você', 
                'b':'Chega no aeroporto em cima da hora - o avião não vai sair sem você',
                'c':'Gostaria de ter um leque maior de escolhas de filmes e refeições',
                'd':'Espera sentar-se perto de alguém com quem você se sinta confortável',
                'e':'Espera receber um upgrade deivdo à sua milhagem expressiva',
                'h1':'C',
                'h2':'S',
                'h3':'A',
                'h4':'R',
                'h5':'F'
            };
questionario.push(pergunta);

// #7 - C, R, S, A, F
pergunta = {  'situacao': 7,
                'titulo': 'Sua família está pressionando para que você passe mais tempo com eles. Você?', 
                'a':'Se pergunta como fazê-los felizes', 
                'b':'Sente-se mal por tê-los aborrecido',
                'c':'Sente-se frustrado pois eles não entendem quão ocupado você está',
                'd':'Concorda, mas pede a eles para deixar o planejamento com você',
                'e':'Sente-se incomodado porque eles não lhe dão crédito algum pelo esforço que você obviamente faz',
                'h1':'C',
                'h2':'R',
                'h3':'S',
                'h4':'A',
                'h5':'F'
            };
questionario.push(pergunta);

// #8 - C, S, A, R, F
pergunta = {  'situacao': 8,
                'titulo': 'Você está procurando um novo carro. Como você decide sobre qual automóvel comprar?', 
                'a':'Você lê e compara análises em revistas especializadas', 
                'b':'Não é preciso tomar decisão alguma - você já sabe que carro você quer',
                'c':'Você vai à maior revendedora com a maior opção de escolhas',
                'd':'Sua família conhece bem um revendedor perto de casa. Você vai comprar com eles.',
                'e':'Você visita sites da internet para achar a melhor oferta',
                'h1':'C',
                'h2':'S',
                'h3':'A',
                'h4':'R',
                'h5':'F'
            };
questionario.push(pergunta);

// #9 - S, R, C, A, F
pergunta = {  'situacao': 9,
                'titulo': 'Você se matriculou em um novo programa de treinamento. Você:', 
                'a':'Se sente animado com em expandir suas qualificações', 
                'b':'Se empolga sobre as novas pessoas que você vai conhecer',
                'c':'Se sente nervoso sobre o que pode ser esperado de você',
                'd':'Se sente preocupado em ter que fazer coisas que você não quer',
                'e':'Espera que todos se envolvam com a mesma quantidade de esforço individual',
                'h1':'S',
                'h2':'R',
                'h3':'C',
                'h4':'A',
                'h5':'F'
            };
questionario.push(pergunta);

// #10 - R, S, A, F, C
pergunta = {  'situacao': 10,
                'titulo': 'Você está levando um velho amigo para jantar. O que é mais provável que você faça:', 
                'a':'Ir a seu bistrô favorito, onde todo mundo se conhece', 
                'b':'Quer conhecer o mais novo restaurante da cidade',
                'c':'Descobre que tipo de comida seu amigo aprecia e então escolhe',
                'd':'Liga para seu amigo e decide junto com ele',
                'e':'Vai naquele onde as avaliações são sempre positivas',
                'h1':'R',
                'h2':'S',
                'h3':'A',
                'h4':'F',
                'h5':'C'
            };
questionario.push(pergunta);

// #11 - C, R, F, S, A
pergunta = {  'situacao': 11,
                'titulo': 'Alguns amigos vão ficar em sua casa no final de semana. Você:', 
                'a':'Passa a semana toda planejando o itinerário', 
                'b':'Se anima com a perspectiva de passar tempo juntos',
                'c':'Envia a eles algumas sugestões sobre o que fazer e os deixa escolher aquelas que mais lhe apetecem',
                'd':'Gostaria que eles viessem no outono, quando seu jardim atinge o seu apogeu',
                'e':'Espera ter um tempo para você mesmo e recarregar as baterias durante o final de semana',
                'h1':'C',
                'h2':'R',
                'h3':'F',
                'h4':'S',
                'h5':'A'
            };
questionario.push(pergunta);

// #12 - S, F, A, R, C
pergunta = {  'situacao': 12,
                'titulo': 'Seu gestor quer levá-lo para celebrar um contrato recente. Você:', 
                'a':'Se sente lisonjeado por ser reconhecido pelo bom trabalho', 
                'b':'Pensa que é muito bom que seu chefe compartilhe a boa maré',
                'c':'Espera que a escolha do lugar seja sua',
                'd':'Sugere fazer algo com o time todo ao invés de irem só vocês dois',
                'e':'Esclarece com seu chefe e exatamente o que foi que você fez que o deixou satisfeito',
                'h1':'S',
                'h2':'F',
                'h3':'A',
                'h4':'R',
                'h5':'C'
            };
questionario.push(pergunta);

// #13 - A, C, F, R, S
pergunta = {  'situacao': 13,
                'titulo': 'Seu time está trabalhando em um projeto importante que está parado aguardando decisões de outras áreas. Você:', 
                'a':'Se sente em desvantagem por conta de toda a burocracia', 
                'b':'Fala com os outros gerentes para descobrir mais detalhes',
                'c':'Gostaria que os outros entendessem o quanto isso atrasa vocês',
                'd':'Se preocupa com o impacto que isso terá no estado de ânimo de seu time',
                'e':'Fica estressado sobre o impacto que isso trará para sua credibilidade',
                'h1':'A',
                'h2':'C',
                'h3':'F',
                'h4':'R',
                'h5':'S'
            };
questionario.push(pergunta);

// # 14 - F, A, R, C, S
pergunta = {  'situacao': 14,
                'titulo': 'Você acha difícil conectar-se com alguns dos membros mais jovens de seu time. Você?', 
                'a':'Pergunta a eles como trabalhar nesta dificuldade juntos', 
                'b':'Procura na internet algumas ideias que você possa implementar',
                'c':'Leva essas pessoas para almoçar e achar um modo de conectar-se',
                'd':'Fala com outros gerentes para descobrir o que deu certo para eles',
                'e':'Faz uma fala diretiva sobre a importância de se respeitar o gerente',
                'h1':'F',
                'h2':'A',
                'h3':'R',
                'h4':'C',
                'h5':'S'
            };
questionario.push(pergunta);



let dbData = [];
let resultados = [];

function imprimir(pergunta) {
    console.log(pergunta);
    console.log('\n ');
}

router.post('/pergunta', (req,res) => {

    // TESTE
    console.log('valores das perguntas');

    questionario.forEach(imprimir);
    
    var pergunta = req.body.pergunta; 

    var usuario = utils.Descripta(req.body.usuario); 
    //console.log(usuario + ' '+req.body.usuario);
    
    if (pergunta !=0){

        var h1 = req.body.h1;
        var h2 = req.body.h2;
        var h3 = req.body.h3;
        var h4 = req.body.h4;
        var h5 = req.body.h5;
        
        dados = {'pergunta':pergunta, [h1]:req.body.v1, [h2]:req.body.v2, [h3]:req.body.v3, [h4]:req.body.v4, [h5]:req.body.v5};
    
        dbPesquisa.push(dados);
    }

    if (pergunta != 14){ 

        // console.log({ data: {'pergunta':(parseInt(pergunta)+1), 
        //             'usuario': utils.Encripta(usuario)}, 
        //             'questao': questionario[(parseInt(pergunta)+1)] });

        //let questao = questionario[(parseInt(pergunta)+1)];
            
        res.render('pergunta.ejs', { data: {'pergunta':(parseInt(pergunta)+1), 
                                             'usuario': utils.Encripta(usuario),  
                                             'questao': questionario[(parseInt(pergunta)+1)] }});
    }
    else{

        dbData = dbPesquisa;

        let promiseStatus = sumarizarStatus();
        let promiseCerteza = promiseStatus.then( sumarizarCerteza(), console.error);
        let promiseAutonomia = promiseCerteza.then( sumarizarAutonomia(), console.error);
        let promiseRelacionamento = promiseAutonomia.then( sumarizarRelacionamento(), console.error);
        let promiseJustica = promiseRelacionamento.then( sumarizarJustica(), console.error);

        resultados.push( totStatus );
        resultados.push( totCerteza );
        resultados.push( totAutonomia  );
        resultados.push( totRelacionamento );
        resultados.push( totJustica );

        console.log('loop');

        var registro =  { 
            'usuario': usuario,
            'questionario': dbPesquisa,
            'resultado': resultados
        }

        console.log(registro);

        // Salvar Dados
        db.collection('data').insertOne(registro,(err, result)=>{
            if (validar(err)==false)
                res.send(err);
        });

        // console.log(req.body);
        // console.log(registro);

        // TODO: Consultar todos os dados do usuário e exibir resultado
        res.render('resultado.ejs', { registro });
        
        dbPesquisa = [];
        dbData = [];
        resultados = [];
    }

});

function validar(err){
    if (err){
        console.log(err);
        return false;
    }
    return true;
}

let totStatus;
let ctrStatus = 0;
function sumarizarStatus(){

    return new Promise(function(resolve,reject) {
        var totalStatus = parseInt(dbData.reduce( function( prevVal, elem ) {
            return parseInt(prevVal) + parseInt(elem.S);
        }, 0 ));
        totStatus = {'status': ((totalStatus/210)*100).toFixed(2)} ;
        ctrStatus = 1;
        console.log('status');
    });
    
}

// ## ---- Promises - inicio

let totCerteza;
let ctrCerteza = 0;
function sumarizarCerteza(){

    return new Promise(function(resolve,reject) {
        // ## CERTEZA
        var totalCerteza = parseInt(dbData.reduce( function( prevVal, elem ) {
            return parseInt(prevVal) + parseInt(elem.C);
        }, 0 ));
        totCerteza = {'certeza': ((totalCerteza/210)*100).toFixed(2) };
        ctrCerteza = 1;
        console.log('certeza');
    });    
}

let totAutonomia;
let ctrAutonomia = 0;
function sumarizarAutonomia(){
    
    return new Promise(function(resolve,reject) {
        // ## AUTONOMIA
        var totalAutonomia = parseInt(dbData.reduce( function( prevVal, elem ) {
            return parseInt(prevVal) + parseInt(elem.A);
        }, 0 ));
        totAutonomia = {'autonomia': ((totalAutonomia/210)*100).toFixed(2) };
        ctrAutonomia = 1;
        console.log('autonomia');
    });
}

let totRelacionamento;
let ctrRelacionamento = 0;
function sumarizarRelacionamento(){
    // ## RELACIONAMENTO
    return new Promise(function(resolve,reject) {
        var totalRelacionamento = parseInt(dbData.reduce( function( prevVal, elem ) {
            return parseInt(prevVal) + parseInt(elem.R);
        }, 0 ));
        totRelacionamento = {'relacionamento': ((totalRelacionamento/210)*100).toFixed(2) };
        ctrRelacionamento = 1;
        console.log('relacionamento');
    });
}

let totJustica;
let ctrJustica = 0;
function sumarizarJustica(){
    // ## JUSTICA
    return new Promise(function(resolve,reject) {
        var totalJustica = parseInt(dbData.reduce( function( prevVal, elem ) {
            return parseInt(prevVal) + parseInt(elem.F);
        }, 0 ));
        totJustica = {'justica': ((totalJustica/210)*100).toFixed(2) } ;
        ctrJustica = 1;
        console.log('justica');
    });
}

// ## ---------------------- [fim]

module.exports = router;