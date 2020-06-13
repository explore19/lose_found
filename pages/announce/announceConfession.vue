<template>
	<view class="">

		<!--悬浮菜单栏-->
		<wux-fab-button position="bottomRight" theme="balanced" direction="vertical" spaceBetween="20" sAngle="180" eAngle="270"
		 v-bind:buttons="button" @click="ClickChange()" v-bind:contact="onContact" v-bind:getuserinfo="onGotUserInfo" />

		<!-- 		 <van-nav-bar title="标题" left-text="返回" left-arrow placeholder=true>
		   <template #right>
		     <van-icon name="发表" size="18" />
		   </template>
		 </van-nav-bar> -->

		<view style="border: #F0FFF0">
			<view class="cu-card dynamic no-card">
				<view class="cu-item shadow">
					<view class="cu-list menu-avatar">

						<view class="cu-item borderLine">
<!-- 							<view class="cu-avatar round lg" :style="'background-image:url('+head_portrait+');'"></view> -->
									<image class="cu-avatar round lg" :src="head_portrait" mode=""></image>
							<view class="content flex-sub padding-tbl">
								<view class="henflex">
									<view>{{name}}</view>
									<view class="huati">
										<button class="cu-btn lines-green round" @click="subInfo()">发布</button>
									</view>
								</view>
							</view>
						</view>

						<view>
							<textarea v-model="form.details" @input="textareaAInput" maxlength="-1"  style="font-size: 12px;" value="" placeholder="大声对喜欢的那个他(她)表白吧~" />


							<view class="cu-bar bg-white margin-top">
									<view class="action">
										图片上传
									</view>
									<view class="action">
										{{imgList.length}}/4
									</view>
								</view>
								
								<view class="cu-form-group position">
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
								
								<van-divider />
								
								<view class="uni-list">
									<view class="uni-list-cell uni-list-cell-pd">
											<view class="uni-list-cell-db">是否匿名</view>
											<switch color="#FFCC33" @change="switchChange" style="transform:scale(0.7)" />
									</view>
								</view>
								
								
								
								
		 					</view>
		 				</view>
		 			</view>
		 		</view>
		 	</view>
	</view>



</template>

<script>
	var graceChecker = require("../../utils/graceChecker.js");
	var dateUtil = require("../../utils/dateUtil.js");

	export default {
		data() {
			return {
				UserStatus: "",
				name: "",
				name1: "",
				sno: "",
				head_portrait: "",
				head_portrait1: "",
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
					postType: 2,//2表示表白帖, type = 101表示匿名表白帖
					checkRes: false, 
					ststus: 1
				},
				// 悬浮菜单的元素的信息
				button: [{
						label: '表白',
						icon: "user.png",
					},
					{
						label: '我的发布',
						icon: "message.png"
					},
					{
						label: '发布',
						icon: "announce.png"
					}, {
						label: "首页",
						icon: "index.png"
					}
				]

			}
		},
		methods: {
			switchChange: function (e) {
				console.log('switch1 发生 change 事件，携带值为', e.detail.value)
				if (e.detail.value === true){
					var result=Math.floor(Math.random()*(4+1));
					console.log(result)
					this.head_portrait = "../../static/anonymous"+result+".png"
					this.name = "一位路过的吃瓜群众"
					this.form.type = 101
				}
				else{
					this.head_portrait = this.head_portrait1
					this.name = this.name1
				}
			},
			requestData() {
				this.$api.getUserInfo().then(res => {
					console.log(res)
					this.UserStatus = res.data.status
					this.name = res.data.nickName
					this.sno = res.data.sno
					this.head_portrait = res.data.headPortrait
					this.head_portrait1 = res.data.headPortrait
					this.name1 = this.name
				})
			},
			// 悬浮菜单的调用的方法
			ClickChange: function(e) {
				console.log("click it ")
				console.log(e)
				let index = e.detail.index
				// 获得点击按钮
				console.log(index)
				if (index === 0) {
					uni.switchTab({
						url: "../announce/announceConfession",
						success: (res) => {
							console.log("")
						}
					})
				} else if (index === 1) {
					uni.switchTab({
						url: "../mypost/mypost",
						success: (res) => {
							console.log("announce")
						}
					})
				} else if (index === 2) {
					uni.switchTab({
						url: "../announce/announce",
						success: (res) => {
							console.log("user")
						}
					})
				} else if (index === 3) {
					uni.switchTab({
						url: "../index/index",
						success: (res) => {
							console.log("index")
						}
					})
				}
			},
			checkinfo: function() {
				var rule = [
					{
						name: "details",
						checkType: "string",
						checkRule: "5,500",
						errorMsg: "文案不能少于5个字哦"
					},
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
				if (this.picker[e.detail.value].id === -1) {
					this.form.type = null
				} else {
					this.form.type = this.picker[e.detail.value].id
				}
			},
			subInfo: function() {
				this.checkinfo()
				if (!this.checkRes) {
					this.checkinfo()
				} else {
					this.form.loseTime = this.date + " " + this.time + ":00"
					if (this.imgList.length == 0) {
						this.form.image = null
					} else {
						let image = ""
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
						if (res.status === 1) {
							wx.showModal({
								title: '提示',
								content: "请先登录完善信息在进行帖子发布！",
								showCancel: true,
								cancelText: "取消",
								confirmText: '立即登录',
								success(res) {
									if (res.confirm) {
										uni.reLaunch({
											url: '../user/user',
										})
									}
								}
							})
						} else {
							this.form = ""
							wx.showModal({
								title: '提示',
								content: "发布成功！",
								showCancel: false,
								confirmText: '确定',
								success(res) {
									if (res.confirm) {
										uni.reLaunch({
											url: '../index/index',
										})
									}
								}
							})
						}

					}).catch(resp => {
						uni.showToast({
							title: "发布失败，请稍后再试!",
							icon: "none"
						});
					});
				}
			}
		},
		created() {
			this.requestData()
/* 			this.$api.getAllType().then(res => {
				let defaultItemType = [{
					id: -1,
					name: '不限'
				}]
				this.picker = defaultItemType.concat(res.data)
			}) */
		}
	}
</script>

<style>
	.huati {
		margin-left: auto;
		margin-right: 20upx;
	}
	.position{
		text-align: center;
		margin-top: 50rpx;
	}
	.uni-list-cell-db,
	.uni-list-cell-right {
		flex: 1;
	}
	.uni-list-cell-pd {
		padding: 22rpx 30rpx;
	}
	.uni-list-cell {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.uni-list {
		background-color: #FFFFFF;
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
		/* height: 30rpx; */
	}
</style>
