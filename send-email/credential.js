const nodemailer = require('nodemailer')
const { HOST_EMAIL, PASS_EMAIL } = process.env

const transporter = nodemailer.createTransport({

  service: 'gmail',

  auth: {

    user: HOST_EMAIL,

    pass: PASS_EMAIL

  },
  tls: {
    ciphers: 'SSLv3'
  }

})
module.exports = transporter
