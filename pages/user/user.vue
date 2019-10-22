<template>
	<view>
		
	<view class="container">
		
	</view>
	<view class="header">
		<van-card
		:thumb="imageURL">
		 <view slot="desc" class="information">
		     1700300655户就
		   </view>
		 </van-card>
	</view>
	<view class="body1">
		<van-cell title="我的发布" />
	</view>
	<view class="body2">
		<van-cell title="我的回复" />
	</view>
	<view class="body3">
		<van-cell title="意见反馈" />
	</view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageURL:'/static/images/头像.jpg'
				 
				}
		},
		methods: {

	},
	}
</script>

<style>
	.header{
		position: relative;
		background: #FDE6D2;
		
	}
	.body1{
		position: relative;
		background: #FDE6D2;
	}
	.body2{
		position: relative;
		background: #FDE6D2;
	}.body3{
		position: relative;
		background: #FDE6D2;
	}
	.container{
		height: 80%;
		overflow: hidden;
	}
	.information{
		line-height: 100px;
	}
</style>

