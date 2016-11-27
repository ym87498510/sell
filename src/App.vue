<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item"><a v-link="{path:'/goods'}">商品</a></div>
      <div class="tab-item"><a v-link="{path:'/ratings'}">评论</a></div>
      <div class="tab-item"><a v-link="{path:'/seller'}">商家</a></div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import header from 'components/header/header';

  export default {
    components: {
      'v-header': header
    }
   }
</script>
<!--／css采用移动端的flex布局-->
<style lang='stylus' rel="stylesheet/stylus">
  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      .tab-item
        flex:1
        text-align: center
        & > a
          display: block
          font-size: 14px
          color: rgb(77,85,93)
          &.active
            color:rgb(240,20,20)

</style>
