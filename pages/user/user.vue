<template>
	<view class="user">

		<wux-fab-button position="bottomRight" theme="balanced" direction="vertical" spaceBetween="20" sAngle="180" eAngle="270"
		 v-bind:buttons="button" @click="onClick()" v-bind:contact="onContact" v-bind:getuserinfo="onGotUserInfo" />

		<!-- 头部 -->
		<view class="user-wrap">
			<view class="setting iconfont icon31shezhi"></view>
			<view class="info">
				<image class="avatar" mode="aspectFill" v-if="UserStatus!==3" :src="head_portrait"></image>
				<view  v-if="UserStatus===3">
					<button class="cu-btn lines-white round lg"  @click="showpopup">
						立即登录
					</button>
				</view>
				
				<view class="nick_name text-xl" v-else>
					{{name?name:"未登录"}}
				</view>
				<div v-show="popup">
					
						<div class="modal-bg" >
					        <div class="modal-container">
					            <div class="modal-header" >
					               <text class="text-xl">提示</text>
					            </div>
					            <div class="modal-main">
					                <slot style="font-size: 32upx;margin: auto 0;">确认登录失物招领小程序?</slot>
					            </div>
					            <div class="modal-footer">
					                <button class="cu-btn bg-grey round lg"  @click="closepopup">
					                	取消
					                </button>
					                <button class="cu-btn bg-blue  round lg"  open-type="getUserInfo" @getuserinfo="bindGetUserInfo">
					                	确认
					                </button>
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
					<view class="status-item" hover-class="btn-hover">
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
				<view class="cell" v-for="(item, index) in userList" :key="index">
					<view class="cell-left">
						<image class="cell-icon" :src="item.icon" mode="aspectFill"></image>
						<view class="cell-text">{{ item.title }}</view>
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
						icon: "user.png",
					},
					{
						label: '我的发布',
						icon: "message.png"
					},
					{
						label: '发布',
						icon: "announce.png"
					}, {
						label: "首页",
						icon: "index.png"
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
						path: 'browse-list'
					}
				]
			};
		},
		methods: {
			// 悬浮菜单的调用的方法
			onClick: function(e) {
				console.log("click it ")
				console.log(e)
				let index = e.detail.index
				// 获得点击按钮
				console.log(index)
				if (index === 0) {
					uni.reLaunch({
						url: "../announce/announceConfession",
						success: (res) => {
							console.log("")
						}
					})
				} else if (index === 1) {
					uni.reLaunch({
						url: "../mypost/mypost",
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
			},
			 showpopup() {
			      this.popup = 1;
			    },
			    //关闭活动规则页面
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
	
	.modal-bg {
	    position: fixed;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
	    background: rgba(0,0,0,.5);
	    z-index: 10;
	}
	.modal-container {
	    background: #fff;
	    border-radius: 10px;
	    overflow: hidden;
	    position: fixed;
	    top: 50%;
	    left: 50%;
	    transform: translate(-50%,-50%);
	}
	.modal-header {
	    height: 100upx;
	    background: #409EFF;
	    color: #fff;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    cursor: move;
	}
	.modal-footer {
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    height: 90upx;
	    border-top: 6upx solid #ddd;
	}
	.modal-footer button {
	    width: 100px;
	}
	.modal-main {
	    padding: 40upx 80upx;
	}
	// //这里面可以自定义字体样式等，都是CSS基础
	// .rule {
	//   position: absolute;
	//   width: 0.82rem;
	//   height: 0.36rem;
	//   top: 0.08rem;
	//   right: 0rem;
	//   background: #353535;
	// }
	// .login {
	//   position: fixed;
	//   font-size: 24px;
	//   height: 120px;
	//   width: 200px;
	//   background-color: #ffffff;
	//   border-radius: 0.25rem;
	//   left: 50%;
	//   top: 50%;
	//   transform: translate(-50%, -50%);
	//   z-index: 1000;
	// }
	//   .over {
	//     position: fixed;
	//     width: 100%;
	//     height: 100%;
	//     opacity: 0.7;//透明度为70%
	//     filter: alpha(opacity=70);
	//     top: 0;
	//     left: 0;
	//     z-index: 999;
	//     background-color: #353535;
	//   }


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



<!-- <template>
 	<view class="">
 		<view class="user_info">
 			<view class="cu-avatar xl round " id="user_img" :style="'background-image:url('+head_portrait+');'"  ></view>
 			<view class="margin-top" v-if="UserStatus===3">
 				 <button class="cu-btn line-olive round" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" >
 		    	立即登录
 		    </button>
 			</view>
 		   
 			<view class="nick_name text-xl" v-else>
 				{{name?name:"未登录"}}
 			</view>
 		</view>
 	
 		<view class="cu-list menu sm-border">
 		<view class="cu-item arrow line"  @click="jump" >
 			<view class="content">
 				<text class="cuIcon-my text-grey"></text>
 				<text class="text-grey">我的信息</text>
 			</view>
 			</view>
 			<view class="cu-item arrow" @click="tapMyPost()">
 			<view class="content">
 				<text class="cuIcon-text text-grey"></text>
 				<text class="text-grey">我的发布</text>
 			</view>
 			</view>
 			<view @click="toMyReply" class="cu-item arrow line" >
 			<view class="content">
 				<text class="cuIcon-comment text-grey"  ></text>
 				<text class="text-grey">我的回复</text>
 			</view>
 			</view>
 			<view  @click="feedback" class="cu-item arrow line" >
 			<view class="content">
 				<text class="cuIcon-service text-grey"></text>
 				<text class="text-grey">意见反馈</text>
 		</view>
 		</view>
 		</view>
 	
 	</view>
 </template>
 
 <script>
 	export default {
 		data() {
 		return{
 			UserStatus:"",
 			name:"",
 			sno:"",
 			head_portrait:"",
 		}
 
 			},
 		methods: {
 			bindGetUserInfo(e){
 				console.log(e.mp.detail.userInfo)
 						let user_info = e.mp.detail.userInfo
 						this.$api.updateInfo({
 							headPortrait:user_info.avatarUrl,
 							nickName:user_info.nickName,
 							sex:user_info.gender,
 							status:2
 						}).then((res) =>{
 							uni.switchTab({
 								url: "/pages/user_details/user_details"
 							})
 						
 						})	
 			},
 			jump:function(){
 				wx.navigateTo({
 					url:"../user_details/user_details"
 				})
 			},
 			tapMyPost:function(){
 				wx.navigateTo({
 					url:"../mypost/mypost"
 				})
 			},
 			requestData(){
 				this.$api.getUserInfo().then(res =>{
 					console.log(res)
 					this.UserStatus=res.data.status
 					this.name=res.data.nickName
 					this.sno = res.data.sno
 					this.head_portrait=res.data.headPortrait
 				})
 			},
 			toMyReply(){
 				wx.navigateTo({
 					url:"../my_reply/my_reply"
 				})
 			},
 		
 		feedback(){
 			wx.navigateTo({
 				url:"../feedback/feedback"
 			})
 		}
 			
 		},
 		created(){
 			this.requestData()
 		}
 	}
 </script>
 
 <style>
 	*{
 		padding: 0;
 		margin: 0;
 	}
 	.user_info{
 		width: 100%;
 		height: 380upx;
 		background: #FFFFFF;
 		text-align: center;
 		vertical-align: middle;
 	}
 	#user_img{
 		margin-top: 120upx;
 		
 		/* display: inline-block;
 		vertical-align: middle; */
 	}
 	.sno,.nick_name{
 		margin-top: 15upx;
 		}
 		.line{
 			border-bottom: 1upx solid #FFFAFA;
 		}
 	/* .header {
 		position: relative;
 		background: #FDE6D2;
 
 	}
 
 	.body1 {
 		position: relative;
 		background: #FDE6D2;
 	}
 
 	.body2 {
 		position: relative;
 		background: #FDE6D2;
 	}
 
 	.body3 {
 		position: relative;
 		background: #FDE6D2;
 	}
 
 	.container {
 		height: 80%;
 		overflow: hidden;
 	}
 
 	.information {
 		line-height: 100px;
 	} */
 </style> -->
