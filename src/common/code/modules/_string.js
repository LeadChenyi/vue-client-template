export default {
    createMark(mark, count = 1) { // 创建字符
        let str = "";
        for (let i = 0; i < count; i++) {
            str += mark;
        }
        return str;
    },
    toTrim(str, direction = "both") {// 过滤空格字符
        if (typeof str !== "string") {
            throw new Error('请传递有效参数');
        }

        if (direction === "both") {
            return str.trim();
            //return str.replace(/^\s*|\s*$/g,"");
        } else if (direction === "all") {
            return str.replace(/\s*/g, "");
        } else if (direction === "left") {
            return str.replace(/^\s*/g, "");
        } else if (direction === "right") {
            return str.replace(/\s*$/g, "");
        }
    },
    toForbidden(str) {// 过滤非法字符
        const forbiddenWords = ["傻", "逼", "草", "屌", "你妈的"];
        forbiddenWords.forEach((item) => {
            str = str.replace(new RegExp(item, "ig"), "***");
        })
        return str;
    },
    totalString(str, mark) {// 统计某个字符出现的次数
        return str.split(mark).length - 1;
        //console.log(str.match(/\./g));    //不推荐 因为正则匹配出现结果可能是null，那么此时使用length一定会报错
        //console.log(str.split("."))       //推荐 即使没有匹配到至少返回原字符的数组，就一定存在length长度
    },
    totalStringAll(str, callback) {// 统计所有字符出现的次数
        let obj = {};
        for (let i = 0; i < str.length; i++) {
            if (!obj[str.charAt(i)]) {
                obj[str.charAt(i)] = 1;
            } else {
                obj[str.charAt(i)]++;
            }
        }

        callback && callback(obj);
        return obj;
    },
    battleMostKey(obj) {// 比较对象中出现次数最多的键
        let maxKey = null;
        let maxVal = 0;
        for (let i in obj) {
            if (obj[i] > maxVal) {
                maxVal = obj[i];
                maxKey = i;
            }
        }

        return {
            maxKey,
            maxVal
        }
    },
    toURI(url, callback) {// 转换url中传递的参数成键值对象
        let obj = {};
        let paramStr = url.split('?')[1];
        let paramArr = paramStr.split('&');
        paramArr.forEach((item) => {
            let tempArr = item.split('=');
            let key = tempArr[0];
            obj[key] = tempArr[1];
        });

        callback && callback(obj);
        return obj;
    },
    // encodeHTML(str){//转义html标签
    //     return str.replace(/&/g, '&amp;')
    //         .replace(/\"/g, '&quot;')
    //         .replace(/\'/g,'&acute;')
    //         .replace(/\//g,'&frasl;')
    //         .replace(/</g, '&lt;')
    //         .replace(/>/g, '&gt;')
    // },
    // decodeHTML(str){//还原html标签
    //     return str.replace(/&amp;/g, '&')
    //         .replace(/&quot;/g, '\"')
    //         .replace(/&acute;/g, '\'')
    //         .replace(/&frasl;/g, '\/')
    //         .replace(/&lt;/g, '<')
    //         .replace(/&gt;/g, '>')
    // },
    filterHTML(str, direction = "both") {//过滤字符串中的HTML标签可选择清空文本间的空格
        let text = str.replace(/<\/?.+?>/g, "");
        let plainText = "";
        if (direction == "both") {
            plainText = text.replace(/^\s*|\s*$/g, "");
        } else if (direction == "all") {
            plainText = text.replace(/\s*/g, "");
        }
        return plainText;
    },
    // cutString(str, limit) {//截取字符串
    //     let cutNum = 0;
    //     let tempStr;
    //     let pattern = /[^\x00-\xff]/;
    //     let resStr = "";
    //     for (let i = 0; i < str.length; i++) {
    //         //如果已截取的长度超过限定长度直接跳转循环
    //         if (cutNum < limit) {
    //             //截取到某个当前字符
    //             tempStr = str.substr(i, 1);
    //             //对当前截取字符进行匹配如果是中文字符已截取长度+2否则+1
    //             if (pattern.exec(tempStr) != null) {
    //                 cutNum = cutNum + 2
    //             } else {
    //                 cutNum = cutNum + 1
    //             }
    //             //将当前截取字符累加给结果集
    //             resStr += tempStr
    //         } else {
    //             break
    //         }
    //     }
    //     return resStr + "...";
    // }
}