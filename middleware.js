const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
process.env.TOKEN_SECRET;

module.exports = (req, res, next) =>{
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.status(401).json({ erro:'token nao informado ' })
    }

    const parts = authHeader.split(' ')

    if(!parts.length === 2){
        return res.status(401).json({ erro:'Erro com o token' })
    }

    const [schema, token] = parts

    if(!/^Bearer$/i.test(schema)){
        return res.status(401).json({erro:'token mal formatado'})
    }

    jwt.verify(token, config.secret, (err, decoded)=>{
        if(err){
            return res.status(401).json({erro: 'Token invalido'})
        }
        req.userId = decoded.id
        return next()
    })
}