<template>
	<view class="">
		<van-tabs animated :active=" form.postType " @change="onChange" swipeable="true">
			<van-tab title="我是失主">
				<van-cell-group>


					<view class="cu-form-group margin-top">
						<view class="title">失物名称</view>
						<input v-model="form.name" name="name" style="text-align: right;"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">丢失地点</view>
						<input v-model="form.lostPlace" name="lostplace" style="text-align: right;"></input>
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
						<picker mode="time" v-model="time" start="09:01" end="21:01" @change="TimeChange">
							<view class="picker">
								{{time}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group">
						<view class="title">日期选择</view>
						<picker mode="date" v-model="date" start="2015-09-01" end="2020-09-01" @change="DateChange">
							<view class="picker">
								{{date}}
							</view>
						</picker>
					</view>


					<view class="cu-form-group">
						<view class="title">手机号码</view>
						<input v-model="form.contact" name="contact" style="text-align: right;"></input>
					</view>

					<view class="cu-form-group">
						<view class="title">QQ号</view>
						<input v-model="form.QQ" name="QQ" style="text-align: right;"></input>
					</view>
					<view class="cu-form-group align-start">
						<view class="title">失物详情</view>
						<textarea maxlength="-1" v-model="form.details" @input="textareaAInput" name="details"></textarea>
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


					</van-popup>

<view class="margin-top">
	<van-button  type="primary" size="large" @click="subInfo()">发布</van-button>
</view>
					
				</van-cell-group>

			</van-tab>
			<van-tab title="我是拾主">


				<van-cell-group>

					<view class="cu-form-group margin-top">
						<view class="title">拾物名称</view>
						<input v-model="form.name" name="name" style="text-align: right;"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">拾到地点</view>
						<input v-model="form.lostPlace" name="lostPlace" style="text-align: right;"></input>
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
						<picker mode="time" v-model="time" start="09:01" end="21:01" @change="TimeChange">
							<view class="picker">
								{{time}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group">
						<view class="title">日期选择</view>
						<picker mode="date" v-model="date" start="2015-09-01" end="2020-09-01" @change="DateChange">
							<view class="picker">
								{{date}}
							</view>
						</picker>
					</view>


					<view class="cu-form-group">
						<view class="title">手机号码</view>
						<input name="contact" v-model="form.contact" style="text-align: right;"></input>

					</view>
					<view class="cu-form-group">
						<view class="title">QQ号</view>
						<input v-model="form.QQ" name="QQ" style="text-align: right;"></input>
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
					</van-popup>
					<view class="margin-top">
						<van-button type="primary" size="large" @click="subInfo()">发布</van-button>
					</view>
					
				</van-cell-group>


			</van-tab>
		</van-tabs>
	</view>



</template>

<script>
	var graceChecker = require("../../utils/graceChecker.js");
	export default {
		data() {
			return {
				picker: [],
				time: '12:01',
				date: '2018-12-25',
				textareaAValue: '',
				imgList: [],
				pickerIndex: 0,
				form: {
					name: "",
					lostPlace: '',
					type: 1,
					loseTime: '',
					details: '',
					contact: '',
					image: [],
					postType: 0,
				}

			}
		},
		methods: {
			subInfo: function() {
				var rule = [{
						name: "lostname",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入失物名称"
					},
					{
						name: "contact",
						checkType: "string",
						checkRule: "11",
						errorMsg: "请输入正确格式的联系方式"
					},
					{
						name: "findname",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入拾物名称"
					},
					{
						name: "QQ",
						checkType: "string",
						checkRule: "6,11",
						errorMsg: "请输入QQ号"
					}
				];
				let form = {
					


				}
				var formData = this.form;

				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.showToast({
						title: "发布成功!",
						icon: "none"
					});
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: " "
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
						uni.uploadFile({
							url: "http:localhost:8888/upload/img",
							filePath: tempFilePaths[0],
							name: "img",
							fileType: "image",
							// files:res.tempFiles,
							success: (uploadFileRes) => {
								let data = JSON.parse(uploadFileRes.data)

								if (data.status === 0) {
									this.imgList.push("http://localhost:8888/img/" + data.data)
								} else {

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
				this.form.loseTime = this.date + " " + this.time + ":00"
				let image = ''
				for (let i = 0; i < this.imgList.length; i++) {
					if (i === this.imgList.length - 1) {
						image += this.imgList[i]
						continue
					}
					image += this.imgList[i] + '&&&'
				}
				this.form.image = image
				this.$api.addPost(this.form).then(res => {
						console.log(this.form)
					uni.showModal({
						content: '发表成功',
						showCancel: false,
					});
					this.form = ''

				})
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
