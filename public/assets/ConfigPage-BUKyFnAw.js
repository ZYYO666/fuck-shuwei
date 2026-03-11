import{h as to,i as F,j as n,k as ao,l as no,m as b,n as L,p as pe,q as ro,r as lo,s as m,B as io,V as so,t as co,v as uo,x as le,T as ho,y as fo,z as Re,A as S,g as y,C as vo,D as mo,E as xe,F as ne,G as bo,H as we,I as go,J as K,K as X,L as Y,f as po,c as xo,o as Se,a as $,b as g,w as C,d as ye,u as c,M as wo,e as yo}from"./index-D5a-Ui4h.js";import{u as ko,B as Co,N as re}from"./Button-DyAZFAX1.js";import{N as Ro,a as So,b as W}from"./Grid-COw-IBpB.js";import{N as zo,a as To}from"./Card-CBbKfsjX.js";import"./get-slot-Bk_rJcZu.js";const Vo={railHeight:"4px",railWidthVertical:"4px",handleSize:"18px",dotHeight:"8px",dotWidth:"8px",dotBorderRadius:"4px"};function Bo(a){const r="rgba(0, 0, 0, .85)",p="0 2px 8px 0 rgba(0, 0, 0, 0.12)",{railColor:h,primaryColor:l,baseColor:s,cardColor:B,modalColor:z,popoverColor:G,borderRadius:q,fontSize:N,opacityDisabled:_}=a;return Object.assign(Object.assign({},Vo),{fontSize:N,markFontSize:N,railColor:h,railColorHover:h,fillColor:l,fillColorHover:l,opacityDisabled:_,handleColor:"#FFF",dotColor:B,dotColorModal:z,dotColorPopover:G,handleBoxShadow:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",handleBoxShadowHover:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",handleBoxShadowActive:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",handleBoxShadowFocus:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",indicatorColor:r,indicatorBoxShadow:p,indicatorTextColor:s,indicatorBorderRadius:q,dotBorder:`2px solid ${h}`,dotBorderActive:`2px solid ${l}`,dotBoxShadow:""})}const Do={common:to,self:Bo},Mo=F([n("slider",`
 display: block;
 padding: calc((var(--n-handle-size) - var(--n-rail-height)) / 2) 0;
 position: relative;
 z-index: 0;
 width: 100%;
 cursor: pointer;
 user-select: none;
 -webkit-user-select: none;
 `,[b("reverse",[n("slider-handles",[n("slider-handle-wrapper",`
 transform: translate(50%, -50%);
 `)]),n("slider-dots",[n("slider-dot",`
 transform: translateX(50%, -50%);
 `)]),b("vertical",[n("slider-handles",[n("slider-handle-wrapper",`
 transform: translate(-50%, -50%);
 `)]),n("slider-marks",[n("slider-mark",`
 transform: translateY(calc(-50% + var(--n-dot-height) / 2));
 `)]),n("slider-dots",[n("slider-dot",`
 transform: translateX(-50%) translateY(0);
 `)])])]),b("vertical",`
 box-sizing: content-box;
 padding: 0 calc((var(--n-handle-size) - var(--n-rail-height)) / 2);
 width: var(--n-rail-width-vertical);
 height: 100%;
 `,[n("slider-handles",`
 top: calc(var(--n-handle-size) / 2);
 right: 0;
 bottom: calc(var(--n-handle-size) / 2);
 left: 0;
 `,[n("slider-handle-wrapper",`
 top: unset;
 left: 50%;
 transform: translate(-50%, 50%);
 `)]),n("slider-rail",`
 height: 100%;
 `,[L("fill",`
 top: unset;
 right: 0;
 bottom: unset;
 left: 0;
 `)]),b("with-mark",`
 width: var(--n-rail-width-vertical);
 margin: 0 32px 0 8px;
 `),n("slider-marks",`
 top: calc(var(--n-handle-size) / 2);
 right: unset;
 bottom: calc(var(--n-handle-size) / 2);
 left: 22px;
 font-size: var(--n-mark-font-size);
 `,[n("slider-mark",`
 transform: translateY(50%);
 white-space: nowrap;
 `)]),n("slider-dots",`
 top: calc(var(--n-handle-size) / 2);
 right: unset;
 bottom: calc(var(--n-handle-size) / 2);
 left: 50%;
 `,[n("slider-dot",`
 transform: translateX(-50%) translateY(50%);
 `)])]),b("disabled",`
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `,[n("slider-handle",`
 cursor: not-allowed;
 `)]),b("with-mark",`
 width: 100%;
 margin: 8px 0 32px 0;
 `),F("&:hover",[n("slider-rail",{backgroundColor:"var(--n-rail-color-hover)"},[L("fill",{backgroundColor:"var(--n-fill-color-hover)"})]),n("slider-handle",{boxShadow:"var(--n-handle-box-shadow-hover)"})]),b("active",[n("slider-rail",{backgroundColor:"var(--n-rail-color-hover)"},[L("fill",{backgroundColor:"var(--n-fill-color-hover)"})]),n("slider-handle",{boxShadow:"var(--n-handle-box-shadow-hover)"})]),n("slider-marks",`
 position: absolute;
 top: 18px;
 left: calc(var(--n-handle-size) / 2);
 right: calc(var(--n-handle-size) / 2);
 `,[n("slider-mark",`
 position: absolute;
 transform: translateX(-50%);
 white-space: nowrap;
 `)]),n("slider-rail",`
 width: 100%;
 position: relative;
 height: var(--n-rail-height);
 background-color: var(--n-rail-color);
 transition: background-color .3s var(--n-bezier);
 border-radius: calc(var(--n-rail-height) / 2);
 `,[L("fill",`
 position: absolute;
 top: 0;
 bottom: 0;
 border-radius: calc(var(--n-rail-height) / 2);
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-fill-color);
 `)]),n("slider-handles",`
 position: absolute;
 top: 0;
 right: calc(var(--n-handle-size) / 2);
 bottom: 0;
 left: calc(var(--n-handle-size) / 2);
 `,[n("slider-handle-wrapper",`
 outline: none;
 position: absolute;
 top: 50%;
 transform: translate(-50%, -50%);
 cursor: pointer;
 display: flex;
 `,[n("slider-handle",`
 height: var(--n-handle-size);
 width: var(--n-handle-size);
 border-radius: 50%;
 overflow: hidden;
 transition: box-shadow .2s var(--n-bezier), background-color .3s var(--n-bezier);
 background-color: var(--n-handle-color);
 box-shadow: var(--n-handle-box-shadow);
 `,[F("&:hover",`
 box-shadow: var(--n-handle-box-shadow-hover);
 `)]),F("&:focus",[n("slider-handle",`
 box-shadow: var(--n-handle-box-shadow-focus);
 `,[F("&:hover",`
 box-shadow: var(--n-handle-box-shadow-active);
 `)])])])]),n("slider-dots",`
 position: absolute;
 top: 50%;
 left: calc(var(--n-handle-size) / 2);
 right: calc(var(--n-handle-size) / 2);
 `,[b("transition-disabled",[n("slider-dot","transition: none;")]),n("slider-dot",`
 transition:
 border-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 transform: translate(-50%, -50%);
 height: var(--n-dot-height);
 width: var(--n-dot-width);
 border-radius: var(--n-dot-border-radius);
 overflow: hidden;
 box-sizing: border-box;
 border: var(--n-dot-border);
 background-color: var(--n-dot-color);
 `,[b("active","border: var(--n-dot-border-active);")])])]),n("slider-handle-indicator",`
 font-size: var(--n-font-size);
 padding: 6px 10px;
 border-radius: var(--n-indicator-border-radius);
 color: var(--n-indicator-text-color);
 background-color: var(--n-indicator-color);
 box-shadow: var(--n-indicator-box-shadow);
 `,[pe()]),n("slider-handle-indicator",`
 font-size: var(--n-font-size);
 padding: 6px 10px;
 border-radius: var(--n-indicator-border-radius);
 color: var(--n-indicator-text-color);
 background-color: var(--n-indicator-color);
 box-shadow: var(--n-indicator-box-shadow);
 `,[b("top",`
 margin-bottom: 12px;
 `),b("right",`
 margin-left: 12px;
 `),b("bottom",`
 margin-top: 12px;
 `),b("left",`
 margin-right: 12px;
 `),pe()]),ao(n("slider",[n("slider-dot","background-color: var(--n-dot-color-modal);")])),no(n("slider",[n("slider-dot","background-color: var(--n-dot-color-popover);")]))]);function ke(a){return window.TouchEvent&&a instanceof window.TouchEvent}function Ce(){const a=new Map,r=p=>h=>{a.set(p,h)};return ro(()=>{a.clear()}),[a,r]}const $o=0,Fo=Object.assign(Object.assign({},Re.props),{to:le.propTo,defaultValue:{type:[Number,Array],default:0},marks:Object,disabled:{type:Boolean,default:void 0},formatTooltip:Function,keyboard:{type:Boolean,default:!0},min:{type:Number,default:0},max:{type:Number,default:100},step:{type:[Number,String],default:1},range:Boolean,value:[Number,Array],placement:String,showTooltip:{type:Boolean,default:void 0},tooltip:{type:Boolean,default:!0},vertical:Boolean,reverse:Boolean,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onDragstart:[Function],onDragend:[Function]}),No=lo({name:"Slider",props:Fo,slots:Object,setup(a){const{mergedClsPrefixRef:r,namespaceRef:p,inlineThemeDisabled:h}=fo(a),l=Re("Slider","-slider",Mo,Do,a,r),s=S(null),[B,z]=Ce(),[G,q]=Ce(),N=S(new Set),_=ko(a),{mergedDisabledRef:H}=_,ie=y(()=>{const{step:e}=a;if(Number(e)<=0||e==="mark")return 0;const o=e.toString();let t=0;return o.includes(".")&&(t=o.length-o.indexOf(".")-1),t}),J=S(a.defaultValue),ze=vo(a,"value"),Q=mo(ze,J),x=y(()=>{const{value:e}=Q;return(a.range?e:[e]).map(ve)}),se=y(()=>x.value.length>2),Te=y(()=>a.placement===void 0?a.vertical?"right":"top":a.placement),de=y(()=>{const{marks:e}=a;return e?Object.keys(e).map(Number.parseFloat):null}),w=S(-1),ce=S(-1),T=S(-1),V=S(!1),I=S(!1),Z=y(()=>{const{vertical:e,reverse:o}=a;return e?o?"top":"bottom":o?"right":"left"}),Ve=y(()=>{if(se.value)return;const e=x.value,o=A(a.range?Math.min(...e):a.min),t=A(a.range?Math.max(...e):e[0]),{value:i}=Z;return a.vertical?{[i]:`${o}%`,height:`${t-o}%`}:{[i]:`${o}%`,width:`${t-o}%`}}),Be=y(()=>{const e=[],{marks:o}=a;if(o){const t=x.value.slice();t.sort((v,f)=>v-f);const{value:i}=Z,{value:d}=se,{range:u}=a,k=d?()=>!1:v=>u?v>=t[0]&&v<=t[t.length-1]:v<=t[0];for(const v of Object.keys(o)){const f=Number(v);e.push({active:k(f),key:f,label:o[v],style:{[i]:`${A(f)}%`}})}}return e});function De(e,o){const t=A(e),{value:i}=Z;return{[i]:`${t}%`,zIndex:o===w.value?1:0}}function ue(e){return a.showTooltip||T.value===e||w.value===e&&V.value}function Me(e){return V.value?!(w.value===e&&ce.value===e):!0}function $e(e){var o;~e&&(w.value=e,(o=B.get(e))===null||o===void 0||o.focus())}function Fe(){G.forEach((e,o)=>{ue(o)&&e.syncPosition()})}function he(e){const{"onUpdate:value":o,onUpdateValue:t}=a,{nTriggerFormInput:i,nTriggerFormChange:d}=_;t&&K(t,e),o&&K(o,e),J.value=e,i(),d()}function fe(e){const{range:o}=a;if(o){if(Array.isArray(e)){const{value:t}=x;e.join()!==t.join()&&he(e)}}else Array.isArray(e)||x.value[0]!==e&&he(e)}function ee(e,o){if(a.range){const t=x.value.slice();t.splice(o,1,e),fe(t)}else fe(e)}function oe(e,o,t){const i=t!==void 0;t||(t=e-o>0?1:-1);const d=de.value||[],{step:u}=a;if(u==="mark"){const f=E(e,d.concat(o),i?t:void 0);return f?f.value:o}if(u<=0)return o;const{value:k}=ie;let v;if(i){const f=Number((o/u).toFixed(k)),R=Math.floor(f),te=f>R?R:R-1,ae=f<R?R:R+1;v=E(o,[Number((te*u).toFixed(k)),Number((ae*u).toFixed(k)),...d],t)}else{const f=_e(e);v=E(e,[...d,f])}return v?ve(v.value):o}function ve(e){return Math.min(a.max,Math.max(a.min,e))}function A(e){const{max:o,min:t}=a;return(e-t)/(o-t)*100}function Ne(e){const{max:o,min:t}=a;return t+(o-t)*e}function _e(e){const{step:o,min:t}=a;if(Number(o)<=0||o==="mark")return e;const i=Math.round((e-t)/o)*o+t;return Number(i.toFixed(ie.value))}function E(e,o=de.value,t){if(!(o!=null&&o.length))return null;let i=null,d=-1;for(;++d<o.length;){const u=o[d]-e,k=Math.abs(u);(t===void 0||u*t>0)&&(i===null||k<i.distance)&&(i={index:d,distance:k,value:o[d]})}return i}function me(e){const o=s.value;if(!o)return;const t=ke(e)?e.touches[0]:e,i=o.getBoundingClientRect();let d;return a.vertical?d=(i.bottom-t.clientY)/i.height:d=(t.clientX-i.left)/i.width,a.reverse&&(d=1-d),Ne(d)}function He(e){if(H.value||!a.keyboard)return;const{vertical:o,reverse:t}=a;switch(e.key){case"ArrowUp":e.preventDefault(),P(o&&t?-1:1);break;case"ArrowRight":e.preventDefault(),P(!o&&t?-1:1);break;case"ArrowDown":e.preventDefault(),P(o&&t?1:-1);break;case"ArrowLeft":e.preventDefault(),P(!o&&t?1:-1);break}}function P(e){const o=w.value;if(o===-1)return;const{step:t}=a,i=x.value[o],d=Number(t)<=0||t==="mark"?i:i+t*e;ee(oe(d,i,e>0?1:-1),o)}function Ie(e){var o,t;if(H.value||!ke(e)&&e.button!==$o)return;const i=me(e);if(i===void 0)return;const d=x.value.slice(),u=a.range?(t=(o=E(i,d))===null||o===void 0?void 0:o.index)!==null&&t!==void 0?t:-1:0;u!==-1&&(e.preventDefault(),$e(u),Ae(),ee(oe(i,x.value[u]),u))}function Ae(){V.value||(V.value=!0,a.onDragstart&&K(a.onDragstart),X("touchend",document,O),X("mouseup",document,O),X("touchmove",document,U),X("mousemove",document,U))}function j(){V.value&&(V.value=!1,a.onDragend&&K(a.onDragend),Y("touchend",document,O),Y("mouseup",document,O),Y("touchmove",document,U),Y("mousemove",document,U))}function U(e){const{value:o}=w;if(!V.value||o===-1){j();return}const t=me(e);t!==void 0&&ee(oe(t,x.value[o]),o)}function O(){j()}function Ee(e){w.value=e,H.value||(T.value=e)}function Pe(e){w.value===e&&(w.value=-1,j()),T.value===e&&(T.value=-1)}function je(e){T.value=e}function Ue(e){T.value===e&&(T.value=-1)}xe(w,(e,o)=>void ne(()=>ce.value=o)),xe(Q,()=>{if(a.marks){if(I.value)return;I.value=!0,ne(()=>{I.value=!1})}ne(Fe)}),bo(()=>{j()});const be=y(()=>{const{self:{markFontSize:e,railColor:o,railColorHover:t,fillColor:i,fillColorHover:d,handleColor:u,opacityDisabled:k,dotColor:v,dotColorModal:f,handleBoxShadow:R,handleBoxShadowHover:te,handleBoxShadowActive:ae,handleBoxShadowFocus:Oe,dotBorder:Le,dotBoxShadow:Ke,railHeight:Xe,railWidthVertical:Ye,handleSize:We,dotHeight:Ge,dotWidth:qe,dotBorderRadius:Je,fontSize:Qe,dotBorderActive:Ze,dotColorPopover:eo},common:{cubicBezierEaseInOut:oo}}=l.value;return{"--n-bezier":oo,"--n-dot-border":Le,"--n-dot-border-active":Ze,"--n-dot-border-radius":Je,"--n-dot-box-shadow":Ke,"--n-dot-color":v,"--n-dot-color-modal":f,"--n-dot-color-popover":eo,"--n-dot-height":Ge,"--n-dot-width":qe,"--n-fill-color":i,"--n-fill-color-hover":d,"--n-font-size":Qe,"--n-handle-box-shadow":R,"--n-handle-box-shadow-active":ae,"--n-handle-box-shadow-focus":Oe,"--n-handle-box-shadow-hover":te,"--n-handle-color":u,"--n-handle-size":We,"--n-opacity-disabled":k,"--n-rail-color":o,"--n-rail-color-hover":t,"--n-rail-height":Xe,"--n-rail-width-vertical":Ye,"--n-mark-font-size":e}}),D=h?we("slider",void 0,be,a):void 0,ge=y(()=>{const{self:{fontSize:e,indicatorColor:o,indicatorBoxShadow:t,indicatorTextColor:i,indicatorBorderRadius:d}}=l.value;return{"--n-font-size":e,"--n-indicator-border-radius":d,"--n-indicator-box-shadow":t,"--n-indicator-color":o,"--n-indicator-text-color":i}}),M=h?we("slider-indicator",void 0,ge,a):void 0;return{mergedClsPrefix:r,namespace:p,uncontrolledValue:J,mergedValue:Q,mergedDisabled:H,mergedPlacement:Te,isMounted:go(),adjustedTo:le(a),dotTransitionDisabled:I,markInfos:Be,isShowTooltip:ue,shouldKeepTooltipTransition:Me,handleRailRef:s,setHandleRefs:z,setFollowerRefs:q,fillStyle:Ve,getHandleStyle:De,activeIndex:w,arrifiedValues:x,followerEnabledIndexSet:N,handleRailMouseDown:Ie,handleHandleFocus:Ee,handleHandleBlur:Pe,handleHandleMouseEnter:je,handleHandleMouseLeave:Ue,handleRailKeyDown:He,indicatorCssVars:h?void 0:ge,indicatorThemeClass:M==null?void 0:M.themeClass,indicatorOnRender:M==null?void 0:M.onRender,cssVars:h?void 0:be,themeClass:D==null?void 0:D.themeClass,onRender:D==null?void 0:D.onRender}},render(){var a;const{mergedClsPrefix:r,themeClass:p,formatTooltip:h}=this;return(a=this.onRender)===null||a===void 0||a.call(this),m("div",{class:[`${r}-slider`,p,{[`${r}-slider--disabled`]:this.mergedDisabled,[`${r}-slider--active`]:this.activeIndex!==-1,[`${r}-slider--with-mark`]:this.marks,[`${r}-slider--vertical`]:this.vertical,[`${r}-slider--reverse`]:this.reverse}],style:this.cssVars,onKeydown:this.handleRailKeyDown,onMousedown:this.handleRailMouseDown,onTouchstart:this.handleRailMouseDown},m("div",{class:`${r}-slider-rail`},m("div",{class:`${r}-slider-rail__fill`,style:this.fillStyle}),this.marks?m("div",{class:[`${r}-slider-dots`,this.dotTransitionDisabled&&`${r}-slider-dots--transition-disabled`]},this.markInfos.map(l=>m("div",{key:l.key,class:[`${r}-slider-dot`,{[`${r}-slider-dot--active`]:l.active}],style:l.style}))):null,m("div",{ref:"handleRailRef",class:`${r}-slider-handles`},this.arrifiedValues.map((l,s)=>{const B=this.isShowTooltip(s);return m(io,null,{default:()=>[m(so,null,{default:()=>m("div",{ref:this.setHandleRefs(s),class:`${r}-slider-handle-wrapper`,tabindex:this.mergedDisabled?-1:0,role:"slider","aria-valuenow":l,"aria-valuemin":this.min,"aria-valuemax":this.max,"aria-orientation":this.vertical?"vertical":"horizontal","aria-disabled":this.disabled,style:this.getHandleStyle(l,s),onFocus:()=>{this.handleHandleFocus(s)},onBlur:()=>{this.handleHandleBlur(s)},onMouseenter:()=>{this.handleHandleMouseEnter(s)},onMouseleave:()=>{this.handleHandleMouseLeave(s)}},co(this.$slots.thumb,()=>[m("div",{class:`${r}-slider-handle`})]))}),this.tooltip&&m(uo,{ref:this.setFollowerRefs(s),show:B,to:this.adjustedTo,enabled:this.showTooltip&&!this.range||this.followerEnabledIndexSet.has(s),teleportDisabled:this.adjustedTo===le.tdkey,placement:this.mergedPlacement,containerClass:this.namespace},{default:()=>m(ho,{name:"fade-in-scale-up-transition",appear:this.isMounted,css:this.shouldKeepTooltipTransition(s),onEnter:()=>{this.followerEnabledIndexSet.add(s)},onAfterLeave:()=>{this.followerEnabledIndexSet.delete(s)}},{default:()=>{var z;return B?((z=this.indicatorOnRender)===null||z===void 0||z.call(this),m("div",{class:[`${r}-slider-handle-indicator`,this.indicatorThemeClass,`${r}-slider-handle-indicator--${this.mergedPlacement}`],style:this.indicatorCssVars},typeof h=="function"?h(l):l)):null}})})]})})),this.marks?m("div",{class:`${r}-slider-marks`},this.markInfos.map(l=>m("div",{key:l.key,class:`${r}-slider-mark`,style:l.style},typeof l.label=="function"?l.label():l.label))):null))}}),_o={class:"space-y-5"},Ho={class:"flex flex-wrap items-start justify-between gap-3"},Io={class:"flex items-center gap-2"},Ao={class:"w-full flex flex-wrap items-center gap-4"},Eo={__name:"ConfigView",setup(a){const r=po(),p=y({get:()=>Number(r.form.delay||0),set:h=>{r.form.delay=Number(h)}});return(h,l)=>(Se(),xo("div",_o,[$("div",Ho,[l[6]||(l[6]=$("div",null,[$("div",{class:"text-xl font-semibold tracking-wide"},"基础配置"),$("div",{class:"mt-1 text-sm text-slate-600"},"安全提示：账号密码仅保存在本地浏览器")],-1)),$("div",Io,[g(c(Co),{secondary:"",onClick:l[0]||(l[0]=s=>c(r).resetForm())},{default:C(()=>[...l[5]||(l[5]=[ye("重置",-1)])]),_:1})])]),g(c(To),null,{default:C(()=>[g(c(Ro),{model:c(r).form,"label-placement":"top",size:"large"},{default:C(()=>[g(c(So),{cols:12,"x-gap":16,"y-gap":14},{default:C(()=>[g(c(W),{span:12,label:"教务系统地址"},{default:C(()=>[g(c(re),{value:c(r).form.url,"onUpdate:value":l[1]||(l[1]=s=>c(r).form.url=s),placeholder:"例如 https://xxx.edu.cn"},null,8,["value"])]),_:1}),g(c(W),{span:6,label:"学号"},{default:C(()=>[g(c(re),{value:c(r).form.username,"onUpdate:value":l[2]||(l[2]=s=>c(r).form.username=s),placeholder:"请输入学号"},null,8,["value"])]),_:1}),g(c(W),{span:6,label:"密码"},{default:C(()=>[g(c(re),{value:c(r).form.password,"onUpdate:value":l[3]||(l[3]=s=>c(r).form.password=s),type:"password",placeholder:"请输入密码","show-password-on":"click"},null,8,["value"])]),_:1}),g(c(W),{span:12,label:"请求延迟（ms）"},{default:C(()=>[$("div",Ao,[g(c(No),{value:p.value,"onUpdate:value":l[4]||(l[4]=s=>p.value=s),min:0,max:2e3,step:100,class:"flex-1"},null,8,["value"]),g(c(zo),{bordered:!1,type:"info"},{default:C(()=>[ye(wo(p.value)+"ms",1)]),_:1})])]),_:1})]),_:1})]),_:1},8,["model"])]),_:1})]))}},Ko={__name:"ConfigPage",setup(a){return(r,p)=>(Se(),yo(Eo))}};export{Ko as default};
