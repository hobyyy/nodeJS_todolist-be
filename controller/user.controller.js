const User = require("../model/User");
const bcrypt = require('bcryptjs')  // 암호화 하는 패키지?

const saltRound = 10 // 암호화 할 때 필요한 상수값
const userController = {}

userController.createUser = async(req, res) => {
  try {
    const {email, name, password} = req.body
    const user  = await User.findOne({email})
    if(user) {
      throw new Error('이미 가입이 된 유저입니다.')
    }
    const salt = bcrypt.genSaltSync(saltRound)
    const hash = bcrypt.hashSync(password, salt)
    const newUser = new User({email, name, password:hash})
    await newUser.save()
    res.status(200).json({status: "success"})
  }catch(error) {
    res.status(400).json({status: "fail", message: error.message})
  }
};

userController.loginWithEmail = async(req,res) => {
  try {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(user) {
      const isCorrect = await bcrypt.compare(password, user.password)
      console.log('isCorrect',isCorrect)
      if(isCorrect) {
        const token = user.generateToken();
        return res.status(200).json({status:"success", user, token})
      }
    }
    throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.")
  }catch(error) {
    res.status(400).json({status:"fail", message: error.message})
  }
}

userController.getUser = async(req,res) => {
  try {
    const {userID} = req;
    const user = await User.findById(userID);
    
    // 순환 참조가 없는 객체로 변환
    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    if(!user) {
      throw new Error('can not find user');
    }
    res.status(200).json({ status: 'success', user: safeUser });
  }catch(error) {
    res.status(200).json({status:'fail', message:error.message})
  }
}
module.exports = userController;