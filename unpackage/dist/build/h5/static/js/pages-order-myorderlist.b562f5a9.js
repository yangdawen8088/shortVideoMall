(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-order-myorderlist"],{1559:function(t,e,s){e=t.exports=s("2350")(!1),e.push([t.i,".myorderlist .cu-list.menu-avatar[data-v-75ee925d]{margin-top:%?5?%}.myorderlist .cu-list.menu-avatar .cu-item[data-v-75ee925d]{height:%?220?%}.myorderlist .cu-list.menu-avatar .cu-item .cu-avatar[data-v-75ee925d]{width:%?200?%;height:%?200?%;left:%?10?%;background-size:cover;background-position:50%;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.myorderlist .cu-list.menu-avatar .cu-item .cu-avatar .goods-status[data-v-75ee925d]{background-color:hsla(0,0%,39.2%,.5);width:100%;height:100%;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;display:grid}.myorderlist .cu-list.menu-avatar .cu-item .content[data-v-75ee925d]{left:%?220?%;width:%?520?%;height:%?200?%}.myorderlist .cu-list.menu-avatar .cu-item .content .goods-title[data-v-75ee925d]{height:%?100?%;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;overflow:hidden}.myorderlist .cu-list.menu-avatar .cu-item .content .goods-seller[data-v-75ee925d]{height:%?50?%;-webkit-box-align:end;-webkit-align-items:flex-end;-ms-flex-align:end;align-items:flex-end}.myorderlist .cu-list.menu-avatar .cu-item .content .goods-action[data-v-75ee925d]{height:%?50?%;-webkit-box-align:end;-webkit-align-items:flex-end;-ms-flex-align:end;align-items:flex-end}.myorderlist .cu-list.menu-avatar .goods-memo[data-v-75ee925d]{padding:%?10?%}",""])},"4ceb":function(t,e,s){"use strict";var i=s("c115"),a=s.n(i);a.a},"9e72":function(t,e,s){"use strict";s.r(e);var i=s("d55b"),a=s("e310");for(var n in a)"default"!==n&&function(t){s.d(e,t,function(){return a[t]})}(n);s("4ceb");var r=s("2877"),o=Object(r["a"])(a["default"],i["a"],i["b"],!1,null,"75ee925d",null);e["default"]=o.exports},c115:function(t,e,s){var i=s("1559");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=s("4f06").default;a("c32c53a0",i,!0,{sourceMap:!1,shadowMode:!1})},c731:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{system:this.systemInfo(),user:this.getUserInfo(),listType:0,title:"",goodslist:[]}},onLoad:function(t){var e=this;switch(console.log(t),this.listType=parseInt(t.type),this.postJson({path:"/user_order_list.jsp",data:{uid:this.user.uid,listType:this.listType},success:function(t){if("ok"==t.data.status)for(var s in e.goodslist=t.data.data,e.goodslist)e.goodslist[s].stateLabel=e.getStateLabel(e.goodslist[s].status)}}),this.listType){case 0:this.title="待付款";break;case 2:this.title="待确认";break;case 3:this.title="已完成";break;case 4:this.title="退货";break;case 99:this.title="全部订单";break;default:break}},methods:{getStateLabel:function(t){if(console.log("getStateLabel,state="+t+",type="+typeof t),4==this.listType)switch(t){case 0:return"退货申请";case 1:return"已退货";case 2:return"拒绝退货";default:break}else switch(t){case 0:return"待付款";case 1:return"待发货";case 2:return"待确认";case 3:return"已完成";case 4:return"已退货";case 5:return"已取消";default:break}return""},contact:function(t){var e=t.currentTarget.dataset.index,s=this.goodslist[e];uni.showLoading({title:"加载中",mask:!0}),this.postJson({path:"/seller_user.jsp",data:{sellerUid:s.uid},success:function(t){if("ok"==t.data.status){var e=t.data.data;uni.makePhoneCall({phoneNumber:e.phone})}else uni.showToast({icon:"none",title:t.data.msg})},complete:function(){uni.hideLoading()}})}}};e.default=i},d55b:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-uni-view",{staticClass:"bg-gradual-pink myorderlist",staticStyle:{position:"fixed",width:"100%",height:"100%"},style:{paddingTop:t.system.statusBarHeight+"px"}},[s("v-uni-view",{staticClass:"cu-bar"},[s("v-uni-view",{staticClass:"action",on:{click:function(e){e=t.$handleEvent(e),t.back(e)}}},[s("v-uni-text",{staticClass:"cuIcon-back"})],1),s("v-uni-view",{staticClass:"content text-bold"},[t._v(t._s(t.title))])],1),s("v-uni-scroll-view",{staticStyle:{width:"100%",height:"100%"},attrs:{"scroll-y":"true"}},t._l(t.goodslist,function(e,i){return s("v-uni-view",{key:i,staticClass:"cu-list menu-avatar"},[s("v-uni-view",{staticClass:"cu-item",on:{click:function(s){s=t.$handleEvent(s),t.toPage("/pages/order/order?code="+e.code)}}},[s("v-uni-view",{staticClass:"cu-avatar radius",style:{backgroundImage:"url("+e.goodsImg+")"}},[s("v-uni-text",{staticClass:"goods-status"},[t._v(t._s(e.stateLabel))])],1),s("v-uni-view",{staticClass:"content"},[s("v-uni-view",{staticClass:"text-grey goods-title"},[t._v(t._s(e.goodsTitle))]),s("v-uni-view",{staticClass:"text-gray text-sm goods-seller"},[s("v-uni-text",{},[s("v-uni-text",{staticClass:"cuIcon-shop text-red  margin-right-xs"}),t._v(t._s(e.goodsSeller)),s("v-uni-text",{staticClass:"fr"},[t._v(t._s(e.goodsArea))])],1)],1),s("v-uni-view",{staticClass:"goods-action"},[s("v-uni-text",{staticClass:"text-price text-red text-lg",staticStyle:{"font-size":"40upx"}},[t._v(t._s(e.goodsPrice))]),s("v-uni-button",{staticClass:"cu-btn round line-red lines-red fr",staticStyle:{height:"45upx"},attrs:{"data-index":i},on:{click:function(e){e=t.$handleEvent(e),t.contact(e)}}},[t._v("联系卖家")])],1)],1)],1),s("v-uni-view",{staticClass:"bg-white text-gray goods-memo"},[t._v("备注:"+t._s(e.task_require))])],1)}),1)],1)},a=[];s.d(e,"a",function(){return i}),s.d(e,"b",function(){return a})},e310:function(t,e,s){"use strict";s.r(e);var i=s("c731"),a=s.n(i);for(var n in i)"default"!==n&&function(t){s.d(e,t,function(){return i[t]})}(n);e["default"]=a.a}}]);