const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('./config/key')
const { auth } = require('./middleware/auth')
const { User } = require('./models/User')

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json())
app.use(cookieParser())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/users/register', (req, res) => {
  const user = new User(req.body)
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, error: err });
    return res.status(200).json({
      success: true
    });
  })
})

app.post('/api/users/login', (req, res) => {
  // 요청한 이메일이 데이터베이스에 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        success: false,
        message: "요청하신 이메일에 해당되는 유저가 없습니다."
      })
    }
    // 있다면 비밀번호 맞는지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) return res.json({ success: false, message: "비밀번호가 틀렸습니다." })
      
      // 맞다면 토큰 생성
      user.generateToken((err, user) => {
        if (err) res.status(400).send(err)

        // 토큰을 저장한다. 어디에? (쿠키, 로컬스토리지) - 논란이 많은 주제
        res.cookie('x_auth', user.token)
          .status(200)
          .json({ success: true, userId: user._id })
      })
    })
  })
})

app.get('/api/users/auth', auth, (req, res) => {
  // 여기가 실행된다는 것은 auth 미들웨어를 통과했다는 뜻!
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    name: req.user.name,
    email: req.user.email,
    image: req.user.image
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})