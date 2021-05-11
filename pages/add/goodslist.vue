<template>
	<view class="bg-gradual-pink goodslist" style="position: fixed;width: 100%;height: 100%;" v-bind:style="{paddingTop:system.statusBarHeight+'px'}">
		<view class="cu-bar" style="position: fixed;z-index: 1;width: 100%;">
			<view class="action" @tap="back">
				<text class="cuIcon-back"></text>
			</view>
			<view class="content text-bold">
				{{titleArray[listType+""]}}
			</view>
		</view>
		<scroll-view scroll-y="true" style="width: 100%;height: 100%;padding-top: 100upx;">
		<view v-for="(goods,index) in goodslist" :key="index"  class="cu-list menu-avatar">
				<view class="cu-item">
					<view class="cu-avatar radius" v-bind:style="{backgroundImage:'url('+goods.goodsImg+')'}"></view>
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
							<button @tap="select" :data-index="index" class="cu-btn round line-red lines-red fr" style="height: 45upx;" >选择</button>
							
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
				user:this.getUserInfo(),
				listType:1,
				goodslist:[],
				titleArray:{
					"1":"有奖励的商品",
					"2":"已录入的商品",
					"3":"我买过的商品",
					"4":"历史选择"
				}
			}
		},
		onLoad(option) {
			console.log(option);
			this.listType = parseInt(option.type);
			console.log(typeof(this.listType));
			this.postJson({
				path:"/goods/list/query",
				data:{
					uid:this.user.uid,
					listType:this.listType
				},
				success:(res) => {
					if("ok" == res.data.status){
						this.goodslist = res.data.data;
					}
				}
			});
			
			
		},
		methods: {
			select(e){
				let index = e.currentTarget.dataset.index;
				let goods = this.goodslist[index];
				uni.setStorageSync("goods",JSON.stringify(goods));
				uni.navigateBack({
					
				});
			}
		}
	}
</script>

<style>

.goodslist .cu-list.menu-avatar .cu-item{
	height: 250upx;
}
.goodslist .cu-list.menu-avatar .cu-item .cu-avatar{
	width: 200upx;
	height: 200upx;
	background-size: cover;
	background-position: center;
}
.goodslist .cu-list.menu-avatar .cu-item .content{
	left: 250upx;
	width: 475upx;
	height:200upx;
	
}
.goodslist .cu-list.menu-avatar .cu-item .content .goods-title{
	height:100upx;
	align-items: flex-start;
}
.goodslist .cu-list.menu-avatar .cu-item .content .goods-seller{
	height:50upx;
	align-items: flex-end;
}
.goodslist .cu-list.menu-avatar .cu-item .content .goods-action{
	height:50upx;
	align-items: flex-end;
}
</style>
