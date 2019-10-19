<template>
	<view>
		<view>
			<van-search value="" placeholder="请输入搜索关键词" @focus="focus" />
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
				<van-tab title="失物寻物">
					<view style="border: #F0FFF0">
						<view class="cu-card dynamic isCard?'no-card':''">
							<view class="cu-item shadow">
								<view class="cu-list menu-avatar">
									<view class="cu-item">
										<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
										<view class="content flex-sub">
											<view>凯尔</view>
											<view class="text-gray text-sm flex justify-between">
												2019年12月3日
											</view>
										</view>
									</view>
								</view>
								<view class="text-content">
									折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！
								</view>
								<view class="grid flex-sub padding-lr isCard?'col-3 grid-square':'col-1'">
									<view class="bg-img isCard?'':'only-img'" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);">
									</view>
								</view>
								<view class="text-gray text-sm text-right padding">
								      <text class="cuIcon-attentionfill margin-lr-xs"></text> 10
								      <text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
								      <text class="cuIcon-messagefill margin-lr-xs"></text> 30
								</view>
							</view>
						</view>
					</view>
				</van-tab>
				<van-tab title="拾物寻主">
					<view style="border: #F0FFF0">
						<view class="cu-card dynamic isCard?'no-card':''">
							<view class="cu-item shadow">
								<view class="cu-list menu-avatar">
									<view class="cu-item">
										<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
										<view class="content flex-sub">
											<view>小黃</view>
											<view class="text-gray text-sm flex justify-between">
												2019年110月3日
											</view>
										</view>
									</view>
								</view>
								<view class="text-content">
									折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！
								</view>
								<view class="grid flex-sub padding-lr isCard?'col-3 grid-square':'col-1'">
									<view class="bg-img isCard?'':'only-img'" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);">
									</view>
								</view>
								<view class="text-gray text-sm text-right padding">
								      <text class="cuIcon-attentionfill margin-lr-xs"></text> 10w
								      <text class="cuIcon-appreciatefill margin-lr-xs"></text> 20w
								      <text class="cuIcon-messagefill margin-lr-xs"></text> 30w
								</view>
							</view>
						</view>
					</view>
				</van-tab>
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
			focus: function() {
				uni.redirectTo({
					url: "/pages/search/search"
				})
			},
			onClick: function() {

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
