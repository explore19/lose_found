
<template>
	
	<view class=" ">
		<van-cell-group>
		
			<view class="cu-form-group margin-top">
				<view class="title">学号（工号）</view>
				<input @blur="formSubmit" v-model="form.sno" name="sno"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">真实姓名</view>
				<input @blur="formSubmit" v-model="form.realName" name="realName"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">性别</view>
					<picker @change="PickerChange"  :value="index" :range="picker" >
						<view class="picker">
							{{picker[index]}}
						</view>
					</picker>
				</view>
			<view class="cu-form-group">
				<view class="title">联系方式</view>
				<input @blur="formSubmit" v-model="form.phone"name="tel"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">qq</view>
				<input @blur="formSubmit" v-model="form.qq"name="qq"></input>
			</view>
			<van-button type="primary margin-top" size="large" @click="subInfo">提交</van-button>

		</van-cell-group>
	</view>
</template>

<script>

		var  graceChecker = require("../../utils/graceChecker.js");

	export default {
			data() {
				return {
					index:0,
					picker:['男','女'],
					form:{
						sno:'',
						phone: '',
						realName: '',
						qq: '',
					    sex:'男',
						status:0
					}
				
					}
			},

			methods: {
		subInfo: function() {
			
			this.$api.updateInfo(this.form).then(res=>{
				wx.showModal({
				        title: '提示',
						content:"完善成功！",
						showCancel:false,
				        confirmText:'确定',
				        success(res){
						  if(res.confirm){
				           wx.switchTab({
				           	url: '../index/index',
				           })
				          }
				        }
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
				
		},
				formSubmit:function(){
					var rule = [{name:"sno", checkType : "notnull", checkRule:"",  errorMsg:"学号（工号）不能为空"},
						                {name:"sno", checkType : "string", checkRule:"10",  errorMsg:"请输入正确格式的学号（工号）"},
										{name:"realName", checkType : "notnull", checkRule:"",  errorMsg:"真实姓名不能为空"},
					                    {name:"realName", checkType : "string", checkRule:"2,4",  errorMsg:"请输入正确的真实姓名"},
										{name:"phone", checkType : "notnull", checkRule:"",  errorMsg:"联系方式不能为空"},
					                    {name:"phone", checkType : "string", checkRule:"11",  errorMsg:"请输入正确格式的联系方式"},
										{name:"qq", checkType : "string", checkRule:"6,11",  errorMsg:"请输入qq号"}
										
					                ];
									var formData =this.form;
									                var checkRes = graceChecker.check(formData, rule);
									                if(!checkRes){
									                    uni.showToast({ title: graceChecker.error, icon: "none" });
									                }
									            }									         
			
		}
		}
</script>

<style>
</style>
