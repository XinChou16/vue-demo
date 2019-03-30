function runWatchers() {
  const state = Vue.observable({
    count: 0
  })

  const app = new Vue({
    render(h) {
      return h('div', [
        h('span', state.count),
        h('button', {
          on: {
            click: () => {
              state.count++
            }
          }
        })
      ])
    }
  }).$mount()
  console.log(app.$el.querySelector('span').textContent)
  app.$el.querySelector('button').click()

  setTimeout(() => {
    console.log(app.$el.querySelector('span').textContent)
  }, 500);
}
runWatchers()