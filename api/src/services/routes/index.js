const route = require('express').Router()
const { getOperations, addOperation, getResultant } = require('../controllers')

route.get('/operations', getOperations)
route.get('/getResultant', getResultant)
route.post('/addOperation', addOperation)

module.exports = route
