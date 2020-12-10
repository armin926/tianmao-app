<template>
	<view>
		<view class="search-cont">
			<view class="search">
				<input type="text" placeholder-class="inputclass" confirm-type="search" focus="true" placeholder="请输入关键字" v-model="searchData"
				 @confirm="onKeyInput" />
			</view>
			<view class="search-code" @click="seArch()">搜索</view>
		</view>
		<!-- 搜索历史 -->
		<view class="search-history">
			<view class="search-title">
				<view>最近搜索</view>
				<view>
					<image src="/static/search/searchend.svg" mode="widthFix"></image>
				</view>
			</view>
			<!-- tab -->
			<view class="menu-block">

				<view></view>

			</view>
		</view>
		<!-- 展示内容 -->
		<Commodity></Commodity>
		<!-- 上拉加载 -->
		<loader-on ref="loadon"></loader-on>
		<!-- 没有搜索结果 -->
		<!-- 		<view class="empty-cart" >
			<image src="/static/search/sousuono.svg" mode="widthFix"></image>
			<text>抱歉！暂无相关商品</text>
		</view> -->
	</view>
</template>

<script>
	var {
		log
	} = console
	export default {
		data() {
			return {
				searchData: ''
			}
		},
		methods: {
			// 点击按钮触发搜索
			seArch() {
				log(this.searchData)
			},
			// 键盘上搜索或回车键触发
			onKeyInput(e){
				log(e)
				let searchKey = e.detail.value
			}
		}
	}
</script>

<style scoped>
	.search {
		height: 70upx;
		line-height: 70upx;
		width: 100%;
		display: flex;
		flex-direction: row;
		background: #FFFFFF;
		border-radius: 20upx;
		margin-left: 20upx;
	}

	.search input {
		height: 70upx;
		line-height: 70upx;
		width: 100%;
		font-size: 30upx;
		color: #666666;
		padding-left: 30upx;
	}

	.search-cont {
		display: flex;
		justify-content: space-between;
		height: 70upx;
		align-items: center;
		padding: 30upx 0;
		background: #f8f8f8;
	}

	.search-code {
		width: 150upx;
		height: 50upx;
		text-align: center;
		font-size: 30upx;
	}

	.search-history {
		margin: 20upx;
	}

	.search-title {
		font-size: 30upx;
		font-weight: bold;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 60upx;
		line-height: 60upx;
	}

	.search-title image {
		width: 36upx;
		height: 36upx;
		display: block;
	}

	.menu-block view {
		background: #f7f8fa;
		border-radius: 6upx;
		font-size: 27upx;
		color: #292c33;
		text-align: center;
		padding: 10upx;
		margin: 20upx 20upx 0 0;
	}

	.menu-block {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;
	}
</style>
