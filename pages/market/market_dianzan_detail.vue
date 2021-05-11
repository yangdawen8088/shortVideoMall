<template>
	<view class="market_dianzan_detail bg-gold-dark">
		
		<scroll-view scroll-y class="page" style="position:fixed;top:0;background-color: #fcf2e2;" :style="[{height:system.windowHeight+'px'}]" scroll-top="-50" @scrolltolower="next" lower-threshold="500" >
			
			<view @tap="goodshow" class="flex margin-0 align-center" style="position:fixed;top:0;z-index: -1;">
				
				<image class="flex-sub" style="height: 446upx;width: 750upx;" src="/static/img/dianzan_banner.png"></image>
			</view>
			
			
			<view class="bg-white padding margin-top shadow" style="border-radius: 20upx;margin: 0 20upx;margin-top: 320upx;">
				<view class="flex text-bold text-black text-xl justify-center align-center">
					<text class="text-gold-dark">“{{marketUser.username}}” </text> 获得代金券：<text class="text-gold-dark text-bold text-xxl">{{marketUser.cut_amount}}元</text>
				</view>
				<view class="flex text-gray text-sm margin-bottom-sm justify-center">
					({{marketUser.subtitle}})
				</view>
				<view class="cu-steps">
					<view class="cu-item" :class="index>marketUser.amountLevel?'text-gray':'text-gold-dark'" v-for="(item,index) in basicsList" :key="index" style="min-width: 40upx;">
						<text :class="index>=marketUser.amountLevel?'cuIcon-' + item.icon : 'cuIcon-title'"></text> {{index>=marketUser.amountLevel?item.name:''}}
					</view>
				</view>
				
				<view class="cu-progress round margin-top xs margin-bottom-sm">
					<view class="bg-gold-dark" :style="[{ width:marketUser.progress+'%'}]"></view>
				</view>
				
				<block v-if="uuid == marketUser.devicehash">
					<button open-type="getUserInfo" @getuserinfo="setuserinfo" data-action="invite" class="cu-btn block bg-gold-dark round text-white margin-tb-sm lg">
						<text class="cuIcon-forwardfill"></text>邀请好友点赞</button>
					
				</block>
				<block v-else>
					<block v-if="haszan">
						<button class="cu-btn block text-gray line-orange  round margin-tb-sm lg">
							已赞（一个用户只能赞一次）</button>
					</block>
					<block v-else>
						<button  open-type="getUserInfo" @getuserinfo="setuserinfo" data-action="dianzan" data class="cu-btn block bg-gold-dark round text-white margin-tb-sm lg">
							<text class="cuIcon-appreciatefill"></text>为他点赞</button>
					</block>
					
					
					<button  open-type="getUserInfo" @getuserinfo="setuserinfo" data-action="join" class="cu-btn block text-gold-dark line-orange  round margin-tb-sm lg">
						我也要集赞</button>
					
				</block>
				
				
				
				
				
			</view>
			
			
			
			<view class="bg-white cu-list menu card-menu margin-top padding shadow" style="margin-left: 20upx;margin-right: 20upx;">
				
				<view class="flex text-bold text-gold-dark text-xxl justify-center align-center margin-top ">
					<text class="cuIcon-group_fill text-gold-dark" style="font-size: 50upx;"></text> 点赞好友榜
					
				</view>
				<view class="flex text-gray text-sm margin-bottom-sm justify-center">
					(共有{{zanlist.length}}个好友为点赞)
				</view>
				<scroll-view  scroll-y style="max-height: 500upx;">
					<view class="cu-list menu">
				<view v-for="(item,index) in zanlist" :key="index" class="cu-item " >
					<view class="content align-center ">
						<text class="text-bold margin-right-xs">{{index+1}}</text>
						<text class="cu-avatar round sm margin-right-xs" :style="[{backgroundImage:'url('+item.avatar_url+')'}]"></text>
						<text class="text-grey">{{item.username}}</text>
					</view>
					<view class="action text-bold">
						获得
						<text class="text-gold-dark text-xl text-price">{{item.gift_amount}}</text>红包
					</view>
				</view>
				
				</view>
				</scroll-view>
				
				
			</view>
			
			
			<view class="bg-white cu-list menu card-menu margin-top padding shadow" style="margin-left: 20upx;margin-right: 20upx;">
				
				<view class="flex text-bold text-gold-dark text-xxl justify-center align-center margin-bottom-sm">
					活动规则
					
				</view>
				<view v-for="(rule,index) in rulelist" :key="index">
					{{index+1}}. {{rule}}
				</view>
			</view>
			
			
			<view class="nav-list margin-top">
				<navigator hover-class='none' :url="'/pages/video/one?scene=' + item.id" class="nav-li " navigateTo style="box-shadow: 0 0 10upx;" 
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
							<view class="price text-bold flex flex-sub text-gold-light">¥{{item.goodsprice}}</view>
							<view class="payernum text-bold text-sm flex flex-sub justify-end align-end text-gold-light">{{item.payer_num}}人付款</view>
						</view>
					</view>
				</navigator>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
		
		
		<view class="cu-modal" :class="modalName=='dianzanSuc'?'show':''">
			<view class="cu-dialog  bg-gold-light text-white text-bold" style="border-radius: 30upx;">
				<view class="cu-bar  justify-end">
					<view class="content text-xxl">为好友点赞成功！靠谱<text class="cuIcon-appreciatefill"></text></view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close "></text>
					</view>
				</view>
				<view class="flex padding-xl text-xxl justify-center align-center">
					<text class="cuIcon-redpacket_fill text-red" style="font-size: 50upx;"></text>恭喜！获得<text class="text-red" style="font-size: 50upx;">0{{myzan.gift_amount}}</text>元红包
				</view>
				<view class="flex align-center cu-bar padding">
					
					
						<button @tap="touse"  class="flex-sub cu-btn block bg-white round text-gold-light text-bold margin-tb-sm lg">
							去使用</button>
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
				marketUser:{},
				rulelist:[],
				zanlist:[],
				uuid:'',
				haszan:false,
				modalName: '',
				myzan:{}
			}
		},
		onLoad(option) {
			
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
				
				var code = option.code;
				this.postJson({
					path:"/market/dianzan/user",
					data:{
						code:code
					},
					success:(res)=>{
						this.marketUser = res.data.data;
					}
				});
			this.getOpenId((res)=>{
				if(res){
					this.uuid = res.openid;
				}
			});
			
			this.postJson({
				path:"/market/dianzan/zanlist",
				data:{
					code:code
				},
				success:(res)=>{
					this.zanlist = res.data.data;
				}
			});
			this.postJson({
				path:"/market/dianzan/myzan",
				data:{
					code: code
				},
				success:(res)=>{
					if("ok" == res.data.status && res.data.data && res.data.data.length > 0){
						this.haszan = true;
					}else{
						this.haszan = false;
					}
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
			  title: '「好物短视频」帮我点赞你拿红包！我正在参与“集赞得千金”活动',
			  path: '/pages/market/market_dianzan_detail?code='+this.marketUser.code
			}
		},
		methods: {
			setuserinfo(e){
				var action = e.currentTarget.dataset.action;
				this.$options.methods[action]();
			},
			goodshow(e){
				var url = encodeURIComponent('https://www.dpsoft.top/h5/#/pages/download/download');
				uni.navigateTo({
					url:'/pages/download/webpage?url='+url
				});
			},
			hideModal(e){
				this.modalName = '';
			},
			invite(e){
				uni.showModal({
					title:"邀请好友点赞",
					content:"点击右上角···转发给好友"
				});
			},
			dianzan(e){
				this.postJson({
					path:"/market/dianzan/help",
					data:{
						code:this.marketUser.code
					},
					success:(res)=>{
						if("ok" == res.data.status){
							this.haszan = true;
							this.myzan = res.data.data;
							this.modalName = 'dianzanSuc';
							this.postJson({
									path:"/market/dianzan/user",
									data:{
										code:this.marketUser.code
									},
									success:(res)=>{
										this.marketUser = res.data.data;
									}
								});
							
							
							this.postJson({
								path:"/market/dianzan/zanlist",
								data:{
									code:this.marketUser.code
								},
								success:(res)=>{
									this.zanlist = res.data.data;
								}
							});
							
							
							
						}else{
							let msg = res.data.msg;
							uni.showModal({
								title:"提示消息",
								content:msg
							});
						}
					}
				})
			},
			join(e){
				this.postJson({
					path:"/market/dianzan/join",
					data:{
						
					},
					success:(res)=>{
						let marketUser = res.data.data;
						uni.reLaunch({
							url:"/pages/market/market_dianzan_detail?code="+marketUser.code
						});
					}
				});
			},
			touse(e){
				uni.switchTab({
					url:"/pages/video/main"
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
	
	.market_dianzan_detail .coverimage{
		border-top-left-radius: 20upx;
		border-top-right-radius: 20upx;
		object-fit: cover;
	}
	.market_dianzan_detail .reco-user{
		margin-top: -20upx;
	}
	.market_dianzan_detail .nickname{
		font-size: 20upx;
	}
	.market_dianzan_detail .desc{
		font-size: 20upx;
		height: 100upx;
		overflow: hidden;
		
	}
	.market_dianzan_detail .title{
		font-size: 24upx;
	}
	
	.market_dianzan_detail .price{
		font-size: 30upx;
	}
	
	.market_dianzan_detail .categorybar{
		background-color: rgba(30,30,30,0.8);
	}
	
	
	.market_dianzan_detail .page {
		height: 100vh;
		
	}
	
	
	.market_dianzan_detail .nav-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0;
		justify-content: space-between;
	}
	
	.market_dianzan_detail .nav-li {
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
	
	
	
	.market_dianzan_detail .nav-li.cur {
		color: #fff;
		background: rgb(94, 185, 94);
		box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
	}
	
	.market_dianzan_detail .nav-title {
		font-size: 32upx;
		font-weight: 300;
	}
	
	.market_dianzan_detail .nav-title::first-letter {
		font-size: 40upx;
		margin-right: 4upx;
	}
	
	.market_dianzan_detail .nav-name {
		font-size: 28upx;
		text-transform: Capitalize;
		margin-top: 20upx;
		position: relative;
	}
	
	.market_dianzan_detail .nav-name::before {
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
	
	.market_dianzan_detail .nav-name::after {
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
	
	.market_dianzan_detail .nav-name::first-letter {
		font-weight: bold;
		font-size: 36upx;
		margin-right: 1px;
	}
	
	.market_dianzan_detail .nav-li text {
		position: absolute;
		right: 30upx;
		top: 30upx;
		font-size: 52upx;
		width: 60upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
	}
	
	.market_dianzan_detail .text-light {
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
