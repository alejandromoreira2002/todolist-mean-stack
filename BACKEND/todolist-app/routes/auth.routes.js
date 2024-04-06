const { Router } = require('express')
const router = Router()

const authCtrl = require('../controllers/auth.controller')

router.post('/login', authCtrl.login);

router.post('/signup', authCtrl.register);

module.exports = router