
<template>
	
	<view class=" ">
		<van-cell-group>
		
			<view class="cu-form-group margin-top">
				<view class="title">学号（工号）</view>
				<input @blur="formSubmit" v-model="form.sno" name="sno"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">真实姓名</view>
				<input @blur="formSubmit" v-model="form.realname" name="realname"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">性别</view>
					<picker @change="PickerChange"  :value="index" :range="picker" >
						<view class="picker">
							{{index>-1?picker[index]:'未知'}}
						</view>
					</picker>
				</view>
			<view class="cu-form-group">
				<view class="title">联系方式</view>
				<input @blur="formSubmit" v-model="form.phone"name="tel"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">QQ</view>
				<input @blur="formSubmit" v-model="form.QQ"name="QQ"></input>
			</view>
			<van-button type="primary margin-top" size="large" @click="subInfo">提交</van-button>

		</van-cell-group>
	</view>
</template>

<script>

	var sno;
	var tel;
	var realname;
	var sex;
	var QQ;

		var  graceChecker = require("../../utils/graceChecker.js");

	export default {
			data() {
				return {
					index:-1,
					picker:['男','女'],
					form:{
						sno:'',
						phone: '',
						realname: '',
						QQ: '',
					    sex:''
					}
				
					}
			},

			methods: {
		subInfo: function() {
			
			this.$api.updateInfo(this.form).then(res=>{
				 // uni.showToast({title:"完善成功！", icon:"none"})
				 console.log(res)
								uni.navigateTo({
									url: '../index/index',
								})
							}).catch(resp => {
			　　　　						 uni.showToast({title:"修改失败，请稍后再试!", icon:"none"});
			　					　});
		},
		PickerChange(e) {
			this.index = e.detail.value
			
			if(this.picker[e.detail.value] === '男'){
				this.form.sex = '男'
			}else if(this.picker[e.detail.value]=== '女'){
				this.form.sex = '女'
			}else{
				this.form.sex = '未知'
			}
			console.log(this.form.sex)
				
		},
				formSubmit:function(){
					var rule = [
						                {name:"sno", checkType : "string", checkRule:"10",  errorMsg:"请输入正确格式的学号（工号）"},
										{name:"realname", checkType : "notnull", checkRule:"",  errorMsg:"请输入真实姓名"},
					                    {name:"realname", checkType : "string", checkRule:"2,4",  errorMsg:"请输入正确的真实姓名"},
										{name:"phone", checkType : "notnull", checkRule:"",  errorMsg:"请输入联系方式"},
					                    {name:"phone", checkType : "string", checkRule:"11",  errorMsg:"请输入正确格式的联系方式"},
										{name:"QQ", checkType : "string", checkRule:"8,11",  errorMsg:"请输入QQ号"}
										
					                ];
									var formData =this.form;
									                var checkRes = graceChecker.check(formData, rule);
									                if(checkRes){
									                    uni.showToast({title:"完善成功!", icon:"none"});
									                }else{
									                    uni.showToast({ title: graceChecker.error, icon: "none" });
									                }
									            }
									           

			
		
		
			
		}
		}
</script>

<style>
</style>
