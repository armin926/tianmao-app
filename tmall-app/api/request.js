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
		// 商品评价
		let wxcommnt = `${url}/wxcommnt`
		// 评论分类标签
		let comtag = `${url}/comtag`
		// 用户评论内容
		let comtconent = `${url}/comtconent`
		// 收藏和取消收藏
		let enshrine = `${url}/enshrine`
		// 登录
		let wxlogin = `${url}/wxlogin`
		// 获取单个商品是否收藏
		let collection = `${url}/collection`
		// 购物车数据
		let mycart = `${url}/mycart`
		// 商品sku
		let wxsku = `${url}/wxsku`
		// 获取每个sku的库存，价格
		let querysku = `${url}/querysku`
		// 加入购物车
		let atcart = `${url}/atcart`
		// 校验登录
		let tokening = `${url}/tokening`
		// 获取收货地址
		let gainadd = `${url}/gainadd`
		// 新增收货地址
		let sudeadd = `${url}/sudeadd`
		// 修改收货地址
		let modifyadd = `${url}/modifyadd`
		// 删除收货地址
		let deleadd = `${url}/deleadd`
		// 微信支付： 统一下单
		let wxpay = `${url}/fictpay`
		// 待付款
		let tobepaid = `${url}/tobepaid`
		// 订单详情{待付款，待发货，待收货}
		let tobedetail = `${url}/tobedetail`
		// 删除订单
		let deleorder = `${url}/deleorder`
		// 待发货
		let tbdelivered = `${url}/tbdelivered`
		// 待收货
		let gtbreceived = `${url}/gtbreceived`
		// 确认收货
		let conreceipt = `${url}/conreceipt`
		// 待评价
		let tbevaluated = `${url}/tbevaluated`
		// 待评价详情
		let dtpepage = `${url}/dtpepage`
		// 提交评论
		let subcomm = `${url}/subcomm`
		return {
			getBanner,
			getRecommurl,
			getBillboardurl,
			getCommodcradurl,
			getSearchurl,
			getIntroduceurl,
			parameterurl,
			wxcommnt,
			comtag,
			comtconent,
			enshrine,
			wxlogin,
			collection,
			mycart,
			wxsku,
			querysku,
			atcart,
			tokening,
			gainadd,
			sudeadd,
			modifyadd,
			deleadd,
			wxpay,
			tobepaid,
			tobedetail,
			deleorder,
			tbdelivered,
			gtbreceived,
			conreceipt,
			tbevaluated,
			dtpepage,
			subcomm
		}
	}
}

export default urls
