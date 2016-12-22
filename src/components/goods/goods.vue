<template>
  <div class="goods">
    <div class="menu-wrapper"></div>
    <div class="foods-wrapper"></div>
  </div>
</template>
<script type='text/ecmascript-6'>
  const ERR_OK = 0;
  export default {
    props: {
      weller: {
        type: Object
      }
    },
    data() {
      return {
        goods: []
      }
    },
    created() {
      this.$http.get('/api/goods').then((res) => {
        res = res.body;
        if (res.errno === ERR_OK) {
          this.goods = res.data;
        }
      })
    }
  }
</script>
<style lang='stylus' rel="stylesheet/stylus">
  .goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      /*等分，缩放 占位宽度*/
      flex 0 0 80px
      /*／宽度不屑在安卓上会出问题*/
      width 80px
      background #f3f5f7
      .foods-wrapper
        flex 1
</style>
