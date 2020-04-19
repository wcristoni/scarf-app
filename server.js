const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');

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

app.use(express.static(path.join(__dirname, 'public')));

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

var routePainel  = require('./routes/painel');
app.use('/', routePainel);

var routePergunta  = require('./routes/pergunta');
app.use('/', routePergunta);

app.set('view engine', 'ejs');

var porta = process.env.PORT || 8082;

app.listen(porta, function(){
    console.log('##########################################')
    console.log('------------------------------------------')
    console.log('A aplicação está rodando na porta ' + porta + '!');
    console.log('------------------------------------------')
    console.log('Conexao com o DataBase..................: ' + (process.env.MONGO_DB != ''));
    console.log('------------------------------------------')
    console.log('Conexao com o Collection................: ' + process.env.CLIENT_DB);
    console.log('------------------------------------------')
    console.log('Chave de criptografia está presente?      ' + (process.env.CRIPTO_KEY != '').toString());
    console.log('------------------------------------------')
    console.log('##########################################')
});

function validar(err){
    if (err){
        console.log(err);
        return false;
    }
    return true;
}
