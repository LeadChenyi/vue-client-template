import jweixin from '@/common/lib/jweixin.js'
import Axios from 'axios'

export default {
	isWechat() {
		let ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/micromessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	},
	initJssdk(callback) {
		let url = window.location.href.split('#')[0];
		Axios({
			url,
			method: 'get',
		}).then((res) => {
			console.log(res);
			jweixin.config({
				debug: false,
				appId: res.appId,
				timestamp: res.timestamp,
				nonceStr: res.nonceStr,
				signature: res.signature,
				jsApiList: [ //这里是需要用到的接口名称  
					'checkJsApi', //判断当前客户端版本是否支持指定JS接口  
					'updateAppMessageShareData', //分享接口  
					'updateTimelineShareData', //分享朋友圈接口  
					'getLocation', //获取位置  
					'openLocation', //打开位置  
					'scanQRCode', //扫一扫接口  
					'chooseWXPay', //微信支付  
					'chooseImage', //拍照或从手机相册中选图接口  
					'previewImage', //预览图片接口  
					'uploadImage' //上传图片  
				]
			});

			if (callback) {
				callback(res.data);
			}
		}).catch((err) => {
			console.log(err);
		});
	},
	openWXShare(callback) {
		this.initJssdk(() => {
			jweixin.ready(() => {
				jweixin.updateAppMessageShareData({
					title: '活力贴', // 分享标题
					desc: '描绘生活,记录每一瞬间!', // 分享描述
					link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-u-forum/b89565f0-5fff-11eb-a16f-5b3e54966275.png', // 分享图标
					success: () => {
						if (callback) {
							callback('updateAppMessageShareData:ok');
						}
					}
				})
				jweixin.updateTimelineShareData({
					title: '活力贴', // 分享标题
					link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-u-forum/b89565f0-5fff-11eb-a16f-5b3e54966275.png', // 分享图标
					success: () => {
						if (callback) {
							callback('updateTimelineShareData:ok');
						}
					}
				})
			});
		});
	},
	openWXPay(data, callback) {
		this.initJssdk((res) => {
			jweixin.ready(() => {
				jweixin.chooseWXPay({
					timestamp: data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符  
					nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位  
					package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）  
					signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'  
					paySign: data.paysign, // 支付签名  
					success: (res) => {
						callback(res)
					},
					fail: (res) => {
						callback(res)
					}
				});
			});
		});
	}
}
