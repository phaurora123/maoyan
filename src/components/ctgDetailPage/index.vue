<template>
  <div class="detailPage" ref="ctgContent">
    <octivia-BScroll>
      <Header></Header>
      <div class='ctgDetailBox'>
        <DetailSectionTop />
        <DetailSectionSelect />
        <DetailSectionContent />
      </div>
      <v-touch id="goToTop" @tap="goToTopHandler" tag="div"></v-touch>
    </octivia-BScroll>
    <foot></foot>
  </div>
</template>
<script>
import DetailSectionTop from "components/ctgDetailPage/ctgDetailCat";
import DetailSectionSelect from "components/ctgDetailPage/ctgDetailSelect";
import DetailSectionContent from "components/ctgDetailPage/ctgDetailContent";

export default {
  name: "ctgDetailPage",
  components: {
    DetailSectionTop,
    DetailSectionSelect,
    DetailSectionContent
  },
  methods: {
    goToTopHandler() {
      // console.log(this.$refs.ctgContent.scrollTop);
      this.$refs.ctgContent.scrollTo(0,document.querySelector('.ctgDetailBox').offsetTop,500)
    }
  }
};
</script>
<style>
.detailPage {
  position: fixed;
  top: 0rem;
  bottom: 0.44rem;
  width: 100%;
  height: 100%;
  background: #fff;
  overflow-y: auto;
}
#goToTop {
  position: fixed;
  bottom: 0.5rem;
  right: 0.1rem;
  width: 0.54rem;
  height: 0.54rem;
  background: url("http://search.m.dangdang.com/images/search_category/gotop.png")
    center center no-repeat;
  background-size: contain;
}
</style>
