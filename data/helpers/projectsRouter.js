const router = require('express').Router()

const Projects = require('./projectModel')

router.get('/projects', (req, res) => {
    Projects.get()
    .then((actions)=>{ res.status(200).json(actions)})
    .catch(err => res.status(500).json(`${err}`))
})










module.exports = router