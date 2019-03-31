function mixinInExtend() {
  const calls = []
  const Test = Vue.extend({
    name: 'test',
    beforeCreate () {
      calls.push(this.$options.myOption + ' local')
    }
  })
  Vue.mixin({
    beforeCreate () {
      calls.push(this.$options.myOption + ' global')
    }
  })
  console.log(Test.options.name)
  new Test({
    myOption: 'hello'
  })

  console.log(calls)
  
}
// mixinInExtend()

function globalProps() {
  const Test = Vue.extend({
    template: `<div>{{ prop }}</div>`
  })

  Vue.mixin({
    props: ['prop']
  })

  // test child component
  const vm = new Vue({
    template: '<test prop="hi"></test>',
    components: { Test }
  }).$mount()

  console.log(vm.$el.textContent)
  
}
// globalProps()

function globalProps() {
  const Test = Vue.extend({
    template: `<div>{{ prop }}</div>`
  })

  Vue.mixin({
    props: ['prop']
  })

  // test child component
  const vm = new Vue({
    template: '<test prop="hi"></test>',
    components: { Test }
  }).$mount()

  console.log(vm.$el.textContent)
  
}
// globalProps()