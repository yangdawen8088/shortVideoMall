<template>
	<view class="goods bg-white">
		
		
		
		<view @tap="back" class="cuIcon-roundleftfill-copy" style="position: fixed;color: rgba(100,100,100,0.7);left: 30upx; font-size: 70upx;z-index: 99;" v-bind:style="{top:system.statusBarHeight+'px'}"></view>

		<scroll-view scroll-y="true" :scroll-into-view="scrollTo" enable-back-to-top class="padding bg-white solid-bottom"   v-bind:style="{height:system.windowHeight+'px'}" style="padding-top: 0;padding-bottom: 0;">
			<view id="title" class="flex p-xs  mb-sm" v-bind:style="{marginTop:system.statusBarHeight+30+'px'}">
				<view class="flex-sub text-black" style="font-size: 40upx;font-weight: bold;">{{goods.title}}</view>
				
			</view>
			<view class="flex justify-start">
					<view class="padding-sm text-gold-dark" style="font-size: 46upx;font-weight: bold;display: table-cell;vertical-align: middle;">{{priceLabel}}</view>
					<view v-if="promoteFlag" class="" style="display: table-cell;vertical-align: middle;">
						<text class="bg-gold-dark" style="padding:5upx 10upx; color: white;border-radius: 10upx;">促销</text>
					</view>
					<view v-if="promoteFlag" style="display: table-cell;vertical-align: middle;">
						<text class="bg-gold-dark" style="font-size: 32upx;">{{promoteLabel}}</text>
					</view>
			</view>
			<view v-if="goods.discount_text!=null" class="flex text-lg text-bold margin-bottom-sm">
				<view class="flex-sub" style="padding-left: 0;">{{goods.discount_text}}</view>
			</view>
			<view class="flex text-lg text-bold margin-bottom-sm">
				<view class="flex-sub" style="padding-left: 0;">商品规格:</view>
				<view class="flex-treble" style="text-decoration: underline;">
					<picker mode="selector" @change="selectStyle" :value="styleIndex" :range="stylelist">
                        {{styleIndex>-1?goods.style[styleIndex].styleName : '请选择'}}
                    </picker>
				</view>
			</view>
			<view class="flex justify-start margin-bottom-sm align-center">
				
					<image style="height: 34upx;width: 34upx;border-radius: 10upx;" src="/static/img/dian_small.png"></image>
				
				<view class="text-lg text-bold text-gold-dark" style="margin-left: 10upx;">{{goods.seller}}</view>
					
			</view>
			<view class="flex text-lg text-bold margin-bottom-sm" style="display: table; vertical-align: middle;">
				<view style="display: table-cell;vertical-align: middle;width: 30%;">{{takeTypeArray[goods.take_type]}}
				<text v-if="goods.take_type == 2" class="text-price text-gold-dark">{{goods.post_fee}}</text>
				</view>
				<view style="display: table-cell;vertical-align: middle;">
					<image style="height: 40upx;width: 40upx;" src="/static/img/small_location.png"></image>
				</view>
				<view style="display: table-cell;font-size: 26upx;vertical-align: middle;">
					{{goods.location}}
				</view>
			</view>
			<view  style="border: solid 0.1upx #666;"></view>
			
			<view style="margin: 20upx 0; padding-bottom: 100upx;">
				<block v-for="(detail, index) in detaillist"  v-bind:key="index">
					<text v-if="detail.type == 'text'">{{detail.value}}</text>
					
					<image v-bind:id="'goodsimg'+index" class="goods-img"   v-if="detail.type == 'image'" :src="detail.value" @load="goodsImageLoad" style="width: 100%;" v-bind:style="{height:(goodsImages['goodsimg'+index]?goodsImages['goodsimg'+index].height : goodsImgHeightInit)+'px'}"></image>
				</block>
			</view>
			
			
		</scroll-view>
		
		<view class="cu-bar bg-white tabbar border shop fixed " style="top: unset;bottom: 0;z-index: 100;">
				<view @tap="contactSeller" class="flex-sub submit cuIcon-messagefill text-white" style="flex: 1;font-size: 60upx;background-color: #222222;"></view>
				
				<view @tap="buy" class="flex-treble bg-gold-dark submit text-white">购买</view>
		</view>
		
		
	</view>
</template>

<script>
	
	export default {
		
		data:function(){
			return {
				system:this.systemInfo(),
				goodsImages:{},
				goodsImgHeightInit:300,
				scrollTo:'',
				goods:{},
				priceLabel:"",
				detaillist:[],
				stylelist:[],
				styleIndex:-1,
				promoteFlag:false,
				promoteLabel:'',
				takeTypeArray:['门店消费','免邮','邮费'],
				price:0
			}
		},
		onShareAppMessage(res) {
			
			
			let title = '「好物短视频」'+ this.goods.title;
			
			return {
			  title: title,
			  path: '/pages/goods/goods?goodsId='+this.goods.id
			}
		},
		onLoad:function(option){
			uni.showShareMenu({});
			let goodsId = option.goodsId;
			this.init(goodsId);
			
			
			
			let user = this.getUserInfo();
			if(!user){
				uni.$once('logon',(data) => {
					this.init(goodsId);
				});
			}
			
		},
		methods:{
			init:function(goodsId){
				
				
				this.postJson({
					path:"/goods/new/detail",
					data: {
						goodsid: goodsId
					},
					success: (res) => {
						console.log(res.data);
						if("ok" == res.data.status){
							this.$data.goods = res.data.data;
							this.promoteFlag = this.goods.promote == 1;
							if(this.goods.price > this.goods.promote_price){
								this.priceLabel = "¥"+this.goods.promote_price + " ~ ¥" + this.goods.max_price;
							}else{
								this.priceLabel = "¥"+this.goods.price + " ~ ¥" + this.goods.max_price;
							}
							this.detaillist = this.goods.detail;
							let styleArray = this.goods.style;
							for(let x in styleArray){
								let style = styleArray[x];
								let styleName = style.styleName;
								let goodsPrice = style.goodsPrice;
								let styleString = styleName+" ¥"+goodsPrice;
								let promotePrice = style.promotePrice;
								if(typeof(promotePrice) != 'undefined' && promotePrice!=null){
									styleString = styleName+" ¥"+promotePrice;
								}
								this.stylelist.push(styleString);
							}
							
							// for(let x in this.detaillist){
							// 	let detail = this.detaillist[x];
							// 	if("image" == detail.type){
							// 		this.goodsImages['goodsimg'+x] = {height:0};
							// 	}
							// }
						}
					}
				})
				
				
				
			},
			selectStyle: function(e) {
				console.log('选择商品规格为', e.target.value)
				this.styleIndex = e.target.value
				let style = this.goods.style[this.styleIndex];
				if(style.promotePrice){
					
					this.promoteFlag = true;
					let promoteStartTime = style.promoteStarttime;
					let promoteEndTime = style.promoteEndtime;
					let now = Math.floor(Date().getTime()/1000);
					if(now < promoteStartTime){
						this.priceLabel = '¥'+style.goodsPrice;
						this.promoteLabel =  new Date(promoteStartTime*1000).toLocaleDateString()+"开始";
						this.price = style.goodsPrice;
					}else if(now > promoteEndTime){
						this.priceLabel = '¥'+style.goodsPrice;
						this.promoteLabel =  "已结束";
						this.price = style.goodsPrice;
					}else{
						this.priceLabel = '¥'+style.promotePrice;
						this.promoteLabel =  new Date(promoteEndTime*1000).toLocaleDateString()+"截止";
						this.price = style.promotePrice;
					}
					
				}else{
					this.priceLabel = '¥'+style.goodsPrice;
					this.promoteFlag = false;
					this.price = style.goodsPrice;
				}
			},
			buy:function(){
				
				if(!this.getUserInfo()){
					let page = encodeURIComponent("/pages/goods/goods?goodsId="+this.goods.id);
					this.toPage("/pages/login/login?page="+page);
					return;
				}
				
				if(this.styleIndex > -1){
					this.toPage("/pages/goods/goodsbuy?goodsId="+this.goods.id+"&styleName="+this.goods.style[this.styleIndex].styleName);
				}else{
					uni.showToast({
						icon:'none',
						title:"请选择商品规格"
					});
					this.scrollTo = 'title';
					setTimeout(()=>{
						this.scrollTo = '';
					},1000)
					
				}
			},
			contactSeller(){
				  if(!this.getUserInfo()){
					var s = encodeURIComponent("/pages/goods/goods?goodsId=" + this.goods.id); 
					this.toPage("/pages/login/login?page=" + s) 
					return;
				  }	
				uni.showLoading({
					title:"加载中",
					mask:true
				});
				this.postJson({
					path:"/seller/user",
					data:{
						sellerUid:this.goods.uid,
						goods:this.goods
					},
					success:(res)=>{
						if("ok" == res.data.status){
							let seller = res.data.data;
							// uni.makePhoneCall({
							// 	phoneNumber:seller.phone
							// });
							var user = this.getUserInfo();
							var nameList = {
							  myName: user.uid,
							  your: this.goods.uid,
							  sellerName: this.goods.seller,
							  sellerHead: seller.head_img,
							  seller:seller,
							  me:user
							};
							uni.navigateTo({
							  url: "../chatroom/chatroom?username=" + JSON.stringify(nameList)
							});
							
						}else{
							uni.showToast({
								icon:'none',
								title:res.data.msg
							});
						}
					},
					complete:()=>{
						uni.hideLoading();
					}
					
				});
			},
			goodsImageLoad:function(e){
				
				let imgId = e.target.id;
				let height = e.target.height;
				let width = e.target.width;
				let imgWidth = (750-60)*this.system.windowWidth/750;
				let imgHeight = height * imgWidth / width;
				
				this.goodsImages[imgId] = {
					width:imgWidth,
					height:imgHeight
				};
				this.goodsImgHeightInit = imgHeight;
				
				console.log(goodsImages);
				
			}
			
			
		}
	}
</script>

<style>
	
	
</style>
