<template>
  <div class="wrapper" ref='wrapper'>
    <slot></slot>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name: "octivia-BScroll",
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      tap: true,
      click:true
    //   pullDownRefresh: true,
    //   pullUpLoad: true
    });
  }
};
</script>
<style>
.wrapper {
  /* width:100%; */
  height: 100%;
}
</style>
