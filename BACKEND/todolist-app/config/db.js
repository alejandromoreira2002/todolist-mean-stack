const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI)
.then(db => console.log('conexion exitosa'))
.catch(err => console.log('error: ', err))

module.exports = mongoose