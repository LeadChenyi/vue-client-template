/**
 * 自定义表单验证方法常见问题：
 * 1、在el-form-item元素上定义prop
 * 2、在el-form-item元素上绑定规则时，自定义验证方法需要在methods中定义（不能在data对象方法中定义）
 * 3、当el-form-item元素的使用自定义验证器时required=false仅作为展示，需要在验证器中允许该字段为空，否则依然无法通过验证。
 */
export default {
    isNumber(rule, value, callback) {
        let label = rule.label || '';
        let pattern = /^[1-9][0-9]*$/;
        if (value == "") {
            callback(new Error(`${label}不得为空`));
        } else if (value == 0) {
            callback(new Error(`${label}不得为0`));
        } else if (!pattern.test(value)) {
            callback(new Error(`${label}只能为正整数`));
        } else {
            callback();
        }
    },
    isMoney(rule, value, callback) {
        let label = rule.label || '';
        if (value == "") {
            callback(new Error(`${label}不得为空`));
        } else if (value == 0) {
            callback(new Error(`${label}不得为0`));
        } else if (!/^\d+(\.\d{1,2})?$/.test(value)) {
            callback(new Error(`${label}只能保留两位小数`));
        } else {
            callback();
        }
    },
    isEmptyNumber(rule, value, callback) {
        let label = rule.label || '';
        let pattern = /^[1-9][0-9]*$/;
        if (value == "") {
            callback();
        } else if (value == 0) {
            callback(new Error(`${label}不得为0`));
        } else if (!pattern.test(value)) {
            callback(new Error(`${label}只能为正整数`));
        } else {
            callback();
        }
    },
    isEmptyMoney(rule, value, callback) {
        let label = rule.label || '';
        if (value == "") {
            callback();
        } else if (value == 0) {
            callback(new Error(`${label}不得为0`));
        } else if (!/^\d+(\.\d{1,2})?$/.test(value)) {
            callback(new Error(`${label}只能保留两位小数`));
        } else {
            callback();
        }
    },
    isUsername(rule, value, callback) {
        let label = rule.label || '';
        let minLimit = rule.minLimit || 3;
        if (!value.length) {
            callback(new Error(`请输入${label}`));
        } else if (value.length < minLimit) {
            callback(new Error(`${label}不得小于${minLimit}位字符`));
        } else {
            callback();
        }
    },
    isPassword(rule, value, callback) {
        let label = rule.label || '';
        let minLimit = rule.minLimit || 6;
        if (!value.length) {
            callback(new Error(`请输入${label}`));
        } else if (value.length < minLimit) {
            callback(new Error(`${label}不得小于${minLimit}位字符`));
        } else {
            callback();
        }
    }
}