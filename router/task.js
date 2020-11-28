const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')

//team
const taskController = require('../controller/task')

//routers
router.post('/tasks',auth, taskController.createTask)
router.get('/tasks', auth, taskController.readTasks)
router.get('/tasks/:id',auth, taskController.readTask)
router.delete('/tasks/:id',auth, taskController.deleteTask)

module.exports = router