<template>

	<view class=" ">
		<van-cell-group>
			<view class="cu-form-group margin-top">
				<view class="title">学号（工号）</view>
				<input v-model="form.sno" name="sno"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">真实姓名</view>
				<input v-model="form.realName" name="realName"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">性别</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{picker[index]}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">联系方式</view>
				<input v-model="form.phone" name="phone"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">qq</view>
				<input v-model="form.qq" name="qq"></input>
			</view>
			<van-button type="primary margin-top" size="large" @click="subInfo">提交</van-button>
		</van-cell-group>
		
		<view class="demo">
			<cl-message ref="message"></cl-message>
		</view>
		
	</view>
</template>

<script>
	

	var graceChecker = require("../../utils/graceChecker.js");

	export default {
		data() {
			return {
				index:0,
				picker: ['男', '女'],
				form: {
					sno: '',
					phone: '',
					realname: '',
					qq: '',
					sex: '',
					status:0
				}

			}
		},

		methods: {
			doMessage() {
				var that = this
				.$refs["message"].open({
					message: "完善成功",
					style: "success",
					top: "200rpx",
					duration: 1000,
				})
				var that = this
				setTimeout(function() {
					uni.reLaunch({
					  url: '../index/index'
					});
				}, 1300);
			},
			subInfo: function() {
				this.formSubmit()
				if (!this.checkRes) {
					this.formSubmit()
				} else {
					this.$api.updateInfo(this.form).then(res => {
						this.doMessage();
						// wx.showModal({
						// 	title: '提示',
						// 	content: "完善成功！",
						// 	showCancel: false,
						// 	confirmText: '确定',
						// 	success(res) {
						// 		if (res.confirm) {
						// 			wx.reLaunch({
						// 				url: '../index/index',
						// 			})
						// 		}
						// 	}
						// })
					}).catch(resp => {
						uni.showToast({
							title: "修改失败，请稍后再试!",
							icon: "none"
						});
					});
				}
			},
			PickerChange(e) {
				this.index = e.detail.value

				if (this.picker[e.detail.value] === '男') {
					this.form.sex = '男'
				} else if (this.picker[e.detail.value] === '女') {
					this.form.sex = '女'
				} else {
					this.form.sex = '未知'
				}

			},
			formSubmit: function() {
				var rule = [{
						name: "sno",
						checkType: "string",
						checkRule: "10",
						errorMsg: "请输入正确格式的学号（工号）"
					},
					{
						name: "realName",
						checkType: "string",
						checkRule: "2,4",
						errorMsg: "请输入正确的真实姓名"
					},
					{
						name: "phone",
						checkType: "string",
						checkRule: "11",
						errorMsg: "请输入正确格式的联系方式"
					},
					{
						name: "qq",
						checkType: "string",
						checkRule: "6,11",
						errorMsg: "请输入QQ号"
					}

				];
				var formData = this.form;
				this.checkRes = graceChecker.check(formData, rule);
				if (!this.checkRes) {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			}






		}
	}
</script>

<style>
</style>
