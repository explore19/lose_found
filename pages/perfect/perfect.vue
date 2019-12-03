
<template>
	
	<view class=" ">
		<van-cell-group>
		
			<view class="cu-form-group margin-top">
				<view class="title">学号（工号）</view>
				<input v-model="form.sno" name="sno"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">真实姓名</view>
				<input v-model="form.realname" name="realname"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">性别</view>
					<input  v-model="form.sex"name="sex"></input>
					</view>
				<!-- <view>
				<view class="uni-title">性别</view>
									<radio-group class="uni-flex" name="gender">
										<label>
											<radio value="男" />男</label>
										<label>
											<radio value="女" />女</label>
									</radio-group>
								</view> -->
				
			<view class="cu-form-group">
				<view class="title">联系方式</view>
				<input  v-model="form.tel"name="tel"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">QQ</view>
				<input  v-model="form.QQ"name="QQ"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">宿舍号</view>
				<input v-model="form.housenum" name="housenum"></input>
			</view>
			<van-button type="primary" size="large" @click="formSubmit">提交</van-button>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
						<image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
		
		
			
		</van-cell-group>
	</view>
</template>

<!-- <script type="text/javascript" src="E:/小程序1/lose_found/js/jquery-3.4.1/jquery-3.4.1.js"></script> -->

<!-- <script language="javascript"> 
function test()
{ 
if(document.a.b.value.length!==11) 
{ 
alert("请输入正确的电话号码！"); 
document.a.b.focus(); 
return false; 
}
} 
<!-- </script> -->
<script>
	// new string(sno);
	// String(sno);
	var sno;
	var tel;
	var realname;
	var sex;
	var QQ;
	var housenum;
		var  graceChecker = require("../../utils/graceChecker.js");
	
	// const rules = {
	//     sno: {
	//         snorequired: true,
	//         range:[10,10],
	//     },
	//     tel: {
	//         telrequired: true,
	//         tel: true,
	//     },
	//     realname: {
	//         realnamerequired: true,
	// 		rangelength: [2, 5]
	//     },
	// 	sex: {
	// 		sexrequired: true,
	// 	},
	// 		
	// 	QQ:{
	// 		QQrequired:true,
	// 	},
	// 	housenum:{
	// 		housenumrequired:true,
	// 	},
	// }
	// const messages = {
	//     IDnumber: {
	//         required: '请输入您的学号（工号）',
	//         IDnumber: '请输入正确的学号（工号）',
	//     },
	//     tel: {
	//         required: '请输入您的手机号',
	//         tel: '请输入正确的手机号',
	//     },
	//     realname: {
	//         required: '请输入您的真实姓名',
	//         realname: '请输入正确的真实姓名',
	//     },
	// 	sex:{
	// 		required:'请输入您的性别',
	// 	},
	// 	qq:{
	// 		required:'请输入您的QQ号',
	// 	},
	// 	housenum:{
	// 		required:'请输入您的宿舍号',
	// 	},
	// }
	export default {
			data() {
				return {
					form:{
						sno:'',
						tel: '',
						realname: '',
						QQ: '',
						housenum: '',
					    sex:''
					}
				
					}
			},
			// validations: {
			//   user: {
			//     realneme: {
			//       required,
			//       rangeLength: minLength(2),
			//       rangeLength: maxLength(5)
			//     },
			//     tel: {
			//       required,
			// 	  length:length(11)
			//     },
			//     sno: {
			//       required,
			// 	  length:length(10),
			//     },
			//     sex: {
			//       required
			//     },
			//     housenum: {
			//       required
			//     },
			// 	QQ:{
			// 		required
			// 	}
			//   }
			// },
			methods: {
				// function snorequired(){
				// 	if(sno.length==0){
				// 		snorequired:false,
				// 		// this.snorequired = false;
				// 		}
				// 		}
				formSubmit:function(){
					var rule = [
					                    {name:"realname", checkType : "string", checkRule:"2,4",  errorMsg:"请输入正确的真实姓名"},
					                    {name:"sex", checkType : "in", checkRule:"男,女",  errorMsg:"请选择性别"},
					                    {name:"tel", checkType : "string", checkRule:"11",  errorMsg:"请输入正确格式的联系方式"},
										{name:"sno", checkType : "string", checkRule:"10",  errorMsg:"请输入正确格式的学号（工号）"},
										{name:"housenum", checkType : "notnull", checkRule:"",  errorMsg:"请输入宿舍号"},
										{name:"QQ", checkType : "string", checkRule:"8,11",  errorMsg:"请输入QQ号"}
					                ];
									let form = {
										realname:'adad'
										
									}
									var formData =this.form;
									
									                var checkRes = graceChecker.check(formData, rule);
									                if(checkRes){
									                    uni.showToast({title:"完善成功!", icon:"none"});
									                }else{
									                    uni.showToast({ title: graceChecker.error, icon: "none" });
									                }
									            },
									            formReset: function (e) {
									                console.log("清空数据")
									                this.chosen = ''
									            }
			// 					if (sno.required!==true) {
			// 						uni.showModal({
			// 							content: '请输入学号',
			// 							showCancel: false,
			// 							success: (res) => {
			// 								uni.switchTab({
			// 									url:'../perfect/perfect'
			// 								})
			// 							}
			// 						});
			// 					}
			// 					if (sno.length!=true) {
			// 						uni.showModal({
			// 							content: '请输入正确的学号（工号）',
			// 							showCancel: false,
			// 							success: (res) => {
			// 								uni.switchTab({
			// 									url:'../perfect/perfect'
			// 								})
			// 							}
			// 						});
			// 					}	
   //                              if (tel.required!=true) {
   //                              	uni.showModal({
   //                              		content: '请输入联系方式',
   //                              		showCancel: false,
   //                              		success: (res) => {
   //                              			uni.switchTab({
   //                              				url:'../perfect/perfect'
   //                              			})
   //                              		}
   //                              	});
   //                              }
			// 					if (tel.length!=true) {
			// 						uni.showModal({
			// 							content: '请输入正确的联系方式',
			// 							showCancel: false,
			// 							success: (res) => {
			// 								uni.switchTab({
			// 									url:'../perfect/perfect'
			// 								})
			// 							}
			// 						});
			// 					}
			// 					if (realname.required!=true) {
			// 						uni.showModal({
			// 							content: '请输入真实姓名',
			// 							showCancel: false,
			// 							success: (res) => {
			// 								uni.switchTab({
			// 									url:'../perfect/perfect'
			// 								})
			// 							}
			// 						});
			// 					}
			// 					if (realname.rangelength!=true) {
			// 						uni.showModal({
			// 							content: '请输入正确的联系方式',
			// 							showCancel: false,
			// 							success: (res) => {
			// 								uni.switchTab({
			// 									url:'../perfect/perfect'
			// 								})
			// 							}
			// 						});
			// 					}
			// 					if (sex.required!=true) {
			// 						uni.showModal({
			// 							content: '请输入性别',
			// 							showCancel: false,
			// 							success: (res) => {
			// 								uni.switchTab({
			// 									url:'../perfect/perfect'
			// 								})
			// 							}
			// 						});
			// 					}
			// 					if (housenum.required!=true) {
			// 						uni.showModal({
			// 							content: '请输入宿舍号',
			// 							showCancel: false,
			// 							success: (res) => {
			// 								uni.switchTab({
			// 									url:'../perfect/perfect'
			// 								})
			// 							}
			// 						});
			// 					}
			// 					if (QQ.required!=true) {
			// 						uni.showModal({
			// 							content: '请输入QQ号',
			// 							showCancel: false,
			// 							success: (res) => {
			// 								uni.switchTab({
			// 									url:'../perfect/perfect'
			// 								})
			// 							}
			// 						});
			// 					}
			// 	
			}
		
		
			
		}
</script>

<style>
</style>
