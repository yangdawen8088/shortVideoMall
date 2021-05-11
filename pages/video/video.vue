<template>
	<view class="video content" v-bind:style="{height: clientHeight+ 'px'}">
		<view @tap="back" class="cuIcon-roundleftfill-copy" style="position: fixed;color: rgba(100,100,100,0.7);left: 30upx; font-size: 70upx;z-index: 99;" v-bind:style="{top:system.statusBarHeight+'px'}"></view>

		<scroll-view class="scroll-content" v-bind:style="{height: clientHeight+ 'px'}" :scroll-y="true" :scroll-with-animation="true"  @scroll="scroll" @scrolltolower="scrolltolower" :scroll-into-view="scrollToView"  @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"  @tap="play(currentPage)" >
		
		<view v-for="(video,index) in videolist" :key="index" v-bind:id="'view-'+index" class="video-view" v-bind:style="{backgroundImage:'url('+video.cover_img_url+')', height: clientHeight+ 'px'}"  >
				
			<video v-if="index == playIndex "  v-bind:id="'video-'+index" :src="video.video_url" v-bind:style="{height: clientHeight+ 'px'}" loop="true" :controls="false" :show-progress="false" :show-fullscreen-btn="false" :show-play-btn="false" :show-center-play-btn="false" :enable-progress-gesture="false"  >
				<!-- <cover-view class="touchlayer" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"> -->
				<!-- <cover-view class="mask" v-bind:style="{backgroundColor:(index===playIndex?'rgba(100,100,100,0)':'rgba(100,100,100,0.5)')}" @tap="play(index)"   > -->
					<cover-image :animation="animationData"  v-if="showCover"  class="play_icon" src="/static/img/play.png" v-bind:style="{display:index!=playIndex?'block':'none'}" ></cover-image>
				<!-- </cover-view> -->
				
				<cover-view :animation="animationData" v-if="showCover" class='container-action'>
					
					<cover-image class="action head-img" :src="video.head_img" ></cover-image>
					
					<cover-image class="action like" src='/static/img/favor.png' ></cover-image>
					<cover-view class="action-number">{{video.favorite_num}}</cover-view>

					
					<cover-image class="action comment" src='/static/img/comments.png' ></cover-image>
					<cover-view class="action-number">{{video.comment_num}}</cover-view>
					
					<cover-image class="action share" src='/static/img/share.png' ></cover-image>
					<cover-view class="action-number">{{video.share_num}}</cover-view>
					<cover-image @tap="toPage('/pages/goods/goods?goodsId='+video.goodsid)" class="action buy" src='/static/img/buy.png' ></cover-image>
					
				</cover-view>

				<cover-view :animation="animationData"  v-if="showCover"  class='container-words'>
					<cover-view class="location">
						<cover-image class="location-icon" src="/static/img/small_location_white.png"></cover-image>
						
						<cover-view class="address">{{video.location_name}}</cover-view>
					</cover-view>
					
					<cover-view class="words nickname">@{{video.nick_name}}</cover-view>

					<cover-view class='words desc'>{{video.video_desc}}</cover-view>
					
					<cover-view v-if="video.goodstitle != null" @tap="toPage('/pages/goods/goods?goodsId='+video.goodsid)" class="goods">
						<cover-view class="pricetag">
							<cover-view class="price">
								¥{{video.goodsprice}}
							</cover-view>
							<cover-image  v-if="video.promote===1" class="tag" src="/static/img/promote.png"></cover-image>
							
						</cover-view>
							
						<cover-view class="title">
							{{video.goodstitle}}
						</cover-view>
							
						<cover-view class="shop">
							<cover-image class="dian" src="/static/img/dian_small.png"></cover-image>
						
							<cover-view class="seller">
								{{video.goodsnick}} | {{video.goodsarea}}
							</cover-view>
							
						</cover-view>
					</cover-view>


				</cover-view>
				<!-- </cover-view> -->
			</video>
		
				<view v-if="index != playIndex " class="touchlayer">
					
					<view class="mask" v-bind:style="{backgroundColor:(index===playIndex?'rgba(100,100,100,0)':'rgba(100,100,100,0.5)')}"  >
						<image class="play_icon" src="/static/img/play.png" v-bind:style="{display:index!=playIndex?'block':'none'}" ></image>
					</view>
					
					<view class='container-action'>
						
						<image class="action head-img" :src="video.head_img" ></image>
						
						<image class="action like" src='/static/img/favor.png' ></image>
						<view class="action-number">{{video.favorite_num}}</view>

						
						<image class="action comment" src='/static/img/comments.png' ></image>
						<view class="action-number">{{video.comment_num}}</view>
						
						<image class="action share" src='/static/img/share.png' ></image>
						<view class="action-number">{{video.share_num}}</view>
						<image @tap="toPage('/pages/goods/goods?goodsId='+video.goodsid)" class="action buy" src='/static/img/buy.png' ></image>
						
					</view>

					<view class='container-words'>
						<view class="location">
							<image class="location-icon" src="/static/img/small_location_white.png"></image>
							
							<view class="address">{{video.location_name}}</view>
						</view>
						
						<view class="words nickname">@{{video.nick_name}}</view>

						<view class='words desc'>{{video.video_desc}}</view>
						
						<view v-if="video.goodstitle != null" @tap="toPage('/pages/goods/goods?goodsId='+video.goodsid)" class="goods">
							<view class="pricetag">
								<view class="price">
									¥{{video.goodsprice}}
								</view>
								<image  v-if="video.promote===1" class="tag" src="/static/img/promote.png"></image>
								
							</view>
								
							<view class="title">
								{{video.goodstitle}}
							</view>
								
							<view class="shop">
								<image class="dian" src="/static/img/dian_small.png"></image>
							
								<view class="seller">
									{{video.goodsnick}} | {{video.goodsarea}}
								</view>
								
							</view>
						</view>


					</view>
					
				</view>
 
			</view>
		</scroll-view>
		
		
	</view>
	
</template>

<script>
export default {
	data() {
		return {
			system:this.systemInfo(),
			title: 'Hello',
			videolist:[],
			clientHeight:'0',
			currentPage:0,
			showPage:0,
			nextPage:0,
			outDown:-1,
			inDown:-1,
			outTop:-1,
			inTop:-1,
			touchdata:{
				can:true,
				startY:0,
				endY:0,
				diff:0
			},
			playIndex:-1,
			scrollTop:0,
			scrollStart:-1,
			scrollToView:'view-0',
			refresh:false,
			showCover:false,
			animationData:{},
			playTime:0
		};
	},
	mounted(){
		uni.getSystemInfo({
			success: (res) => {
				console.log(res.model);
				console.log(res.pixelRatio);
				console.log(res.windowWidth);
				console.log(res.windowHeight);
				console.log(res.language);
				console.log(res.version);
				console.log(res.platform);
				this.$data.clientHeight = res.windowHeight;
				
			}
		});
	},
	watch: {
     
    },
	onLoad(option) {
		let type = option.type;
		let index = option.index;
		
		this.postJson({
			path:'/user/video/list',
			data:{
				type:type
			},
			success:(res)=>{
				if("ok" == res.data.status){
					this.videolist = res.data.data;
					this.currentPage = index;
					this.scrollToView = "view-"+index;
				}
			}
		});
	},
	onReachBottom:function(){
		
		this.play(-1);
		
	},
	onPullDownRefresh: function(){
		this.play(-1);
		uni.stopPullDownRefresh();
	},
	methods: {
		play:function(index){
			// uni.showToast({
			// 	title:this.playIndex+"->"+index
			// });
			let videoId = 'video-'+index;
			let currentVideoId = 'video-'+this.playIndex;
			if(-1 == this.playIndex){
				this.playIndex = index;
				let video = uni.createVideoContext(videoId);
				if(video){
					video.play();
					this.playTime = new Date().getTime();
				}
				
				
			}else{
				let video = uni.createVideoContext(currentVideoId);
				if(video){
					video.pause();
					let playinfo = {
						playTime : this.playTime,
						endTime: new Date().getTime(),
						videoId: this.videolist[this.playIndex].id,
						videoUid: this.videolist[this.playIndex].uid
					};
					
					this.browser(playinfo);
					
					if(index != this.playIndex){
						this.playIndex = index;
						video = uni.createVideoContext(videoId);
						if(video){
							video.play();
							this.playTime = new Date().getTime();
						}
					}else{
						this.playIndex = -1;
					}
				}
			}
		},
		pause:function(index){
			let videoId = 'video-'+index;
			
			let video = uni.createVideoContext(videoId);
			if(video){
				video.pause();
				let playinfo = {
					playTime : this.playTime,
					endTime: new Date().getTime(),
					videoId: this.videolist[index].id,
					videoUid: this.videolist[index].uid
				};
				
				this.browser(playinfo);
			}
			this.playIndex = -1;
		},
		browser:function(playinfo){
			if(playinfo.playTime<=0){
				return;
			}
			this.playTime = 0;
			this.postJson({
				path:"/video/browser/do",
				data:playinfo,
				success:(res)=>{
					
				}
			});
		},
		tap:function(e){
			uni.showToast({
				title:"ontap"
			});
		},
		scroll: function(e) {
            
			setTimeout(()=>{
				this.pause(this.currentPage);
			
				if(this.playIndex != -1){
					// this.scrollTop = e.detail.scrollTop;
				}
				this.touchdata.diff += e.detail.deltaY;
				if(this.touchdata.diff > 0){
					console.log("this.touchdata.diff>0");
					if(e.detail.scrollTop%this.clientHeight < this.clientHeight-10 ){
						console.log("e.detail.scrollTop%this.clientHeight < this.clientHeight*3/4");
						this.nextPage = Math.floor(e.detail.scrollTop / this.clientHeight);
					}else{
						this.nextPage = Math.floor(e.detail.scrollTop / this.clientHeight+1);
					}
					if(this.nextPage < 0){
						this.nextPage = 0;
					}
				}else{
					if(e.detail.scrollTop%this.clientHeight >= 10 ){
						this.nextPage = Math.floor(e.detail.scrollTop / this.clientHeight  + 1);
					}else{
						this.nextPage = Math.floor(e.detail.scrollTop / this.clientHeight);
					}
					if(this.nextPage >= this.videolist.length){
						this.nextPage = this.videolist.length-1;
					}
				}
			},100);
			
			
			
			
        },
		scrollTo: function(index) {
            
			this.play(index);
			
        },
		scrollMove:function(e){
			
			
		},
		touchStart:function(e){
			let touch = e.touches[0];
			this.touchdata.startY = touch.pageY;
			this.scrollStart = this.scrollTop;
			console.log("y="+this.touchdata.startY);
			this.inDown = -1;
			this.outTop = -1;
			this.inTop = -1;
			this.outDown = -1;
			
			this.touchdata.diff=0;
			
		},
		touchMove:function(e){
	
			
			
			let touch = e.touches[0];
			let endY = touch.pageY;
			this.touchdata.diff = endY - this.touchdata.startY;
			// this.scrollTop = this.scrollStart-this.touchdata.diff;
			// if(this.touchdata.diff>0 && this.currentPage > 0){
			// 	this.nextPage = this.currentPage - 1;
			// }else{
			// 	this.nextPage = this.currentPage + 1;
			// }
			// uni.showToast({
			// 	title:this.touchdata.diff+''
			// });
			console.log("currentPage="+this.currentPage+",nextPage="+this.nextPage+",diff="+this.touchdata.diff+",y="+endY+",startY="+this.touchdata.startY);
			
		},
		touchEnd:function(e){
			
			// this.nextPage = -1;
			// if((this.touchdata.diff >this.clientHeight/4|| this.touchdata.diff<-this.clientHeight/4) ){
			// 	if(this.touchdata.diff > 0){
			// 		if(this.currentPage <= 0){
			// 			return;
			// 		}
			// 		this.outDown = this.currentPage;
			// 		this.currentPage = this.currentPage-1;
			// 		this.inDown = this.currentPage;
			// 		
			// 		this.inTop = -1;
			// 		this.outTop = -1;
			// 	}else{
			// 		if(this.currentPage >= this.videolist.length-1){
			// 			return;
			// 		}
			// 		this.outTop = this.currentPage;
			// 		this.currentPage = this.currentPage+1;
			// 		this.inTop = this.currentPage;
			// 		this.inDown = -1;
			// 		this.outDown = -1;
			// 	}
			// }else{
			// 	
			// 	if(this.touchdata.diff>0 && this.currentPage>0){
			// 		this.inDown = this.currentPage;
			// 		this.outTop = this.currentPage-1;
			// 		this.inTop = -1;
			// 		this.outDown = -1;
			// 	}else{
			// 		this.inTop = this.currentPage;
			// 		this.outDown = this.currentPage+1;
			// 		this.outTop = -1;
			// 		this.inDown = -1;
			// 	}
			// }
			
			// uni.showToast({
			// 	title:this.nextPage+''
			// });
			
			let that = this;
			this.touchdata.diff = 0;
			// this.scrollTop = this.nextPage*this.clientHeight;
			this.scrollToView = 'view-'+this.nextPage;
			setTimeout(()=>{
				this.scrollToView = "";
			},500);
			if(this.currentPage != this.nextPage){
				this.currentPage = this.nextPage;
				
				// that.play(that.currentPage);
				
			}else{
				
			}
		
			
			console.log("currentPage="+this.currentPage+",nextPage="+this.nextPage+",diff="+this.touchdata.diff);
			
		},
		
		touchCacel:function(e){
			this.touchEnd(e);
			
			
		}
	
	}
};
</script>

<style>
.video cover-view.touchlayer{
	position: relative;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-color: rgba(200,0,0,0);
}
.video view.touchlayer{
	position: relative;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-color: rgba(200,0,0,0);
}
.video cover-view.container-action{
	width: 90upx;
	bottom: 60upx;
	right: 20upx;
	position: absolute;
}
.video view.container-action{
	width: 90upx;
	bottom: 60upx;
	right: 20upx;
	position: absolute;
}

.video .container-action .action{
	margin-top: 40upx;
	width: 90upx;
	height: 90upx;
}
.video .container-action .action-number{
	text-align: center;
	color: white;
	margin-top: 10upx;
	font-size: 30upx;
}
.video .container-action .action.head-img{
	border-radius: 50upx;
}

cover-view.container-words{
	position: absolute;
	width: 75%;
	left: 20upx;
	bottom: 40upx;
	color: white;
	font-size: 34upx;
	white-space: pre-wrap;
}
view.container-words{
	position: absolute;
	width: 75%;
	left: 20upx;
	bottom: 40upx;
	color: white;
	font-size: 34upx;
	white-space: pre-wrap;
}

.container-words .location{
	width: 100%;

}
.container-words .location .location-icon{
	display: inline-block;
	width: 40upx;
	height: 40upx;
	vertical-align: middle;
}
.container-words .location .address{
	display: inline-block;
	height: 40upx;
	color: white;
	font-size: 30upx;
}
.container-words .words{
	margin-top: 10upx;
	white-space: pre-wrap;
	width: 100%;
}
.container-words .goods{
	background-color: rgba(130,130,130,0.5);
	border-radius: 10upx;
	padding: 15upx;
	vertical-align: middle;
	margin-top: 10upx;
}
.container-words .goods .price{
	color: red;
	font-weight: bold;
	font-size: 40upx;
	width: 150upx;
	display: inline-block;
}
.container-words .goods .tag{
	left: 100upx;
	height: 30upx;
}
.container-words .goods .title{
	color: yellow;
	font-weight: bold;
	font-size: 34upx;
	white-space: pre-wrap;
	width: 100%;
	margin-top: 10upx;
}
.container-words .shop{
	width: 100%;
	margin-top: 10upx;
}
.container-words .shop .dian{
	height: 40upx;
	width: 40upx;
	display: inline-block;
	vertical-align: bottom;
}
.container-words .shop .seller{
	left: 40upx;
	display: inline-block;
	height: 40upx;
	
}
cover-view.mask{
	width: 100%;
	height: 100%;
	position: absolute;
	
}
view.mask{
	width: 100%;
	height: 100%;
	position: absolute;
	
}
.play_icon{
	width: 150upx;
	height: 150upx;
	margin-left: auto;
	margin-right: auto;
	margin-top: 65%;
}
	
.content {
	width: 100%;
	margin: 0;
	background-color: black;

}
.content video{
	width: 100%;
	
	margin: 0;
	
}
.scroll-content{
	width: 750upx;
	
	margin: 0;
	overflow: scroll;
	position: absolute;
}
.video-view{
	background-position: center; 
	background-size: contain;
	background-repeat: no-repeat;
	width: 750upx;
	margin: 0;
}
.video-view video{
	width: 100%;
	margin: 0;
	position: relative;
}
.video-view image{
	
}

.page223{ display:flex; justify-content:center; align-items:center; width:100%; position: absolute;top: 0;left: 0;  overflow:hidden;}
.page.hide{ display:none;}
 
/*==================================*/
 
.page.inTop{
            -webkit-animation:ShowTop .5s ease-out both;
					animation:ShowTop .5s ease-out both;
}
.page.outTop{
            -webkit-animation:HideTop .5s ease-out both;
					animation:HideTop .5s ease-out both;
}
.page.inDown{
            -webkit-animation:ShowDown .5s ease-out both;
					animation:ShowDown .5s ease-out both;
}
.page.outDown{
            -webkit-animation:HideDown .5s ease-out both;
					animation:HideDown .5s ease-out both;
}
@-webkit-keyframes ShowTop{
100%{ top:0;}
}
@keyframes ShowTop{

100%{ top:0;}
}
@-webkit-keyframes HideTop{
100%{ top:-100%;}
}
@keyframes HideTop{
100%{ top:-100%;}
}
@-webkit-keyframes ShowDown{
100%{ top:0;}
}
@keyframes ShowDown{
100%{ top:0;}
}
@-webkit-keyframes HideDown{
100%{ top:100%;}
}
@keyframes HideDown{
100%{ top:100%;}
}
 
/*==================================*/
 
.arrow{ width:70px; height:56px; line-height:56px; text-align:center; font-size:50px; font-weight:bold; color:#d00; position:absolute; left:285px; bottom:10px;
			-webkit-animation:arrow 1.2s .5s ease-in-out infinite;
					animation:arrow 1.2s .5s ease-in-out infinite;
}
@-webkit-keyframes arrow{
	0%{ -webkit-transform:translateY(0); opacity:1;}
	100%{ -webkit-transform:translateY(-50%); opacity:0}
}
@keyframes arrow{
	0%{ transform:translateY(0); opacity:1;}
	100%{ transform:translateY(-50%); opacity:0}
}
 
 
/*==================================*/
 
@-webkit-keyframes fadeRightTan{
	0%{ -webkit-transform:translateX(100%); opacity:0;}
	70%{ -webkit-transform:translateX(-5%); opacity:1;}
	80%{ -webkit-transform:translateX(2%); opacity:1;}
	90%{ -webkit-transform:translateX(-2%); opacity:1;}
	100%{ -webkit-transform:translateX(0); opacity:1;}
}
@keyframes fadeRightTan{
	0%{ transform:translateX(100%); opacity:0;}
	70%{ transform:translateX(-5%); opacity:1;}
	80%{ transform:translateX(2%); opacity:1;}
	90%{ transform:translateX(-2%); opacity:1;}
	100%{ transform:translateX(0); opacity:1;}
}



</style>
