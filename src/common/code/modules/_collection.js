export default {
    each(list,callBack){
        //console.log(callBack);        //接收回调函数体
        //console.log(callBack());      //执行回调函数
        if(list instanceof Array){
            list.forEach(function(item,index){
                callBack && callBack(item,index);
            })
        }else{
            //获取对象属性的值两种方式：1、对象.属性  2、对象["属性"] 或 对象[变量]
            for(let key in list){
                callBack && callBack(list[key],key);
            }
        }
    },
    contrast(sources,holds,field = 'name',children = 'children'){
        const res = [];
        sources.forEach((item,index)=>{
            holds.forEach((c,i)=>{
                if(item[field] === c[field]){
                    if(c[children] && c[children].length){
                        item[children] = this.contrast(item[children],c[children],field,children);
                    }
                    res.push(item);
                }
            })
        })
        return res;
    },
    addAttr(mainJson,valArr,attrStr){//给数组对象添加新属性
        for(let i = 0;i < mainJson.length;i++){
            mainJson[i][attrStr] = valArr[i];
        }
        return mainJson;
    },
    getAttrArray(mainJson,attrStr){//获取数组对象中某个属性值组成新数组
        let newArr = [];
        for(let i = 0; i < mainJson.length;i++){
            newArr.push(mainJson[i][attrStr]);
        }
        return newArr;
    },
    attrSequ(mainJson,attrArr){//自定义显示数组对象中属性的顺序
        for(let i = 0;i < mainJson.length;i++){
            let tempObj = {};                   //每次循环前清空对象，否则浅拷贝的关系数据重叠都为最后一条
            for(let j = 0;j < attrArr.length;j++){
                tempObj[attrArr[j]] = mainJson[i][attrArr[j]];
            }
            mainJson[i] = tempObj;
        }
        return mainJson;
    },
    attrSort(mainJson,attrStr,sort = true){//排序方式为某个属性的值
        return mainJson.sort(function(a,b){
            if(sort){
                return a[attrStr] - b[attrStr];
            }else{
                return b[attrStr] - a[attrStr];
            }
        })
    },
    getAttrArrayTree(treeJson,attrStr){//遍历数组对象中某个属性值组成新数组
        let newArr = [];
        function recursion(data){
            data.forEach(function(item){
                newArr.push(item[attrStr]);
                if(item.children){
                    recursion(item.children);
                }
            })
        }
        recursion(treeJson)
        return newArr;
    },
    toTreeChild(item,oldJson) {
        let self = this;
        let children = new Array();
        for (let i = 0; i < oldJson.length;i++) {
            if (item.id == oldJson[i].pid) {//查找当前父元素下的子元素
                self.toTreeChild(oldJson[i],oldJson);
                oldJson[i].elder = item.name;
                children.push(oldJson[i]);
            }
        }
        if (children.length > 0) {//如果存在子级数据则赋值给当前item对象
            item.children = children;
        }
        return item;
    },
    toTreeClassify(oldJson){//根据pid将数组对象按辈分级归类
        let self = this;
        let newJson = [];
        for (let i = 0; i < oldJson.length;i++) {
            if (oldJson[i].pid == 0 || oldJson[i].pid == null) {//查找父元素
                newJson.push(self.toTreeChild(oldJson[i],oldJson));
            }
        }
        return newJson;
    }
}