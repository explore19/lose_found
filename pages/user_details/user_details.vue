<template>
	<view>
		<view v-if="seen">
			<view class="cu-bar bg-white">
				<view class="action" @click="tap">
					<text class="cuIcon-back text-gray"></text> 返回
				</view>
				<view class="content text-bold">
					个人信息
				</view>
			</view>
			
				<!-- <van-cell title="头像" v-model="head" value="" border="true" /> -->
				<view v-model="head" class="cu-avatar xl round margin-right" id="user_img" :style="'background-image:url('+head+');'"  />
			<van-cell-group>
				<van-cell title="昵称" v-model="nick" value="" border="true"/>
				<van-cell title="学号" v-model="sno" value="" border="true" />
				<van-cell title="真实姓名" v-model="realName" value="" border="true" />
				<van-cell title="性别" v-model="gender" value="" border="true" />
				<van-cell title="手机号" v-model="phone" value="" border="true" />
				<van-button type="primary" size="large" @click="Edit1">修改信息</van-button>
			</van-cell-group>
		</view>
		<view v-if="look">
			<view class="cu-bar bg-white">
				<view class="action" @click="tap">
					<text class="cuIcon-back text-gray"></text> 返回
				</view>
				<view class="content text-bold">
					修改个人信息
				</view>
			</view>
			<van-cell-group>
				<van-field label="头像" value="heady" border="false"/>
				<van-field label="昵称" value="nicky" border="false"/>
				<van-field label="学号" value="snoy" border="false"/>
				<van-field label="真实姓名" value="realNamey" border="false"/>
				<van-field label="性别" value="gendery" border="false"/>
				<van-field label="手机号" value="phoney" border="false"/>
				<van-button type="primary" size="large" @click="Edit2" >保存信息</van-button>
			</van-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//个人的数据
				head: "",
				nick: "",
				sno: "",
				realName: "",
				gender: "",
				phone: "",
				// 修改界面的数据
				heady: "",
				nicky: "",
				snoy: "",
				realNamey: "",
				gendery: "",
				phoney: "",
				seen: true,
				look: false
			}
		},
		methods: {
			tap: function() {
				wx.navigateBack({})
			},
			requestData() {
				this.$api.getUserInfo().then(res => {
					this.head = res.data.headPortrait;
					this.nick = res.data.nickName;
					this.sno = res.data.sno;
					this.realName = res.data.realName;
					if (res.data.sex == 1) {
						this.gender = "男"
					} else if (res.data.sex == 2) {
						this.gender = "女"
					}else{
						this.gender = "未知"
					}
					this.phone = res.data.phone;
				})
			},
			Edit1: function() {
				this.seen = false;
				this.look = true;
				
			},
			
	
			Edit2:function(){									
				this.$api.updateInfo({
				headPortrait : this.heady,
				nickName : this.nicky,
				sno:this.snoy,
				realName:this.realNamey,
				sex:this.gendery,
				phone:this.phoney						
			}).then(res=>{
					console.log(res)
				})
				this.seen = true
				this.look = false
			}


		},
		created() {
			this.requestData()
		}
		
		

	}
	
</script>

<style>

</style>
