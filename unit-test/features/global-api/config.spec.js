function runWatchers() {
  Vue.config.async = false
  const vm = new Vue({
    template: `
          <div id="app">
            {{ computed }}
          </div>`,
    props: ['prop'],
    propsData: {
      'prop': []
    },
    data: () => ({
      data: ''
    }),
    computed: {
      computed() {
        return this.prop.join(',')
      }
    },
    watch: {
      prop: 'execute'
    },
    methods: {
      execute() {
        this.data = this.computed
      }
    }
  }).$mount()
  console.log(vm.computed === '')
  console.log(vm.data === '')

  vm.prop = [1, 2, 3]
  console.log(vm.computed)
  console.log(vm.data)

  vm.prop.push(4, 5)
  console.log(vm.computed)
  console.log(vm.data)

  Vue.config.async = true
}
// runWatchers()