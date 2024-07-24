import cors_proxy from 'cors-anywhere'

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 8080

cors_proxy
  .createServer({
    originWhitelist: [],
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
  })
  .listen(port, host)
