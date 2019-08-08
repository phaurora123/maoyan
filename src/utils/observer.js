const eventList={};
const $on=(eventName,callback)=>{
    if(!eventList[eventName]){
        eventList[eventName]=[]
    }
    eventList[eventName].push(callback)
}
const $off=(eventName,callback)=>{
    if(eventList[eventName]){
        if(callback){
            var arr=eventList[eventName];
            var index=arr.indexOf(callback);
            arr.splice(index,1)
        }else{
            eventList[eventName].length=0
        }
    }
}
const $emit=(eventName,params)=>{
    if(eventList[eventName]){
        var arr=eventList[eventName];
        arr.map(cb=>{
            cb(params)
        })
    }
}
export default{
    $on,
    $off,
    $emit
}