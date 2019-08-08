<template>
  <div class="ctgPage">
    <Header />
    <TabbarLeft></TabbarLeft>
    <ContentRight></ContentRight>
    <foot></foot>
  </div>
</template>
<script>
import TabbarLeft from "components/ctgPage/tabbarLeft/index.vue";
import ContentRight from "components/ctgPage/content/contentRight.vue";
export default {
  name: "ctgPage",
  components: {
    TabbarLeft,
    ContentRight
  }
};
</script>



<style>
.ctgPage {
  width: 100%;
  height: 100%;
}
</style>
