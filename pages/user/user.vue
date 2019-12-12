<template>
	<view class="">
		<view class="user_info">
			<view class="cu-avatar xl round margin-left" id="user_img" :style="'background-image:url('+head_portrait+');'"  ></view>
			<view class="nick_name">
				{{name}}
			</view>
			<view class="sno">
				学号：{{sno}}
			</view>
		</view>
	
	
	
		<view class="cu-list menu" :class="[true?'sm-border':'',false?'card-menu margin-top':'']">
			<view class="cu-item arrow" @click="jump">
			<view class="content">
				<text class="cuIcon-my text-grey"></text>
				<text class="text-grey">我的信息</text>
			</view>
			</view>
			<view class="cu-item arrow" @click="tapMyPost()">
			<view class="content">
				<text class="cuIcon-text text-grey"></text>
				<text class="text-grey">我的发布</text>
			</view>
			</view>
			<view class="cu-item arrow" >
			<view class="content">
				<text class="cuIcon-comment text-grey"></text>
				<text class="text-grey">我的回复</text>
			</view>
			</view>
			<view class="cu-item arrow" >
			<view class="content">
				<text class="cuIcon-service text-grey"></text>
				<text class="text-grey">意见反馈</text>
		</view>
		</view>
		</view>
	
	</view>
</template>

<script>
	export default {
		data() {
		return{
			name:"",
			sno:"",
			head_portrait:"",
		}

			},
		methods: {
			jump:function(){
				wx.navigateTo({
					url:"../user_details/user_details"
				})
			},
			tapMyPost:function(){
				wx.navigateTo({
					url:"../mypost/mypost"
				})
			},
			requestData(){
				this.$api.getUserInfo().then(res =>{
					console.log(res)
					this.name=res.data.nickName
					this.sno = res.data.sno
					this.head_portrait=res.data.headPortrait
				})
			}
		},
		created(){
			this.requestData()
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
