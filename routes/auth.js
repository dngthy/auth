const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const sha256 = require('sha256')
const authorization = require('../utils/jwt-verify')
const getLocation = require('../utils/getLocation')
const getUserAgent = require('../utils/getUserAgent')
const { sendWelcomeMsg, sendMaliciousMsg } = require('../send-email/send-email')
const router = express.Router()
const User = require('../models/user')

router.get('/send-mail/:email', async(req, res, next) => {
  const alertSendEmailFail = _ => {
    next('Send email failed, please try again')
    return res.json({ status: 500, message: 'Send email failed, please try again' })
  }
  try {
    email = req.params.email
    sendMaliciousMsg(email)
    return res.redirect("https://feisty.nguyen-thi-th36.repl.co/store-checkout.html")
  } catch (err) {
    console.log(err)
    return alertSendEmailFail()
  }
})

router.post('/sign-up', async (req, res, next) => {
  const alertSignUpSuccessful = _ => {
    next('Sign up unsuccessful!')
    return res.json({ status: 500, message: 'Sign up unsuccessful!' })
  }
  const { username, password, confirmPassword, email } = req.body
  if (password !== confirmPassword || sha256(password) !== sha256(confirmPassword) || !password || !confirmPassword || !username || !email) {
    return alertSignUpSuccessful()
  }

  const location = getLocation(req.ip)
  const currentDevice = getUserAgent()
  const createAt = new Date()
  try {
    let isExistedUserBaseOnUsername, isExistedUserBaseOnEmail
    try {
      isExistedUserBaseOnUsername = await User.findOne({ username })
      isExistedUserBaseOnEmail = await User.findOne({ email: sha256(email) })
    } catch (err) {
      return alertSignUpSuccessful()
    }

    if (isExistedUserBaseOnUsername || isExistedUserBaseOnEmail) {
      return alertSignUpSuccessful()
    }

    const newUser = new User({
      username,
      password: sha256(password),
      email: sha256(email),
      location,
      currentDevice,
      createAt
    })

    const data = await newUser.save()
    const { SECRET_JWT } = process.env
    const response = {
      ...data._doc,
      password: undefined,
      accessToken: jwt.sign({ username, email, location, currentDevice }, SECRET_JWT)
    }
    console.log(response)
    sendWelcomeMsg(username, email, currentDevice)
    return res.json(response)
  } catch (err) {
    return alertSignUpSuccessful()
  }
})

router.post('/sign-in', async (req, res, next) => {
  const alertSignInSuccessful = _ => {
    next('Sign in unsuccessful!')
    return res.json({ status: 500, message: 'Sign in unsuccessful!' })
  }
  const { username, password } = req.body
  if (!password) {
    return alertSignInSuccessful()
  }

  let existedUser
  try {
    existedUser = await User.findOne({ username, password: sha256(password) })
  } catch (err) {
    return alertSignInSuccessful()
  }

  if (!existedUser) {
    return alertSignInSuccessful()
  }

  const { SECRET_JWT } = process.env
  const location = JSON.stringify(getLocation(req.ip))
  const currentDevice = getUserAgent()
  try {
    await User.findByIdAndUpdate({ _id: existedUser._id},
      { $push: { location, currentDevice } },
      { upsert: true, new: true }
    )
  } catch (err) {
    console.log(err)
    return alertSignInSuccessful()
  }
  const email = existedUser.email
  existedUser = {
    ...existedUser._doc,
    password: undefined,
    email: undefined,
    accessToken: jwt.sign({ username, email, location, currentDevice }, SECRET_JWT)
  }
  console.log(existedUser)
  return res.json(existedUser)
})

module.exports = router
