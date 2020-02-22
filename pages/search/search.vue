<template>
	<view>
		<view>
			<view class="cu-form-group">
				
					<van-dropdown-menu >
					<van-dropdown-item  :value="0" :options="option" @change="searchKeyChange" />
				</van-dropdown-menu>
				
				
				<van-field @blur="bindTap()" placeholder="请输入要查询的内容" border="true" clearable />
				<text class="cuIcon-search margin-lr-ms" @click="onSearch()">
				</text>
			</view>
			<view v-if="exist">
				
				<view v-if="seen">
				<view>
					<van-dropdown-menu>
						<van-dropdown-item :options="postTypeOption" title="帖子类型" :value="-1" @change="postChange" />
						<van-dropdown-item :options="itemTypeOption" title="物品类型" :value="-1" @change="itemChange" />
						<van-dropdown-item :options="sortOption" title="排序" :value="0" @change="sortChange" />
					</van-dropdown-menu>
				</view>
				
					<view v-for="item in data" :key="item.post.id" style="margin-top: 15upx;">
						<view style="border: #F0FFF0">
							<view class="cu-card dynamic isCard?'no-card':''">
								<view class="cu-item shadow">
									<view class="cu-list menu-avatar">
										<view class="cu-item">
											<view class="cu-avatar round lg" :style="'background-image:url('+item.headPortrait+');'"></view>
											<view class="content flex-sub">
												<view>{{item.nickName}}</view>
												<view class="text-gray text-sm flex justify-between">
													{{item.post.createTime}}
												</view>
											</view>
										</view>
									</view>
									<view @click="goToInfo(item.post.id)">
										
										<view class="grid flex-sub padding-lr isCard?'col-3 grid-square':'col-1'" v-if="item.post.image!=null">
											<view class="bg-img isCard?'':'only-img'" :style="'background-image:url('+item.post.image+');'">
											</view>
										</view>
										<view class="text-content" style="margin: 20upx 30upx 10upx;">
											物品名称:{{item.post.name}}
										</view>
										<view class="text-content" style="margin: 10upx 30upx;">
											{{item.post.details}}
										</view>
									</view>
									<view class="text-gray text-sm text-right padding">
										<text  style="font-size:125%" class="cuIcon-attentionfill margin-lr-xs">{{item.post.browsePoints}}</text>
										<text style="font-size:125%"  @click.stop="perfect(item.post.id)" :class="'cuIcon-appreciatefill margin-lr-xs '+(item.isPraise?'text-red':'') ">{{item.praiseNumber}}</text>
										<text style="font-size:125%" class="cuIcon-messagefill margin-lr-xs">{{item.replyNumber}}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
				<view  v-else>
					<view>
						<van-dropdown-menu>
							<van-dropdown-item :options="postTypeOption" title="帖子类型" :value="-1" @change="postChange" />
							<van-dropdown-item :options="itemTypeOption" title="物品类型" :value="-1" @change="itemChange" />
							<van-dropdown-item :options="sortOption" title="排序" :value="0" @change="sortChange" />
						</van-dropdown-menu>
					</view>
					<view class="kong">
						<image src="../../static/images/空帖子.png"  style="height: 1100upx;"></image>
					</view>
					
				</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				option: [{
					text: '关键字',
					value: 0
				}, {
					text: '地点',
					value: 1
				}],
				postTypeOption: [{ //帖子的类型
						text: '不限',
						value: -1
					}, {
						text: '拾物',
						value: 0
					},
					{
						text: '失物',
						value: 1
					}
				],
				itemTypeOption: [], //物品的类型
				sortOption: [{
					text: '回复时间排序',
					value: 0
				}, {
					text: '发帖时间排序',
					value: 1
				}],
				form: {
					page: 1,
					pageSize: 5,
					keyWords: '',
					postType: -1,
					itemType: -1,
					sortType: 0,
					lostPlace: ''
				},
				seen: false,
				data: [],
				total: 0,
				differ: "",
				detail: "",
				exist:true
			}
		},
		methods: {
			onSearch: function() { //用来跳转物品详情页
				this.seen = true
				if (this.differ == 1) {
					this.form.keyWords = ""
					this.form.lostPlace = this.detail
				} else if (this.differ == 0) {
					this.form.lostPlace = ""
					this.form.keyWords = this.detail
				}
				this.requestData()
			},
			goToInfo: function(postId) { // 用来跳转到物品的详细信息的页面
			this.$global.postId=postId
				uni.navigateTo({
					url: "/pages/introduction/introduction"
				})
			},
			itemChange: function(e) { //现在需要一个页面重新加载的渲染的方法
				this.form.itemType = e.detail
				this.requestData()
			},
			searchKeyChange: function(e) {
				this.differ = e.detail
			},
			postChange: function(e) {
				this.form.postType = e.detail
				this.requestData()
			},
			sortChange: function(e) {
				this.form.sortType = e.detail
				this.requestData()
			},
			requestData() { //根据类型从后端 拿取所有的数据 
				this.$api.queryPost(this.form).then(res => {
					this.total = res.data.total
					
					if(res.data.data.length!=0){
						this.exist = true
						this.data = res.data.data
						for(var i = 0;i<res.data.data.length;i++){
							if(res.data.data[i].post.image!=null){
								this.img = res.data.data[i].post.image.split("&&&")
							this.data[i].post.image = this.img[0]
							}
							
						}
					}
					else{
						this.exist = false
					}
				
				})

			},
			perfect: function(postId) {
				this.$api.praise(postId).then((res) => {
					this.requestData()
				})
			},
			requestType() {
				//获取post的类型
				this.$api.getAllType().then(res => {
					let result = res.data
					this.itemTypeOption.push({
						text: '不限',
						value: -1
					})
					for (var i = 0; i < result.length; i++) {
						this.itemTypeOption.push({
							text: result[i].name,
							value: result[i].id
						})
					}
				})
			},
			bindTap: function(e) {
				this.detail = e.detail.value
			},
			isBottom(){
				//检查到是否到最底层
				let page=this.form.page
				let pageSize=this.form.pageSize
				let total =this.total
				if(page*pageSize<total){
					return false
				}
				return true
			}
		},
		created() {
			this.requestType()
		},
		onReachBottom() {
			if(this.isBottom()){
				return
			}
			this.form.page += 1
			this.$api.queryPost(this.form).then(res => {
				if (res.status === 0) {
					this.data = this.data.concat(res.data.data)
				}

			})
		}
	}
</script>

<style>
	.tags {
		padding-left: 20px;
	}
	.kong{
		
		 display:flex;                   
		 justify-content: center;        
		 align-items:center;
		  }
</style>
