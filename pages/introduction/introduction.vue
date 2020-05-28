<template>
	<view class="cu-card dynamic" :class="isCard?'no-card':''">
		<view class="demo">
			<cl-message ref="message"></cl-message>
		</view>
		
		<view class="cu-item shadow">
			<view class="cu-list menu-avatar">
				<view class="cu-item">
					<view class="cu-avatar round lg" :style="'background-image:url('+data.headPortrait+');'"></view>
					<view class="content flex-sub">
						<view>{{data.nickName}}</view>
						<view class="text-gray text-sm flex justify-between">
							{{data.post.createTime}}
						</view>
					</view>
				</view>
			</view>
			<view class="flex-sub text-left">
				<view class="solid-bottom text-lg padding">
					<text class="text-black text-bold">{{data.post.name}}</text>
				</view>
				<view style="margin:10upx 30upx;">丢失地点：{{data.post.lostPlace}}</view>
				<view style="margin:10upx 30upx;">丢失时间：{{data.post.loseTime}}</view>
				<view v-if="data.post.contact" style="margin:10upx 30upx;">联系方式：{{data.post.contact}}</view>
				<view v-if="data.post.type" style="margin:10upx 30upx;">物品类型：{{data.post.type}}</view>
				<view style="margin:10upx 30upx;">详情：{{data.post.details}}</view>
				<view class="grid flex-sub padding-lr col-3 grid-square" v-if="hasImg">
					<!-- <view class="bg-img" :style="'background-image:url('+item+');'" v-for="(item,index) in image" :key="index">
					</view> -->
					<view :v-if="item != null" class="bg-img" v-for="(item,index) in image" :key="index">
						<image id="index" :v-if="item != null" :src="item" mode="aspectFill" v-on:click="previewImg(item, index)"></image>
					</view>
				</view>
				
				<view class="submain">
					<text class="text-gray_">{{data.praiseNumber}} 喜欢</text>
				</view>
				
				<view class="container text-align:center">
				     <!-- 分割线 -->
				  <view class="divLine"></view>
				</view>
			</view>
			
			<view class="row" >
				<view class="ft">
					<view class="flex">
						<image class="viewNum" :src="options.viewNum" />
						<text class="text-grey space" style="font-size: 18px; text-align: center;">{{data.post.browsePoints}}</text>
					</view>
					<view class="flex">
						<image class="messagingspeechbub" :src="options.messagingspeechbub" />
						<text class="text-grey space" style="font-size: 18px; text-align: center;">{{data.replyNumber}}</text>
					</view>
				  <image v-if="!data.isPraise" class="Heart" :src="options.Heart" @click="perfect(data.post.id,data.isPraise)" />
					<image v-if="data.isPraise" class="Heart" :src="options.Heart1" @click="perfect(data.post.id,data.isPraise)" />
				</view>
			</view>



<!-- 			<view class="text-gray text-sm text-right padding">
				<view class="flex vertical1">
					<view class="text-gray text-sm">
						<text style="font-size:180%" class="cuIcon-attentionfill margin-lr-xs">{{data.post.browsePoints}}</text>
					</view>
					<view class="flex text-gray text-sm vertical" @click="perfect(data.post.id,data.isPraise)">
						<like-button></like-button>
						<text style="font-size:180%">{{data.praiseNumber}}</text>
					</view>
					<view class="text-gray text-sm">
						<text @click="postReply" style="font-size:180%" class="cuIcon-messagefill margin-lr-xs ">{{data.replyNumber}}</text>
					</view>
				</view>
			</view> -->



			<view class="cu-list menu-avatar comment solids-top">
				<view class="cu-item" v-for="(item,index) in replyList" :key="index">
					<view class="cu-avatar round " :style="'background-image:url('+item.replyUserPortrait+');'"></view>
					<view class="content">
						<view class="text-grey">{{item.replyUserName}}</view>
						<view hover-class="wsui-btn__hover_list" @click="otherReply(item.id, item.replyUserName)" class=" text-content text-df">
							{{item.info}}
						</view>

						<view class="margin-top-sm  text-sm" v-for="(item2,index2) in item.replys" :key="index2">
							<view hover-class="wsui-btn__hover_list" class="flex">
								<!-- <view class="cu-avatar round sm" :style="'background-image:url('+item2.replyUserPortrait+');'"></view> -->
								<view class=" text-purple margin-lr-ms" v-if="item.id==item2.reply.replyId">{{item2.nickName}}:</view>
								<view class="margin-lr-ms" v-if="item.id!=item2.reply.replyId"><text class="text-purple margin-lr-ms">{{item2.nickName}}</text>回复
									<text class="text-purple margin-lr-ms">{{item2.replyedUserNickName}}</text>:</view>
								<view @click="otherReply(item2.reply.id, item2.nickName)" class="flex-sub">{{item2.reply.info}}</view>
							</view>
						</view>
						<view class="margin-top-sm flex justify-between">
							<view class="text-gray text-df">{{item.reply.createTime}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
			
		<!-- <uni-popup ref="popup" :type="type" :animation="true">
			<view class="popup-content">popup 内容，此示例没有动画效果</view>
		</uni-popup> -->
		<uni-popup ref="popupShare" type="share" @change="change">
			<uni-popup-share title="请选择" @select="select"></uni-popup-share>
		</uni-popup>
		
		<view class="blank">
			<view class="cu-bar input reply">
				<view class="cu-avatar round" :style="'background-image:url('+data.headPortrait+');'"></view>
				<view class="action" @click="confirmShare">
					<text class="cuIcon-roundaddfill text-grey"></text>
				</view>
				<input id="input1" :adjust-position="true" class="solid-bottom " maxlength="300" :placeholder="placeholderText"
				 cursor-spacing="500rpx" v-model="replyForm.info"></input>
				<view class="action">
					<text class="cuIcon-emojifill text-grey"></text>  
				</view>
				<button :adjust-position="true" class="cu-btn bg-green round shadow-blur" @click="subreply()">发送</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	import likeButton from '@/components/like-button/like-button.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import uniPopupShare from '@/components/uni-popup/uni-popup-share.vue'
	export default {
		
		components: {
			likeButton,
			uniPopup,
			uniPopupMessage,
			uniPopupDialog,
			uniPopupShare
		},
		props: {
				dataId: {
					type: String,
					default: 'hm-dynamic-detail-card'
				},
				options: {
					type: Object,
					default: function() {
						return {
							Heart:
								'/static/love.png',
							Heart1:	
								'/static/love1.png',
							messagingspeechbub:
								'/static/hm-dynamic-detail-card/images/img_25823_0_1.png',
							viewNum:
								'/static/view.png'
						};
					}
				}
			},
		data() {
			return {
				type: 'top',
				hasImg: false,
				isCard: true,
				image: [],
				data: {},
				replyId: -1,
				firstFloorReply: {
					replyUserPortrait: '',
					replyUserName: '',
					info: '',
					createTime: '',
					replys: []
				},
				replyForm: {
					replyId: -1,
					type: 0,
					postId: this.$global.postId,
					info: ''
				},
				replyList: [],
				userStatus: "",
				placeholderText: "说点什么吧...",
				show: false
			};
		},
		methods: {
			change(e) {
				console.log('popup ' + e.type + ' 状态', e.show)
			},
			select(e, done) {
				uni.showToast({
					title: `您选择了第${e.index+1}项：${e.item.text}`,
					icon: 'none'
				})
				done()
			},
			confirmShare() {
				this.$refs.popupShare.open()
			},
			toggle(type) {
				this.type = type
				this.$refs.popup.open()
			},
			onTap() {
				this.$refs["message"].open({
					message: "回复成功",
					style: "success",
					top: "200rpx",
					duration: 1000,
				})
			},

			previewImg: function(item, index) {
				console.log("preview success")
				uni.previewImage({
					urls: this.image,
					current: index,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function() {
							console.log('选中了第张图片');
						},
						fail: function() {
							console.log("预览错误");
						}
					}
				})
			},

			requestData() {
				let result
				this.$api.getAllType().then(res => {
					result = res.data
				})

				this.$api.getPost({
					id: this.$global.postId
				}).then(res => {
					if (res.status === 0) {
						this.data = res.data
						if (this.data.post.type != null) {
							this.data.post.type = result[res.data.post.type].name
						}
						if (this.data.post.image === null) {
							this.hasImg = false
						} else {
							this.hasImg = true
							this.image = this.data.post.image.split("&&&")
						}
					}
					0
				})
			},
			requestReply() {
				this.$api.queryPostReply({ //根据帖子的id查询所有的回复
					postId: this.$global.postId
				}).then(res => {
					if (res.status == 0) {
						let replyList = []
						this.recursionReply(res.data, replyList)
						this.replyList = replyList
					}

				})
			},
			recursionReply: function(node, replyList) {
				if (node.reply.status === null) { //-null代表根节点
					if (node.children == null) {
						return
					}
					for (var i = 0; i < node.children.length; i++) {
						this.recursionReply(node.children[i], replyList)
					}
					return
				}

				if (node.reply.status === 0) { //0代表回复帖子的回复
					this.firstFloorReply.info = node.reply.reply.info
					this.firstFloorReply.replyUserPortrait = node.reply.headPortrait
					this.firstFloorReply.replyUserName = node.reply.nickName
					this.firstFloorReply.createTime = node.reply.reply.createTime
					this.firstFloorReply.id = node.reply.reply.id

				} else { //回复回复的回复
					this.firstFloorReply.replys.push(node.reply)
				}
				if (node.children == null) {
					return
				}
				for (var i = 0; i < node.children.length; i++) {
					this.recursionReply(node.children[i], replyList)
				}
				if (node.reply.status == 0) {
					replyList.push(this.firstFloorReply)
					this.firstFloorReply = {
						replyUserPortrait: '',
						replyUserName: '',
						info: '',
						createTime: '',
						replys: []
					}
				}

			},
			perfect: function(postId, isPraise) {
				this.$api.praise(postId).then((res) => {
					if (res.status === 0) {
						this.data.isPraise = !isPraise
						if (isPraise) {
							this.data.praiseNumber--
						} else {
							this.data.praiseNumber++
						}
					}
				})
			},
			otherReply: function(replyId, replyUsername) { //回复消息的方法
				console.log(replyId)
				console.log(replyUsername)
				this.show = true
				this.replyForm.replyId = replyId
				this.replyForm.type = 1
				this.placeholderText = "回复: " + replyUsername
			},
			postReply: function() {
				this.show = true
				this.replyForm.replyId = -1
				this.replyForm.type = 0
			},
			onClose: function() { //关闭弹出层的方法
				this.show = false
			},
			subreply: function(e) { //提交回复内容的方法

				if (this.userStatus == 3) {
					uni.showToast({
						title: "请先登录再发表回复！",
						icon: "none"

					});
				} else if (this.replyForm.info === "") {
					uni.showToast({
						title: "回复消息不能为空",
						icon: "none"
					});
				} else {
					this.$api.addReply(this.replyForm).then(res => {
						if (res.status === 0) {
							this.requestReply()
							this.resetForm()
							var that = this
							setTimeout(function() {
								that.onTap()
							}, "200");
						}
					})
				}


			},
			resetForm() {
				this.replyForm = {
					replyId: -1,
					type: 0,
					postId: this.$global.postId,
					info: ''
				}
			}

		},
		created() {
			this.requestData()
			this.requestReply()

			this.$api.getUserInfo().then(res => {
				this.userStatus = res.data.status
			})
		}

	}
</script>

<style>
	.text-gray_ {
			color: #8a8a8a;
		}
		.space {
			margin-left: 8rpx;
			margin-top: 7.35rpx;
			color: #7d7d7d;
		}
		/*分割线样式*/
		.divLine{
		 background: #E0E3DA;
		 width: 90%;
		 height: 5rpx;
		 /* display: inline-block; */
		 margin-left: 39rpx;
		 margin-top: 13rpx;
		}
		.submain {
		  /* position: relative; */
			text-align: right;
		  opacity: 1;
		  margin-top: 28.3rpx;
		  margin-right: 40.43rpx;
	/* 	  max-width: 664.86rpx; */
		  height: 40.54rpx;
		  overflow: hidden;
		  text-overflow: ellipsis;
		  line-height: 40.54rpx;
		  letter-spacing: 0.5px;
		  white-space: pre;
		  color: #222222;
		  font-size: 28.38rpx;
		  font-weight: 400;
			flex: 1;
		}
		.row {
		  position: relative;
		  align-self: center;
		  margin-top: 12.16;
			margin-left: 32.43rpx;
		  background-color: #ffffff;
		  width: 656.76rpx;
		  height: 70rpx;
		}
		.ft {
		  display: flex;
		  position: relative;
		  align-items: center;
		  align-self: center;
		  flex-direction: row;
		  justify-content: space-between;
		  margin-top: 26.35rpx;
		  width: 658.78rpx;
		  height: 36.49rpx;
			background-color: #ffffff;
		}
		.Heart {
		  width: 56.59rpx;
		  height: 46.49rpx;
		}
		.messagingspeechbub {
		  width: 36.49rpx;
		  height: 36.49rpx;
			margin-top: 12.35rpx;
		}
		.viewNum {
		  width: 50.46rpx;
		  height: 40.35rpx;
			margin-top: 10.85rpx;
		}
	
	.vertical1 {
		align-items: center;
	}
	.vertical {
		vertical-align: center;
	}
	.wsui-btn__hover_list {
		opacity: 0.9;
		background: #f7f7f7;
	}
	.reply {
		position: fixed;
		bottom: 0;
		width: 100%;
	}
	.blank {
		height: 98rpx;
	}
	
	.popup-content {
		background-color: #fff;
		padding: 15px;
	}
</style>
