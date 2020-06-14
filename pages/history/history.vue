<template>
	<view>
				<view v-if="exist">
					<view @click="toPostInfo(item.postid)" v-for="item in data" :key="item.postId" style="margin-top: 15upx;">
						<view style="border: #F0FFF0">
							<view class="cu-card dynamic no-card">
								<view class="cu-item shadow" >
									<view class="cu-list menu-avatar">
										<view class="borderLine" style="margin-left: 30upx; margin-top: 40upx; margin-bottom: 30upx">
											<view class="content flex-sub padding-tbl">
												<view class="henflex">
													<view v-if="item.type != 101">{{item.nickName}}</view>
													<view v-if="item.type == 101">一位路过的吃瓜群众</view>
													<view v-if="item.type != 101" class="right">
														<view class="cu-tag round bg-blue sm">已实名</view>
													</view>
													<view v-if="item.type == 101" class="right">
														<view class="cu-tag round bg-orange sm">匿名</view>
													</view>
													<view v-if="item.postType == 0" class="huati text-orange text-bold">#失物寻物#</view>
													<view v-if="item.postType == 1" class="huati text-orange text-bold">#拾物寻主#</view>
													<view v-if="item.postType == 2" class="huati text-pink text-bold">#表白墙#</view>
												</view>
												<view class="text-gray text-sm flex justify-between">
													{{item.updateTime}}
												</view>
											</view>
										</view>
									</view>
									
									<view style="margin-bottom: 30upx;"> 
										<view class="flex-sub text-left">
											<view class="text-content" style="margin: 10upx 30upx;">
												物品名称:{{item.name}}
											</view>
											<view class="text-content" style="margin: 10upx 30upx;">
												物品详情:{{item.details}}
											</view>
										</view>

										<view class="submain">
											<text class="text-gray_">{{item.praiseNumber}} 喜欢 ·</text>
											<text class="text-grey space">{{item.browsePoints}} 浏览 ·</text>
											<text class="text-grey space">{{item.replyNumber}} 评论</text>
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
	</view>

</template>

<script>
	export default {
		data() {
			return {
				exist: false,
				data: [],

			}
		},
		methods: {
			requestData: function() {
				let that = this
				uni.getStorageInfo({
					success: function(res) {
						for (let i = 0; i < res.keys.length; i++) {
							uni.getStorage({
								key: res.keys[i],
								success: function(ress) {
									that.data[i] = ress.data
									console.log(that.data[i])
									if (i === res.keys.length - 1) {
										that.exist = true
									}
								}
							});
						}
					},
				});
			},
		},
		onShow: async function(options) {
			this.requestData()
		},
		async created() {
			this.requestData()
		}
	}
</script>

<style>
	.huati {
		margin-left: auto;
		margin-right: 40upx;
	}
	
	.bg-orange {
		background-color: #f37b1d;
		color: #fff;
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
		padding: 0rpx 40rpx;
		height: 48rpx;
		font-family: Helvetica Neue, Helvetica, sans-serif;
	}


	.right {
		margin-left: 40upx;
	}

	.henflex {
		display: flex;
		flex-flow: row;
	}

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
