let template = `
<li>
  <img :src="book.img" >
  <div class="desc">
    {{book.text}}
  </div>
</li>
`
// books component
Vue.component('books',{
  template,
  data() {
    return {
      
    }
  },
  props:['book',],
})

// vue instance
new Vue({
  data() {
    return {
      query:'',
      bookList:[{
        img: 'http://via.placeholder.com/100x100',
        text: 'book is cool~',
      },{
        img: 'http://via.placeholder.com/100x100',
        text: 'aaaaaa~',
      }]
    }
  },
  methods: {

  },
  computed: {
    bookListFilter: function() {
      let query = this.query;
      let books = this.bookList;

      books = books.filter( book => {
        if(book.text.toLowerCase().indexOf(query) > -1) {
          return book;
        }
      })

      return books;
    }
  },
  mounted() {
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      }
    }
  }
}).$mount('#app')