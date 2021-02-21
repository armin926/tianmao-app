<template>
	<view class="payment-view">
		<!-- 商品详情 -->
		<block v-for="(item,index) in tobepaid" :key='index'>
			<view class="payment-commodity">
				<text class="order-tips">买家已付款</text>
				<block v-for="(iteming, indexs) in item.order" :key='indexs'>
					<view class="payment-order" @click="payDeatil(item._id)">
						<view class="payment-order-img">
							<image :src="iteming.image" mode="aspectFill"></image>
						</view>
						<view class="payment-title">
							<text>{{iteming.title}}</text>
							<text class="text-you">颜色:{{iteming.color}};尺码:{{iteming.size}}</text>
						</view>
						<view class="payment-flex">
							<view class="payment-price">
								<text>￥ {{iteming.price}}</text>
								<text class="text-you">x{{iteming.many}}</text>
							</view>
						</view>
					</view>
				</block>
				<!-- 价格 -->
				<view class="presonal-Price">实付款￥{{item.total_price}}</view>
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
	export default {
		data() {
			return {
				tobepaid: []
			}
		},
		methods: {
			async Tobepaid() {
				try {
					let data = await new this.Request(this.Urls.m().tbdelivered).modeget()
					if (data.msg.errcode) {
						this.$refs.loginmen.showing()
					} else if (data.msg == 'SUCCESS') {
						if (data.data.length == 0) {
							this.tobepaid = data.data
							this.$refs.orderload.init()
						} else {
							this.tobepaid = data.data
						}
					}
				} catch (e) {
					console.log(e)
				}
			},
			// 订单详情
			payDeatil(id) {
				let tip = {
					tips: '买家已付款',
					sum: '实付款',
					show: false,
					text: '付款',
					id: id
				}
				let value = JSON.stringify(tip)
				wx.navigateTo({
					url: '../order-details/order?value=' + value
				})
			}
		},
		created() {
			this.Tobepaid()
		},
		mounted() {
			this.$bus.$on('mycart', res => {
				if (res.cart == 'SUCCESS') {
					this.Tobepaid()
				}
			})
		},
	}
</script>

<style scoped>
</style>
