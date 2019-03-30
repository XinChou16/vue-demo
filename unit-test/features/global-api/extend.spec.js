function correctMergeOptions() {
  const Test = Vue.extend({
    name: 'test',
    a: 1,
    b: 2
  })
  console.log(Test.options.a === 1)
  console.log(Test.options.b === 2)
  const t = new Test({
    a: 2
  })
  console.log(t.$options.a === 2)
  console.log(t.$options.b === 2)
  console.log('--------inheritance--------')
  const Test2 = Test.extend({
    a: 3
  })
  console.log(Test2.options.a === 3)
  console.log(Test2.options.b === 2)

}
// correctMergeOptions()

function usedAsComponents() {
  const foo = Vue.extend({
    template: '<span>foo</span>'
  })
  const bar = Vue.extend({
    template: '<span>bar</span>'
  })
  const vm = new Vue({
    template: '<div><foo></foo><bar></bar></div>',
    components: { foo, bar }
  }).$mount()
  
  console.log(vm.$el.innerHTML)
}
// usedAsComponents()

function mergeLifeCycle() {
  const calls = []
  const A = Vue.extend({
    created () {
      calls.push(1)
    }
  })
  const B = A.extend({
    created () {
      calls.push(2)
    }
  })
  new B({
    created () {
      calls.push(3)
    }
  })
  
  console.log(calls)
}
// mergeLifeCycle()

function notMergeNestedMixins() {
  const A = Vue.extend({
    created: () => {}
  })
  const B = Vue.extend({
    mixins: [A],
    created: () => {}
  })
  const C = Vue.extend({
    extends: B,
    created: () => {}
  })
  const D = Vue.extend({
    mixins: [C],
    created: () => {}
  })
  
  console.log(D.options.created.length)
}
// notMergeNestedMixins()

function mergeMethods() {
  const A = Vue.extend({
    methods: {
      a () { return this.n }
    }
  })
  const B = A.extend({
    methods: {
      b () { return this.n + 1 }
    }
  })
  const b = new B({
    data: { n: 0 },
    methods: {
      c () { return this.n + 2 }
    }
  })
  
  console.log(b.a())
  console.log(b.b())
  console.log(b.c())
}
// mergeMethods()

function mergeAssets() {
  
  const A = Vue.extend({
    components: {
      aa: {
        template: '<div>A</div>'
      }
    }
  })
  const B = A.extend({
    components: {
      bb: {
        template: '<div>B</div>'
      }
    }
  })
  const b = new B({
    template: '<div><aa></aa><bb></bb></div>'
  }).$mount()
  
  console.log(b.$el.innerHTML) 
}
// mergeAssets()

function differentIdentify() {
  const A = Vue.extend({ computed: {}})
  const B = A.extend()
  B.options.computed.b = () => 'foo'
  
  console.log(A.options.computed.b)
  console.log(B.options.computed.b)

}
// differentIdentify()


