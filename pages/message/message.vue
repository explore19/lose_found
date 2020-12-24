<template>
	<view>

		<!--悬浮菜单栏-->
		<wux-fab-button position="bottomRight" theme="balanced" direction="vertical" spaceBetween="20" sAngle="180" eAngle="270"
		 v-bind:buttons="button" @click="onClick()" v-bind:contact="onContact" v-bind:getuserinfo="onGotUserInfo" />
		 
		<view v-if="disreadMessageCounts != 0">
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 最新 ·
				</view>
			</view>
			<view v-if="exist">
				<view class="cu-list menu-avatar comment solids-top">
					<view @click="toPostInfo(item.message.reply.postId)" class="cu-item" v-for="(item,index) in data" :key="index"
					 v-if="item.message.reply.isRead === 0">
						<view class="cu-avatar round" :style="'background-image:url('+item.message.headPortrait+');'"></view>
						<view class="content">
							<view class="text-grey" style="white-space: pre;">
								{{item.message.nickName }}
								<text v-if="item.type===0">: 评论了你的贴子</text>
								<text v-if="item.type===1">: 回复了你的评论</text>
							</view>
							<view @click="otherReply(item.message.reply.id)" class=" text-gray text-content text-df">
								{{item.message.reply.info}}
							</view>
							<view class=" padding-sm radius margin-top-sm  text-sm" style="background: #F1F1F1;">
								<view class="flex">
									<view v-if="item.type===0">{{item.data.details}}</view>
									<view v-if="item.type===1">我:</view>
									<view v-if="item.type===1" class="flex-sub">{{item.data.info}}</view>
								</view>
							</view>
							<view class="margin-top-sm flex justify-between">
								<view class="text-gray text-df">{{item.message.reply.createTime}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view v-if="exist">
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 以往 ·
				</view>
			</view>
			<view v-if="exist">
				<view class="cu-list menu-avatar comment solids-top">
					<view @click="toPostInfo(item.message.reply.postId)" class="cu-item" v-for="(item,index) in data" :key="index"
					 v-if="item.message.reply.isRead != 0">
						<view class="cu-avatar round" :style="'background-image:url('+item.message.headPortrait+');'"></view>
						<view class="content">
							<view class="text-grey" style="white-space: pre;">
								{{item.message.nickName }}
								<text v-if="item.type===0">: 评论了你的贴子</text>
								<text v-if="item.type===1">: 回复了你的评论</text>
							</view>
							<view @click="otherReply(item.message.reply.id)" class=" text-gray text-content text-df">
								{{item.message.reply.info}}
							</view>
							<view class=" padding-sm radius margin-top-sm  text-sm" style="background: #F1F1F1;">
								<view class="flex">
									<view v-if="item.type===0">{{item.data.details}}</view>
									<view v-if="item.type===1">我:</view>
									<view v-if="item.type===1" class="flex-sub">{{item.data.info}}</view>
								</view>
							</view>
							<view class="margin-top-sm flex justify-between">
								<view class="text-gray text-df">{{item.message.reply.createTime}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="text-gray text-xl text-center padding margin-top" v-else>
			<text class="cuIcon-emoji margin-lr-ms">您没有回复的消息哦</text>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				exist: true,
				data: [],
				disreadMessageCounts: 0,
				// 悬浮菜单的元素的信息
				button: [
					// {
					// 	label: '表白',
					// 	icon: "Confession2.png",
					// },
					{
						label: '发布',
						icon: "message.png"
					}
				]
			};
		},
		methods: {
			requestData() {
				this.$api.getUserMessage().then(res => {
					console.log(res.data)
					if (res.data.length === 0) {
						this.exist = false
					} else {
						this.exist = true
						if (res.status === 0) {
							this.data = res.data
						}
					}
				})
			},
			toPostInfo(postId) {
				this.$global.setPostId(postId)
				uni.navigateTo({
					url: "/pages/introduction/introduction"
				})
			},
			// 悬浮菜单的调用的方法
			onClick: function(e) {
				console.log("click it ")
				console.log(e)
				let index = e.detail.index
				// 获得点击按钮
				console.log(index)
				if (index === 0) {
					uni.navigateTo({
						url: "../announce/announce",
						success: (res) => {
							console.log("")
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
					uni.navigateTo({
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
		created() { //生命周期函数
			// uni.$on('refreshCounts', function(data) {
			// 	console.log('监听到事件来自 update ，携带参数 msg 为：' + data.disreadMessageCounts);
			// 	this.disreadMessageCounts = data.disreadMessageCounts
			// 	console.log(this.disreadMessageCounts)
			// })
			// this.$api.getDisreadMessageCounts().then((res) => {
			// 	this.disreadMessageCounts = res.data
			// })
		},
		onShow: function(options) {
			this.requestData()
			this.$api.getDisreadMessageCounts().then((res) => {
				this.disreadMessageCounts = res.data
			})
		},
		onHide: function(options) {
			this.$api.updateDisreadMessage().then((res) => {
				this.disreadMessageCounts = 0
				// uni.setTabBarBadge({
				// 	index: 1,
				// 	text: this.disreadMessageCounts + ''
				// });
				wx.removeTabBarBadge({
					index: 1,
				})
			})
		},
	}
</script>

<style>

</style>
