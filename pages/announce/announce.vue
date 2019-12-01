<template>
	<view class="">
		<van-tabs animated>
			<van-tab title="我是失主" >
				<van-cell-group>


					<view class="cu-form-group margin-top">
						<view class="title">失物名称</view>
						<input v-model="form.name" name="lostname"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">丢失地点</view>
						<input v-model="form.lostPlace" name="lostplace"></input>
					</view>
					
				<view class="cu-form-group ">
					<view class="title">物品类型</view>
					<picker @change="PickerChange" :value="form.index" :range="picker">
						<view class="picker">
							{{form.index>-1?picker[form.index]:'无'}}
						</view>
					</picker>
				</view>
					
					<view class="cu-form-group">
						<view class="title">时间选择</view>
						<picker mode="time" v-model="form.time" start="09:01" end="21:01" @change="TimeChange">
							<view class="picker">
								{{form.time}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group">
						<view class="title">日期选择</view>
						<picker mode="date" v-model="form.date" start="2015-09-01" end="2020-09-01" @change="DateChange">
							<view class="picker">
								{{form.date}}
							</view>
						</picker>
					</view>


					<view class="cu-form-group">
						<view class="title">手机号码</view>
						<input  v-model="form.contact" name="contact"></input>
					</view>
					
						<view class="cu-form-group">
							<view class="title">QQ号</view>
							<input  v-model="form.QQ" name="QQ"></input>
				</view>
					<view class="cu-form-group align-start">
						<view class="title">失物详情</view>
						<textarea maxlength="-1"  v-model="form.details" @input="textareaAInput" name="details"></textarea>
					</view>
					<view class="cu-bar bg-white margin-top">
						<view class="action">
							图片上传
						</view>
						<view class="action">
							{{form.imgList.length}}/4
						</view>
					</view>
					<view class="cu-form-group">
						<view class="grid col-4 grid-square flex-sub">
							<view class="bg-img" v-for="(item,index) in form.imgList" :key="index" @tap="ViewImage" :data-url="form.imgList[index]">
								<image :src="form.imgList[index]" mode="aspectFill"></image>
								<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
									<text class='cuIcon-close'></text>
								</view>
							</view>
							<view class="solids" @tap="ChooseImage" v-if="form.imgList.length<4">
								<text class='cuIcon-cameraadd'></text>
							</view>
						</view>
					</view>


					</van-popup>


					<van-button type="primary" size="large" @click="subInfo()">发布</van-button>
				</van-cell-group>

			</van-tab>
			<van-tab title="我是拾主" >


				<van-cell-group>

					<view class="cu-form-group margin-top">
						<view class="title">拾物名称</view>
						<input v-model="form.name" name="findname"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">拾到地点</view>
						<input v-model="form.findPlace" name="findpalce"></input>
					</view>
					
				<view class="cu-form-group ">
					<view class="title">物品类型</view>
					<picker @change="PickerChange" :value="form.index" :range="picker">
						<view class="picker">
							{{form.index>-1?picker[form.index]:'无'}}
						</view>
					</picker>
				</view>
					
					<view class="cu-form-group">
						<view class="title">时间选择</view>
						<picker mode="time" v-model="form.time" start="09:01" end="21:01" @change="TimeChange">
							<view class="picker">
								{{form.time}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group">
						<view class="title">日期选择</view>
						<picker mode="date" v-model="form.date" start="2015-09-01" end="2020-09-01" @change="DateChange">
							<view class="picker">
								{{form.date}}
							</view>
						</picker>
					</view>


					<view class="cu-form-group">
						<view class="title">手机号码</view>
						<input name="contact" v-model="form.contact" ></input>

					</view>

						
						<view class="cu-form-group align-start">
							<view class="title">拾物详情</view>
							<textarea maxlength="-1" :disabled="modalName!=null" v-model="form.details" @input="textareaBInput"></textarea>
						</view>
						<view class="cu-bar bg-white margin-top">
							<view class="action">
								图片上传
							</view>
							<view class="action">
								{{form.imgList.length}}/4
							</view>
						</view>
						<view class="cu-form-group">
							<view class="grid col-4 grid-square flex-sub">
								<view class="bg-img" v-for="(item,index) in form.imgList" :key="index" @tap="ViewImage" :data-url="form.imgList[index]">
									<image :src="form.imgList[index]" mode="aspectFill"></image>
									<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
										<text class='cuIcon-close'></text>
									</view>
								</view>
								<view class="solids" @tap="ChooseImage" v-if="form.imgList.length<4">
									<text class='cuIcon-cameraadd'></text>
								</view>
							</view>
						</view>


									</van-popup>


						<van-button type="primary" size="large" @click="subInfo()">发布</van-button>
				</van-cell-group>


			</van-tab>
		</van-tabs>
	</view>



</template>

<script>
	var  graceChecker = require("E:/小程序2/lose_found/utils/graceChecker.js");
	export default {
		data() {
			return {
				// lostname:''
				picker: ['手表', '钥匙', '校园卡','银行卡','耳机','钱包'],
				
				textareaAValue: '',
				form: {
					lostname: "",
					lostPlace: '',
					index: -1,
					loseTime:this.date+" "+this.time+":00",
					details:'',
					contact: '',
					time: '12:01',
					date: '2015-09-01',
					imgList: [],
					postType:''
				}

			}
		},
		methods: {
			subInfo:function(){
				var rule = [
				                    {name:"lostname", checkType : "notnull", checkRule:"",  errorMsg:"请输入失物名称"},
				                    {name:"contact", checkType : "string", checkRule:"11",  errorMsg:"请输入正确格式的联系方式"},
									{name:"findname", checkType : "notnull", checkRule:"",  errorMsg:"请输入拾物名称"},
									{name:"QQ", checkType : "string", checkRule:"6,11",  errorMsg:"请输入QQ号"}
				                ];
								let form = {
									lostname:'小黄的女朋友',
									findname:'小黄的未来女朋友',
									contact:'13643662891',
									QQ:'695489479'
									
									
								}
								var formData =this.form;
								
								                var checkRes = graceChecker.check(formData, rule);
								                if(checkRes){
								                    uni.showToast({title:"发布成功!", icon:"none"});
								                }else{
								                    uni.showToast({ title: graceChecker.error, icon: "none" });
								                }
								            },
			onClick(event) {
				wx.showToast({
					title: `点击标签 ${event.detail.name}`,
					icon: 'none'
				});
			},

			TimeChange(e) {
				this.form.time = e.detail.value
			},
			DateChange(e) {
				this.form.date = e.detail.value
			},
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType:["compressed"],
					success: (res) => {
						console.log(res)
						  const tempFilePaths = res.tempFilePaths
						uni.uploadFile({
							url:"http:localhost:8888/upload/img",
							filePath:tempFilePaths[0],
							name:"img",
							fileType:"image",
							// files:res.tempFiles,
							success:(uploadFileRes) => {
								let data=JSON.parse(uploadFileRes.data)
								console.log(data.status)
								if(data.status === 0){
									this.form.imgList.push("http://localhost:8888/img/"+data.data)
								}else{
									
								}						
							}						
						})
					}
				});
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			textareaBInput(e) {
				this.textareaBValue = e.detail.value
			},
			DelImg(e) {
				uni.showModal({

					content: '要删除这张照片吗？',
					cancelText: '取消',
					confirmText: '删除',
					success: res => {
						if (res.confirm) {
							this.form.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			PickerChange(e) {
				this.form.index = e.detail.value
			},

// 			subInfo: function() {
// 			// 	this.$api.addPost(this.form).then(res => {
// 			// 			uni.showModal({
// 			// 				content: '发表成功',
// 			// 				showCancel: false,
// 			// 			});
// 			// 			
// 			// 	})
// 			// }
// 
// 		}

	},
	
		
	}
</script>

<style>
</style>
