const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken') // 토큰 만들어주는 패키지?
require('dotenv').config() // env파일 불러오기 위해
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const userSchema = Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
},{ timestamps:true })

userSchema.methods.toJSON = function() {
  const obj = this._doc;
  delete obj.password;
  delete obj.updatedAt;
  delete obj.__v;
  return this
}

userSchema.methods.generateToken = function() {
  const token = jwt.sign({_id:this._id}, JWT_SECRET_KEY, {expiresIn: '1d'})
  return token;
}
const User = mongoose.model('User', userSchema);
module.exports = User;