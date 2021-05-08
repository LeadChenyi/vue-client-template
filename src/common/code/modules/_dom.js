export default {
    $(ele){
        if(typeof ele === "string"){
            var str = ele.charAt(0);
            if(str === "#"){
                return document.querySelector(ele);
            }else{
                return document.querySelectorAll(ele);
            }
        }
        return null;
    },
    setClassName(obj,name){
        obj.className ? (obj.className = name) : obj.setAttribute("class",name);
    },
    getStyleAttr(obj,attr){//获取样式属性值
        return obj.currentStyle ? obj.currentStyle[attr] : window.getComputedStyle(obj,null)[attr];
    },
    getScrollAttr(){
        return document.body ? {
            scrollTop: document.body.scrollTop,
            scrollLeft: document.body.scrollLeft
        } : {
            scrollTop: document.documentElement.scrollTop,
            scrollLeft: document.documentElement.scrollLeft
        }
    },
    getOffsetAttr(){
        return document.body ? {
            width: document.body.offsetWidth,
            height: document.body.offsetHeight
        } : {
            width: document.documentElement.offsetWidth,
            height: document.documentElement.offsetHeight
        }
    },
    getClientAttr(){
        return document.body ? {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        } : {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    },
    getEvent(e){
        return {
            target : (e.srcElement ? e.srcElement : e.target),
            key : (e.keyCode || e.charCode || e.which),
            x: (e.x ? e.x : e.pageX),
            y: (e.y ? e.y : e.pageY)
        }
    },
    stopPre(e){
        //阻止事件冒泡
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
        //阻止默认行为
        e.preventDefault ? e.preventDefault() : e.returnValue= false;
    },
    setCookit(cookitKey,cookitVal,exdays){
        let date = new Date();
        //失效时间 = 当前时间 + 有效期N天
        date.setTime(date.getTime() + (exdays*24*60*60*1000));
        //根据世界时把Date对象转换为字符串
        document.cookie = cookitKey+"="+cookitVal+"; expires="+date.toUTCString();
    },
    getCookit(cookieKey){
        let key = cookieKey + "=";
        let group = document.cookie.split(';');
        for(let i = 0;i < group.length; i++) {
            let item = group[i].trim();
            if(item.indexOf(key) == 0){
                //返回的字符串包括开始处的字符，但不包括结束处的字符
                return item.substring(key.length,item.length);
            }
        }
        return null;
    }
}