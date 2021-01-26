<template>
	<view>
		<view class="payment-view">
			<!-- 收货地址 -->
			<view class="payment-name" @click="shAddress()">
				<view class="payment-left-img">
					<image src="/static/loading/address-shouhuo.svg" mode="widthFix"></image>
				</view>
				<view class="payment-add" v-if="nameadd">
					<text>{{address.name}}</text>
					<text>{{address.mobile}}</text>
					<text>{{address.city}} {{address.address}}</text>
				</view>
				<view class="payment-add" v-if="!nameadd">请选择收货地址</view>
				<view class="payment-right-img">
					<image src="/static/loading/shouhuo-jiantou.svg" mode="widthFix"></image>
				</view>
			</view>
			<!-- 商品详情 -->
			<view class="payment-commodity">
				<block v-for="(item,index) in comminfo" :key='index'>
					<view class="payment-order">
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
							<view>
								共{{item.many}}件 小计: ￥ {{item.total_price}}
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		<!-- 底部提交订单 -->
		<view class="place-order">
			<text>合计: ￥ {{Totalprice}}</text>
			<text @click="placeOrder()">提交订单</text>
		</view>
	</view>
</template>

<script>
	// 价格补零
	const Price = require('e-commerce_price')
	export default {
		data() {
			return {
				// 上个页面接收的商品数据
				comminfo: [],
				Totalprice: 0,
				// 收货地址数据
				address: {},
				// 存储购物车的商品id
				idcard: []
			}
		},
		onLoad(e) {
			this.comminfo = JSON.parse(e.cartdata)
			// 合计支付总价计算
			let numdata = 0
			JSON.parse(e.cartdata).forEach(item => {
				numdata += item.total_price
			})
			console.log(Price(numdata))
			this.Totalprice = Price(numdata)
		},
		// 接收vuex的收货地址数据
		watch: {
			"$store.state.addordr"(newVal, oldVal) {
				this.address = newVal
			}
		},
		computed: {
			// 是否有收货地址
			nameadd() {
				return JSON.stringify(this.address) === '{}' ? false : true
			}
		},
		methods: {
			// 选择收货地址
			shAddress() {
				uni.navigateTo({
					url: '../../my-address/my-address'
				})
			},
			// 提交订单
			async placeOrder() {
				//  商品数据
				let codata = this.comminfo.map(item => {
					let data = {
						id: item.id,
						image: item.image,
						title: item.title,
						size: item.size,
						color: item.color,
						price: item.price,
						many: item.many
					}
					return data
				})
				let dataObj = {
					consignee: this.address,
					commodity: codata,
					total_price: this.Totalprice,
					idcard: this.idcard
				}
				// 请求统一下单接口
				try {
					let paydata = await new this.Request(this.Urls.m().wxpay, dataObj).modepost()
					console.log(paydata)
					if (paydata.msg === "SUCCESS") {

					} else {
						// 如果出现throw关键词就会进入catch里面
						throw paydata.msg
					}
				} catch (e) {
					//TODO handle the exception
					uni.showToast({
						title: e,
						icon: 'none'
					})
					throw e //遇到 throw 关键词 下面的代码就不会再执行
				}
			}
		}
	}
</script>

<style>
	page {
		background-color: #f2f2f2;
	}

	.payment-view {
		margin: 15upx;
	}

	.payment-name {
		height: 150upx;
		background-color: #FFFFFF;
		border-radius: 15upx;
		font-size: 28upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 10upx;
	}

	.payment-left-img {
		width: 60upx;
		height: 60upx;
	}

	.payment-left-img image {
		width: 60upx;
		height: 60upx;
	}

	.payment-add text {
		display: block;
	}

	.payment-add text:nth-child(2) {
		padding: 4rpx 0;
	}

	.payment-add {
		flex: 1;
		padding-left: 20rpx;
	}

	.payment-right-img {
		width: 40upx;
		height: 40upx;
	}

	.payment-right-img image {
		width: 40upx;
		height: 40upx;
	}

	/* 下单商品 */
	.payment-commodity {
		background-color: #FFFFFF;
		border-radius: 15upx;
		font-size: 28upx;
		padding: 10rpx;
		margin: 15upx 0;
	}

	.payment-order {
		display: flex;
		justify-content: space-between;
		height: 200upx;
		/* background: #4CD964; */
		margin-bottom: 20rpx;
	}

	.payment-order text {
		display: block;
	}

	.payment-order-img {
		width: 200upx;
		height: 200upx;
		border-radius: 8upx;
		padding-right: 10upx;
	}

	.payment-order-img image {
		width: 200upx;
		height: 200upx;
		border-radius: 8upx;
	}

	.payment-title {
		flex: 1;
	}

	.payment-title text:nth-child(1) {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.payment-title text:nth-child(2) {
		background-color: rgb(250, 250, 250);
		padding: 5upx;
		border-radius: 7upx;
	}

	.payment-price {
		text-align: right;
	}

	.payment-flex {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.text-you {
		color: rgb(156, 156, 156);
		margin-top: 8upx;
	}

	/* 提交 */
	.place-order {
		height: 90upx;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.place-order text:nth-child(2) {
		background-color: rgb(255, 0, 54);
		height: 90upx;
		width: 270upx;
		color: #FFFFFF;
		text-align: center;
		line-height: 90upx;
		margin-left: 30upx;
	}
</style>
