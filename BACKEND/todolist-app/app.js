/* 
Created by: Teddy Alejandro Moreira Velez
An application made with the MERN stack (MongoDB, Express, Angular, NodeJS).
*/

const app = require('./config/app')

const activitiesRoutes = require('./routes/activities.routes')
const authRoutes = require('./routes/auth.routes')

app.use('/api/activities', activitiesRoutes)
app.use('/api/auth', authRoutes)

app.get('/api', (req, res) => {
    res.json({'code': 1, 'msg': 'ok'})
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('La aplicacion esta corriendo en el puerto ' + PORT)
})