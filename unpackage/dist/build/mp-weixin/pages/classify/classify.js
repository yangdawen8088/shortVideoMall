(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/classify/classify"],{"40a1":function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("view",{staticClass:"bg-gradual-black"},[e("scroll-view",{staticClass:"nav categorybar fixed",style:{paddingTop:t.system.statusBarHeight+"px"},attrs:{"scroll-x":"","scroll-with-animation":"","scroll-left":t.scrollLeft}},t._l(t.categorylist,function(a,s){return e("view",{key:s,staticClass:"cu-item",class:s==t.TabCur?"text-gold-light cur":"text-white",attrs:{"data-id":s,eventid:"43cc627a-0-"+s},on:{tap:t.tabSelect}},[t._v(t._s(a.name))])})),e("scroll-view",{staticClass:"page",attrs:{"scroll-y":"","scroll-top":"-50","lower-threshold":"500",eventid:"43cc627a-1"},on:{scrolltolower:t.next}},[e("view",{staticClass:"cu-tabbar-height"}),e("view",{staticClass:"nav-list"},t._l(t.videolist,function(a,s){return e("navigator",{key:s,staticClass:"nav-li ",style:[{animation:"show "+(.2*(s+1)+1)+"s 1"}],attrs:{"hover-class":"none",url:"/pages/video/one?scene="+a.id,navigateTo:""}},[e("image",{staticClass:"coverimage",staticStyle:{height:"338rpx"},attrs:{mode:"aspectFill",src:a.cover_img_url}}),e("view",{staticStyle:{padding:"0 16rpx 16rpx 16rpx"}},[e("view",{staticClass:"reco-user flex justify-start align-end margin-bottom-sm"},[e("image",{staticClass:"avatar cu-avatar round margin-right-xs",attrs:{src:a.head_img}}),e("view",{staticClass:"nickname text-cut text-dark"},[t._v(t._s(a.nick_name)+"  推荐")])]),e("view",{staticClass:"title text-cut text-bold text-black margin-bottom-sm"},[t._v(t._s(a.goodstitle))]),e("view",{staticClass:"desc text-dark margin-bottom-sm"},[t._v(t._s(a.video_desc))]),e("view",{staticClass:"payinfo flex  "},[e("view",{staticClass:"price text-bold flex flex-sub text-gold-light"},[t._v("¥"+t._s(a.goodsprice))]),e("view",{staticClass:"payernum text-bold text-sm flex flex-sub justify-end align-end text-gold-light"},[t._v(t._s(a.payer_num)+"人付款")])])])])})),e("view",{staticClass:"cu-tabbar-height"})])],1)},i=[];e.d(a,"a",function(){return s}),e.d(a,"b",function(){return i})},"6c69":function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e={data:function(){return{system:this.systemInfo(),categorylist:[],videolist:[],pageIndex:0,pageSize:20,TabCur:0,scrollLeft:0}},onLoad:function(){var t=this;this.postJson({path:"/video_category_top.jsp",data:{platform:0},success:function(a){console.log(a.data),"ok"==a.data.status&&(t.categorylist=a.data.data,t.loadData())}})},onPullDownRefresh:function(){this.videolist=[],this.pageIndex=0,this.loadData(function(){t.stopPullDownRefresh()})},methods:{tabSelect:function(a){this.TabCur=a.currentTarget.dataset.id,this.scrollLeft=60*(a.currentTarget.dataset.id-1),this.videolist=[],this.pageIndex=0,t.showLoading({}),this.loadData(function(){t.hideLoading()})},next:function(t){this.loadData()},loadData:function(t){var a=this;this.postJson({path:"/video_category.jsp",data:{pageIndex:this.pageIndex,pageSize:this.pageSize,category:this.categorylist[this.TabCur]},success:function(t){if(console.log(t.data),"ok"==t.data.status){a.pageIndex++;var e=t.data.data;a.videolist=a.videolist.concat(e)}},complete:function(){t&&t()}})}}};a.default=e}).call(this,e("543d")["default"])},"791a":function(t,a,e){"use strict";e("719a");var s=o(e("b0ce")),i=o(e("8e69"));function o(t){return t&&t.__esModule?t:{default:t}}Page((0,s.default)(i.default))},"89be":function(t,a,e){},"8e69":function(t,a,e){"use strict";e.r(a);var s=e("40a1"),i=e("e9a0");for(var o in i)"default"!==o&&function(t){e.d(a,t,function(){return i[t]})}(o);e("bc34");var n=e("2877"),l=Object(n["a"])(i["default"],s["a"],s["b"],!1,null,null,null);a["default"]=l.exports},bc34:function(t,a,e){"use strict";var s=e("89be"),i=e.n(s);i.a},e9a0:function(t,a,e){"use strict";e.r(a);var s=e("6c69"),i=e.n(s);for(var o in s)"default"!==o&&function(t){e.d(a,t,function(){return s[t]})}(o);a["default"]=i.a}},[["791a","common/runtime","common/vendor"]]]);