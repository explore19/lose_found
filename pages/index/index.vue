<template>
	<view>
		<view @click="focus">
			<van-search placeholder="请输入搜索关键词" />
		</view>
		<view>
			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in rotationChartList" :key="index">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
				</swiper-item>
			</swiper>
		</view>
		<view>
			<van-tabs @change="onTabChange" swipeable="true">
				<van-tab title="失物寻物">
					<view v-for="item in data" :key="item.post.id" style="margin-top: 15upx;" >
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
									<view >
										<view @click="goToInfo(item.post.id)" class="text-content" style="margin: 20upx 30upx;">
											{{item.post.details}}
										</view>
										
											<view class="grid flex-sub padding-lr isCard?'col-3 grid-square':'col-1'" >
											<view class="bg-img isCard?'':'only-img'" :style="'background-image:url('+item.post.image+');'">
											</view>
										</view>
										
										
										<view class="text-gray text-sm text-right padding">
											<text  style="font-size:140%" class="cuIcon-attentionfill margin-lr-ms">{{item.post.browsePoints}}</text>
											<text style="font-size:140%" @click="perfect(item.post.id)" :class="'cuIcon-appreciatefill margin-lr '+(item.isPraise?'text-red':'') ">{{item.praiseNumber}}</text>
											<text style="font-size:140%" class="cuIcon-messagefill margin-lr">{{item.replyNumber}}</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</van-tab>
				<van-tab title="拾物寻主">
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
										<view class="grid flex-sub padding-lr isCard?'col-3 grid-square':'col-1'" >
											<view class="bg-img isCard?'':'only-img'" :style="'background-image:url('+item.post.image+');'">
											</view>
										</view>
										<view class="text-gray text-sm text-right padding">
											<text class="cuIcon-attentionfill margin-lr-xs">{{item.post.browsePoints}}</text>
											<text @click="perfect(item.post.id)" class="cuIcon-appreciatefill margin-lr-xs">{{item.praiseNumber}}</text>
											<text class="cuIcon-messagefill margin-lr-xs">{{item.replyNumber}}</text>
										</view>
									</view>
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
				hasimg: true,
				data: [],
				active: 'home',
				cardCur: 0,
				awatar: "",
				rotationChartList: [],
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
			perfect: function(postId) {
				this.$api.praise(postId).then((res) => {

				})
			},
			isBottom() {
				//检查到是否到最底层
				let page = this.page
				let pageSize = this.pageSize
				let total = this.total
				if (page * pageSize < total) {
					return false
				}
				return true
			},
			requestData() { //用来重复刷新页面 重复像后端获取数据		
				this.$api.queryPost({ //用来批量获取
					page: this.page,
					pageSize: this.pageSize,
					postType: this.postType
				}).then(res => {
					console.log(res)
					this.data = res.data.data
				})
			},
			requestRotationChart() {
				this.$api.getRotationChart(5).then((res) => {
					if (res.status === 0) {
						this.rotationChartList = res.data.map((item) => {
							return {
								id: item.id,
								type: "image",
								url: item.image
							}
						})

					}
					
				})
			},
			onTabChange(e) {
				this.postType = e.detail.name
				this.requestData()
			}
		},
		created() {
			this.requestData()
			this.requestRotationChart()
		},

		onReachBottom() {
			if (this.isBottom()) {
				return
			}
			this.page += 1
			this.$api.queryPost({ //用来批量获取
				page: this.page,
				pageSize: this.pageSize,
				postType: this.postType
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
