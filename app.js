const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')
const app = express()

app.use(bodyParser.json())
app.use('/api', indexRouter)

// mongoose setting
const mongoURI = `mongodb://localhost:27017/todolist-demo`
// mongoose.connect(mongoURI)//,{useNewUrlParser:true}
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

.then(() => {
  console.log("mongoose connected")
})
.catch((err) => {
  console.log("DB connection fail", err)
})

// app listener setting
app.listen(5000, () => {
  console.log("server on 5000")
})