const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
//team 
const userController = require('../controller/user')
const user = require('../model/user')

//routes
router.post('/users', userController.createUser)
router.get('/users',auth,userController.fetchUsers)
router.get('/users/:id',userController.fetchUser)
router.patch('/users/:id',userController.updateUser)
router.delete('/users/:id', userController.deleteUser)
router.post('/users/loging', userController.logingUser)
module.exports = router