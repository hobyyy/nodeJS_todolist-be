const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

//1. 회원가입 endpoint
router.post('/',userController.createUser)

// login할 때 req.body에서 email,password 정보를 읽어와야하기 때문에 post 사용
router.post('/login', userController.loginWithEmail)
module.exports = router;