(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/myorderlist"],{4320:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",{staticClass:"bg-gradual-pink myorderlist",staticStyle:{position:"fixed",width:"100%",height:"100%"},style:{paddingTop:t.system.statusBarHeight+"px"},attrs:{_hid:0}},[s("view",{staticClass:"cu-bar",attrs:{_hid:1}},[s("view",{staticClass:"action",attrs:{_hid:2},on:{tap:t.back}},[s("text",{staticClass:"cuIcon-back",attrs:{_hid:3}})]),s("view",{staticClass:"content text-bold",attrs:{_hid:4}},[t._v(t._s(t.title),5)])]),s("scroll-view",{staticStyle:{width:"100%",height:"100%"},attrs:{"scroll-y":"true",_hid:6}},t._l(t.goodslist,function(e,a,i){var r=void 0!==i?i:a;return s("view",{key:a,staticClass:"cu-list menu-avatar",attrs:{_hid:7,_fid:r,_fk:"index"}},[s("view",{staticClass:"cu-item",attrs:{_hid:8,_fid:r},on:{tap:function(s){t.toPage("/pages/order/order?code="+e.code)}}},[s("view",{staticClass:"cu-avatar radius",style:{backgroundImage:"url("+e.goodsImg+")"},attrs:{_hid:9,_fid:r}},[s("text",{staticClass:"goods-status",attrs:{_hid:10,_fid:r}},[t._v(t._s(e.stateLabel),11,r)])]),s("view",{staticClass:"content",attrs:{_hid:12,_fid:r}},[s("view",{staticClass:"text-grey goods-title",attrs:{_hid:13,_fid:r}},[t._v(t._s(e.goodsTitle),14,r)]),s("view",{staticClass:"text-gray text-sm goods-seller",attrs:{_hid:15,_fid:r}},[s("text",{attrs:{_hid:16,_fid:r}},[s("text",{staticClass:"cuIcon-shop text-red  margin-right-xs",attrs:{_hid:17,_fid:r}}),t._v(t._s(e.goodsSeller),18,r),s("text",{staticClass:"fr",attrs:{_hid:19,_fid:r}},[t._v(t._s(e.goodsArea),20,r)])])]),s("view",{staticClass:"goods-action",attrs:{_hid:21,_fid:r}},[s("text",{staticClass:"text-price text-red text-lg",staticStyle:{"font-size":"40rpx"},attrs:{_hid:22,_fid:r}},[t._v(t._s(e.goodsPrice),23,r)]),s("button",{staticClass:"cu-btn round line-red lines-red fr",staticStyle:{height:"45rpx"},attrs:{"data-index":a,_hid:24,_fid:r,_batrs:"data-index"},on:{tap:t.contact}},[])],1)])]),s("view",{staticClass:"bg-white text-gray goods-memo",attrs:{_hid:26,_fid:r}},[t._v("备注:"+t._s(e.task_require),27,r)])])},7,t._self))],1)},i=[];s.d(e,"a",function(){return a}),s.d(e,"b",function(){return i})},"8d2b":function(t,e,s){"use strict";var a=s("f7d6"),i=s.n(a);i.a},"9e72":function(t,e,s){"use strict";s.r(e);var a=s("4320"),i=s("e310");for(var r in i)"default"!==r&&function(t){s.d(e,t,function(){return i[t]})}(r);s("8d2b");var o=s("2877"),n=Object(o["a"])(i["default"],a["a"],a["b"],!1,null,null,null);e["default"]=n.exports},adcc:function(t,e,s){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s={data:function(){return{system:this.systemInfo(),user:this.getUserInfo(),listType:0,title:"",goodslist:[]}},onLoad:function(t){var e=this;switch(console.log(t),this.listType=parseInt(t.type),this.postJson({path:"/user_order_list.jsp",data:{uid:this.user.uid,listType:this.listType},success:function(t){if("ok"==t.data.status)for(var s in e.goodslist=t.data.data,e.goodslist)e.goodslist[s].stateLabel=e.getStateLabel(e.goodslist[s].status)}}),this.listType){case 0:this.title="待付款";break;case 2:this.title="待确认";break;case 3:this.title="已完成";break;case 4:this.title="退货";break;case 99:this.title="全部订单";break;default:break}},methods:{getStateLabel:function(t){if(console.log("getStateLabel,state="+t+",type="+typeof t),4==this.listType)switch(t){case 0:return"退货申请";case 1:return"已退货";case 2:return"拒绝退货";default:break}else switch(t){case 0:return"待付款";case 1:return"待发货";case 2:return"待确认";case 3:return"已完成";case 4:return"已退货";case 5:return"已取消";default:break}return""},contact:function(e){var s=e.currentTarget.dataset.index,a=this.goodslist[s];t.showLoading({title:"加载中",mask:!0}),this.postJson({path:"/seller_user.jsp",data:{sellerUid:a.uid},success:function(e){if("ok"==e.data.status){var s=e.data.data;t.makePhoneCall({phoneNumber:s.phone})}else t.showToast({icon:"none",title:e.data.msg})},complete:function(){t.hideLoading()}})}}};e.default=s}).call(this,s("f266")["default"])},e310:function(t,e,s){"use strict";s.r(e);var a=s("adcc"),i=s.n(a);for(var r in a)"default"!==r&&function(t){s.d(e,t,function(){return a[t]})}(r);e["default"]=i.a},e52e:function(t,e,s){"use strict";s("719a");var a=r(s("9e72")),i=r(s("3a53"));function r(t){return t&&t.__esModule?t:{default:t}}a.default.mpType="page";var o=new i.default(a.default);o.$mount()},f7d6:function(t,e,s){}},[["e52e","common/runtime","common/vendor"]]]);