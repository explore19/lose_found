<template>
	<!-- <view>

		<view class="container">

		</view>
		<view class="header">
			<van-card :thumb="imageURL">
				<view slot="desc" class="information">


					学号：1700300655
					姓名：小黄


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

	</view> -->
	<view class="">
		
	
	<view class="user_info">
		<view class="cu-avatar xl round margin-left" id="user_img" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);"></view>
		<view class="nick_name">
			{{name}}
		</view>
		<view class="sno">
			学号：{{sno}}
			
		</view>
	</view>
	<view class="padding bg-white text-left">
		
		<view class="padding margin-top" :class="size?'solids-bottom':'solid-bottom'">我的发布</view>
		
		<view class="padding margin-top" :class="size?'solids-bottom':'solid-bottom'">我的回复</view>
		
		<view class="padding margin-top" >意见反馈</view>
		
	</view>
	</view>
	
	
	
	
	
</template>

<script>
	export default {
		data() {
		return{
			name:"小黄",
			sno:1700300616
			
		}

			},
		
		methods: {

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
</style>
