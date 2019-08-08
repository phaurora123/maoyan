<template>
  <div class="cart">
    <!-- *************头部************ -->
    <div class="cartTitle">
      <v-touch class="cartLeft" @tap="back" tag="i"></v-touch>
      <i>购物车</i>
      <v-touch class="cartRight" @tap="clickMenu" tag="i"></v-touch>
    </div>
    <!-- *************内容区************* -->
    <!-- 免运费提示  当当自营订单满49元包邮，已免运费6元 -->
    <div class="cartFreight">
      <span>当当自营订单满49元包邮，运费6元</span>
      <i>去凑单免运费&gt;</i>
      <em class="cartFreightClose"></em>
    </div>
    <div class="cartBody">
      <octivia-BScroll>
        <div class="cartList">
          <div class="cartListTop">
            <!--********* 全选 -->
            <v-touch
              type="checkbox"
              :class="selectAll?'selectedAll':'notSelected'"
              tag="input"
              @tap="chooseAll"
            />
            <i></i>
            <p>当当网</p>
            <div class="shop_shiping">
              再买18.2元享49元包邮
              <a>去凑单&gt;</a>
            </div>
            <span>编辑</span>
          </div>
          <div class="cartListContent" v-for="(item,index) in goodsInfo" :key="index">
            <div class="normalView"  v-if="tabIndex!==index || editBool">
              <!-- **********单选 -->
              <v-touch type="checkbox"
              :class="item.flag?'selectedOne':'oneNotSelect'" 
              tag="input" 
              @tap="chooseOne(index)" />
              <img class="goodsIcon" :src="item.image_url" alt />
              <div class="goodsInfo">
                <p class="goodsName">{{item.name}}</p>
                <p>
                  <span>{{item.price}} &nbsp;&nbsp;&nbsp;</span>
                  <span class="goodsOriginalPrice">{{item.original_price}}</span>
                </p>
                <p>
                  <span
                    v-for="(itemTag,itemIndex) in item.product_tags"
                    :key="itemIndex"
                  >{{itemTag.name}}</span>
                </p>
                <p>x{{item.quality}}</p>
              </div>
              <v-touch class="editBtn" @tap="toggleView(index)" tag="div"></v-touch>
            </div>
            <div class="editView" v-if="tabIndex==index && !editBool">
              <img class="goodsIcon" :src="item.image_url" alt />
              <div class="editViewMiddle">
                <!-- 修改商品数量 -->
                <div class="editNum">
                  <v-touch @tap='reduceQuality(index)' tag='button'>-</v-touch>
                  <input type="text" :value='item.quality'/>
                  <v-touch @tap='addQuality(index)' tag='button'>+</v-touch>
                </div>
                <v-touch class="delete" @tap='delGoods(index)' tag='div'></v-touch>
              </div>
              <v-touch class="editComplete" tag="div" @tap="toggleView(index)">完成</v-touch>
            </div>
          </div>
        </div>
      </octivia-BScroll>
    </div>
    <!--************* footer************* -->
    <div class="cart_footer">
      <label for>
        <v-touch
          type="checkbox"
          :class="selectAll?'selectedAll':'notSelected'"
          tag="input"
          @tap="chooseAll"
        />全选
      </label>
      <p>
        合计
        <span>￥{{goodsTotal.sum.toFixed(2)}}</span>
      </p>
      <v-touch @tap='payBtn' tag='a'>
        结算
        <span>({{goodsTotal.count}})</span>
      </v-touch>
    </div>
  </div>
</template>
<script>
import { mapState,mapMutations,mapGetters } from "vuex";
export default {
  name: "cart",
  data() {
    return {
      // selectAll: true,
      bool: false,//设置单选选中与否时
      tabIndex: 0,
      editBool:1
    };
  },
  computed: {
    ...mapState({
      goodsInfo: state => state.cart.goodsInfo,
      selectAll: state => state.cart.selectedAll,

    }),
    ...mapGetters({
      goodsTotal:'cart/goodsTotalGetters'
    })
  },
  methods: {
    back() {
      this.$router.back();
    },
    clickMenu() {},
    ...mapMutations({
      chooseAll:'cart/selectedAllMutations',
      chooseOne:'cart/chooseOneMutations',
      reduceQuality:'cart/reduceQuality',
      addQuality:'cart/addQuality',
      delGoods:'cart/delGoods'
    }),
    toggleView(index) {
      console.log(index)
      this.tabIndex = index;
      this.editBool=!this.editBool
    },
    payBtn(){
      console.log(123,sessionStorage.getItem('token'))
      if(!sessionStorage.getItem('token'))
      this.$router.push('/login')
    }
  }
};
</script>
<style>
.cartTitle {
  width: 100%;
  height: 0.44rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  top: 0px;
  background: #fff;
  font-size: 0.168rem;
  line-height: 0.44rem;
}
.cartLeft,
.cartRight {
  width: 0.4rem;
  height: 0.44rem;
}

.cartTitle > .cartRight {
  background: url("http://search.m.dangdang.com/images/menu.png") no-repeat
    center;
  background-size: 60%;
}
.cartTitle > .cartLeft {
  background: url("http://search.m.dangdang.com/images/arrow_left.png")
    no-repeat center;
  background-size: 25%;
}
/* 免运费提示区 */
.cartFreight {
  width: 100%;
  height: 0.42rem;
  color: #fff;
  font-size: 0.14rem;
  padding: 0 0 0 0.2rem;
  background: #ffa5a5;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.cartFreight i {
  border-bottom: 1px solid #fff;
}
.cartFreight .cartFreightClose {
  width: 0.15rem;
  height: 0.42rem;
  background: url("http://cart.m.dangdang.com/images/info_close.png") no-repeat
    center;
  background-size: contain;
}
.cartBody {
  width: 100%;
  height: 5.79rem;
}
.cartList {
  background: #fff;
  overflow-y: auto;
}
.cartList .goodsIcon {
  width: 1.08rem;
  height: 1.08rem;
}
.cartListTop > span {
  display: inline-block;
  font-size: 0.14rem;
  line-height: 0.42rem;
  width: 0.42rem;
  height: 0.42rem;
}

.cartListTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
}

.cartList .normalView,
.editView {
  height: 1.73rem;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.cartList .normalView .goodsInfo {
  width: 1.65rem;
}
.cartList .goodsName {
  width: 1.95rem;
  font-size: 0.15rem;
  color: #323232;
}
.cartList .goodsOriginalPrice {
  text-decoration: line-through;
  color: grey;
}
.normalView .editBtn {
  width: 0.36rem;
  height: 0.24rem;
  background: url("http://cart.m.dangdang.com/images/edit.png") no-repeat center;
  background-size: contain;
}

.editView .delete {
  width: 0.16rem;
  height: 0.24rem;
  background: url("http://cart.m.dangdang.com/images/delect_icon.png") no-repeat
    center;
  background-size: contain;
  margin-top: 0.2rem;
  float: right;
}
.editView .editComplete {
  width: 0.46rem;
  height: 1.08rem;
  line-height: 1.08rem;
  text-align: center;
  color: #646464;
  background-color: #f0f0f0;
  font-size: 0.144rem;
}

.editView .editNum {
  height: 0.43rem;
}
.editView button,
input {
  height: 100%;
}
.editView button {
  width: 0.44rem;
}
.editView input {
  width: 0.87rem;
}

.cart input[type="checkbox"] {
  display: inline-block;
  width: 0.25rem;
  height: 0.25rem;
  border: none;
  outline: none;
}
.cart .notSelected,
.default,
.oneNotSelect {
  background: url("http://cart.m.dangdang.com/images/c_checkbox_off.png")
    no-repeat center;
  background-color: transparent;
  background-size: contain;
  -webkit-appearance: none;
}

.cart .selectedAll,
.selectedOne {
  background: url("http://cart.m.dangdang.com/images/c_checkbox_on.png")
    no-repeat center;
  background-color: transparent;
  background-size: contain;
  -webkit-appearance: none;
}

.cartListTop i {
  display: block;
  width: 0.24rem;
  height: 0.24rem;
  background: url("http://cart.m.dangdang.com/images/dangdang.png") no-repeat
    left top;
  background-size: contain;
}

.cartListTop p {
  width: 0.6rem;
  height: 0.43rem;
  line-height: 0.43rem;
  font-size: 0.168rem;
}

/* 底部 */
.cart_footer {
  width: 100%;
  height: 0.44rem;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #787878;
  font-size: 0.16rem;
  background: #fff;
}
/* .cart_footer label{

} */
.cart_footer > p {
  width: 30%;
  text-align: right;
}
.cart_footer > p span {
  color: #ff2832;
}

.cart_footer > a {
  width: 30%;
  height: 100%;
  background-color: #fb4741;
  color: #fff;
  border-radius: 0;
  line-height: 0.44rem;
  font-size: 0.16rem;
  text-align: center;
}
</style>
