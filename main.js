import Vue from 'vue'
import App from './App'
//#ifndef MP-WEIXIN
import Fingerprint2 from 'fingerprintjs2'
const deviceCode = () => {
  const localCode = /*uni.getStorageSync('deviceCode')*/window.localStorage.getItem('deviceCode')
  if(localCode !== undefined && localCode !== null && localCode !== ''){
    return localCode
  }else{
    Fingerprint2.get(function(components) {
		let values = components.map(function (component) { return component.value });
        let result = Fingerprint2.x64hash128(values.join(''), 31);
       window.localStorage.setItem('deviceCode', result)
	  //uni.setStorageSync('deviceCode', result);
      return result
    })
  }
}
//#endif

Vue.config.productionTip = false

Vue.prototype.systemInfo = function(){
	if(!App.systemInfo){
		App.systemInfo = uni.getSystemInfoSync();
	}
	return App.systemInfo;
}
Vue.prototype.setUserInfo = function(user){
	if(user){
		uni.setStorageSync("user", JSON.stringify(user));
		App.userInfo = user;
		uni.setStorageSync("lastUser", JSON.stringify({phone:user.phone,head_img:user.head_img}));
	}else{
		uni.removeStorageSync("user");
		App.userInfo = null;
	}
	
}
Vue.prototype.lastUserInfo = function(){
	let userjson = uni.getStorageSync("lastUser");
	if(userjson){
		return JSON.parse(userjson);
	}else{
		return {};
	}
}
Vue.prototype.getUserInfo = function(){
	if(!App.userInfo){
		
	
		const userjson = uni.getStorageSync("user");
		console.log("userjson:"+userjson);
		if(userjson){
			App.login = true;
			App.userInfo = JSON.parse(userjson);
			
		}else{
			App.login = false;
			App.userInfo = null;
		}
		
	}
	console.log(App.userInfo);
	return App.userInfo;
}

Vue.prototype.getGlobalData = function(){
	if(!App.globalData){
		
		App.globalData = {};
		
		
	}
	console.log(App.globalData);
	return App.globalData;
}

Vue.prototype.setGlobalData = function(data){
	if(!App.globalData){
		
		App.globalData = {};
		
		
	}
	App.globalData = Object.assign(App.globalData, data);
	console.log(App.globalData);
	return App.globalData;
}
Vue.prototype.getOpenId = function(success){
	
	//#ifndef MP-WEIXIN
	if(success){
		success();
		return;
	}
	//#endif
	//#ifdef MP-WEIXIN
	
	if(App.openres&&App.openres.userInfo){
		success(App.openres);
		return;
	}
	uni.login({
		provider:"weixin",
		success:(res) => {
			console.log(res);
			
			uni.request({
				url: 'https://www.dpsoft.top/user_wx_openid.jsp', 
				method:"POST",
				data:{
					js_code:res.code
				},
				header: {
					"Content-Type": "application/json"
				},
				success:(res) => {
					App.openres = res.data.data;
					uni.getUserInfo({
						provider:"weixin",
						success:(infoRes) => {
							infoRes.openid = res.data.data.openid;
							App.openres = infoRes;
							if(success){
								success(infoRes);
							}
						},
						fail(e) {
							console.log(e);
							//App.modalName = 'userinfo';
							if(success){
								success(App.openres);
							}
						}
					});
					
				}
			});
		}
	})
	
	//#endif
}
Vue.prototype.getWeixinUserInfo = function(config){
	//#ifndef MP-WEIXIN
	if(config.success){
		config.success();
	}
	//#endif
	//#ifdef MP-WEIXIN
	// uni.authorize({
	// 	scope: 'scope.userInfo',
	// 	success() {
			uni.getUserInfo({
			  provider: 'weixin',
			  success: function (infoRes) {
				console.log('用户昵称为：' + infoRes.userInfo.nickName);
				
				if(config.success){
					config.success(infoRes);
				}
				
				
			  }
			});
	// 	},
	// 	fail(e){
	// 		console.log(e);
	// 		uni.hideLoading();
	// 		uni.showToast({
	// 			icon:"none",
	// 			title:JSON.stringify(e)
	// 		});
	// 	}
	// });
	//#endif
}

Vue.prototype.postJson = function(config){
	let data = config.data;
	let system = this.systemInfo();
	data.systemName = system.model;
	data.deviceName = system.brand;
	if(!data.deviceName){
		//#ifdef MP-WEIXIN
		data.deviceName = "小程序";
		//#endif
		//#ifdef H5
		data.deviceName = "H5";
		//#endif
	}
	data.deviceUUID = "unknow";
	data.phoneModel = system.platform;
	data.systemVersion = system.system;
	data.localPhoneModel = system.platform;
	//#ifdef MP-WEIXIN
	data.terminal = "MP-WEIXIN";
	//#endif
	//#ifdef H5
	data.terminal = "H5";
	deviceCode();
	//#endif
	//#ifdef APP-PLUS
	data.terminal = "APP";
	//#endif
	if(this.getUserInfo()){
		let uid = this.getUserInfo().uid;
		data.loginUid = uid;
		if(!data.uid){
			data.uid = uid;
		}
	}
	
	this.getOpenId((res) => {
		if(res){
			data.deviceUUID = res.openid;
			if(res.userInfo){
				data.deviceName = res.userInfo.nickName;
				data.avatarUrl = res.userInfo.avatarUrl;
				data.gender = res.userInfo.gender;
			}
		}else{
			data.deviceUUID = deviceCode();
		}
		console.log(data);
		uni.request({
				url: 'https://www.dpsoft.top'+config.path, 
				method:"POST",
				data: data,
				header: {
					"Content-Type": "application/json"
				},
				success: config.success,
				fail:config.fail,
				complete:config.complete
		});
		
	});
	
	
}
Vue.prototype.back = function(){
	uni.navigateBack({
		
	});
}
Vue.prototype.toPage = function(page){
	uni.navigateTo({
		url:page
	});
}
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()





