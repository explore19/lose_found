<template>
	<view class="user">

		<wux-fab-button position="bottomRight" theme="balanced" direction="vertical" spaceBetween="20" sAngle="180" eAngle="270"
		 v-bind:buttons="button" @click="onClick()" v-bind:contact="onContact" v-bind:getuserinfo="onGotUserInfo" />

		<!-- 头部 -->
		<view class="user-wrap">
			<view class="setting iconfont icon31shezhi"></view>
			<view class="info">
				<image class="avatar" mode="aspectFill" v-if="UserStatus!==3" :src="head_portrait"></image>
				<view v-if="UserStatus===3">
					<button class="cu-btn lines-white round lg" @click="showpopup">
						立即登录
					</button>
				</view>

				<view class="nick_name text-xl" v-else>
					{{name?name:"未登录"}}
				</view>

				<div v-show="popup">
					<div class="uni-popup-dialog">
						<div class="uni-dialog-title">
							<text class="uni-dialog-title-text uni-popup__success">提示</text>
						</div>
						<div class="uni-dialog-content">
							<text class="uni-dialog-content-text">确认登录失物招领小程序?</text>
						</div>
						<div class="uni-dialog-button-group">
							<div class="uni-dialog-button" @click="closepopup">
								<text class="uni-dialog-button-text">取消</text>
							</div>
							<div class="uni-dialog-button uni-border-left">
								<button class="uni-dialog-button-text uni-button-color" style="background-color: #fff; width: 140px; color: #00aaff;"
								 type="default" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">确定</button>
								<!-- <text class="uni-dialog-button-text uni-button-color" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">确定</text> -->
							</div>
						</div>
					</div>
				</div>
			</view>
		</view>

		<!-- 订单状态 -->
		<view class="order-status">
			<view class="status-wrap">
				<!-- 单元格 -->
				<view class="cell">
					<view class="cell-left">
						<image class="cell-icon" src="/static/images/user/user.png" mode="aspectFill"></image>
						<view class="cell-text">个人信息</view>
					</view>
					<view class="iconfont iconmore1"></view>
				</view>

				<!-- 订单状态 -->
				<view class="status-list">
					<view class="status-item" hover-class="btn-hover" @click="jump">
						<view class="cuIcon-my text-grey item-icon"></view>
						<view class="item-text">我的信息</view>
					</view>
					<view class="status-item" hover-class="btn-hover" @click="tapMyPost()">
						<view class="cuIcon-text  item-icon"></view>
						<view class="item-text">我的发布</view>
					</view>
					<view class="status-item" hover-class="btn-hover" @click="toMyReply">
						<view class="cuIcon-comment text-grey item-icon"></view>
						<view class="item-text">我的回复</view>
					</view>
					<view class="status-item" hover-class="btn-hover" @click="goToperfect()">
						<view>
							<van-icon name="passed" size="25" color="#aaaaaa" />
						</view>
						<view class="item-text">实名认证</view>
					</view>
				</view>
			</view>
		</view>


		<!-- 滑动导航 -->
		<!-- 		<view style="border-radius: 20rpx; overflow: hidden; margin: 0 20rpx;">
 			<com-nav :list="list" :col="4"></com-nav>
 		</view> -->


		<!-- 用户功能 -->
		<view class="com-item">
			<view class="com-wrap">
				<view class="cell">
					<view class="cell-left">
						<image class="cell-icon" src="/static/images/user/icon-collect.png" mode="aspectFill"></image>
						<view class="cell-text">我的收藏</view>
					</view>
					<view class="iconfont iconmore1"></view>
				</view>
				<view class="cell" @click="toHistory">
					<view class="cell-left">
						<image class="cell-icon" src="/static/images/user/icon-foot.png" mode="aspectFill"></image>
						<view class="cell-text">我的足迹</view>
					</view>
					<view class="iconfont iconmore1"></view>
				</view>
			</view>
		</view>

		<!-- 用户服务 -->
		<view class="com-item">
			<view class="com-wrap">
				<view class="cell" @click="feedback">
					<view class="cell-left">
						<image class="cell-icon" src="/static/images/user/icon-kefu.png" mode="aspectFill"></image>
						<view class="cell-text">意见反馈</view>
					</view>
					<view class="iconfont iconmore1"></view>
				</view>
				<view class="cell">
					<view class="cell-left">
						<image class="cell-icon" src="/static/images/user/icon-help.png" mode="aspectFill"></image>
						<view class="cell-text">帮助中心</view>
					</view>
					<view class="iconfont iconmore1"></view>
				</view>
				<view class="cell">
					<view class="cell-left">
						<image class="cell-icon" src="/static/images/user/icon-about.png" mode="aspectFill"></image>
						<view class="cell-text">版本</view>
					</view>
					<view class="iconfont iconmore1"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import comNav from './components/com-nav.vue'
	export default {
		components: {
			comNav
		},
		data() {
			return {
				popup: 0,
				UserStatus: "",
				name: "",
				sno: "",
				head_portrait: "",
				// 悬浮菜单的元素的信息
				button: [{
						label: '表白',
						icon: "Confession2.png",
					},
					{
						label: '发布',
						icon: "message.png"
					}
				],
				userList: [{
						title: '我的收藏',
						icon: '/static/images/user/icon-collect.png',
						path: 'collect-list'
					},
					{
						title: '我的足迹',
						icon: '/static/images/user/icon-foot.png',
						path: '../my_history/play_history'
					}
				]
			};
		},
		methods: {
			// 悬浮菜单的调用的方法
			onClick: function(e) {
				let index = e.detail.index
				// 获得点击按钮
				if (index === 0) {
					uni.navigateTo({
						url: "../announce/announceConfession",
						success: (res) => {
						}
					})
				} else if (index === 1) {
					uni.navigateTo({
						url: "../announce/announce",
						success: (res) => {
						}
					})
				} else if (index === 2) {
					uni.switchTab({
						url: "../announce/announce",
						success: (res) => {
						}
					})
				} else if (index === 3) {
					uni.switchTab({
						url: "../index/index",
						success: (res) => {
						}
					})
				}
			},
			goToperfect: function() { //用来跳转到信息完善界面

				if (this.UserStatus === 3) {
					uni.showToast({
						title: "请您先登录再完成实名认证！",
						icon: "none"

					});
				} else {
					uni.navigateTo({
						url: '../perfect/perfect',
					})
				}

			},
			showpopup() {
				this.popup = 1;
			},
			//关闭授权弹框
			closepopup() {
				this.popup = 0;
			},
			bindGetUserInfo(e) {
				this.popup = 0;

				let user_info = e.mp.detail.userInfo
				this.$api.updateInfo({
					headPortrait: user_info.avatarUrl,
					nickName: user_info.nickName,
					sex: user_info.gender,
					status: 2
				}).then((res) => {

					uni.switchTab({
						url: "/pages/user_details/user_details"
					})
					this.requestData()
				})
			},
			jump: function() {
				wx.navigateTo({
					url: "../user_details/user_details"
				})
			},
			tapMyPost: function() {
				wx.navigateTo({
					url: "../mypost/mypost"
				})
			},
			requestData() {
				this.$api.getUserInfo().then(res => {
					console.log(res)
					this.UserStatus = res.data.status
					this.name = res.data.nickName
					this.sno = res.data.sno
					this.head_portrait = res.data.headPortrait
				})
			},
			toMyReply() {
				wx.navigateTo({
					url: "../my_reply/my_reply"
				})
			},
			feedback() {
				wx.navigateTo({
					url: "../feedback/feedback"
				})
			},
			toHistory() {
				console.log("click")
				wx.navigateTo({
					url: "../history/history"
				})
			}
		},
		created() {
			this.requestData()
		}
	};
</script>

<style lang="scss">
	page {
		background: #f2f2f2;
	}

	button::after {
		border: none;
	}

	.uni-popup-dialog {
		position:fixed;
		top:50%;
		margin-top:-100px;
		left:50%;
		margin-left:-40%;
		width: 80%;
		border-radius: 15px;
		background-color: #fff;
		/* #ifndef APP-NVUE */
		z-index: 99;
		bottom: 100;
		text-align: center;
		/* #endif */
	}

	.uni-dialog-title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		padding-top: 15px;
		padding-bottom: 5px;
	}

	.uni-dialog-title-text {
		font-size: 16px;
		font-weight: 500;
	}

	.uni-dialog-content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 5px 15px 15px 15px;
	}

	.uni-dialog-content-text {
		font-size: 14px;
		color: #6e6e6e;
	}

	.uni-dialog-button-group {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		border-top-color: #f5f5f5;
		border-top-style: solid;
		border-top-width: 1px;
	}

	.uni-dialog-button {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */

		flex: 1;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 45px;
	}

	.uni-border-left {
		border-left-color: #f0f0f0;
		border-left-style: solid;
		border-left-width: 1px;
	}

	.uni-dialog-button-text {
		font-size: 14px;
	}

	.uni-button-color {
		color: $uni-color-primary;
	}

	.uni-dialog-input {
		flex: 1;
		font-size: 14px;
	}

	.uni-popup__success {
		color: $uni-color-success;
	}

	.uni-popup__warn {
		color: $uni-color-warning;
	}

	.uni-popup__error {
		color: $uni-color-error;
	}

	.uni-popup__info {
		color: #909399;
	}

	.message-box-wrapper {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		text-align: center;
		z-index: 999;
		background-color: rgba(0, 0, 0, .3)
	}

	.message-box-wrapper::after {
		content: "";
		display: inline-block;
		height: 100%;
		width: 0;
		vertical-align: middle;
	}

	.message-box {
		display: inline-block;
		vertical-align: middle;
		position: relative;
		width: 500upx;
		height: 300upx;
		background: #ffffff;
	}

	.message-box-content {
		padding: 90upx 60upx;
	}

	.message-box-btns {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 100upx;
	}

	.message-box-cancel,
	.message-box-confirm {
		float: left;
		width: 50%;
		height: 100%;
		line-height: 100upx;
		color: #ffffff;
		border: none;
		border-radius: 0;
	}

	.message-box-cancel {
		background-color: #8f9498;
	}

	.message-box-confirm {
		background-color: #755aff;

	}



	.btn-hover {
		background: #f2f2f2 !important;
	}

	.user {
		.user-wrap {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 50vw;
			padding: 30rpx;
			z-index: 9;
			border-radius: 0 0 20% 20%;
			background: url('https://handsel.oss-cn-shenzhen.aliyuncs.com/1588938371592.jpg') no-repeat;
			background-size: cover;


			.setting {
				color: #fff;
				position: absolute;
				top: 60rpx;
				left: 60rpx;
				font-size: 50rpx;
			}

			.info {
				position: absolute;
				text-align: center;

				.avatar {
					width: 150rpx;
					height: 150rpx;
					border-radius: 50%;
				}

				.nickname {
					color: #fff;
					font-size: 28rpx;
				}
			}
		}

		.order-status {
			padding: 0 20rpx;
			margin-top: -10vw;

			.status-wrap {
				border-radius: 25rpx;
				overflow: hidden;

				.status-list {
					display: flex;
					justify-content: space-evenly;
					align-items: center;
					background: #fff;
					padding-top: 30rpx;
					padding-bottom: 30rpx;

					.status-item {
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;

						.item-icon {
							line-height: 1;
							font-size: 65rpx;
							color: #bbb;
						}

						.item-text {
							font-size: 28rpx;
							color: #666;
							margin-top: 5rpx;
						}
					}
				}
			}
		}

		.com-item {
			padding-left: 20rpx;
			padding-right: 20rpx;
			margin-top: 20rpx;

			.com-wrap {
				border-radius: 25rpx;
				overflow: hidden;
			}
		}

		.cell {
			height: 80rpx;
			padding-left: 20rpx;
			padding-right: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #fff;
			border-bottom: 1px solid #f8f8f8;

			&:active {
				background: #f2f2f2;
			}

			&:last-child {
				border-bottom: none !important;
			}

			.cell-left {
				display: flex;
				align-items: center;

				.cell-icon {
					width: 50rpx;
					height: 50rpx;
				}

				.cell-text {
					color: #666;
					font-size: 28rpx;
					margin-left: 20rpx;
				}
			}

			.iconfont {
				font-size: 40rpx;
				color: #999;
			}
		}
	}
</style>