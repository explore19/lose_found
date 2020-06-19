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
			this.$WXlogin.wxlogin()
			uni.setStorage({
				key: 'NoLongerRemind',
				data: '0',
				success: function() {
					console.log('cookie success');
				}
			});
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
