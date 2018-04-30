// Original website  
// https://tutorialzine.com/2016/03/5-practical-examples-for-learning-vue-js

new Vue({
  data() {
    return {
      isSmall: false,
      bigImgUrl: 'http://via.placeholder.com/100x100',
      smallImgUrl:'http://placehold.it/50x50&text=1',
      imgLists:[,,,,],
    } 
  },
  methods: {
    showBig() {
      this.isSmall = !this.isSmall;
    },
    showSmall() {
      this.isSmall = !this.isSmall;
    },
  }
}).$mount('#app')