const state = {
    goodsInfo: JSON.parse(sessionStorage.getItem('goodsInfo')) || [],
    selectedAll: true,
}
const actions = {
    sendToCartActions({ commit }, cartItem) {

        cartItem.flag = true;//增加是否选中属性
        cartItem.quality = 1;//增加默认商品数量
        commit('sendToCartMutations', cartItem)
    }
}
const mutations = {
    sendToCartMutations(state, cartItem) {
        state.goodsInfo.push({ ...cartItem })
// 当点击相同商品时 数量增加
        // for (var i = 0; i < state.goodsInfo.length; i++) {
        //     if (state.goodsInfo[i].id == cartItem.id) {
        //         cartItem.quality++;
        //         break;
        //     } else
        //     {state.goodsInfo.push({ ...cartItem })}
        // }
        sessionStorage.setItem('goodsInfo', JSON.stringify(state.goodsInfo))
    },
    selectedAllMutations(state) {
        state.selectedAll = !state.selectedAll
        state.goodsInfo.forEach(function (item) {
            item.flag = state.selectedAll
        })
    },
    chooseOneMutations(state, index) {
        state.goodsInfo[index].flag = !state.goodsInfo[index].flag
        var bool = state.goodsInfo.every(function (item) {
            return item.flag == true
        })
        state.selectedAll = bool
    },
    reduceQuality(state, index) {
        if (state.goodsInfo[index].quality > 0)
            state.goodsInfo[index].quality--
    },
    addQuality(state, index) {
        state.goodsInfo[index].quality++
    },
    delGoods(state, index) {

        state.goodsInfo.splice(index, 1)
        console.log(state.goodsInfo)
    }
}
const getters = {
    goodsTotalGetters(state) {
        var count = 0;
        var sum = state.goodsInfo.reduce((sum, item) => {
            if (item.flag == true) {
                sum += item.price * item.quality
                count += item.quality
            }
            return sum;
        }, 0)
        return { sum, count }
    }
}
export default {
    state,
    actions,
    mutations,
    getters,
    namespaced: true
}