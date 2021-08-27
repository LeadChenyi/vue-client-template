const check = (rules,forms = [],mode = true) => {
	let flag = true;
	let field = null;		// 存储正在进行验证的字段
	let peelFields = [];	// 存储已剥离的全部字段
	let failFields = [];	// 存储非严格模式下的错误字段
		
	if(typeof forms == 'boolean'){
		mode = forms;
	}else if(forms.length){
		// 换取forms表单中的值
		rules = rules.forEach((item,index)=>{
			item['value'] = forms[item.name]
		});
	}
	
	
	// 开始剥离单字段多规则模式
	rules.forEach((item,index)=>{
		if(item.expands && item.expands.length){
			item.expands.forEach((childItem,childIndex)=>{
				peelFields.push({
					value:item.value,
					...childItem,
					index,
					order:childIndex
				});
			})
		}else{
			peelFields.push({
				...item,
				index
			});
		}
	});
	
	for(let i = 0;i < peelFields.length;i++){
		field = peelFields[i];
		
		// 不是必须验证的字段，当字段值为空时可直接跳过本次循环，继续下一个迭代
		if(field.require == false && field.value.length == 0){
			continue;
		}
		
		switch(field.rule){
			case 'eq' :
				if(field.value != field.eq){
					flag = false;
				}
			break;
			case 'neq' :
				if(field.value == field.neq){
					flag = false;
				}
			break;
			case 'in' :
				if(!field.in.includes(field.value)){
					flag = false;
				}
            break;
			case 'nin' :
				if(field.nin.includes(field.value)){
					flag = false;
				}
            break;
			case 'gt' :
				if(field.value <= field.gt){// 求：是否大于，则如果小于等于就抛出
					flag = false;
				}
            break;
			case 'lt' :
				if(field.value >= field.lt){
					flag = false;
				}
            break;
			case 'gte' :
				if(field.value < field.gte){
					flag = false;
				}
            break;
			case 'lte' :
				if(field.value > field.lte){
					flag = false;
				}
            break;
			case 'empty' :
				if(field.value.length == 0){
					flag = false;
				}
            break;
            case 'minLength' :
				if(field.value.length < field.minLength){
					flag = false;
				}
            break;   
            case 'maxLength' :
				if(field.value.length > field.maxLength){
					flag = false;
				}
            break;
            case 'range' :
				if(field.value.length < field.range[0] || field.value.length > field.range[1]){
					flag = false;
				}
            break;
			case 'username' :
				if(!/^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test(field.value)){
					flag = false;
				}
			break;
			case 'chinese' :
				if(!/[\u4e00-\u9fa5]/.test(field.value)){
					flag = false;
				}
			break;
			case 'english' :
				if(!/[a-zA-Z]/.test(field.value)){
					flag = false;
				}
			break;
            case 'mobile' :
				if(!/^(1[3-9])\d{9}$/.test(field.value)){
					flag = false;
				}
            break;
            case 'mobilePhone' :
				if(!/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(field.value)){
					flag = false;
				}
            break;    
            case 'telephone' :
				if(!/\d{3}-\d{8}|\d{4}-\d{7}/.test(field.value)){
					flag = false;
				}
			break;
            case 'identity' :
				if(!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(field.value)){
					flag = false;
				}
			break;       
			case 'ip' :
				if(!/((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/.test(field.value)){
					flag = false;
				}
			break;    
			case 'url' :
				if(!/^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i.test(field.value)){
					flag = false;
				}
			break;
			case 'email' :
				if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(field.value)){
					flag = false;
				}
			break;
			case 'domain' :
				if(!/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/.test(field.value)){
					flag = false;
				}
			break;
			case 'pattern' :
				if(!field.pattern.test(field.value)){
					flag = false;
				}
			break;
		}
		
		// 严格模式下只要有不合格直接跳出循环
		if(mode && !flag){
			break;
		}else if(!mode && !flag){
			failFields.push(field);
			flag = true;
		}
	}
	
	if(mode){
		return flag ? {
			code:0,
			msg:"表单验证全部通过"
		} : {
			code:1,
			msg:field.message
		};
	}else{
		return failFields.length == 0 ? {
			code:0,
			msg:"表单验证全部通过",
			data:failFields
		} : {
			code:1,
			msg:`表单验证含有${failFields.length}个错误项`,
			data:failFields
		};
	}
}


module.exports = {
	check,
	isMobileTerminal(){// 移动终端
		return /iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(window.navigator.userAgent.toLowerCase());
	},
	isAppleSystem(){// 苹果系统
		return /iphone|ipod|ipad|Macintosh/i.test(window.navigator.userAgent.toLowerCase());
	},
	isAndroidSystem(){// 安装系统
		return /android/i.test(window.navigator.userAgent.toLowerCase());
	},
	isWechatKernel(){// 微信内核
		return /micromessenger/i.test(window.navigator.userAgent.toLowerCase());
	},
	isMobileOrMiniClient(limitWidth = 1024){// 移动端或PC端小窗体
		if (
			navigator.userAgent.match(
				/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
			)
		) {
			return true;
		}
		
		let clientWidth = document.body.clientWidth || document.documentElement.clientWidth
		if(clientWidth <= limitWidth){
			return true;
		}
		
		return false
	},
	isMobile(value){// 手机号码字段值验证
		return /^(1[3-9])\d{9}$/.test(value);
	}
};