const JSONWebToken = require('../functions/jwt')
const crypt = require('../functions/crypt')

const User = require('../models/User')

const authCtrl = {}
authCtrl.login = (req, res) => {
    const {username, password} = req.body;

    User.findOne({username})
    .then(data => {
        if(!data){
            res.status(404).json({ status: 404, text: 'Usuario no encontrado.' });
        }

        crypt.comparePassword(password, data['password'])
        .then(match => {
            if(match){
                const token = JSONWebToken.signToken(username);
                res.status(200).json({accessToken: token});
            }else{
                res.status(401).json({ status: 401, text: 'Credenciales invalidas.' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ status: 400, text: `Error: ${err}` });
        })
    })
    .catch(err => {
        console.log(`Hubo un error al realizar la peticion. Error: ${err}`);
    });
}

authCtrl.register = (req, res) => {
    const {username, email, password} = req.body;

    crypt.encryptPassword(password)
    .then(hashedPassword => {
        let user = new User({username, email, password: hashedPassword});

        user.save()
        .then(doc => {
            const token = JSONWebToken.signToken(doc['username']);
            res.status(201).json({accessToken: token});
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({status: 400, text: 'No se pudo realizar la solicitud. Error: ' + err});
        })
    })
    .catch(err => {
        console.log(err);
    })
    
}

module.exports = authCtrl