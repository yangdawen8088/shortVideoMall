<template>
	<view  class="my">
		
		<view v-if="login == false" class="flex bg-gradual-black" style="position: fixed;width: 100%;height: 100%;" v-bind:style="{paddingTop:system.statusBarHeight+'px'}">
			
				<view class="flex-sub  text-center" style="margin-top: 40%;">
					<view class="cu-avatar round " style="width: 200upx;height: 200upx;" v-bind:style="{backgroundImage: 'url('+(lastUserInfo().head_img?lastUserInfo().head_img:'http://www.dpsoft.top/goodshowres/head.png')+')'}"></view>
					<view class="margin-top">
						<!-- #ifdef MP-WEIXIN -->
						<button open-type="getUserInfo" @getuserinfo="setuserinfo" data-action="tologin" class="cu-btn bg-gold-light margin-tb-sm xl" style="width: 300upx;color: #222222;">请登录</button>
						<!-- #endif -->
						<!-- #ifndef MP-WEIXIN -->
						<button @tap="tologin" class="cu-btn bg-gold-light margin-tb-sm xl" style="width: 300upx;color: #222222;">请登录</button>
						<!-- #endif -->
					</view>
					
				</view>
			
		</view>
		
		<scroll-view v-if="login" class="bg-gradual-pink" scroll-y="true" style="position: fixed;width: 100%;height: 100%;" >
			
			<view @tap="tosetting" class="cuIcon-settingsfill text-white padding" style="font-size: 50upx;z-index: 99;" v-bind:style="{marginTop:system.statusBarHeight+'px'}"></view>

			<view class="flex  p-xs margin-bottom-sm mb-sm" >
				<view class="flex-twice  ">
					<view @tap="updateHeadImage" class="cu-avatar round " style="width: 200upx;height: 200upx; float: right;" v-bind:style="{backgroundImage:'url('+user.head_img+')'}"></view>
				</view>
				<view class="flex-treble padding " @tap="tosetting">
					<text class="text-bold" style="font-size: 50upx;">{{user.nick_name}}</text>
					<view class="">
						<view style="background-color: rgba(100,100,100,0);color: white;padding: 20upx;font-size: 40upx;vertical-align: bottom;" v-bind:class="['cu-tag','round',user.gender==0?'cuIcon-male':'cuIcon-female']"></view>
						<view style="background-color: rgba(100,100,100,0);border: solid 1px white;color: white;" class='cu-tag round'>{{user.years}}</view>
						<view style="background-color: rgba(100,100,100,0);border: solid 1px white;color: white;" class='cu-tag round'>{{user.constellation}}</view>
					</view>
				</view>
			</view>
			
			
			<view class="cu-list grid col-5 solid-bottom text-white no-border" style="background-color: rgba(0,0,0,0);" >
				<view @tap="toPage('/pages/order/myorderlist?type=0')" class="cu-item" >
					<view class="cuIcon-sponsor text-white" >
						
					</view>
					<text style="color: white;">待付款</text>
				</view>
				
				<view @tap="toPage('/pages/order/myorderlist?type=2')" class="cu-item" >
					<view class="cuIcon-time text-white" >
						
					</view>
					<text style="color: white;">待确认</text>
				</view>
				<view @tap="toPage('/pages/order/myorderlist?type=3')" class="cu-item" >
					<view class="cuIcon-roundcheck text-white" >
						
					</view>
					<text style="color: white;">已完成</text>
				</view>
				
				<view @tap="toPage('/pages/order/myorderlist?type=4')" class="cu-item" >
					<view class="cuIcon-refund text-white" >
						
					</view>
					<text style="color: white;">退货</text>
				</view>
				
				<view @tap="toPage('/pages/order/myorderlist?type=99')" class="cu-item" >
					<view class="cuIcon-all text-white" >
						
					</view>
					<text style="color: white;">全部订单</text>
				</view>
				
				<view class="cu-item" >
					<view class="text-white text-xxl" >
						{{count.publish}}
					</view>
					<text style="color: white;">我发布的</text>
				</view>
				
				<view class="cu-item" >
					<view class="text-white text-xxl" >
						{{count.visit}}
					</view>
					<text style="color: white;">访问次数</text>
				</view>
				
				<view class="cu-item" >
					<view class="text-white text-xxl" >
						{{count.befavor}}
					</view>
					<text style="color: white;">被收藏</text>
				</view>
				
				<view class="cu-item" >
					<view class="text-white text-xxl" >
						{{count.fans}}
					</view>
					<text style="color: white;">被关注</text>
				</view>
				
				<view class="cu-item" >
					<view class="text-white text-xxl" >
						{{count.share}}
					</view>
					<text style="color: white;">被收藏</text>
				</view>
				
			</view>
			
			
			<view class="cu-list menu sm-border solid-bottom text-white" style="border-color: white;margin-top: 0;" >
				<view class="cu-item arrow" style="background-color: rgba(0,0,0,0);">
					<view class="content">
						
						<text class="text-white">账户余额</text>
					</view>
					<view class="action">
						<text class="text-white text-sm">{{user.balance}}</text>
					</view>
				</view>
				<view @tap="toPage('/pages/redpackage/redpackage')" class="cu-item arrow" style="background-color: rgba(0,0,0,0);">
					<view class="content">
						
						<text class="text-white">我的红包</text>
					</view>
					
				</view>
				<!--#ifndef MP-WEIXIN -->
				<view @tap="toPage('/pages/goods/goodslist?type=2')" v-if="user.store_name != null" class="cu-item arrow" style="background-color: rgba(0,0,0,0);">
					<view class="content">
						
						<text class="text-white">我的产品</text>
					</view>
					
				</view>
				
				<view  @tap="toPage('/pages/order/userorderlist')" v-if="user.store_name" class="cu-item arrow" style="background-color: rgba(0,0,0,0);">
					<view class="content">
						
						<text class="text-white">用户订单</text>
					</view>
					
				</view>
				<!--#endif -->
			</view>
			
			
			<view class="cu-bar solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-white "></text> 我发布的
				</view>
			</view>
			<scroll-view :scroll-x="true" style="width: 100%;height: 350upx;white-space: nowrap;padding: 0 10upx;">
				<view v-for="(video,index) in myvideolist" :key="index" @tap="tovideo" data-type="0" :data-index="index" style="position: relative; width: 250upx;height: 350upx;display: inline-block;margin:0 0 0 10upx;background-position: center;background-size: cover;" v-bind:style="{backgroundImage:'url('+video.cover_img_url+')'}">
					<view style="width: 100%;height: 100%;background-color: rgba(100,100,100,0.7);"></view>
					<view style="position: absolute;bottom: 0upx;left: 0upx;font-size: 24upx;padding: 8upx 10upx;width: 100%;overflow: hidden;">
						<view>{{video.status==0||video.status==2?'待审核':(video.status==1?'':'审核不通过')}}</view>
						<view>{{video.logtimelabel}}</view>
						<view>{{video.video_desc}}</view>
					</view>
					<image src="http://www.dpsoft.top/goodshowres/play.png" style="position: absolute;width: 120upx;height:120upx;top:115upx;left:65upx;"></image>
				</view>
			</scroll-view>
			
			<view class="cu-bar solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-white "></text> 历史记录
				</view>
			</view>
			<scroll-view :scroll-x="true" style="width: 100%;height: 350upx;white-space: nowrap;padding: 0 10upx;">
				<view v-for="(video,index) in browserlist" :key="index" @tap="tovideo" data-type="0" :data-index="index" style="position: relative; width: 250upx;height: 350upx;display: inline-block;margin:0 0 0 10upx;background-position: center;background-size: cover;" v-bind:style="{backgroundImage:'url('+video.cover_img_url+')'}">
					<view style="width: 100%;height: 100%;background-color: rgba(100,100,100,0.7);"></view>
					<view style="position: absolute;bottom: 0upx;left: 0upx;font-size: 24upx;padding: 8upx 10upx;width: 100%;overflow: hidden;">
						<view>{{video.logtimelabel}}</view>
						<view>{{video.video_desc}}</view>
					</view>
					<image src="http://www.dpsoft.top/goodshowres/play.png" style="position: absolute;width: 120upx;height:120upx;top:115upx;left:65upx;"></image>
				</view>
			</scroll-view>
				
			<view class="cu-bar solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-white "></text> 我喜欢的
				</view>
			</view>
			<scroll-view :scroll-x="true" style="width: 100%;height: 350upx;white-space: nowrap;padding: 0 10upx;">
				<view v-for="(video,index) in likelist" :key="index" @tap="tovideo" data-type="0" :data-index="index" style="position: relative; width: 250upx;height: 350upx;display: inline-block;margin:0 0 0 10upx;background-position: center;background-size: cover;" v-bind:style="{backgroundImage:'url('+video.cover_img_url+')'}">
					<view style="width: 100%;height: 100%;background-color: rgba(100,100,100,0.7);"></view>
					<view style="position: absolute;bottom: 0upx;left: 0upx;font-size: 24upx;padding: 8upx 10upx;width: 100%;overflow: hidden;">
						<view>{{video.logtimelabel}}</view>
						<view>{{video.video_desc}}</view>
					</view>
					<image src="http://www.dpsoft.top/goodshowres/play.png" style="position: absolute;width: 120upx;height:120upx;top:115upx;left:65upx;"></image>
				</view>
			</scroll-view>
			
		
		
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				system:this.systemInfo(),
				login:false,
				user:{},
				count:{},
				myvideolist:[],
				browserlist:[],
				likelist:[]
			}
		},
		onLoad(option) {
			this.init();
			let user = this.getUserInfo();
			if(!user){
				uni.$once('logon',(data) => {
					this.init();
				});
			}
		},
		methods:{
			setuserinfo(e){
				var action = e.currentTarget.dataset.action;
				this.$options.methods[action]();
			},
			init(){
				try{
					let user = this.getUserInfo();
					if(user){
						
						this.user = user;
						this.login = true;
						
						this.postJson({
							path:'/user/count/query',
							data:{uid:user.uid},
							success:(res) => {
								if("ok" == res.data.status){
									this.count = res.data.count;
								}
							}
						});
						
						
						this.postJson({
							path:'/user/video/list',
							data:{
								type:0
							},
							success:(res)=>{
								if("ok" == res.data.status){
									this.myvideolist = res.data.data;
									for(let x in this.myvideolist){
										this.myvideolist[x].logtimelabel = new Date(this.myvideolist[x].log_time).toLocaleDateString();
									}
								}
							}
						});
						
						this.postJson({
							path:'/user/video/list',
							data:{
								type:1
							},
							success:(res)=>{
								if("ok" == res.data.status){
									this.browserlist = res.data.data;
									for(let x in this.browserlist){
										this.browserlist[x].logtimelabel = new Date(this.browserlist[x].log_time).toLocaleDateString();
									}
								}
							}
						});
						
						this.postJson({
							path:'/user/video/list',
							data:{
								type:2
							},
							success:(res)=>{
								if("ok" == res.data.status){
									this.likelist = res.data.data;
									for(let x in this.likelist){
										this.likelist[x].logtimelabel = new Date(this.likelist[x].log_time).toLocaleDateString();
									}
								}
							}
						});
					}else{
						this.login = false;
						this.user = {};
					}
					
				}catch(e){
					console.error(e);
				}
			},
			tologin:function(){
				uni.navigateTo({
					url:"/pages/login/login?page=/pages/my/my"
				})
			},
			tosetting:function(){
				uni.navigateTo({
					url:"/pages/setting/setting"
				});
			},
			tovideo:function(e){
				let type = e.currentTarget.dataset.type;
				let index = e.currentTarget.dataset.index;
				uni.navigateTo({
					url:'/pages/video/video?type='+type+'&index='+index
				});
			},
			updateHeadImage(){
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: (res) => {
						console.log(JSON.stringify(res.tempFilePaths));
						
						uni.showLoading({
							title:"加载中"
						});
						this.loading = true;
						uni.uploadFile({
							url: 'https://www.dpsoft.top/upload.jsp', 
							filePath: res.tempFilePaths[0],
							name: 'file',
							
							success: (uploadFileRes) => {
								console.log(uploadFileRes.data);
								let data = JSON.parse(uploadFileRes.data);
								if("ok" == data.status){
									let webpathSuffix = data.data;
									let url = "http://www.dpsoft.top/"+webpathSuffix;
									this.user.head_img = url;
									let data = {
										headImg: url
									};
									this.postJson({
										path:'/user/setting/do',
										data:data,
										success:(res) => {
											if("ok" == res.data.status){
												this.setUserInfo(this.user);
											}
										}
									})
									
								}
								
							},
							complete: ()=> {
								uni.hideLoading();
							}
						});
						
					}
				});
			}
			
		}
	}
	
</script>

<style>
.my .cu-list.menu>.cu-item.arrow:before {
	color: white;
}

</style>
