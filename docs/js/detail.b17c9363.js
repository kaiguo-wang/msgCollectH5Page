!function(t){function o(o){for(var s,n,r=o[0],c=o[1],l=o[2],d=0,p=[];d<r.length;d++)n=r[d],Object.prototype.hasOwnProperty.call(e,n)&&e[n]&&p.push(e[n][0]),e[n]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(t[s]=c[s]);for(u&&u(o);p.length;)p.shift()();return a.push.apply(a,l||[]),i()}function i(){for(var t,o=0;o<a.length;o++){for(var i=a[o],s=!0,r=1;r<i.length;r++){var c=i[r];0!==e[c]&&(s=!1)}s&&(a.splice(o--,1),t=n(n.s=i[0]))}return t}var s={},e={detail:0},a=[];function n(o){if(s[o])return s[o].exports;var i=s[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=s,n.d=function(t,o,i){n.o(t,o)||Object.defineProperty(t,o,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,o){if(1&o&&(t=n(t)),8&o)return t;if(4&o&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&o&&"string"!=typeof t)for(var s in t)n.d(i,s,function(o){return t[o]}.bind(null,s));return i},n.n=function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(o,"a",o),o},n.o=function(t,o){return Object.prototype.hasOwnProperty.call(t,o)},n.p="/dist/";var r=window.webpackJsonp=window.webpackJsonp||[],c=r.push.bind(r);r.push=o,r=r.slice();for(var l=0;l<r.length;l++)o(r[l]);var u=c;a.push([1,"chunk-vendors","chunk-common"]),i()}({1:function(t,o,i){t.exports=i("73ec")},"352f":function(t,o,i){"use strict";var s=i("8b73");i.n(s).a},"73ec":function(t,o,i){"use strict";i.r(o),i("e260"),i("e6cf"),i("cca6"),i("a79d");var s=i("2b0e"),e=i("af88"),a=(i("ac1f"),i("466d"),i("53ca")),n=i("09f0"),r=i("a474"),c=i("ecaf"),l=i("c428"),u=i("b060"),d=i("bbfe"),p=i("e499"),f=i("d658"),v={components:{qrcodePop:c.a,loading:l.a,soldOut:u.a,errNotice:d.a,jumpCoupon:p.a,backTop:f.a},data:function(){return{detailInfo:{ActLink:""},detailList:{},isLoading:!1,isShow:!1,isOut:!1,outText:"",isNotice:!1,noticeText:"",isPopup:!1,isJumpCoupon:!1,ua:window.navigator.userAgent.toLowerCase(),errorImg:"this.src='"+i("fb78")+"'"}},watch:{},methods:{gotoBack:function(){window.history.back(-1)},gotoHome:function(){window.location.href="../"},gotoCouponBtn:function(t){"micromessenger"==this.ua.match(/MicroMessenger/i)?this.isPopup=!0:window.location.href=t},closeBtn:function(){this.isPopup=!1},closeCouponBtn:function(){this.isJumpCoupon=!1},handleSuccess:function(t){t.trigger.style.backgroundColor="#9ed29e",t.trigger.innerText="复制成功"},handleError:function(t){var o=this;t.trigger.style.backgroundColor="#bbb",t.trigger.innerText="复制失败",this.isNotice=!0,this.noticeText="请手动复制链接在浏览器打开",setTimeout((function(){o.isNotice=!1}),3e3)},gotoDetail:function(t){window.location.href="../detail?id=".concat(t)},taobaoDetail:function(t){"micromessenger"==this.ua.match(/MicroMessenger/i)?this.isJumpCoupon=!0:window.location.href=t},gotoCoupon:function(t,o){"micromessenger"==this.ua.match(/MicroMessenger/i)?window.location.href="../coupon?id=".concat(t):window.location.href=o},getDetailData:function(){var t=this;t.isLoading=!0,t.isOut=!1,Object(r.b)(n.a.getUrlParam().id).then((function(o){0==o.error&&null!=Object(a.a)(o.data)?(setTimeout((function(){t.isLoading=!1}),2e3),o.data?(t.isShow=!0,t.detailInfo=o.data[0]):(t.isShow=!1,t.isOut=!0,t.outText="~_~抱歉，木有找到相关商品信息！")):(setTimeout((function(){t.isLoading=!1}),2e3),t.isShow=!1,t.isOut=!0,t.outText="请求数据失败")})).catch((function(o){t.isLoading=!1,t.isShow=!1,t.isOut=!0,t.outText="网络请求异常，请稍后再试"}))},getGuessLike:function(){var t=this;Object(r.c)(1,20,5,0,null).then((function(o){0==o.error&&null!=Object(a.a)(o.data)&&(t.detailList=o.data)}))}},created:function(){n.a.rem(),this.getDetailData(),this.getGuessLike()},mounted:function(){}},h=(i("352f"),i("2877")),g=Object(h.a)(v,(function(){var t=this,o=t.$createElement,s=t._self._c||o;return s("div",{attrs:{id:"app"}},[s("div",{staticClass:"wrap"},[s("div",{staticClass:"top-menu"},[s("div",{staticClass:"flex-cont flex-nav"},[s("div",{staticClass:"nav-left"},[s("a",{attrs:{href:"javascript:;"},on:{click:t.gotoBack}},[s("i",{staticClass:"icon-back"})])]),t._m(0),s("div",{staticClass:"nav-right"},[s("a",{attrs:{href:"javascript:;",target:"_blank"},on:{click:t.gotoHome}},[s("i",{staticClass:"icon-home"})])])])]),s("div",{staticClass:"top-hr"}),s("div",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],staticClass:"content"},[s("div",{staticClass:"item-good"},[s("div",{staticClass:"img-show"},[s("img",{attrs:{src:t.detailInfo.ImgUrl?t.detailInfo.ImgUrl:i("fb78"),alt:t.detailInfo.GoodsName,onerror:t.errorImg}})]),s("div",{staticClass:"normal-list"},[s("h2",[t._v(t._s(t.detailInfo.GoodsName))]),s("div",{staticClass:"list-price"},[s("div",{staticClass:"price-new"},[s("em",{staticClass:"qhd"},[t._v("用券后")]),s("i",[t._v("￥")]),s("span",[t._v(t._s(t.detailInfo.LastPrice))]),s("i",{staticClass:"del"},[t._v("￥"+t._s(t.detailInfo.GoodsPrice))])])])]),s("a",{attrs:{href:"javascript:;",target:"_blank"},on:{click:function(o){return t.taobaoDetail(t.detailInfo.GoodsLink)}}},[t._v("图文详情（点击进入淘宝查看）")])]),s("div",{staticClass:"item-recommend fix"},[s("h4",[t._v("猜你喜欢")]),s("div",{staticClass:"goods",attrs:{id:"goods"}},[s("ul",{staticClass:"goods-list fix"},t._l(t.detailList,(function(o){return s("li",[s("a",{staticClass:"goods-a",attrs:{title:o.GoodsName,href:"javascript:;",target:"_blank"},on:{click:function(i){return t.gotoDetail(o.GoodsId)}}},[s("div",{staticClass:"goods-main"},[s("img",{staticClass:"lazy",attrs:{src:o.ImgUrl?o.ImgUrl:i("fb78"),onerror:t.errorImg}}),s("span",{staticClass:"icon new"},[t._v("热销")])]),s("div",{staticClass:"goods-desc"},[s("h3",[s("span",[t._v(t._s(1==o.ly?"天猫":"淘宝"))]),s("em",[t._v("|"+t._s(o.GoodsName))])]),s("div",{staticClass:"list-price"},[s("span",{staticClass:"price-new"},[s("i",[t._v("￥")]),t._v(t._s(o.LastPrice))]),s("em",{staticClass:"del"},[t._v("￥"+t._s(o.GoodsPrice))]),s("span",{staticClass:"only-time"},[t._v(t._s(o.SaleCount)+"人在抢")])])])]),s("a",{staticClass:"coupon-con",attrs:{rel:"nofollow",title:o.GoodsName,href:"javascript:;",target:"_blank"},on:{click:function(i){return t.gotoCoupon(o.GoodsId,o.ActLink)}}},[s("p",[t._v("领券")]),s("div",{staticClass:"quan-money"},[t._v("省"),s("span",[t._v(t._s(o.ActMoney))]),t._v("元")]),s("div",{staticClass:"coupon-tit"},[t._v("去领券")])])])})),0)])]),s("div",{staticClass:"coupon-btn"},[s("a",{staticClass:"coupon-bottom",attrs:{href:"javascript:;"},on:{click:function(o){return t.gotoCouponBtn(t.detailInfo.ActLink)}}},[t._v("去领券")])])]),s("qrcode-pop",{attrs:{isPopup:t.isPopup},on:{showPopper:t.closeBtn}},[s("h3",[t._v("复制购买")]),s("div",{staticClass:"layer-cont"},[s("div",{staticClass:"kouling-cont"},[s("textarea",{attrs:{id:"textarea",readonly:"",disabled:""}},[t._v(t._s(t.detailInfo.ActLink))])]),s("div",{staticClass:"kouling-tips"},[s("p",[s("span",[t._v("使用说明：")]),s("span",[t._v("点击复制后打开"),s("i",[t._v("手机淘宝")]),t._v("，在输入框粘贴后打开哦~")])]),s("p",{staticClass:"nber"},[s("span",[t._v("温馨提示：")]),s("span",[t._v("手机无"),s("i",[t._v("手机淘宝")]),t._v("，可在浏览器输入框中粘贴打开哦~")])])])]),s("div",{staticClass:"better-change"},[s("div",{staticClass:"close-btn",staticStyle:{width:"50%"},on:{click:t.closeBtn}},[t._v("关闭")]),s("button",{directives:[{name:"clipboard",rawName:"v-clipboard",value:t.detailInfo.ActLink,expression:"detailInfo.ActLink"}],staticClass:"onecopy",attrs:{type:"button"},on:{success:t.handleSuccess,error:t.handleError}},[t._v("一键复制")])])]),s("loading",{attrs:{isLoading:t.isLoading}}),s("sold-out",{attrs:{isOut:t.isOut}},[s("span",[t._v(t._s(t.outText))])]),s("err-notice",{attrs:{isNotice:t.isNotice}},[s("span",[t._v(t._s(t.noticeText))])]),s("jump-coupon",{attrs:{isJumpCoupon:t.isJumpCoupon},on:{showPopperCoupon:t.closeCouponBtn}}),s("back-top")],1)])}),[function(){var t=this.$createElement,o=this._self._c||t;return o("div",{staticClass:"nav-middle"},[o("div",{staticClass:"top-title"},[this._v("商品详情")])])}],!1,null,"ca5e3ee4",null).exports;s.a.use(e.a),s.a.config.productionTip=!1,new s.a({data:{bottomType:new s.a},render:function(t){return t(g)}}).$mount("#app")},"8b73":function(t,o,i){}});