const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 

var dotenv = require('dotenv' );
dotenv.config({ silent: true });

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_DB;

MongoClient.connect(uri, (err, client, ) => {

    if (validar(err)==false)
        return console.log(err);

    db = client.db(process.env.CLIENT_DB);
});

app.use(bodyParser.urlencoded({extended: true}));

var helmet = require('helmet');
app.use(helmet())

console.log(__dirname + '/public' );
app.use(express.static(__dirname + '/public')); 

app.get('/', (req, res)=>{
    res.render('login.ejs', {data:{'acaoLogin': '0'}});
});

app.post('/', (req, res)=>{
    res.render('login.ejs', {data:{'acaoLogin': '0'}});
});

var routeCadastro  = require('./routes/cadastro');
app.use('/', routeCadastro);

var routeValidacao  = require('./routes/validacao');
app.use('/', routeValidacao);

var routePergunta  = require('./routes/pergunta');
app.use('/', routePergunta);

app.set('view engine', 'ejs');

app.listen(443, function(){
    console.log('A aplicação está rodando na porta 443!');
});

function validar(err){
    if (err){
        console.log(err);
        return false;
    }
    return true;
}
