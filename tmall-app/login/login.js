// 微信登陆
import request from '../api/api.js'
import urls from '../api/request.js'
import toast from '../public/toast.js'
class wxLogin {
	constructor(user, msg) {
		this.user = user
		this.msg = msg
	}
	// 调用接口登录, async返回promise
	async loGin() {
		// 拒绝登录
		if (this.msg != 'getUserInfo:ok') {
			throw ('拒绝登录')
		}
		// 获取code
		let userdata = await this.wxlogin()
		try {
			let user = await new request(urls.m().wxlogin, userdata).modepost()
			if (user.msg === 'SUCCESS') {
				uni.setStorageSync('wxuser', user.data) // 存储用户信息到本地缓存
				// new toast('登录成功').showtoast()
				uni.showToast({
					title: '登陆成功',
					icon: 'success'
				})
				return('SUCCESS')
			}
		} catch (e) {
			//TODO handle the exception
			return e
		}
	}
	// 获取code
	wxlogin() {
		let {
			nickName,
			avatarUrl
		} = this.user
		return new Promise((resolve, reject) => {
			wx.login({
				success: (res) => {
					let data = {
						appid: 'wxc7bcec29a94b0480',
						secret: 'a10d35de97fc1d6d95828cdda16db238',
						nickName,
						avatarUrl,
						code: res.code
					}
					resolve(data)
				},
				fail: (err) => {
					reject(err)
				}
			})
		})
	}
}

export default wxLogin
