<template>
	<view class="market_dianzan bg-white">
		
		<scroll-view scroll-y class="page" style="position:fixed;top:0;background-color: #fcf2e2;" :style="[{height:system.windowHeight+'px'}]" scroll-top="-50" @scrolltolower="next" lower-threshold="500" >
			
			<view @tap="goodshow" class="flex margin-0 align-center" style="position:fixed;top:0;z-index: -1;">
				
				<image class="flex-sub" style="height: 446upx;width: 750upx;" src="/static/img/dianzan_banner.png"></image>
			</view>
			
			
			
			
			<view class="bg-white cu-list menu card-menu margin-top padding shadow" style="margin-left: 20upx;margin-right: 20upx;margin-top: 320upx;">
				
				<view class="flex text-bold text-gold-dark text-xxl justify-center align-center margin-bottom-sm">
					活动规则
					
				</view>
				<view v-for="(rule,index) in rulelist" :key="index">
					{{index+1}}. {{rule}}
				</view>
				
			</view>
			
			
			<view class="bg-white padding margin-top shadow" style="border-radius: 20upx;margin-left: 20upx;margin-right: 20upx;">
				<view class="flex text-bold text-gold-dark text-xl justify-center align-center">
					参与集赞得千金
				</view>
				
				<view class="cu-steps">
					<view class="cu-item" :class="'text-gold-dark'" v-for="(item,index) in basicsList" :key="index" style="min-width: 40upx;">
						<text :class="index>=-1?'cuIcon-' + item.icon : 'cuIcon-title'"></text> {{index>=-1?item.name:''}}
					</view>
				</view>
				
				
				<button open-type="getUserInfo" @getuserinfo="setuserinfo" class="cu-btn block bg-gold-dark round text-white margin-tb-sm lg">
					立即参与</button>
				
				
				
				
				
			</view>
			
			
			
			<view class="nav-list margin-top">
				<navigator  hover-class='none' :url="'/pages/video/one?scene=' + item.id" class="nav-li " navigateTo style="box-shadow: 0 0 10upx;" 
				 :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in videolist" :key="index">
					<image class="coverimage" mode="aspectFill" style="height: 338upx;" :src="item.cover_img_url"></image>
					<view style="padding: 0 16upx 16upx 16upx">
						<view class="reco-user flex justify-start align-end margin-bottom-sm">
							<image class="avatar cu-avatar round margin-right-xs" :src="item.head_img"></image>
							<view class="nickname text-cut text-dark" >{{item.nick_name}}  推荐</view>
						</view>
						
						<view class="title text-cut text-bold text-black margin-bottom-sm">{{item.goodstitle}}</view>
						<view class="desc text-dark margin-bottom-sm">{{item.video_desc}}</view>
						<view class="payinfo flex  ">
							<view class="price text-bold flex flex-sub text-gold-dark">¥{{item.goodsprice}}</view>
							<view class="payernum text-bold text-sm flex flex-sub justify-end align-end text-gold-dark">{{item.payer_num}}人付款</view>
						</view>
					</view>
				</navigator>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
		
		<view class="cu-modal" :class="modalName=='userinfo'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">用户授权</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					确定获取用户基本信息吗？
				</view>
				<view class="cu-bar bg-white">
					<button class="action margin-0 flex-sub  solid-left" open-type="getUserInfo" @getuserinfo="setuserinfo">确定</button>
					
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				system:this.systemInfo(),
				categorylist:[],
				videolist: [],
				pageIndex:0,
				pageSize:20,
				TabCur:0,
				scrollLeft:0,
				basicsList: [{
					icon: 'moneybagfill',
					name: '10'
				}, {
					icon: 'moneybagfill',
					name: '50'
				}, {
					icon: 'moneybagfill',
					name: '100'
				}, {
					icon: 'moneybagfill',
					name: '200'
				}, {
					icon: 'moneybagfill',
					name: '400'
				}, {
					icon: 'moneybagfill',
					name: '700'
				}, {
					icon: 'moneybagfill',
					name: '1000'
				}, ],
				rulelist:[],
				modalName:''
			}
		},
		onLoad() {
			
			this.postJson({
					path: '/video/category/top', //仅为示例，并非真实接口地址。
					data: {
						platform:0
					},
					success: (res) => {
						console.log(res.data);
						if("ok" == res.data.status){
							
							
							 this.categorylist = res.data.data;
							 this.loadData();
						}
					}
				});
				
			
			this.postJson({
				path:"/market/dianzan/rule",
				data:{
					
				},
				success:(res)=>{
					this.rulelist = res.data.data;
				}
			});
			
			this.postJson({
				path:"/market/dianzan/cashlist",
				data:{
					
				},
				success:(res)=>{
					this.basicsList = res.data.data;
				}
			});
			
			uni.showShareMenu({});
			
		},
		onPullDownRefresh() {
			this.videolist = [];
			this.pageIndex=0;
			this.loadData(function(){
				uni.stopPullDownRefresh();
			});
			
		},
		onShareAppMessage() {
			return {
			  title: '「好物短视频」朋友的赞值千金，快来参与“集赞得千金”活动！',
			  path: '/pages/market/market_dianzan'
			}
		},
		methods: {
			goodshow(e){
				// uni.switchTab({
				// 	url:'/pages/video/main'
				// });
				var url = encodeURIComponent('https://www.dpsoft.top/h5/#/pages/download/download');
				uni.navigateTo({
					url:'/pages/download/webpage?url='+url
				});
			},
			setuserinfo(res){
				//res.openid = App.openres.openid;
				//App.openres  = res;
				this.modalName = '';
				this.join();
			},
			join(e){
				this.postJson({
					path:"/market/dianzan/join",
					data:{
						
					},
					success:(res)=>{
						let marketUser = res.data.data;
						uni.navigateTo({
							url:"/pages/market/market_dianzan_detail?code="+marketUser.code
						});
					}
				});
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				this.videolist = [];
				this.pageIndex=0;
				uni.showLoading({
					
				});
				this.loadData(function(){
					uni.hideLoading();
				});
			},
			next(e){
				this.loadData();
			},
			loadData(complete){
				this.postJson({
						path: '/video/category', //仅为示例，并非真实接口地址。
						data: {
							pageIndex: this.pageIndex,
							pageSize: this.pageSize,
							category: this.categorylist[this.TabCur]
						},
						success: (res) => {
							console.log(res.data);
							if("ok" == res.data.status){
								this.pageIndex++;
								 let videolist = res.data.data;
								 this.videolist = this.videolist.concat(videolist);
							}
							
							
						},
						complete:()=>{
							if(complete){
								complete();
							}
						}
					});
			}
		}
	}
</script>

<style>
	
	.market_dianzan .coverimage{
		border-top-left-radius: 20upx;
		border-top-right-radius: 20upx;
		object-fit: cover;
	}
	.market_dianzan .reco-user{
		margin-top: -20upx;
	}
	.market_dianzan .nickname{
		font-size: 20upx;
	}
	.market_dianzan .desc{
		font-size: 20upx;
		height: 100upx;
		overflow: hidden;
		
	}
	.market_dianzan .title{
		font-size: 24upx;
	}
	
	.market_dianzan .price{
		font-size: 30upx;
	}
	
	.market_dianzan .categorybar{
		background-color: rgba(30,30,30,0.8);
	}
	
	
	.market_dianzan .page {
		height: 100vh;
		
	}
	
	
	.market_dianzan .nav-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0;
		justify-content: space-between;
	}
	
	.market_dianzan .nav-li {
		padding: 0upx;
		border-radius: 20upx;
		width: 45%;
		margin: 0 2.5% 40upx;
		background-image: url(https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358352-assets/web-upload/cc3b1807-c684-4b83-8f80-80e5b8a6b975.png);
		background-size: cover;
		background-position: center;
		position: relative;
		z-index: 1;
		background-color: white;
	}
	
	
	
	.market_dianzan .nav-li.cur {
		color: #fff;
		background: rgb(94, 185, 94);
		box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
	}
	
	.market_dianzan .nav-title {
		font-size: 32upx;
		font-weight: 300;
	}
	
	.market_dianzan .nav-title::first-letter {
		font-size: 40upx;
		margin-right: 4upx;
	}
	
	.market_dianzan .nav-name {
		font-size: 28upx;
		text-transform: Capitalize;
		margin-top: 20upx;
		position: relative;
	}
	
	.market_dianzan .nav-name::before {
		content: "";
		position: absolute;
		display: block;
		width: 40upx;
		height: 6upx;
		background: #fff;
		bottom: 0;
		right: 0;
		opacity: 0.5;
	}
	
	.market_dianzan .nav-name::after {
		content: "";
		position: absolute;
		display: block;
		width: 100upx;
		height: 1px;
		background: #fff;
		bottom: 0;
		right: 40upx;
		opacity: 0.3;
	}
	
	.market_dianzan .nav-name::first-letter {
		font-weight: bold;
		font-size: 36upx;
		margin-right: 1px;
	}
	
	.market_dianzan .nav-li text {
		position: absolute;
		right: 30upx;
		top: 30upx;
		font-size: 52upx;
		width: 60upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
	}
	
	.market_dianzan .text-light {
		font-weight: 300;
	}
	
	@keyframes show {
		0% {
			transform: translateY(-50px);
		}
	
		60% {
			transform: translateY(40upx);
		}
	
		100% {
			transform: translateY(0px);
		}
	}
	
	@-webkit-keyframes show {
		0% {
			transform: translateY(-50px);
		}
	
		60% {
			transform: translateY(40upx);
		}
	
		100% {
			transform: translateY(0px);
		}
	}
	
	
	
	
</style>
