<template>
	<view class="">
		<van-tabs animated>
			<van-tab title="我是失主">
				<van-cell-group>
					<!-- <van-field :value="lostThing" clearable label="失物名称" placeholder="请输入失物名称" :click-icon="onClickIcon" />
					<van-field :value="lostPalce" clearable label="丢失地点" placeholder="请输入丢失地点" :click-icon="onClickIcon" />
					<van-field :value="lostTime" clearable label="丢失时间" placeholder="请输入丢失时间" @focus="showPopup" />
					<van-field :value="phone" clearable label="联系方式" placeholder="请输入手机号码" :click-icon="onClickIcon" />
					<van-field value="" label="失物详情" type="textarea"  autosize :border=" false "  show-confirm-bar/>
					<van-popup :show="show" @click="onClose" position="bottom" @click-overlay="show = false">
					<van-datetime-picker type="datetime" :value="currentDate"  @cancel="show = false" />
					-->

					<view class="cu-form-group margin-top">
						<view class="title">失物名称</view>
						<input name="input" @keyup.enter="search" @input="search($event)"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">丢失地点</view>
						<input name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">时间选择</view>
						<picker mode="time" :value="time" start="09:01" end="21:01" @change="TimeChange">
							<view class="picker">
								{{time}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group">
						<view class="title">日期选择</view>
						<picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="DateChange">
							<view class="picker">
								{{date}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group">
						<view class="title">手机号码</view>
						<input name="input"></input>

					</view>
					<view class="cu-form-group align-start">
						<view class="title">失物详情</view>
						<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput"></textarea>
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


					<van-button type="primary" size="large" @click="subInfo()">发布</van-button>
				</van-cell-group>

			</van-tab>
			<van-tab title="我是拾主">
				
					
					<van-cell-group>
						

						<view class="cu-form-group margin-top">
							<view class="title">拾物名称</view>
							<input name="input"></input>
						</view>
						<view class="cu-form-group">
							<view class="title">拾到地点</view>
							<input name="input"></input>
						</view>
						<view class="cu-form-group">
							<view class="title">时间选择</view>
							<picker mode="time" :value="time" start="09:01" end="21:01" @change="TimeChange">
								<view class="picker">
									{{time}}
								</view>
							</picker>
						</view>
						<view class="cu-form-group">
							<view class="title">日期选择</view>
							<picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="DateChange">
								<view class="picker">
									{{date}}
								</view>
							</picker>
						</view>
						<view class="cu-form-group">
							<view class="title">手机号码</view>
							<input name="input"></input>

						</view>
						<view class="cu-form-group align-start">
							<view class="title">拾物详情</view>
							<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaBInput"></textarea>
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


						<van-button type="primary" size="large" @click="subInfo()">发布</van-button>
					</van-cell-group>


			</van-tab>
		</van-tabs>
	</view>



</template>

<script>
	export default {
		data() {
			return {
				// lostname:''
				show: false,
				currentDate: new Date().getTime(),
				lostThing: "",
				lostTime: "",
				lostPlace: "",
				time: '12:01',
				date: '2018-12-25',
				imgList: [],
				modalName: null,
				textareaAValue: '',
				textareaBValue: '',
			}
		},
		methods: {
			onClick(event) {
				wx.showToast({
					title: `点击标签 ${event.detail.name}`,
					icon: 'none'
				});
			},
			showPopup() {
				this.$data.show = true
			},
			onClose() {
				this.$data.show = false
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
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
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
			
			subInfo:function(){
				
				wx.request({
					url:"http://localhost:8080/post/test",
					method:'POST',
					data:{
						id:1
					},
					success: (res) => {
						console.log(res)
					}
				
				})
			},
			search(event){
				          console.log(event.currentTarget.value)
				        }
			 
			
			
			
			
			
			
			
			
			
			
			
			// 			onInput(event) {
			// 				this.$data.currentDate = event.detail
			// 			},

		}
	}
</script>

<style>
</style>
