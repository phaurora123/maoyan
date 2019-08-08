<template>
    <div class="foot">
        <div :class="activeinfo===index ?'footcent active':'footcent'" v-for="(item,index) in msg" :key="index"
        @click="handlerfooter(index)">
            <span :class="item.icon"></span>
            <div>{{item.name}}</div>
        </div>
    </div>
</template>
<script>
export default {
    name:"foot",
    data(){
        return{
            msg:[
                {name:"首页",icon:"iconfont icon-shouye"},
                {name:"分类",icon:"iconfont icon-fenlei"},
                {name:"值得买",icon:"iconfont icon-Bag"},
                {name:"购物车",icon:"iconfont icon-gouwuche"},
                {name:"我的当当",icon:"iconfont icon-weibiaoti2fuzhi12"}

            ],
            activeinfo:0,
            // props:['val']
        }
    },
    methods:{
        handlerfooter(index){
                this.activeinfo=index
        }
    }
}
</script>

<style>
    .foot{
        width: 100%;
        position: fixed;
        bottom:0;
        height: 0.44rem;
        border-top:1px solid #ccc;
        display: flex;
        justify-content: space-around;
        /* 改成了固定定位，增加了background */
        background:#fff;
        /* z-index:999 */
    }
    .footcent{
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size:0.12rem;
    }
    .footcent>span{
        font-size:0.22rem
    }
    .active{
        color:#ff0030
    }
</style>
