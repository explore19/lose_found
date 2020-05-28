<template>
	<view>
		<view class="demo">
			<cl-message ref="message"></cl-message>
		</view>

		<van-tabs animated swipeable="true">
			<van-tab title="失物寻物">
				<view v-if="exist">
					<view @click="toPostInfo(item.post.id)" v-if="item.post.postType==0" v-for="item in data" :key="item.post.id"
					 style="margin-top: 15upx;">
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
											<text style="font-size:125%; z-index: 100;" class=" padding-lr  cuIcon-delete text-gray" @click.stop="delPost(item.post.id)"></text>
										</view>
									</view>
									<view>
										<view class="text-content" style="margin: 20upx 30upx 10upx;">
											物品名称:{{item.post.name}}
										</view>
										<view class="text-content" style="margin: 10upx 30upx;">
											物品详情:{{item.post.details}}
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
											<view class="flex">
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

				<view class=" margin-top" v-else>
					<view class="kong">
						<image src="../../static/images/空帖子.png" style="height: 1100upx;"></image>
					</view>
				</view>
			</van-tab>
			<van-tab title="拾物寻主">
				<view v-if="exist">
					<view @click="toPostInfo(item.post.id)" v-if="item.post.postType==1" v-for="item in data" :key="item.post.id"
					 style="margin-top: 15upx;">
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
											<text style="font-size:125%; z-index: 100;" class=" padding-lr  cuIcon-delete text-gray" @click.stop="delPost(item.post.id)"></text>
										</view>
									</view>
									<view>
										<view class="text-content" style="margin: 20upx 30upx 10upx;">
											物品名称:{{item.post.name}}
										</view>
										<view class="text-content" style="margin: 10upx 30upx;">
											物品详情:{{item.post.details}}
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
											<view class="flex">
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
				<view class=" margin-top" v-else>
					<view class="kong">
						<image src="../../static/images/空帖子.png" style="height: 1100upx;"></image>
					</view>
				</view>
			</van-tab>
			<van-tab title="表白墙">
				表白墙
			</van-tab>
		</van-tabs>


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
				exist: false,
				data: [],
				img: [],
				visible: true,
			}
		},
		methods: {
			toPostInfo(postId) {
				this.$global.setPostId(postId)
				uni.navigateTo({
					url: "/pages/introduction/introduction"
				})
			},
			onTap() {
				this.$refs["message"].open({
					message: "删除成功",
					style: "error",
					top: "200rpx",
					duration: 1000,
				})
			},
			requestData() {
				this.$api.queryMyPost().then(res => {

					if (res.data.length == 0) {
						this.exist = false
					} else {
						this.exist = true
						this.data = res.data
						for (var i = 0; i < res.data.length; i++) {
							if (res.data[i].post.image != null) {
								this.img = res.data[i].post.image.split("&&&")
								this.data[i].post.image = this.img[0]
							}
						}
					}
				})
			},
			perfect: function(postId) {
				this.$api.praise(postId).then((res) => {
					this.requestData()
				})
			},
			delPost: function(postId) {
				uni.showModal({
					content: '确认删除该帖子',
					cancelText: '取消',
					confirmText: '删除',
					confirmColor: '#0081FF',
					title: '提示',
					cancelColor: '#000000',
					success: res => {
						if (res.confirm) {
							this.$api.removePost(postId).then((res) => {
								this.requestData()
								this.onTap()
							})
						}
					},
				})
			},
			onTabChange(e) {
				console.log(e)
				this.postType = e.detail.name
				this.requestData()
			}
		},
		created() {
			this.requestData()
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

	.kong {

		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
