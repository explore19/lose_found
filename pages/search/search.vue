<template>
	<view>
		<view>		
			<view class="cu-form-group">
				<van-dropdown-menu>
					<van-dropdown-item :value="0" :options="option" v-on:change="onChange3()"/>
				</van-dropdown-menu>	
				<van-field  @blur="bindTap()" placeholder="请输入要查询的内容" border="true" clearable/>
				<button class="cu-btn bg-white" @click="onSearch()">搜索</button>
			</view>
			<view v-if="seen">
				<view>
					<van-dropdown-menu>
					  <van-dropdown-item  :options="postTypeOption" :value="-1" v-on:change="onChange1()"/>
					  <van-dropdown-item  :options="itemTypeOption" :value="-1" v-on:change="onChange()"/>
					  <van-dropdown-item  :options="sortOption" :value="-1" v-on:change="onChange2()"/>
					</van-dropdown-menu>
				</view>
				<view>
					<view v-for="item in data" :key="item.post.id">
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
									<view @click="getToInfo()">
									<view class="text-content" style="margin: 20upx 30upx;">
										{{item.post.details}}
									</view>
									<view class="grid flex-sub padding-lr isCard?'col-3 grid-square':'col-1'">
										<view class="bg-img isCard?'':'only-img'" :style="'background-image:url('+item.post.image+');'">
										</view>
									</view>
									</view>	
									<view class="text-gray text-sm text-right padding">
										<text class="cuIcon-attentionfill margin-lr-xs" @click="add()">{{item.post.browsePoints}}</text>
										<text class="cuIcon-appreciatefill margin-lr-xs">{{item.post.praisePoints}}</text>
										<text class="cuIcon-messagefill margin-lr-xs">{{item.post.reply}}</text>
									</view>
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
	export default {
		data() {
			return {
				option:[{
					text:'关键字',value:0
				},{
					text:'地点',value:1
				}],
				postTypeOption:[{   //帖子的类型
					text:'不限',value:-1
				},{
					text:'拾物',value:0
				},
				{
					text:'失物',value:1
				}],
				itemTypeOption:[],  //物品的类型
				sortOption:[{
					text:'不限',value:-1
				},{
					text:'时间',value:0
				},{
					text:'待定',value:1
				}],
				form:{
					page:1,
					pageSize:20,
					keyWords:'',
					postType:0,
					itemType:0,
					sortType:0,
					lostPlace:''
				},
				seen:false,
				data:[],
				differ:""
			}
		},
		methods: {
			onSearch:function(){ //用来跳转物品详情页
				this.seen = true
				if (this.differ == 1){
					this.form.keyWords = ""
					this.form.lostPlace = this.detail
				}else if (this.differ == 0){
					this.form.lostPlace = ""
					this.form.keyWords = this.detail
				}
				console.log(this.form)
			},
			onChange:function(e){	//现在需要一个页面重新加载的渲染的方法
				console.log(e.detail)
				this.form.itemType = e.detail
			},
			onChange3:function(e){
				this.differ = e.detail
			},
			onChange1:function(e){
				this.form.postType = e.detail	
			},
			onChange2:function(e){
				this.form.sortType = e.detail
			},
			requestData(){  //根据类型从后端 拿取所有的数据 
				this.$api.queryPost(this.form).then(res=>{
					console.log(res)
					this.data = res.data
				})
				
			},
			requestType(){  //获取post的类型
				this.$api.getAllType().then(res=>{
					let result = res.data
					this.itemTypeOption.push({text:'不限',value:-1})
					for (var i = 0;i < result.length;i++){
						this.itemTypeOption.push({text:result[i].name,value:result[i].id-1})
					}
				})
			},
			bindTap:function(e){
				this.detail = e.detail.value
			}
		},
		created(){
			this.requestData()
			this.requestType()
		},
		onReachBottom(){
			this.form.page+=1
			this.requestData()
		}
	}
</script>

<style>
	.tags {
		padding-left: 20px;
	}
</style>
