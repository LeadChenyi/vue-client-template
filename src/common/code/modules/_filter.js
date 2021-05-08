export default {
    toRGB(){

    },
    toRateIcon(num,isHalf = false){
        let tempArr = [];
        for(let i = 0;i < Math.floor(num) ;i++){//生成已获得的数量
            tempArr.push("★");
        }
        if(isHalf && (num % 1) !== 0){//判断是否生成半星
            let floatArr = num.toFixed(1).split(".");
            let floatStr = floatArr[1];
            if(floatStr < 4){//123✬
                tempArr.push("✬");
            }else if(floatStr < 7){//456✯
                tempArr.push("✯");
            }else{//789✮
                tempArr.push("✮");
            }
        }
        while(tempArr.length < 5){//补全剩余的数量
            tempArr.push("☆");
        }
        return tempArr.join("");
    },
    toRateName(num){
        const rateJson = [
            {text:"极差",color:"#95989D"},
            {text:"失望",color:"#67C23A"},
            {text:"一般",color:"#E7A644"},
            {text:"满意",color:"#409EFF"},
            {text:"惊喜",color:"#F56C6C"}
        ];
        return rateJson[Math.floor(num) - 1];
    },
    toPercent(currVal,totalVal,totalPct){// 转百分率
        return parseInt(currVal / totalVal * totalPct);
    },
    patchZero(num,limit = 10){// 补零
        return num >= limit ? num : `0${num}`;
    }
}