(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{30:function(e,t,a){},55:function(e,t,a){},56:function(e,t,a){},63:function(e,t,a){},64:function(e,t,a){},65:function(e,t,a){},66:function(e,t,a){},67:function(e,t,a){},68:function(e,t,a){},69:function(e,t,a){},70:function(e,t,a){},75:function(e,t,a){"use strict";a.r(t);var n,r,o,c=a(0),i=a.n(c),s=a(31),l=a.n(s),u=a(6),d=a(3),h=a(4),p=a(5),b=a.n(p),j=a(11),m=a(14),f=a.n(m);!function(e){e.channel="channel",e.category="category",e.subreddit="subreddit"}(n||(n={})),function(e){e.day="day",e.week="week",e.month="month",e.year="year",e.all="all",e.shuffle="shuffle"}(r||(r={})),function(e){e.new="new",e.top="top",e.hot="hot"}(o||(o={}));var y=function(){return JSON.parse(localStorage.getItem("favourites")||"[]").sort((function(e,t){return e.rank<t.rank?1:-1})).slice(0,15)},v=function(){var e=Object(j.a)(b.a.mark((function e(t){var a,r,o,c,i,s,l,u;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""===t.value||t.mode===n.subreddit){e.next=17;break}if(a=JSON.parse(localStorage.getItem("favourites")||"[]"),!((r=a.findIndex((function(e){return e.search.value===t.value&&e.search.mode===t.mode})))>=0)){e.next=8;break}(o=a)[r].rank=o[r].rank+1,e.next=16;break;case 8:return i="".concat("https://clips-autoplay.herokuapp.com","/api/twitch/suggestions/").concat(t.mode,"/").concat(t.value),e.next=11,f.a.get(i);case 11:s=e.sent,l=s.data,u="",(null===(c=l[0])||void 0===c?void 0:c.avatar)&&(u=l[0].avatar),o=a.concat({search:t,rank:0,avatar:u});case 16:localStorage.setItem("favourites",JSON.stringify(o));case 17:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),O=(a(55),a(9)),g=(a(56),a(1)),x=function(e){var t=e.src,a=e.name,n=null===t||void 0===t?void 0:t.replace("{width}","50").replace("{height}","67").replace("300x300","50x50"),r="https://static-cdn.jtvnw.net/user-default-pictures-uv/cdd517fe-def4-11e9-948e-784f43822e80-profile_image-70x70.png";return Object(g.jsxs)("div",{className:"channel-avatar-container",children:[Object(g.jsx)("img",{className:"channel-avatar",width:30,src:void 0!==n&&""!==n?n:r,alt:"".concat(a," avatar"),onError:function(e){return function(e){e.target.src=r}(e)}}),a]})},w={clips:{data:[],pagination:{cursor:""}},currentClip:{title:"",video_url:"",comments_url:"",twitch_url:""},clipIndex:-1,currentSearch:{mode:n.channel,value:"",timePeriod:r.all,sort:o.hot},favourites:[]},k=Object(c.createContext)([w,function(){return w}]),N=function(e){var t=e.reducer,a=e.children,n=Object(c.useReducer)(t,w),r=Object(h.a)(n,2),o=r[0],i=r[1];return Object(g.jsx)(k.Provider,{value:[o,i],children:a})},P=function(){return Object(c.useContext)(k)},C=a(2),S=function(e){return{type:"SET_CLIPS",payload:e}},I=function(e){return{type:"SET_CURRENT_CLIP",payload:e}},_=function(e){return{type:"SET_CLIP_INDEX",payload:e}},E=function(e){return{type:"UPDATE_CLIPS",payload:e}},T=function(e){return{type:"CLIP_SEEN",payload:e}},W=function(e){return{type:"SET_FAVOURITES",payload:e}},R=function(){var e=P(),t=Object(h.a)(e,2),a=t[0].favourites,n=t[1],o=Object(c.useState)(!1),i=Object(h.a)(o,2),s=i[0],l=i[1],d=Object(c.useCallback)((function(){var e=y();n(W(e))}),[n]);Object(c.useEffect)((function(){d()}),[d]);var p=function(e){var t;s||!0!==e?(l(!1),null===(t=document.querySelector(".favourites-bar"))||void 0===t||t.scrollTo({top:0}),document.body.style.overflow="unset"):(l(!0),document.body.style.overflow="hidden")},b=function(e){!function(e){var t=JSON.parse(localStorage.getItem("favourites")||"[]").filter((function(t){return t.search.value!==e.value||t.search.mode!==e.mode}));localStorage.setItem("favourites",JSON.stringify(t))}(e),d()};return Object(g.jsx)(g.Fragment,{children:a&&Object(g.jsx)("aside",{className:"favourites-bar ".concat(!0===s?"is-visible":""),children:Object(g.jsxs)("div",{className:"favourites-container",children:[Object(g.jsx)("h5",{className:"title-lg",children:Object(g.jsxs)(u.b,{to:"/",title:"Homepage",onClick:function(){return p()},children:[Object(g.jsx)(O.f,{size:30,className:"sidebar-icon"}),Object(g.jsx)("span",{className:"title-text",children:"Search"})]})}),Object(g.jsxs)("button",{className:"title-lg",onClick:function(){return p(!0)},children:[Object(g.jsx)(O.d,{size:30,className:"sidebar-icon"}),Object(g.jsxs)("span",{className:"title-text",children:["Your",Object(g.jsx)("br",{})," Favourites"]})]}),a.length>0?Object(g.jsx)("ul",{className:"favourites-list",children:a.map((function(e){var t=e.search,a=e.avatar;return Object(g.jsxs)("li",{className:"favourites-item",children:[Object(g.jsx)(u.b,{to:"/".concat(t.mode,"/").concat(r.day,"/").concat(t.value),onClick:function(){return p()},children:Object(g.jsx)(x,{src:a,name:t.value})}),Object(g.jsx)("button",{title:"Remove Favourite",onClick:function(){return b(t)},children:Object(g.jsx)(O.g,{size:14})})]},t.value)}))}):Object(g.jsx)("p",{className:"favourites-empty",children:"After you seach for clips your favorites will show up here"})]})})})},L=function(){var e=Object(j.a)(b.a.mark((function e(t,a){var o,c,i,s;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.mode===n.subreddit?o="".concat("https://clips-autoplay.herokuapp.com","/api/").concat(t.mode,"/livestreamfail?timeperiod=").concat(t.timePeriod,"&sort=").concat(t.value):t.timePeriod===r.shuffle?(o="".concat("https://clips-autoplay.herokuapp.com","/api/twitch/").concat(t.mode,"/").concat(t.value,"/").concat(t.timePeriod),a&&(o="".concat(o,"?after=").concat(a))):o="".concat("https://clips-autoplay.herokuapp.com","/api/twitch/").concat(t.mode,"/").concat(t.value,"?timeperiod=").concat(t.timePeriod),a&&t.timePeriod!==r.shuffle&&(o="".concat(o,"&after=").concat(a)),e.prev=2,e.next=5,f.a.get(o);case 5:return c=e.sent,i=c.data,e.abrupt("return",i);case 10:return e.prev=10,e.t0=e.catch(2),s=e.t0.response,e.abrupt("return",{error:{status:s.status,message:s.statusText}});case 14:case"end":return e.stop()}}),e,null,[[2,10]])})));return function(t,a){return e.apply(this,arguments)}}(),A=function(){var e=Object(j.a)(b.a.mark((function e(t,a){var r,o,c;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t===n.subreddit){e.next=10;break}return r="".concat("https://clips-autoplay.herokuapp.com","/api/twitch/suggestions/").concat(t,"/"),a&&(r="".concat(r).concat(a)),e.next=5,f.a.get(r);case 5:return o=e.sent,c=o.data,e.abrupt("return",c);case 10:return e.abrupt("return",!1);case 11:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),F=(a(63),function(e){var t=e.id,a=e.name,n=e.label,r=e.checked,o=e.value,c=e.onChange;return Object(g.jsxs)("div",{className:"radio-custom",children:[Object(g.jsx)("input",{id:t,type:"radio",name:a,checked:r,value:o,onChange:c}),Object(g.jsx)("label",{htmlFor:t,children:n})]})}),U=(a(64),a(30),a(65),function(e){var t=e.suggestions,a=e.localSearch;return Object(g.jsxs)("section",{className:"suggestions-container",children:[Object(g.jsx)("h2",{className:"title-lg",children:"Suggestions"}),t.length>0?Object(g.jsx)("ul",{className:"suggestions-list",children:a.mode&&Object(g.jsx)(g.Fragment,{children:null===t||void 0===t?void 0:t.map((function(e){var t=e.avatar,n=e.name;return Object(g.jsx)("li",{className:"suggestions-item",children:Object(g.jsx)(u.b,{to:"/".concat(a.mode,"/").concat(a.timePeriod,"/").concat(n),children:Object(g.jsx)(x,{src:t,name:n})})},n)}))})}):Object(g.jsx)("p",{className:"no-suggestions",children:"No suggestions found but you can still search using the button since not every user is in our database."})]})}),z=function(){var e=Object(c.useState)({mode:n.channel,value:"",timePeriod:r.week,sort:o.hot}),t=Object(h.a)(e,2),a=t[0],i=t[1],s=Object(c.useState)([]),l=Object(h.a)(s,2),u=l[0],p=l[1],m=Object(c.useState)([]),f=Object(h.a)(m,2),y=f[0],v=f[1],O=Object(c.useState)([]),x=Object(h.a)(O,2),w=x[0],k=x[1],N=Object(d.f)(),P=Object(c.useCallback)(Object(j.a)(b.a.mark((function e(){var t,r,o;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(a.value.length>0&&a.mode!==n.subreddit)){e.next=7;break}return e.next=3,A(a.mode,a.value);case 3:(t=e.sent)&&p(t),e.next=25;break;case 7:if(a.mode!==n.channel){e.next=16;break}if(!(y.length>0)){e.next=12;break}p(y),e.next=16;break;case 12:return e.next=14,A(a.mode);case 14:(r=e.sent).length>0&&(p(r),v(r));case 16:if(a.mode!==n.category){e.next=25;break}if(!(w.length>0)){e.next=21;break}p(w),e.next=25;break;case 21:return e.next=23,A(a.mode);case 23:(o=e.sent).length>0&&(p(o),k(o));case 25:case"end":return e.stop()}}),e)}))),[w,y,a.mode,a.value]);Object(c.useEffect)((function(){P()}),[P]);var S=function(){var e=Object(j.a)(b.a.mark((function e(t){var r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),r=a.value,a.mode===n.subreddit&&(r=a.sort),N.push("/".concat(a.mode,"/").concat(a.timePeriod,"/").concat(r));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),I=function(e){var t=e.currentTarget.value;t===n.subreddit&&a.timePeriod===r.shuffle?i(Object(C.a)(Object(C.a)({},a),{},{timePeriod:r.day,mode:t})):i(Object(C.a)(Object(C.a)({},a),{},{mode:t}))},_=function(e){var t=e.currentTarget.value;i(Object(C.a)(Object(C.a)({},a),{},{timePeriod:t}))},E=function(){var e=Object(j.a)(b.a.mark((function e(t){var n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t.currentTarget.value,i(Object(C.a)(Object(C.a)({},a),{},{value:n.replace("/","")}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),T=function(e){var t=e.currentTarget.value;i(Object(C.a)(Object(C.a)({},a),{},{sort:t}))};return Object(g.jsxs)("div",{className:"search-container",children:[Object(g.jsx)("h2",{className:"text-intro",children:"Watch the best Twitch Clips from your favourite content creators without interruptions"}),Object(g.jsxs)("form",{children:[Object(g.jsxs)("div",{className:"inputs-group",children:[Object(g.jsx)("h2",{className:"title-lg",children:"Search Clips by"}),Object(g.jsx)(F,{id:"searchType-channel",name:"search-type",label:"Channel",value:n.channel,onChange:I,checked:a.mode===n.channel}),Object(g.jsx)(F,{id:"searchType-category",name:"search-type",label:"Category/Game",value:n.category,onChange:I,checked:a.mode===n.category}),Object(g.jsx)(F,{id:"searchType-lsf",name:"search-type",label:"LiveStreamFail",value:n.subreddit,onChange:I,checked:a.mode===n.subreddit})]}),a.mode===n.subreddit&&Object(g.jsxs)("div",{className:"inputs-group",children:[Object(g.jsx)("h2",{className:"title-lg",children:"Sort by"}),Object(g.jsx)(F,{id:"sort-popular",name:"sort",label:"Popular Now",value:o.hot,onChange:T,checked:a.sort===o.hot}),Object(g.jsx)(F,{id:"sort-top",name:"sort",label:"Most Votes",value:o.top,onChange:T,checked:a.sort===o.top}),Object(g.jsx)(F,{id:"sort-new",name:"sort",label:"Most Recent",value:o.new,onChange:T,checked:a.sort===o.new})]}),a.mode!==n.subreddit||a.mode===n.subreddit&&a.sort===o.top?Object(g.jsxs)("div",{className:"inputs-group",children:[Object(g.jsx)("h2",{className:"title-lg",children:"Filter by"}),Object(g.jsx)(F,{id:"timePeriod-day",name:"timePeriod",label:"Day",value:r.day,onChange:_,checked:a.timePeriod===r.day}),Object(g.jsx)(F,{id:"timePeriod-week",name:"timePeriod",label:"Week",value:r.week,onChange:_,checked:a.timePeriod===r.week}),Object(g.jsx)(F,{id:"timePeriod-month",name:"timePeriod",label:"Month",value:r.month,onChange:_,checked:a.timePeriod===r.month}),Object(g.jsx)(F,{id:"timePeriod-year",name:"timePeriod",label:"Year",value:r.year,onChange:_,checked:a.timePeriod===r.year}),Object(g.jsx)(F,{id:"timePeriod-all",name:"timePeriod",label:"All",value:r.all,onChange:_,checked:a.timePeriod===r.all}),a.mode!==n.subreddit&&Object(g.jsx)(F,{id:"timePeriod-shuffle",name:"timePeriod",label:"Shuffle",value:r.shuffle,onChange:_,checked:a.timePeriod===r.shuffle})]}):null,a.mode!==n.subreddit&&Object(g.jsx)("input",{className:"input-main-search",type:"text",placeholder:a.mode===n.channel?"Insert the channel name":"Insert the category/game name",value:a.value,onChange:E}),Object(g.jsx)("button",{type:"submit",className:"button-generic",onClick:S,disabled:""===a.value&&a.mode!==n.subreddit,children:"Search"}),a.mode!==n.subreddit&&Object(g.jsx)(U,{suggestions:u,localSearch:a})]})]})},Y=a.p+"static/media/logo-twitch.ad99d699.svg",q=a(13),D=(a(66),a(67),function(e){var t=e.visible;return Object(g.jsx)("div",{className:"loader ".concat(t),children:"Loading..."})}),J=function(){return Object(g.jsxs)("div",{className:"error-container",children:[Object(g.jsx)(O.h,{size:48}),Object(g.jsxs)("p",{className:"error-description",children:["We couldn't find any clips for your Search.",Object(g.jsx)("br",{}),"The game/user might not exist or they might not have any clips in the selected period.",Object(g.jsx)("br",{})," Users that are currently suspended also have their clips disabled."]}),Object(g.jsx)(u.b,{to:"/",className:"button-generic",children:"New Search"})]})},M=function(){return Object(g.jsxs)("div",{className:"error-container",children:[Object(g.jsx)("p",{className:"error-description",children:"You have reached the final clip for the current search"}),Object(g.jsx)(u.b,{to:"/",className:"button-generic",children:"New Search"})]})},H=function(e){var t,a=e.currentClip;return Object(g.jsxs)("div",{className:"comments-box",children:[Object(g.jsx)("div",{className:"comments-container",children:null===(t=a.comments)||void 0===t?void 0:t.map((function(e,t){var a=e.comment,n=e.author;return Object(g.jsxs)("div",{className:"comments-item",children:[Object(g.jsx)("span",{className:"comment-author",children:"/u/".concat(n)}),Object(g.jsx)("p",{children:a})]},t)}))}),a.comments_url&&Object(g.jsx)("a",{className:"link-comments",href:"https://reddit.com".concat(a.comments_url),target:"_blank",rel:"noreferrer",title:"clip comments",children:"See All Comments"})]})};function V(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e}var X=function(){var e=P(),t=Object(h.a)(e,2),a=t[0],n=a.clips,o=a.currentClip,i=a.clipIndex,s=a.currentSearch,l=t[1],u=Object(c.useState)([]),p=Object(h.a)(u,2),m=p[0],f=p[1],x=Object(c.useState)("loading"),w=Object(h.a)(x,2),k=w[0],N=w[1],C=Object(c.useState)(!1),R=Object(h.a)(C,2),A=R[0],F=R[1],U=Object(c.useState)(!1),z=Object(h.a)(U,2),X=z[0],B=z[1],G=Object(c.useState)(1200),K=Object(h.a)(G,2),Q=K[0],Z=K[1],$=Object(c.useState)(!1),ee=Object(h.a)($,2),te=ee[0],ae=ee[1],ne=Object(c.useState)(!0),re=Object(h.a)(ne,2),oe=re[0],ce=re[1],ie=Object(c.useState)(!1),se=Object(h.a)(ie,2),le=se[0],ue=se[1],de=Object(c.useState)(!0),he=Object(h.a)(de,2),pe=he[0],be=he[1],je=Object(c.useState)(1),me=Object(h.a)(je,2),fe=me[0],ye=me[1],ve=Object(c.useState)(!1),Oe=Object(h.a)(ve,2),ge=Oe[0],xe=Oe[1],we=Object(c.useState)(!1),ke=Object(h.a)(we,2),Ne=ke[0],Pe=ke[1],Ce=Object(d.g)();Object(c.useEffect)((function(){q.a.pageview(window.location.pathname+window.location.search)}),[Ce]),Object(c.useEffect)((function(){return N("loading"),function(){var e=Object(j.a)(b.a.mark((function e(){var t,a,n,o;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return l({type:"SET_CURRENT_SEARCH",payload:Ce}),e.next=3,L(Ce);case 3:if(!("error"in(t=e.sent))){e.next=9;break}F(!0),N(""),e.next=18;break;case 9:return l(S(t)),Ce.timePeriod===r.shuffle?(a=V(0,t.data.length),n=t.data[a],l(I(n)),l(_(a)),l(T(n)),f([a])):(l(I(t.data[0])),l(_(0))),B(!1),e.next=14,v(Ce);case 14:return e.next=16,y();case 16:o=e.sent,l(W(o));case 18:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()(),function(){l(I({title:"",video_url:"",twitch_url:"",comments_url:""})),N("loading")}}),[l,Ce]);var Se=Object(c.useCallback)(Object(j.a)(b.a.mark((function e(){var t,a;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""===(t=n.pagination.cursor)||te){e.next=7;break}return ae(!0),e.next=5,L(s,t);case 5:"error"in(a=e.sent)?console.log(a.error):(l(E(a)),ae(!1));case 7:case"end":return e.stop()}}),e)}))),[n.pagination.cursor,s,l,te]),Ie=Object(c.useCallback)((function(e){var t=n.data,a="prev"===e?i-1:i+1;if("prev"===e&&i<=0&&s.timePeriod!==r.shuffle)return!1;if(s.timePeriod===r.shuffle){var o=m.slice(0,m.length-1);if(q.a.pageview("".concat(window.location.pathname).concat(window.location.search,"/").concat(m.length)),t.length<1100&&Se(),"prev"===e){if(m.length>0){var c=m.indexOf(i);a=m[c-1]}}else if(m.length>1&&o.includes(i)){var u=m.indexOf(i);a=m[u+1]}else{var d=t.filter((function(e){return!e.seen}));if(!(d.length>0))return B(!0),N(""),!1;var h=d[V(0,d.length-1)];a=t.findIndex((function(e){return e===h})),f(m.concat(a))}}if(a+1<=n.data.length){var p=t[a];i>0&&t[i].video_url===p.video_url?Ie():(N("loading"),B(!1),l(I(p)),l(_(a)),l(T(p)),s.timePeriod!==r.shuffle&&q.a.pageview("".concat(window.location.pathname).concat(window.location.search,"/").concat(a)))}else B(!0),N("");s.timePeriod===r.shuffle?(t.length===m.length?ue(!0):ue(!1),0===m.length||m[0]===a?be(!0):be(!1)):(n.data.length<a+1?ue(!0):ue(!1),be(a<=0))}),[i,n.data,s.timePeriod,l,m,Se]);Object(c.useEffect)((function(){var e=n.data.length;e>0&&i+10>e&&Se()}),[n,i,Ie,Se]);var _e=function(e){var t=document.querySelector(".player-container video");ye(e),xe(!1),t&&(t.defaultPlaybackRate=e,t.playbackRate=e)};return Object(c.useEffect)((function(){var e=function(){var e=document.querySelector(".player-container video"),t=window.innerHeight,a=window.innerWidth;e&&a>1e3&&Z(1.69*(t-200))};e(),window.onresize=e,window.onkeydown=function(e){"ArrowLeft"===e.key&&Ie("prev"),"ArrowRight"===e.key&&Ie()}}),[Ie]),Object(g.jsx)(g.Fragment,{children:Object(g.jsxs)("div",{className:"player-container ".concat(oe&&o.comments?"has-comments":""," ").concat(Ne?"is-fullscreen":""),style:{maxWidth:Q},children:[X&&Object(g.jsx)(M,{}),o.video_url&&Object(g.jsxs)(g.Fragment,{children:[Object(g.jsxs)("div",{className:"video-controls",children:[Object(g.jsx)("h4",{className:"title-lg",children:o.title}),Object(g.jsxs)("div",{className:"right-container",children:[o.twitch_url&&Object(g.jsx)("a",{className:"link-twitch",href:"".concat(o.twitch_url),target:"_blank",rel:"noreferrer",title:"clip twitch page",children:Object(g.jsx)("img",{className:"",width:"25",src:Y,alt:"twitch logo"})}),Object(g.jsx)("button",{className:"toggle-fullscreen",title:"toggle fullscreen",onClick:function(){return Pe(!Ne)},children:Object(g.jsx)(O.e,{size:20})}),o.comments&&Object(g.jsx)("button",{className:"toggle-comments",title:"toggle comments",onClick:function(){return ce(!oe)},children:Object(g.jsx)(O.b,{size:20})}),Object(g.jsxs)("div",{className:"playback-speed-container",children:[Object(g.jsxs)("button",{onClick:function(){return xe(!ge)},className:"btn-playback-speed",children:[fe,"x"]}),Object(g.jsxs)("ul",{className:"playback-options ".concat(ge?"is-visible":""),children:[Object(g.jsx)("li",{children:Object(g.jsx)("button",{onClick:function(){return _e(.5)},children:"0.5x"})}),Object(g.jsx)("li",{children:Object(g.jsx)("button",{onClick:function(){return _e(1)},children:"1x"})}),Object(g.jsx)("li",{children:Object(g.jsx)("button",{onClick:function(){return _e(1.25)},children:"1.25x"})}),Object(g.jsx)("li",{children:Object(g.jsx)("button",{onClick:function(){return _e(1.5)},children:"1.5x"})}),Object(g.jsx)("li",{children:Object(g.jsx)("button",{onClick:function(){return _e(2)},children:"2x"})})]})]}),Object(g.jsxs)("button",{className:"btn-clips-control btn-left",onClick:function(){return Ie("prev")},disabled:pe,children:["Previous",Object(g.jsx)("i",{className:"icon-container",children:Object(g.jsx)(O.a,{size:20})})]}),Object(g.jsxs)("button",{className:"btn-clips-control btn-right",onClick:function(){return Ie()},disabled:le,children:["Next",Object(g.jsx)("i",{className:"icon-container",children:Object(g.jsx)(O.a,{size:20})})]})]})]}),Object(g.jsxs)("div",{className:"video-comments-wrapper",children:[Object(g.jsx)("video",{className:k,src:o.video_url,autoPlay:!0,controls:!0,onEnded:function(){return Ie()},onLoadedData:function(){return N("")},onError:function(){return Ie()}}),o.comments&&"loading"!==k?Object(g.jsx)(H,{currentClip:o}):null]})]}),A&&Object(g.jsx)(J,{}),Object(g.jsx)(D,{visible:k})]})})},B=(a(68),a(69),function(){return Object(g.jsx)(g.Fragment,{children:Object(g.jsx)("h1",{className:"logo-main",children:Object(g.jsxs)(u.b,{to:"/",children:["Clips ",Object(g.jsx)(O.c,{size:36})," Autoplay"]})})})}),G=a(7),K=(a(70),function(){return Object(g.jsxs)("div",{className:"privacy-wrapper",children:[Object(g.jsx)("h3",{children:"Privacy Policy"}),Object(g.jsx)("p",{children:"Your privacy is important to us. It is clipsautoplay's policy to respect your privacy and comply with any applicable law and regulation regarding any personal information we may collect about you, including across our website, https://www.clipsautoplay.com, and other sites we own and operate."}),Object(g.jsx)("p",{children:"This policy is effective as of 22 July 2021 and was last updated on 22 July 2021."}),Object(g.jsx)("h3",{children:"Information We Collect"}),Object(g.jsx)("p",{children:"Information we collect includes both information you knowingly and actively provide us when using or participating in any of our services and promotions, and any information automatically sent by your devices in the course of accessing our products and services."}),Object(g.jsx)("h3",{children:"Log Data"}),Object(g.jsx)("p",{children:"When you visit our website, our servers may automatically log the standard data provided by your web browser. It may include your device\u2019s Internet Protocol (IP) address, your browser type and version, the pages you visit, the time and date of your visit, the time spent on each page, other details about your visit, and technical details that occur in conjunction with any errors you may encounter."}),Object(g.jsx)("p",{children:"Please be aware that while this information may not be personally identifying by itself, it may be possible to combine it with other data to personally identify individual persons."}),Object(g.jsx)("h3",{children:"Collection and Use of Information"}),Object(g.jsx)("p",{children:"We may collect personal information from you when you do any of the following on our website:"}),Object(g.jsx)("p",{children:"Use a mobile device or web browser to access our content Contact us via email, social media, or on any similar technologies When you mention us on social media We may collect, hold, use, and disclose information for the following purposes, and personal information will not be further processed in a manner that is incompatible with these purposes:"}),Object(g.jsx)("p",{children:"Please be aware that we may combine information we collect about you with general information or research data we receive from other trusted sources."}),Object(g.jsx)("h3",{children:"Security of Your Personal Information"}),Object(g.jsx)("p",{children:"When we collect and process personal information, and while we retain this information, we will protect it within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use, or modification."}),Object(g.jsx)("p",{children:"Although we will do our best to protect the personal information you provide to us, we advise that no method of electronic transmission or storage is 100% secure, and no one can guarantee absolute data security. We will comply with laws applicable to us in respect of any data breach."}),Object(g.jsx)("p",{children:"You are responsible for selecting any password and its overall security strength, ensuring the security of your own information within the bounds of our services."}),Object(g.jsx)("h3",{children:"How Long We Keep Your Personal Information"}),Object(g.jsx)("p",{children:"We keep your personal information only for as long as we need to. This time period may depend on what we are using your information for, in accordance with this privacy policy. If your personal information is no longer required, we will delete it or make it anonymous by removing all details that identify you."}),Object(g.jsx)("p",{children:"However, if necessary, we may retain your personal information for our compliance with a legal, accounting, or reporting obligation or for archiving purposes in the public interest, scientific, or historical research purposes or statistical purposes."}),Object(g.jsx)("h3",{children:"Children\u2019s Privacy"}),Object(g.jsx)("p",{children:"We do not aim any of our products or services directly at children under the age of 13, and we do not knowingly collect personal information about children under 13."}),Object(g.jsx)("h3",{children:"Disclosure of Personal Information to Third Parties"}),Object(g.jsxs)("p",{children:["We may disclose personal information to: ",Object(g.jsx)("br",{}),"a parent, subsidiary, or affiliate of our company third party service providers for the purpose of enabling them to provide their services, for example, IT service providers, data storage, hosting and server providers, advertisers, or analytics platforms our employees, contractors, and/or related entities our existing or potential agents or business partners sponsors or promoters of any competition, sweepstakes, or promotion we run courts, tribunals, regulatory authorities, and law enforcement officers, as required by law, in connection with any actual or prospective legal proceedings, or in order to establish, exercise, or defend our legal rights third parties, including agents or sub-contractors, who assist us in providing information, products, services, or direct marketing to you third parties to collect and process data International Transfers of Personal Information The personal information we collect is stored and/or processed where we or our partners, affiliates, and third-party providers maintain facilities. Please be aware that the locations to which we store, process, or transfer your personal information may not have the same data protection laws as the country in which you initially provided the information. If we transfer your personal information to third parties in other countries: (i) we will perform those transfers in accordance with the requirements of applicable law; and (ii) we will protect the transferred personal information in accordance with this privacy policy."]}),Object(g.jsx)("h3",{children:"Your Rights and Controlling Your Personal Information"}),Object(g.jsx)("p",{children:"You always retain the right to withhold personal information from us, with the understanding that your experience of our website may be affected. We will not discriminate against you for exercising any of your rights over your personal information. If you do provide us with personal information you understand that we will collect, hold, use and disclose it in accordance with this privacy policy. You retain the right to request details of any personal information we hold about you."}),Object(g.jsx)("p",{children:"If we receive personal information about you from a third party, we will protect it as set out in this privacy policy. If you are a third party providing personal information about somebody else, you represent and warrant that you have such person\u2019s consent to provide the personal information to us."}),Object(g.jsx)("p",{children:"If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time. We will provide you with the ability to unsubscribe from our email-database or opt out of communications. Please be aware we may need to request specific information from you to help us confirm your identity."}),Object(g.jsx)("p",{children:"If you believe that any information we hold about you is inaccurate, out of date, incomplete, irrelevant, or misleading, please contact us using the details provided in this privacy policy. We will take reasonable steps to correct any information found to be inaccurate, incomplete, misleading, or out of date."}),Object(g.jsx)("p",{children:"If you believe that we have breached a relevant data protection law and wish to make a complaint, please contact us using the details below and provide us with full details of the alleged breach. We will promptly investigate your complaint and respond to you, in writing, setting out the outcome of our investigation and the steps we will take to deal with your complaint. You also have the right to contact a regulatory body or data protection authority in relation to your complaint."}),Object(g.jsx)("h3",{children:"Limits of Our Policy"}),Object(g.jsx)("p",{children:"Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and policies of those sites, and cannot accept responsibility or liability for their respective privacy practices."}),Object(g.jsx)("h3",{children:"Changes to This Policy"}),Object(g.jsx)("p",{children:"At our discretion, we may change our privacy policy to reflect updates to our business processes, current acceptable practices, or legislative or regulatory changes. If we decide to change this privacy policy, we will post the changes here at the same link by which you are accessing this privacy policy."}),Object(g.jsx)("p",{children:"If required by law, we will get your permission or give you the opportunity to opt in to or opt out of, as applicable, any new uses of your personal information."}),Object(g.jsx)("h3",{children:"Contact Us"}),Object(g.jsx)("p",{children:"For any questions or concerns regarding your privacy, you may contact us using the following details:"}),Object(g.jsxs)("p",{children:["clipsautoplay",Object(g.jsx)("br",{}),"info@clipsautoplay.com"]})]})});q.a.initialize("UA-200630534-1"),Object(G.a)().listen((function(e,t){q.a.pageview(e.pathname+e.search)}));var Q=function(){return Object(c.useEffect)((function(){q.a.pageview(window.location.pathname+window.location.search)}),[]),Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)(R,{}),Object(g.jsxs)("main",{className:"main-content",children:[Object(g.jsx)(B,{}),Object(g.jsxs)(d.c,{children:[Object(g.jsx)(d.a,{path:"/:mode/:timePeriod/:value?",children:Object(g.jsx)(X,{})}),Object(g.jsx)(d.a,{path:"/privacy",children:Object(g.jsx)(K,{})}),Object(g.jsxs)(d.a,{path:"/",children:[Object(g.jsx)(z,{}),Object(g.jsx)(u.b,{className:"link-privacy",to:"/privacy",children:"Privacy Policy"})]})]})]})]})};a(71).config(),l.a.render(Object(g.jsx)(i.a.StrictMode,{children:Object(g.jsx)(N,{reducer:function(e,t){switch(t.type){case"SET_CLIPS":return Object(C.a)(Object(C.a)({},e),{},{clips:Object(C.a)({},t.payload)});case"SET_CURRENT_CLIP":return Object(C.a)(Object(C.a)({},e),{},{currentClip:Object(C.a)({},t.payload)});case"SET_CLIP_INDEX":return Object(C.a)(Object(C.a)({},e),{},{clipIndex:t.payload});case"UPDATE_CLIPS":var a=e.clips.data.concat(t.payload.data);return Object(C.a)(Object(C.a)({},e),{},{clips:{data:a,pagination:{cursor:t.payload.pagination.cursor}}});case"CLIP_SEEN":var n=Object(C.a)(Object(C.a)({},t.payload),{},{seen:!0}),r=e.clips.data.map((function(e){return(null===e||void 0===e?void 0:e.twitch_url)!==t.payload.twitch_url?e:n}));return Object(C.a)(Object(C.a)({},e),{},{clips:Object(C.a)(Object(C.a)({},e.clips),{},{data:r})});case"SET_CURRENT_SEARCH":return Object(C.a)(Object(C.a)({},e),{},{currentSearch:t.payload});case"SET_FAVOURITES":return Object(C.a)(Object(C.a)({},e),{},{favourites:t.payload});default:return e}},children:Object(g.jsx)(u.a,{children:Object(g.jsx)(Q,{})})})}),document.getElementById("root"))}},[[75,1,2]]]);
//# sourceMappingURL=main.32ee25ec.chunk.js.map