const route = require('express').Router()
const { getOperations, addOperation, getBalance } = require('../controllers')

route.get('/operations', getOperations)
route.get('/balance', getBalance)
route.post('/addOperation', addOperation)

module.exports = route
