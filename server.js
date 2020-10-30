const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')




const server = express()
server.use(helmet())
server.use(morgan('dev'))

server.use(express.json())

const projectsRouter = require('./data/helpers/projectsRouter')
const actionsRouter = require('./data/helpers/actionsRouter')
server.use('/api/', projectsRouter, actionsRouter)




server.get('/', (req, res) =>{
    res.send("the server is running")
})


module.exports=server