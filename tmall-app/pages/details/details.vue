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
			<Top :topheight="topheight"></Top>
		</view>
		<!-- 图片视频宣传 -->
		<!-- 注意：如果含有视频播放，在子组件里无法触发视频播放，必须要放在父组件 -->
		<view>
			<swiper :indicator-dots="dots" :interval="3000" :duration="1000" :circular="true" indicator-color="rgba(216, 216, 216)"
			 indicator-active-color="#7a7a7a" @change="bannerfun">
				<swiper-item class="swiper-video">
					<view class="video-btn">
						<view>
							<video id="myVideo" ref="myVideo" object-fit="cover" :show-center-play-btn="false" :enable-progress-gesture="false" 
							 :controls="contimg" @play="playFun" @pause="pauseFun" @ended="endedFun"></video>
						</view>
						<view class="video-img" @click="videoPlay()" v-show="startVideo">
							<image src="/static/details/bofang.svg" mode="widthFix"></image>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view>
						<image mode="aspectFill" class="imageurl"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import Top from './components/top.vue'
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
				videoPlay: {},
				// 中间播放按钮
				startVideo: true,
				// 是否显示默认播放控件
				contimg: false
			}
		},
		components: {
			Top
		},
		created() {
			// 获取胶囊按钮的数据
			this.topheight = uni.getMenuButtonBoundingClientRect()
		},
		mounted() {
			this.videoPlay = uni.createVideoContext('myVideo')
		},
		// 滚动监听
		onPageScroll(e) {
			this.handleScroll(e.scrollTop)
		},
		methods: {
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
			bannerfun(){
				this.videoPlay.pause()
			},
			// 手动触发视频播放
			videoPlay() {
				setTimeout(() => {
					this.videoPlay.play()
				}, 200)
			},
			// 视频播放时触发
			playFun(){
				this.startVideo = false
				this.contimg = true
			},
			// 视频暂停时触发
			pauseFun(){
				this.startVideo = true
				this.contimg = false
			},
			// 视频播放到结尾时触发
			endedFun(){
				this.startVideo = true
				this.contimg = false
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
		/* background: #007AFF; */
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
