<template>
  <div class="goods">
    <div class="menu-wrapper" v-el:menu-wrapper>
      <ul>
        <!--下面的class意思是当后面两者相等是才会设置才前面的class-->
        <li v-for='item in goods' class="menu-item" :class="{'current':currentIndex===$index}"
            @click="selectMenu($index,$event)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" v-el:foods-wrapper>
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src=food.icon>
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span><span class="old"
                                                                v-show='food.oldPrice'>¥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart></shopcart>
  </div>
</template>
<script type='text/ecmascript-6'>
  import BScroll from 'better-scroll';
  import shopcart from 'components/shopCart/shopCart';

  const ERR_OK = 0;
  export default {
    props: {
      weller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [], // 保存商品栏的累加后的各个高度
        scrollY: 0
      }
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let h1 = this.listHeight[i];
          let h2 = this.listHeight[i + 1];
          if (!h2 || (this.scrollY >= h1 && this.scrollY < h2)) {
            return i
          }
        }
        return 0
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods').then((res) => {
        res = res.body;
        if (res.errno === ERR_OK) {
          this.goods = res.data;
          /* 在vue更新dom之后在初始化滚动事件，
           *$nextTick是跟新dom之后的回调,否则数据一更新，
           *dom还没来得及变化，就不会有滚动效果 */
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight()
          });
        }
      })
    },
    methods: {
      selectMenu(index, event) { // 传入event是因为在电脑上有默认事件，用以判断事件类型，只使用vue的事件
        // event._constructed是vue派发事件的元素
        if (!event._constructed) {
          return
        }
        let foodsList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
        // 取得要滚到的元素
        let el = foodsList[index]
        // 滚动到，并设置时间
        this.foodsScroll.scrollToElement(el, 500)
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$els.menuWrapper, {
          // 由于better-scroll阻止了默认事件，传入以下参数，即可允许点击
          click: true
        });
        this.foodsScroll = new BScroll(this.$els.foodsWrapper, {
          probeType: 3 // 表示监测实时滚动的位置
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        })
      },
      _calculateHeight() {
        let foodsList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodsList.length; i++) {
          // 获取dom节点的高度
          height += foodsList[i].clientHeight;
          this.listHeight.push(height)
        }
      }
    },
    components: {
      shopcart
    }
  }
</script>
<style lang='stylus' rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
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
      /*宽度不写，在安卓上会出问题*/
      width 80px
      background #f3f5f7
      .menu-item
        display table
        height 54px
        width 56px
        padding 0 12px
        line-height 14px
        &.current
          position relative
          z-index 10
          margin-top -1px
          background #fff
          font-weight 700
          .text
            border-none()
        .icon
          display inline-block
          vertical-align top
          width 12px
          height 12px
          margin-right 2px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-image("decrease_3")
          &.discount
            bg-image("discount_3")
          &.guarantee
            bg-image("guarantee_3")
          &.invoice
            bg-image("invoice_3")
          &.special
            bg-image("special_3")
        .text
          display table-cell
          width 56px
          vertical-align middle
          font-size 12px
          border-1px(rgba(7, 17, 27, 0.1))
    .foods-wrapper
      flex 1
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147, 153, 159)
        background #f3f5f7
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          padding-bottom 0
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            font-size 14px
            color rgb(7, 17, 27)
          .desc, .extra
            font-size 10px
            color rgb(147, 153, 159)
          .desc
            line-height 12px
            margin-bottom 8px
          .extra
            line-height 10px
          .count
            margin-right 12px
          .price
            font-weight 700
            line-height 24px
            .now
              margin-right 8px
              font-size 14px
              color rgb(240, 20, 20)
            .old
              text-decoration line-through
              font-size 10px
              color rgb(147, 153, 159)

</style>
