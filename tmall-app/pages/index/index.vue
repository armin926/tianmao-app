<template>
	<view>
		<!-- 搜索 -->
		<Search></Search>
		<!-- 轮播 -->
		<Swipers :bannerData="bannerData"></Swipers>
		<!-- 抢购 -->
		<Purchase></Purchase>
		<!-- 榜单 -->
		<List></List>
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
				bannerData: []
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
				try{
					// 同时并发请求: Promise.all([])
					let res = await Promise.all([banner])
					// console.log(res)
					this.bannerData = res[0].data
				}catch(e){
					
				}
			}
		}
	}
</script>

<style>
</style>
