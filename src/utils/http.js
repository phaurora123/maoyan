import axios from 'axios';
import qs from 'qs';
import loading from '../lib/loading/index.js'
let vm=loading()
const server = axios.create({
    // baseURL:'',
    time: 5000,
    withCredentials: true
})

server.interceptors.request.use(config=>{
    vm.handlemount();
    if(config.method=='get'){
        console.log(config)
        // config.params={...config.data};
    }else if(config.method=='post'){
        config.headers['content-type']='application/x-www-form-urlencoded';
        config.data=qs.stringify(config.data)
    }
    return config;//////////别忘了
},(err)=>{
    Promise.reject(err)})

server.interceptors.response.use(res=>{
    vm.handleDestroy();
    if(res.statusText=="OK"){
        return res.data;
    }
},(err)=>{
    Promise.reject(err)})
export default (method,url,data)=>{
    if(method.toUpperCase()=='GET'){
        console.log('ddddddddd')
        return server.get(url,{params:data})
    }else if(method.toUpperCase()=='POST'){
        return server.post(url,data)
    }
}

