(function(e){function t(t){for(var r,c,i=t[0],u=t[1],s=t[2],l=0,p=[];l<i.length;l++)c=i[l],Object.prototype.hasOwnProperty.call(o,c)&&o[c]&&p.push(o[c][0]),o[c]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);f&&f(t);while(p.length)p.shift()();return a.push.apply(a,s||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,c=1;c<n.length;c++){var u=n[c];0!==o[u]&&(r=!1)}r&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={app:0},a=[];function c(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-cb452182":"c337c6f9","chunk-cb462a1c":"d019afec"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n=o[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,r){n=o[e]=[t,r]}));t.push(n[2]=r);var a,u=document.createElement("script");u.charset="utf-8",u.timeout=120,i.nc&&u.setAttribute("nonce",i.nc),u.src=c(e);var s=new Error;a=function(t){u.onerror=u.onload=null,clearTimeout(l);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;s.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",s.name="ChunkLoadError",s.type=r,s.request=a,n[1](s)}o[e]=void 0}};var l=setTimeout((function(){a({type:"timeout",target:u})}),12e4);u.onerror=u.onload=a,document.head.appendChild(u)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/",i.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],s=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var f=s;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=(n("e9c4"),n("ac1f"),n("5319"),n("d3b7"),n("bc3a")),a=n.n(o),c=n("2f62"),i=n("1da1"),u=(n("96cf"),n("1232")),s=function(){return{currentUser:JSON.parse(localStorage.currentUser||"{}")}},l={jwtPayload:function(e){return e.currentUser&&e.currentUser.token?Object(u["a"])(e.currentUser.token):{}},isJwtExpired:function(e,t){return Date.now()>=1e3*(t.jwtPayload.exp||0)}},f={validateSession:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){var n,r,o,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=t.dispatch,r=t.state,o=t.getters,a=t.commit,r.currentUser&&r.currentUser.token){e.next=3;break}return e.abrupt("return");case 3:if(!o.isJwtExpired){e.next=7;break}n("logout"),e.next=16;break;case 7:return e.prev=7,e.next=10,n("login",{});case 10:e.next=16;break;case 12:e.prev=12,e.t0=e["catch"](7),console.log("Session expired",e.t0),a("setCurrentUser",{user:{}});case 16:case"end":return e.stop()}}),e,null,[[7,12]])})));function t(t){return e.apply(this,arguments)}return t}(),login:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t,n){var r,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=t.commit,e.prev=1,e.next=4,_.post("/login",{user:n});case 4:o=e.sent,r("setCurrentUser",{user:o.data}),e.next=10;break;case 8:e.prev=8,e.t0=e["catch"](1);case 10:case"end":return e.stop()}}),e,null,[[1,8]])})));function t(t,n){return e.apply(this,arguments)}return t}(),logout:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.commit,e.prev=1,e.prev=2,e.next=5,_.delete("/logout");case 5:e.next=9;break;case 7:e.prev=7,e.t0=e["catch"](2);case 9:n("setCurrentUser",{user:{}}),e.next=14;break;case 12:e.prev=12,e.t1=e["catch"](1);case 14:case"end":return e.stop()}}),e,null,[[1,12],[2,7]])})));function t(t){return e.apply(this,arguments)}return t}()},p={setCurrentUser:function(e,t){var n=t.user;e.currentUser=n||{},localStorage.currentUser=JSON.stringify(e.currentUser)}},d={namespaced:!0,state:s,getters:l,actions:f,mutations:p},h=n("53ca"),v=(n("4de4"),n("99af"),n("a15b"),n("25f0"),function(e){if(null===e||"object"!==Object(h["a"])(e))return e});function g(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.collapsed,n=void 0===t||t,r=e.filter,o=void 0===r?function(e,t,n){return!0}:r,a=e.transformer,c=void 0===a?function(e){return e}:a,i=e.mutationTransformer,u=void 0===i?function(e){return e}:i,s=e.actionFilter,l=void 0===s?function(e,t){return!0}:s,f=e.actionTransformer,p=void 0===f?function(e){return e}:f,d=e.logMutations,h=void 0===d||d,g=e.logActions,y=void 0===g||g,x=e.logger,k=void 0===x?console:x;return function(e){var t=v(e.state);"undefined"!==typeof k&&(h&&e.subscribe((function(e,r){var a=v(r);if(o(e,t,a)){var i=w(),s=u(e),l="mutation ".concat(e.type).concat(i);b(k,l,n),k.log("%c prev state","color: #9E9E9E; font-weight: bold",c(t)),k.log("%c mutation","color: #03A9F4; font-weight: bold",s),k.log("%c next state","color: #4CAF50; font-weight: bold",c(a)),m(k)}t=a})),y&&e.subscribeAction((function(e,t){if(l(e,t)){var r=w(),o=p(e),a="action ".concat(e.type).concat(r);b(k,a,n),k.log("%c action","color: #03A9F4; font-weight: bold",o),m(k)}})))}}function b(e,t,n){var r=n?e.groupCollapsed:e.group;try{r.call(e,t)}catch(o){e.log(t)}}function m(e){try{e.groupEnd()}catch(t){e.log("—— log end ——")}}function w(){var e=new Date;return" @ ".concat(x(e.getHours(),2),":").concat(x(e.getMinutes(),2),":").concat(x(e.getSeconds(),2),".").concat(x(e.getMilliseconds(),3))}function y(e,t){return new Array(t+1).join(e)}function x(e,t){return y("0",t-e.toString().length)+e}var k=!1;r["a"].use(c["a"]);var j=new c["a"].Store({modules:{authentication:d},state:{},mutations:{},actions:{},strict:k,plugins:k?[g()]:[]}),O=(n("3ca3"),n("ddb0"),n("8c4f"));r["a"].use(O["a"]);var E=new O["a"]({mode:"history",routes:[{path:"/",name:"Login",meta:{hideMenu:!0,skipAuthentication:!0},component:function(){return n.e("chunk-cb452182").then(n.bind(null,"f58d"))}},{path:"/dashboard",name:"Dashboard",meta:{},component:function(){return n.e("chunk-cb462a1c").then(n.bind(null,"e124"))}}]});E.beforeResolve((function(e,t,n){e.meta&&e.meta.skipAuthentication?n():j.getters["authentication/isJwtExpired"]?n({name:"Login"}):n()}));var P=E,U=Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_BASE_URL||Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_BACK_SERVER||"http://localhost:3000",S=function(e,t){var n=j.state.authentication.currentUser;return n&&n.token&&(t.Authorization="Bearer ".concat(n.token)),e instanceof FormData?e:JSON.stringify(e)},A={baseURL:"".concat(U,"/api/v1"),withCredentials:!1,headers:{"Content-Type":"application/json"},transformRequest:S},_=a.a.create(A);_.interceptors.response.use((function(e){return e}),(function(e){switch(console.warn("Api request error\n",e),e.response.status){case 401:j.dispatch("authentication/logout"),P.replace({path:"/",query:{redirect:P.currentRoute.fullPath}});break;case 403:j.dispatch("authentication/logout"),P.replace({path:"/",query:{redirect:P.currentRoute.fullPath}});break}return Promise.reject(e)})),Plugin.install=function(e,t){e.axios=_,window.axios=_,Object.defineProperties(e.prototype,{axios:{get:function(){return _}},$axios:{get:function(){return _}}})},r["a"].use(Plugin);Plugin;var R=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",{staticClass:"ma-0 pa-0"},[n("v-main",[n("v-container",{attrs:{fluid:""}},[n("router-view")],1)],1)],1)},C=[],M={name:"Frontend",components:{},data:function(){return{}},computed:{hideMenu:function(){return this.$route.meta.hideMenu||!1}}},J=M,L=n("2877"),T=n("6544"),V=n.n(T),N=n("7496"),D=n("a523"),F=n("f6c4"),q=Object(L["a"])(J,R,C,!1,null,null,null),B=q.exports;V()(q,{VApp:N["a"],VContainer:D["a"],VMain:F["a"]});var $=n("f309"),z=n("fcf4"),H=n("df7f"),K=n("4b41");r["a"].use($["a"]);var G=new $["a"]({lang:{locales:{pt:H["a"],en:K["a"]},current:"pt"},theme:{themes:{light:{secondary:"#b0bec5",accent:"#8c9eff",error:"#b71c1c"},dark:{primary:z["a"].blue.lighten3}}}}),I=n("b6d0");r["a"].config.productionTip=!1,r["a"].use(I["a"]),j.dispatch("authentication/validateSession"),new r["a"]({router:P,store:j,vuetify:G,render:function(e){return e(B)}}).$mount("#app")}});
//# sourceMappingURL=app.9ddc4e31.js.map