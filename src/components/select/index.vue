<template>
  <div class="filter">
    <div class="filterTitle">
      <v-touch tag="i" @tap="back"></v-touch>
      <em>筛选</em>
    </div>
    <octivia-BScroll>
      <div class="filterConditions">
        <div class="filterService">
          <p>服务</p>
          <ul>
            <!--               :class="(chooseIndex==index && chooseOrNot)?'filterOn':1" -->
            <v-touch
              :data_id="item.id"
              v-for="(item,index) in filterItems.checkboxitem"
              :key="index"
              tag="li"
              @tap="chooseOrnot(item,index,$event)"
            >{{item.name}}</v-touch>
          </ul>
        </div>
        <div class="filterPrice">
          <span>价格区间(元)：</span>
          <span>
            <input type="text" placeholder="最低价" />
          </span>
          -
          <span>
            <input type="text" placeholder="最高价" />
          </span>
          <ul>
            <v-touch
              v-for="(item,index) in filterItems.priceint"
              :key="index"
              tag="li"
              @tap="chooseOrnot(item,index,$event)"
            >
              <span>{{item.Min}}</span>~
              <span>{{item.Max}}</span>
            </v-touch>
          </ul>
        </div>
        <div :class="bool?'filterPlace filterShow':'filterPlace'">
          <div class="filerSelf_title">
            <span>收货地</span>
            <v-touch tag="span" @tap="filterShow">
              {{bool?'全部展开':'全部收起'}}
              <i :class="bool?'filterShowIcon':''"></i>
            </v-touch>
          </div>
          <ul>
            <v-touch
              v-for="(item,index) in filterItems.cities"
              :key="index"
              tag="li"
              @tap="chooseOrnot(item,index,$event)"
            >{{item}}</v-touch>
          </ul>
        </div>
        <div
          :class="show?'filerSelf filterSelfShow':'filerSelf'"
          v-for="(item,index) in filterItems.att"
          :key="index"
        >
          <div class="filerSelf_title">
            <span>{{item.name}}</span>
            <v-touch tag="span" @tap="show=!show">
              {{show?'全部展开':'全部收起'}}
              <i :class="show?'filterShowIcon':''"></i>
            </v-touch>
          </div>
          <ul>
            <v-touch
              v-for="(itemChild,indexChild) in item.items"
              :key="indexChild"
              tag="li"
              @tap="chooseOrnot(item,index,$event)"
            >{{itemChild.name}}</v-touch>
          </ul>
        </div>
      </div>
    </octivia-BScroll>
    <div class="filter_bottom">
      <v-touch :class="confirmBtn?'fliterRed':''" @tap="confirmBtnHandler('reset')" tag="i">重置</v-touch>
      <v-touch :class="confirmBtn?'':'fliterRed'" @tap="confirmBtnHandler('confirm')" tag="i">确定</v-touch>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { ctgDetail_api } from "api/ctgPage.js";
export default {
  name: "filterCid",
  data() {
    return {
      bool: true,
      show: true,
      confirmBtn: false,
      chooseOrNot: false,
      chooseIndex: 0,
      chooseList: []
    };
  },
  methods: {
    filterShow() {
      this.bool = !this.bool;
    },
    back() {
      this.$router.back();
    },
    chooseOrnot(item, index, e) {
      e.target.chooseOrNot = !e.target.chooseOrNot;
      if (e.target.chooseOrNot) {
        // this.chooseList.push({ [item.id]: 1 }); /////////变量时
        this.chooseList.push(index); /////////目前只是城市
        console.log(this.chooseList, index);
        e.target.className = "filterOn";
      } else {
        e.target.removeAttribute("class");
      }
    },
    async confirmBtnHandler(confirm) {
      let data = await ctgDetail_api(
        this.ctgIdt,
        undefined,
        undefined,
        undefined,
        undefined,
        this.chooseList
      );
      console.log(data);
      this.$router.back();
    }
  },
  computed: {
    ...mapState({
      filterItems: state => state.BooksDetail.filterMsg,
      ctgId: state => state.BooksDetail.ctgId
    })
  }
};
</script>
<style>
.filter {
  width: 80%;
  height: 100%;
  position: fixed;
  right: 0;
  top: 0;
  font-size: 0.12rem;
  background: #fff;
}
.filter .filterTitle {
  width: 100%;
  height: 0.54rem;
  background-color: #f2f2f2;
  font-size: 0.168rem;
  line-height: 0.54rem;
  padding: 0 0.1rem;
  position: relative;
  top: 0;
  z-index: 13;
}
.filterTitle > i {
  display: inline-block;
  width: 0.15rem;
  height: 0.15rem;
  background: url("http://search.m.dangdang.com/images/search_category/close.png")
    no-repeat center;
  background-size: contain;
}
.filterTitle > em {
  display: inline-block;
  width: 85%;
  text-align: center;
}
/* 删选条件 */
.filterConditions {
  width: 100%;
  font-size: 0.144rem;
  padding: 0 0.1rem;
  overflow: auto;
}
/* 筛选条件——服务 */
.filterService {
  width: 100%;
  height: 1.67rem;
  border-top: 1px solid #eee;
}
.filterService p {
  width: 100%;
  height: 0.44rem;
  line-height: 0.44rem;
}
.filterConditions ul {
  /* position: relative; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.filterConditions ul li {
  width: 30%;
  height: 0.3rem;
  background: #f5f5f5;
  color: #323232;
  text-align: center;
  line-height: 0.3rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0.05rem 0;
}

/* 筛选条件——价格区间 */
.filterPrice {
  width: 100%;
  height: 1.2rem;
  padding: 0.08rem 0;
  border-top: 1px solid #eee;
}

.filterPrice input {
  height: 0.25rem;
  width: 25%;
  background-color: #eeeeee;
  border: none;
  color: #323232;
  text-align: left;
}

/* 筛选条件-收货地 */
.filterPlace {
  width: 100%;
  border-top: 1px solid #eee;
}
.filterShow {
  height: 1.3rem;
  overflow: hidden;
}

/* 自有部分title */
.filerSelf {
  width: 100%;
  border-top: 1px solid #eee;
}
.filterSelfShow {
  height: 0.52rem;
  overflow: hidden;
}

.filerSelf_title {
  width: 100%;
  height: 0.44rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.filerSelf_title i {
  display: inline-block;
  width: 0.13rem;
  height: 0.16rem;
  background: url("http://search.m.dangdang.com/images/search_category/arrow.png")
    no-repeat center;
  background-size: contain;
}
.filterShowIcon {
  transform: rotate(180deg);
}
/* 选中样式 */
.filterConditions ul .filterOn {
  border: 0.01rem solid #ff463c;
  color: #ff463c;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAYCAMAAADTXB33AAAAjVBMVEUAAAD/Rjz/Rjz/Rjz/Rjz/Rjz/Rjz/Rjz/Rjz/Rjz/Rjz/Rjz/Rjz/Rjz/Rjz/Rjz/Rjz/Rjz/Rjz/Rjz/Rjz/Rjz/Rjz/Rjz/Rjz/Rjz/Rjz/Rjz/////T0X/7+7/5OL/2NX/tbH/aF//WE//+/r/9fX/6ej/zsz/ycb/nZj/iIL/dGz/Xlb/3Nv/vbnUcokSAAAAG3RSTlMAB/DkgPfWyUMoHBS+tq+lnJOJdGthWE84MQ66bHrMAAAAnElEQVQoz53Qxw6DMBREUSCk915mTO+Q/P/nRZGQjaW8DbM9ms11xuwkgXuAJDsI9NpAoPUcAq1mEGg5gUAPDwItPAh0m0KgCyCQj34qKm066kfFcEjuXkvMPMFAtlpqZi1gxYk/6icN2QCw4gSMUqDNWKMnHScJWCRdwBiGnn22LmResIQhEyeNyLcydDdxoKowhaYr/s53nLMkX4p4Hyd/kOMcAAAAAElFTkSuQmCC")
    transparent right bottom no-repeat;
  background-size: 20%;
}

/* 底部 */
.filter_bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 0.52rem;
  width: 100%;
  display: block;
  overflow: hidden;
  line-height: 0.52rem;
  background-color: #f5f5f5;
  text-align: center;
  font-size: 0.156rem;
  border-top: 1px solid #eee;
  z-index: 2;
}
.filter_bottom i {
  width: 50%;
  float: left;
  height: 100%;
}
.filter_bottom i {
  width: 50%;
  float: left;
  height: 100%;
}
.filter_bottom .fliterRed {
  background: url("http://search.m.dangdang.com/images/search_category/filterBtnBg.png")
    no-repeat;
  background-size: cover;
  color: #fff;
}
</style>
