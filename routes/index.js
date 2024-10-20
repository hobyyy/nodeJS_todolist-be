const express = require('express')
const router = express.Router()
const taskAPI = require('./task.api')
const userAPI = require('./user.api')

router.use('/tasks', taskAPI); // "/api/tasks"가 /tasks로 연결
router.use('/user', userAPI)

module.exports = router;