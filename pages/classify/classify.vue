<template>
	<view class="classify bg-gradual-black">
		
		<scroll-view scroll-x class="nav categorybar fixed" scroll-with-animation :scroll-left="scrollLeft" v-bind:style="{paddingTop:system.statusBarHeight+'px'}">
			<view class="cu-item" :class="index==TabCur?'text-gold-light cur':'text-white'" v-for="(item,index) in categorylist" :key="index" @tap="tabSelect" :data-id="index">
				{{item.name}}
			</view>
		</scroll-view>
		
		<scroll-view scroll-y class="page" scroll-top="-50" @scrolltolower="next" lower-threshold="500">
			<view class="cu-tabbar-height"></view>
			<view class="nav-list">
				<navigator hover-class='none' :url="'/pages/video/one?scene=' + item.id" class="nav-li " navigateTo 
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
				scrollLeft:0
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
		},
		onPullDownRefresh() {
			this.videolist = [];
			this.pageIndex=0;
			this.loadData(function(){
				uni.stopPullDownRefresh();
			});
			
		},
		methods: {
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
	
	.classify .coverimage{
		border-top-left-radius: 20upx;
		border-top-right-radius: 20upx;
		object-fit: cover;
	}
	.classify .reco-user{
		margin-top: -20upx;
	}
	.classify .nickname{
		font-size: 20upx;
	}
	.classify .desc{
		font-size: 20upx;
		height: 100upx;
		overflow: hidden;
		
	}
	.classify .title{
		font-size: 24upx;
	}
	
	.classify .price{
		font-size: 30upx;
	}
	
	.classify .categorybar{
		background-color: rgba(30,30,30,0.8);
	}
	
	
	.classify .page {
		height: 100vh;
		
	}
	
	
	.classify .nav-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0;
		justify-content: space-between;
	}
	
	.classify .nav-li {
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
	
	
	
	.classify .nav-li.cur {
		color: #fff;
		background: rgb(94, 185, 94);
		box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
	}
	
	.classify .nav-title {
		font-size: 32upx;
		font-weight: 300;
	}
	
	.classify .nav-title::first-letter {
		font-size: 40upx;
		margin-right: 4upx;
	}
	
	.classify .nav-name {
		font-size: 28upx;
		text-transform: Capitalize;
		margin-top: 20upx;
		position: relative;
	}
	
	.classify .nav-name::before {
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
	
	.classify .nav-name::after {
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
	
	.classify .nav-name::first-letter {
		font-weight: bold;
		font-size: 36upx;
		margin-right: 1px;
	}
	
	.classify .nav-li text {
		position: absolute;
		right: 30upx;
		top: 30upx;
		font-size: 52upx;
		width: 60upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
	}
	
	.classify .text-light {
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
