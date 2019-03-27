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
