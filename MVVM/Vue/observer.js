class Observer {
  constructor(data) {
    this.data = data
    this.init()
  }
  init() {
    this.walk()
  }
  walk() {
    Object.keys(this.data).forEach(key => {
      this.defineReactive(key, this.data[key])
    })
  }
  defineReactive(key, val) {
    const dep = new Dep()
    const data = this.data
    const observerChild = observer(val)
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        if (Dep.target) {
          dep.depend(Dep.target)
        }
        return val
      },
      set(newVal) {
        if (val === newVal) {
          return 
        }
        val = newVal
        dep.notify()
        observer(newValal)
      }
    })
  }
}

function observer(value) {
  if (!value && typeof value !== 'object') {
    return 
  }
  return new observer(value)
}
