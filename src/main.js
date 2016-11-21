import Vue from 'vue'
import App from './App'
// 其实也可以写'./App.vue'

/* eslint-disable no-new */
new Vue({
  // 挂载点elem,对应到body
  el: 'body',
  // 注册一个组件,对应到上面引入的近来的App
  components: { App }
})
