const express = require('express')
const router = express.Router()

//team
const taskController = require('../controller/task')

//routers
router.post('/tasks', taskController.createTask)
router.get('/tasks', taskController.readTasks)
router.get('/tasks/:id', taskController.readTask)

module.exports = router