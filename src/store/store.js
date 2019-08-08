import Vue from 'vue'
import Vuex from 'vuex'
import BooksDetail from './detail/books.js'
import cart from './cart/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
  },
  mutations: {

  },
  actions: {

  },
  modules:{
    BooksDetail,
    cart
  }
})
