<template>
	<view clsss="bgd" >
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
					if(res.status===0){
						this.$api.getUserInfo().then((res)=>{
							uni.switchTab({
										url: "/pages/index/index"
									})
							// if(res.status===0){
							// 	let user = res.data
							// uni.switchTab({
							// 			url: "/pages/index/index"
							// 		})
							// }
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
