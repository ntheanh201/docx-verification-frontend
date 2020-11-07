const path = require('path')

module.exports = function override(config, env) {
  const alias = {
    core: path.resolve(process.cwd(), 'src', 'packages', 'core'),
    http: path.resolve(process.cwd(), 'src', 'packages', 'http'),
    ui: path.resolve(process.cwd(), 'src', 'packages', 'ui'),
    layout: path.resolve(process.cwd(), 'src', 'packages', 'layout'),
    form: path.resolve(process.cwd(), 'src', 'packages', 'form'),
    'redux-core': path.resolve(process.cwd(), 'src', 'packages', 'redux-core'),
    router: path.resolve(process.cwd(), 'src', 'packages', 'router'),
    Store: path.resolve(process.cwd(), 'src', 'app', 'Store'),
    Shared: path.resolve(process.cwd(), 'src', 'app', 'Shared')
  }

  config.resolve.alias = alias

  return config
}
