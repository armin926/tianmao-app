// request请求
let  Base64 = require('./base64.js').Base64
const request = class {
	constructor(url, arg) {
		this.url = url
		this.arg = arg
	}
	// POST
	modepost() {
		return new Promise((resolve, reject) => {
			uni.request({
				url: this.url,
				method: 'POST',
				data: this.arg,
				header:{Authorization:this.baseFun()}
			}).then(res => {
				resolve(res[1].data)
			}).catch(err => {
				reject(err)
			})
		})
	}
	// GET
	modeget() {
		return new Promise((resolve, reject) => {
			uni.request({
				url: this.url,
				header:{Authorization:this.baseFun()}
			}).then(res => {
				resolve(res[1].data)
			}).catch(err => {
				reject(err)
			})
		})
	}
	// 加密token
	baseFun(){
		const token = uni.getStorageSync('wxuser').token
		const base64 = Base64.encode(token+':')
		return 'Basic ' + base64
	}
}

export default request
