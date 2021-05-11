<template>
	<view class="bg-gradual-pink myorderlist" style="position: fixed;width: 100%;height: 100%;" v-bind:style="{paddingTop:system.statusBarHeight+'px'}">
		<view class="cu-bar">
			<view class="action" @tap="back">
				<text class="cuIcon-back"></text>
			</view>
			<view class="content text-bold">
				{{title}}
			</view>
		</view>
		<scroll-view scroll-y="true" style="width: 100%;height: 100%;">
		<view v-for="(goods,index) in goodslist" :key="index"  class="cu-list menu-avatar">
				<view class="cu-item" @tap="toPage('/pages/order/order?code='+goods.code)">
					<view class="cu-avatar radius" v-bind:style="{backgroundImage:'url('+goods.goodsImg+')'}">
						<text class="goods-status">
							{{goods.stateLabel}}
						</text>
					</view>
					<view class="content">
						
						<view class="text-grey goods-title">{{goods.goodsTitle}}</view>
						<view class="text-gray text-sm goods-seller">
							<text class="">
								<text class="cuIcon-shop text-red  margin-right-xs"></text>
								{{goods.goodsSeller}}
								<text class="fr">{{goods.goodsArea}}</text>
							</text> 
							
						</view>
						<view class="goods-action">
							<text class="text-price text-red text-lg" style="font-size: 40upx;">{{goods.goodsPrice}}</text>
							<button @tap="contact" :data-index="index" class="cu-btn round line-red lines-red fr" style="height: 45upx;" >联系卖家</button>
							
						</view>
					</view>
					
				</view>
				<view class="bg-white text-gray goods-memo">
					备注:{{goods.task_require}}
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
				user:this.getUserInfo(),
				listType:0,
				title:'',
				goodslist:[]
			}
		},
		onLoad(option) {
			console.log(option);
			this.listType = parseInt(option.type);
			
			this.postJson({
				path:"/user/order/list",
				data:{
					uid:this.user.uid,
					listType:this.listType
				},
				success:(res) => {
					if("ok" == res.data.status){
						this.goodslist = res.data.data;
						for(let x in this.goodslist){
							this.goodslist[x].stateLabel = this.getStateLabel(this.goodslist[x].status);
						}
					}
				}
			});
			
			switch (this.listType){
				case 0:{
					this.title = "待付款"
				}
					break;
				case 2:{
					this.title = "待确认"
				}
					break;
				case 3:{
					this.title = "已完成"
				}
					break;
				case 4:{
					this.title = "退货"
				}
					break;
				case 99:{
					this.title = "全部订单"
				}
					break;
				default:
					break;
			}
		},
		methods: {
			
			getStateLabel:function(state){
				console.log("getStateLabel,state="+state+",type="+typeof(state));
				if(this.listType == 4){
					switch (state) {
						case 0:
						{
							return "退货申请";
						}
							break;
						case 1:
						{
							return "已退货";
						}
							break;
						case 2:
						{
							return "拒绝退货";
						}
							break;
							
						default:
							break;
					}
				}else{
					switch (state) {
						case 0:
						{
							return "待付款";
						}
							break;
						case 1:
						{
							return "待发货";
						}
							break;
						case 2:
						{
						   return "待确认";
						}
							break;
						case 3:
						{
							
							return "已完成";
						}
							break;
						case 4:
						{
							return "已退货";
						}
							break;
						case 5:
						{
							return "已取消";
						}
							break;
						default:
							break;
					}
				}
				
				return "";
			},
			contact(e){
				let index = e.currentTarget.dataset.index;
				let goods = this.goodslist[index];
				uni.showLoading({
					title:"加载中",
					mask:true
				});
				this.postJson({
					path:"/seller/user",
					data:{
						sellerUid:goods.uid
					},
					success:(res)=>{
						if("ok" == res.data.status){
							let seller = res.data.data;
							uni.makePhoneCall({
								phoneNumber:seller.phone
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
					
				})
			}
		}
	}
</script>

<style>
.myorderlist .cu-list.menu-avatar{
	margin-top: 5upx;
}
.myorderlist .cu-list.menu-avatar .cu-item{
	height: 220upx;
}
.myorderlist .cu-list.menu-avatar .cu-item .cu-avatar{
	width: 200upx;
	height: 200upx;
	left: 10upx;
	background-size: cover;
	background-position: center;
	align-items: center;
	
}
.myorderlist .cu-list.menu-avatar .cu-item .cu-avatar .goods-status{
	background-color: rgba(100,100,100,0.5);
	width: 100%;
	height: 100%;
	align-items: center;
	
	display: grid;
}
.myorderlist .cu-list.menu-avatar .cu-item .content{
	left: 220upx;
	width: 520upx;
	height:200upx;
	
}
.myorderlist .cu-list.menu-avatar .cu-item .content .goods-title{
	height:100upx;
	align-items: flex-start;
	overflow: hidden;
}
.myorderlist .cu-list.menu-avatar .cu-item .content .goods-seller{
	height:50upx;
	align-items: flex-end;
}
.myorderlist .cu-list.menu-avatar .cu-item .content .goods-action{
	height:50upx;
	align-items: flex-end;
}
.myorderlist .cu-list.menu-avatar .goods-memo{
	padding: 10upx;
	
}
</style>
