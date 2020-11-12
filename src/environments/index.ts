let config

switch (process.env.NODE_ENV) {
  case 'development':
    config = require('./development')
    break
  case 'production':
    config = require('./production')
    break
  default:
    config = require('./development')
}

export default config
