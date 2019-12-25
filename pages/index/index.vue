<template>
	<view>
		<view @click="focus">
			<van-search  placeholder="请输入搜索关键词"  />
		</view>
		<view>
			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
				</swiper-item>
			</swiper>
		</view>
		<view>
			<van-tabs v-on:change="onChange()" swipeable="true">
				<van-tab title="失物寻物">
					<view v-for="item in data" :key="item.post.id" style="margin-top: 15upx;">
						<view style="border: #F0FFF0">
							<view class="cu-card dynamic no-card">
								<view class="cu-item shadow">
									<view class="cu-list menu-avatar">
										<view class="cu-item borderLine">
											<view class="cu-avatar round lg" :style="'background-image:url('+item.headPortrait+');'"></view>
											<view class="content flex-sub">
												<view>{{item.nickName}}</view>
												<view class="text-gray text-sm flex justify-between">
													{{item.post.createTime}}
												</view>
											</view>
										</view>
									</view>
									<view @click="goToInfo(item.post.id)">
									<view class="text-content" style="margin: 20upx 30upx;">
										{{item.post.details}}
									</view>
									<view class="grid flex-sub padding-lr isCard?'col-3 grid-square':'col-1'" v-if="img" :img = "item.post.image!=null?'true':'false'" >
										<view class="bg-img isCard?'':'only-img'" :style="'background-image:url('+item.post.image+');'">
										</view>
									</view>
									<view class="text-gray text-sm text-right padding">
										<text class="cuIcon-attentionfill margin-lr-xs" @click="add()">{{item.post.browsePoints}}</text>
										<text class="cuIcon-appreciatefill margin-lr-xs">{{item.praiseNumber}}</text>
										<text class="cuIcon-messagefill margin-lr-xs">{{item.replyNumber}}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					</view>
				</van-tab>
				<van-tab title="拾物寻主">
					
					<view style="border: #F0FFF0">
						<view class="cu-card dynamic no-card" style="margin-top: 15upx;">
							<view class="cu-item shadow">
								<view class="cu-list menu-avatar">
									<view class="cu-item">
										<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
										<view class="content flex-sub">
											<view>小黃</view>
											<view class="text-gray text-sm flex justify-between">
												2019年11月3日
											</view>
										</view>
									</view>
								</view>
								<view @click="goToInfo()">
									<view class="text-content" style="margin: 28rpx 28rpx;">
										折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！
									</view>
									<view class="grid flex-sub padding-lr isCard?'col-3 grid-square':'col-1'">
										<view class="bg-img isCard?'':'only-img'" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);">
										</view>
									</view>
								</view>
								<view class="text-gray text-sm text-right padding">
									<text class="cuIcon-attentionfill margin-lr-xs" @click="add1()">{{browser}}</text>
									<text class="cuIcon-appreciatefill margin-lr-xs" @click="add2()">{{likenum}}</text>
									<text class="cuIcon-messagefill margin-lr-xs" @click="add3()">{{reply}}</text>
								</view>
							</view>
						</view>
					</view>
					
				</van-tab>
			</van-tabs>
		</view>

		<view class="popup window">
			<van-cell title="完善信息才能发布帖子,点击完善" is-link @click="goToperfect" position:margin-top />
		</view>




	</view>
</template>

<script>
	export default {
		data() {
			return {
				img:'',
				data: [],
				active: 'home',
				cardCur: 0,
				awatar: "",
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
				}],
				page: 1,
				pageSize: 5,
				postType: 0,
				count: 0
			}
		},
		methods: {
			focus: function() {
				uni.navigateTo({
					url: "/pages/search/search"
				})
			},
			goToInfo: function(postId) { // 用来跳转到物品的详细信息的页面
				this.$global.setPostId(postId)
				uni.navigateTo({
					url: "/pages/introduction/introduction"
				})
			},
			goToperfect: function() { //用来跳转到信息完善界面
				uni.navigateTo({
					url: "/pages/perfect/perfect"
				})
			},
			perfect: function() {

				// if(status==2||3)({
				// 	show="true"
				// })
			},
			isBottom(){
				//检查到是否到最底层
				let page=this.page
				let pageSize=this.pageSize
				let total =this.total
				if(page*pageSize<total){
					return false
				}
				return true
			},
			requestData() { //用来重复刷新页面 重复像后端获取数据		
				this.$api.queryPost({ //用来批量获取
					page: this.page,
					pageSize: this.pageSize,
					// postType: this.postType
				}).then(res => {

					this.data = res.data.data
				})
			},
			onChange(e) {
				this.postType = e.detail.name
				this.requestData()
			}
		},
		created() {
			this.requestData()
		},

		onReachBottom() {
			if(this.isBottom()){
				return
			}
			this.page += 1
			this.$api.queryPost({ //用来批量获取
				page: this.page,
				pageSize: this.pageSize,
				// postType: this.postType
			}).then(res => {
				this.data = this.data.concat(res.data.data)
			})
		}

	}
</script>
<style>
	.borderLine {
		border-bottom: none;
	}

</style>
