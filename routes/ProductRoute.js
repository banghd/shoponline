const route = require('express').Router()
const ProductController = require('../controllers/ProductController')
const auth = require('../middleware/auth')



route.get('/', ProductController.index)  // Lay thong tin tat ca san pham
route.post('/add', auth, ProductController.create) // Them san pham
route.get('/search', ProductController.find) // Tim kiem
route.delete('/delete', auth, ProductController.delete) // Xoa 
route.patch('/update', auth, ProductController.update)  // Chinh sua thong tin

module.exports = route

