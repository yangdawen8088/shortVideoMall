(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"1d78":function(e,t,o){"use strict";var n={"_toast_.isHide":!1,"_toast_.content":""},a={toastSuccess:function(e){var t=this;this.setData({"_toast_.isHidescss":!0,"_toast_.content":e}),setTimeout(function(){t.setData({"_toast_.isHidescss":!1})},2e3)},toastFilled:function(e){var t=this;this.setData({"_toast_.isHidefil":!0,"_toast_.content":e}),setTimeout(function(){t.setData({"_toast_.isHidefil":!1})},2e3)}};function s(){var e=getCurrentPages(),t=e[e.length-1];return this.__page=t,Object.assign(t,a),t.toastPannel=this,t.setData(n),this}e.exports={ToastPannel:s}},"38f3":function(e,t,o){"use strict";o.r(t);var n=o("91ee");for(var a in n)"default"!==a&&function(e){o.d(t,e,function(){return n[e]})}(a);o("4444");var s,r,i=o("2877"),u=Object(i["a"])(n["default"],s,r,!1,null,null,null);t["default"]=u.exports},4444:function(e,t,o){"use strict";var n=o("f90c"),a=o.n(n);a.a},5494:function(e,t,o){"use strict";(function(e){o("719a");var t=a(o("3a53")),n=a(o("38f3"));function a(e){return e&&e.__esModule?e:{default:e}}function s(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{},n=Object.keys(o);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(o).filter(function(e){return Object.getOwnPropertyDescriptor(o,e).enumerable}))),n.forEach(function(t){r(e,t,o[t])})}return e}function r(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}t.default.config.productionTip=!1,t.default.prototype.systemInfo=function(){return n.default.systemInfo||(n.default.systemInfo=e.getSystemInfoSync()),n.default.systemInfo},t.default.prototype.setUserInfo=function(t){t?(e.setStorageSync("user",JSON.stringify(t)),n.default.userInfo=t,e.setStorageSync("lastUser",JSON.stringify({phone:t.phone,head_img:t.head_img}))):(e.removeStorageSync("user"),n.default.userInfo=null)},t.default.prototype.lastUserInfo=function(){var t=e.getStorageSync("lastUser");return t?JSON.parse(t):{}},t.default.prototype.getUserInfo=function(){if(!n.default.userInfo){var t=e.getStorageSync("user");console.log("userjson:"+t),t?(n.default.login=!0,n.default.userInfo=JSON.parse(t)):(n.default.login=!1,n.default.userInfo=null)}return console.log(n.default.userInfo),n.default.userInfo},t.default.prototype.getGlobalData=function(){return n.default.globalData||(n.default.globalData={}),console.log(n.default.globalData),n.default.globalData},t.default.prototype.setGlobalData=function(e){return n.default.globalData||(n.default.globalData={}),n.default.globalData=Object.assign(n.default.globalData,e),console.log(n.default.globalData),n.default.globalData},t.default.prototype.getOpenId=function(e){e&&e()},t.default.prototype.getWeixinUserInfo=function(e){e.success&&e.success()},t.default.prototype.postJson=function(t){var o=t.data,n=this.systemInfo();if(o.systemName=n.model,o.deviceName=n.brand,o.deviceName||(o.deviceName="小程序"),o.deviceUUID="unknow",o.phoneModel=n.platform,o.systemVersion=n.system,o.localPhoneModel=n.platform,this.getUserInfo()){var a=this.getUserInfo().uid;o.loginUid=a,o.uid||(o.uid=a)}this.getOpenId(function(n){o.deviceUUID=n?n.data.data.openid:deviceCode(),console.log(o),e.request({url:"https://www.dpsoft.top"+t.path,method:"POST",data:o,header:{"Content-Type":"application/json"},success:t.success,fail:t.fail,complete:t.complete})})},t.default.prototype.back=function(){e.navigateBack({})},t.default.prototype.toPage=function(t){e.navigateTo({url:t})},n.default.mpType="app";var i=new t.default(s({},n.default));i.$mount()}).call(this,o("f266")["default"])},"881d":function(e,t,o){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(o("3a53"));function a(e){return e&&e.__esModule?e:{default:e}}o("9f3c");var s=o("5ff1")["default"],r=o("d04d"),i=o("b428"),u=o("1d78"),c=o("4df4"),l=!1;function f(e){var t=e.id,o=new s.message("read",s.conn.getUniqueId());o.set({id:t,to:e.from}),s.conn.send(o.body)}function d(t){return"error"!==t.type||(e.showToast({title:t.errorText}),!1)}function p(t){var o=e.getStorageSync("myUsername"),n=e.getStorageSync("member")||[],a=e.getStorageSync("listGroup")||[],s=n.concat(a),r=s.reduce(function(t,n,a){var s;return s=n.roomId?e.getStorageSync(n.roomId+o.toLowerCase())||[]:e.getStorageSync(n.name.toLowerCase()+o.toLowerCase())||[],t+s.length},0);getApp().globalData.unReadMessageNum=r,c.fire("em.xmpp.unreadspot",t)}n.default.prototype.conn={closed:!1,curOpenOpt:{},open:function(e){this.curOpenOpt=e,s.conn.open(e),this.closed=!1},reopen:function(){this.closed&&(s.conn.open(this.curOpenOpt),this.closed=!1)}};var g={ToastPannel:u,globalData:{unReadMessageNum:0,userInfo:null,saveFriendList:[],saveGroupInvitedList:[],isIPX:!1},onLaunch:function(){e.createInnerAudioContext().obeyMuteSwitch=!1;var t=this,o=e.getStorageSync("logs")||[];if(o.unshift(Date.now()),e.setStorageSync("logs",o),c.on("em.main.ready",function(){p()}),c.on("em.chatroom.leave",function(){p()}),c.on("em.chat.session.remove",function(){p()}),c.on("em.chat.audio.fileLoaded",function(){p()}),c.on("em.main.deleteFriend",function(){p()}),c.on("em.chat.audio.fileLoaded",function(){p()}),s.conn.listen({onOpened:function(e){s.conn.setPresence()},onReconnect:function(){e.showToast({title:"重连中...",icon:"none",duration:2e3})},onSocketConnected:function(){},onClosed:function(){e.showToast({title:"网络已断开",icon:"none",duration:2e3}),t.conn.closed=!0,s.conn.close()},onInviteMessage:function(e){t.globalData.saveGroupInvitedList.push(e),c.fire("em.xmpp.invite.joingroup",e)},onPresence:function(o){switch(o.type){case"unsubscribe":break;case"subscribe":if("[resp:true]"===o.status);else{for(var n=0;n<t.globalData.saveFriendList.length;n++)if(t.globalData.saveFriendList[n].from===o.from)return t.globalData.saveFriendList[n]=o,void c.fire("em.xmpp.subscribe");t.globalData.saveFriendList.push(o),c.fire("em.xmpp.subscribe")}break;case"subscribed":e.showToast({title:"添加成功",duration:1e3}),c.fire("em.xmpp.subscribed");break;case"unsubscribed":break;case"memberJoinPublicGroupSuccess":e.showToast({title:"已进群",duration:1e3});break;case"unavailable":c.fire("em.xmpp.contacts.remove"),c.fire("em.xmpp.group.leaveGroup",o);break;case"deleteGroupChat":c.fire("em.xmpp.invite.deleteGroup",o);break;case"leaveGroup":c.fire("em.xmpp.group.leaveGroup",o);break;case"removedFromGroup":c.fire("em.xmpp.group.leaveGroup",o);break;default:break}},onRoster:function(e){},onVideoMessage:function(e){console.log("onVideoMessage: ",e),e&&r.saveReceiveMsg(e,i.VIDEO),p(e),f(e)},onAudioMessage:function(e){console.log("onAudioMessage",e),e&&(d(e)&&r.saveReceiveMsg(e,i.AUDIO),p(e),f(e))},onCmdMessage:function(e){console.log("onCmdMessage",e),e&&(d(e)&&r.saveReceiveMsg(e,i.CMD),p(e),f(e))},onTextMessage:function(e){console.log("onTextMessage",e),e&&(d(e)&&r.saveReceiveMsg(e,i.TEXT),p(e),f(e))},onEmojiMessage:function(e){console.log("onEmojiMessage",e),e&&(d(e)&&r.saveReceiveMsg(e,i.EMOJI),p(e),f(e))},onPictureMessage:function(e){console.log("onPictureMessage",e),e&&(d(e)&&r.saveReceiveMsg(e,i.IMAGE),p(e),f(e))},onFileMessage:function(e){console.log("onFileMessage",e),e&&(d(e)&&r.saveReceiveMsg(e,i.FILE),p(e),f(e))},onError:function(t){if(console.log(t),t.type==s.statusCode.WEBIM_CONNCTION_DISCONNECTED&&!l){if(s.conn.autoReconnectNumTotal<s.conn.autoReconnectNumMax)return;return e.showToast({title:"server-side close the websocket connection",duration:1e3}),void(l=!0)}t.type==s.statusCode.WEBIM_CONNCTION_SERVER_ERROR&&e.showToast({title:"offline by multi login",duration:1e3}),t.type==s.statusCode.WEBIM_CONNCTION_OPEN_ERROR&&(e.hideLoading(),c.fire("em.xmpp.error.passwordErr")),t.type==s.statusCode.WEBIM_CONNCTION_AUTH_ERROR&&(e.hideLoading(),c.fire("em.xmpp.error.tokenErr")),"socket_error"==t.type&&(console.log("socket_errorsocket_error",t),e.showToast({title:"网络已断开",icon:"none",duration:2e3}),c.fire("em.xmpp.error.sendMsgErr",t))}}),this.checkIsIPhoneX(),e.getStorageSync("user")){var n=e.getStorageSync("user"),a=JSON.parse(n);this.conn.open({apiUrl:s.config.apiURL,user:a.uid,pwd:"111111",grant_type:"password",appKey:s.config.appkey})}},methods:{getUserInfo:function(t){var o=this;this.globalData.userInfo?"function"==typeof t&&t(this.globalData.userInfo):e.login({success:function(){e.getUserInfo({success:function(e){o.globalData.userInfo=e.userInfo,"function"==typeof t&&t(o.globalData.userInfo)}})}})},checkIsIPhoneX:function(){var t=this;e.getSystemInfo({success:function(e){e.model&&-1!=e.model.search("iPhone X")&&(t.globalData.isIPX=!0)}})}}};t.default=g}).call(this,o("f266")["default"])},"91ee":function(e,t,o){"use strict";o.r(t);var n=o("881d"),a=o.n(n);for(var s in n)"default"!==s&&function(e){o.d(t,e,function(){return n[e]})}(s);t["default"]=a.a},f90c:function(e,t,o){}},[["5494","common/runtime","common/vendor"]]]);