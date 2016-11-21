import Vue from 'vue'
import App from './App'

// 通常new对象要复制给某个对象，下面这句的注释意思是此句提跳过语法检查
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: {App}
})
