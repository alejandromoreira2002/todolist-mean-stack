const activityCtrl = {}

const Activity = require('../models/Activity')

activityCtrl.getActivities = (req, res) => {
    Activity.find({user: req.user}, {_id: 0, __v: 0, user: 0})
    .then(activities => {
        res.status(200).json({"code": 1, "msg": activities})
    })
    .catch(error => {
        res.status(400).json({"code": 0, "msg": `Error al buscar en la base de datos. Error: ${error}.`})
    })
}

activityCtrl.getActivity = (req, res) => {
    let id = req.params.id;

    Activity.findOne({id: id, user: req.user}, {_id: 0, __v: 0, user: 0})
    .then(activity => {
        if(activity=={}){
            res.status(404).json({"code": 0, "msg": "No existe la actividad"})
        }else{
            res.status(200).json({"code": 1, "msg": activity})
        }
    })
    .catch(error => {
        res.status(400).json({"code": 0, "msg": `Error al buscar en la base de datos. Error: ${error}.`})
    })
}

activityCtrl.createActivity = (req, res) => {
    Activity.findOne({user: req.user}).sort({$natural:-1}).exec()
    .then(data => {
        let indice = 0;
        if(data != null){
            indice = data['id']+1;
        }

        let activity = new Activity({
            id: indice,
            detail: req.body.detail,
            user: req.user
        })

        activity.save()
        .then(doc => {
            res.status(200).json({"code": 1, "msg": "Se han ingresado los datos correctamente."})
        })
        .catch(err => {
            res.status(400).json({"code": 0, "msg": `Error al ingresar los datos en la bd. Error: ${err}.`})
        })
    })
    .catch(err => {
        res.status(400).json({"code": 0, "msg": `Error al ingresar los datos en la bd. Error: ${err}.`})
    })
}

activityCtrl.updateActivity = (req, res) => {
    let id = Number(req.params.id);
    let newDetail = req.body.detail;

    Activity.findOneAndUpdate({id: id, user: req.user}, {detail: newDetail})
    .then(doc => {
        res.status(200).json({"code": 1, "msg": "Se actualizo el registro correctamente."})
    })
    .catch(err => {
        res.status(400).json({"code": 0, "msg": `No se pudo actualizar el registro. Error: ${err}.`})
    })
}

activityCtrl.checkActivity = (req, res) => {
    let id = Number(req.params.id);
    let checked = Boolean(req.body.checked);

    Activity.findOneAndUpdate({id: id, user: req.user}, {done: checked})
    .then(doc => {
        res.status(200).json({"code": 1, "msg": "Se actualizo el registro correctamente."})
    })
    .catch(err => {
        res.status(400).json({"code": 0, "msg": `No se pudo actualizar el registro. Error: ${err}.`})
    })
}

activityCtrl.deleteActivity = (req, res) => {
    let id = Number(req.params.id);
    Activity.deleteOne({id: id, user: req.user})
    .then(doc => {
        res.status(200).json({"code": 1, "msg": "Se elimino el registro correctamente."})
    })
    .catch(err => {
        res.status(400).json({"code": 0, "msg": `No se pudo eliminar el registro. Error: ${err}.`})
    })
}

module.exports = activityCtrl