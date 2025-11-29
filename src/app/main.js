import Vue from 'vue'
import VeeValidate from 'vee-validate'
import 'bulma'
import { createPinia, PiniaVuePlugin } from 'pinia'

import App from './App.vue'
import { useCardTemplateStore } from './state/index'

// 使用Pinia Vue插件
Vue.use(PiniaVuePlugin)
const pinia = createPinia()

import 'core/ui'

// config
Vue.config.productionTip = false

// plugins
Vue.use(VeeValidate)

// application
const app = new Vue({
  pinia,
  render: h => h(App)
}).$mount('#app')

// debugging
if (process.env.NODE_ENV === 'development') {
  window.app = app
  window.cardTemplateStore = useCardTemplateStore(pinia)
}
