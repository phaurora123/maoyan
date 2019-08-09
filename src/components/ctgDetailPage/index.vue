<template>
  <div class="detailPage" ref="ctgContent">
    <Header></Header>
    <octivia-BScroll ref="loadMore">
      <div class="ctgDetailBox" ref="ctgDetailBody">
        <DetailSectionTop />
        <DetailSectionSelect />
        <DetailSectionContent />
      </div>
    </octivia-BScroll>
    <v-touch id="goToTop" @tap="goToTopHandler" tag="div"></v-touch>

    <foot></foot>
  </div>
</template>
<script>
import DetailSectionTop from "components/ctgDetailPage/ctgDetailCat";
import DetailSectionSelect from "components/ctgDetailPage/ctgDetailSelect";
import DetailSectionContent from "components/ctgDetailPage/ctgDetailContent";
import { ctgDetail_api } from "api/ctgPage.js";
import { mapState, mapActions } from "vuex";
export default {
  name: "ctgDetailPage",
  components: {
    DetailSectionTop,
    DetailSectionSelect,
    DetailSectionContent
  },
  data() {
    return { page: 0 };
  },
  computed: {
    // sctgId: state => state.BooksDetail.ctgId
  },

  methods: {
    ...mapActions({
      pullingUploadMore: "BooksDetail/getBooksDetailActions"
    }),
    goToTopHandler() {
      // console.log(this.$refs.ctgContent.scrollTop);
      this.$refs.ctgContent.scrollTo(
        0,
        document.querySelector(".ctgDetailBox").offsetTop,
        500
      );
    }
  },
  mounted() {
    console.log(this.$refs.loadMore.scrollTop);
    console.log(this.$refs.loadMore.scroll.maxScrollY);

    this.$refs.loadMore.handlePullingUp(async () => {
      // let page=0;
      if (this.$refs.loadMore.scroll.maxScrollY) {
        this.page++;
      }
      let data = await ctgDetail_api(
        this.ctgId||"01.03.45.00.00.00",
        "default",
        1,
        "get_product_flow_category",
        (this.page - 1) * 10,
        0,
        0,
        113,
        this.page
      );
      this.pullingUploadMore(data);
      this.$refs.loadMore.handleFinishPullingUp();
    });
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
  
}
.ctgDetailBox {
  /* height: 100%; */
  background:#fff;
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
