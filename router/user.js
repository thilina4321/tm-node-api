const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
//team 
const userController = require('../controller/user')
const user = require('../model/user')
 
//routes
router.post('/users', userController.createUser)
router.get('/users',auth,userController.fetchUsers)
router.patch('/users/me',auth,userController.updateUser)
router.delete('/users/me',auth, userController.deleteUser)
router.post('/users/loging', userController.logingUser)
router.post('/users/logout',auth, userController.logoutUser)
router.post('/users/logoutAll',auth, userController.logoutFromAll)
module.exports = router