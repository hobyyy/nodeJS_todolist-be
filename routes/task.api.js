const express = require('express')
const taskController = require('../controller/task.controller')
const router = express.Router()
 
router.post('/',taskController.createTask)

router.get('/', taskController.getTask)

// router.put('/:id', (req,res) => {
//   res.send('update task')
// })
router.put('/:id', taskController.updateTask);

// router.delete('/:id', (req,res) => {
//   res.send('delete task')
// })
router.delete('/:id', taskController.deleteTask);


module.exports = router;