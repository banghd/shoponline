const route = require('express').Router()
const ProductController = require('../controllers/ProductController')
const auth = require('../middleware/auth')



route.get('/', ProductController.index)
route.post('/add', auth, ProductController.create)
route.get('/search', ProductController.find)
route.delete('/delete', auth, ProductController.delete)
route.patch('/update', auth, ProductController.update)

module.exports = route

