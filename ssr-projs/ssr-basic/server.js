const createApp = require('./app')
const server =  require('express')()
const renderer = require('vue-server-renderer').createRenderer()

server.get('*', (req, res) => {
  const context = { url: req.url }
  const app = createApp(context)

  renderer.renderToString(app, (err, html) => {
    if (err) return

    res.end(html)
  })
})

server.listen(8000, () => {
  console.log('Running at 8000')
})


