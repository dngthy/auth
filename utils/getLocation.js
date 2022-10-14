const geoip = require('geoip-lite')
const getLocation = async (ip) => {
  const fetchData = geoip.lookup(ip)
  return fetchData
}
module.exports = getLocation
