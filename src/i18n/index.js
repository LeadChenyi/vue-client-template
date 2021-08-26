import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: 'zh',
    messages: {
        'zh': require('@/i18n/locales/zh'),
        'en': require('@/i18n/locales/en')
    }
})

export default i18n;