import Vue from 'vue'
import App from './App'

// 请求方法
import urls from './api/request.js'
import request from './api/api.js'

Vue.prototype.Request = request
Vue.prototype.Urls = urls
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
