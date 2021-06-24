const router = require('express').Router()
const UserController = require('../controllers/UserController')
router.get('/', UserController.index)

router.post('/register' , UserController.register)

router.post('/login', UserController.login)

router.delete('/logout', UserController.logout)

router.patch('/update')


module.exports = router