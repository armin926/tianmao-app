<template>
	<view class="list-top">
		<view class="list-text">
			<text></text>
			<text>天猫榜单</text>
			<text>闭着眼睛跟榜买</text>
		</view>
		<view class="list-view">
			<block v-for="(item,index) in billData" :key="index">
				<view class="menb">
					<image :src="item.image" mode="aspectFill" />
					<text>{{item.title}}</text>
					<text>{{item.want}}人想要</text>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			billData: {
				type: Array,
				default: () => []
			}
		}
	}
</script>

<style scoped>
	.list-top {
		margin: 20upx 10upx;
	}

	.list-text {
		height: 70rpx;
		display: flex;
		align-items: center;
	}

	.list-text text:nth-child(1) {
		background: #2C405A;
		height: 35upx;
		width: 10upx;
	}

	.list-text text:nth-child(2) {
		font-size: 30upx;
		font-weight: bold;
		padding-left: 5upx;
	}

	.list-text text:nth-child(3) {
		font-size: 24upx;
		color: #999999;
		padding-left: 10upx;
	}

	.list-view {
		height: 400rpx;
		background: #FFFFFF;
		border-radius: 9rpx;
		display: flex;
		flex-wrap: wrap;
	}

	.menb text:nth-child(2) {
		font-size: 28rpx;
	}

	.menb text:nth-child(3) {
		font-size: 20rpx;
		color: #fe0024;
	}

	.menb image {
		width: 80rpx;
		height: 100rpx !important;
		padding-bottom: 4rpx;
	}

	.menb {
		width: 33.333%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-bottom: 2rpx;
		box-sizing: border-box;
	}

	.list-view view:nth-child(-n+3) {
		border-bottom: 1rpx solid #F1F1F1;
	}

	.list-view view:nth-child(2) {
		border-left: 1rpx solid #F1F1F1;
		border-right: 1rpx solid #F1F1F1;
	}

	.list-view view:nth-child(5) {
		border-left: 1rpx solid #F1F1F1;
		border-right: 1rpx solid #F1F1F1;
	}
</style>
