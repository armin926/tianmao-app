<template>
	<view>
		<!-- 返回按钮 -->
		<view class="header-fixed backno" v-show="showAbs">
			<view class="status_bar" :style="'height:'+ topheight.top + 'px;'"></view>
			<view class="navs-image" :style="'height:'+topheight.height+'px;'">
				<image src="/static/details/fanhuibai.jpg" mode="widthFix"></image>
			</view>
		</view>
		<!-- 顶部导航栏 -->
		<view class="header-fixed backyes" v-show="!showAbs" :style="{opacity:styleObject}">
			<view class="status_bar" :style="'height:'+ topheight.top + 'px;'"></view>
			<Top ref="top" :topheight="topheight"></Top>
		</view>
		<!-- 图片视频宣传 -->
		<!-- 注意：如果含有视频播放，在子组件里无法触发视频播放，必须要放在父组件 -->
		<view>
			<swiper :indicator-dots="dots" :interval="3000" :duration="1000" :circular="true" indicator-color="rgba(216, 216, 216)"
			 indicator-active-color="#7a7a7a" @change="bannerfun">
				<block v-for="(iteming,index) in imagetext[0].media" :key="index">
					<swiper-item class="swiper-video" v-if="iteming.video != ''">
						<view class="video-btn">
							<view>
								<video id="myVideo" :src="iteming.video" ref="myVideo" object-fit="cover" :show-center-play-btn="false"
								 :enable-progress-gesture="false" :controls="contimg" @play="playFun" @pause="pauseFun" @ended="endedFun"></video>
							</view>
							<view class="video-img" @click="videoPlay()" v-show="startVideo">
								<image src="/static/details/bofang.svg" mode="widthFix"></image>
							</view>
						</view>
					</swiper-item>
					<block v-for="(item,indexing) in iteming.imgArray" :key="indexing">
						<swiper-item>
							<view>
								<image :src="item" mode="aspectFill" class="imageurl" @click="previmg(indexing,iteming.imgArray)"></image>
							</view>
						</swiper-item>
					</block>
				</block>
			</swiper>
		</view>
		<!-- 价格，标题等等 -->
		<Price :priceetc="priceetc"></Price>
		<!-- 产品参数 -->
		<Parame></Parame>
		<!-- 评价 -->
		<Evaluate :comment="comment" class="evaluate"></Evaluate>
		<!-- 商品详情图 -->
		<Produce :priceetc="priceetc" class="produce"></Produce>
		<!-- 底部操作栏 -->
		<Shopping :goodid="goodid" :colldata="colldata" :cartdata="cartdata"></Shopping>
		<!-- 公用商品sku选择组件 -->
		<Addtocart ref="addto" :skudata="skudata"></Addtocart>
	</view>
</template>

<script>
	// 预览图片
	const {
		Login
	} = require('../../public/logic.js')
	import Top from './components/top.vue'
	import Price from './components/price.vue'
	import Parame from './components/parame.vue'
	import Evaluate from './components/evaluate.vue'
	import Produce from './components/product.vue'
	import Shopping from './components/shopping.vue'
	// 公用的商品sku选择组件
	import Addtocart from '../components/addtocart.vue'
	export default {
		data() {
			return {
				// 胶囊按钮的数据
				topheight: {},
				// 返回按钮
				showAbs: true,
				// 透明度
				styleObject: 0,
				// 找到视频上下文
				videoPlaydata: {},
				// 中间播放按钮
				startVideo: true,
				// 是否显示默认播放控件
				contimg: false,
				// 视频数组对象(视频，图片)
				imagetext: [],
				// 面板指示点
				dots: false,
				// 是否存在视频
				truevideo: '',
				// 商品标题，价格等
				priceetc: {},
				// 评价
				comment: [],
				// 备用商品id
				goodid: '',
				// 评论距离顶部距离
				evaluateTop: 0,
				// 详情图距离顶部距离
				productTop: 0,
				// 获取商品是否收藏
				colldata: {},
				// 获取购物车数据
				cartdata: {},
				// 获取商品sku数据
				skudata: []

			}
		},
		components: {
			Top,
			Price,
			Parame,
			Evaluate,
			Produce,
			Shopping,
			Addtocart
		},
		created() {
			// 获取胶囊按钮的数据
			this.topheight = uni.getMenuButtonBoundingClientRect()
		},
		mounted() {
			this.videoPlaydata = uni.createVideoContext('myVideo')
			const query = this.createSelectorQuery()
			query.select('.evaluate').boundingClientRect()
			query.selectViewport().scrollOffset()
			query.exec(res => {
				this.evaluateTop = res[0].top - (this.topheight.top + this.topheight.height)
				this.productTop = res[0].top + (res[1].scrollHeight - res[0].top)
			})
		},
		// 滚动监听
		onPageScroll(e) {
			this.handleScroll(e.scrollTop)
			if (e.scrollTop >= this.evaluateTop && e.scrollTop < this.productTop) {
				this.$refs.top.changeTab(1)
			} else if (e.scrollTop >= this.productTop) {
				this.$refs.top.changeTab(2)
			} else {
				this.$refs.top.changeTab(0)
			}
		},
		onLoad() {
			this.detRequest('5f8bbf2823954733542169a1')
		},
		methods: {
			// 请求数据
			async detRequest(id) {
				let introduce = new this.Request(this.Urls.m().getIntroduceurl + '?id=' + id).modeget()
				// 评价
				let wxcommnt = new this.Request(this.Urls.m().wxcommnt + '?id=' + id).modeget()
				// 获取商品是否收藏
				let collection = new this.Request(this.Urls.m().collection + '?id=' + id).modeget()
				// 获取购物车的件数
				let mycart = new this.Request(this.Urls.m().mycart).modeget()
				// 获取商品sku数据
				let wxsku = new this.Request(this.Urls.m().wxsku + '?id=' + id).modeget()
				try {
					let res = await Promise.all([introduce, wxcommnt,collection,mycart,wxsku])
					// 图片视频的数据
					this.imagetext = res[0].data
					let mendata = res[0].data[0]
					// 商品ID
					this.goodid = mendata.id
					// 商品标题，价格
					let describe = mendata.describe
					describe['id'] = mendata.id
					this.priceetc = describe
					// 评价
					this.comment = res[1].data
					// 获取该商品是否收藏
					this.colldata = res[2]
					// 获取购物车数据
					this.cartdata = res[3]
					// 获取商品sku数据
					let defaultdata = {
						image: mendata.media[0].imgArray[0],
						price: mendata.describe.Trueprice,
						totalstock:mendata.describe.Total_stock,
						id: mendata.id,
						title: mendata.describe.title
					}
					this.skudata = res[4].data
					this.skudata.push(defaultdata)
					// 如果有视频不显示面板指示点
					this.truevideo = mendata.media[0].video
					this.dots = this.truevideo === '' ? true : false
				} catch (e) {
					//TODO handle the exception
				}
			},
			// 导航栏滚动显示/隐藏
			handleScroll(top) {
				if (top > 90) {
					let opacity = top / 300
					opacity = opacity > 1 ? 1 : opacity
					this.showAbs = false
					this.styleObject = opacity
				} else {
					this.showAbs = true
				}
			},
			// 滑块滑动时触发
			bannerfun(e) {
				let inx = e.detail.current
				// 滑动到图片的时候要显示面板指示点
				if (this.truevideo != '') {
					this.videoPlaydata.pause()
					this.dots = inx == 0 ? false : true
				} else {
					this.dots = true
				}
			},
			// 手动触发视频播放
			videoPlay() {
				setTimeout(() => {
					this.videoPlaydata.play()
				}, 200)
			},
			// 视频播放时触发
			playFun() {
				this.startVideo = false
				this.contimg = true
			},
			// 视频暂停时触发
			pauseFun() {
				this.startVideo = true
				this.contimg = false
			},
			// 视频播放到结尾时触发
			endedFun() {
				this.startVideo = true
				this.contimg = false
			},
			// 预览图片
			previmg(index, imgArray) {
				new Login(index, imgArray).previewImg()
			},
			// 被子组件Top调用来锚点链接
			fathEr(index) {
				//evaluate:评价 produce:详情图
				let clsdata = index === 1 ? '.evaluate' : '.produce'
				let height = this.topheight.top + this.topheight.height
				const query = this.createSelectorQuery()
				query.select(clsdata).boundingClientRect()
				query.selectViewport().scrollOffset()
				query.exec(res => {
					let top = res[0].top + res[1].scrollTop - height + 3
					uni.pageScrollTo({
						scrollTop: top,
						duration: 200
					})
					// res[0].top       // #the-id节点的上边界坐标
					// res[1].scrollTop // 显示区域的竖直滚动位置
				})
			},
			// 被子组件shopping调用
			shoPp(mean){
				this.$refs.addto.showCou(mean)
			}
		}
	}
</script>

<style scoped>
	page {
		background: #f2f2f2;
	}

	.header-fixed {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 2;
	}

	.backyes {
		background: #f8f8f8;
	}

	.backno {
		background: none;
	}

	.status_bar {
		width: 100%;
	}

	.navs-image image {
		width: 28px;
		height: 28px;
		border-radius: 50%;
	}

	.navs-image {
		display: flex;
		align-items: center;
		padding-left: 20upx;
	}

	/* banner部分 */
	.imageurl {
		width: 100%;
		height: 700upx !important;
	}

	swiper {
		height: 700upx !important;
	}

	.swiper-video {
		height: 700upx;
		background: #4CD964;
	}

	.swiper-video video {
		width: 100%;
		height: 700upx;
	}

	/* 自定义按钮 */
	.video-img image {
		width: 90upx;
		height: 90upx;
		z-index: 999;
		border: 2px solid #FFFFFF;
		border-radius: 50%;
	}

	.video-img {
		width: 90upx;
		height: 90upx;
		position: absolute;
		bottom: 0;
		left: 50%;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
	}

	.video-btn {
		height: 700upx;
		position: relative;
	}
</style>
