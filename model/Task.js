const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = Schema({
  task: {
    type: String,
    required: true,
  },
  isComplete: {
    type: Boolean,
    required: true,
    default: false, // 기본값 설정
  }
},{ timestamps:true })

const Task = mongoose.model("Task", taskSchema)
module.exports = Task;