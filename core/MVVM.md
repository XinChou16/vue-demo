
## MVVM框架

> Vue的核心思路详解


`Vue`一大特性是响应式，基于ES5的`Object.defineProperty()`和发布订阅模式实现数据的监听


## 数据变化

当我们给`price`赋值20的时候，我们希望`total`自动更新得到40,一般我们需要保存代码，然后运行代码，此时才能够得到新的结果

```js
let price = 5;
let quantity = 2;
let total = price * quantity

console.log({ total }); // 10

price = 20;
console.log({ total }); // 40
```

当价格改变的时候，我们可以每次运行`record()`记录每次的变化值，然后运行`replay()`来计算每次的值

```js
let price = 5;
let quantity = 2;
let total = 0;
let target = null;
let storage = [];

// target();
target = () => { total = price * quantity; }

// record();
function record() {
  storage.push(target);
}

// replay();
function replay() {
  storage.forEach(run => {
    run();
  });
}
```
我们可以封装成一个类


```js
// clsss version
class Dep {
  constructor() {
    this.subscribers = [];
  }
  depend() {
    if (target && !this.subscribers.includes(target)) {
      this.subscribers.push(target);
    }
  }
  notify() {
    this.subscribers.forEach(sub => sub());
  }
}

const dep = new Dep();

let price = 5;
let quantity = 2;
let total = 0;

let target = () => {
  total = price * quantity;
}

dep.depend();
target();

// watcher
function watcher(myFunc) {
  target = myFunc;
  dep.depend();
  target();
  target = null;
}
```


## `Object.defineProperty()`

```js

let data = { 
  price: 5,
  quantity: 2
};
let internalVal = data.price

Object.defineProperty(data, 'price', {
  get() {
    console.log('get', internalVal);
    return internalVal;
  },
  
  set(newVal) {
    console.log('set', internalVal);
    internalVal = newVal;
  },
})
data.price;
data.price = 20;
```


## 完整版


```js
let data = { 
  price: 5,
  quantity: 2
};
let internalVal = data.price


class Dep {
  constructor() {
    this.subscribers = [];
  }
  depend() {
    if (target && !this.subscribers.includes(target)) {
      this.subscribers.push(target);
    }
  }
  notify() {
    this.subscribers.forEach(sub => sub());
  }
}

Object.keys(data).forEach(key => {
  Object.defineProperty(data, 'price', {
  
    get() {
      console.log('get', internalVal);
      dep.depend();
      return internalVal;
    },
    
    set(newVal) {
      console.log('set', internalVal);
      dep.notify();
      internalVal = newVal;
    },
  })
})

function watcher(myFunc) {
  target = myFunc;
  dep.depend();
  target();
  target = null;
}

watcher(() => {
  total = data.price * data.quantity;
})
watcher(() => {
  salePrice = data.price * 0.9;
})
```













## Reference
[JavaScript Reactivity Explained Visually](https://www.youtube.com/watch?v=7Cjb7Xj8fEI)