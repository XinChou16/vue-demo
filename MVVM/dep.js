class Dep {
  constructor() {
    this.subscribers = []
  }
  depend(sub) {
    if (sub && !this.subscribers.includes(sub)) {
      this.subscribers.push(sub)
    }
  }
  notify() {
    this.subscribers.forEach(sub => sub())
  }
}
