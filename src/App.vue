<template>
  <div id="app">
    <!--v-bind缩写为:-->
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item"><router-link to="/goods">商品</router-link></div>
      <div class="tab-item"><router-link to="/ratings">评论</router-link></div>
      <div class="tab-item"><router-link to="/seller">商家</router-link></div>
    </div>
    <!--keep-alive路由状态保留-->
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>
<script type='text/ecmascript-6'>
  import {urlParse} from 'common/js/util'
  import header from 'components/header/header';

  //  声明常量限定响应状态码正确时为0
  const ERR_OK = 0;

  export default {
//    data是一个函数
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse()
            return queryParam.id
          })()
        }
      }
    },
    created() { //  组件加载时执行的函数
      this.$http.get('/api/seller?id=' + this.seller.id)
        .then((res) => { // 成功的回调
          res = res.body;
          if (res.errno === ERR_OK) {
//            this.seller = res.data;
//            下一行为模拟带码，假设后段返回了带ID带数据
            this.seller = Object.assign({}, this.seller, res.data)
          }
        })
    },
    components: {
      'v-header': header
    }
  }
</script>
<!--／css采用移动端的flex布局-->
<style lang='stylus' rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"

  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      /*border-bottom: 1px solid rgba(7, 17, 27, 0.1)*/
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex: 1
        text-align: center
        & > a
          display: block
          font-size: 14px
          color: rgb(77, 85, 93)
          &.active
            color: rgb(240, 20, 20)

</style>
