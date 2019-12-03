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
		<view class="padding bg-white text-left">
			
			<view class="padding margin-top van-hairline--surround" @click="jump">我的信息</view>
			
			<view class="padding margin-top" >我的发布</view>
			
			<view class="padding margin-top" >我的回复</view>
			
			<view class="padding margin-top" >意见反馈</view>
			
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
