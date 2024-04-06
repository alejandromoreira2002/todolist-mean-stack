const { Router } = require('express')
const router = Router()

const activitiesCtrl = require('../controllers/activities.controller')

const {verifyToken} = require('../middlewares/jwt');

router.get('/', verifyToken, activitiesCtrl.getActivities);

router.get('/:id', verifyToken, activitiesCtrl.getActivity);

router.post('/', verifyToken, activitiesCtrl.createActivity);

router.put('/:id', verifyToken, activitiesCtrl.updateActivity);

router.delete('/:id', verifyToken, activitiesCtrl.deleteActivity);

router.put('/do/:id', verifyToken, activitiesCtrl.checkActivity);

module.exports = router