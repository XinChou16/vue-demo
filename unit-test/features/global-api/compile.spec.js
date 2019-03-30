
function compileRenderFunction() {
  const res = Vue.compile('<div><span>{{ msg }}</span></div>')
  const vm = new Vue({
    data: {
      msg: 'hello'
    },
    render: res.render,
    staticRenderFns: res.staticRenderFns
  }).$mount()

  const isSame = vm.$el.innerHTML === '<span>hello</span>'
  console.log({isSame})
}
// compileRenderFunction()