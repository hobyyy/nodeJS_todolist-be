const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')
require('dotenv').config()
const app = express()

// Heroku에서 할당된 포트 사용
const PORT = process.env.PORT || 5500;
app.use(bodyParser.json())
app.use(cors());
app.use('/api', indexRouter)

// 404 핸들러 추가 (모든 라우트 핸들러 뒤에 위치)
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// mongoose setting
const mongoURI = process.env.MONGODB_URI_PROD;
console.log('mongoURI', mongoURI)
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

.then(() => {
  console.log("mongoose connected")
})
.catch((err) => {
  console.log("DB connection fail", err)
})

// app listener setting
app.listen(PORT, () => {
  console.log(`server on ${PORT}`)
})