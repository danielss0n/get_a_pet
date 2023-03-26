const jwt = require('jsonwebtoken')
const getToken = require("./get-token")
//middleware to validate token
const checkToken = (req, res, next) => {

    if(!req.headers.authorization) {
        return res.status(422).json({message:"Acesso negado"})
    }
    const token = getToken(req) 

    if(!token){
        return res.status(422).json({message:"Acesso negado"})
    }

    try {
        const verified = jwt.verify(token, 'nossosecret')
        req.user = verified
        next()
    } catch {
        return res.status(422).json({message:"Token inválido"}) 
    }
}

module.exports = checkToken