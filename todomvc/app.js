/**
 * todo-list demo
 */

 Vue.component('todo-list',{
   template:`
   <li class="list">
      <p>{{ content.text}}</p>
      <button class="del" 
      v-on:click="delTodo(index)">
      删除
      </button>
    </li>
   `,
   props:['content','index'],
   methods: {
    delTodo: function (index) {
      // camelCase is not allowed
      this.$emit('delete',this.index)
    }
   }
 })

var vm = new Vue({
  data: {
    todoText: '',
    todos: [],
    parentMsg:'parentMsg'
  },
  methods: {
    addTodo: function () {
      this.todos.push({
        text: this.todoText,
        done: false,
      })
    },

    // delete
    delTodo: function(index) {
      var item = this.todos.splice(index,1)
      console.log('你删除了第  ' +(index+1) +'项');
    }
  }
}).$mount('#app')