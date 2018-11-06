let price = 5;
let quantity = 2;
let total = price * quantity

console.log({ total });

price = 20;
console.log({ total });


/**
 * 1. Save code
 * 2. Run this code
 * 3. Run stored code again
 * 4. Run all the code we have saved
 */
let price = 5;
let quantity = 2;
let total = 0;
let target = null;
let storage = [];

// target();
target = () => { total = price * quantity; }

// record();
function record() {
  Storage.push(target);
}

// replay();
function replay() {
  storage.forEach(run => {
    run();
  });
}


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



let data = { 
  price: 5,
  quantity: 2
};
let internalVal = data.price

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