const path = require('path')

module.exports = function override(config, env) {
  // const svgConfig = {
  //   test: /\.svg$/,
  //   loader: 'svg-inline-loader'
  // }
  const alias = {
    environment: path.resolve(process.cwd(), 'src', 'environments'),
    assets: path.resolve(process.cwd(), 'src', 'app', 'assets'),
    core: path.resolve(process.cwd(), 'src', 'packages', 'core'),
    'http-backend': path.resolve(process.cwd(), 'src', 'packages', 'http'),
    type: path.resolve(process.cwd(), 'src', 'packages', 'types'),
    ui: path.resolve(process.cwd(), 'src', 'packages', 'ui'),
    layout: path.resolve(process.cwd(), 'src', 'packages', 'layout'),
    form: path.resolve(process.cwd(), 'src', 'packages', 'forms'),
    'redux-core': path.resolve(process.cwd(), 'src', 'packages', 'redux-core'),
    router: path.resolve(process.cwd(), 'src', 'packages', 'router'),
    service: path.resolve(process.cwd(), 'src', 'packages', 'services'),
    Store: path.resolve(process.cwd(), 'src', 'app', 'Store', 'actions'),
    Shared: path.resolve(process.cwd(), 'src', 'app', 'Shared')
  }

  config.resolve.alias = alias
  // config.module.rules.push(svgConfig)

  return config
}
