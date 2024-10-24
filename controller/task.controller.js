const Task = require('../model/Task');

const taskController = {}

taskController.createTask = async(req,res) => {
  try {
    const { task, isComplete } = req.body;
    const userID = req.userID; // auth.controller에서 설정된 사용자 ID
    const newTask = new Task({ task, isComplete, author: userID });
    await newTask.save();
    const taskList = await Task.findById(newTask._id).populate('author', 'name email');
    res.status(200).json({status: 'success', data: newTask});
  }catch(err) {
    // console.error('Error creating task:', err.message); // 추가된 로그
    res.status(400).json({status: 'fail', error: err.message});
  }
}

taskController.getTask = async(req,res) => {
  try {
    const taskList = await Task.find().populate("author", "name email").lean();
    res.status(200).json({status: 'success', data: taskList});
  }catch(err) {
    res.status(400).json({status: 'fail', error: err.message});
  }
}

taskController.updateTask = async(req,res) => {
  try {
    const task = await Task.findById(req.params.id);
    if(!task) {
      throw new Error('App con not find the task');
    }
    const fields = Object.keys(req.body);
    fields.map((item) => (task[item] = req.body[item]));
    await task.save();
    res.status(200).json({status: 'OK', data: task});
  }catch(err) {
    res.status(400).json({status: 'FAIL', error: err});
  }
}

taskController.deleteTask = async(req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ status: 'FAIL', message: 'Task not found' });
    }
    res.status(200).json({ status: 'OK', message: 'Task deleted successfully' });
  } catch (err) {
    res.status(400).json({ status: 'FAIL', error: err.message });
  }
};

module.exports = taskController;