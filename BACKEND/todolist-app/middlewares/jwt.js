const JSONWebToken = require('../functions/jwt')

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    //console.log(token);

    // Verifica si el token está presente
    if (!token) {
        return res.status(401).json({ error: 'Token de autenticación no proporcionado' });
    }

    let decoded = JSONWebToken.verifyToken(token);
    console.log(decoded)

    if(!decoded){
        return res.status(403).json({ error: 'Token de autenticación inválido' });
    }
    
    req.user = decoded['username'];
    next();
}

module.exports = {
    verifyToken,
};