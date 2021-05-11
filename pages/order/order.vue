<template>
	<view class="order bg-gradual-pink" style="position: fixed;width: 100%;height: 100%;" v-bind:style="{paddingTop:system.statusBarHeight+'px'}">
		<view class="cu-bar " style="position: fixed;z-index: 1;width: 100%;background-color: rgba(224,57,151,0);">
			<view class="action" @tap="back">
				<text class="cuIcon-back"></text>
			</view>
			<view class="content text-bold">
				订单详情
			</view>
		</view>
		<scroll-view scroll-y="true" style="width: 100%;height: 100%;padding-top: 100upx;" >
			
				
				<view   class="cu-list menu sm-borde bg-white" >
					<view class="cu-item order">
						<view class="cu-avatar radius" v-bind:style="{backgroundImage:'url('+goods.img_title+')'}">
							<text class="goods-status">
								{{goods.stateLabel}}
							</text>
						</view>
						<view class="content">
							
							<view class="text-grey goods-title">{{goods.title}}</view>
							<view class="text-gray text-sm goods-seller">
								<text class="">
									<text class="cuIcon-shop text-red  margin-right-xs"></text>
									{{goods.seller}}
									<text class="fr">{{goods.area}}</text>
								</text> 
								
							</view>
							<view class="goods-action">
								<text class="text-price text-red text-lg" style="font-size: 40upx;">{{goods.price}}</text>
								
								
							</view>
						</view>
						
					</view>
					
					
					<view v-if="order.ship_no != null" class="cu-item arrow" >
						<view class="content">
							<text class="">{{shipArray[order.ship_type]}}运单号</text>
						</view>
						<view class="action">
							<text class=" text-sm">{{order.ship_no}}</text>
						</view>
					</view>
					
					<view class="cu-item" >
						<view class="content">
							<text class="">收货人</text>
						</view>
						<view class="action">
							<text class=" text-sm">{{order.receiver}}</text>
						</view>
					</view>
					
					<view class="cu-item" >
						<view class="content">
							<text class="">联系电话</text>
						</view>
						<view class="action">
							<text class=" text-sm">{{order.phone}}</text>
						</view>
					</view>
					
					<view class="cu-item" >
						<view class="content">
							<text class="">收货地址</text>
						</view>
						<view class="action">
							<text class=" text-sm">{{order.address}}</text>
						</view>
					</view>
					
					<view class="cu-item" >
						<view class="content">
							<text class="">订单编号</text>
						</view>
						<view class="action">
							<text class=" text-sm">{{order.code}}</text>
						</view>
					</view>
					
					<view class="cu-item" >
						<view class="content">
							<text class="">订单时间</text>
						</view>
						<view class="action">
							<text class=" text-sm">{{order.createTimeLabel}}</text>
						</view>
					</view>
					
					<view class="cu-item" >
						<view class="content">
							<text class="">商品规格</text>
						</view>
						<view class="action">
							<text class=" text-sm">{{order.style}}</text>
						</view>
					</view>
					
					<view class="cu-item" >
						<view class="content">
							<text class="">商品价格</text>
						</view>
						<view class="action">
							<text class=" text-price text-xl text-red">{{order.goods_price}}</text>
						</view>
					</view>
					
					<view class="cu-item" >
						<view class="content">
							<text class="">购买数量</text>
						</view>
						<view class="action">
							<text class=" text-xl">{{order.number}}</text>
						</view>
					</view>
					
					<view v-if="order.take_type > 0" class="cu-item" >
						<view class="content">
							<text class="">邮寄费用</text>
						</view>
						<view class="action">
							<text class=" text-price text-xl text-red">{{order.post_fee}}</text>
						</view>
					</view>
					
					<view v-if="order.discount_label != null" class="cu-item" >
						<view class="content">
							<text class="">{{order.discount_label}}</text>
						</view>
						<view class="action">
							<text class=" text-price text-xl text-red">{{order.discount_amount}}</text>
						</view>
					</view>
					
					<view class="cu-item" >
						<view class="content">
							<text class="">支付金额</text>
						</view>
						<view class="action">
							<text class=" text-price text-xl text-red">{{order.amount}}</text>
						</view>
					</view>
					
					<view class="cu-item" >
						<view class="content">
							<text class="">备注</text>
						</view>
						<view class="action">
							<text class=" text-sm">{{order.remark}}</text>
						</view>
					</view>
					<block v-if="refund!=null">
						<view class="cu-item" >
							<view class="content">
								<text class="">退货编号</text>
							</view>
							<view class="action">
								<text class=" text-sm">{{refund.refund_code}}</text>
							</view>
						</view>
						<view class="cu-item" >
							<view class="content">
								<text class="">退货理由</text>
							</view>
							<view class="action">
								<text class=" text-sm">{{refund.reason}}</text>
							</view>
						</view>
					</block>
					<view class="padding flex flex-direction">
					<block v-if="user.uid == order.uid">
							<button @tap="contactSeller" class="cu-btn bg-pink margin-tb-sm lg">联系卖家</button>
						
						<block v-if="order.status == 0">
								<button @tap="pay" class="cu-btn bg-pink margin-tb-sm lg">继续支付</button>
								<button @tap="orderCancel" class="cu-btn bg-pink margin-tb-sm lg">取消订单</button>
						</block>
						<block v-if="order.status == 1">
								<button @tap="showModal" data-target="申请退货" class="cu-btn bg-pink margin-tb-sm lg">申请退货</button>
						</block>
						<block v-if="order.status == 2">
								<button @tap="confirm" class="cu-btn bg-pink margin-tb-sm lg">确认</button>
								<button @tap="showModal" data-target="申请退货" class="cu-btn bg-pink margin-tb-sm lg">申请退货</button>
						</block>
					</block>
					
					<block v-if="user.uid != order.uid">
							<button @tap="contactBuyer" class="cu-btn bg-pink margin-tb-sm lg">联系买家</button>
						<block v-if="order.status == 1">
								<button @tap="showModal" data-target="同意退货" class="cu-btn bg-pink margin-tb-sm lg">同意退货</button>
								<button @tap="showModal" data-target="拒绝退货" class="cu-btn bg-pink margin-tb-sm lg">拒绝退货</button>
						</block>
						<block v-if="order.status == 2">
								<button @tap="orderSellerCancel" class="cu-btn bg-pink margin-tb-sm lg">取消订单</button>
							
						</block>
					</block>
					</view>
				</view>
		
				
			
		</scroll-view>
		
		<view v-if="modalName=='申请退货'" class="cu-modal show">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content text-bold">{{modalName}}</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red" ></text>
					</view>
				</view>
				<view class="padding">
					<textarea maxlength="-1" placeholder="请输入退货理由" v-model="reason" class="text-xl text-black" style="width: 100%;height: 200upx;"></textarea>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-pink text-pink" @tap="hideModal">取消</button>
						<button class="cu-btn bg-pink margin-left" @tap="orderRefund">确定</button>

					</view>
				</view>
			</view>
		</view>
		
		
		<view v-if="modalName=='拒绝退货'" class="cu-modal show">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content text-bold">{{modalName}}</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding">
					<textarea maxlength="-1" placeholder="请输入拒绝理由" v-model="reason" class="text-xl text-black" style="width: 100%;height: 200upx;"></textarea>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-pink text-pink" @tap="hideModal">取消</button>
						<button class="cu-btn bg-pink margin-left" @tap="refundRefuse">确定</button>

					</view>
				</view>
			</view>
		</view>
		
		<view v-if="modalName=='同意退货'" class="cu-modal show">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content text-bold">{{modalName}}</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl text-black text-xl">
					确定同意买家退货吗？
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-pink text-pink" @tap="hideModal">取消</button>
						<button class="cu-btn bg-pink margin-left" @tap="refundPass">确定</button>

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
				system:this.systemInfo(),
				user:this.getUserInfo(),
				order:{},
				goods:{},
				shipArray:["顺丰","申通","韵达","圆通","中通","天天","邮政","德邦","中铁","韵达"],
				modalName:'',
				reason:''
			}
		},
		onLoad(option) {
			let code = option.code;
			this.postJson({
				path:"/order/detail",
				data:{
					code:code
				},
				success:(res)=>{
					if("ok" == res.data.status){
						this.order = res.data.data.order;
						this.goods = res.data.data.goods;
						this.goods.stateLabel = this.getStateLabel(this.goods.status);
						this.refund = res.data.data.refund;
						this.order.createTimeLabel = new Date(this.order.create_time).toLocaleDateString();
					}
				}
			});
		},
		methods: {
			getStateLabel:function(){
				if(this.refund && (this.order.status == 1 || this.order.status == 2)){
					return "退货申请中";
				}else{
					let statusLabelArray = ["待支付","待发货","待确认","已完成","已退货","已取消"];
					return statusLabelArray[this.order.status];
				}
			},
			orderCancel:function(){
				uni.showLoading({
					title:'加载中'
				});
				this.postJson({
					path:"/user/order/cancel",
					data:{
						code: this.order.code
					},
					success:(res) => {
						uni.hideLoading();
						if("ok" == res.data.status){
							uni.redirectTo({
								url:"/pages/order/order?code="+this.order.code
							});
						}
					}
				})
			},
			orderSellerCancel:function(){
				this.postJson({
					path:"/seller/order/cancel",
					data:{
						code: this.order.code
					},
					success:(res) => {
						if("ok" == res.data.status){
							uni.redirectTo({
								url:"/pages/order/order?code="+this.order.code
							});
						}
					}
				})
			},
			confirm:function(){
				uni.showLoading({
					title:'加载中'
				});
				this.postJson({
					path:"/user/order/confirm",
					data:{
						code: this.order.code
					},
					success:(res) => {
						uni.hideLoading();
						if("ok" == res.data.status){
							uni.redirectTo({
								url:"/pages/order/order?code="+this.order.code
							});
						}
					}
				});
			},
			contactBuyer:function(){
				uni.makePhoneCall({
					phoneNumber:this.order.phone
				});
			},
			contactSeller(){
				uni.showLoading({
					title:"加载中",
					mask:true
				});
				this.postJson({
					path:"/seller/user",
					data:{
						sellerUid:this.goods.seller
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
					
				});
			},
			orderRefund(){
				if(!this.reason || this.reason.trim().length<=0){
					uni.showToast({
						icon:'none',
						title:"请输入退货理由"
					});
					return;
				}
				uni.showLoading({
					title:'加载中'
				});
				
				this.postJson({
					path:"/user/order/refund",
					data:{
						code: this.order.code,
						reason: this.reason
					},
					success:(res) => {
						uni.hideLoading();
						if("ok" == res.data.status){
							uni.redirectTo({
								url:"/pages/order/order?code="+this.order.code
							});
						}
					}
				});
			},
			
			refundPass(){
				
				uni.showLoading({
					title:'加载中'
				});
				
				this.postJson({
					path:"/seller/order/refund/pass",
					data:{
						code: this.order.code
					},
					success:(res) => {
						uni.hideLoading();
						if("ok" == res.data.status){
							uni.redirectTo({
								url:"/pages/order/order?code="+this.order.code
							});
						}
					}
				});
			},
			
			refundRefuse(){
				if(!this.reason || this.reason.trim().length<=0){
					uni.showToast({
						icon:'none',
						title:"请输入拒绝理由"
					});
					return;
				}
				uni.showLoading({
					title:'加载中'
				});
				
				this.postJson({
					path:"/seller/order/refund/refuse",
					data:{
						code: this.order.code,
						reason: this.reason
					},
					success:(res) => {
						uni.hideLoading();
						if("ok" == res.data.status){
							uni.redirectTo({
								url:"/pages/order/order?code="+this.order.code
							});
						}
					}
				});
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = '';
			}
		}
	}
</script>

<style>
.order .cu-list .cu-item.order{
	height: 220upx;
}
.order .cu-list .cu-item.order .cu-avatar{
	width: 200upx;
	height: 200upx;
	left: 0upx;
	background-size: cover;
	background-position: center;
	align-items: center;
	
}
.order .cu-list .cu-item.order .cu-avatar .goods-status{
	background-color: rgba(100,100,100,0.5);
	width: 100%;
	height: 100%;
	align-items: center;
	
	display: grid;
}
.order .cu-list .cu-item.order .content{
	left: 10upx;
	width: 480upx;
	height:200upx;
	position: relative;
}
.order .cu-list .cu-item.order .content .goods-title{
	height:100upx;
	align-items: flex-start;
	overflow: hidden;
}
.order .cu-list .cu-item.order .content .goods-seller{
	height:50upx;
	align-items: flex-end;
}
.order .cu-list .cu-item.order .content .goods-action{
	height:50upx;
	align-items: flex-end;
}
</style>
