import Vue from 'vue'
import App from './App'

// bus 传值
import bus from './public/bus.js'
Vue.prototype.$bus = bus

// 请求方法
import urls from './api/request.js'
import request from './api/api.js'
// 引入全局组件
import Commodity from './pages/components/commodity.vue'
import loadingMen from './pages/components/loading-men.vue'

// 提示框样式
import './style/style.css'
// 动画样式
import './pattern/animat.css'
// 产品参数
import './pattern/styles.css'

Vue.prototype.Request = request
Vue.prototype.Urls = urls
Vue.config.productionTip = false
Vue.component('Commodity',Commodity)
Vue.component('loader-on',loadingMen)

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
