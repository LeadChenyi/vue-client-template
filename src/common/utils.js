export default {
    debounce(callback, delay = 1000) {// 防抖函数
        let timer = null;
        return function () {
            clearTimeout(timer);
            timer = setTimeout(callback, delay);
        }
    },
    throttle(callback, delay = 1000) {// 节流函数
        let timer = null;
        return function () {
            if (timer) {
                return;
            }
            clearTimeout(timer);
            timer = setTimeout(function () {
                callback && callback();
                timer = null;
            }, delay);
        }
    },
    isMobileOrMiniClient(limitWidth = 1024) {// 移动屏模型检测
        if (
            navigator.userAgent.match(
                /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
            )
        ) {
            return true;
        }

        let clientWidth = document.body.clientWidth || document.documentElement.clientWidth
        if (clientWidth <= limitWidth) {
            return true;
        }

        return false
    },
    isExternal(path) {
        return /^(https?:|mailto:|tel:)/.test(path)
    },
    isTokenExpirationTime(recordTimestamp, seconds = 7200) {// 令牌是否过期
        let _diff = (new Date().getTime() - recordTimestamp) / 1000;
        return _diff > seconds;
    },
    isMeetExpectionTime(recordTimestamp, seconds = 10) {// 是否达到预期时间
        let _diff = (new Date().getTime() - recordTimestamp) / 1000;
        return _diff >= seconds;
    },
    isQuickDoubleClick(recordTimestamp, milliseconds = 1000) {// 是否快速连点
        let currentTimestamp = new Date().getTime();
        let _diff = currentTimestamp - recordTimestamp;
        if (_diff > 0 && _diff < milliseconds) {
            return false;
        }

        return currentTimestamp;
    },
    isEveryDayNotice(key) {// 是否每日进行一次性通知
        let _local = localStorage.getItem(key);
        let currentTime = this.getDayFormat(false, '{y}-{m}-{d}');
        let recodeTime = _local ? this.getDayFormat(_local, '{y}-{m}-{d}') : this.getDayFormat(false, '{y}-{m}-{d}');
        if (currentTime != recodeTime) {
            let currentTimestamp = new Date().getTime();
            localStorage.setItem(key, currentTimestamp);
            return true;
        }
        return false;
    },
    getDayFormat(timestamp, format = '{y}-{m}-{d} {h}:{i}:{s}', regexp = /{(y|m|d|h|i|s)+}/g) {// 获取时间格式化
        if (timestamp && timestamp.toString().length == 10) {
            timestamp *= 1000;
        }

        const date = timestamp ? new Date(timestamp) : new Date();
        const parseDate = {
            y: date.getFullYear(),
            m: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            i: date.getMinutes(),
            s: date.getSeconds()
        }

        let result = format.replace(regexp, (value, key) => {// 参数value就是字符串格式中匹配到的字符，参数key就是正则表达式括号中的值
            let item = parseDate[key];
            if (value && item < 10) {
                item = '0' + item;
            }
            return item
        })

        return result;
    },
    getLocationQuery(fullPath) {
        let obj = {};
        let query = fullPath ? fullPath.split('?')[1] : location.href.split('?')[1];
        if (query) {
            let param = query.split('&');
            for (let i of param) {
                let arr = i.split('=');
                obj[arr[0]] = arr[1];
            }
        }
        return obj;
    },
    getBlobToUrl(data, type = 'application/zip') {
        const blob = new Blob([data], { type });
        const url = window.URL.createObjectURL(blob);
        // window.location.href = url;
        return url;
    }
}