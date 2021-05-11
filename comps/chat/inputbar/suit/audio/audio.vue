<template>
<view v-if="recordStatus != RecordStatus.HIDE" class="suit-audio modal modal-record" @tap="toggleRecordModal">
	<view class="modal-body" @tap="toggleWithoutAction">

		<view class='sound-waves'>
		  	<view v-for="(item,index) in radomheight" :key="index" v-bind:style="{height:item+'rpx',marginTop:'-'+item/2+'rpx'}"></view>
		  	<view style='clear:both;width:0;height:0;'></view>
		</view>
		<text class="desc">{{ RecordDesc[recordStatus] }}</text>
		<button
			class="dot"
			@touchstart="handleRecording"
			@touchmove="handleRecordingMove"
			@touchend="handleRecordingCancel"
			@touchcancel="handleRecordingCancel">
			<image class="icon-mic" src="/static/images/send.png"/>
		</button>
	</view>
</view>
</template>
<script>
let WebIM = require("../../../../../utils/WebIM")["default"];
let msgType = require("../../../msgtype");
let RECORD_CONST = require("./record_status");
let RecordStatus = RECORD_CONST.RecordStatus;
let RecordDesc = RECORD_CONST.RecordDesc;
let disp = require("../../../../../utils/broadcast");
let RunAnimation = false
const InitHeight = [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]
export default {
	name: 'ChatSuitAudio',
	props: {
		username: {
			type: Object,
			value: {},
		},
		chatType: {
			type: String,
			value: msgType.chatType.SINGLE_CHAT,
		},
	},
	data() {
		return {
			changedTouches: null,
			recordStatus: RecordStatus.HIDE,
			RecordStatus,
			RecordDesc,		// 模板中有引用
			radomheight: InitHeight,
			recorderManager: uni.getRecorderManager(),
			recordClicked: false
		}
	},
	methods: {
		toggleWithoutAction(e){
			// 阻止 tap 冒泡
		},

		toggleRecordModal(){
			this.recordStatus=this.recordStatus == RecordStatus.HIDE ? RecordStatus.SHOW : RecordStatus.HIDE;
			this.radomheight=InitHeight;
			
		},

		handleRecordingMove(e){
			var touches = e.touches[0];
			var changedTouches = this.changedTouches;
			if(!changedTouches){
				return;
			}

			if(this.recordStatus == RecordStatus.SWIPE){
				if(changedTouches.pageY - touches.pageY < 20){
					this.recordStatus= RecordStatus.HOLD;
				}
			}
			if(this.recordStatus == RecordStatus.HOLD){
				if(changedTouches.pageY - touches.pageY > 20){
					this.recordStatus= RecordStatus.SWIPE;
				}
			}
		},

		handleRecording(e){
			let me = this;
		    me.recordClicked= true;
		    setTimeout(() => {
		      	if (me.recordClicked == true) {
		        	executeRecord()
		      	}
		    }, 350)
			
		    function executeRecord(){
				//#ifdef H5
				startRecord();
				//#endif
				//#ifndef H5
			    wx.getSetting({
			      	success: (res) => {
				        let recordAuth = res.authSetting['scope.record']
				        if (recordAuth == false) { //已申请过授权，但是用户拒绝
				          	wx.openSetting({
					            success: function (res) {
					              let recordAuth = res.authSetting['scope.record']
					              if (recordAuth == true) {
					                wx.showToast({
							        	title: "授权成功",
							        	icon: "success"
							        })
					              } else {
					                wx.showToast({
							        	title: "请授权录音",
							        	icon: "none"
							        })
					              }
					              me.setData({
					                isLongPress: false
					              })
					            }
				          	})
				        } else if (recordAuth == true) { // 用户已经同意授权
				          	startRecord()
				        } else { // 第一次进来，未发起授权
					        wx.authorize({
					            scope: 'scope.record',
					            success: () => {//授权成功
					              	wx.showToast({
							        	title: "授权成功",
							        	icon: "success"
							        })
					            }
					        })
				        }
				    },
				    fail: function () {
				        wx.showToast({
				        	title: "鉴权失败，请重试",
				        	icon: "none"
				        })
			      	}
			    })
				//#endif
		    }

			function startRecord(){
				me.changedTouches = e.touches[0];
				me.recordStatus=RecordStatus.HOLD;
				
				RunAnimation = true;
				me.myradom();

				let recorderManager = me.recorderManager || uni.getRecorderManager();
				recorderManager.onStart(() => {
					// console.log("开始录音...");
				});
				recorderManager.start({
					format: "mp3"
				});
				// 超时
				setTimeout(function(){
					me.handleRecordingCancel();
					RunAnimation = false
				}, 100000);
			}
		},

		handleRecordingCancel(){
			RunAnimation = false
			let recorderManager = this.recorderManager;
			// 向上滑动状态停止：取消录音发放
			if(this.recordStatus == RecordStatus.SWIPE){
				this.recordStatus= RecordStatus.RELEASE;
				
			}
			else{
				this.recordStatus=RecordStatus.HIDE;
				this.recordClicked=false;
				
			}

			recorderManager.onStop((res) => {
				// console.log("结束录音...", res);
				if(this.recordStatus == RecordStatus.RELEASE){
					console.log("user canceled");
					this.recordStatus= RecordStatus.HIDE;
					return;
				}
				if (res.duration < 1000) {
			        uni.showToast({
			        	title: "录音时间太短",
			        	icon: "none"
			        })
			    } else {
			        // 上传
					this.uploadRecord(res.tempFilePath, res.duration);
			    }
			});
			// 停止录音
			recorderManager.stop();
		},

		isGroupChat(){
			return this.chatType == msgType.chatType.CHAT_ROOM;
		},

		getSendToParam(){
			return this.isGroupChat() ? this.username.groupId : this.username.your;
		},

		uploadRecord(tempFilePath, dur){
			var str = WebIM.config.appkey.split("#");
			var me = this;
			var token = WebIM.conn.context.accessToken
			uni.uploadFile({
				url: "https://a1.easemob.com/" + str[0] + "/" + str[1] + "/chatfiles",
				filePath: tempFilePath,
				name: "file",
				header: {
					Authorization: "Bearer " + token
				},
				success(res){
					// 发送 xmpp 消息
					var id = WebIM.conn.getUniqueId();
					var msg = new WebIM.message(msgType.AUDIO, id);
					var dataObj = JSON.parse(res.data);
					// 接收消息对象
					msg.set({
						apiUrl: WebIM.config.apiURL,
						accessToken: token,
						body: {
							type: msgType.AUDIO,
							url: dataObj.uri + "/" + dataObj.entities[0].uuid,
							filetype: "",
							filename: tempFilePath,
							accessToken: token,
							length: Math.ceil(dur / 1000)
						},
						from: me.username.myName,
						to: me.getSendToParam(),
						roomType: false,
						chatType: me.chatType,
						success: function (argument) {
							disp.fire('em.chat.sendSuccess', id);
						}
					});
					if(me.isGroupChat()){
						msg.setGroup("groupchat");
					}
					msg.body.length = Math.ceil(dur / 1000);
					//console.log('发送的语音消息', msg.body)
					WebIM.conn.send(msg.body);

					me.$emit(
						"newAudioMsg",
						{
							msg: msg,
							type: msgType.AUDIO,
						},
						{
							bubbles: true,
							composed: true
						}
					);
				}
			});
		},

		myradom(){
		    const that = this;
		    var _radomheight = that.radomheight;
		    for (var i = 0; i < that.radomheight.length; i++) {
		      //+1是为了避免为0
		     _radomheight[i] = (100 * Math.random().toFixed(2))+10;
		    }
		    that.radomheight=_radomheight;
		    if (RunAnimation) {
		    	setTimeout(function () {that.myradom(); }, 500);
		    }else{
		    	return
		    }
	  	}
	},

	// lifetimes
	created(){},
	attached(){},
	moved(){},
	detached(){},
	ready(){},
}

</script>
<style>
.suit-audio.modal {
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	z-index: 999;
	/*display: flex;
	justify-content: center;
	align-items: center;*/
}

.suit-audio.modal-record .modal-body {
	width: 480rpx;
	height: 440rpx;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 3px;
	box-shadow: 0 0 32rpx rgba(0, 0, 0, 0.15);
	position: fixed;
	bottom: 480rpx;
	left: 50%;
	margin-left: -240rpx;
}

.suit-audio.modal-record .desc {
	color: rgb(112, 126, 137);
	font-size: 13px;
	margin-bottom: 40rpx;
	display: block;
	height: 30rpx;
	width: 100%;
	text-align: center;
}

.suit-audio.modal-record .dot {
	width: 128rpx;
	height: 128rpx;
	border-radius: 50%;
	background-color: #0873DE;
	display: flex;
	justify-content: center;
	align-items: center;
}

.suit-audio .dot image {
	width: 44rpx;
	height: 64rpx;
}

.suit-audio .sound-waves {
  width: 100%;
  box-sizing: border-box;
  padding-left:10%;
  margin-top: 80rpx;
  height: 80rpx;
  text-align: center;
}
 
.suit-audio .sound-waves view {
  transition: all 0.5s;
  width: 1%;
  margin-left: 1.5%;
  margin-right: 1.5%;
  height: 160rpx;
  background-color: #aaa;
  float: left;
}

</style>