export default {
    debounce(callback, delay = 1500) {// 防抖函数
        let timer = null;
        return function () {
            clearTimeout(timer);
            timer = setTimeout(callback, delay);
        }
    },
    throttle(callback, delay = 1500) {// 节流函数
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
    polling(
        {
            method = 'get',
            url = '/'
        } = {}, callback, wait = 1500) {// 定时轮询
        let xhr = new XMLHttpRequest();
        setInterval(() => {
            xhr.open(method, url);
            xhr.onreadystatechange = (res) => {
                // if(xhr.readyState === 4 && xhr.status === 200){
                //     callback && callback(res);
                // }
                callback && callback(res);
            }
            xhr.send();
        }, wait);
    },
    pollingSelf(
        {
            method = 'get',
            url = '/'
        } = {}, callback) {// 自调轮询
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onreadystatechange = (res) => {
            // if(xhr.readyState === 4 && xhr.status === 200){
            //     callback && callback(res);
            // }
            callback && callback(res);
            this.pollingSelf();
        }
        xhr.send();
    }
}