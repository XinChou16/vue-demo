const Vue = require('vue')
const server = require('express')()
const { createRenderer } = require('vue-server-renderer')

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    }
  })
  const renderer = createRenderer({
    template: require('fs').readFileSync('./index.template.html', 'utf-8')
  })
  const context = {
    title: 'Hello',
    url: req.url,
    meta: `<meta >`
  }

  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(html)
  })
})

server.listen(8000, () => {
  console.log('server run at 8000')
})