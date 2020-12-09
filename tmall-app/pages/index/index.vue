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
		<Commodity></Commodity>
	</view>
</template>

<script>
	import Search from './components/search.vue'
	import Swipers from './components/swiper.vue'
	import Purchase from './components/purchase.vue'
	import List from './components/list.vue'
	import Commodity from './components/commodity.vue'
	export default {
		data() {
			return {
				bannerData: [], // 轮播数据
				recomData: [], // 推荐抢购商品
				billData: []
			}
		},
		components: {
			Search,
			Swipers,
			Purchase,
			List,
			Commodity
		},
		mounted() {
			this.indexRequest()
		},
		methods: {
			async indexRequest(){
				// 轮播
				let banner = new this.Request(this.Urls.m().getBanner).modeget()
				// 推荐抢购商品
				let recom = new this.Request(this.Urls.m().getRecommurl).modeget()
				// 天猫榜单
				let billboard = new this.Request(this.Urls.m().getBillboardurl).modeget()
				try{
					// 同时并发请求: Promise.all([])
					let res = await Promise.all([banner,recom,billboard])
					this.bannerData = res[0].data
					this.recomData = res[1].data
					this.billData = res[2].data
				}catch(e){
					
				}
			}
		}
	}
</script>

<style>
	page{
		background-color: #f4f4f4;
	}
</style>
