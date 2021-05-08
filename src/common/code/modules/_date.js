export default {
	formatDate(timestamp, format = '{y}-{m}-{d} {h}:{i}:{s}', regexp = /{(y|m|d|h|i|s)+}/g) {
		if (typeof timestamp != 'string' && typeof timestamp != 'number') {
			throw new Error('时间戳类型不正确');
		}

		if (typeof timestamp === 'string') {
			if (timestamp.length == 10) {
				timestamp *= 1000;
			}

			timestamp = parseInt(timestamp);
		} else if (typeof timestamp === 'number') {
			if (timestamp.toString().length == 10) {
				timestamp *= 1000;
			}
		}

		const date = new Date(timestamp);
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

		return result
	},
	newestDate(timestamp) {
		if (typeof timestamp != 'string' && typeof timestamp != 'number') {
			throw new Error('时间戳类型不正确');
		}

		if (typeof timestamp === 'string') {
			if (timestamp.length == 10) {
				timestamp *= 1000;
			}

			timestamp = parseInt(timestamp);
		} else if (typeof timestamp === 'number') {
			if (timestamp.toString().length == 10) {
				timestamp *= 1000;
			}
		}

		const currentStamp = new Date().getTime();

		// 以秒为单位的时间差 = (当前时间 - 创建时间) / 1000
		let differ = (currentStamp - timestamp) / 1000;

		let result = "";
		if (differ < (60 * 60)) {
			result = Math.ceil(differ / 60);
			result = `${result}分钟前`;
		} else if (differ < (24 * 3600)) {
			result = Math.ceil(differ / 3600);
			result = `${result}小时前`;
		} else if (differ < (4 * 86400)) {
			result = Math.ceil(differ / 86400);
			if (result == 1) {
				result = "昨天";
			} else if (result == 2) {
				result = "前天";
			} else {
				result = `${result}天前`;
			}
		} else {
			let userYear = new Date(timestamp).getFullYear();
			let thisYear = new Date().getFullYear();

			if (userYear == thisYear) {
				result = this.formatDate(timestamp, '{m}-{d} {h}:{i}', /{(m|d|h|i)+}/g);
			} else {
				result = this.formatDate(timestamp, '{y}-{m}-{d} {h}:{i}', /{(y|m|d|h|i)+}/g);
			}
		}

		return result;
	},
	getAVDuration(seconds, distribute = true) {//获取影音时长
		let h, m, s = null;
		let self = this;
		if (distribute) {//按小时
			h = self.timeMend(parseInt(seconds / 3600));
			m = self.timeMend(parseInt(seconds / 60 % 60));
			s = self.timeMend(parseInt(seconds % 60));
			return h + ":" + m + ":" + s;
		} else {//按分钟
			m = self.timeMend(parseInt(seconds / 60));
			s = self.timeMend(parseInt(seconds % 60));
			return m + ":" + s;
		}
	},
	countDown(objEle, objDate, callBack) {//个性化倒计时
		let objTime = objDate.getTime();
		let self = this;
		objEle.timer = setInterval(function () {
			let curDate = new Date();
			let curTime = curDate.getTime();
			let restTime = objTime - curTime;                               //剩余时间 = 将来时间 - 现在时间
			let seconds = parseInt(restTime / 1000);                        //将毫秒转换成秒来计算
			let day = self.timeMend(parseInt(seconds / 3600 / 24));         //一小时3600秒，除一天24小时
			let h = self.timeMend(parseInt(seconds / 3600 % 24));           //一小时3600秒, 余24小时等于剩余小时数
			let m = self.timeMend(parseInt(seconds / 60 % 60));             //一分钟60秒，余60分钟等于剩余分钟数
			let s = self.timeMend(parseInt(seconds % 60));                  //60秒为1分钟，余一分钟等于剩余秒数
			if (restTime <= 0) {
				objEle.innerText = "活动开始啦!";
				clearInterval(objEle.timer);
			} else {
				if (callBack) {
					callBack(day, h, m, s);
				} else {
					objEle.innerText = "剩余" + day + "天" + h + "小时" + m + "分" + s + "秒";
				}
			}
		}, 1000);
	},
	getDateTime(obj, callBack) {//个性化获取日期时间
		let self = this;
		let year = obj.getFullYear();
		let month = self.timeMend(obj.getMonth() + 1);
		let date = self.timeMend(obj.getDate());
		let h = self.timeMend(obj.getHours());
		let m = self.timeMend(obj.getMinutes());

		if (callBack) {
			callBack(year, month, date, h, m);
		} else {
			return year + "年" + month + "月" + date + "日 " + h + ":" + m;
		}
	},
	toDateTime(obj, formatStr) {//格式化转换日期时间
		let self = this;
		let Week = ['日', '一', '二', '三', '四', '五', '六'];
		formatStr = formatStr.replace(/W/, Week[obj.getDay()]);
		formatStr = formatStr.replace(/YYYY/, obj.getFullYear());
		formatStr = formatStr.replace(/MM/, self.timeMend(obj.getMonth() + 1));
		formatStr = formatStr.replace(/DD/, self.timeMend(obj.getDate()));
		formatStr = formatStr.replace(/h/, self.timeMend(obj.getHours()));
		formatStr = formatStr.replace(/m/, self.timeMend(obj.getMinutes()));
		formatStr = formatStr.replace(/s/, self.timeMend(obj.getSeconds()));
		return formatStr;
	}
}