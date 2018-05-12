new Vue({
  el: '#app',
  data() {
    return {
      isBottom: false,
      beers: [],
      words:[],
      watch: 0,
    }
  },
  methods: {
    bottomVisible() {
      const scrollY = window.scrollY;// 滚轮滚动的距离
      // 页面可视区域高度
      const visibleHeight = document.documentElement.clientHeight;
      // 页面文档高度，不包含滚动条
      const pageHeight = document.documentElement.scrollHeight;
      const ofBottom = scrollY+visibleHeight >= pageHeight
      let meter = {scrollY,visibleHeight,pageHeight,ofBottom}
      // console.log(meter);
      return ofBottom || visibleHeight > pageHeight;
    },
    addBeer() {
      // console.log('已经到底了 ',this.isBottom);
      // https://api.punkapi.com/v2/beers/random
      // axios.get('./beer.json')
      // .then(res => {
      //   let api = res.data[1];
      //   let apiInfo = {
      //     name : api.name,
      //     desc : api.description,
      //   };
      //   this.beers.push(apiInfo)
      //   if( this.bottomVisible()) {
      //     this.addBeer();
      //   }
      // })
      // 模拟延时
      setTimeout(() => {
        this.words.push({
          name: '我是帅气的'+Math.floor(Math.random()*10),
          desc: '2'
        })
        }, 1500);
    }
  },
  watch: {
    isBottom(val) {
      this.addBeer();
      this.watch++;
      // console.log('watch执行了'+this.watch+'次');
    }
  },
  created() {
    window.addEventListener('scroll',() => {
      this.isBottom = this.bottomVisible();
      console.log(this.isBottom);
      // console.log(this.isBottom);
    })
    this.addBeer();
  }
})
