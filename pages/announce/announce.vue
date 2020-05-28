<template>
	<view class="">
		
		<!--悬浮菜单栏-->
		<wux-fab-button
			position="bottomRight" 
			theme="balanced" 
			direction="vertical" 
			spaceBetween="20" 
			sAngle="180" 
			eAngle="270" 
			v-bind:buttons="button" 
			@change="" 
			@click="ClickChange()"
			v-bind:contact="onContact" 
			v-bind:getuserinfo="onGotUserInfo"
		/>
		
		<van-tabs animated :active=" form.postType " @change="onChange" swipeable="true">
			<van-tab title="我是失主">
				<van-cell-group>


					<view class="cu-form-group margin-top">
						<view class="title">失物名称</view>
						<input v-model="form.name" name="name"  style="text-align: right;" placeholder="例如: 一卡通(必填)"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">丢失地点</view>
						<input v-model="form.lostPlace" name="lostplace" style="text-align: right;" placeholder="例如: 中央食堂(选填) "></input>
					</view>

					<view class="cu-form-group ">
						<view class="title">物品类型</view>
						<picker @change="PickerChange" :value="pickerIndex" :range="picker" range-key="name">
							<view class="picker">
								{{picker[pickerIndex].name}}
							</view>
						</picker>
					</view>

					<view class="cu-form-group">
						<view class="title">时间选择</view>
						<picker mode="time" v-model="time" start="00:00" end="23:59" @change="TimeChange">
							<view class="picker">
								{{time}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group">
						<view class="title">日期选择</view>
						<picker mode="date" v-model="date" start="2015-09-01" end="2100-01-10" @change="DateChange">
							<view class="picker">
								{{date}}
							</view>
						</picker>
					</view>


					<view class="cu-form-group">
						<view class="title">手机号码</view>
						<input v-model="form.contact" name="contact" style="text-align: right;" placeholder="(选填)"></input>
					</view>

					<view class="cu-form-group">
						<view class="title">QQ号</view>
						<input v-model="form.QQ" name="QQ" style="text-align: right;" placeholder="(必填)"></input>
					</view>
					<view class="cu-form-group align-start">
						<view class="title">失物详情</view>
						<textarea maxlength="-1" v-model="form.details" @input="textareaAInput"  name="details" 
						></textarea>
					</view>
					<view class="cu-bar bg-white margin-top">
						<view class="action">
							图片上传
						</view>
						<view class="action">
							{{imgList.length}}/4
						</view>
					</view>
					
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

<view class="margin-top">
	<van-button  type="primary" size="large" @click="subInfo()">发布</van-button>
</view>
					
				</van-cell-group>

			</van-tab>
			<van-tab title="我是拾主">


				<van-cell-group>

					<view class="cu-form-group margin-top">
						<view class="title">拾物名称</view>
						<input v-model="form.name" name="name"  style="text-align: right;" placeholder="例如: 一卡通(必填)"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">拾到地点</view>
						<input v-model="form.lostPlace" name="lostPlace" style="text-align: right;" placeholder="例如: 中央食堂(选填) "></input>
					</view>
					<view class="cu-form-group ">
						<view class="title">物品类型</view>
						<picker @change="PickerChange" :value="pickerIndex" :range="picker" range-key="name" >
							<view class="picker">
								{{picker[pickerIndex].name}}
							</view>
						</picker>
					</view>


					<view class="cu-form-group">
						<view class="title">时间选择</view>
						<picker mode="time" v-model="time" start="00:00" end="23:59" @change="TimeChange">
							<view class="picker">
								{{time}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group">
						<view class="title">日期选择</view> 
						<picker mode="date" v-model="date" start="2015-09-01" end="2100-01-10" @change="DateChange">
							<view class="picker">
								{{date}}
							</view>
						</picker>
					</view>


					<view class="cu-form-group">
						<view class="title">手机号码</view>
						<input name="contact" v-model="form.contact"  style="text-align: right;" placeholder="(选填)"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">QQ号</view>
						<input v-model="form.QQ" name="QQ" style="text-align: right;" placeholder="(必填)"></input>
					</view>



					<view class="cu-form-group align-start">
						<view class="title">拾物详情</view>
						<textarea maxlength="-1" :disabled="modalName!=null"  v-model="form.details" @input="textareaBInput" ></textarea>
					</view>
					<view class="cu-bar bg-white margin-top">
						<view class="action">
							图片上传
						</view>
						<view class="action">
							{{imgList.length}}/4
						</view>
					</view>
					
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
					
					<view class="margin-top">
						<van-button type="primary" size="large" @click="subInfo() ">发布</van-button>
					</view>
					
				</van-cell-group>


			</van-tab>
		</van-tabs>
	</view>



</template>

<script>
	var graceChecker = require("../../utils/graceChecker.js");
	var dateUtil = require("../../utils/dateUtil.js");
	
	export default {
		data() {
			return {
				picker: [],
				time: dateUtil.getTime(),
				date: dateUtil.getDate(),
				textareaAValue: '',
				imgList: [],
				pickerIndex: 0,
				form: {
					name: "",
					lostPlace: '',
					type: 1,
					loseTime: '',
					details: '',
					QQ: '',
					image: [],
					postType: 0,
					checkRes:false
				},
				// 悬浮菜单的元素的信息
				button:[{
					  label: '寻人',
						icon:"user.png",
					},
					{
					  label: '我的发布',
						icon:"message.png"
					},
					{
					  label: '发布',
						icon:"announce.png"
					},{
						label:"首页",
						icon:"index.png"
					}     
				]

			}
		},
		methods: {
			// 悬浮菜单的调用的方法
			ClickChange:function(e){
				 console.log("click it ")
				 console.log(e)
				 let index = e.detail.index
				 // 获得点击按钮
				 console.log(index)
				 if (index === 0){
					 uni.reLaunch ({
					 	url: "../announce/announceConfession",
						success: (res) => {
							console.log("")
						}
					 })
				 }else if(index === 1){
					 uni.reLaunch({
					 	url: "../mypost/mypost",
							success: (res) => {
								console.log("announce")
							}
					 })
				 }else if(index === 2){
					 uni.switchTab({
					 	url:"../announce/announce",
							success: (res) => {
								console.log("user")
							}
					 })
				 }else if(index === 3){
					 uni.switchTab({
					 	url:"../index/index",
							success: (res) => {
								console.log("index")
							}
						})
				 }
			},
			checkinfo: function() {
				var rule = [{
						name: "name",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "名称不能为空"
					},
					{
						name: "details",
						checkType: "string",
						checkRule: "5,60",
						errorMsg: "详情不能少于5个字，不能大于60字"
					},
					{
						name: "QQ",
						checkType: "string",
						checkRule: "5,11",
						errorMsg: "请输入正确的QQ号"
					}
				];
				var formData = this.form;
				this.checkRes = graceChecker.check(formData, rule);
				if (!this.checkRes) {
					uni.showToast({
						title: graceChecker.error,
						icon:"none"
					});
				} 
			},
			onClick(event) {
				wx.showToast({
					title: `点击标签 ${event.detail.name}`,
					icon: 'none'
				});
			},

			TimeChange(e) {
				this.time = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ["compressed"],
					success: (res) => {
						const tempFilePaths = res.tempFilePaths
						for (var i = 0; i < tempFilePaths.length; i++) {
							this.$api.uploadImage(tempFilePaths[i]).then(resp => {
										let res = JSON.parse(resp)
										if (res.status === 0) {
											this.imgList.push(this.$request.getbaseUrl() + "/img/" + res.data)
										} 
							})

						}
					
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
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			PickerChange(e) {
				this.pickerIndex = e.detail.value
				if(this.picker[e.detail.value].id === -1){
					this.form.type = null
				}else{
					this.form.type = this.picker[e.detail.value].id
				}
				
				
			},
			onChange(event) {
				this.form.postType = event.detail.name
			},

			subInfo: function() {
				this.checkinfo()
				if(!this.checkRes){
					this.checkinfo()
				}
				else{
					this.form.loseTime = this.date + " " + this.time + ":00"
					if(this.imgList.length==0){
						this.form.image = null
					}else{
						let  image = ""
						for (let i = 0; i < this.imgList.length; i++) {
					if (i === this.imgList.length - 1) {
						image += this.imgList[i]
						continue
					}
					image += this.imgList[i] + '&&&'
				}
				this.form.image = image
					}
				
				
				this.$api.addPost(this.form).then(res => {
					console.log(res)
					if(res.status===1){
						wx.showModal({
						        title: '提示',
								content:"请先登录完善信息在进行帖子发布！",
								showCancel:true,
								cancelText:"取消",
						        confirmText:'立即登录',
						        success(res){
								  if(res.confirm){
						          uni.reLaunch({
						          	url: '../user/user',
						          })
						          }
						        }
						      })
					}else{
						this.form = ""
					wx.showModal({
					        title: '提示',
							content:"发布成功！",
							showCancel:false,
					        confirmText:'确定',
					        success(res){
							  if(res.confirm){
					           uni.reLaunch({
					           	url: '../index/index',
					           })
					          }
					        }
					      })
					}
						
				}).catch(resp => {
　　　　						 uni.showToast({title:"发布失败，请稍后再试!", icon:"none"});
　					　});
				}
				
			}

		},
		created() {
			this.$api.getAllType().then(res => {
				let defaultItemType = [{
					id: -1,
					name: '不限'
				}]
				this.picker = defaultItemType.concat(res.data)
			})
		}
	}
</script>

<style>
</style>
