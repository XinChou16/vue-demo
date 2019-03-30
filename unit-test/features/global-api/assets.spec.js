
function registerComponent() {
  Vue.component('foo', {
    template: '<span>foo</span>',
  }) 
  Vue.component('bar', {
    template: '<span>bar</span>',
  }) 
  const vm = new Vue({
    template: '<div><foo></foo><bar></bar></div>'
  }).$mount()
  
  const isSame = vm.$el.innerHTML === '<span>foo</span><span>bar</span>'
  console.log({isSame})
}
// registerComponent()

function registerPriority() {
  Vue.component('x-foo', {
    template: '<span>local</span>'
  })
  const vm = new Vue({
    components: {
      xFoo: {
        template: '<span>local</span>'
      }
    },
    template: '<div><x-foo></x-foo></div>'
  }).$mount()
  console.log(vm.$el.textContent === 'local')
}
// registerPriority()