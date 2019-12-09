<template>
	<view>
		<view v-if="seen">
		<view class="cu-form-group " style="height: 180rpx;">
			<view class="title">头像</view>
			<view class="cu-avatar xl radius margin-left" :style="'background-image:url('+form.headPortrait+');'"></view>
		</view>
		
			<van-cell-group>
				<view class="cu-form-group " >
					<view class="title">昵称</view>
					<input v-model="form.nickName" disabled="true" style="text-align: right;" name="realName"></input>
				</view>
				
				<view class="cu-form-group ">
					<view class="title">学号</view>
					<input v-model="form.sno" name="sno" disabled="true" style="text-align: right;"></input>
				</view>
				<view class="cu-form-group  ">
					<view class="title">真实姓名</view>
					<input v-model="form.realName" disabled="true" name="realName" style="text-align: right;"></input>
				</view>
				<view class="cu-form-group  ">
					<view class="title">性别</view>
					<input v-model="form.sex" disabled="true" style="text-align: right;"></input>
				</view>
				<view class="cu-form-group  ">
					<view class="title">QQ</view>
					<input v-model="form.qq" disabled="true" style="text-align: right;"></input>
				</view>
				<view class="cu-form-group ">
					<view class="title">手机号</view>
					<input v-model="form.phone" disabled="true" style="text-align: right;"></input>
				</view>
				

				<van-button type="primary" size="large" @click="Edit1">修改信息</van-button> 
			</van-cell-group>
		</view>
		
		<view v-if="look">
			<van-cell-group>
				<view class="cu-form-group " style="height: 180rpx;" @tap="ChooseImage">
					<view class="title">头像</view>
					<view class="cu-avatar xl radius margin-left" :style="'background-image:url('+form.headPortrait+');'"></view>
				</view>
				<view class="cu-form-group ">
					<view class="title">昵称</view>
					
					<input v-model="form.nickName" name="nickName" ></input>
				</view>
				
				<view class="cu-form-group ">
					<view class="title">学号</view>
					<input v-model="form.sno" name="sno" ></input>
				</view>
				<view class="cu-form-group  ">
					<view class="title">真实姓名</view>
					<input v-model="form.realName" name="realName" ></input>
				</view>
				<view class="cu-form-group">
					<view class="title">性别</view>
					<picker @change="PickerChange" :value="index" :range="picker">
						<view class="picker">
							{{index>-1?picker[index]:'男'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group  ">
					<view class="title">QQ</view>
					<input v-model="form.qq"name="QQ" ></input>
				</view>
				<view class="cu-form-group ">
					<view class="title">手机号</view>
					<input v-model="form.phone" name="tel"></input>
				</view>
				<van-button type="primary" size="large" @click="Edit2" >保存信息</van-button>
			</van-cell-group>
		</view>
	</view>
</template>

<script>
	var  graceChecker = require("../../utils/graceChecker.js");
	export default {
		data() {
			return {
				//个人的数据
				index:-1,
				picker:['男','女'],
				form:{
				headPortrait: "",
				nickName: "",
				sno: "",
				realName:"",
				sex: "",
				phone: "",
				qq:""
				},
				seen: true,
				look: false
			}
		},
		methods: {
			formSubmit:function(){
				var rule = [
					                {name:"nickName", checkType : "notnull", checkRule:"",  errorMsg:"请输入需要修改的昵称"},
					                {name:"sno", checkType : "string", checkRule:"10",  errorMsg:"请输入正确格式的学号（工号）"},
									{name:"realName", checkType : "notnull", checkRule:"",  errorMsg:"请输入真实姓名"},
				                    {name:"realName", checkType : "string", checkRule:"2,4",  errorMsg:"请输入正确的真实姓名"},
									{name:"QQ", checkType : "notnull", checkRule:"",  errorMsg:"请输入QQ号"},
									{name:"QQ", checkType : "string", checkRule:"8,11",  errorMsg:"请输入正确格式的QQ号"},
									{name:"tel", checkType : "notnull", checkRule:"",  errorMsg:"请输入联系方式"},
				                    {name:"tel", checkType : "string", checkRule:"11",  errorMsg:"请输入正确格式的联系方式"},
									{name:"housenum", checkType : "notnull", checkRule:"",  errorMsg:"请输入宿舍号"}
									
				                ];
								let form = {
									realname:'adad'
									
								}
								var formData =this.form;
								
								                var checkRes = graceChecker.check(formData, rule);
								                if(checkRes){
								                    uni.showToast({title:"修改成功!", icon:"none"});
								                }else{
								                    uni.showToast({ title: graceChecker.error, icon: "none" });
								                }
								            },
			tap: function() {
				wx.navigateBack({})
			},
			requestData() {
				this.$api.getUserInfo().then(res => {
					
					this.form.headPortrait = res.data.headPortrait;
					this.form.nickName = res.data.nickName;
					this.form.sno = res.data.sno;
					this.form.realName = res.data.realName;
					if (res.data.sex == 1) {
						this.form.sex = "男"
					} else if (res.data.sex == 2) {
						this.form.sex = "女"
					}else{
						this.form.sex = "未知"
					}
					this.form.phone = res.data.phone;
					this.form.qq = res.data.qq
					
				})
			},
			PickerChange(e) {
				this.index = e.detail.value
			},
			Edit1: function() {
				this.seen = false;
				this.look = true;
				
			},
			ChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ["compressed"],
					success: (res) => {
						
						const tempFilePaths = res.tempFilePaths
						uni.uploadFile({
							url: "http:localhost:8888/upload/img",
							filePath: tempFilePaths[0],
							name: "img",
							fileType: "image",
							// files:res.tempFiles,
							success: (uploadFileRes) => {
								let data = JSON.parse(uploadFileRes.data)
								console.log(uploadFileRes)
								if (data.status === 0) {
									this.form.headPortrait = "http://localhost:8888/img/" + data.data
								} else {
			
								}
							}
						})
					}
				});
			},
			
	
			Edit2:function(){									
				this.$api.updateInfo(this.form).then(res=>{
					
					// uni.navigateTo({
					// 	url: './user_details',
					// });
					
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
