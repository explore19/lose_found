<template>
	<view>
		<view>
			<van-search value="" placeholder="请输入搜索关键词"  @focus="focus" />
		</view>
		<view>
			<swiper class="card-swiper square-dot" :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500">
				<swiper-item v-for="item in swiperList" :key="item.id">
					<view class="swiper-item">
						<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view>
			<van-tabs @click="onClick">
			  <van-tab title="失物寻物">失物寻物</van-tab>
			  <van-tab title="拾物寻主">拾物寻主</van-tab>
			</van-tabs>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: 'home',
				cardCur: 0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: '/static/images/test1.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}]
			}
		},
		methods: {
			cardSwiper: function(e) {
				this.setData({
					cardCur: e.detail.current
				})
			},
			focus:function(){
				uni.redirectTo({
					url:"/pages/search/search"
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50upx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}

	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100rpx - 150rpx);
		z-index: var(--index);
	}
</style>
