(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/video/video"],{3939:function(t,s,i){"use strict";(function(t){Object.defineProperty(s,"__esModule",{value:!0}),s.default=void 0;var i={data:function(){return{system:this.systemInfo(),title:"Hello",videolist:[],clientHeight:"0",currentPage:0,showPage:0,nextPage:0,outDown:-1,inDown:-1,outTop:-1,inTop:-1,touchdata:{can:!0,startY:0,endY:0,diff:0},playIndex:-1,scrollTop:0,scrollStart:-1,scrollToView:"view-0",refresh:!1,showCover:!1,animationData:{},playTime:0}},mounted:function(){var s=this;t.getSystemInfo({success:function(t){console.log(t.model),console.log(t.pixelRatio),console.log(t.windowWidth),console.log(t.windowHeight),console.log(t.language),console.log(t.version),console.log(t.platform),s.$data.clientHeight=t.windowHeight}})},watch:{},onLoad:function(t){var s=this,i=t.type,e=t.index;this.postJson({path:"/user_video_list.jsp",data:{type:i},success:function(t){"ok"==t.data.status&&(s.videolist=t.data.data,s.currentPage=e,s.scrollToView="view-"+e)}})},onReachBottom:function(){this.play(-1)},onPullDownRefresh:function(){this.play(-1),t.stopPullDownRefresh()},methods:{play:function(s){var i="video-"+s,e="video-"+this.playIndex;if(-1==this.playIndex){this.playIndex=s;var a=t.createVideoContext(i);a&&(a.play(),this.playTime=(new Date).getTime())}else{var o=t.createVideoContext(e);if(o){o.pause();var c={playTime:this.playTime,endTime:(new Date).getTime(),videoId:this.videolist[this.playIndex].id,videoUid:this.videolist[this.playIndex].uid};this.browser(c),s!=this.playIndex?(this.playIndex=s,o=t.createVideoContext(i),o&&(o.play(),this.playTime=(new Date).getTime())):this.playIndex=-1}}},pause:function(s){var i="video-"+s,e=t.createVideoContext(i);if(e){e.pause();var a={playTime:this.playTime,endTime:(new Date).getTime(),videoId:this.videolist[s].id,videoUid:this.videolist[s].uid};this.browser(a)}this.playIndex=-1},browser:function(t){t.playTime<=0||(this.playTime=0,this.postJson({path:"/video_browser_do.jsp",data:t,success:function(t){}}))},tap:function(s){t.showToast({title:"ontap"})},scroll:function(t){var s=this;setTimeout(function(){s.pause(s.currentPage),s.playIndex,s.touchdata.diff+=t.detail.deltaY,s.touchdata.diff>0?(console.log("this.touchdata.diff>0"),t.detail.scrollTop%s.clientHeight<s.clientHeight-10?(console.log("e.detail.scrollTop%this.clientHeight < this.clientHeight*3/4"),s.nextPage=Math.floor(t.detail.scrollTop/s.clientHeight)):s.nextPage=Math.floor(t.detail.scrollTop/s.clientHeight+1),s.nextPage<0&&(s.nextPage=0)):(t.detail.scrollTop%s.clientHeight>=10?s.nextPage=Math.floor(t.detail.scrollTop/s.clientHeight+1):s.nextPage=Math.floor(t.detail.scrollTop/s.clientHeight),s.nextPage>=s.videolist.length&&(s.nextPage=s.videolist.length-1))},100)},scrollTo:function(t){this.play(t)},scrollMove:function(t){},touchStart:function(t){var s=t.touches[0];this.touchdata.startY=s.pageY,this.scrollStart=this.scrollTop,console.log("y="+this.touchdata.startY),this.inDown=-1,this.outTop=-1,this.inTop=-1,this.outDown=-1,this.touchdata.diff=0},touchMove:function(t){var s=t.touches[0],i=s.pageY;this.touchdata.diff=i-this.touchdata.startY,console.log("currentPage="+this.currentPage+",nextPage="+this.nextPage+",diff="+this.touchdata.diff+",y="+i+",startY="+this.touchdata.startY)},touchEnd:function(t){var s=this;this.touchdata.diff=0,this.scrollToView="view-"+this.nextPage,setTimeout(function(){s.scrollToView=""},500),this.currentPage!=this.nextPage&&(this.currentPage=this.nextPage),console.log("currentPage="+this.currentPage+",nextPage="+this.nextPage+",diff="+this.touchdata.diff)},touchCacel:function(t){this.touchEnd(t)}}};s.default=i}).call(this,i("543d")["default"])},"6cbd":function(t,s,i){"use strict";var e=i("ea24"),a=i.n(e);a.a},7055:function(t,s,i){"use strict";var e=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("view",{staticClass:"content",style:{height:t.clientHeight+"px"}},[i("view",{staticClass:"cuIcon-roundleftfill-copy",staticStyle:{position:"fixed",color:"rgba(100,100,100,0.7)",left:"30rpx","font-size":"70rpx","z-index":"99"},style:{top:t.system.statusBarHeight+"px"},attrs:{eventid:"0d1406f2-0"},on:{tap:t.back}}),i("scroll-view",{staticClass:"scroll-content",style:{height:t.clientHeight+"px"},attrs:{"scroll-y":!0,"scroll-with-animation":!0,"scroll-into-view":t.scrollToView,eventid:"0d1406f2-5"},on:{scroll:t.scroll,scrolltolower:t.scrolltolower,touchstart:t.touchStart,touchmove:t.touchMove,touchend:t.touchEnd,tap:function(s){t.play(t.currentPage)}}},t._l(t.videolist,function(s,e){return i("view",{key:e,staticClass:"video-view",style:{backgroundImage:"url("+s.cover_img_url+")",height:t.clientHeight+"px"},attrs:{id:"view-"+e}},[e==t.playIndex?i("video",{style:{height:t.clientHeight+"px"},attrs:{id:"video-"+e,src:s.video_url,loop:"true",controls:!1,"show-progress":!1,"show-fullscreen-btn":!1,"show-play-btn":!1,"show-center-play-btn":!1,"enable-progress-gesture":!1}},[t.showCover?i("cover-image",{staticClass:"play_icon",style:{display:e!=t.playIndex?"block":"none"},attrs:{animation:t.animationData,src:"/static/img/play.png",mpcomid:"0d1406f2-0-"+e}}):t._e(),t.showCover?i("cover-view",{staticClass:"container-action",attrs:{animation:t.animationData,mpcomid:"0d1406f2-9-"+e}},[i("cover-image",{staticClass:"action head-img",attrs:{src:s.head_img,mpcomid:"0d1406f2-1-"+e}}),i("cover-image",{staticClass:"action like",attrs:{src:"/static/img/favor.png",mpcomid:"0d1406f2-2-"+e}}),i("cover-view",{staticClass:"action-number",attrs:{mpcomid:"0d1406f2-3-"+e}},[t._v(t._s(s.favorite_num))]),i("cover-image",{staticClass:"action comment",attrs:{src:"/static/img/comments.png",mpcomid:"0d1406f2-4-"+e}}),i("cover-view",{staticClass:"action-number",attrs:{mpcomid:"0d1406f2-5-"+e}},[t._v(t._s(s.comment_num))]),i("cover-image",{staticClass:"action share",attrs:{src:"/static/img/share.png",mpcomid:"0d1406f2-6-"+e}}),i("cover-view",{staticClass:"action-number",attrs:{mpcomid:"0d1406f2-7-"+e}},[t._v(t._s(s.share_num))]),i("cover-image",{staticClass:"action buy",attrs:{src:"/static/img/buy.png",eventid:"0d1406f2-1-"+e,mpcomid:"0d1406f2-8-"+e},on:{tap:function(i){t.toPage("/pages/goods/goods?goodsId="+s.goodsid)}}})],1):t._e(),t.showCover?i("cover-view",{staticClass:"container-words",attrs:{animation:t.animationData,mpcomid:"0d1406f2-23-"+e}},[i("cover-view",{staticClass:"location",attrs:{mpcomid:"0d1406f2-12-"+e}},[i("cover-image",{staticClass:"location-icon",attrs:{src:"/static/img/small_location_white.png",mpcomid:"0d1406f2-10-"+e}}),i("cover-view",{staticClass:"address",attrs:{mpcomid:"0d1406f2-11-"+e}},[t._v(t._s(s.location_name))])],1),i("cover-view",{staticClass:"words nickname",attrs:{mpcomid:"0d1406f2-13-"+e}},[t._v("@"+t._s(s.nick_name))]),i("cover-view",{staticClass:"words desc",attrs:{mpcomid:"0d1406f2-14-"+e}},[t._v(t._s(s.video_desc))]),null!=s.goodstitle?i("cover-view",{staticClass:"goods",attrs:{eventid:"0d1406f2-2-"+e,mpcomid:"0d1406f2-22-"+e},on:{tap:function(i){t.toPage("/pages/goods/goods?goodsId="+s.goodsid)}}},[i("cover-view",{staticClass:"pricetag",attrs:{mpcomid:"0d1406f2-17-"+e}},[i("cover-view",{staticClass:"price",attrs:{mpcomid:"0d1406f2-15-"+e}},[t._v("¥"+t._s(s.goodsprice))]),1===s.promote?i("cover-image",{staticClass:"tag",attrs:{src:"/static/img/promote.png",mpcomid:"0d1406f2-16-"+e}}):t._e()],1),i("cover-view",{staticClass:"title",attrs:{mpcomid:"0d1406f2-18-"+e}},[t._v(t._s(s.goodstitle))]),i("cover-view",{staticClass:"shop",attrs:{mpcomid:"0d1406f2-21-"+e}},[i("cover-image",{staticClass:"dian",attrs:{src:"/static/img/dian_small.png",mpcomid:"0d1406f2-19-"+e}}),i("cover-view",{staticClass:"seller",attrs:{mpcomid:"0d1406f2-20-"+e}},[t._v(t._s(s.goodsnick)+" | "+t._s(s.goodsarea))])],1)],1):t._e()],1):t._e()],1):t._e(),e!=t.playIndex?i("view",{staticClass:"touchlayer"},[i("view",{staticClass:"mask",style:{backgroundColor:e===t.playIndex?"rgba(100,100,100,0)":"rgba(100,100,100,0.5)"}},[i("image",{staticClass:"play_icon",style:{display:e!=t.playIndex?"block":"none"},attrs:{src:"/static/img/play.png"}})]),i("view",{staticClass:"container-action"},[i("image",{staticClass:"action head-img",attrs:{src:s.head_img}}),i("image",{staticClass:"action like",attrs:{src:"/static/img/favor.png"}}),i("view",{staticClass:"action-number"},[t._v(t._s(s.favorite_num))]),i("image",{staticClass:"action comment",attrs:{src:"/static/img/comments.png"}}),i("view",{staticClass:"action-number"},[t._v(t._s(s.comment_num))]),i("image",{staticClass:"action share",attrs:{src:"/static/img/share.png"}}),i("view",{staticClass:"action-number"},[t._v(t._s(s.share_num))]),i("image",{staticClass:"action buy",attrs:{src:"/static/img/buy.png",eventid:"0d1406f2-3-"+e},on:{tap:function(i){t.toPage("/pages/goods/goods?goodsId="+s.goodsid)}}})]),i("view",{staticClass:"container-words"},[i("view",{staticClass:"location"},[i("image",{staticClass:"location-icon",attrs:{src:"/static/img/small_location_white.png"}}),i("view",{staticClass:"address"},[t._v(t._s(s.location_name))])]),i("view",{staticClass:"words nickname"},[t._v("@"+t._s(s.nick_name))]),i("view",{staticClass:"words desc"},[t._v(t._s(s.video_desc))]),null!=s.goodstitle?i("view",{staticClass:"goods",attrs:{eventid:"0d1406f2-4-"+e},on:{tap:function(i){t.toPage("/pages/goods/goods?goodsId="+s.goodsid)}}},[i("view",{staticClass:"pricetag"},[i("view",{staticClass:"price"},[t._v("¥"+t._s(s.goodsprice))]),1===s.promote?i("image",{staticClass:"tag",attrs:{src:"/static/img/promote.png"}}):t._e()]),i("view",{staticClass:"title"},[t._v(t._s(s.goodstitle))]),i("view",{staticClass:"shop"},[i("image",{staticClass:"dian",attrs:{src:"/static/img/dian_small.png"}}),i("view",{staticClass:"seller"},[t._v(t._s(s.goodsnick)+" | "+t._s(s.goodsarea))])])]):t._e()])]):t._e()])}))],1)},a=[];i.d(s,"a",function(){return e}),i.d(s,"b",function(){return a})},ac6a:function(t,s,i){"use strict";i.r(s);var e=i("7055"),a=i("b28c");for(var o in a)"default"!==o&&function(t){i.d(s,t,function(){return a[t]})}(o);i("6cbd");var c=i("2877"),n=Object(c["a"])(a["default"],e["a"],e["b"],!1,null,null,null);s["default"]=n.exports},b28c:function(t,s,i){"use strict";i.r(s);var e=i("3939"),a=i.n(e);for(var o in e)"default"!==o&&function(t){i.d(s,t,function(){return e[t]})}(o);s["default"]=a.a},b787:function(t,s,i){"use strict";i("719a");var e=o(i("b0ce")),a=o(i("ac6a"));function o(t){return t&&t.__esModule?t:{default:t}}Page((0,e.default)(a.default))},ea24:function(t,s,i){}},[["b787","common/runtime","common/vendor"]]]);