<template>
	<view class="login bg-gradual-black" style="position: fixed;width: 100%;height: 100%;" v-bind:style="{paddingTop:system.statusBarHeight+'px'}">
		<view class="cu-bar text-gold-light">
			<view class="action" @tap="close">
				<text class="cuIcon-close"></text>
			</view>
			<view class="content text-bold">
				手机号登录
			</view>
		</view>
		
		<form class="text-gold-light">
			
			<view class="cu-form-group" style="background-color: rgba(0,0,0,0);padding: 0 80upx;margin-top: 20%;">
				<view class="title">手机号</view>
				<input style="color: white;" placeholder="输入本人手机号" type="number" v-model:value="phone"></input>
			</view>
			
			<view class="cu-form-group" style="background-color: rgba(0,0,0,0);padding: 0 80upx;">
				<view class="title">验证码</view>
				<input style="color: white;" placeholder="输入验证码" type="number" name="code" v-model:value="code"></input>
				<button @tap="getcode" class='cu-btn text-gold-light' style="background-color: rgba(0,0,0,0); border: solid 1px #e3c77f;">{{codeTime <= 0? '获取': codeTime+'s'}}</button>
			</view>
			
			
			<view class="padding flex flex-direction">
				
				<button @tap="login" class="cu-btn bg-gold-light margin-tb-sm lg" style="color: #222;">登录</button>
			</view>
			
		</form>
		
	</view>
</template>

<script>
	let WebIM = require("../../utils/WebIM")["default"];
	export default {
		data() {
			return {
				system:this.systemInfo(),
				nextPage:'',
				codeTime:0,
				phone:this.lastUserInfo().phone,
				code:'',
				token:'',
				openId:''
			}
		},
		onLoad(option) {
			
			let page = option.page;
			if(!page){
				page = "/pages/my/my";
			}else{
				page = decodeURIComponent(page);
			}
			this.nextPage = page;
			
			//#ifdef H5
			/*
			let code = option.code;
			if(code){
				
				this.postJson({
					path:"/h5/wx/openid",
					data:{
						code:code
					},
					success:(res)=>{
						if("ok" == res.data.status){
							this.openId = res.data.data.openid;
						}
					}
				});
				
			}else{
				let redirectUrl = "http://www.dpsoft.top/h5/#/pages/login/login?page="+option.page;
				redirectUrl = encodeURIComponent(redirectUrl);
				let appId = "wx8d2585be14dec3d3";
				window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appId+"&redirect_uri="+redirectUrl+"&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
			}
			*/
			//#endif
			
		},
		methods: {
			codeTimer:function(){
				if(0 >= this.codeTimer){
					this.codeTime = 0;
				}else{
					this.codeTime--;
					setTimeout(this.codeTimer,1000);
				}
			},
			getcode:function(){
				
				let phonereg=/^[1][3,4,5,7,8,9][0-9]{9}$/;

				if(this.phone!=null && this.phone.trim().length >0 && phonereg.test(this.phone)){
					
				}else{
					uni.showToast({
						icon:"none",
						title:"请输入正确的手机号"
					});
					return;
				}
				
				let that = this;
				let data = {};
				data.phone = this.phone;
				data.type = "uni_phone_login";
				uni.showLoading({
					title:"加载中",
					mask:true
				})
				this.postJson({
					path:"/user/phone/getcode",
					data:data,
					success:(res) => {
						console.log(res);
						if('ok' == res.data.status){
							this.token = res.data.data.token;
							this.codeTime = 60;
							this.codeTimer();
						}else{
							uni.showToast({
								icon:"none",
								title:res.msg
							})
						}
					},
					fail:(e) => {
						uni.showToast({
								icon:"none",
								title:"请您稍后再试"
							})
					},
					complete:() => {
						uni.hideLoading();
					}
				})
				
			},
			login:function(){
				
				if(this.token!=null && this.token.trim().length >0){
					
				}else{
					uni.showToast({
						icon:"none",
						title:"请先获取验证码"
					});
					return;
				}
				
				let phonereg=/^[1][3,4,5,7,8,9][0-9]{9}$/;

				if(this.phone!=null && this.phone.trim().length >0 && phonereg.test(this.phone)){
					
				}else{
					uni.showToast({
						icon:"none",
						title:"请输入正确的手机号"
					});
					return;
				}
				
				if(this.code!=null && this.code.trim().length >0){
					
				}else{
					uni.showToast({
						icon:"none",
						title:"请输入验证码"
					});
					return;
				}
				let that = this;
				let data = {};
				data.phone = this.phone;
				data.token = this.token;
				data.valicode = this.code;
				uni.showLoading({
					title:"加载中",
					mask:true
				})
				this.postJson({
					path:"/user/login/do",
					data:data,
					success:(res) => {
						if("ok" == res.data.status){
							let user = res.data.user;
							//user.openId = this.openId;
							uni.setStorage({
								key: 'user',
								data: JSON.stringify(user),
								success: function () {
									console.log('success');
									
									  that.conn.open({
										apiUrl: WebIM.config.apiURL,
										user: user.uid,
										pwd: '111111',
										grant_type: 'password',
										appKey: WebIM.config.appkey
									  });
									uni.$emit('logon',{msg:''});
									uni.navigateBack({
										
									});
								}
							});
						}else{
							uni.showToast({
								icon:"none",
								title:res.msg
							})
						}
					},
					fail:(res) => {
						uni.showToast({
							icon:"none",
							title:"请您稍后再试"
						})
					},
					complete:(res) => {
						uni.hideLoading();
					}
				})
				
				
			},
			close:function(){
				uni.$emit('login_cancel',{msg:'取消登录'});
				uni.navigateBack({
					
				});
				
			}
		}
	}
</script>

<style>

</style>
