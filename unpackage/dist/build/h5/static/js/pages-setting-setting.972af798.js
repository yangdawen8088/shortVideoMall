(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-setting-setting"],{"3bf5":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".setting .cu-form-group[data-v-0f532c18]{background-color:rgba(0,0,0,0)}.setting .cu-list.menu>.cu-item[data-v-0f532c18]{background-color:rgba(0,0,0,0)}.setting .cu-item uni-input[data-v-0f532c18]{color:#fff}.cu-list.menu>.cu-item.arrow[data-v-0f532c18]:before{color:#fff}",""])},"3d87":function(t,e,i){"use strict";i.r(e);var s=i("a9b0"),a=i.n(s);for(var n in s)"default"!==n&&function(t){i.d(e,t,function(){return s[t]})}(n);e["default"]=a.a},"6c4a":function(t,e,i){var s=i("3bf5");"string"===typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);var a=i("4f06").default;a("aab6f010",s,!0,{sourceMap:!1,shadowMode:!1})},8802:function(t,e,i){"use strict";i.r(e);var s=i("ac37"),a=i("3d87");for(var n in a)"default"!==n&&function(t){i.d(e,t,function(){return a[t]})}(n);i("dd45");var c=i("2877"),u=Object(c["a"])(a["default"],s["a"],s["b"],!1,null,"0f532c18",null);e["default"]=u.exports},a9b0:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=i("5ff1")["default"],a={data:function(){return{system:{},user:this.getUserInfo(),birthdayLabel:new Date(this.getUserInfo().birthday).toLocaleDateString().replace(/\//g,"-")}},onLoad:function(){console.log(this.systemInfo()),this.system=this.systemInfo()},methods:{setBirthday:function(t){console.log(t);var e=t.target.value;this.birthdayLabel=e,e=e.replace(/-/g,"/"),this.user.birthday=new Date(e).getTime(),this.updateUser()},setGender:function(t){console.log(t);var e=t.target.value;this.user.gender="女"==e?0:1,this.updateUser()},updateUser:function(){var t=this,e={nickname:this.user.nick_name,birthdaytime:this.user.birthday,gender:this.user.gender};this.postJson({path:"/setting_do.jsp",data:e,success:function(e){"ok"==e.data.status&&t.setUserInfo(t.user)}})},exit:function(){this.setUserInfo(null),s.conn.close(),uni.reLaunch({url:"/pages/my/my"})}}};e.default=a},ac37:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"bg-gradual-pink setting",staticStyle:{position:"fixed",width:"100%",height:"100%"},style:{paddingTop:t.system.statusBarHeight+"px"}},[i("v-uni-view",{staticClass:"cu-bar"},[i("v-uni-view",{staticClass:"action",on:{click:function(e){e=t.$handleEvent(e),t.back(e)}}},[i("v-uni-text",{staticClass:"cuIcon-back"})],1),i("v-uni-view",{staticClass:"content text-bold"},[t._v("设置")])],1),i("v-uni-view",{staticClass:"cu-list menu sm-border solid-bottom text-white",staticStyle:{"border-color":"white","margin-top":"0"}},[i("v-uni-view",{staticClass:"cu-item"},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-white"},[t._v("昵称")])],1),i("v-uni-view",{staticClass:"action"},[i("v-uni-input",{attrs:{placeholder:"输入昵称",name:"nick_name"},on:{blur:function(e){e=t.$handleEvent(e),t.updateUser(e)}},model:{value:t.user.nick_name,callback:function(e){t.$set(t.user,"nick_name",e)},expression:"user.nick_name"}})],1)],1),i("v-uni-view",{staticClass:"cu-item arrow"},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-white"},[t._v("手机号")])],1),i("v-uni-view",{staticClass:"action"},[i("v-uni-text",{staticClass:"text-white text-sm"},[t._v(t._s(t.user.phone))])],1)],1),i("v-uni-view",{staticClass:"cu-item arrow"},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-white"},[t._v("性别")])],1),i("v-uni-view",{staticClass:"action"},[i("v-uni-picker",{attrs:{value:t.user.gender,range:["女","男"]},on:{change:function(e){e=t.$handleEvent(e),t.setGender(e)}}},[i("v-uni-view",{staticClass:"picker"},[t._v(t._s(0==t.user.gender?"女":"男"))])],1)],1)],1),i("v-uni-view",{staticClass:"cu-item arrow"},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-white"},[t._v("生日")])],1),i("v-uni-view",{staticClass:"action"},[i("v-uni-picker",{attrs:{mode:"date",value:t.birthdayLabel,start:"1950-01-01",end:"2020-09-01"},on:{change:function(e){e=t.$handleEvent(e),t.setBirthday(e)}}},[i("v-uni-view",{staticClass:"picker"},[t._v(t._s(t.birthdayLabel))])],1)],1)],1),i("v-uni-view",{staticClass:"cu-item arrow"},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-white"},[t._v("意见反馈")])],1)],1),i("v-uni-view",{staticClass:"cu-item arrow"},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-white"},[t._v("关于好物短视频")])],1)],1),i("v-uni-view",{staticClass:"cu-item arrow"},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-white"},[t._v("用户协议")])],1)],1),i("v-uni-view",{staticClass:"cu-item arrow"},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-white"},[t._v("下载APP")])],1)],1)],1),i("v-uni-view",{staticClass:"padding flex flex-direction"},[i("v-uni-button",{staticClass:"cu-btn bg-red margin-tb-sm lg",on:{click:function(e){e=t.$handleEvent(e),t.exit(e)}}},[t._v("退出")])],1)],1)},a=[];i.d(e,"a",function(){return s}),i.d(e,"b",function(){return a})},dd45:function(t,e,i){"use strict";var s=i("6c4a"),a=i.n(s);a.a}}]);