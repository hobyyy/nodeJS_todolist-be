const jwt = require('jsonwebtoken');
require('dotenv').config();  // env파일의 값을 가져오기 위해
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const authController = {}

// 미들웨어
authController.authenticate = (req,res,next) => {
  try {
    const tokenString = req.headers.authorization // Bearer aksduhflwf
    if(!tokenString) {
      throw new Error('empty token')
    }
    const token = tokenString.replace('Bearer ','')
    jwt.verify(token, JWT_SECRET_KEY, (error,payload) => {
      if(error) {
        throw new Error('invalid token')
      }
      // console.log('payload', payload)
      // res.status(200).json({status:'success', userID : payload._id})
      req.userID = payload._id  // @@@보내는 건데 왜 res가 아니라 req인거지?
      next()  //다음이 어디인지 user.api.js에서 지정한다.
    });
  }catch(error) {
    res.status(400).json({status:'fail',message:error.message})
  }
}

module.exports = authController;