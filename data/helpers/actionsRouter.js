const router = require('express').Router()

const Actions = require('./actionModel')


router.get('/actions', (req, res) => {
    Actions.get()
    .then((actions)=>{ res.status(200).json(actions)})
    .catch(err => res.status(500).json(`${err}`))
})





module.exports = router