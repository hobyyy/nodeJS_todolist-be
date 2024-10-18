const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')
require('dotenv').config()
const app = express()

app.use(bodyParser.json())
app.use(cors());
app.use('/api', indexRouter)

// mongoose setting
const mongoURI = process.env.MONGODB_URI_PROD;
// console.log('mongoURI', mongoURI)
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