<template>
	<view clsss="bgd">
		<view class="bg-white flex-sub radius shadow-lg">
		    <image src="https://image.weilanwl.com/gif/loading-white.gif" mode="aspectFit" class="gif-white response" style="height: 600px;"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			
		},
		created()  {   //生命周期函数
		   wx.login({
		   	success: (res) => {
				this.$api.login(res.code).then((res)=>{
					console.log(res)
					if(res.status===0){
						this.$api.getUserInfo().then((res)=>{
							if(res.status===0){
								let user = res.data
								if(user.status===3){  //注册后的完善信息
									wx.getUserInfo({
										success: (res) => {	
											let user_info = res.userInfo
											this.$api.updateInfo({
												headPortrait:user_info.avatarUrl,
												nickName:user_info.nickName,
												sex:user_info.gender,
												status:2
											}).then((res) =>{
												if(res.status===0){
													wx.navigateTo({
														url:'../perfect/perfect'
													})		
												}
											
											})																	
										}
									})
								}
								
								else{
									uni.switchTab({
										url: "/pages/index/index"
									})
								}
							}
						})
					
					}
				})
		   	}
		   })
		}
	}
</script>

<style >		
	.bgd{
		background: white;
	}
	.loding{
	margin:auto 0;
	}
</style>
