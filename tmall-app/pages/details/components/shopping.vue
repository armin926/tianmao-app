<template>
	<view>
		<view class="shopping-view">
			<view class="shopping-text">
				<image src="/static/details/fenxiang.svg" mode="widthFix" />
				<text>分享</text>
			</view>
			<view class="shopping-text middle">
				<image src="/static/details/gouwuche.svg" mode="widthFix" />
				<text>购物车</text>
				<text>{{cartnum}}</text>
			</view>
			<!-- 未收藏 -->
			<view class="shopping-text" @click="collEct(1,goodid)" v-if="collects === 0">
				<image src="/static/details/shoucang.svg" mode="widthFix" />
				<text>收藏</text>
			</view>
			<!-- 已收藏 -->
			<view class="shopping-text" @click="collEct(0,goodid)" v-if="collects === 1">
				<image src="/static/details/yishoucang.svg" mode="widthFix" />
				<text>已收藏</text>
			</view>
			<view class="join join-right">加入购物车</view>
			<view class="join join-left">立即购买</view>
		</view>
		<!-- 登录弹窗 -->
		<showmodal ref="show"></showmodal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				collects: 0
			}
		},
		props: {
			goodid: {
				type: String,
				default: () => ''
			}
		},
		methods: {
			// 收藏和取消收藏 401:没权限
			async collEct(num, id) {
				let data = {
					num,
					id
				}
				try {
					let enshrine = await new this.Request(this.Urls.m().enshrine, data).modepost()
					let {
						errcode
					} = enshrine.msg
					if (errcode == '401') {
						this.$refs.show.showing()
					} else {
						
					}
				} catch (e) {
					console.log(e)
				}
			}
		}
	}
</script>

<style scoped>
	.shopping-view image {
		width: 35rpx;
		height: 35rpx;
	}

	.shopping-view {
		font-size: 30upx;
		background: #FFFFFF;
		border-top: 1rpx solid #cccccc;
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	.join {
		flex: 2;
		text-align: center;
		height: 80upx;
		line-height: 80upx;
		color: white;
	}

	.shopping-text {
		height: 100upx;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.shopping-text text {
		font-size: 23upx;
		padding-top: 5upx;
		color: #666666;
	}

	.join-right {
		background: linear-gradient(to right, #ffc800 10%, #ff9602 80%);
		border-top-left-radius: 50upx;
		border-bottom-left-radius: 50upx;
	}

	.join-left {
		background: linear-gradient(to right, #ff7500 10%, #ff4b00 80%);
		border-top-right-radius: 50upx;
		border-bottom-right-radius: 50upx;
		margin-right: 10upx;
	}

	.middle {
		border-left: 1rpx solid #f4f4f4;
		border-right: 1rpx solid #f4f4f4;
		position: relative;
	}

	.middle text:nth-child(3) {
		font-size: 16upx;
		background: #fe0036;
		color: #FFFFFF;
		border-radius: 50%;
		width: 30upx;
		height: 30upx;
		padding: 0 !important;
		text-align: center;
		line-height: 30upx;
		position: absolute;
		top: 10upx;
		right: 10upx;
	}
</style>
