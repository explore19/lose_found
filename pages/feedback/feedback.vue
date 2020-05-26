<template>
	<view class="">
		<view class="wux-light">Light</view>
		<view class="wux-positive--bg">Positive</view>
		<view>
			<wux-fab-button 
				position="bottomRight" 
				theme="balanced" 
				direction="circle" 
				reverse="false"
				spaceBetween="20" 
				sAngle="180" 
				eAngle="270" 
				v-bind:buttons="button" 
				@change="" 
				@click="onClick()" 
				v-bind:contact="onContact" 
				v-bind:getuserinfo="onGotUserInfo" 
			/>
		</view>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				button:[{
						// opnetype 是可以调用小程序自带的api
					    //openType: 'getUserInfo',
					    label: '消息'
					    
					},
					{
					    //openType: 'share',
					    label: '发布'
					    //icon,
					},
					{
					    //openType: 'contact',
					    label: '用户'
					    //icon,
					},     
				]
			}
		},
		methods:{
			 onClick:function(e){
				 console.log("click it ")
				 console.log(e)
				 let index = e.detail.index
				 // 获得点击按钮
				 console.log(index)
				 if (index === 0){
					 uni.switchTab ({
					 	url:"../message/message",
						success: (res) => {
							console.log("")
						}
					 })
				 }else if(index === 1){
					 uni.switchTab({
					 	url:"../announce/announce",
						success: (res) => {
							console.log("announce")
						}
					 })
				 }else if(index === 2){
					 uni.switchTab({
					 	url:"../user/user",
						success: (res) => {
							console.log("user")
						}
					 })
				 }
			 }
		}
	}
</script>

<style>
</style>
