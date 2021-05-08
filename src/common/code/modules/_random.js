export default {
    range(min, max, isContainMax = true) {// 获取随机范围数，默认包含最大值
        return Math.floor(Math.random() * (max - min + (!!isContainMax)) + min);
    },
    rangeMax(min, max) {// 获取随机范围数，仅含最大值
        return Math.ceil(Math.random() * (max - min) + min);
    },
    captcha(min = 4, max = 6, isRandomDigit = true) {// 随机获取验证码
        if (typeof max === 'boolean') {
            isRandomDigit = max;
        }

        const characters = [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
        ];

        // 如果未开启随机位数，则最小值视为验证码位数
        let range = min;
        if (isRandomDigit) {// 随机获取验证码位数
            range = Math.floor(Math.random() * (max - min + 1) + min);
        }

        let codes = [];
        for (let i = 0; i < range; i++) {
            let index = Math.floor(Math.random() * characters.length);
            codes.push(characters[index]);
        }

        return codes.join();
    },
    color() {
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += (Math.random() * 16 | 0).toString(16);
        }
        return color;

        /*let colors = ["#"];
        let characters = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
        for(let i = 0; i < 6;i++){
            let tempIndex = Math.floor(Math.random() * characters.length);
            colors.push(characters[tempIndex]);
        }
        return colors;*/
    },
    rgba(value = 255, opacity = 0.5) {
        let r = Math.ceil(Math.random() * value);
        let g = Math.ceil(Math.random() * value);
        let b = Math.ceil(Math.random() * value);
        let a = parseFloat(1 - Math.random() * opacity).toFixed(2);
        return `rgba(${r},${g},${b},${a})`;
    }
}