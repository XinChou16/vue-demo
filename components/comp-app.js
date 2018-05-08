import Counter from "./counter.js"

new Vue({
  el: '#app',
  components: {
    Comp: Counter,
  },
  template:'<Comp></Comp>'
})