<template>
  <div>
    <div class="cartTitle">
      <v-touch class="cartLeft" @tap="back" tag="i"></v-touch>
      <i>登录</i>
      <v-touch class="cartRight" tag="i"></v-touch>
    </div>
    
    <form action="">
        <h2>账户密码登录</h2>
        <input type="text" placeholder="请输入手机号/邮箱/昵称">
        <br>
        <input type="password" placeholder="请输入密码">
        <br>
        <input type="submit">
    </form>
  </div>
</template>
<script>
export default {
  name: "login",
  methods: {
    back() {
      this.$router.back();
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
form{
    width:2rem;
    height:2rem;
    display: flex;
    flex-direction: column;
    position: absolute;
    top:2rem;
    right:1rem;
    /* bottom:0; */
    /* left:0; */
}
h2{
    text-align: center;
    margin-bottom:0.3rem;
}
</style>
