const router = require('express').Router()

const Actions = require('./actionModel')


router.get('/actions', (req, res) => {
    Actions.get()
    .then((actions)=>{ res.status(200).json(actions)})
    .catch(err => res.status(500).json(`${err}`))
})

router.get('/actions/:id', (req, res) => {
    Actions.get(req.params.id)
    .then((action)=>{ res.status(200).json(action)})
    .catch(err => res.status(500).json(`${err}`))
})

router.post('/actions/:id', (req, res) => {
    const {description, notes, completed} = req.body
    const id = req.params.id
    if(!description || !notes){
        res.status(400).json({message: "missing description and/or notes"})
    } else{
        const newAction = { project_id: id, description, notes, completed}
        Actions.insert(newAction)
        .then ((data) => { res.status(201).json(data)})
        .catch(err => {res.status(500).json({message:"could not post action"})})
    }
})




router.delete('/actions/:id', (req, res) =>{
    Action.remove(req.params.id)
    .then(() => res.status(200).json({ message: `action ${req.params.id} was destroyed`}))
    .catch(err => res.status(500).json({message: "could not delete"}, err))
})





module.exports = router