<template>
  <div class="content">
    <octivia-BScroll>
      <div class="contentBody">
        <!--1 广告banner -->
        <div class="topBanner" v-if="(banner.length>0)">
          <a :href="banner[0].link">
            <img :src="banner[0].img" alt />
          </a>
        </div>

        <!-- 2 -->
        <div class="miniBanner" v-if="(miniBanner.pits_num>0)">
          <div class="miniList" v-for="(item,index) in miniBanner.content" :key="index">
            <v-touch @tap="sendCtgDeatailId(item.link_url)" tag="a">
              <p>{{item.promo_title}}</p>
              <p>{{item.promo_text}}</p>
            </v-touch>
            <img src="http://search.m.dangdang.com/images/pits_arrow.png?v=20180205" alt />
          </div>
        </div>
        <!-- part3 -->
        <div class="ctgList">
          <!-- 榜单 -->
          <div v-for="(item,index) in pile" :key="index">
            <div class="pictureText" v-if="item.style_type==2">
              <h3>{{item.group_name}}</h3>
              <ul>
                <li v-for="(item,index) in item.detail" :key="index">
                  <v-touch @tap="sendCtgDeatailId(item.link_url)" tag="a" href='#/dd_category/cid'>
                    <img :src="item.icon" alt />
                  </v-touch>
                  <p>{{item.title}}</p>
                </li>
              </ul>
            </div>

            <!-- 小说等分类 -->
            <div class="pictureTextb" v-if="item.style_type==1">
              <h3>
                <v-touch
                  @tap="sendCtgDeatailId(item.group_link_url)"
                  tag="a"
                  class="pictureTextbH3Left"
                >
                  <em>{{item.group_name}}</em>
                  <img src="http://search.m.dangdang.com/images/ddcategory_title_link_icon.png" alt />
                </v-touch>
                <v-touch
                  class="pictureTextbH3Right"
                  @tap="sendCtgDeatailId(item.more_link_url)"
                  tag="a"
                >
                  <em>{{item.more}}</em>
                  <img src="http://search.m.dangdang.com/images/ddcategory_more_icon.png" alt />
                </v-touch>
              </h3>
              <ul :class="bool?'pictureTextbList showCtg':'pictureTextbList hideCtg'" ref="ctgUl">
                <li v-for="(item,index) in item.detail" :key="index">
                  <v-touch 
                  @tap="sendCtgDeatailId(item.link_url)" 
                  tag="a"
                  href='#/dd_category/cid'
                  >{{item.title}}</v-touch>
                  <span v-show="(index+1)%3">|</span>
                </li>
                <v-touch class="picTexBshow" tag="li" @tap="showHiddenCtg()">
                  {{bool?'展开':'收起'}}
                  <img
                    :class="bool?'':'showHiddenCtg'"
                    src="http://search.m.dangdang.com/images/ddcategory_arrow-new.png?v=20180205"
                    alt
                  />
                </v-touch>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </octivia-BScroll>
  </div>
</template>
<script>
import { ctgPage_api } from "api/ctgPage.js";
import {mapMutations} from 'vuex'
export default {
  name: "books1",
  methods: {
    ...mapMutations({
        sendCtgDeatailId:'BooksDetail/sendCtgDeatailId'
      }),
    showHiddenCtg() {
      this.bool = !this.bool;
    },
  },
  watch: {
    pageid(newVal) {
      this.pageid = newVal;
      ctgPage_api(this.title, this.pageid).then(data => {
        this.banner = data.content.banner;
        this.miniBanner = data.content.mini_banner;
        this.pile = data.content.pile[0].group;
      });
    }
  },

  async created() {
    this.$observer.$on("TogPageid", val => {
      this.title = val.dd_name;
      this.pageid = val.pageid;
    });
    let data = await ctgPage_api(this.title, this.pageid);
    this.banner = data.content.banner;
    this.miniBanner = data.content.mini_banner.content;
    this.pile = data.content.pile[0].group;
  },
  data() {
    return {
      title: "图书",
      pageid: 712231,
      banner: [
        {
          img:
            "http://img61.ddimg.cn/upload_img/00796/1/886x315_lyx_0730-1564552322.jpg",
          link:
            "http://touch.m.dangdang.com/topics.php?page_id=mix_20190730_fiz1"
        }
      ],
      miniBanner: [],
      pile: [],
      bool: 1
    };
  }
};
</script>
<style>
.content {
  width: 2.87rem;
  position: absolute;
  right: 0;
  top: 0.44rem;
  bottom: 0.44rem;
  overflow: auto;
}

.topBanner,
.topBanner > a > img {
  cursor: pointer;
  height: 1.02rem;
}
.miniBanner {
  height: 0.7rem;
  margin-top: 0.08rem;
  font-size: 0.14rem;
  display: flex;
  justify-content: space-between;
}
.miniBanner img {
  width: 0.05rem;
  height: 0.08rem;
}
.miniBanner > .miniList {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding: 0.1rem;
}
.miniBanner > .miniList > a {
  display: block;
  padding: 0.15rem;
}
.miniBanner > .miniList > a > p:first-child {
  color: #212121;
  font-weight: bold;
}
.miniBanner > .miniList > a > p:last-child {
  color: #a6a6a6;
  font-size: 0.12rem;
}

/* 3 */
.pictureText {
  width: 2.87rem;
  /* height: 1.68rem; */
  background: #fff;
  margin-top: 0.08rem;
  padding: 0.06rem;
}
.pictureText > h3 {
  height: 0.35rem;
  line-height: 0.35rem;
  font-size: 0.13rem;
  color: #1e1e1e;
}
.pictureText ul {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.pictureText li {
  width: 33%;
  height: 1.3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.pictureText li > a {
  display: block;
  width: 0.8rem;
  height: 0.83rem;
}
.pictureText > ul > li > a > img {
  width: 0.68rem;
  margin-bottom: 0.3rem;
}
.pictureText > ul > li > p {
  width: 0.83rem;
  height: 0.26rem;
  font-size: 0.11rem;
  color: #4d525d;
  margin-bottom: 0.2rem;
  text-align: center;
}
/* 4 */
.pictureTextb {
  width: 2.87rem;
  /* height: 1.33rem; */
  background: #fff;
  font-size: 0.12rem;
  margin-top: 0.08rem;
  padding: 0.06rem;
  clear: both;
}
.pictureTextb h3 {
  height: 0.35rem;
  display: flex;
  justify-content: space-between;
  line-height: 0.35rem;
}
.pictureTextb .pictureTextbH3Left {
  height: 0.35rem;
  font-size: 0.13rem;
  font-weight: bold;
  color: #1e1e1e;
}
.pictureTextbH3Left img,
.pictureTextbH3Right img {
  margin-left: 0.03rem;
  width: 0.05rem;
}
.pictureTextbH3Right {
  color: #969696;
  font-size: 0.12rem;
}
/* 设置展开容器 */
.pictureTextbList {
  position: relative;
  width: 100%;
  background: #fff;
}
.showCtg {
  height: 0.85rem;
  overflow: hidden;
}

.hideCtg {
  overflow: auto;
}

.pictureTextbList li {
  position: relative;
  float: left;
  width: 0.89rem;
  height: 0.42rem;
  margin-bottom: 0.02rem;
  margin-left: 0.02rem;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
}
.pictureTextbList li a {
  display: flex;
  height: 0.42rem;
  justify-content: center;
  align-items: center;
}
.pictureTextbList li span {
  position: absolute;
  right: 0;
  top: 25%;
  color: #e1e1e1;
}
.pictureTextbList .picTexBshow img {
  width: 0.12rem;
  height: 0.12rem;
}
/* 设置展开按钮样式 */
.pictureTextbList .picTexBshow {
  position: absolute;
  width: 0.89rem;
  height: 0.42rem;
  line-height: 0.42rem;
  right: 0.05rem;
  bottom: -0.05rem;
  z-index: 10;
  background: #fff;
}
.pictureTextbList .showHiddenCtg {
  transform: rotate(180deg);
}
</style>
