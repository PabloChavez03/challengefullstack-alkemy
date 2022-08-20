const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const routes = require('./services/routes')

// middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.use('/', routes)

// export
module.exports = app
