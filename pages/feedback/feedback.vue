<template>
	<view>
		<view class="demo">
			<cl-message ref="message"></cl-message>
		</view>
		<view class="padding bg-white">
			<input hidden v-model="form.author" name="author" id="author" type="text">
			<view class="text-cut padding radius bg-white" style="width:220px;">您的问题或者建议：</view>
			<textarea v-model="form.text" name="text" class="padding myStyle" type="text"placeholder="输入个人的意见反馈,字数在200字以内" maxlength="200"/>
			<view class="text-cut padding radius bg-white" style="width:220px;">您的联系方式：</view>
			<view class="padding">
				<input v-model="form.mobile" name="mobile" class="myStyle" type="text" placeholder="输入电话号码" maxlength="30"/>
			</view>
			<view class="padding">
				<input v-model="form.from" name="from" class="myStyle" type="text" placeholder="输入电子邮箱" maxlength="30"/>
			</view>
			<view class="text-cut padding radius bg-white" >留下的您的联系方式，以便我们了解问题<br>及时反馈和结果，我们会保护好您的隐私</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-cyan lg" @click="subFeedback()">提交建议</button>
			</view>
		</view>
	</view>
</template>
<script>
	var graceChecker = require("../../utils/graceChecker.js");


	export default{	
		data(){
			return{
				form:{
					author:'',
					text:'', 
					from:'', 
					mobile:'', 
					checkRes: false
				}
			}
		},
		methods:{
			doMessage() {
				var that = this
				.$refs["message"].open({
					message: "反馈成功",
					style: "success",
					top: "200rpx",
					duration: 1000,
				})
				var that = this
				setTimeout(function() {
					uni.reLaunch({
					  url: '../user/user'
					});
				}, 1300);
			},
			checkinfo: function() {
				var rule = [{
						name: "text",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "意见不能为空"
					},
					{
						name: "mobile",
						checkType: "string",
						checkRule: "11,11",
						errorMsg: "请输入正确的手机号"
					}, 
					{
						name: "from",
						checkType: "email",
						errorMsg: "请输入正确的邮箱地址"
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
			},
			subFeedback: function(){
				this.checkinfo()
				if(!this.checkRes){
					this.checkinfo()
				}
				else{
					uni.showLoading({
							mask: true,
					    title: '发送邮件中...'
					});
					this.$api.sendEmail(this.form).then(res =>{
						console.log(res)
						if(res.status === 0){
							this.form = ""
							this.doMessage();
							uni.hideLoading();
						}
					})/* .catch(resp => {
						uni.showToast({
							title: "发布失败，请稍后再试!",
							icon: "none"
						});
					}); */
				}
				
			}
		}, 
		created() {
			this.$api.getUserInfo().then(res =>{
				this.form.author=res.data.nickName
				console.log(this.form.author)
			})
		}
	}
</script>

<style>
	.myStyle{
		background-color: #F4F4F4;
	}
</style>
