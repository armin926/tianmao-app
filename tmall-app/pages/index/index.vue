<template>
	<view>
		<!-- 搜索 -->
		<Search></Search>
		<!-- 轮播 -->
		<Swipers></Swipers>
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
			return {}
		},
		components: {
			Search,
			Swipers,
			Purchase,
			List,
			Commodity
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
</style>
