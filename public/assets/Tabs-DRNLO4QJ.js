import{r as X,s as b,A as E,as as ut,at as ye,au as vt,av as gt,aw as ee,ax as ht,h as xt,ac as mt,a9 as $e,ay as yt,Y as Ct,az as St,Q as wt,a3 as Tt,Z as Pt,g as Z,aA as Rt,j as r,m as s,i as C,n as $,aB as zt,ap as ne,_ as Ce,an as oe,y as $t,z as Le,aC as Se,D as Lt,E as ie,F as se,aj as Bt,ad as Wt,C as j,aD as At,aE as Et,a2 as M,a1 as J,H as _t,J as Q,aF as kt,aG as jt,ab as Mt,aH as Ht,aq as Vt}from"./index-D5a-Ui4h.js";const It=ye(".v-x-scroll",{overflow:"auto",scrollbarWidth:"none"},[ye("&::-webkit-scrollbar",{width:0,height:0})]),Ot=X({name:"XScroll",props:{disabled:Boolean,onScroll:Function},setup(){const e=E(null);function n(l){!(l.currentTarget.offsetWidth<l.currentTarget.scrollWidth)||l.deltaY===0||(l.currentTarget.scrollLeft+=l.deltaY+l.deltaX,l.preventDefault())}const i=ut();return It.mount({id:"vueuc/x-scroll",head:!0,anchorMetaName:vt,ssr:i}),Object.assign({selfRef:e,handleWheel:n},{scrollTo(...l){var y;(y=e.value)===null||y===void 0||y.scrollTo(...l)}})},render(){return b("div",{ref:"selfRef",onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:"v-x-scroll"},this.$slots)}});var Ft=/\s/;function Gt(e){for(var n=e.length;n--&&Ft.test(e.charAt(n)););return n}var Dt=/^\s+/;function Nt(e){return e&&e.slice(0,Gt(e)+1).replace(Dt,"")}var we=NaN,Xt=/^[-+]0x[0-9a-f]+$/i,Ut=/^0b[01]+$/i,Yt=/^0o[0-7]+$/i,qt=parseInt;function Te(e){if(typeof e=="number")return e;if(gt(e))return we;if(ee(e)){var n=typeof e.valueOf=="function"?e.valueOf():e;e=ee(n)?n+"":n}if(typeof e!="string")return e===0?e:+e;e=Nt(e);var i=Ut.test(e);return i||Yt.test(e)?qt(e.slice(2),i?2:8):Xt.test(e)?we:+e}var le=function(){return ht.Date.now()},Kt="Expected a function",Jt=Math.max,Qt=Math.min;function Zt(e,n,i){var f,l,y,v,p,m,h=0,x=!1,L=!1,P=!0;if(typeof e!="function")throw new TypeError(Kt);n=Te(n)||0,ee(i)&&(x=!!i.leading,L="maxWait"in i,y=L?Jt(Te(i.maxWait)||0,n):y,P="trailing"in i?!!i.trailing:P);function g(c){var z=f,I=l;return f=l=void 0,h=c,v=e.apply(I,z),v}function T(c){return h=c,p=setTimeout(W,n),x?g(c):v}function S(c){var z=c-m,I=c-h,U=n-z;return L?Qt(U,y-I):U}function R(c){var z=c-m,I=c-h;return m===void 0||z>=n||z<0||L&&I>=y}function W(){var c=le();if(R(c))return B(c);p=setTimeout(W,S(c))}function B(c){return p=void 0,P&&f?g(c):(f=l=void 0,v)}function V(){p!==void 0&&clearTimeout(p),h=0,f=m=l=p=void 0}function A(){return p===void 0?v:B(le())}function u(){var c=le(),z=R(c);if(f=arguments,l=this,m=c,z){if(p===void 0)return T(m);if(L)return clearTimeout(p),p=setTimeout(W,n),g(m)}return p===void 0&&(p=setTimeout(W,n)),v}return u.cancel=V,u.flush=A,u}var ea="Expected a function";function ta(e,n,i){var f=!0,l=!0;if(typeof e!="function")throw new TypeError(ea);return ee(i)&&(f="leading"in i?!!i.leading:f,l="trailing"in i?!!i.trailing:l),Zt(e,n,{leading:f,maxWait:n,trailing:l})}const aa=X({name:"Add",render(){return b("svg",{width:"512",height:"512",viewBox:"0 0 512 512",fill:"none",xmlns:"http://www.w3.org/2000/svg"},b("path",{d:"M256 112V400M400 256H112",stroke:"currentColor","stroke-width":"32","stroke-linecap":"round","stroke-linejoin":"round"}))}}),ra={tabFontSizeSmall:"14px",tabFontSizeMedium:"14px",tabFontSizeLarge:"16px",tabGapSmallLine:"36px",tabGapMediumLine:"36px",tabGapLargeLine:"36px",tabGapSmallLineVertical:"8px",tabGapMediumLineVertical:"8px",tabGapLargeLineVertical:"8px",tabPaddingSmallLine:"6px 0",tabPaddingMediumLine:"10px 0",tabPaddingLargeLine:"14px 0",tabPaddingVerticalSmallLine:"6px 12px",tabPaddingVerticalMediumLine:"8px 16px",tabPaddingVerticalLargeLine:"10px 20px",tabGapSmallBar:"36px",tabGapMediumBar:"36px",tabGapLargeBar:"36px",tabGapSmallBarVertical:"8px",tabGapMediumBarVertical:"8px",tabGapLargeBarVertical:"8px",tabPaddingSmallBar:"4px 0",tabPaddingMediumBar:"6px 0",tabPaddingLargeBar:"10px 0",tabPaddingVerticalSmallBar:"6px 12px",tabPaddingVerticalMediumBar:"8px 16px",tabPaddingVerticalLargeBar:"10px 20px",tabGapSmallCard:"4px",tabGapMediumCard:"4px",tabGapLargeCard:"4px",tabGapSmallCardVertical:"4px",tabGapMediumCardVertical:"4px",tabGapLargeCardVertical:"4px",tabPaddingSmallCard:"8px 16px",tabPaddingMediumCard:"10px 20px",tabPaddingLargeCard:"12px 24px",tabPaddingSmallSegment:"4px 0",tabPaddingMediumSegment:"6px 0",tabPaddingLargeSegment:"8px 0",tabPaddingVerticalLargeSegment:"0 8px",tabPaddingVerticalSmallCard:"8px 12px",tabPaddingVerticalMediumCard:"10px 16px",tabPaddingVerticalLargeCard:"12px 20px",tabPaddingVerticalSmallSegment:"0 4px",tabPaddingVerticalMediumSegment:"0 6px",tabGapSmallSegment:"0",tabGapMediumSegment:"0",tabGapLargeSegment:"0",tabGapSmallSegmentVertical:"0",tabGapMediumSegmentVertical:"0",tabGapLargeSegmentVertical:"0",panePaddingSmall:"8px 0 0 0",panePaddingMedium:"12px 0 0 0",panePaddingLarge:"16px 0 0 0",closeSize:"18px",closeIconSize:"14px"};function na(e){const{textColor2:n,primaryColor:i,textColorDisabled:f,closeIconColor:l,closeIconColorHover:y,closeIconColorPressed:v,closeColorHover:p,closeColorPressed:m,tabColor:h,baseColor:x,dividerColor:L,fontWeight:P,textColor1:g,borderRadius:T,fontSize:S,fontWeightStrong:R}=e;return Object.assign(Object.assign({},ra),{colorSegment:h,tabFontSizeCard:S,tabTextColorLine:g,tabTextColorActiveLine:i,tabTextColorHoverLine:i,tabTextColorDisabledLine:f,tabTextColorSegment:g,tabTextColorActiveSegment:n,tabTextColorHoverSegment:n,tabTextColorDisabledSegment:f,tabTextColorBar:g,tabTextColorActiveBar:i,tabTextColorHoverBar:i,tabTextColorDisabledBar:f,tabTextColorCard:g,tabTextColorHoverCard:g,tabTextColorActiveCard:i,tabTextColorDisabledCard:f,barColor:i,closeIconColor:l,closeIconColorHover:y,closeIconColorPressed:v,closeColorHover:p,closeColorPressed:m,closeBorderRadius:T,tabColor:h,tabColorSegment:x,tabBorderColor:L,tabFontWeightActive:P,tabFontWeight:P,tabBorderRadius:T,paneTextColor:n,fontWeightStrong:R})}const oa={common:xt,self:na},fe=mt("n-tabs"),Be={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:"if"},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},ba=X({__TAB_PANE__:!0,name:"TabPane",alias:["TabPanel"],props:Be,slots:Object,setup(e){const n=$e(fe,null);return n||yt("tab-pane","`n-tab-pane` must be placed inside `n-tabs`."),{style:n.paneStyleRef,class:n.paneClassRef,mergedClsPrefix:n.mergedClsPrefixRef}},render(){return b("div",{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),ia=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},Rt(Be,["displayDirective"])),ce=X({__TAB__:!0,inheritAttrs:!1,name:"Tab",props:ia,setup(e){const{mergedClsPrefixRef:n,valueRef:i,typeRef:f,closableRef:l,tabStyleRef:y,addTabStyleRef:v,tabClassRef:p,addTabClassRef:m,tabChangeIdRef:h,onBeforeLeaveRef:x,triggerRef:L,handleAdd:P,activateTab:g,handleClose:T}=$e(fe);return{trigger:L,mergedClosable:Z(()=>{if(e.internalAddable)return!1;const{closable:S}=e;return S===void 0?l.value:S}),style:y,addStyle:v,tabClass:p,addTabClass:m,clsPrefix:n,value:i,type:f,handleClose(S){S.stopPropagation(),!e.disabled&&T(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){P();return}const{name:S}=e,R=++h.id;if(S!==i.value){const{value:W}=x;W?Promise.resolve(W(e.name,i.value)).then(B=>{B&&h.id===R&&g(S)}):g(S)}}}},render(){const{internalAddable:e,clsPrefix:n,name:i,disabled:f,label:l,tab:y,value:v,mergedClosable:p,trigger:m,$slots:{default:h}}=this,x=l??y;return b("div",{class:`${n}-tabs-tab-wrapper`},this.internalLeftPadded?b("div",{class:`${n}-tabs-tab-pad`}):null,b("div",Object.assign({key:i,"data-name":i,"data-disabled":f?!0:void 0},Ct({class:[`${n}-tabs-tab`,v===i&&`${n}-tabs-tab--active`,f&&`${n}-tabs-tab--disabled`,p&&`${n}-tabs-tab--closable`,e&&`${n}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:m==="click"?this.activateTab:void 0,onMouseenter:m==="hover"?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),b("span",{class:`${n}-tabs-tab__label`},e?b(wt,null,b("div",{class:`${n}-tabs-tab__height-placeholder`}," "),b(Tt,{clsPrefix:n},{default:()=>b(aa,null)})):h?h():typeof x=="object"?x:St(x??i)),p&&this.type==="card"?b(Pt,{clsPrefix:n,class:`${n}-tabs-tab__close`,onClick:this.handleClose,disabled:f}):null))}}),sa=r("tabs",`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[s("segment-type",[r("tabs-rail",[C("&.transition-disabled",[r("tabs-capsule",`
 transition: none;
 `)])])]),s("top",[r("tab-pane",`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),s("left",[r("tab-pane",`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),s("left, right",`
 flex-direction: row;
 `,[r("tabs-bar",`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),r("tabs-tab",`
 padding: var(--n-tab-padding-vertical); 
 `)]),s("right",`
 flex-direction: row-reverse;
 `,[r("tab-pane",`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),r("tabs-bar",`
 left: 0;
 `)]),s("bottom",`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[r("tab-pane",`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),r("tabs-bar",`
 top: 0;
 `)]),r("tabs-rail",`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[r("tabs-capsule",`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),r("tabs-tab-wrapper",`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[r("tabs-tab",`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[s("active",`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),C("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])])]),s("flex",[r("tabs-nav",`
 width: 100%;
 position: relative;
 `,[r("tabs-wrapper",`
 width: 100%;
 `,[r("tabs-tab",`
 margin-right: 0;
 `)])])]),r("tabs-nav",`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[$("prefix, suffix",`
 display: flex;
 align-items: center;
 `),$("prefix","padding-right: 16px;"),$("suffix","padding-left: 16px;")]),s("top, bottom",[C(">",[r("tabs-nav",[r("tabs-nav-scroll-wrapper",[C("&::before",`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),C("&::after",`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),s("shadow-start",[C("&::before",`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),s("shadow-end",[C("&::after",`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),s("left, right",[r("tabs-nav-scroll-content",`
 flex-direction: column;
 `),C(">",[r("tabs-nav",[r("tabs-nav-scroll-wrapper",[C("&::before",`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),C("&::after",`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),s("shadow-start",[C("&::before",`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),s("shadow-end",[C("&::after",`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),r("tabs-nav-scroll-wrapper",`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[r("tabs-nav-y-scroll",`
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `,[C("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb",`
 width: 0;
 height: 0;
 display: none;
 `)]),C("&::before, &::after",`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `)]),r("tabs-nav-scroll-content",`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),r("tabs-wrapper",`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),r("tabs-tab-wrapper",`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),r("tabs-tab",`
 cursor: pointer;
 white-space: nowrap;
 flex-wrap: nowrap;
 display: inline-flex;
 align-items: center;
 color: var(--n-tab-text-color);
 font-size: var(--n-tab-font-size);
 background-clip: padding-box;
 padding: var(--n-tab-padding);
 transition:
 box-shadow .3s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[s("disabled",{cursor:"not-allowed"}),$("close",`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),$("label",`
 display: flex;
 align-items: center;
 z-index: 1;
 `)]),r("tabs-bar",`
 position: absolute;
 bottom: 0;
 height: 2px;
 border-radius: 1px;
 background-color: var(--n-bar-color);
 transition:
 left .2s var(--n-bezier),
 max-width .2s var(--n-bezier),
 opacity .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `,[C("&.transition-disabled",`
 transition: none;
 `),s("disabled",`
 background-color: var(--n-tab-text-color-disabled)
 `)]),r("tabs-pane-wrapper",`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),r("tab-pane",`
 color: var(--n-pane-text-color);
 width: 100%;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `,[C("&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),C("&.next-transition-leave-active, &.prev-transition-leave-active",`
 position: absolute;
 `),C("&.next-transition-enter-from, &.prev-transition-leave-to",`
 transform: translateX(32px);
 opacity: 0;
 `),C("&.next-transition-leave-to, &.prev-transition-enter-from",`
 transform: translateX(-32px);
 opacity: 0;
 `),C("&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to",`
 transform: translateX(0);
 opacity: 1;
 `)]),r("tabs-tab-pad",`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),s("line-type, bar-type",[r("tabs-tab",`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[C("&:hover",{color:"var(--n-tab-text-color-hover)"}),s("active",`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),s("disabled",{color:"var(--n-tab-text-color-disabled)"})])]),r("tabs-nav",[s("line-type",[s("top",[$("prefix, suffix",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),r("tabs-nav-scroll-content",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),r("tabs-bar",`
 bottom: -1px;
 `)]),s("left",[$("prefix, suffix",`
 border-right: 1px solid var(--n-tab-border-color);
 `),r("tabs-nav-scroll-content",`
 border-right: 1px solid var(--n-tab-border-color);
 `),r("tabs-bar",`
 right: -1px;
 `)]),s("right",[$("prefix, suffix",`
 border-left: 1px solid var(--n-tab-border-color);
 `),r("tabs-nav-scroll-content",`
 border-left: 1px solid var(--n-tab-border-color);
 `),r("tabs-bar",`
 left: -1px;
 `)]),s("bottom",[$("prefix, suffix",`
 border-top: 1px solid var(--n-tab-border-color);
 `),r("tabs-nav-scroll-content",`
 border-top: 1px solid var(--n-tab-border-color);
 `),r("tabs-bar",`
 top: -1px;
 `)]),$("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 `),r("tabs-nav-scroll-content",`
 transition: border-color .3s var(--n-bezier);
 `),r("tabs-bar",`
 border-radius: 0;
 `)]),s("card-type",[$("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 `),r("tabs-pad",`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),r("tabs-tab-pad",`
 transition: border-color .3s var(--n-bezier);
 `),r("tabs-tab",`
 font-weight: var(--n-tab-font-weight);
 border: 1px solid var(--n-tab-border-color);
 background-color: var(--n-tab-color);
 box-sizing: border-box;
 position: relative;
 vertical-align: bottom;
 display: flex;
 justify-content: space-between;
 font-size: var(--n-tab-font-size);
 color: var(--n-tab-text-color);
 `,[s("addable",`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[$("height-placeholder",`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),zt("disabled",[C("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])]),s("closable","padding-right: 8px;"),s("active",`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),s("disabled","color: var(--n-tab-text-color-disabled);")])]),s("left, right",`
 flex-direction: column; 
 `,[$("prefix, suffix",`
 padding: var(--n-tab-padding-vertical);
 `),r("tabs-wrapper",`
 flex-direction: column;
 `),r("tabs-tab-wrapper",`
 flex-direction: column;
 `,[r("tabs-tab-pad",`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),s("top",[s("card-type",[r("tabs-scroll-padding","border-bottom: 1px solid var(--n-tab-border-color);"),$("prefix, suffix",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),r("tabs-tab",`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[s("active",`
 border-bottom: 1px solid #0000;
 `)]),r("tabs-tab-pad",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),r("tabs-pad",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),s("left",[s("card-type",[r("tabs-scroll-padding","border-right: 1px solid var(--n-tab-border-color);"),$("prefix, suffix",`
 border-right: 1px solid var(--n-tab-border-color);
 `),r("tabs-tab",`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[s("active",`
 border-right: 1px solid #0000;
 `)]),r("tabs-tab-pad",`
 border-right: 1px solid var(--n-tab-border-color);
 `),r("tabs-pad",`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),s("right",[s("card-type",[r("tabs-scroll-padding","border-left: 1px solid var(--n-tab-border-color);"),$("prefix, suffix",`
 border-left: 1px solid var(--n-tab-border-color);
 `),r("tabs-tab",`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[s("active",`
 border-left: 1px solid #0000;
 `)]),r("tabs-tab-pad",`
 border-left: 1px solid var(--n-tab-border-color);
 `),r("tabs-pad",`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),s("bottom",[s("card-type",[r("tabs-scroll-padding","border-top: 1px solid var(--n-tab-border-color);"),$("prefix, suffix",`
 border-top: 1px solid var(--n-tab-border-color);
 `),r("tabs-tab",`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[s("active",`
 border-top: 1px solid #0000;
 `)]),r("tabs-tab-pad",`
 border-top: 1px solid var(--n-tab-border-color);
 `),r("tabs-pad",`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),de=ta,la=Object.assign(Object.assign({},Le.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:"click"},type:{type:String,default:"bar"},closable:Boolean,justifyContent:String,size:{type:String,default:"medium"},placement:{type:String,default:"top"},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),ca=X({name:"Tabs",props:la,slots:Object,setup(e,{slots:n}){var i,f,l,y;const{mergedClsPrefixRef:v,inlineThemeDisabled:p}=$t(e),m=Le("Tabs","-tabs",sa,oa,e,v),h=E(null),x=E(null),L=E(null),P=E(null),g=E(null),T=E(null),S=E(!0),R=E(!0),W=Se(e,["labelSize","size"]),B=Se(e,["activeName","value"]),V=E((f=(i=B.value)!==null&&i!==void 0?i:e.defaultValue)!==null&&f!==void 0?f:n.default?(y=(l=ne(n.default())[0])===null||l===void 0?void 0:l.props)===null||y===void 0?void 0:y.name:null),A=Lt(B,V),u={id:0},c=Z(()=>{if(!(!e.justifyContent||e.type==="card"))return{display:"flex",justifyContent:e.justifyContent}});ie(A,()=>{u.id=0,Y(),ue()});function z(){var t;const{value:a}=A;return a===null?null:(t=h.value)===null||t===void 0?void 0:t.querySelector(`[data-name="${a}"]`)}function I(t){if(e.type==="card")return;const{value:a}=x;if(!a)return;const o=a.style.opacity==="0";if(t){const d=`${v.value}-tabs-bar--disabled`,{barWidth:w,placement:_}=e;if(t.dataset.disabled==="true"?a.classList.add(d):a.classList.remove(d),["top","bottom"].includes(_)){if(pe(["top","maxHeight","height"]),typeof w=="number"&&t.offsetWidth>=w){const k=Math.floor((t.offsetWidth-w)/2)+t.offsetLeft;a.style.left=`${k}px`,a.style.maxWidth=`${w}px`}else a.style.left=`${t.offsetLeft}px`,a.style.maxWidth=`${t.offsetWidth}px`;a.style.width="8192px",o&&(a.style.transition="none"),a.offsetWidth,o&&(a.style.transition="",a.style.opacity="1")}else{if(pe(["left","maxWidth","width"]),typeof w=="number"&&t.offsetHeight>=w){const k=Math.floor((t.offsetHeight-w)/2)+t.offsetTop;a.style.top=`${k}px`,a.style.maxHeight=`${w}px`}else a.style.top=`${t.offsetTop}px`,a.style.maxHeight=`${t.offsetHeight}px`;a.style.height="8192px",o&&(a.style.transition="none"),a.offsetHeight,o&&(a.style.transition="",a.style.opacity="1")}}}function U(){if(e.type==="card")return;const{value:t}=x;t&&(t.style.opacity="0")}function pe(t){const{value:a}=x;if(a)for(const o of t)a.style[o]=""}function Y(){if(e.type==="card")return;const t=z();t?I(t):U()}function ue(){var t;const a=(t=g.value)===null||t===void 0?void 0:t.$el;if(!a)return;const o=z();if(!o)return;const{scrollLeft:d,offsetWidth:w}=a,{offsetLeft:_,offsetWidth:k}=o;d>_?a.scrollTo({top:0,left:_,behavior:"smooth"}):_+k>d+w&&a.scrollTo({top:0,left:_+k-w,behavior:"smooth"})}const q=E(null);let te=0,H=null;function We(t){const a=q.value;if(a){te=t.getBoundingClientRect().height;const o=`${te}px`,d=()=>{a.style.height=o,a.style.maxHeight=o};H?(d(),H(),H=null):H=d}}function Ae(t){const a=q.value;if(a){const o=t.getBoundingClientRect().height,d=()=>{document.body.offsetHeight,a.style.maxHeight=`${o}px`,a.style.height=`${Math.max(te,o)}px`};H?(H(),H=null,d()):H=d}}function Ee(){const t=q.value;if(t){t.style.maxHeight="",t.style.height="";const{paneWrapperStyle:a}=e;if(typeof a=="string")t.style.cssText=a;else if(a){const{maxHeight:o,height:d}=a;o!==void 0&&(t.style.maxHeight=o),d!==void 0&&(t.style.height=d)}}}const ve={value:[]},ge=E("next");function _e(t){const a=A.value;let o="next";for(const d of ve.value){if(d===a)break;if(d===t){o="prev";break}}ge.value=o,ke(t)}function ke(t){const{onActiveNameChange:a,onUpdateValue:o,"onUpdate:value":d}=e;a&&Q(a,t),o&&Q(o,t),d&&Q(d,t),V.value=t}function je(t){const{onClose:a}=e;a&&Q(a,t)}function he(){const{value:t}=x;if(!t)return;const a="transition-disabled";t.classList.add(a),Y(),t.classList.remove(a)}const O=E(null);function ae({transitionDisabled:t}){const a=h.value;if(!a)return;t&&a.classList.add("transition-disabled");const o=z();o&&O.value&&(O.value.style.width=`${o.offsetWidth}px`,O.value.style.height=`${o.offsetHeight}px`,O.value.style.transform=`translateX(${o.offsetLeft-kt(getComputedStyle(a).paddingLeft)}px)`,t&&O.value.offsetWidth),t&&a.classList.remove("transition-disabled")}ie([A],()=>{e.type==="segment"&&se(()=>{ae({transitionDisabled:!1})})}),Bt(()=>{e.type==="segment"&&ae({transitionDisabled:!0})});let xe=0;function Me(t){var a;if(t.contentRect.width===0&&t.contentRect.height===0||xe===t.contentRect.width)return;xe=t.contentRect.width;const{type:o}=e;if((o==="line"||o==="bar")&&he(),o!=="segment"){const{placement:d}=e;re((d==="top"||d==="bottom"?(a=g.value)===null||a===void 0?void 0:a.$el:T.value)||null)}}const He=de(Me,64);ie([()=>e.justifyContent,()=>e.size],()=>{se(()=>{const{type:t}=e;(t==="line"||t==="bar")&&he()})});const F=E(!1);function Ve(t){var a;const{target:o,contentRect:{width:d,height:w}}=t,_=o.parentElement.parentElement.offsetWidth,k=o.parentElement.parentElement.offsetHeight,{placement:D}=e;if(!F.value)D==="top"||D==="bottom"?_<d&&(F.value=!0):k<w&&(F.value=!0);else{const{value:N}=P;if(!N)return;D==="top"||D==="bottom"?_-d>N.$el.offsetWidth&&(F.value=!1):k-w>N.$el.offsetHeight&&(F.value=!1)}re(((a=g.value)===null||a===void 0?void 0:a.$el)||null)}const Ie=de(Ve,64);function Oe(){const{onAdd:t}=e;t&&t(),se(()=>{const a=z(),{value:o}=g;!a||!o||o.scrollTo({left:a.offsetLeft,top:0,behavior:"smooth"})})}function re(t){if(!t)return;const{placement:a}=e;if(a==="top"||a==="bottom"){const{scrollLeft:o,scrollWidth:d,offsetWidth:w}=t;S.value=o<=0,R.value=o+w>=d}else{const{scrollTop:o,scrollHeight:d,offsetHeight:w}=t;S.value=o<=0,R.value=o+w>=d}}const Fe=de(t=>{re(t.target)},64);Wt(fe,{triggerRef:j(e,"trigger"),tabStyleRef:j(e,"tabStyle"),tabClassRef:j(e,"tabClass"),addTabStyleRef:j(e,"addTabStyle"),addTabClassRef:j(e,"addTabClass"),paneClassRef:j(e,"paneClass"),paneStyleRef:j(e,"paneStyle"),mergedClsPrefixRef:v,typeRef:j(e,"type"),closableRef:j(e,"closable"),valueRef:A,tabChangeIdRef:u,onBeforeLeaveRef:j(e,"onBeforeLeave"),activateTab:_e,handleClose:je,handleAdd:Oe}),At(()=>{Y(),ue()}),Et(()=>{const{value:t}=L;if(!t)return;const{value:a}=v,o=`${a}-tabs-nav-scroll-wrapper--shadow-start`,d=`${a}-tabs-nav-scroll-wrapper--shadow-end`;S.value?t.classList.remove(o):t.classList.add(o),R.value?t.classList.remove(d):t.classList.add(d)});const Ge={syncBarPosition:()=>{Y()}},De=()=>{ae({transitionDisabled:!0})},me=Z(()=>{const{value:t}=W,{type:a}=e,o={card:"Card",bar:"Bar",line:"Line",segment:"Segment"}[a],d=`${t}${o}`,{self:{barColor:w,closeIconColor:_,closeIconColorHover:k,closeIconColorPressed:D,tabColor:N,tabBorderColor:Ne,paneTextColor:Xe,tabFontWeight:Ue,tabBorderRadius:Ye,tabFontWeightActive:qe,colorSegment:Ke,fontWeightStrong:Je,tabColorSegment:Qe,closeSize:Ze,closeIconSize:et,closeColorHover:tt,closeColorPressed:at,closeBorderRadius:rt,[M("panePadding",t)]:K,[M("tabPadding",d)]:nt,[M("tabPaddingVertical",d)]:ot,[M("tabGap",d)]:it,[M("tabGap",`${d}Vertical`)]:st,[M("tabTextColor",a)]:lt,[M("tabTextColorActive",a)]:dt,[M("tabTextColorHover",a)]:bt,[M("tabTextColorDisabled",a)]:ct,[M("tabFontSize",t)]:ft},common:{cubicBezierEaseInOut:pt}}=m.value;return{"--n-bezier":pt,"--n-color-segment":Ke,"--n-bar-color":w,"--n-tab-font-size":ft,"--n-tab-text-color":lt,"--n-tab-text-color-active":dt,"--n-tab-text-color-disabled":ct,"--n-tab-text-color-hover":bt,"--n-pane-text-color":Xe,"--n-tab-border-color":Ne,"--n-tab-border-radius":Ye,"--n-close-size":Ze,"--n-close-icon-size":et,"--n-close-color-hover":tt,"--n-close-color-pressed":at,"--n-close-border-radius":rt,"--n-close-icon-color":_,"--n-close-icon-color-hover":k,"--n-close-icon-color-pressed":D,"--n-tab-color":N,"--n-tab-font-weight":Ue,"--n-tab-font-weight-active":qe,"--n-tab-padding":nt,"--n-tab-padding-vertical":ot,"--n-tab-gap":it,"--n-tab-gap-vertical":st,"--n-pane-padding-left":J(K,"left"),"--n-pane-padding-right":J(K,"right"),"--n-pane-padding-top":J(K,"top"),"--n-pane-padding-bottom":J(K,"bottom"),"--n-font-weight-strong":Je,"--n-tab-color-segment":Qe}}),G=p?_t("tabs",Z(()=>`${W.value[0]}${e.type[0]}`),me,e):void 0;return Object.assign({mergedClsPrefix:v,mergedValue:A,renderedNames:new Set,segmentCapsuleElRef:O,tabsPaneWrapperRef:q,tabsElRef:h,barElRef:x,addTabInstRef:P,xScrollInstRef:g,scrollWrapperElRef:L,addTabFixed:F,tabWrapperStyle:c,handleNavResize:He,mergedSize:W,handleScroll:Fe,handleTabsResize:Ie,cssVars:p?void 0:me,themeClass:G==null?void 0:G.themeClass,animationDirection:ge,renderNameListRef:ve,yScrollElRef:T,handleSegmentResize:De,onAnimationBeforeLeave:We,onAnimationEnter:Ae,onAnimationAfterEnter:Ee,onRender:G==null?void 0:G.onRender},Ge)},render(){const{mergedClsPrefix:e,type:n,placement:i,addTabFixed:f,addable:l,mergedSize:y,renderNameListRef:v,onRender:p,paneWrapperClass:m,paneWrapperStyle:h,$slots:{default:x,prefix:L,suffix:P}}=this;p==null||p();const g=x?ne(x()).filter(u=>u.type.__TAB_PANE__===!0):[],T=x?ne(x()).filter(u=>u.type.__TAB__===!0):[],S=!T.length,R=n==="card",W=n==="segment",B=!R&&!W&&this.justifyContent;v.value=[];const V=()=>{const u=b("div",{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},B?null:b("div",{class:`${e}-tabs-scroll-padding`,style:i==="top"||i==="bottom"?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),S?g.map((c,z)=>(v.value.push(c.props.name),be(b(ce,Object.assign({},c.props,{internalCreatedByPane:!0,internalLeftPadded:z!==0&&(!B||B==="center"||B==="start"||B==="end")}),c.children?{default:c.children.tab}:void 0)))):T.map((c,z)=>(v.value.push(c.props.name),be(z!==0&&!B?ze(c):c))),!f&&l&&R?Re(l,(S?g.length:T.length)!==0):null,B?null:b("div",{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return b("div",{ref:"tabsElRef",class:`${e}-tabs-nav-scroll-content`},R&&l?b(oe,{onResize:this.handleTabsResize},{default:()=>u}):u,R?b("div",{class:`${e}-tabs-pad`}):null,R?null:b("div",{ref:"barElRef",class:`${e}-tabs-bar`}))},A=W?"top":i;return b("div",{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${n}-type`,`${e}-tabs--${y}-size`,B&&`${e}-tabs--flex`,`${e}-tabs--${A}`],style:this.cssVars},b("div",{class:[`${e}-tabs-nav--${n}-type`,`${e}-tabs-nav--${A}`,`${e}-tabs-nav`]},Ce(L,u=>u&&b("div",{class:`${e}-tabs-nav__prefix`},u)),W?b(oe,{onResize:this.handleSegmentResize},{default:()=>b("div",{class:`${e}-tabs-rail`,ref:"tabsElRef"},b("div",{class:`${e}-tabs-capsule`,ref:"segmentCapsuleElRef"},b("div",{class:`${e}-tabs-wrapper`},b("div",{class:`${e}-tabs-tab`}))),S?g.map((u,c)=>(v.value.push(u.props.name),b(ce,Object.assign({},u.props,{internalCreatedByPane:!0,internalLeftPadded:c!==0}),u.children?{default:u.children.tab}:void 0))):T.map((u,c)=>(v.value.push(u.props.name),c===0?u:ze(u))))}):b(oe,{onResize:this.handleNavResize},{default:()=>b("div",{class:`${e}-tabs-nav-scroll-wrapper`,ref:"scrollWrapperElRef"},["top","bottom"].includes(A)?b(Ot,{ref:"xScrollInstRef",onScroll:this.handleScroll},{default:V}):b("div",{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:"yScrollElRef"},V()))}),f&&l&&R?Re(l,!0):null,Ce(P,u=>u&&b("div",{class:`${e}-tabs-nav__suffix`},u))),S&&(this.animated&&(A==="top"||A==="bottom")?b("div",{ref:"tabsPaneWrapperRef",style:h,class:[`${e}-tabs-pane-wrapper`,m]},Pe(g,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):Pe(g,this.mergedValue,this.renderedNames)))}});function Pe(e,n,i,f,l,y,v){const p=[];return e.forEach(m=>{const{name:h,displayDirective:x,"display-directive":L}=m.props,P=T=>x===T||L===T,g=n===h;if(m.key!==void 0&&(m.key=h),g||P("show")||P("show:lazy")&&i.has(h)){i.has(h)||i.add(h);const T=!P("if");p.push(T?jt(m,[[Mt,g]]):m)}}),v?b(Ht,{name:`${v}-transition`,onBeforeLeave:f,onEnter:l,onAfterEnter:y},{default:()=>p}):p}function Re(e,n){return b(ce,{ref:"addTabInstRef",key:"__addable",name:"__addable",internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:n,disabled:typeof e=="object"&&e.disabled})}function ze(e){const n=Vt(e);return n.props?n.props.internalLeftPadded=!0:n.props={internalLeftPadded:!0},n}function be(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes("internalLeftPadded")||e.dynamicProps.push("internalLeftPadded"):e.dynamicProps=["internalLeftPadded"],e}export{ba as N,ca as a};
