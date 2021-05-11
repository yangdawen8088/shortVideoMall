<script>
	import Vue from 'vue'
require("sdk/libs/strophe");
let WebIM = require("utils/WebIM")["default"];
let msgStorage = require("comps/chat/msgstorage");
let msgType = require("comps/chat/msgtype");
let ToastPannel = require("./comps/toast/toast");
let disp = require("utils/broadcast");

let logout = false;

function ack(receiveMsg) {
  // 处理未读消息回执
  var bodyId = receiveMsg.id;         // 需要发送已读回执的消息id
  var ackMsg = new WebIM.message("read", WebIM.conn.getUniqueId());
  ackMsg.set({
    id: bodyId,
    to: receiveMsg.from
  });
  WebIM.conn.send(ackMsg.body);
}

function onMessageError(err) {
  if (err.type === "error") {
    uni.showToast({
      title: err.errorText
    });
    return false;
  }
  return true;
}

function getCurrentRoute() {
  let pages = getCurrentPages();
  let currentPage = pages[pages.length - 1];
  return currentPage.route;
}

function calcUnReadSpot(message) {
  let myName = uni.getStorageSync("myUsername");
  let members = uni.getStorageSync("member") || []; //好友
  var listGroups = uni.getStorageSync('listGroup') || []; //群组
  let allMembers = members.concat(listGroups)
  let count = allMembers.reduce(function (result, curMember, idx) {
    let chatMsgs;
    if (curMember.roomId) {
      chatMsgs = uni.getStorageSync(curMember.roomId + myName.toLowerCase()) || [];
    } else {
      chatMsgs = uni.getStorageSync(curMember.name.toLowerCase() + myName.toLowerCase()) || [];
    }
    return result + chatMsgs.length;
  }, 0);
  getApp().globalData.unReadMessageNum = count;
  disp.fire("em.xmpp.unreadspot", message);
}




Vue.prototype.conn = {
		closed: false,
		curOpenOpt: {},
		open(opt) {
		  // uni.showLoading({
		  //   title: '正在初始化客户端...',
		  //   mask: true
		  // })
		  this.curOpenOpt = opt;
		  WebIM.conn.open(opt);
		  this.closed = false;
		},
		reopen() {
		  if (this.closed) {
			//this.open(this.curOpenOpt);
			WebIM.conn.open(this.curOpenOpt);
			this.closed = false;
		  }
		}
	  };

export default {
  ToastPannel,
  globalData: {
    unReadMessageNum: 0,
    userInfo: null,
    saveFriendList: [],
    saveGroupInvitedList: [],
    isIPX: false //是否为iphone X
  },

  

  // getPage(pageName){
  // 	var pages = getCurrentPages();
  // 	return pages.find(function(page){
  // 		return page.__route__ == pageName;
  // 	});
  // },

  onLaunch() {
    // 调用 API 从本地缓存中获取数据
	uni.createInnerAudioContext().obeyMuteSwitch = false;
    // uni.setInnerAudioOption({ obeyMuteSwitch: false })
    var me = this;
    var logs = uni.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    uni.setStorageSync("logs", logs);


    // 
    disp.on("em.main.ready", function () {
      calcUnReadSpot();
    });
    disp.on("em.chatroom.leave", function () {
      calcUnReadSpot();
    });
    disp.on("em.chat.session.remove", function () {
      calcUnReadSpot();
    });
    disp.on('em.chat.audio.fileLoaded', function () {
      calcUnReadSpot()
    });

    disp.on('em.main.deleteFriend', function () {
      calcUnReadSpot()
    });
    disp.on('em.chat.audio.fileLoaded', function () {
      calcUnReadSpot()
    });


    // 
    WebIM.conn.listen({
      onOpened(message) {
        WebIM.conn.setPresence();
        
      },
      onReconnect() {
        uni.showToast({
          title: "重连中...",
          icon: 'none',
          duration: 2000
        });
      },
      onSocketConnected() {
        // uni.showToast({
        //   title: "socket连接成功",
        //   duration: 2000
        // });
      },
      onClosed() {
        uni.showToast({
          title: "网络已断开",
          icon: 'none',
          duration: 2000
        });
        // uni.redirectTo({
        //   url: "../login/login"
        // });
        me.conn.closed = true;
        WebIM.conn.close();
      },
      onInviteMessage(message) {
        me.globalData.saveGroupInvitedList.push(message);
        disp.fire("em.xmpp.invite.joingroup", message);
        // uni.showModal({
        // 	title: message.from + " 已邀你入群 " + message.roomid,
        // 	success(){
        // 		disp.fire("em.xmpp.invite.joingroup", message);
        // 	},
        // 	error(){
        // 		disp.fire("em.xmpp.invite.joingroup", message);
        // 	}
        // });
      },
      onPresence(message) {
        //console.log("onPresence", message);
        switch (message.type) {
          case "unsubscribe":
            // pages[0].moveFriend(message);
            break;
          // 好友邀请列表
          case "subscribe":
            if (message.status === "[resp:true]") {

            }
            else {
              // pages[0].handleFriendMsg(message);
              for (let i = 0; i < me.globalData.saveFriendList.length; i++) {
                if (me.globalData.saveFriendList[i].from === message.from) {
                  me.globalData.saveFriendList[i] = message
                  disp.fire("em.xmpp.subscribe");
                  return;
                }
              }
              me.globalData.saveFriendList.push(message);
              disp.fire("em.xmpp.subscribe");
            }
            break;
          case "subscribed":
            uni.showToast({
              title: "添加成功",
              duration: 1000
            });
            disp.fire("em.xmpp.subscribed");
            break;
          case "unsubscribed":
            // uni.showToast({
            // 	title: "已拒绝",
            // 	duration: 1000
            // });
            break;
          case "memberJoinPublicGroupSuccess":
            uni.showToast({
              title: "已进群",
              duration: 1000
            });
            break;
          // 好友列表
          // case "subscribed":
          // 	let newFriendList = [];
          // 	for(let i = 0; i < me.globalData.saveFriendList.length; i++){
          // 		if(me.globalData.saveFriendList[i].from != message.from){
          // 			newFriendList.push(me.globalData.saveFriendList[i]);
          // 		}
          // 	}
          // 	me.globalData.saveFriendList = newFriendList;
          // 	break;
          // 删除好友
          case "unavailable":
            disp.fire("em.xmpp.contacts.remove");
            disp.fire("em.xmpp.group.leaveGroup", message);
            break;

          case 'deleteGroupChat':
            disp.fire("em.xmpp.invite.deleteGroup", message);
            break;

          case "leaveGroup":
            disp.fire("em.xmpp.group.leaveGroup", message);
            break;

          case "removedFromGroup":
            disp.fire("em.xmpp.group.leaveGroup", message);
            break;
          // case "joinChatRoomSuccess":
          // 	uni.showToast({
          // 		title: "JoinChatRoomSuccess",
          // 	});
          // 	break;
          // case "memberJoinChatRoomSuccess":
          // 	uni.showToast({
          // 		title: "memberJoinChatRoomSuccess",
          // 	});
          // 	break;
          // case "memberLeaveChatRoomSuccess":
          // 	uni.showToast({
          // 		title: "leaveChatRoomSuccess",
          // 	});
          // 	break;

          default:
            break;
        }
      },

      onRoster(message) {
        // let pages = getCurrentPages();
        // if(pages[0]){
        // 	pages[0].onShow();
        // }
      },

      onVideoMessage(message) {
        console.log("onVideoMessage: ", message);
        if (message) {
          msgStorage.saveReceiveMsg(message, msgType.VIDEO);
        }
        calcUnReadSpot(message);
        ack(message);
      },

      onAudioMessage(message) {
        console.log("onAudioMessage", message);
        if (message) {
          if (onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.AUDIO);
          }
          calcUnReadSpot(message);
          ack(message);
        }
      },

      onCmdMessage(message) {
        console.log("onCmdMessage", message);
        if (message) {
          if (onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.CMD);
          }
          calcUnReadSpot(message);
          ack(message);
        }
      },

      // onLocationMessage(message){
      // 	console.log("Location message: ", message);
      // 	if(message){
      // 		msgStorage.saveReceiveMsg(message, msgType.LOCATION);
      // 	}
      // },

      onTextMessage(message) {
        console.log("onTextMessage", message);
        if (message) {
          if (onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.TEXT);
          }
          calcUnReadSpot(message);
          ack(message);
        }
      },

      onEmojiMessage(message) {
        console.log("onEmojiMessage", message);
        if (message) {
          if (onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.EMOJI);
          }
          calcUnReadSpot(message);
          ack(message);
        }
      },

      onPictureMessage(message) {
        console.log("onPictureMessage", message);
        if (message) {
          if (onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.IMAGE);
          }
          calcUnReadSpot(message);
          ack(message);
        }
      },

      onFileMessage(message) {
        console.log('onFileMessage', message);
        if (message) {
          if (onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.FILE);
          }
          calcUnReadSpot(message);
          ack(message);
        }
      },

      // 各种异常
      onError(error) {
        console.log(error)
        // 16: server-side close the websocket connection
        if (error.type == WebIM.statusCode.WEBIM_CONNCTION_DISCONNECTED && !logout) {
          if (WebIM.conn.autoReconnectNumTotal < WebIM.conn.autoReconnectNumMax) {
            return;
          }
          uni.showToast({
            title: "server-side close the websocket connection",
            duration: 1000
          });
          // uni.redirectTo({
          //   url: "../login/login"
          // });
          logout = true
          return;
        }
        // 8: offline by multi login
        if (error.type == WebIM.statusCode.WEBIM_CONNCTION_SERVER_ERROR) {
          uni.showToast({
            title: "offline by multi login",
            duration: 1000
          });
          // uni.redirectTo({
          //   url: "../login/login"
          // });
        }
        if (error.type == WebIM.statusCode.WEBIM_CONNCTION_OPEN_ERROR) {
          uni.hideLoading()
          disp.fire("em.xmpp.error.passwordErr");
          // uni.showModal({
          // 	title: "用户名或密码错误",
          // 	confirmText: "OK",
          // 	showCancel: false
          // });
        }
        if (error.type == WebIM.statusCode.WEBIM_CONNCTION_AUTH_ERROR) {
          uni.hideLoading()
          disp.fire("em.xmpp.error.tokenErr");
        }
        if (error.type == 'socket_error') {///sendMsgError
          console.log('socket_errorsocket_error', error)
          uni.showToast({
            title: "网络已断开",
            icon: 'none',
            duration: 2000
          });
          disp.fire("em.xmpp.error.sendMsgErr", error);
        }
      },
    });
    this.checkIsIPhoneX();

    if (uni.getStorageSync("user")){
      var userjson = uni.getStorageSync("user");
      var user = JSON.parse(userjson);
      this.conn.open({
        apiUrl: WebIM.config.apiURL,
        user: user.uid,
        pwd: '111111',
        grant_type: 'password',
        appKey: WebIM.config.appkey
      });
    }
  },
  // onShow(){
  // 	WebIM.conn.reconnect();
  // },

  // onHide(){

  // 	WebIM.conn.close();
  // 	WebIM.conn.stopHeartBeat();
  // },

  // onUnload(){
  // 	WebIM.conn.close();
  // 	WebIM.conn.stopHeartBeat();
  // 	uni.redirectTo({
  // 		url: "../login/login?myName=" + myName
  // 	});
  // },

  methods:{
	
	  getUserInfo(cb) {
		var me = this;
		if (this.globalData.userInfo) {
		  typeof cb == "function" && cb(this.globalData.userInfo);
		}
		else {
		  // 调用登录接口
		  uni.login({
			success() {
			  uni.getUserInfo({
				success(res) {
				  me.globalData.userInfo = res.userInfo;
				  typeof cb == "function" && cb(me.globalData.userInfo);
				}
			  });
			}
		  });
		}
	  },
	  checkIsIPhoneX: function () {
		const me = this
		uni.getSystemInfo({
		  success: function (res) {
			// 根据 model 进行判断
			if (res.model && res.model.search('iPhone X') != -1) {
			  me.globalData.isIPX = true
			}
		  }
		})
	  }
  }

};
</script>

<style>
/*每个页面公共css */ 
@import "colorui/main.css";
@import "colorui/icon.css";
body {
	--gradualBlack: linear-gradient(0deg, #000000, #222222);
}
.bg-gradual-black{
	background-image: var(--gradualBlack);
	
}
.bg-gold-light{
	background-color: #e3c77f;
}
.bg-gold-dark{
	background-color: #b79846;
}
.text-gold-light{
	color:#e3c77f;
}
.text-gold-dark{
	color:#b79846;
}
</style>
