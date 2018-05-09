/**
 * todo-list demo
 */

 Vue.component('todo-list',{
   template:`
   <li class="list">
    <p>
      <input type="checkbox" 
        v-model="content.done"
        v-on:click="finishTodo(content)"
       >
      <span class="todo-text"
        :class="{finished:content.done}"
      >{{ content.text}}</span>
    </p>
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
    },
    finishTodo: function (content) {
      // console.log(content.text+' is '+ content.done);
    }
   },
   data: function() {
     return {
       "isChecked": false,
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
    // add todo 
    addTodo: function () {
      var value = this.todoText && this.todoText.trim()
      if(!value) {return}

      this.todos.push({
        id: 1,
        text: value,
        done: false,
      })
    },

    // delete todo
    delTodo: function(index) {
      var item = this.todos.splice(index,1)
      console.log('你删除了 ' +item[0].text );
    },

  },

  // filters
  filters: {
    
  },

  // custom directives
  directives: {
    focus: {
      inserted: function(el) {
        el.focus(); // 自动聚焦到输入框
      }
    }
  }
}).$mount('#app')