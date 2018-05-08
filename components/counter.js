export default {
  template: `
  <div>
    <p>Counter: {{counter}}</p>
    <button @click="counter+=1">+</button>
    <button @click="counter-=1">-</button>
  </div>
  `,
  data() {
    return {
      counter: 0,
    }
  }
}