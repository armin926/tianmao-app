// 请求地址
const url = 'https://meituan.thexxdd.cn/api'

const urls = class {
	// 构造方法
	constructor() {

	}
	// 静态方法: 直接使用类调用，不是静态方法需要实例化类，也就是new
	static m() {
		// 首页轮播图
		let getBanner = `${url}/getbanner`

		return {
			getBanner
		}
	}
}

export default urls
