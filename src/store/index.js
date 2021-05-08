import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const files = require.context('./modules', true, /\.js$/)
const modules = files.keys().reduce((total, item) => {
    let keyName = item.replace(/^\.\/(.*)\.\w+$/, '$1')
    total[keyName] = files(item).default
    return total
}, {})

const store = new Vuex.Store({
    modules
})

export default store;