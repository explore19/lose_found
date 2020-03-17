<template>
	<view class="">
		<view class="user_info">
			<view class="cu-avatar xl round " id="user_img" :style="'background-image:url('+head_portrait+');'"  ></view>
			<view class="margin-top" v-if="UserStatus===3">
				 <button class="cu-btn line-olive round" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" >
		    	立即登录
		    </button>
			</view>
		   
			<view class="nick_name text-xl" v-else>
				{{name?name:"未登录"}}
			</view>
			
		</view>
	
	
	
		<view class="cu-list menu sm-border">
		<view class="cu-item arrow line"  @click="jump" >
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
			<view @click="toMyReply" class="cu-item arrow line" >
			<view class="content">
				<text class="cuIcon-comment text-grey"  ></text>
				<text class="text-grey">我的回复</text>
			</view>
			</view>
			<view  @click="feedback"class="cu-item arrow line" >
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
			UserStatus:"",
			name:"",
			sno:"",
			head_portrait:"",
		}

			},
		methods: {
			bindGetUserInfo(e){
				console.log(e.mp.detail.userInfo)
						let user_info = e.mp.detail.userInfo
						this.$api.updateInfo({
							headPortrait:user_info.avatarUrl,
							nickName:user_info.nickName,
							sex:user_info.gender,
							status:2
						}).then((res) =>{
							uni.switchTab({
								url: "/pages/user_details/user_details"
							})
						
						})	
			},
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
					this.UserStatus=res.data.status
					this.name=res.data.nickName
					this.sno = res.data.sno
					this.head_portrait=res.data.headPortrait
				})
			},
			toMyReply(){
				wx.navigateTo({
					url:"../my_reply/my_reply"
				})
			},
		
		feedback(){
			wx.navigateTo({
				url:"../feedback/feedback"
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
		.line{
			border-bottom: 1upx solid #FFFAFA;
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
