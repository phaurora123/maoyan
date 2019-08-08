<template>
  <div :class="bool?'detailSectionTop showUp':'detailSectionTop showDown'">
    <div class="detailCtg">
      <p>
        <a v-for="(item,index) in ctgCatHead" :key="index" href>
          <i v-if="index>0">></i>
          {{item.Name}}
        </a>
      </p>
      <v-touch tag="a" @tap="ToggleShow">
        <em>{{bool?'展开':'收起'}}</em>
        <i :class="bool?'iShowUp':'ishowDown'"></i>
      </v-touch>
    </div>
    <ul>
      <li>
        <a href>全部</a>
      </li>
      <li v-for="(item,index) in ctgCat" :key="index">
        <a href>{{item.Name}}</a>
      </li>
    </ul>
  </div>
</template>
<script>
import { ctgDetail_api } from "api/ctgPage.js";
import { mapState, mapActions } from "vuex";
export default {
  name: "detailSectionTop",
  async created() {
    let data = await ctgDetail_api(this.ctgId || '01.03.38.00.00.00');
    this.getBooksDetail(data);
    console.log(data);
  },
  computed: {
    ...mapState({
      ctgId:state=>state.BooksDetail.ctgId,
      ctgCatHead: state => state.BooksDetail.ctgCatHead,
      ctgCat: state => state.BooksDetail.ctgCat
    })
  },
  methods: {
    ...mapActions({
      getBooksDetail: "BooksDetail/getBooksDetailActions"
    }),
    ToggleShow() {
      console.log(this.bool);
      this.bool = !this.bool;
    }
  },
  data() {
    return {
      bool: true,
    };
  }
};
</script>
<style>
.detailSectionTop {
  width: 100%;
  font-size: 0.12rem;
  padding: 0 0.18rem;
}
.showUp {
  width: 100%;
  height: 1.1rem;
  overflow: hidden;
}
.showDown {
  width: 100%;
  overflow: auto;
}

.detailCtg {
  width: 100%;
  height: 0.53rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}
.detailCtg > p {
  display: flex;
  width: 60%;
  height: 100%;
  justify-content: flex-start;
  align-items: center;
}
.detailCtg > p > a > i {
  margin-left: 0.05rem;
}
.detailCtg a {
  color: #555a65;
  font-size: 0.144rem;
}
.detailCtg > a {
  display: flex;
  width: 15%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
}
.detailCtg > a > i {
  display: inline-block;
  width: 0.12rem;
  line-height: 0.12rem;
  height: 0.2rem;
}
.detailCtg > a > .iShowUp {
  background: url("http://search.m.dangdang.com/images/search_category/category_arrow.png")
    no-repeat center;
  background-size: contain;
}
.detailCtg > a > .ishowDown {
  background: url("http://search.m.dangdang.com/images/search_category/category_arrow.png")
    no-repeat center;
  /* -webkit-transform: rotate(180deg); */
  transform: rotate(180deg);
  background-size: contain;
}

.detailSectionTop > ul {
  width: 100%;
  /* height: 0.65rem; */
}

.detailSectionTop > ul > li {
  float: left;
}
.detailSectionTop > ul > li > a {
  display: block;
  margin: 0 0.1rem 0.05rem;
  height: 0.27rem;
  border-radius: 0.15rem;
  color: #555a65;
  font-weight: bold;
  font-size: 0.132rem;
}
</style>
