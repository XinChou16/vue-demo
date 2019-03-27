> @time 2019-03-27

## Reference

- [my-repo](https://github.com/XinChou16/2017-Baidu-IFE-Task/blob/master/Ruomi%20Institution/vue-data-binding/task_001.js)

## v1.0 Observer

```js
class Observer {
  constructor(data) {
    this.data = data
    this.runObserver(data)
  }

  runObserver(obj) {
    let val
    for(let key in obj) {
      if (obj.hasOwnProperty(key)) {
        val = obj[key]
        if (typeof obj[key] === 'object') {
          new Observer(obj[key])
        }
      }
      this.monitorData(key, val)
    }
  }

  monitorData(key, val) {
    Object.defineProperty(this.data, key, {
      enumerable: true,
      configurable: true,
      get() {
        console.log('getter ', key, val)
        return val
      },
      set(newVal) {
        if (newVal === val) {
          return
        }
        console.log(`setter ${key}, new is ${newVal}`)
        val =  newVal
      } 
    })
  }
}

var stu = new Observer({
  name: 'Chris',
  age: 18,
  address: {
    country: 'China'
  }
})
console.log(stu.data.name)
console.log(stu.data.address)
stu.data.name = 'Evan'
console.log(stu.data.name)
```


## v2.0 Observer

- 添加`$watch`方法

```js
class Observer {
  constructor(data) {
    this.data = data
    this.runObserver(data)
    this.eventBus = new EventBus()
  }

  runObserver(obj) {
    let val
    for(let key in obj) {
      if (obj.hasOwnProperty(key)) {
        val = obj[key]
        if (typeof obj[key] === 'object') {
          new Observer(obj[key])
        }
      }
      this.monitorData(key, val)
    }
  }

  monitorData(key, val) {
    const self = this
    Object.defineProperty(this.data, key, {
      enumerable: true,
      configurable: true,
      get() {
        // console.log('getter ', key, val)
        return val
      },
      set(newVal) {
        if (newVal === val) {
          return
        }
        // console.log(`setter ${key}, new is ${newVal}`)
        val =  newVal
        // 广播事件
        self.eventBus.emit(key, newVal)
      } 
    })
  }

  $watch(key, next) {
    this.eventBus.on(key, next)
  }
}

// sub and pub
class EventBus {
  constructor() {
    this.event = {}
  }
  on(type, handler) {
    if (this.event.hasOwnProperty(type)) {
      this.event[type].push(handler)
      return
    }
    this.event[type] = [handler]
  }
  off(type) {
    if (this.event.hasOwnProperty(type)) {
      delete this.event[type]
    }
  }
  emit(type, ...args) {
    this.event[type].forEach(cb => {
      cb(...args)
    })
  }
}


var stu = new Observer({
  name: 'Chris',
  age: 18,
  address: {
    country: 'China'
  }
})
stu.$watch('age', newVal => {
  console.log('age new is ', newVal)
  console.log(newVal)
})
stu.data.age = 10
```


## v3.0 Observer


```js

```


