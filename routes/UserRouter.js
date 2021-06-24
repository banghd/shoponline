const router = require('express').Router()
const UserController = require('../controllers/UserController')
router.get('/', UserController.index) //Test Route

router.post('/register' , UserController.register)  //Dang ki

router.post('/login', UserController.login)  //Dang nhap

router.get('/logout', UserController.logout)  //Dang xuat

router.get('/refreshToken', UserController.refreshToken )

module.exports = router