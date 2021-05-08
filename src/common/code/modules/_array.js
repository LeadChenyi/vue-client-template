export default {
    min(arr){// 获取数组中最小值
        return Math.min.apply(this,arr);
    },
    max(arr){// 获取数组中最大值
        return Math.max.apply(this,arr);
    },
    sum(arr){// 累计数组中值的和
        /*let total = 0;
        arr.forEach((item)=>{
            total += item;
        });
        return total;*/

        return arr.reduce((total,num)=>{
            return total += num;
        })
    },
    simple(arr){// 数组化简：多维数组化成一维数组
        let res = [];
        for(var i = 0;i < arr.length;i++){
            if(Array.isArray(arr[i])){
                let temp = this.simple(arr[i]);
                res = [...res,...temp];
            }else{
                res.push(arr[i]);
            }
        }
        return res;

        // return arr.flat();   // 默认只能扁平化二维数组（嵌套更深的数组只能指定消除层数）
    },
    simple2(nestArr){
        let newArr = [];
        function recursion(arr){
            for(var i = 0;i < arr.length;i++){
                if(Array.isArray(arr[i])){
                    recursion(arr[i]);
                }else{
                    newArr.push(arr[i]);
                }
            }
        }
        recursion(nestArr);
        return newArr;
    },
    repeat(arr){// 数组去重：去掉数组中重复的元素
        // return Array.from(new Set(arr));

        let res = [];
        arr.forEach((item)=>{
            if(res.indexOf(item) < 0){// res.includes(item)
                res.push(item);
            }
        })
        return res;
    },
    group(arr,limit){// 数组分组：按条数分组
        let res = [];
        for(let i = 0;i < arr.length;i++){
            let index = Math.floor(i / limit);
            if(res.length <= index){
                res.push([]);
            }
            res[index].push(arr[i]);
        }
        return res;
    },
    index(arr,val){// 返回数组中某个指定的元素位置
        /*for(let i = 0;i < arr.length;i++){
            if(arr[i] == val){
                return i;
            }
        }*/

        return arr.indexOf(val);
    },
    sort(arr,asc = true){// 默认字典排序
        return arr.sort((a,b)=>{
            if(asc){
                return a - b;
            }else{
                return b - a;
            }
        })
    },
    sortBubble(arr){// 冒泡排序
        for(let i=0;i < arr.length - 1;i++){
            for(let j=0;j < arr.length - 1 - i;j++){
                if(arr[j] > arr[j+1]){
                    let temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
        }
        return arr;
    },
    shuffle(){// 随机打乱

    }
}