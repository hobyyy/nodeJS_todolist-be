const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const authController = require('../controller/auth.controller');
//1. 회원가입 endpoint
router.post('/',userController.createUser)

// login할 때 req.body에서 email,password 정보를 읽어와야하기 때문에 post 사용
router.post('/login', userController.loginWithEmail)

// token을 통해 user id를 가져오고, 그 id로 권한관리
router.get('/me', authController.authenticate, userController.getUser) // 미들웨어 지정 : authController.authenticate


module.exports = router;