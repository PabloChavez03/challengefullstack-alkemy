const route = require('express').Router()
const { getOperations, addOperation, getBalance, updateOperation, deleteOperation } = require('../controllers')

route.get('/balance', getBalance)
route.get('/operations', getOperations)
route.post('/addOperation', addOperation)
route.patch('/updateOperation/:id', updateOperation)
route.delete('/deleteOperation/:id', deleteOperation)

module.exports = route
