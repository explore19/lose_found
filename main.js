import Vue from 'vue'
import App from './App'
import api from 'utils/api.js'
import request from 'utils/request.js'
import global from 'utils/global.js'
import WXlogin from 'utils/WXlogin.js'


Vue.prototype.$api = api
Vue.prototype.$request = request
Vue.prototype.$global = global
Vue.prototype.$WXlogin = WXlogin


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
