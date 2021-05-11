


	<template name="txt">
		<text class="msg-text" style="float:left;">{{ item.data }}</text>
	</template>
	<template name="emoji">
		<image class="avatar" :src=" '/static/images/faces/' + item.data " style="width:25px; height:25px; margin:0 0 2px 0; float:left;" />
	</template>
	<template name="img">
		<image class="avatar" :src=" item.msg.data " style="width:90px; height:120px; margin:2px auto;" mode="aspectFit" @tap="previewImage"
		 :data-url="item.msg.data" />
	</template>
	<template name="video">
		<video :src=" item.msg.data " controls autoplay />
	</template>
	<template name="audio">
		<audio :src=" item.msg.url " controls autoplay />
	</template>

<template>
	<!-- view 换成 scroll-view效果更好 用view是为了要stopPullDownRefresh -->
	<view scroll-y="true" :class="view + ' msglist wrap '+ (isIPX?'scroll_view_X': '')" @tap="onTap" bindscroll="scrollmore"
	 bindscrolltoupper="refresh" upper-threshold='-50' scroll-into-view="toView" style='background-color:#eeeeee;'>
		<view class="message" style="width:100%;margin-top:30rpx;" v-for="(item,index) in chatMsg" :key="item.mid" :id="item.mid">
			<!-- <view class="time">
			<text class="time-text">{{ item.time }}</text>
		</view> -->
			<view v-if="item.info.to != username.your" style="display:flex;justify-content:flex-start;flex-wrap:wrap;">
				<view v-if="item.showTime==true" class="user" style="display:flex;flex:0 0 100%;text-align:center;justify-content:center;margin-botton:20rpx;bottom:0;">
					<!-- yourname：就是消息的 from -->
					<text style='padding:6rpx 20rpx;color:white;background-color:#bbbbbb;border-radius:10rpx;' class="user-text">{{item.time}}</text>
				</view>
				<image style='float:normal;' class="avatar" :src="username.sellerHead" />
				<view class="msg" style="margin-top:0;">
					<image v-bind:class="['err',(item.style == 'self' && item.isFail) ? 'show' : 'hide']" src="/static/images/msgerr.png" />

					<image v-if="item.style == 'self'" src="/static/images/poprightarrow@2x.png" class="msg_poprightarrow" />
					<image v-if="item.style == ''" src="/static/images/popleftarrow@2x.png" class="msg_popleftarrow" />
					<view v-if=" item.msg.type == 'img' || item.msg.type == 'video' ">
						<block v-if="item.msg.type=='img'" >
								<image class="avatar" :src="item.msg.data " style="width:90px; height:120px; margin:2px auto;" mode="aspectFit" @tap="previewImage"
								 :data-url="item.msg.data" />
							</block>
							<block v-if="item.msg.type=='video'" >
								<video :src="item.msg.data " controls autoplay />
							</block>
					</view>
					<audio-msg v-if=" item.msg.type == 'audio' " :msg=" item "></audio-msg>
					<view v-else-if=" item.msg.type == 'txt' || item.msg.type == 'emoji' ">
						<view class="template" v-for="(a,i) in item.msg.data " :key="i">
							<block v-if="a.type=='txt'">
								<text class="msg-text" style="float:left;">{{ a.data }}</text>
							</block>
							<block v-if="a.type=='emoji'">
								<image class="avatar" :src=" '/static/images/faces/' + a.data " style="width:25px; height:25px; margin:0 0 2px 0; float:left;" />
							</block>
							
							<block v-if="a.type=='audio'" >
								<audio :src="a.url " controls autoplay />
							</block>
							
						</view>
					</view>
				</view>


			</view>


			<view v-else="" class="main" :class=" item.style " style="display:flex;flex-direction:row-reverse;justify-content:flex-start;flex-wrap:wrap;">
				<view v-if="item.showTime==true" class="user" style="display:flex;flex:0 0 100%;text-align:center;justify-content:center;margin-botton:20rpx;bottom:0;">
					<!-- yourname：就是消息的 from -->
					<text style='padding:6rpx 20rpx;color:white;background-color:#bbbbbb;border-radius:10rpx;' class="user-text">{{item.time}}</text>
				</view>
				<image style='margin-left:20rpx;margin-right:0;' class="avatar" :src="username.me.head_img" />
				<view class="msg" style='background-color:#e3c77f;margin-top:0;'>
					<image v-bind:class="['err',(item.style == 'self' && item.isFail) ? 'show' : 'hide']" src="/static/images/msgerr.png" />

					<image style='position:flex;' src="/static/images/poprightarrow@2x.png" class="msg_poprightarrow" />

					<view v-if=" item.msg.type == 'img' || item.msg.type == 'video' ">
						<block v-if="item.msg.type=='img'" >
								<image class="avatar" :src="item.msg.data " style="width:90px; height:120px; margin:2px auto;" mode="aspectFit" @tap="previewImage"
								 :data-url="item.msg.data " />
							</block>
							<block v-if="item.msg.type=='video'" >
								<video :src="item.msg.data " controls autoplay />
							</block>
					</view>
					<audio-msg v-if=" item.msg.type == 'audio' " :msg="item"></audio-msg>
					<view v-else-if=" item.msg.type == 'txt' || item.msg.type == 'emoji' ">
						<view class="template" v-for="(a,i) in item.msg.data " :key="i">
							<block v-if="a.type=='txt'">
								<text class="msg-text" style="float:left;">{{ a.data }}</text>
							</block>
							<block v-if="a.type=='emoji'">
								<image class="avatar" :src=" '/static/images/faces/' + a.data " style="width:25px; height:25px; margin:0 0 2px 0; float:left;" />
							</block>
							
							<block v-if="a.type=='audio'" >
								<audio :src="a.url " controls autoplay />
							</block>
						</view>
					</view>
				</view>


			</view>

		</view>
	</view>


</template>

<script>
	import AudioMsg from './type/audio/audio.vue'
	let msgStorage = require("../msgstorage");
	let disp = require("../../../utils/broadcast");
	let LIST_STATUS = {
		SHORT: "scroll_view_change",
		NORMAL: "scroll_view"
	};

	let page = 0;
	let Index = 0;
	let curMsgMid = ''
	let isFail = false
	export default{
		components: {AudioMsg},
		name:'ChatMsglist',
		props: {
			username: {
				type: Object,
				value: {},
			},
		},
		data(){
			return {
				view: LIST_STATUS.NORMAL,
				toView: "",
				chatMsg: [],
				visibility__: true,
				isIPX: getApp().globalData.isIPX
			}
		},
		methods: {
			normalScroll() {
				this.view= LIST_STATUS.NORMAL;
				
			},

			shortScroll() {
				this.view=LIST_STATUS.SHORT;
			},

			onTap() {
				this.$emit("msglistTap", null, {
					bubbles: true
				});
			},

			previewImage(event) {
				var url = event.target.dataset.url;
				uni.previewImage({
					urls: [url] // 需要预览的图片 http 链接列表
				});
			},

			getHistoryMsg() {
				let me = this
				let username = this.username;
				let myUsername = uni.getStorageSync("myUsername");
				let sessionKey = username.groupId ? username.groupId + myUsername : username.your + myUsername;
				let historyChatMsgs = uni.getStorageSync("rendered_" + sessionKey) || [];

				if (Index < historyChatMsgs.length) {
					let timesMsgList = historyChatMsgs.slice(-Index - 10, -Index)

					this.setData({
						chatMsg: timesMsgList.concat(me.data.chatMsg),
						toView: timesMsgList[timesMsgList.length - 1].mid,
					});
					Index += timesMsgList.length;
					if (timesMsgList.length == 10) {
						page++
					}
					uni.stopPullDownRefresh()
				}
			},

			renderMsg(renderableMsg, type, curChatMsg, sessionKey, isnew) {
				let me = this
				if (curChatMsg.length > 1) {
					this.chatMsg.map(function(elem, index) {
						curChatMsg.map(function(item, i) {
							if (elem.mid == item.mid) {
								//me.data.chatMsg.splice(index, 1)
								curChatMsg.splice(i, 1)
							}
						})
					})
				}


				var historyChatMsgs = uni.getStorageSync("rendered_" + sessionKey) || [];
				// if (curChatMsg.length) {
				// 	console.log(curMsgMid.substring(curMsgMid.length - 10) , curChatMsg[0].mid.substring(curChatMsg[0].mid.length - 10))
				// }

				// if(curChatMsg.length && curMsgMid.substring(curMsgMid.length - 10) == curChatMsg[curChatMsg.length - 1].mid.substring(curChatMsg[0].mid.length - 10)){
				// 	//curChatMsg[curChatMsg.length - 1].msg.data[0].isSuc = true
				// 	curChatMsg[curChatMsg.length - 1].isSuc = true
				// }
				historyChatMsgs = historyChatMsgs.concat(curChatMsg);

				//console.log('当前历史',renderableMsg)
				//console.log('历史消息', historyChatMsgs)
				if (!historyChatMsgs.length) return;
				if (isnew == 'newMsg') {
					
					this.chatMsg=this.chatMsg.concat(curChatMsg);
						// 跳到最后一条
					this.toView=historyChatMsgs[historyChatMsgs.length - 1].mid;
					
				} else {
					
					this.chatMsg=historyChatMsgs.slice(-10);
						// 跳到最后一条
					this.toView=historyChatMsgs[historyChatMsgs.length - 1].mid;
					
				}

				uni.setStorageSync("rendered_" + sessionKey, historyChatMsgs);

				let chatMsg = uni.getStorageSync(sessionKey) || [];
				chatMsg.map(function(item, index) {
					curChatMsg.map(function(item2, index2) {
						if (item2.mid == item.mid) {
							chatMsg.splice(index, 1)
						}
					})
				})


				uni.setStorageSync(sessionKey, chatMsg);
				Index = historyChatMsgs.slice(-10).length;
				uni.pageScrollTo({
					scrollTop: 9999,
				})

				if (isFail) {
					this.renderFail(sessionKey)
				}
			},
			renderFail(sessionKey) {
				let me = this
				let msgList = me.data.chatMsg
				msgList.map((item) => {
					if (item.mid.substring(item.mid.length - 10) == curMsgMid.substring(curMsgMid.length - 10)) {
						item.msg.data[0].isFail = true
						item.isFail = true

						me.setData({
							chatMsg: msgList
						})
					}
				})
				if (me.curChatMsg[0].mid == curMsgMid) {
					me.curChatMsg[0].msg.data[0].isShow = false;
					me.curChatMsg[0].isShow = false
				}
				uni.setStorageSync("rendered_" + sessionKey, msgList);
				isFail = false
			}
		},

		// lifetimes
		created() {},
		attached() {
			this.$data.visibility__ = true;
			page = 0;
			Index = 0;
		},
		moved() {},
		detached() {
			this.$data.visibility__ = true;
		},
		mounted(event) {
			let me = this;
			// if (getApp().globalData.isIPX) {
			// 	this.setData({
			// 		isIPX: true
			// 	})
			// }
			let username = this.username;
			let myUsername = uni.getStorageSync("myUsername");

			let sessionKey = username.groupId ?
				username.groupId + myUsername :
				username.your + myUsername;

			let chatMsg = uni.getStorageSync(sessionKey) || [];

			this.renderMsg(null, null, chatMsg, sessionKey);
			uni.setStorageSync(sessionKey, null);
			// disp.on("em.chat.sendSuccess", function(mid){
			// 	curMsgMid = mid
			// 	console.log('发送过去了', mid)
			// 	let msgList = me.data.chatMsg
			// 	msgList.map((item) =>{
			// 		if (item.mid.substring(item.mid.length - 10) == mid.substring(mid.length - 10)) {

			// 			console.log(111111, item)

			// 			item.msg.data[0].isSuc = true
			// 			item.isSuc = true

			// 			me.setData({
			// 				chatMsg: msgList
			// 			})
			// 		}
			// 	})
			// 	if (me.curChatMsg[0].mid == curMsgMid) {
			// 		me.curChatMsg[0].msg.data[0].isShow = true
			// 		me.curChatMsg[0].isShow = true
			// 	}
			// 	uni.setStorageSync("rendered_" + sessionKey, msgList);
			// 	console.log('msgList', msgList)

			// })

			disp.on('em.xmpp.error.sendMsgErr', function(err) {
				curMsgMid = err.data.mid
				isFail = true
				return
				console.log('发送失败了')
				let msgList = me.data.chatMsg
				msgList.map((item) => {
					if (item.mid.substring(item.mid.length - 10) == curMsgMid.substring(curMsgMid.length - 10)) {
						item.msg.data[0].isFail = true
						item.isFail = true

						me.setData({
							chatMsg: msgList
						})
					}
				})
				if (me.curChatMsg[0].mid == curMsgMid) {
					me.curChatMsg[0].msg.data[0].isShow = false;
					me.curChatMsg[0].isShow = false
				}
				uni.setStorageSync("rendered_" + sessionKey, msgList);
			});

			msgStorage.on("newChatMsg", function(renderableMsg, type, curChatMsg, sesskey) {
				if (!me.lastTime || (new Date().getTime() - me.lastTime) > 5 * 60 * 1000) {
					renderableMsg.showTime = true;
					// renderableMsg.time = renderableMsg.time.substring(renderableMsg.time.indexOf(" ")+1);
					me.lastTime = new Date().getTime();
				}
				me.curChatMsg = curChatMsg;
				if (!me.$data.visibility__) return;
				// 判断是否属于当前会话
				if (username.groupId) {
					// 群消息的 to 是 id，from 是 name
					if (renderableMsg.info.from == username.groupId || renderableMsg.info.to == username.groupId) {
						if (sesskey == sessionKey) {
							me.renderMsg(renderableMsg, type, curChatMsg, sessionKey, 'newMsg');
						}

					}
				} else if (renderableMsg.info.from == username.your || renderableMsg.info.to == username.your) {
					// if (sesskey == sessionKey) {
					me.renderMsg(renderableMsg, type, curChatMsg, sessionKey, 'newMsg');
					// }
				}

			});


		},
	}
</script>
<style>
	/*.chat-bg{
	position:fixed;
	width: 100%;
	height: 100%;
	z-index: 0;
	top: 50px;
}*/
.msglist.scroll_view,
.msglist.scroll_view_change {
	/*width: 100%;
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 150rpx;*/
	margin-bottom: 174rpx;
	background-color: #FAFAFA;
}

.msglist.scroll_view_X,
.msglist.scroll_view_change_X{
	margin-bottom: 244rpx;
}

.msglist.scroll_view_change {
	/*bottom: 440rpx;*/
	margin-bottom: 590rpx;
}

.msglist .message {
	width: 92%;
	height: auto;
	padding: 0 30rpx;
	position: relative;

}

.msglist .time {
	margin: 14rpx 0;
	text-align: center;
}

.msglist .time .time-text {
	display: inline-block;
	padding: 6rpx 20rpx 0 20rpx;
	font-size: 24rpx;
	color: #fff;
	line-height: 28rpx;
	border-radius: 4rpx;
	background-color: #dcdcdc;
}

.msglist .user .user-text {
	margin: auto 100rpx 8rpx;
	font-size: 20rpx;
	color: #dcdcdc;
	display: block;
}

.msglist .avatar {
	width: 72rpx;
	height: 72rpx;
	margin: 0 20rpx 0 0;
	border-radius: 6rpx;
	float: left;
}

.msglist .msg {
	display: inline-block;
	padding: 20rpx;
	max-width: calc(85% - 80rpx);
	min-height: 40rpx; 
	font-size: 24rpx;
	/*overflow: hidden;*/
	text-align: left;
	word-break: break-all;
	background-color: #fff;
	border-radius: 26rpx;
	position: relative;
	margin-top: 24rpx;
}

.msglist .msg .msg_poprightarrow {
	position: absolute;
	right: -10rpx;
	height: 18rpx;
	width: 18rpx;
	margin-top: -10rpx;
}

.msglist .msg .msg_popleftarrow{
	position:absolute;
	left: -14rpx;
	height: 18rpx;
	width: 18rpx;
	margin-top: -10rpx;
}

.msglist .msg .msg-text {
	line-height: 40rpx;
	font-size: 32rpx;
	margin: 0;
}

/*.msg:before {
	content: " ";
	position: absolute;
	top: 9px;
	right: 100%;
	border: 6px solid transparent;
	border-right-color: #EDEDED;
}*/

.msglist .self {
	text-align: right;
}

.msglist .self .avatar {
	float: right;
	margin: 0 0 0 20rpx;
}

.msglist .user {
	position: relative;
	bottom: -30rpx;
}

.msglist .self .msg {
	background-color: #0873DE;
	color: #fff;
}

.msglist .self .msg:before {
	right: inherit;
	left: 100%;
	border-right-color: transparent;
	border-left-color: #b2e281;
}

.msglist .template {
	display: inline;
}
.msglist .err{
	width: 32rpx;
	height: 32rpx;
	position: absolute;
	left: -40rpx;
}
.msglist .hide{
	display: none;
}
.msglist .show{
	display: block;
}

</style>