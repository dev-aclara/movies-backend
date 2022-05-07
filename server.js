const express = require('express');
const bodyparse = require('body-parser');
const cors = require('cors');

const user = require('./database/models/user');

const app = express();

app.use(express.json());
app.use(cors());

app.listen(21262, () => {
    console.log('Express started at http://localhost:21262');
})

////////////////////////////////////////////////
app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.post('/', function(req, res){
    const email = req.body.email;
    const senha = req.body.senha;
    const dataNascimento = req.body.dataNascimento;

    user.findOne({where: {email:email}}).then(result => {
        if (result != null){
            return res.json("E-mail já utlizado...");  
        }
        else{
            user.create({
                email : email,
                senha : senha,
                dataNascimento: dataNascimento
            }).then(() =>{return res.json("Sucesso ao gravar")})

        }
    })
})