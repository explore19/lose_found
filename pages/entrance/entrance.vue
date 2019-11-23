<template>
	<view clsss="bgd">
		<view class="bg-white flex-sub radius shadow-lg" style="height: 600rpx;">
		    <image src="https://image.weilanwl.com/gif/loading-white.gif" mode="aspectFit" class="gif-white response" style="height: 600rpx;"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				r
			};
		},
		methods:{
			
		},
		created()  {   //生命周期函数
		   wx.login({
		   	success: (res) => {
				wx.request({
					url:"http://localhost:8080/user/login?code="+res.code,
					method:'POST',
					success: (res) => {
						if(res.data.status===0){
							wx.request({
								url: "http://localhost:8080/user/get_user_info",
								method: 'GET',
								success: (res) => {
									let user = res.data.data
									if(user.status===3){          //注册后的完善信息
										wx.getUserInfo({
											success: (res) => {	
												let user_info = res.userInfo
												console.log(res)
												wx.request({
													url:'http://localhost:8080/user/update_info',
													method:'post',
													data:{
														id: user.id,
														nickName:'小黄',
														headPortrait:user_info.avatarUrl,
														sex:user_info.gender,
														realName:'黄培'
													},
													success: (res) => {
														wx.navigateTo({
															url:"../index/index"
														})
													}
												})								
											}
										})
									}else{
										wx.navigateTo({
											url:"../index/index"
										})
									}
									
								},
								
							});
							
						}
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
