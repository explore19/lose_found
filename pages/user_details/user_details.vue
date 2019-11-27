<template>
	<view>
		<view class="cu-bar bg-white">
			<view class="action" @click="tap">
				<text class="cuIcon-back text-gray"></text> 返回
			</view>
			<view class="content text-bold">
				个人信息
			</view>
		</view>
		<van-cell-group>
			<van-cell title="头像" value="" border="true">
				
			</van-cell>
			<van-cell title="昵称" v-model="nick" value="" border="true" />
			<van-cell title="学号" v-model="sno" value="" border="true" />
			<van-cell title="真实姓名" v-model="realName" value="" border="true" />
			<van-cell title="性别" v-model="gender" value="" border="true" />
			<van-cell title="手机号" v-model="phone" value="" border="true" />
		</van-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				head: "",
				nick: "",
				sno: "",
				realName: "",
				gender: "",
				phone: ""
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
					} else {
						this.gender = "未知"
					}
					this.phone = res.data.phone;
				})
			}
		},
		created() {
			this.requestData()
		}
	}
</script>

<style>

</style>
