<template>
	<view>
		<!-- 搜索 -->
		<Search></Search>
		<!-- 轮播 -->
		<Swipers :bannerData="bannerData"></Swipers>
		<!-- 抢购 -->
		<Purchase :recomData="recomData"></Purchase>
		<!-- 榜单 -->
		<List :billData="billData"></List>
		<!-- 卡片流 -->
		<Commodity :commodcradData="commodcradData"></Commodity>
		<!-- 上拉加载 -->
		<loader-on ref="loadon"></loader-on>
	</view>
</template>

<script>
	import Search from './components/search.vue'
	import Swipers from './components/swiper.vue'
	import Purchase from './components/purchase.vue'
	import List from './components/list.vue'
	export default {
		data() {
			return {
				bannerData: [], // 轮播数据
				recomData: [], // 推荐抢购商品
				billData: [], // 榜单数据
				pageid: 0, //卡片商品请求页
				commodcradData: [], //卡片流数据
			}
		},
		components: {
			Search,
			Swipers,
			Purchase,
			List
		},
		mounted() {
			this.indexRequest()
		},
		//上拉加载事件
		onReachBottom() {
			this.$refs.loadon.loAd({
				whether: true
			})
			this.pageid++
			this.pullUp()
		},
		methods: {
			async indexRequest() {
				// 轮播
				let banner = new this.Request(this.Urls.m().getBanner).modeget()
				// 推荐抢购商品
				let recom = new this.Request(this.Urls.m().getRecommurl).modeget()
				// 天猫榜单
				let billboard = new this.Request(this.Urls.m().getBillboardurl).modeget()
				// 卡片流
				let commodcrad = new this.Request(this.Urls.m().getCommodcradurl + '?page=' + this.pageid).modeget()
				try {
					// 同时并发请求: Promise.all([])
					let res = await Promise.all([banner, recom, billboard, commodcrad])
					this.bannerData = res[0].data
					this.recomData = res[1].data
					this.billData = res[2].data
					this.commodcradData = res[3].data
				} catch (e) {
					console.log(e)
				}
			},
			//  上拉加载所得数据
			async pullUp() {
				try {
					// 卡片流
					let commodcrad = await new this.Request(this.Urls.m().getCommodcradurl + '?page=' + this.pageid).modeget()

					if (!commodcrad.data.length) {
						this.$refs.loadon.loAd({whether:true, tips:'没有更多了',picture:false})
					} else {
						// 把之前得到的数据和上拉之后得到的数据做一个数组合并
						this.commodcradData = [...this.commodcradData, ...commodcrad.data]
					}
				} catch (e) {
					console.log(e)
				}
			}
		}
	}
</script>

<style>
	page {
		background-color: #f4f4f4;
	}
</style>
