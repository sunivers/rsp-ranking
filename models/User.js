const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minlength: 5
  },
  image: String,
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
})

userSchema.pre('save', function (next) {
  // 여기서 this 객체는 저장하려고 하는 스키마 데이터다.
  const user = this

  // 비밀번호가 바꼈을때만 암호화
  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err)
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err)
        user.password = hash
        next()
      })
    })
  } else {
    next()
  }
})

const User = mongoose.model('User', userSchema)

module.exports = { User }