const state = {
    ctgId: '',
    ctgDetail: JSON.parse(sessionStorage.getItem('ctgDetail'))||{},
    ctgCatHead: {},
    ctgCat: [],
    ctgList: [],
    filterMsg:{}
}
const actions = {
    getBooksDetailActions({ commit }, params) {
        console.log(params)
        commit('getBooksDetailMutations', params)
    },
    fliterMsgActions({commit},params){
        commit('getFilterMsgMutations',params)
    }
}
const mutations = {
    getFilterMsgMutations(state,params){
        state.filterMsg={...params}
    },
    sendCtgDeatailId(state, path) {
        console.log(path)
        state.ctgId=path
            .split("?")[1]
            .split("&")[0]
            .split("=")[1];
    },
    getBooksDetailMutations(state, params) {
        if(state.ctgDetail.products){
            JSON.parse(JSON.stringify(params)).products.forEach(item => {
                state.ctgDetail.products.push(item)
            });   
        }else{
            state.ctgDetail=JSON.parse(JSON.stringify(params))
            sessionStorage.setItem('ctgDetail',JSON.stringify(state.ctgDetail))
        }
        console.log(state.ctgDetail,11111111111)
        state.ctgCatHead = state.ctgDetail.parrent_cat;
        if (state.ctgDetail.categories.length > 0) {
            state.ctgCat = state.ctgDetail.categories
        } else {
            state.ctgCat = state.ctgDetail.samelev_cat;
        }
        state.ctgList = state.ctgDetail.products
        // console.log(state.ctgCatHead, state.ctgCat,state.ctgList)
        // console.log(state.ctgDetail.parrent_cat[0].Name)
    }
}
export default {
    state,
    actions,
    mutations,
    namespaced: true
}