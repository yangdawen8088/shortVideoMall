(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/chatroom/chatroom"],{"0279":function(t,e,a){"use strict";a.r(e);var i=a("db35"),s=a("da71");for(var r in s)"default"!==r&&function(t){a.d(e,t,function(){return s[t]})}(r);a("de99");var n=a("2877"),o=Object(n["a"])(s["default"],i["a"],i["b"],!1,null,null,null);e["default"]=o.exports},"0301":function(t,e,a){"use strict";a.r(e);var i=a("30c1"),s=a.n(i);for(var r in i)"default"!==r&&function(t){a.d(e,t,function(){return i[t]})}(r);e["default"]=s.a},"0b80":function(t,e,a){"use strict";a("719a");var i=r(a("0279")),s=r(a("3a53"));function r(t){return t&&t.__esModule?t:{default:t}}i.default.mpType="page";var n=new s.default(i.default);n.$mount()},"0d1e":function(t,e,a){"use strict";a.r(e);var i=a("e5a4"),s=a.n(i);for(var r in i)"default"!==r&&function(t){a.d(e,t,function(){return i[t]})}(r);e["default"]=s.a},"112b":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=s(a("f35f"));function s(t){return t&&t.__esModule?t:{default:t}}var r=a("4df4"),n={components:{chat:i.default},data:function(){return{username:{your:""}}},onLoad:function(e){var a=JSON.parse(e.username);this.username=a,t.setNavigationBarTitle({title:a.sellerName})},onUnload:function(){r.fire("em.chatroom.leave")},onPullDownRefresh:function(){t.showNavigationBarLoading(),this.selectComponent("#chat").getMore(),t.hideNavigationBarLoading(),t.stopPullDownRefresh()}};e.default=n}).call(this,a("f266")["default"])},"150a":function(t,e,a){"use strict";a.r(e);var i=a("8d57"),s=a("5ee6");for(var r in s)"default"!==r&&function(t){a.d(e,t,function(){return s[t]})}(r);a("52e0");var n=a("2877"),o=Object(n["a"])(s["default"],i["a"],i["b"],!1,null,null,null);e["default"]=o.exports},"1aeb":function(t,e,a){},"1f90":function(t,e,a){"use strict";a.r(e);var i=a("6b42"),s=a("0301");for(var r in s)"default"!==r&&function(t){a.d(e,t,function(){return s[t]})}(r);a("ad92");var n=a("2877"),o=Object(n["a"])(s["default"],i["a"],i["b"],!1,null,null,null);e["default"]=o.exports},"205f":function(t,e,a){"use strict";a.r(e);var i=a("7a67"),s=a.n(i);for(var r in i)"default"!==r&&function(t){a.d(e,t,function(){return i[t]})}(r);e["default"]=s.a},"20e3":function(t,e,a){},"28ba":function(t,e,a){},"2f68":function(t,e,a){"use strict";a.r(e);var i=a("5cf8"),s=a("3f2b");for(var r in s)"default"!==r&&function(t){a.d(e,t,function(){return s[t]})}(r);a("c63c");var n=a("2877"),o=Object(n["a"])(s["default"],i["a"],i["b"],!1,null,null,null);e["default"]=o.exports},"30c1":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=a("5ff1")["default"],s=a("b428"),r=a("4df4"),n={name:"ChatSuitMain",props:{username:{type:Object,value:{}},chatType:{type:String,value:s.chatType.SINGLE_CHAT}},data:function(){return{inputMessage:"",userMessage:""}},methods:{focus:function(){this.$emit("inputFocused",null,{bubbles:!0})},blur:function(){this.$emit("inputBlured",null,{bubbles:!0})},isGroupChat:function(){return this.chatType==s.chatType.CHAT_ROOM},getSendToParam:function(){return this.isGroupChat()?this.username.groupId:this.username.your},bindMessage:function(t){this.userMessage=t.detail.value},emojiAction:function(t){var e,a=this.userMessage.length-1;if(t&&"[del]"!=t)e=this.userMessage+t;else if("[del]"==t){var i=this.userMessage.lastIndexOf("["),s=this.userMessage.lastIndexOf("]"),r=s-i;e=-1!=s&&s==a&&r>=3&&r<=4?this.userMessage.slice(0,i):this.userMessage.slice(0,a)}this.userMessage=e,this.inputMessage=e},sendMessage:function(){var t=this;if(String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g,"")},this.userMessage.trim()){var e=i.conn.getUniqueId(),a=new i.message(s.TEXT,e);a.set({msg:this.userMessage,from:this.username.myName,to:this.getSendToParam(),roomType:!1,chatType:this.chatType,success:function(e,a){r.fire("em.chat.sendSuccess",e,t.userMessage)},fail:function(t,e){console.log("失败了")}}),this.chatType==s.chatType.CHAT_ROOM&&a.setGroup("groupchat"),i.conn.send(a.body),this.$emit("newTextMsg",{msg:a,type:s.TEXT},{bubbles:!0,composed:!0}),this.userMessage="",this.inputMessage=""}}},created:function(){},attached:function(){},moved:function(){},detached:function(){},ready:function(){}};e.default=n},"3f2b":function(t,e,a){"use strict";a.r(e);var i=a("b47d"),s=a.n(i);for(var r in i)"default"!==r&&function(t){a.d(e,t,function(){return i[t]})}(r);e["default"]=s.a},"52e0":function(t,e,a){"use strict";var i=a("8cae"),s=a.n(i);s.a},"59b1":function(t,e,a){},"5cf8":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{class:t.view+" wrap "+(t.isIPX?"scroll_view_X":""),staticStyle:{"background-color":"#eeeeee"},attrs:{"scroll-y":"true",bindscroll:"scrollmore",bindscrolltoupper:"refresh","upper-threshold":"-50","scroll-into-view":"toView",_hid:0},on:{tap:t.onTap}},t._l(t.chatMsg,function(e,i,s){var r=void 0!==s?s:i;return a("view",{key:e.mid,staticClass:"message",staticStyle:{width:"100%","margin-top":"30rpx"},attrs:{id:e.mid,_hid:1,_fid:r,_batrs:"id",_fk:"mid"}},[t._ri(!(e.info.to==t.username.your),2,void 0!==s?s:i)?a("view",{staticStyle:{display:"flex","justify-content":"flex-start","flex-wrap":"wrap"},attrs:{_hid:2,_fid:r}},[t._ri(!(1!=e.showTime),3,void 0!==s?s:i)?a("view",{staticClass:"user",staticStyle:{display:"flex",flex:"0 0 100%","text-align":"center","justify-content":"center","margin-botton":"20rpx",bottom:"0"},attrs:{_hid:3,_fid:r}},[a("text",{staticClass:"user-text",staticStyle:{padding:"6rpx 20rpx",color:"white","background-color":"#bbbbbb","border-radius":"10rpx"},attrs:{_hid:4,_fid:r}},[t._v(t._s(e.time),5,r)])]):t._e(),a("image",{staticClass:"avatar",staticStyle:{float:"normal"},attrs:{src:t.username.sellerHead,_hid:6,_fid:r,_batrs:"src"}}),a("view",{staticClass:"msg",staticStyle:{"margin-top":"0"},attrs:{_hid:7,_fid:r}},[a("image",{class:["err","self"==e.style&&e.isFail?"show":"hide"],attrs:{src:"/static/images/msgerr.png",_hid:8,_fid:r}}),t._ri(!("self"!=e.style),9,void 0!==s?s:i)?a("image",{staticClass:"msg_poprightarrow",attrs:{src:"/static/images/poprightarrow@2x.png",_hid:9,_fid:r}}):t._e(),t._ri(!(""!=e.style),10,void 0!==s?s:i)?a("image",{staticClass:"msg_popleftarrow",attrs:{src:"/static/images/popleftarrow@2x.png",_hid:10,_fid:r}}):t._e(),t._ri(!("img"!=e.msg.type&&"video"!=e.msg.type),11,void 0!==s?s:i)?a("view",{attrs:{_hid:11,_fid:r}},[t._ri(!("img"!=e.msg.type),12,void 0!==s?s:i)?a("block",{attrs:{_hid:12,_fid:r}},[a("image",{staticClass:"avatar",staticStyle:{width:"90px",height:"120px",margin:"2px auto"},attrs:{src:e.msg.data,mode:"aspectFit","data-url":e.msg.data,_hid:13,_fid:r,_batrs:"src,data-url"},on:{tap:t.previewImage}})]):t._e(),t._ri(!("video"!=e.msg.type),14,void 0!==s?s:i)?a("block",{attrs:{_hid:14,_fid:r}},[a("video",{attrs:{src:e.msg.data,controls:"true",autoplay:"true",_hid:15,_fid:r,_batrs:"src"}})]):t._e()],1):t._e(),t._ri(!("audio"!=e.msg.type),16,void 0!==s?s:i)?a("audio-msg",{attrs:{msg:e,_hid:16,_fid:r,_batrs:"msg",_cid:0}}):t._ri(!("txt"!=e.msg.type&&"emoji"!=e.msg.type),1018,void 0!==s?s:i)?a("view",{attrs:{_hid:1018,_fid:r}},t._l(e.msg.data,function(e,r,n){var o=(void 0!==s?s:i)+"-"+(void 0!==n?n:r);return a("view",{key:r,staticClass:"template",attrs:{_hid:1019,_fid:o,_fk:"i"}},[t._ri(!("txt"!=e.type),1020,(void 0!==s?s:i)+"-"+(void 0!==n?n:r))?a("block",{attrs:{_hid:1020,_fid:o}},[a("text",{staticClass:"msg-text",staticStyle:{float:"left"},attrs:{_hid:1021,_fid:o}},[t._v(t._s(e.data),1022,o)])]):t._e(),t._ri(!("emoji"!=e.type),1023,(void 0!==s?s:i)+"-"+(void 0!==n?n:r))?a("block",{attrs:{_hid:1023,_fid:o}},[a("image",{staticClass:"avatar",staticStyle:{width:"25px",height:"25px",margin:"0 0 2px 0",float:"left"},attrs:{src:"/static/images/faces/"+e.data,_hid:1024,_fid:o,_batrs:"src"}})]):t._e(),t._ri(!("audio"!=e.type),1025,(void 0!==s?s:i)+"-"+(void 0!==n?n:r))?a("block",{attrs:{_hid:1025,_fid:o}},[a("audio",{attrs:{src:e.url,controls:"true",autoplay:"true",_hid:1026,_fid:o,_batrs:"src"}})],1):t._e()],1)},"1019-"+(void 0!==s?s:i),t._self)):t._e()],1)]):a("view",{staticClass:"main",class:e.style,staticStyle:{display:"flex","flex-direction":"row-reverse","justify-content":"flex-start","flex-wrap":"wrap"},attrs:{_hid:1027,_fid:r}},[t._ri(!(1!=e.showTime),1028,void 0!==s?s:i)?a("view",{staticClass:"user",staticStyle:{display:"flex",flex:"0 0 100%","text-align":"center","justify-content":"center","margin-botton":"20rpx",bottom:"0"},attrs:{_hid:1028,_fid:r}},[a("text",{staticClass:"user-text",staticStyle:{padding:"6rpx 20rpx",color:"white","background-color":"#bbbbbb","border-radius":"10rpx"},attrs:{_hid:1029,_fid:r}},[t._v(t._s(e.time),1030,r)])]):t._e(),a("image",{staticClass:"avatar",staticStyle:{"margin-left":"20rpx","margin-right":"0"},attrs:{src:t.username.me.head_img,_hid:1031,_fid:r,_batrs:"src"}}),a("view",{staticClass:"msg",staticStyle:{"background-color":"#e3c77f","margin-top":"0"},attrs:{_hid:1032,_fid:r}},[a("image",{class:["err","self"==e.style&&e.isFail?"show":"hide"],attrs:{src:"/static/images/msgerr.png",_hid:1033,_fid:r}}),a("image",{staticClass:"msg_poprightarrow",staticStyle:{position:"flex"},attrs:{src:"/static/images/poprightarrow@2x.png",_hid:1034,_fid:r}}),t._ri(!("img"!=e.msg.type&&"video"!=e.msg.type),1035,void 0!==s?s:i)?a("view",{attrs:{_hid:1035,_fid:r}},[t._ri(!("img"!=e.msg.type),1036,void 0!==s?s:i)?a("block",{attrs:{_hid:1036,_fid:r}},[a("image",{staticClass:"avatar",staticStyle:{width:"90px",height:"120px",margin:"2px auto"},attrs:{src:e.msg.data,mode:"aspectFit","data-url":e.msg.data,_hid:1037,_fid:r,_batrs:"src,data-url"},on:{tap:t.previewImage}})]):t._e(),t._ri(!("video"!=e.msg.type),1038,void 0!==s?s:i)?a("block",{attrs:{_hid:1038,_fid:r}},[a("video",{attrs:{src:e.msg.data,controls:"true",autoplay:"true",_hid:1039,_fid:r,_batrs:"src"}})]):t._e()],1):t._e(),t._ri(!("audio"!=e.msg.type),1040,void 0!==s?s:i)?a("audio-msg",{attrs:{msg:e,_hid:1040,_fid:r,_batrs:"msg",_cid:1}}):t._ri(!("txt"!=e.msg.type&&"emoji"!=e.msg.type),2042,void 0!==s?s:i)?a("view",{attrs:{_hid:2042,_fid:r}},t._l(e.msg.data,function(e,r,n){var o=(void 0!==s?s:i)+"-"+(void 0!==n?n:r);return a("view",{key:r,staticClass:"template",attrs:{_hid:2043,_fid:o,_fk:"i"}},[t._ri(!("txt"!=e.type),2044,(void 0!==s?s:i)+"-"+(void 0!==n?n:r))?a("block",{attrs:{_hid:2044,_fid:o}},[a("text",{staticClass:"msg-text",staticStyle:{float:"left"},attrs:{_hid:2045,_fid:o}},[t._v(t._s(e.data),2046,o)])]):t._e(),t._ri(!("emoji"!=e.type),2047,(void 0!==s?s:i)+"-"+(void 0!==n?n:r))?a("block",{attrs:{_hid:2047,_fid:o}},[a("image",{staticClass:"avatar",staticStyle:{width:"25px",height:"25px",margin:"0 0 2px 0",float:"left"},attrs:{src:"/static/images/faces/"+e.data,_hid:2048,_fid:o,_batrs:"src"}})]):t._e(),t._ri(!("audio"!=e.type),2049,(void 0!==s?s:i)+"-"+(void 0!==n?n:r))?a("block",{attrs:{_hid:2049,_fid:o}},[a("audio",{attrs:{src:e.url,controls:"true",autoplay:"true",_hid:2050,_fid:o,_batrs:"src"}})],1):t._e()],1)},"2043-"+(void 0!==s?s:i),t._self)):t._e()],1)])])},1,t._self))},s=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return s})},"5cf9":function(t,e,a){"use strict";var i=a("59b1"),s=a.n(i);s.a},"5ee6":function(t,e,a){"use strict";a.r(e);var i=a("9c89"),s=a.n(i);for(var r in i)"default"!==r&&function(t){a.d(e,t,function(){return i[t]})}(r);e["default"]=s.a},6299:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=a("5ff1")["default"],s=a("b428"),r=a("4df4"),n={name:"ChatSuitImage",props:{username:{type:Object,value:{}},chatType:{type:String,value:s.chatType.SINGLE_CHAT}},data:function(){return{}},methods:{openCamera:function(){var e=this;t.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["camera"],success:function(t){e.upLoadImage(t)}})},sendImage:function(){var e=this;t.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album"],success:function(t){e.upLoadImage(t)}})},isGroupChat:function(){return this.chatType==s.chatType.CHAT_ROOM},getSendToParam:function(){return this.isGroupChat()?this.username.groupId:this.username.your},upLoadImage:function(e){var a=this,n=e.tempFilePaths,o=i.conn.context.accessToken;t.getImageInfo({src:e.tempFilePaths[0],success:function(e){var c=i.config.appkey.split("#"),u=e.width,d=e.height,l=(e.path.lastIndexOf("."),e.type);t.uploadFile({url:"http://a1.easemob.com/"+c[0]+"/"+c[1]+"/chatfiles",filePath:n[0],name:"file",header:{Authorization:"Bearer "+o},success:function(t){var e=t.data,o=JSON.parse(e),c=i.conn.getUniqueId(),f=new i.message(s.IMAGE,c),m={type:s.IMAGE,size:{width:u,height:d},url:o.uri+"/"+o.entities[0].uuid,filetype:l,filename:n[0]};f.set({apiUrl:i.config.apiURL,body:m,from:a.username.myName,to:a.getSendToParam(),roomType:!1,chatType:a.chatType,success:function(t){r.fire("em.chat.sendSuccess",c)}}),a.chatType==s.chatType.CHAT_ROOM&&f.setGroup("groupchat"),i.conn.send(f.body),a.$emit("newImageMsg",{msg:f,type:s.IMAGE},{bubbles:!0,composed:!0})}})}})}}};e.default=n}).call(this,a("f266")["default"])},"6b42":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("form",{staticClass:"text-input",attrs:{_hid:0}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.inputMessage,expression:"inputMessage"}],staticClass:"f news",attrs:{type:"text","cursor-spacing":"65","confirm-type":"send",placeholder:"输入新消息","placeholder-style":"color:#CFCFCF; padding-left:5px;",_hid:1},domProps:{value:t.inputMessage},on:{confirm:t.sendMessage,input:[function(e){e.target.composing||(t.inputMessage=e.target.value)},t.bindMessage],tap:t.focus,focus:t.focus,blur:t.blur}})])},s=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return s})},"6d6b":function(t,e,a){"use strict";a.r(e);var i=a("ae05"),s=a("205f");for(var r in s)"default"!==r&&function(t){a.d(e,t,function(){return s[t]})}(r);a("8b71");var n=a("2877"),o=Object(n["a"])(s["default"],i["a"],i["b"],!1,null,null,null);e["default"]=o.exports},7273:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{attrs:{_hid:0}},[a("view",{staticClass:"main",staticStyle:{"background-color":"#eeeeee"},attrs:{_hid:1}},[a("chat-suit-audio",{ref:"audio",attrs:{username:t.username,chatType:t.chatType,_hid:2,_batrs:"username,chatType",_cid:0},on:{newAudioMsg:t.saveSendMsg}}),a("chat-msglist",{ref:"msglist",attrs:{username:t.username,_hid:1004,_batrs:"username",_cid:1},on:{msglistTap:t.normalScroll}})],1),a("chat-inputbar",{ref:"inputbar",attrs:{username:t.username,chatType:t.chatType,_hid:2006,_batrs:"username,chatType",_cid:2},on:{newTextMsg:t.saveSendMsg,newImageMsg:t.saveSendMsg,newLocationMsg:t.saveSendMsg,newVideoMsg:t.saveSendMsg,tapSendAudio:t.toggleRecordModal,inputFocused:t.shortScroll,inputBlured:t.normalScroll}})],1)},s=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return s})},7288:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n(a("6d6b")),s=n(a("1f90")),r=n(a("9e2d"));function n(t){return t&&t.__esModule?t:{default:t}}var o=a("ffc6").RecordStatus,c=a("b428"),u={components:{ChatSuitEmoji:i.default,ChatSuitMain:s.default,ChatSuitImage:r.default},name:"ChatInputbar",props:{username:{type:Object,value:{}},chatType:{type:String,value:c.chatType.SINGLE_CHAT}},data:function(){return{recordStatus:o.HIDE,RecordStatus:o,__comps__:{main:null,emoji:null,image:null,location:null},isIPX:getApp().globalData.isIPX}},created:function(){},mounted:function(){var t=this.$refs;t.main=this.$refs.main,t.emoji=this.$refs.emoji,t.image=this.$refs.image,this.$refs=t},methods:{toggleRecordModal:function(){this.$emit("tapSendAudio",null,{bubbles:!0,composed:!0})},openCamera:function(){this.$refs.image.openCamera()},openEmoji:function(){this.$refs.emoji.openEmoji()},cancelEmoji:function(){this.$refs.emoji.cancelEmoji()},sendImage:function(){this.$refs.image.sendImage()},sendLocation:function(){},emojiAction:function(t){this.$refs.main.emojiAction(t.msg)},sendTextMessage:function(t){this.$emit("newTextMsg",t,{bubbles:!0,composed:!0})},sendImageMessage:function(t){this.$emit("newImageMsg",t,{bubbles:!0,composed:!0})}},attached:function(){},moved:function(){},detached:function(){}};e.default=u},7656:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"room_bar",attrs:{_hid:0}},[a("chat-suit-emoji",{ref:"emoji",attrs:{_hid:1,_cid:0},on:{newEmojiStr:t.emojiAction}}),a("chat-suit-main",{ref:"main",attrs:{username:t.username,chatType:t.chatType,_hid:1003,_batrs:"username,chatType",_cid:1},on:{inputFocused:t.cancelEmoji,newTextMsg:t.sendTextMessage}}),a("chat-suit-image",{ref:"image",attrs:{username:t.username,chatType:t.chatType,_hid:2005,_batrs:"username,chatType",_cid:2},on:{newImageMsg:t.sendImageMessage}}),a("view",{class:["other_func",t.isIPX?"other_func_X":""],attrs:{_hid:3007}},[a("view",{staticClass:"open_emoji",attrs:{_hid:3008},on:{tap:t.openEmoji}},[a("image",{attrs:{src:"/static/images/Emoji.png",_hid:3009}})]),a("view",{staticClass:"v-record",attrs:{_hid:3010},on:{tap:t.toggleRecordModal}},[a("image",{staticClass:"icon-record",staticStyle:{width:"16px",height:"24px"},attrs:{src:t.recordStatus!=t.RecordStatus.HIDE?"/static/images/iconAudioActive@2x.png":"/static/images/voice.png",_hid:3011,_batrs:"src"}})]),a("view",{staticClass:"open_camera",attrs:{_hid:3012},on:{tap:t.openCamera}},[a("image",{staticStyle:{width:"24px",height:"18px"},attrs:{src:"/static/images/camora.png",_hid:3013}})]),a("view",{staticClass:"send_image",attrs:{_hid:3014},on:{tap:t.sendImage}},[a("image",{staticStyle:{height:"20px",width:"20px"},attrs:{src:"/static/images/pic.png",_hid:3015}})])])],1)},s=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return s})},7869:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{attrs:{_hid:0}})},s=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return s})},"7a67":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=a("5ff1")["default"],s=a("b428"),r={OPENED:"showEmoji",CLOSED:"emoji_list"},n={name:"ChatSuitEmoji",data:function(){return{show:r.CLOSED,emoji:i.Emoji,emojiObj:i.EmojiObj,interval:5e3,duration:1e3,autoplay:!1,indicatorDots:!0}},methods:{openEmoji:function(){this.show=r.OPENED},cancelEmoji:function(){this.show=r.CLOSED},sendEmoji:function(t){var e=t.target.dataset.emoji;this.$emit("newEmojiStr",{msg:e,type:s.EMOJI},{bubbles:!0,composed:!0})}}};e.default=n},"7db6":function(t,e,a){"use strict";a.r(e);var i=a("6299"),s=a.n(i);for(var r in i)"default"!==r&&function(t){a.d(e,t,function(){return i[t]})}(r);e["default"]=s.a},"8b71":function(t,e,a){"use strict";var i=a("1aeb"),s=a.n(i);s.a},"8cae":function(t,e,a){},"8d57":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t._ri(!(t.recordStatus==t.RecordStatus.HIDE),0)?a("view",{staticClass:"modal modal-record",attrs:{_hid:0},on:{tap:t.toggleRecordModal}},[a("view",{staticClass:"modal-body",attrs:{"catch:tap":"toggleWithoutAction",_hid:1}},[a("view",{staticClass:"sound-waves",attrs:{_hid:2}},[t._l(t.radomheight,function(t,e,i){var s=void 0!==i?i:e;return a("view",{key:e,style:{height:t+"rpx",marginTop:"-"+t/2+"rpx"},attrs:{_hid:3,_fid:s,_fk:"index"}})},3,t._self),a("view",{staticStyle:{clear:"both",width:"0",height:"0"},attrs:{_hid:4}})],1),a("text",{staticClass:"desc",attrs:{_hid:5}},[t._v(t._s(t.RecordDesc[t.recordStatus]),6)]),a("button",{staticClass:"dot",attrs:{"catch:touchstart":"handleRecording","catch:touchmove":"handleRecordingMove","catch:touchend":"handleRecordingCancel","catch:touchcancel":"handleRecordingCancel",_hid:7}},[a("image",{staticClass:"icon-mic",attrs:{src:"/static/images/send.png",_hid:8}})])],1)]):t._e()},s=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return s})},"9c89":function(t,e,a){"use strict";(function(t,i){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=a("5ff1")["default"],r=a("b428"),n=a("ffc6"),o=n.RecordStatus,c=n.RecordDesc,u=a("4df4"),d=!1,l=[50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50],f={name:"ChatSuitAudio",props:{username:{type:Object,value:{}},chatType:{type:String,value:r.chatType.SINGLE_CHAT}},data:function(){return{changedTouches:null,recordStatus:o.HIDE,RecordStatus:o,RecordDesc:c,radomheight:l,recorderManager:t.getRecorderManager(),recordClicked:!1}},methods:{toggleWithoutAction:function(t){},toggleRecordModal:function(){this.recordStatus=this.recordStatus==o.HIDE?o.SHOW:o.HIDE,this.radomheight=l},handleRecordingMove:function(t){var e=t.touches[0],a=this.changedTouches;a&&(this.recordStatus==o.SWIPE&&a.pageY-e.pageY<20&&(this.recordStatus=o.HOLD),this.recordStatus==o.HOLD&&a.pageY-e.pageY>20&&(this.recordStatus=o.SWIPE))},handleRecording:function(e){var a=this;function s(){i.getSetting({success:function(t){var e=t.authSetting["scope.record"];0==e?i.openSetting({success:function(t){var e=t.authSetting["scope.record"];1==e?i.showToast({title:"授权成功",icon:"success"}):i.showToast({title:"请授权录音",icon:"none"}),a.setData({isLongPress:!1})}}):1==e?r():i.authorize({scope:"scope.record",success:function(){i.showToast({title:"授权成功",icon:"success"})}})},fail:function(){i.showToast({title:"鉴权失败，请重试",icon:"none"})}})}function r(){a.data.changedTouches=e.touches[0],a.recordStatus=o.HOLD,d=!0,a.myradom();var i=a.recorderManager||t.getRecorderManager();i.onStart(function(){}),i.start({format:"mp3"}),setTimeout(function(){a.handleRecordingCancel(),d=!1},1e5)}a.recordClicked=!0,setTimeout(function(){1==a.data.recordClicked&&s()},350)},handleRecordingCancel:function(){var e=this;d=!1;var a=this.recorderManager;this.recordStatus==o.SWIPE?this.recordStatus=o.RELEASE:(this.recordStatus=o.HIDE,this.recordClicked=!1),a.onStop(function(a){if(e.recordStatus==o.RELEASE)return console.log("user canceled"),void(e.recordStatus=o.HIDE);a.duration<1e3?t.showToast({title:"录音时间太短",icon:"none"}):e.uploadRecord(a.tempFilePath,a.duration)}),a.stop()},isGroupChat:function(){return this.chatType==r.chatType.CHAT_ROOM},getSendToParam:function(){return this.isGroupChat()?this.username.groupId:this.username.your},uploadRecord:function(e,a){var i=s.config.appkey.split("#"),n=this,o=s.conn.context.accessToken;t.uploadFile({url:"https://a1.easemob.com/"+i[0]+"/"+i[1]+"/chatfiles",filePath:e,name:"file",header:{Authorization:"Bearer "+o},success:function(t){var i=s.conn.getUniqueId(),c=new s.message(r.AUDIO,i),d=JSON.parse(t.data);c.set({apiUrl:s.config.apiURL,accessToken:o,body:{type:r.AUDIO,url:d.uri+"/"+d.entities[0].uuid,filetype:"",filename:e,accessToken:o,length:Math.ceil(a/1e3)},from:n.username.myName,to:n.getSendToParam(),roomType:!1,chatType:n.chatType,success:function(t){u.fire("em.chat.sendSuccess",i)}}),n.isGroupChat()&&c.setGroup("groupchat"),c.body.length=Math.ceil(a/1e3),s.conn.send(c.body),n.$emit("newAudioMsg",{msg:c,type:r.AUDIO},{bubbles:!0,composed:!0})}})},myradom:function(){for(var t=this,e=t.radomheight,a=0;a<t.radomheight.length;a++)e[a]=100*Math.random().toFixed(2)+10;t.radomheight=e,d&&setTimeout(function(){t.myradom()},500)}},created:function(){},attached:function(){},moved:function(){},detached:function(){},ready:function(){}};e.default=f}).call(this,a("f266")["default"],a("f266")["default"])},"9e2d":function(t,e,a){"use strict";a.r(e);var i=a("7869"),s=a("7db6");for(var r in s)"default"!==r&&function(t){a.d(e,t,function(){return s[t]})}(r);var n=a("2877"),o=Object(n["a"])(s["default"],i["a"],i["b"],!1,null,null,null);e["default"]=o.exports},ad92:function(t,e,a){"use strict";var i=a("20e3"),s=a.n(i);s.a},ae05:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("swiper",{class:t.show,attrs:{"indicator-dots":t.indicatorDots,autoplay:t.autoplay,interval:t.interval,duration:t.duration,_hid:0,_batrs:"indicator-dots,autoplay,interval,duration"}},[a("block",{attrs:{_hid:1}},[a("swiper-item",{attrs:{_hid:2}},[a("view",{staticClass:"emoji_item",attrs:{_hid:3}},t._l(t.emojiObj.map1,function(e,i,s){var r=void 0!==s?s:i;return a("image",{key:i,attrs:{src:t.emojiObj.path+e,"data-emoji":i,_hid:4,_fid:r,_batrs:"src,data-emoji",_fk:"index"},on:{tap:t.sendEmoji}})},4,t._self)),a("view",{staticClass:"emoji_item",attrs:{_hid:5}},t._l(t.emojiObj.map2,function(e,i,s){var r=void 0!==s?s:i;return a("image",{key:i,attrs:{src:t.emojiObj.path+e,"data-emoji":i,_hid:6,_fid:r,_batrs:"src,data-emoji",_fk:"index"},on:{tap:t.sendEmoji}})},6,t._self)),a("view",{staticClass:"emoji_item",attrs:{_hid:7}},t._l(t.emojiObj.map3,function(e,i,s){var r=void 0!==s?s:i;return a("image",{key:i,attrs:{src:t.emojiObj.path+e,"data-emoji":i,_hid:8,_fid:r,_batrs:"src,data-emoji",_fk:"index"},on:{tap:t.sendEmoji}})},8,t._self))])],1),a("block",{staticClass:"second",attrs:{_hid:9}},[a("swiper-item",{attrs:{_hid:10}},[a("view",{staticClass:"emoji_item",attrs:{_hid:11}},t._l(t.emojiObj.map4,function(e,i,s){var r=void 0!==s?s:i;return a("image",{key:i,attrs:{src:t.emojiObj.path+e,"data-emoji":i,_hid:12,_fid:r,_batrs:"src,data-emoji",_fk:"index"},on:{tap:t.sendEmoji}})},12,t._self)),a("view",{staticClass:"emoji_item",attrs:{_hid:13}},t._l(t.emojiObj.map5,function(e,i,s){var r=void 0!==s?s:i;return a("image",{key:i,attrs:{src:t.emojiObj.path+e,"data-emoji":i,_hid:14,_fid:r,_batrs:"src,data-emoji",_fk:"index"},on:{tap:t.sendEmoji}})},14,t._self)),a("view",{staticClass:"emoji_item",attrs:{_hid:15}},t._l(t.emojiObj.map6,function(e,i,s){var r=void 0!==s?s:i;return a("image",{key:i,attrs:{src:t.emojiObj.path+e,"data-emoji":i,_hid:16,_fid:r,_batrs:"src,data-emoji",_fk:"index"},on:{tap:t.sendEmoji}})},16,t._self))])],1)],1)},s=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return s})},b47d:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=a("d04d"),s=a("4df4"),r={SHORT:"scroll_view_change",NORMAL:"scroll_view"},n=0,o="",c=!1,u={name:"ChatMsglist",props:{username:{type:Object,value:{}}},data:function(){return{view:r.NORMAL,toView:"",chatMsg:[],__visibility__:!0,isIPX:getApp().globalData.isIPX}},methods:{normalScroll:function(){this.view=r.NORMAL},shortScroll:function(){this.view=r.SHORT},onTap:function(){this.$emit("msglistTap",null,{bubbles:!0})},previewImage:function(e){var a=e.target.dataset.url;t.previewImage({urls:[a]})},getHistoryMsg:function(){var e=this,a=this.username,i=t.getStorageSync("myUsername"),s=a.groupId?a.groupId+i:a.your+i,r=t.getStorageSync("rendered_"+s)||[];if(n<r.length){var o=r.slice(-n-10,-n);this.setData({chatMsg:o.concat(e.data.chatMsg),toView:o[o.length-1].mid}),n+=o.length,10==o.length&&0,t.stopPullDownRefresh()}},renderMsg:function(e,a,i,s,r){i.length>1&&this.chatMsg.map(function(t,e){i.map(function(e,a){t.mid==e.mid&&i.splice(a,1)})});var o=t.getStorageSync("rendered_"+s)||[];if(o=o.concat(i),o.length){"newMsg"==r?(this.chatMsg=this.chatMsg.concat(i),this.toView=o[o.length-1].mid):(this.chatMsg=o.slice(-10),this.toView=o[o.length-1].mid),t.setStorageSync("rendered_"+s,o);var u=t.getStorageSync(s)||[];u.map(function(t,e){i.map(function(a,i){a.mid==t.mid&&u.splice(e,1)})}),t.setStorageSync(s,u),n=o.slice(-10).length,t.pageScrollTo({scrollTop:9999}),c&&this.renderFail(s)}},renderFail:function(e){var a=this,i=a.data.chatMsg;i.map(function(t){t.mid.substring(t.mid.length-10)==o.substring(o.length-10)&&(t.msg.data[0].isFail=!0,t.isFail=!0,a.setData({chatMsg:i}))}),a.curChatMsg[0].mid==o&&(a.curChatMsg[0].msg.data[0].isShow=!1,a.curChatMsg[0].isShow=!1),t.setStorageSync("rendered_"+e,i),c=!1}},created:function(){},attached:function(){this.$data.__visibility__=!0,0,n=0},moved:function(){},detached:function(){this.$data.__visibility__=!0},mounted:function(e){var a=this,r=this.username,n=t.getStorageSync("myUsername"),u=r.groupId?r.groupId+n:r.your+n,d=t.getStorageSync(u)||[];this.renderMsg(null,null,d,u),t.setStorageSync(u,null),s.on("em.xmpp.error.sendMsgErr",function(t){o=t.data.mid,c=!0}),i.on("newChatMsg",function(t,e,i,s){(!a.lastTime||(new Date).getTime()-a.lastTime>3e5)&&(t.showTime=!0,a.lastTime=(new Date).getTime()),a.curChatMsg=i,a.$data.__visibility__&&(r.groupId?t.info.from!=r.groupId&&t.info.to!=r.groupId||s==u&&a.renderMsg(t,e,i,u,"newMsg"):t.info.from!=r.your&&t.info.to!=r.your||a.renderMsg(t,e,i,u,"newMsg"))})}};e.default=u}).call(this,a("f266")["default"])},c63c:function(t,e,a){"use strict";var i=a("28ba"),s=a.n(i);s.a},c7ff:function(t,e,a){},cec3:function(t,e,a){},d628:function(t,e,a){"use strict";var i=a("cec3"),s=a.n(i);s.a},da71:function(t,e,a){"use strict";a.r(e);var i=a("112b"),s=a.n(i);for(var r in i)"default"!==r&&function(t){a.d(e,t,function(){return i[t]})}(r);e["default"]=s.a},db35:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("chat",{attrs:{id:"chat",username:t.username,chatType:"singleChat",_hid:0,_batrs:"username",_cid:0}})},s=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return s})},de99:function(t,e,a){"use strict";var i=a("c7ff"),s=a.n(i);s.a},e3f9:function(t,e,a){"use strict";a.r(e);var i=a("7288"),s=a.n(i);for(var r in i)"default"!==r&&function(t){a.d(e,t,function(){return i[t]})}(r);e["default"]=s.a},e5a4:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n(a("150a")),s=n(a("2f68")),r=n(a("feaf"));function n(t){return t&&t.__esModule?t:{default:t}}var o=a("d04d"),c=a("b428"),u={components:{ChatSuitAudio:i.default,ChatMsglist:s.default,ChatInputbar:r.default},name:"chat",props:{username:{type:Object,value:{}},chatType:{type:String,value:c.chatType.SINGLE_CHAT}},data:function(){return{__comps__:{msglist:null,inputbar:null,audio:null}}},created:function(){},attached:function(){},mounted:function(){this.$data.__comps__.inputbar=this.$refs.inputbar,this.$data.__comps__.msglist=this.$refs.msglist,this.$data.__comps__.audio=this.$refs.audio},moved:function(){},detached:function(){},methods:{toggleRecordModal:function(){this.$data.__comps__.audio.toggleRecordModal()},normalScroll:function(){this.$data.__comps__.msglist.normalScroll(),this.$data.__comps__.inputbar.cancelEmoji()},shortScroll:function(){this.$data.__comps__.msglist.shortScroll()},saveSendMsg:function(t){o.saveMsg(t.msg,t.type),this.$data.__comps__.inputbar.cancelEmoji()},getMore:function(){his.$data.__comps__.msglist.getHistoryMsg()}}};e.default=u},f35f:function(t,e,a){"use strict";a.r(e);var i=a("7273"),s=a("0d1e");for(var r in s)"default"!==r&&function(t){a.d(e,t,function(){return s[t]})}(r);a("d628");var n=a("2877"),o=Object(n["a"])(s["default"],i["a"],i["b"],!1,null,null,null);e["default"]=o.exports},feaf:function(t,e,a){"use strict";a.r(e);var i=a("7656"),s=a("e3f9");for(var r in s)"default"!==r&&function(t){a.d(e,t,function(){return s[t]})}(r);a("5cf9");var n=a("2877"),o=Object(n["a"])(s["default"],i["a"],i["b"],!1,null,null,null);e["default"]=o.exports},ffc6:function(t,e,a){"use strict";t.exports={RecordDesc:{0:"长按开始录音",2:"向上滑动取消",3:"松开手取消"},RecordStatus:{SHOW:0,HIDE:1,HOLD:2,SWIPE:3,RELEASE:4}}}},[["0b80","common/runtime","common/vendor"]]]);