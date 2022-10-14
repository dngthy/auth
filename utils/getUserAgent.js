const getUserAgent = () => {
  const UserAgent = require('user-agents')

  const userAgent = new UserAgent()
  return userAgent.data
}
module.exports = getUserAgent
