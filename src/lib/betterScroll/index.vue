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
      click:true,
    //   pullDownRefresh: true,
      pullUpLoad: true
    });
  },
  methods:{
    handlePullingUp(callback){
      this.scroll.on('pullingUp',()=>{
        callback()
      })
    },
    handleFinishPullingUp(){
      this.scroll.finishPullUp();
      this.scroll.refresh()
    }
  }
};
</script>
<style>
.wrapper {
  /* width:100%; */
  height: 100%;
}
</style>
