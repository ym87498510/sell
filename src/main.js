import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import goods from 'components/goods/goods'
import seller from 'components/seller/seller'
import ratings from 'components/ratings/ratings'

import 'common/stylus/index.styl'

Vue.use(VueRouter);
Vue.use(VueResource);
// 通常new对象要赋值给某个对象，下面这句的注释意思是此句提跳过语法检查，就是说可以不需要对象来接
// /* eslint-disable no-new */
// new Vue({
//   el: 'body',
//   components: {App}
// })
// 个人感觉不需要下面这句，因为上面已经定义了
let app = Vue.extend(App)
let router = new VueRouter({linkActiveClass: 'active'})

router.map({
  '/goods': {
    component: goods
  },
  '/seller': {
    component: seller
  },
  '/ratings': {
    component: ratings
  }
})
// 将app组建挂载到app容器中，前面是组件，后面是容器,其是可以直接引用App,就不需要上面的let app = Vue.extend(App)了

router.start(app, 'app')

// 默认路由
router.go('/goods')

