<template>

	<view class="content" style="height: 100%;">

		<view @click="focus">
			<van-search placeholder="请输入搜索关键词" />
		</view>
		<view class="demo">
			<cl-message ref="message"></cl-message>
		</view>

		<!--加的悬浮菜单栏-->
		<wux-fab-button position="bottomRight" theme="balanced" direction="vertical" spaceBetween="20" sAngle="180" eAngle="270"
		 v-bind:buttons="button" @click="onClick()" v-bind:contact="onContact" v-bind:getuserinfo="onGotUserInfo" />

		<view class="content">
			<view>
				<!-- <swiper class="card-swiper" :indicator-dots="true" :circular="true" :class="dotStyle?'square-dot':'round-dot'"
				 :autoplay="true" interval="5000" duration="500" indicator-color="#8799a3" indicator-active-color="#0081ff" @change="cardSwiper">
					<swiper-item v-for="(item,index) in rotationChartList" :key="index" :class="cardCur==index?'cur':''">
						<view class="swiper-item" v-on:click="jumpHtml(item)">
							<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
							<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
						</view>
					</swiper-item>
				</swiper> -->

				<swiper class="['screen-swiper',dotStyle?'square-dot':'round-dot']" indicator-dots="true" circular="true" autoplay="true"
				 interval="5000" duration="500" @change="cardSwiper">
					<swiper-item v-for="(item,index) in rotationChartList" :key="index" :class="cardCur==index?'cur':''" v-on:click="jumpHtml(item)">
						<image :src="item.url" mode="aspectFill"></image>
						<video :src="item.url" autoplay loop muted="true" show-play-btn="false" controls="false" objectFit="cover" v-if="item.type == 'video'"></video>
					</swiper-item>
				</swiper>
			</view>


			<van-tabs @change="onTabChange" swipeable="true" animated>
				<van-tab title="失物寻物">
					<!-- <view class="popup window margin-top" v-if="userstatus" style="margin-top: 5upx;">
						<van-cell title="登录完善信息才能发布帖子,点击完善" is-link @click="goToperfect" position:margin-top />
					</view> -->

					<view v-for="(item,index) in data" :key="index" v-if="item.post.postType==0" style="margin-top: 15upx;">
						<view style="border: #F0FFF0">
							<view class="cu-card dynamic no-card">
								<view class="cu-item shadow">
									<view class="cu-list menu-avatar">

										<view class="cu-item borderLine">
											<view class="cu-avatar round lg" :style="'background-image:url('+item.headPortrait+');'"></view>
											<!-- <image class="cu-avatar round lg" :src="item.headPortrait" mode=""></image> -->
											<view class="content flex-sub padding-tbl">
												<view class="henflex">
													<view>{{item.nickName}}</view>
													<!-- <view class="right" v-if="false">
														<view class="cu-tag round bg-blue sm">官方</view>
													</view> -->
													<view class="right">
														<view class="cu-tag round bg-blue sm">已实名</view>
													</view>
													<view class="huati text-orange text-bold">#失物寻物#</view>
												</view>

												<view class="henflex">
													<view class="text-gray text-sm flex justify-between">
														{{item.post.createTime}}
													</view>
												</view>

											</view>
										</view>

										<view @click="goToInfo(item.post.id)">
											<view class="text-content" style="margin: 20upx 30upx 10upx;">
												物品名称: {{item.post.name}}
											</view>
											<view class="text-content" style="margin: 10upx 30upx;">
												物品详情: {{item.post.details}}
											</view>
											<view class="grid flex-sub padding-lr isCard?'col-3 grid-square':'col-1'" v-if="item.post.image!=null">
												<view class="bg-img isCard?'':'only-img'" :style="'background-image:url('+item.post.image+');'">
												</view>
											</view>
											<!-- <view class="text-gray text-sm text-right padding">
												<text style="font-size:125%" class="cuIcon-attentionfill margin-lr-xs">{{item.post.browsePoints}}</text>
												<text style="font-size:125%" @click.stop="perfect(item.post.id,index)" :class="'cuIcon-appreciatefill margin-lr-xs '+(item.isPraise?'text-red':'') ">{{item.praiseNumber}}</text>
												<text style="font-size:125%" class="cuIcon-messagefill margin-lr-xs">{{item.replyNumber}}</text>
											</view> -->
											<view class="submain">
												<text class="text-gray_">{{item.praiseNumber}} 喜欢</text>
											</view>

											<view class="container text-align:center">
												<!-- 分割线 -->
												<view class="divLine"></view>
											</view>
										</view>
										<!-- :class="'Heart'+(item.isPraise?'1':'') " -->
										<view class="row">
											<view class="ft">
												<view class="flex">
													<image class="viewNum" :src="options.viewNum" />
													<text class="text-grey space" style="font-size: 18px; text-align: center;">{{item.post.browsePoints}}</text>
												</view>
												<view class="flex" @click="goToInfo(item.post.id)">
													<image class="messagingspeechbub" :src="options.messagingspeechbub" />
													<text class="text-grey space" style="font-size: 18px; text-align: center;">{{item.replyNumber}}</text>
												</view>
												<image v-if="!item.isPraise" class="Heart" :src="options.Heart" @click.stop="perfect(item.post.id,index)" />
												<image v-if="item.isPraise" class="Heart" :src="options.Heart1" @click.stop="perfect(item.post.id,index)" />
											</view>
										</view>

									</view>
								</view>
							</view>
						</view>
					</view>
				</van-tab>


				<van-tab title="拾物寻主">
					<!-- <view class="popup window " v-if="userstatus" style="margin-top: 5upx;">
						<van-cell title="登录完善信息才能发布帖子,点击完善" is-link @click="goToperfect" position:margin-top />
					</view> -->
					<view v-for="(item,index) in data" :key="index" v-if="item.post.postType==1" style="margin-top: 15upx;">
						<view style="border: #F0FFF0">
							<view class="cu-card dynamic no-card">
								<view class="cu-item shadow">
									<view class="cu-list menu-avatar">
										<view class="cu-item borderLine">
											<view class="cu-avatar round lg" :style="'background-image:url('+item.headPortrait+');'"></view>
											<view class="content flex-sub padding-tbl">
												<view class="henflex">
													<view>{{item.nickName}}</view>

													<view class="right">
														<view class="cu-tag round bg-blue sm">已实名</view>
													</view>
													<view class="huati text-orange text-bold">#拾物寻主#</view>


												</view>
												<view class="text-gray text-sm flex justify-between">
													{{item.post.createTime}}
												</view>
											</view>
										</view>
									</view>
									<view @click="goToInfo(item.post.id)">

										<view class="text-content" style="margin: 20upx 30upx 10upx ;">
											物品名称: {{item.post.name}}
										</view>
										<view class="text-content" style="margin: 10upx 30upx;">
											物品详情: {{item.post.details}}
										</view>
										<view class="grid flex-sub padding-lr isCard?'col-3 grid-square':'col-1'" v-if="item.post.image!=null">
											<view class="bg-img isCard?'':'only-img'" :style="'background-image:url('+item.post.image+');'">
											</view>
										</view>

										<view class="submain">
											<text class="text-gray_">{{item.praiseNumber}} 喜欢</text>
										</view>

										<view class="container text-align:center">
											<!-- 分割线 -->
											<view class="divLine"></view>
										</view>
									</view>

									<view class="row">
										<view class="ft">
											<view class="flex">
												<image class="viewNum" :src="options.viewNum" />
												<text class="text-grey space" style="font-size: 18px; text-align: center;">{{item.post.browsePoints}}</text>
											</view>
											<view class="flex" @click="goToInfo(item.post.id)">
												<image class="messagingspeechbub" :src="options.messagingspeechbub" />
												<text class="text-grey space" style="font-size: 18px; text-align: center;">{{item.replyNumber}}</text>
											</view>
											<image v-if="!item.isPraise" class="Heart" :src="options.Heart" @click.stop="perfect(item.post.id,index)" />
											<image v-if="item.isPraise" class="Heart" :src="options.Heart1" @click.stop="perfect(item.post.id,index)" />
										</view>
									</view>

								</view>
							</view>
						</view>
					</view>
					<!-- <view style="margin-bottom: 20upx; margin-top: 20upx;" v-if="reachbto1">
						<text style="font-size:140%" class="cuIcon-emoji align-center kong">到底了</text>
					</view> -->
				</van-tab>

		<!-- 		<van-tab title="所谓伊人">

					<view v-for="(item,index) in data" v-if="item.post.status == 0 && item.post.postType==2" :key="index" style="margin-top: 15upx;">
						<view style="border: #F0FFF0">
							<view class="cu-card dynamic no-card">
								<view class="cu-item shadow">
									<view class="cu-list menu-avatar">

										<view v-if="item.post.type == 1" class="cu-item borderLine">
											<view class="cu-avatar round lg" :style="'background-image:url('+item.headPortrait+');'"></view>
											<view class="content flex-sub padding-tbl">
												<view class="henflex">
													<view>{{item.nickName}}</view>
													<view class="right">
														<view class="cu-tag round bg-blue sm">已实名</view>
													</view>
													<view class="huati text-pink text-bold">#表白墙#</view>
												</view>

												<view class="text-gray text-sm flex justify-between">
													{{item.post.createTime}}
												</view>
											</view>
										</view>

										<view v-if="item.post.type == 101" class="cu-item borderLine">
											<image class="cu-avatar round lg" :src="getAnonymousProtrait(item.post.id)" mode=""></image>
											<view class="content flex-sub padding-tbl">
												<view class="henflex">
													<view>一位路过的吃瓜群众</view>
													<view class="right">
														<view class="cu-tag round bg-orange sm">匿名</view>
													</view>
													<view class="huati text-pink text-bold">#表白墙#</view>
												</view>

												<view class="text-gray text-sm flex justify-between">
													{{item.post.createTime}}
												</view>
											</view>
										</view>

										<view @click="goToInfo(item.post.id)">
											<view class="text-content" style="margin: 10upx 30upx;">
												{{item.post.details}}
											</view>
											<view class="grid flex-sub padding-lr isCard?'col-3 grid-square':'col-1'" v-if="item.post.image!=null">
												<view class="bg-img isCard?'':'only-img'" :style="'background-image:url('+item.post.image+');'">
												</view>
											</view>

											<view class="submain">
												<text class="text-gray_">{{item.praiseNumber}} 喜欢</text>
											</view>

											<view class="container text-align:center">
												<view class="divLine"></view>
											</view>
										</view>
										<view class="row">
											<view class="ft">
												<view class="flex">
													<image class="viewNum" :src="options.viewNum" />
													<text class="text-grey space" style="font-size: 18px; text-align: center;">{{item.post.browsePoints}}</text>
												</view>
												<view class="flex" @click="goToInfo(item.post.id)">
													<image class="messagingspeechbub" :src="options.messagingspeechbub" />
													<text class="text-grey space" style="font-size: 18px; text-align: center;">{{item.replyNumber}}</text>
												</view>
												<image v-if="!item.isPraise" class="Heart" :src="options.Heart" @click.stop="perfect(item.post.id,index)" />
												<image v-if="item.isPraise" class="Heart" :src="options.Heart1" @click.stop="perfect(item.post.id,index)" />
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</van-tab> -->



			</van-tabs>
		</view>
		<!-- <web-view v-if="htmlPage" :src="rotationUrl" :bindload="successLoad()" :bindmessage="testInfo()">this is a test</web-view>	 -->
	</view>
</template>


<script>
	export default {
		props: {
			dataId: {
				type: String,
				default: 'hm-dynamic-detail-card'
			},
			options: {
				type: Object,
				default: function() {
					return {
						Heart: '/static/love.png',
						Heart1: '/static/love1.png',
						messagingspeechbub: '/static/hm-dynamic-detail-card/images/img_25823_0_1.png',
						viewNum: '/static/view.png'
					};
				}
			}
		},

		data() {
			return {
				anonymous_head_portrait: '',
				data: [],
				active: 'home',
				cardCur: 0,
				awatar: "",
				rotationChartList: [],
				page: 1,
				pageSize: 5,
				totalPageNo: 0,
				postType: 0,
				count: 0,
				total: 0,
				img: [],
				userstatus: false,
				reachbto0: false,
				reachbto1: false,
				dotStyle: true,
				disreadMessageCounts: 0,
				// 悬浮菜单的元素的信息
				button: [
					// {
					// 	label: '表白',
					// 	icon: "Confession1.png",
					// },
					{
						label: '发布',
						icon: "message.png"
					}
				],
				htmlPage: false, //是否调用web-view
				rotationUrl: 'http://www.mercy.kim:8080' //Web-view跳转的url
			}
		},

		methods: {
			getAnonymousProtrait(id) {
				var result = id % 5
				return "../../static/anonymous" + result + ".png"
			},
			doMessage() {
				var that = this
				setTimeout(function() {
					that.$refs["message"].open({
						message: "刷新成功",
						style: "success",
						top: "200rpx",
						duration: 1000,
					})
				}, 50);
			},
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
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
				uni.reLaunch({
					url: '../user/user',
				})
			},
			perfect: function(postId, index) {
				this.$api.praise(postId).then((res) => {
					console.log(this.data)
					this.data[index].isPraise = !this.data[index].isPraise
					if (this.data[index].isPraise) {
						this.data[index].praiseNumber++
					} else {
						this.data[index].praiseNumber--
					}
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
				this.$api.getDisreadMessageCounts().then((res) => {
					this.disreadMessageCounts = res.data
					this.refreshDisreadMessageCounts()
				})
				this.page = 1
				this.$api.queryPost({ //用来批量获取
					page: this.page,
					pageSize: this.pageSize,
					postType: this.postType,
				}).then(res => {
					if (res.status === 0) {
						let data = res.data.data
						this.total = res.data.total
						for (var i = 0; i < data.length; i++) {
							if (data[i].post.image != null) {
								let img = data[i].post.image.split("&&&")
								data[i].post.image = img[0]
							} else {
								data[i].post.image = null
							}
						}
						this.data = data
					}
				})
				this.totalPageNo = this.total % this.pageSize == 0 ? (this.total / this.pageSize) : (this.total / this.pageSize + 1)
			},
			refreshDisreadMessageCounts() {
				if (this.disreadMessageCounts === 0) {
					wx.removeTabBarBadge({
						index: 1,
					})
				} else {
					uni.setTabBarBadge({
						index: 1,
						text: this.disreadMessageCounts + ''
					});
				}

				// uni.$emit('refreshCounts',{disreadMessageCounts: this.disreadMessageCounts})
			},
			// 用来获取轮播图的信息
			requestRotationChart() {
				this.$api.getRotationChart(5).then((res) => {

					let data = res.data
					console.log("轮播图")
					console.log(data)

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
			// 用来跳转的
			jumpHtml: function(e) {
				console.log("success to excute")
				uni.navigateTo({
					url: "../testWebView/testWebView",
					success: (res) => {
						this.$global.setrotationChartUrl(e.url)
					}
				})
				this.rotationUrl = e.url
				//wx.miniProgram
			},

			// 当页面加载成功时
			successLoad() {
				console.log("加载成功！！")
			},

			// 测试用的方法
			testInfo(e) {
				//console.log(e)
			},

			onTabChange(e) {
				this.postType = e.detail.name
				this.requestData()
			},

			// 悬浮菜单的调用的方法
			onClick: function(e) {
				let index = e.detail.index
				// 获得点击按钮
				if (index === 0) {
					uni.navigateTo({
						url: "../announce/announce",
						// url: "../user/user",
						success: (res) => {
							console.log("suces")
						}
					})
				} else if (index === 1) {
					uni.navigateTo({
						url: "../announce/announce",
						success: (res) => {
							console.log("announce")
						}
					})
				} else if (index === 2) {
					uni.switchTab({
						url: "../announce/announce",
						success: (res) => {
							console.log("user")
						}
					})
				} else if (index === 3) {
					uni.switchTab({
						url: "../index/index",
						success: (res) => {
							console.log("index")
						}
					})
				}
			}
		},
		created() {
			this.requestData()
			this.requestRotationChart()
			this.$api.getUserInfo().then(res => {
				if (res.data.status == 2) {
					this.userstatus = true
				} else if (res.data.status == 3) {
					this.userstatus = true
				} else {
					this.userstatus = false
				}
			})
		},

		onReachBottom() {
			if (this.isBottom()) {
				uni.showToast({
					title: "到底了",
					icon: "none"
				});
				return
			}
			wx.showLoading({
				title: '玩命加载中',
			})
			this.page += 1
			this.$api.queryPost({ //用来批量获取
				page: this.page,
				pageSize: this.pageSize,
				postType: this.postType
			}).then(res => {
				if (res.status === 0) {
					let data = res.data.data
					for (var i = 0; i < data.length; i++) {
						if (data[i].post.image != null) {
							let img = data[i].post.image.split("&&&")
							data[i].post.image = img[0]
						} else {
							data[i].post.image = null
						}
					}
					this.data = this.data.concat(data)
				}
				wx.hideLoading()
			})
		},
		// onLoad: function(options) {
		// 	this.requestData()
		// },
		onShow: function(options) {
			this.requestData()
		},
		onPullDownRefresh() {
			this.requestData()
			var that = this;
			setTimeout(function() {
				uni.stopPullDownRefresh();
				that.doMessage();
			}, 1000);
		}
	}
</script>

<style>
	.text-gray_ {
		color: #8a8a8a;
	}

	.space {
		margin-left: 8rpx;
		margin-top: 7.35rpx;
		color: #7d7d7d;
	}

	/*分割线样式*/
	.divLine {
		background: #E0E3DA;
		width: 90%;
		height: 5rpx;
		/* display: inline-block; */
		margin-left: 39rpx;
		margin-top: 13rpx;
	}


	.submain {
		/* position: relative; */
		text-align: right;
		opacity: 1;
		margin-top: 28.3rpx;
		margin-right: 40.43rpx;
		/* 	  max-width: 664.86rpx; */
		height: 40.54rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		line-height: 40.54rpx;
		letter-spacing: 0.5px;
		white-space: pre;
		color: #222222;
		font-size: 28.38rpx;
		font-weight: 400;
		flex: 1;
	}

	.row {
		position: relative;
		align-self: center;
		margin-top: 12.16;
		margin-left: 32.43rpx;
		background-color: #ffffff;
		width: 656.76rpx;
		height: 70rpx;
	}

	.ft {
		display: flex;
		position: relative;
		align-items: center;
		align-self: center;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 26.35rpx;
		width: 658.78rpx;
		height: 36.49rpx;
		background-color: #ffffff;
	}

	.Heart {
		width: 56.59rpx;
		height: 46.49rpx;
	}

	.messagingspeechbub {
		width: 36.49rpx;
		height: 36.49rpx;
		margin-top: 12.35rpx;
	}

	.viewNum {
		width: 50.46rpx;
		height: 40.35rpx;
		margin-top: 10.85rpx;
	}

	.borderLine {
		border-bottom: none;
	}

	.padding-tbl {
		padding-left: 20rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
	}

	.bg-orange {
		background-color: #f37b1d;
		color: #fff;
	}

	.bg-blue {
		background-color: #0081ff;
		color: #fff;
	}

	.text-bold {
		font-weight: bold;
	}

	.huati {
		margin-left: auto;
		margin-right: 20upx;
	}

	.right {
		margin-left: 20upx;
	}

	.round {
		border-radius: 5000rpx;
	}

	.cu-tag {
		font-size: 28rpx;
		vertical-align: middle;
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		padding: 0rpx 16rpx;
		height: 48rpx;
		font-family: Helvetica Neue, Helvetica, sans-serif;
	}

	.henflex {
		display: flex;
		flex-flow: row;
	}

	.cu-tag.sm {
		font-size: 20rpx;
		padding: 0rpx 12rpx;
		height: 42rpx;
	}

	.kong {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
