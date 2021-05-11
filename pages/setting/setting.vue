<template>
	<view class="bg-gradual-pink setting" style="position: fixed;width: 100%;height: 100%;" v-bind:style="{paddingTop:system.statusBarHeight+'px'}">
		<view class="cu-bar">
			<view class="action" @tap="back">
				<text class="cuIcon-back"></text>
			</view>
			<view class="content text-bold">
				设置
			</view>
		</view>
		
		<view class="cu-list menu sm-border solid-bottom text-white" style="border-color: white;margin-top: 0;" >
			<view class="cu-item" >
				<view class="content">
					
					<text class="text-white">昵称</text>
				</view>
				<view class="action">
					<input @blur="updateUser" placeholder="输入昵称" name="nick_name" v-model:value="user.nick_name"></input>
				</view>
			</view>
			<view class="cu-item arrow" >
				<view class="content">
					<text class="text-white">手机号</text>
				</view>
				<view class="action">
					<text class="text-white text-sm">{{user.phone}}</text>
				</view>
			</view>
			<view class="cu-item arrow" >
				<view class="content">
					<text class="text-white">性别</text>
				</view>
				<view class="action">
					<picker  :value="user.gender" :range="['女','男']" @change="setGender">
						<view class="picker">
							{{user.gender==0?'女':'男'}}
						</view>
					</picker>
				</view>
			</view>
			
			<view class="cu-item arrow" >
				<view class="content">
					<text class="text-white">生日</text>
				</view>
				<view class="action">
					<picker mode="date" :value="birthdayLabel"  start="1950-01-01" end="2020-09-01" @change="setBirthday" >
						<view class="picker">
							{{birthdayLabel}}
						</view>
					</picker>
				</view>
			</view>
			
			<view class="cu-item arrow" >
				<view class="content">
					<text class="text-white">意见反馈</text>
				</view>
				
			</view>
			<view class="cu-item arrow" >
				<view class="content">
					<text class="text-white">关于好物短视频</text>
				</view>
				
			</view>
			
			<view class="cu-item arrow" >
				<view class="content">
					<text class="text-white">用户协议</text>
				</view>
				
			</view>
			
			<view class="cu-item arrow" >
				<view class="content">
					<text class="text-white">下载APP</text>
				</view>
				
			</view>
			
		</view>
		
		<view class="padding flex flex-direction">
				
			<button @tap="exit" class="cu-btn bg-red margin-tb-sm lg">退出</button>
		</view>
	</view>
</template>

<script>
	let WebIM = require("../../utils/WebIM")["default"];

	export default {
		data() {
			return {
				system:{},
				user:this.getUserInfo(),
				birthdayLabel:new Date(this.getUserInfo().birthday).toLocaleDateString().replace(/\//g,'-'),
			}
		},
		onLoad() {
			console.log(this.systemInfo());
			this.system = this.systemInfo();
		},
		methods: {
			setBirthday:function(e){
				console.log(e);
				let date = e.target.value;
				this.birthdayLabel = date;
				date = date.replace(/-/g,'/');
				this.user.birthday = new Date(date).getTime();
				this.updateUser();
			},
			setGender:function(e){
				console.log(e);
				let genderLabel = e.target.value;
				this.user.gender = genderLabel == '女' ? 0 : 1;
				this.updateUser();
			},
			updateUser:function(){
				let data = {
					nickname: this.user.nick_name,
					birthdaytime: this.user.birthday,
					gender: this.user.gender
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
			},
			
			exit:function(){
				this.setUserInfo(null);
				
				WebIM.conn.close();
				uni.reLaunch({
					url:"/pages/my/my"
				});
			}
		}
	}
</script>

<style>
.setting .cu-form-group{
	background-color: rgba(0,0,0,0);
}
.setting .cu-list.menu>.cu-item{
	background-color: rgba(0,0,0,0);
}
.setting .cu-item input{
	
	color: white;
}
.setting .cu-list.menu>.cu-item.arrow:before {
	color: white;
}
</style>
