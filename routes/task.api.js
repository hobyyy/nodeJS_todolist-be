const express = require('express');
const taskController = require('../controller/task.controller');
const authController = require('../controller/auth.controller');
const router = express.Router();
 
router.post('/', authController.authenticate, taskController.createTask);

router.get('/', authController.authenticate, taskController.getTask);

router.put('/:id', authController.authenticate, taskController.updateTask);

router.delete('/:id', authController.authenticate, taskController.deleteTask);

module.exports = router;