<template>
	<view clsss="bgd" v-if="show">
		<view class="bg-white flex-sub radius shadow-lg">
		    <image src="https://image.weilanwl.com/gif/loading-white.gif" mode="aspectFit" class="gif-white response" style="height: 600px;"></image>
		</view>
	</view>
	<view class="padding" v-else>
		<button class="cu-btn block bg-blue margin-tb-sm lg" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">获取用户基本信息</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			show:true
			};
		},
		methods:{
			bindGetUserInfo(e){
						let user_info = e.mp.detail.userInfo
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
								this.show = false
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
