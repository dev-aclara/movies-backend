const express = require('express');
const bodyparse = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');

const user = require('./database/models/user');

const app = express();

app.use(express.json());
app.use(cors());
app.use(session({
    secret: 'keyboard cat',
    proxy: true,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true }
}))

const port = process.env['PORT_api']

app.listen(port, () => {
    console.log('Express started at http://localhost:21262');
})

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

// Requisição de cadastro de usuário 
app.post('/', function(req, res){
    const email = req.body.email;
    const senha = req.body.senha;
    const dataNascimento = req.body.dataNascimento;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(senha, salt);
    user.findOne({where:{email:email}}).then(result =>{
        if(result != null){
            return res.json("Já existe esse email");
        }else{
            user.create({
                email: email,
                senha: hash,
                dataNascimento: dataNascimento
            }).then(() =>{return res.json("Sucesso ao gravar")})    
        }
    })
   
})

// Requisição para login
app.post('/login', (req,res)=> {
    const email = req.body.email;
    const senha = req.body.senha;

    user.findOne({where:{email:email}}).then(result => {
        var verify = bcrypt.compareSync(senha,result.senha);
        if(verify){
            req.session.result = {
                id: result.id,
                email: result.email
        }
            return res.send(req.session.result)
        }
        else{
            return res.json(1)
        }
    })
})