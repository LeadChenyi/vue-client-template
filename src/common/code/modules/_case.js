export default {
    bufferAnimation(objEle, objAttr, callBack) {//缓动动画
        clearInterval(objEle.timer);
        var startVal = 0, speed = 0, target = 0;
        objEle.timer = setInterval(function () {
            var flag = true;
            for (let key in objAttr) {
                if (key === "scrollTop") {
                    startVal = Math.ceil(objEle.scrollTop); //向上取整防止精度丢失
                    target = parseInt(objAttr[key]);
                } else {
                    //动态获取元素所在的起始值
                    startVal = parseInt(this.getStyleAttr(objEle, key));
                    //获取目标值
                    target = parseInt(objAttr[key]);
                }

                //求出步长 = (目标值 - 起始值) * 缓动系数
                speed = (target - startVal) * 0.2;

                //步数取整防止计算偏差出现小数点
                if (target > startVal) {
                    speed = Math.ceil(speed);
                } else {
                    speed = Math.floor(speed);
                }

                //缓动值 = 起始值 + 步长
                if (key === "scrollTop") {
                    objEle.scrollTop = startVal + speed;
                } else if (key === "zIndex" || key === "opacity") {
                    objEle.style[key] = objAttr[key];
                } else {
                    objEle.style[key] = startVal + speed + "px";
                }


                //全部都完成才开启停止定时器通道
                if (startVal !== target) {
                    flag = false;
                }
            }

            //停止定时器
            if (flag) {
                clearInterval(objEle.timer);

                //动画完成之后执行下一个回调函数
                if (callBack) {
                    callBack();
                }
            }
        }, 20);
    },
    dragFrame(objEle, objEleParent) {//拖动框
        objEle.onmousedown = function (event) {
            let e = event || window.event;
            var startY = 0, startX = 0;

            //鼠标起始值 = 鼠标指针的坐标 - 当前定位元素相对于父级定位元素的距离
            if (objEleParent !== undefined) {
                startY = e.clientY - objEleParent.offsetTop;
                startX = e.clientX - objEleParent.offsetLeft;
            } else {
                startY = e.clientY - objEle.offsetTop;
                startX = e.clientX - objEle.offsetLeft;
            }

            document.onmousemove = function (event) {
                let e = event || window.event;
                //移动结果值 = 鼠标指针的坐标 - 鼠标起始值
                var topVal = e.clientY - startY;
                var leftVal = e.clientX - startX;
                var maxTop = 0, maxLeft = 0;

                if (objEleParent !== undefined) {
                    maxTop = document.body.offsetHeight - objEleParent.offsetHeight;
                    maxLeft = document.body.offsetWidth - objEleParent.offsetWidth;
                } else {
                    maxTop = document.body.offsetHeight - objEle.offsetHeight;
                    maxLeft = document.body.offsetWidth - objEle.offsetWidth;
                }

                //最大范围值限制
                if (topVal >= maxTop) {
                    topVal = maxTop;
                } else if (topVal <= 0) {
                    topVal = 0;
                }
                if (leftVal >= maxLeft) {
                    leftVal = maxLeft;
                } else if (leftVal <= 0) {
                    leftVal = 0;
                }

                if (objEleParent !== undefined) {
                    objEleParent.style.top = topVal + "px";
                    objEleParent.style.left = leftVal + "px";
                    objEleParent.style.zIndex = 9;
                } else {
                    objEle.style.top = topVal + "px";
                    objEle.style.left = leftVal + "px";
                    objEle.style.zIndex = 9;
                }

                document.onmouseup = function () {
                    document.onmousemove = null;
                    //console.log("已销毁移动事件");
                    if (objEleParent !== undefined) {
                        objEleParent.style.zIndex = 0;
                    } else {
                        objEle.style.zIndex = 0;
                    }
                }
            }
        }
    },
    toolTip(objEle, objEleMask) {//工具提示
        var topVal = 0, leftVal = 0;
        var winHV = window.innerHeight;
        for (let i = 0; i < objEle.length; i++) {
            objEle[i].onmouseover = function (event) {
                //将蒙版显示并加入title
                objEleMask.style.display = "block";
                objEleMask.innerText = this.getAttribute("data-title");

                //将判断蒙版是否显示在元素的上方或下方
                let e = event || window.event;
                if (e.clientY >= (winHV / 3)) {
                    topVal = this.offsetTop - objEleMask.offsetHeight - 5;
                } else {
                    topVal = this.offsetTop + objEleMask.offsetHeight + 5;
                }
                //将蒙版显示在元素的中心位置
                leftVal = this.offsetLeft + this.offsetWidth * 0.5 - objEleMask.offsetWidth * 0.5;
                objEleMask.style.top = topVal + "px";
                objEleMask.style.left = leftVal + "px";
            }
            objEle[i].onmouseout = function () {
                objEleMask.style.display = "none";
                objEleMask.innerText = "";
            }
        }
    },
    treeLikeHTML(treeAB, attrStr, options) {//生成树状目录
        var self = this;
        var html = "";
        html += "<ul>";
        treeAB.forEach(function (item, index) {
            if (options.flag == true) {//判断是否开启系列号显示
                const serial = `${options.serialNum}${index + 1}`;  //①No1 => ③No1.1 以此类推
                console.log(serial);                                //分解：No1. 为字符串类型 、1 为Number类型
                const layer = self.countRate(serial, ".");

                if (options.markStr == "") {//判断显示楼号还是符号标记
                    html += "<li>" + layer + item[attrStr];
                } else {
                    const mark = self.exchange(layer, options.markStr)
                    html += "<li>" + mark + item[attrStr];
                }

                if (item.children) {
                    html += self.treeLikeHTML(item.children, attrStr, {
                        flag: options.flag,
                        serialNum: `${serial}.`, //②No1.
                        markStr: options.markStr
                    });
                }
            } else {
                html += "<li>" + item[attrStr];
                if (item.children) {
                    html += self.treeLikeHTML(item.children, attrStr, options);
                }
            }
            html += "</li>";
        });
        html += "</ul>";
        return html;
    },
    openWindow(url, name, widthVal, heightVal) {
        let x = parseInt(window.screen.width / 2) - (widthVal / 2);
        let y = parseInt(window.screen.height / 2) - (heightVal / 2);
        let params = "";
        if (navigator.appName == "Microsoft Internet Explorer") {
            params = "resizable=1,location=no,scrollbars=no,width=" + widthVal + ",height=" + heightVal + ",top=" + y + ",left=" + x;
        } else {
            params = "width=" + widthVal + ",height=" + heightVal + ",top=" + y + ",left=" + x + ",scrollbars=yes,dialog=yes,modal=yes,resizable=no";
        }
        window.open(url, name, params);
    },
    // calculator(arg1, arg2, operator) {
    //     let operArr = ['+', '-', '*', '/'];

    //     // 不合法传参
    //     if (isNaN(arg1) || isNaN(arg2) || operArr.indexOf(operator) < 0) {
    //         return NaN;
    //     }
    //     // 除数不能为零
    //     if (operator === '/' && Number(arg2) === 0) {
    //         return Infinity;
    //     }
    //     // 和零相乘返回0
    //     if (operator === '*' && Number(arg2) === 0) {
    //         return 0;
    //     }
    //     // 相同的两个数字相减返回0
    //     if ((arg1 === arg2 || Number(arg1) === Number(arg2)) && operator === '-') {
    //         return 0;
    //     }

    //     let r1, r2, max, _r1, _r2;
    //     try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    //     try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    //     max = Math.max(r1, r2);
    //     _r1 = max - r1;
    //     _r2 = max - r2;
    //     if (_r1 !== 0) {
    //         arg1 = arg1 + '0'.repeat(_r1);
    //     }
    //     if (_r2 !== 0) {
    //         arg2 = arg2 + '0'.repeat(_r2);
    //     }
    //     arg1 = Number(arg1.toString().replace('.', ''));
    //     arg2 = Number(arg2.toString().replace('.', ''));

    //     let r3 = operator === '*' ? (max * 2) : (operator === '/' ? 0 : max);
    //     let newNum = eval(arg1 + operator + arg2);
    //     if (r3 !== 0) {
    //         let newStr = newNum.toString();
    //         newStr = newStr.replace(/^-/, '');
    //         if (newStr.length < r3 + 1) {
    //             newStr = '0'.repeat(r3 + 1 - newStr.length) + newStr;
    //         }
    //         newStr = newStr.replace(new RegExp('(\\\d{' + r3 + '})$'), '.$1');
    //         if (newNum < 0) {
    //             newStr = '-' + newStr;
    //         }
    //         newNum = newStr * 1;
    //     }
    //     return newNum;
    // },
    calcMath(operation, retain) {//参数1 =>运算式  参数2 =>实际运算结果至少需预留小数后几位
        return Math.round(operation * Math.pow(10, retain)) / Math.pow(10, retain);
    },
    copyText(text) {
        let input = document.createElement('input');
        input.setAttribute('id', 'copyId');
        input.value = text;
        document.querySelector('body').appendChild(input);

        const range = document.createRange();
        range.selectNode(document.getElementById('copyId'));

        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            selection.removeAllRanges();
        }
        selection.addRange(range);
        document.execCommand('copy');
        document.getElementById('copyId').remove();
    }
}