import loading from './index.vue'
import Vue from 'vue';
export default()=>{
    let loadingComponent=Vue.extend(loading);

    let loadingVm=new loadingComponent({
        el:document.createElement('div'),
        data:{
            flag:false
        },
        methods:{
            handlemount(){
                this.flag=true
            },
            handleDestroy(){
                this.flag=false
            }
        }
    })
    document.body.appendChild(loadingVm.$mount().$el)
    return loadingVm
}