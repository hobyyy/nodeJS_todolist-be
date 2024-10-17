const express = require('express')
const router = express.Router()

const taskAPI = require('./task.api')
router.use('/tasks', taskAPI); // "/api/tasks"가 /tasks로 연결

module.exports = router;