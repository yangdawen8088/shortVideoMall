<template>
	<view class="goodsbuy " style="position: fixed;width: 100%;height: 100%;" v-bind:style="{paddingTop:system.statusBarHeight+'px'}">
		<view class="cu-bar ">
			<view class="action" @tap="back">
				<text class="cuIcon-back"></text>
			</view>
			<view class="content text-bold">
				下单支付
			</view>
		</view>
		<scroll-view scroll-y="true" style="width: 100%;height: 100%;">
			<form>
				<view class="cu-form-group margin-top">
					<view class="title">收货人</view>
					<input placeholder="输入收货人姓名" name="receiver" v-model="receiver"></input>
				</view>
				
				<view class="cu-form-group">
					<view class="title">手机号</view>
					<input placeholder="输入收货人手机号" type="tel" name="phone" v-model="phone"></input>
					
				</view>
				
				<view class="cu-form-group">
					<view class="title">地址选择</view>
					<picker mode="multiSelector" @change="selectRegion" @columnchange="regionChange" :value="regionIndex" :range="regionArray">
						<view class="picker">
							{{region}}
						</view>
					</picker>
				</view>
				
				<view class="cu-form-group">
					<textarea maxlength="-1" placeholder="请输入详细地址" v-model="address"></textarea>
				</view>
				
				<view class="cu-form-group align-start">
					<view class="title">备注</view>
					<textarea maxlength="-1" placeholder="你想对卖家说什么" v-model="remark"></textarea>
				</view>
				<view class="cu-form-group">
					<view class="title">商品规格</view>
					<picker mode="selector" @change="selectStyle" :value="styleIndex" :range="stylelist">
                        <view class="picker">
						{{styleIndex>-1?goods.style[styleIndex].styleName : '请选择'}}
						</view>
                    </picker>
					
				</view>
				<view class="cu-form-group">
					<view class="title">商品价格</view>
					<text class="text-red text-bold text-xl">{{priceLabel}}</text>
				</view>
				<view class="cu-form-group">
					<view class="title">购买数量</view>
					<uni-number-box :min="1" :max="10"  :value="count" @change="countChange"></uni-number-box>
				</view>
				<view class="cu-form-group">
					<view class="title">运费</view>
					<text class="text-red text-bold text-price text-xl">{{goods.post_fee}}</text>
				</view>
				<view v-if="goods.discount_amount!=null" class="cu-form-group">
					<view class="title">{{goods.discount_label}}</view>
					<text class="text-red text-bold text-price text-xl">{{goods.discount_amount}}</text>
				</view>
				
			</form>
		</scroll-view>
		
		<view class="cu-bar bg-white tabbar border shop fixed " style="top: unset;bottom: 0;z-index: 100;">
				<view class="flex-treble bg-white submit text-price text-red" style="flex: 1;font-size: 60upx;">
					{{price*count+goods.post_fee-(goods.discount_amount!=null?goods.discount_amount:0)}}
				</view>
				
				<view v-if="paytype == 'wxpay'" @tap="wxpay" class="flex-sub bg-green submit">微信支付</view>
				<view v-if="paytype == 'alipay'" @tap="alipay" class="flex-sub bg-blue submit">支付宝支付</view>
				<view v-if="paytype == 'nopay'"  class="flex-sub bg-grey submit">请使用客户端或小程序</view>
		</view>	
		
	</view>
</template>

<script>
	import uniNumberBox from '@dcloudio/uni-ui/lib/uni-number-box/uni-number-box.vue'
	export default {
		components: {uniNumberBox},
		data:function(){
			return {
				system:this.systemInfo(),
				goods:{},
				priceLabel:"",
				detaillist:[],
				stylelist:[],
				styleIndex:-1,
				promoteFlag:false,
				promoteLabel:'',
				region: '',
				regionArray:[['请选择'],['请选择'],['请选择']],
				regionIndex:[0,0,0],
				regionData:[],
				price:0,
				count:1,
				tobuy:true,
				tobuyAnimation:{},
				paytype:'nopay',
				remark:'',
				address:'',
				receiver:this.getUserInfo().nick_name,
				phone:this.getUserInfo().phone
				
			}
		},
		onLoad:function(option){
			
			let goodsId = option.goodsId;
			let initStyleName = option.styleName;
			this.postJson({
				path: '/goods/new/detail',
				
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
							let price = goodsPrice;
							
							if(style.promotePrice){
					
								let promoteStartTime = style.promoteStarttime;
								let promoteEndTime = style.promoteEndtime;
								let now = Math.floor(Date().getTime()/1000);
								if(now < promoteStartTime){
									styleString = styleName+" ¥"+goodsPrice;
									price = style.goodsPrice;
								}else if(now > promoteEndTime){
									styleString = styleName+" ¥"+goodsPrice;
									price = style.goodsPrice;
								}else{
									styleString = styleName+" ¥"+promotePrice;
									price = style.promotePrice;
								}
								
							}else{
								styleString = styleName+" ¥"+goodsPrice;
								price = style.goodsPrice;
							}
				
							
							this.stylelist.push(styleString);
							if(initStyleName == styleName){
								this.styleIndex = x;
								this.price = price;
								this.priceLabel = '¥'+price;
							}
						}
					}
				}
			});
			
			
			
			let that = this;
				let data = {
					multiArray: this.regionArray,
					multiIndex: this.regionIndex,
					multiData: this.regionData
				};
			let pcode = '100000';
			this.postJson({
				path: '/video/district', 
				
				data: {
					code: pcode
				},
				
				success: (res) => {
					console.log(res.data);
					if("ok" == res.data.status){
						data.multiData[0] = res.data.data;
						data.multiArray[0] = [];
						for(let x in res.data.data){
							let district = res.data.data[x];
							data.multiArray[0].push(district.name);
						}
						data.multiIndex[1] = 0;
						data.multiArray[1] = ['请选择'];
						data.multiArray[2] = ['请选择'];
						data.multiIndex[2] = 0;
						
						this.regionArray = data.multiArray;
						this.regionIndex = data.multiIndex;
						this.regionData = data.multiData;
						this.region = 'xx省xx市xx县';
					}
				}
			});
			
			
			uni.getProvider({
				service: 'payment',
				success: (res) => {
					console.log(res.provider)
					if (~res.provider.indexOf('wxpay')) {
						this.paytype = 'wxpay';
					}else if (~res.provider.indexOf('alipay')) {
						this.paytype = 'alipay';
					} 
				}
			});
		},
		methods:{
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
			
			selectRegion(e) {
				this.multiIndex = e.detail.value;
				
			},
			regionChange(e) {
				let that = this;
				let data = {
					multiArray: this.regionArray,
					multiIndex: this.regionIndex,
					multiData: this.regionData
				};
				data.multiIndex[e.detail.column] = e.detail.value;
				switch (e.detail.column) {
					case 0:{
						
						let pcode = data.multiData[0][data.multiIndex[0]].code;
						this.postJson({
							path: '/video/district', 
							
							data: {
								code: pcode
							},
							
							success: (res) => {
								console.log(res.data);
								if("ok" == res.data.status){
									data.multiData[1] = res.data.data;
									data.multiArray[1] = [];
									for(let x in res.data.data){
										let district = res.data.data[x];
										data.multiArray[1].push(district.name);
									}
									data.multiIndex[1] = 0;
									data.multiArray[2] = ['请选择'];
									data.multiIndex[2] = 0;
									
									this.regionArray = data.multiArray;
									this.regionIndex = data.multiIndex;
									this.regionData = data.multiData;
									
								}
								
								this.region = data.multiArray[0][data.multiIndex[0]] + 'xx市xx县';
							},
						});
						
						
						
						
					}
						break;
					case 1:{
						
						let pcode = data.multiData[1][data.multiIndex[1]].code;
						uni.request({
							url: 'https://www.dpsoft.top/district.jsp', //仅为示例，并非真实接口地址。
							method:"POST",
							data: {
								code: pcode
							},
							header: {
								"Content-Type": "application/json"
							},
							success: (res) => {
								console.log(res.data);
								if("ok" == res.data.status){
									data.multiData[2] = res.data.data;
									data.multiArray[2] = [];
									for(let x in res.data.data){
										let district = res.data.data[x];
										data.multiArray[2].push(district.name);
									}
								
									data.multiIndex[2] = 0;
									
									that.regionArray = data.multiArray;
									that.regionIndex = data.multiIndex;
									that.regionData = data.multiData;
								}
								this.region = data.multiArray[0][data.multiIndex[0]]+data.multiArray[1][data.multiIndex[1]] + 'xx县';
							},
						});
						
						
					}
						break;
					case 2:{
						this.region = data.multiArray[0][data.multiIndex[0]]+data.multiArray[1][data.multiIndex[1]] + data.multiArray[2][data.multiIndex[2]];
					}
					break;
				}
				
			},
			countChange:function(value){
				
				this.count = value;
			},
			alipay:function(){
				
			},
			wxpay:function(){
				if(this.receiver.trim().length <=0){
					uni.showToast({
						icon:'none',
						title: '请填写收货人姓名'
					});
					return;
				}
				let phonereg=/^[1][3,4,5,7,8,9][0-9]{9}$/;

				if(this.phone!=null && this.phone.trim().length >0 && phonereg.test(this.phone)){
					
				}else{
					uni.showToast({
						icon:"none",
						title:"请输入正确的收货人手机号"
					});
					return;
				}
				
				if(this.regionArray[0][this.regionIndex[0]] == '请选择'){
					uni.showToast({
						icon:'none',
						title: '请选择收货地址省份'
					});
					return;
				}
				if(this.regionArray[1][this.regionIndex[1]] == '请选择'){
					uni.showToast({
						icon:'none',
						title: '请选择收货地址城市'
					});
					return;
				}
				if(this.regionArray[2][this.regionIndex[2]] == '请选择'){
					uni.showToast({
						icon:'none',
						title: '请选择收货地址市县'
					});
					return;
				}
				if(this.address.trim().length <=0){
					uni.showToast({
						icon:'none',
						title: '请选填写收货详细地址'
					});
					return;
				}
				let data = {};
				data.goods_id = this.goods.id;
				data.number = this.count;
				data.remark = this.remark;
				data.receiver = this.receiver;
				data.phone = this.phone;
				data.address = this.regionArray[0][this.regionIndex[0]]+this.regionArray[1][this.regionIndex[1]]+this.regionArray[2][this.regionIndex[2]]+this.address;
				data.style = this.goods.style[this.styleIndex];
				//#ifdef MP-WEIXIN
				data.tradeType = 'JSAPI';
				data.body = "「好物短视频」"+this.goods.title
				//#endif
				//#ifdef APP-PLUS
				data.tradeType = 'NATIVE';
				//#endif
				//#ifdef H5
				data.tradeType = 'JSAPI';
				data.body = "「好物短视频」"+this.goods.title
				//#endif
				uni.showLoading({
					title:"加载中",
					mask:true
				});
				this.getOpenId((userres) => {
					console.log(userres);
						if(userres){
							data.openId = userres.data.data.openid;
						}
						this.postJson({
							path:"/order/wxpay/init",
							data:data,
							success:(res) => {
								uni.hideLoading();
								if("ok" == res.data.status){
									let paydata = res.data.data;
									
									
									
									
									paydata.success = function(e){
										uni.showToast({
											
											title:"支付成功"
										});
										
										uni.redirectTo({
											url:"/pages/order/order?code"+paydata.code
										})
									};
									paydata.fail = function(e){
										uni.showToast({
											icon:"none",
											title:"支付失败"
										});
									}
									
									//#ifdef H5
									
									var jweixin = require('jweixin-module')  
									jweixin.ready(()=>{  
										wx.chooseWXPay(paydata);
									});  
									
									//#endif
									//#ifndef H5
									paydata.provider = "wxpay";
									uni.requestPayment(paydata);
									//#endif
									
									
								}else{
									uni.showToast({
										icon:"none",
										title:res.data.msg
									});
								}
							}
						})
					});
				
			}
		}
	}
</script>

<style>
</style>
