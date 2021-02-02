// 请求方式
import request from '../api/api.js'
// 请求地址
import urls from '../api/request.js'
// 待付款
class Payment{
	constructor(payment) {
	    this.payment = payment
	}
	
	async paySucc(){
		try{
			await this.wxPay()
		}catch(e){
			throw e
		}
		// 查询支付状态
		try{
			let querydata = await new request(urls.m().queryorder,{id:this.payment._id,outno:this.payment.out_trade_no}).modepost()
			return querydata
		}catch(e){
			throw '支付失败'
		}
	}
	
	// 调用支付
	wxPay(){
		return new Promise((resolve,reject)=>{
			wx.requestPayment({
				timeStamp:this.payment.timeStamp,
				nonceStr:this.payment.nonceStr,
				package:this.payment.package,
				signType:this.payment.signType,
				paySign:this.payment.paySign,
				success:res=> {
					resolve(res)
				},
				fail:Error=> {
					reject(Error)
				}
			})
		})
	}
}

module.exports = {Payment}