export default {
    directName: 'authorize',
    inserted(el, binding) {// 被绑定元素插入父节点时调用
        directCallBack(el, binding);
    },
    update(el, binding) {// 被绑定于元素所在的模板更新时调用
        directCallBack(el, binding);
    }
}

function directCallBack(el, binding) {
    const { value } = binding;
    if (typeof value === 'boolean') {
        const token = localStorage.getItem('token') ? true : false;
        console.log(token != value)
        if (token != value) {
            el.parentNode && el.parentNode.removeChild(el);
        }
    } else {
        throw new Error(`need setting v-authorize="[Boolean]"`)
    }
}