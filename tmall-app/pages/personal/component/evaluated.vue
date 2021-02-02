<template>
	<view class="payment-view">
		<!-- 商品详情 -->
		<block v-for="(item,index) in tobepaid" :key='index'>
		<view class="payment-commodity">
			<text class="order-tips">交易完成</text>
			<view class="payment-order" @click="payDeatil(item._id)">
				<view class="payment-order-img">
					<image :src="item.image" mode="aspectFill"></image>
				</view>
				<view class="payment-title">
					<text>{{item.title}}</text>
					<text class="text-you">颜色:{{item.color}};尺码:{{item.size}}</text>
				</view>
				<view class="payment-flex">
					<view class="payment-price">
						<text>￥ {{item.price}}</text>
						<text class="text-you">x{{item.many}}</text>
					</view>
				</view>
			</view>
			<!-- 价格 -->
			<view class="presonal-Price">实付款￥{{paserFloat((item.price * item.many).toFixed(10))}}</view>
			<!-- 去评价 -->
			<view class="presonal-payment">
				<text @click="conRece(item._id,item.id,item.size,item.color)">去评价</text>
			</view>
		</view>
		</block>
		<!-- 登录界面 -->
		<loginpage ref="loginmen"></loginpage>
		<!-- 没有相关订单 -->
		<ordering ref="orderload"></ordering>
	</view>
</template>

<script>
import '../../../style/order.css'
export default{
	data() {
		return {
			tobepaid:[]
		}
	},
	methods:{
		async Tobepaid(){
			try{
				let data = await new this.Request(this.Urls.m().tbevaluated).modeget()
				if(data.msg.errcode){
					this.$refs.loginmen.showing()
				}else if(data.msg == 'SUCCESS'){
					if(data.data.length == 0){
						this.tobepaid = data.data
						this.$refs.orderload.init()
					}else{
						console.log(data)
						this.tobepaid = data.data
					}
				}
			}catch(e){
				console.log(e)
			}
		},
		// 订单详情
		payDeatil(id){
			console.log(id)
			let tip = {tips:'交易完成',sum:'实付款',show:true,text:'去评价',id:id,evt:'002'}
			let value = JSON.stringify(tip)
			wx.navigateTo({//?value=' + value
				url:'../order-details/order?value=' + value
			})
		},
		// 去评价_id：商品id
		async conRece(_id,id,size,color){
			console.log(_id + id + size + color)
			let data = JSON.stringify({_id,id,size,color})
			wx.navigateTo({
				url:'../order-details/pu-coments?data=' + data
			})
		}
	},
	created() {
		this.Tobepaid()
	},
	mounted() {
		this.$bus.$on('mycart', res=> {
			if(res.cart == 'SUCCESS'){
				this.Tobepaid()
			}
		})
	},
}
</script>

<style scoped>
</style>
