import Vue from 'vue'
// import App from 'module';
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/dd_category'
    },
    {
      path: '/dd_category',
      name: 'ctgPage',
      meta:{
        title:'商品分类',

      },
      component: ()=>import('components/ctgPage/index.vue')
    },
    {
      path: '/dd_category/cid',
      name: 'ctgDetailPage',
      meta:{
        title:'商品详情',
        
      },
      component: () => import('components/ctgDetailPage/index.vue'),
    },
    {
      path:'/filter',
      name:'filterCid',
      meta:{
        title:'筛选',
        
      },
      component:resolve=>require(['../components/select/index.vue'],resolve)
    },
    {
      path:'/cart',
      name:'cart',
      meta:{
        title:'购物车',
        
      },
      component:resolve=>require(['../components/cart/index.vue'],resolve)
    },
    {
      path:'/login',
      name:'login',
      meta:{
        title:'login',
        
      },
      component:resolve=>require(['../components/login/index.vue'],resolve)
    }
  ]
})
