const jwt = require('jsonwebtoken')

const authorization = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader.split(' ')[1]
  if (token === null) return next('Token null')
  const { SECRET_JWT } = process.env
  jwt.verify(token, SECRET_JWT, (err, hash) => {
    if (err || !hash) return next('Token invalid')
    next()
  })
}

module.exports = authorization
