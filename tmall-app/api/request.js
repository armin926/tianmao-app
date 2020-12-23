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
		// 推荐抢购商品
		let getRecommurl = `${url}/recom`
		// 天猫榜单
		let getBillboardurl = `${url}/billboard`
		// 卡片流
		let getCommodcradurl = `${url}/commodcrad`
		// 商品搜索
		let getSearchurl = `${url}/search`
		// 商品详情页{商品介绍
		let getIntroduceurl = `${url}/introduce`
		// 产品参数
		let parameterurl = `${url}/parameter`
		return {
			getBanner,
			getRecommurl,
			getBillboardurl,
			getCommodcradurl,
			getSearchurl,
			getIntroduceurl,
			parameterurl
		}
	}
}

export default urls
