<template>
	<view>
		
		<!--悬浮菜单栏-->
		<wux-fab-button
			position="bottomRight" 
			theme="balanced" 
			direction="vertical" 
			spaceBetween="20" 
			sAngle="180" 
			eAngle="270" 
			v-bind:buttons="button" 
			@click="onClick()"
			v-bind:contact="onContact" 
			v-bind:getuserinfo="onGotUserInfo"
		/>
		
		<view class="cu-bar bg-white solid-bottom margin-top">
		    <view class="action">
		      <text class="cuIcon-title text-orange "></text> 消息列表
		    </view>
		  </view>
<view v-if="exist">
	<view class="cu-list menu-avatar comment solids-top">
				<view @click="toPostInfo(item.message.reply.postId)" class="cu-item" v-for="(item,index) in data" :key="index">
					<view class="cu-avatar round" :style="'background-image:url('+item.message.headPortrait+');'"></view>
					<view class="content">
						<view class="text-grey">{{item.message.nickName}}</view>
						<view  @click="otherReply(item.message.reply.id)" class=" text-gray text-content text-df">
							{{item.message.reply.info}}
						</view>
						<view class=" padding-sm radius margin-top-sm  text-sm" style="background: #F1F1F1;">
							<view  class="flex">
								<view v-if="item.type===0">{{item.data.details}}</view>
								<view v-if="item.type===1">我:</view>
								<view  v-if="item.type===1"  class="flex-sub">{{item.data.info}}</view>
							</view>
						</view>
						<view class="margin-top-sm flex justify-between">
							<view class="text-gray text-df">{{item.message.reply.createTime}}</view>		
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
				exist:true,
				data:[],
				// 悬浮菜单的元素的信息
				button:[{
					  label: '表白',
						icon:"user.png",
					},
					{
					  label: '我的发布',
						icon:"message.png"
					},
					{
					  label: '发布',
						icon:"announce.png"
					},{
						label:"首页",
						icon:"index.png"
					}     
				]
			};
		},
		methods:{
			requestData(){
				this.$api.getUserMessage().then(res =>{
					if(res.data.length === 0){
						this.exist = false
					}else{
						this.exist = true
						if(res.status===0){
						this.data=res.data
					}
					}
					
				})
			},
			toPostInfo(postId){
			this.$global.setPostId(postId)
			uni.navigateTo({
				url: "/pages/introduction/introduction"
			})
			},
			// 悬浮菜单的调用的方法
			onClick:function(e){
				 console.log("click it ")
				 console.log(e)
				 let index = e.detail.index
				 // 获得点击按钮
				 console.log(index)
				 if (index === 0){
					 uni.reLaunch ({
					 	url: "../announce/announceConfession",
						success: (res) => {
							console.log("")
						}
					 })
				 }else if(index === 1){
					 uni.reLaunch({
					 	url: "../mypost/mypost",
							success: (res) => {
								console.log("announce")
							}
					 })
				 }else if(index === 2){
					 uni.switchTab({
					 	url:"../announce/announce",
							success: (res) => {
								console.log("user")
							}
					 })
				 }else if(index === 3){
					 uni.switchTab({
					 	url:"../index/index",
							success: (res) => {
								console.log("index")
							}
						})
				 }
			}
		},
		created()  {   //生命周期函数
			this.requestData()
		}
	}
</script>

<style>
	
</style>
