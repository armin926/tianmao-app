<template>
	<view>
		<view class="search-cont">
			<view class="search">
				<input type="text" placeholder-class="inputclass" confirm-type="search" focus="true" placeholder="请输入关键字" v-model="searchdata"
				 @confirm="onKeyInput" />
			</view>
			<view class="search-code" @click="seArch()">搜索</view>
		</view>
		<!-- 搜索历史 -->
		<view class="search-history" v-if="ifhistory">
			<view class="search-title">
				<view>最近搜索</view>
				<view @click="removeStorage()">
					<image src="/static/search/searchend.svg" mode="widthFix"></image>
				</view>
			</view>
			<!-- tab -->
			<view class="menu-block">
				<block v-for="(item,index) in setdata" :key="index">
					<view @click="menubtn(item)">{{item}}</view>
				</block>

			</view>
		</view>
		<!-- 展示内容 -->
		<Commodity :commodcradData="commodcradData" v-if="!searchno"></Commodity>
		<!-- 上拉加载 -->
		<loader-on ref="loadon"></loader-on>
		<!--没有搜索结果 -->
		<view class="empty-cart" v-if="searchno">
			<image src="/static/search/sousuono.svg" mode="widthFix"></image>
			<text>抱歉！暂无相关商品</text>
		</view>
	</view>
</template>

<script>
	var {
		log
	} = console
	export default {
		data() {
			return {
				searchdata: '',
				ifhistory: false, //是否有搜索历史
				setdata: [], // 搜索历史数据
				pageid: 0, // 初始页数
				commodcradData: [], //请求获得数据结果
				searchno: false, //没有搜索结果
				searchkey: '', // 最后一次搜索结果
			}
		},
		mounted() {
			this.setStorage()
		},
		//上拉加载事件
		onReachBottom() {
			this.$refs.loadon.loAd({
				whether: true
			})
			this.pageid++
			this.searchData(this.searchkey, '002')
		},
		methods: {
			// 点击按钮触发搜索
			seArch() {
				if (this.searchdata !== '') {
					this.ifhistory = false
					this.pageid = 0
					this.getStorage(this.searchdata)
					this.searchData(this.searchdata)
				}
			},
			// 键盘上搜索或回车键触发
			onKeyInput(e) {
				let searchKey = e.detail.value
				if (searchKey !== '') {
					this.ifhistory = false
					this.pageid = 0
					this.getStorage(searchKey)
					this.searchData(searchKey)
				}
			},
			// 存储搜索历史到本地缓存
			getStorage(searchkey) {
				// 存之前先取出之前的搜索历史
				let seararray = uni.getStorageSync('srarch_key') || []
				seararray.unshift(searchkey)
				uni.setStorageSync('srarch_key', seararray)
				// 存数据
				uni.setStorageSync()
			},
			// 取出本地缓存的搜索历史
			setStorage() {
				let setdata = uni.getStorageSync('srarch_key')
				// 数组去重
				let setdataarr = Array.from(new Set(setdata))
				if (setdataarr.length) {
					this.setdata = setdataarr
					this.ifhistory = true
				} else {
					this.ifhistory = false
				}
			},
			// 清除搜索历史
			removeStorage() {
				uni.removeStorageSync('srarch_key')
				this.setStorage()
			},
			// 搜索历史的搜索
			menubtn(item) {
				this.ifhistory = false
				this.pageid = 0
				this.searchData(item)
			},
			// 请求接口搜索商品
			async searchData(searchkey, idn = '001') {
				this.searchkey = searchkey
				const keys = `?keyword=${searchkey}&page=${this.pageid}`
				try {
					let searchdata = await new this.Request(this.Urls.m().getSearchurl + keys).modeget()
					if (idn === '002') {
						// 上拉加载
						if (searchdata.data.length) {
							this.commodcradData = [...this.commodcradData, ...searchdata.data]
						} else {
							this.$refs.loadon.loAd({
								whether: true,
								tips: '没有更多了',
								picture: false
							})
						}
					} else {
						this.$refs.loadon.loAd({whether:false})
						if (searchdata.data.length) {
							this.commodcradData = searchdata.data
							this.searchno = false
						} else {
							this.searchno = true
						}
					}
				} catch (e) {
					//TODO handle the exception
				}
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
