(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[57],{229:function(t,e,n){"use strict";n.r(e),n.d(e,"ion_menu",(function(){return l})),n.d(e,"ion_menu_button",(function(){return v})),n.d(e,"ion_menu_toggle",(function(){return y}));var i=n(1),o=n(36),r=n(26),a=n(40),s=(n(8),n(105)),d=n(65),c=(n(64),n(106)),h=n(280),l=function(){function t(t){Object(o.l)(this,t),this.lastOnEnd=0,this.blocker=d.a.createBlocker({disableScroll:!0}),this.isAnimating=!1,this._isOpen=!1,this.isPaneVisible=!1,this.isEndSide=!1,this.disabled=!1,this.side="start",this.swipeGesture=!0,this.maxEdgeStart=50,this.ionWillOpen=Object(o.e)(this,"ionWillOpen",7),this.ionWillClose=Object(o.e)(this,"ionWillClose",7),this.ionDidOpen=Object(o.e)(this,"ionDidOpen",7),this.ionDidClose=Object(o.e)(this,"ionDidClose",7),this.ionMenuChange=Object(o.e)(this,"ionMenuChange",7)}return t.prototype.typeChanged=function(t,e){var n=this.contentEl;n&&(void 0!==e&&n.classList.remove("menu-content-"+e),n.classList.add("menu-content-"+t),n.removeAttribute("style")),this.menuInnerEl&&this.menuInnerEl.removeAttribute("style"),this.animation=void 0},t.prototype.disabledChanged=function(){this.updateState(),this.ionMenuChange.emit({disabled:this.disabled,open:this._isOpen})},t.prototype.sideChanged=function(){this.isEndSide=Object(a.i)(this.side)},t.prototype.swipeGestureChanged=function(){this.updateState()},t.prototype.connectedCallback=function(){return Object(i.b)(this,void 0,void 0,(function(){var t,e,o,a,s=this;return Object(i.d)(this,(function(i){switch(i.label){case 0:return void 0===this.type&&(this.type=r.c.get("menuType","overlay")),t=this.el,e=t.parentNode,void 0===this.contentId&&console.warn('[DEPRECATED][ion-menu] Using the [main] attribute is deprecated, please use the "contentId" property instead:\nBEFORE:\n  <ion-menu>...</ion-menu>\n  <div main>...</div>\n\nAFTER:\n  <ion-menu contentId="main-content"></ion-menu>\n  <div id="main-content">...</div>\n'),(o=void 0!==this.contentId?document.getElementById(this.contentId):e&&e.querySelector&&e.querySelector("[main]"))&&o.tagName?(this.contentEl=o,o.classList.add("menu-content"),this.typeChanged(this.type,void 0),this.sideChanged(),c.a._register(this),a=this,[4,Promise.resolve().then(n.bind(null,103))]):(console.error('Menu: must have a "content" element to listen for drag events on.'),[2]);case 1:return a.gesture=i.sent().createGesture({el:document,gestureName:"menu-swipe",gesturePriority:30,threshold:10,blurOnStart:!0,canStart:function(t){return s.canStart(t)},onWillStart:function(){return s.onWillStart()},onStart:function(){return s.onStart()},onMove:function(t){return s.onMove(t)},onEnd:function(t){return s.onEnd(t)}}),this.updateState(),[2]}}))}))},t.prototype.componentDidLoad=function(){return Object(i.b)(this,void 0,void 0,(function(){return Object(i.d)(this,(function(t){return this.ionMenuChange.emit({disabled:this.disabled,open:this._isOpen}),this.updateState(),[2]}))}))},t.prototype.disconnectedCallback=function(){this.blocker.destroy(),c.a._unregister(this),this.animation&&this.animation.destroy(),this.gesture&&(this.gesture.destroy(),this.gesture=void 0),this.animation=void 0,this.contentEl=this.backdropEl=this.menuInnerEl=void 0},t.prototype.onSplitPaneChanged=function(t){this.isPaneVisible=t.detail.isPane(this.el),this.updateState()},t.prototype.onBackdropClick=function(t){this._isOpen&&this.lastOnEnd<t.timeStamp-100&&(!!t.composedPath&&!t.composedPath().includes(this.menuInnerEl)&&(t.preventDefault(),t.stopPropagation(),this.close()))},t.prototype.isOpen=function(){return Promise.resolve(this._isOpen)},t.prototype.isActive=function(){return Promise.resolve(this._isActive())},t.prototype.open=function(t){return void 0===t&&(t=!0),this.setOpen(!0,t)},t.prototype.close=function(t){return void 0===t&&(t=!0),this.setOpen(!1,t)},t.prototype.toggle=function(t){return void 0===t&&(t=!0),this.setOpen(!this._isOpen,t)},t.prototype.setOpen=function(t,e){return void 0===e&&(e=!0),c.a._setOpen(this,t,e)},t.prototype._setOpen=function(t,e){return void 0===e&&(e=!0),Object(i.b)(this,void 0,void 0,(function(){return Object(i.d)(this,(function(n){switch(n.label){case 0:return!this._isActive()||this.isAnimating||t===this._isOpen?[2,!1]:(this.beforeAnimation(t),[4,this.loadAnimation()]);case 1:return n.sent(),[4,this.startAnimation(t,e)];case 2:return n.sent(),this.afterAnimation(t),[2,!0]}}))}))},t.prototype.loadAnimation=function(){return Object(i.b)(this,void 0,void 0,(function(){var t,e;return Object(i.d)(this,(function(n){switch(n.label){case 0:return(t=this.menuInnerEl.offsetWidth)===this.width&&void 0!==this.animation?[2]:(this.width=t,this.animation&&(this.animation.destroy(),this.animation=void 0),e=this,[4,c.a._createAnimation(this.type,this)]);case 1:return e.animation=n.sent(),r.c.getBoolean("animated",!0)||this.animation.duration(0),this.animation.fill("both"),[2]}}))}))},t.prototype.startAnimation=function(t,e){return Object(i.b)(this,void 0,void 0,(function(){var n,o,a,s,d;return Object(i.d)(this,(function(i){switch(i.label){case 0:return n=!t,o=Object(r.b)(this),a="ios"===o?"cubic-bezier(0.32,0.72,0,1)":"cubic-bezier(0.0,0.0,0.2,1)",s="ios"===o?"cubic-bezier(1, 0, 0.68, 0.28)":"cubic-bezier(0.4, 0, 0.6, 1)",d=this.animation.direction(n?"reverse":"normal").easing(n?s:a).onFinish((function(){"reverse"===d.getDirection()&&d.direction("normal")})),e?[4,d.play()]:[3,2];case 1:return i.sent(),[3,3];case 2:d.play({sync:!0}),i.label=3;case 3:return[2]}}))}))},t.prototype._isActive=function(){return!this.disabled&&!this.isPaneVisible},t.prototype.canSwipe=function(){return this.swipeGesture&&!this.isAnimating&&this._isActive()},t.prototype.canStart=function(t){return!(!!document.querySelector("ion-modal.show-modal")||!this.canSwipe())&&(!!this._isOpen||!c.a._getOpenSync()&&p(window,t.currentX,this.isEndSide,this.maxEdgeStart))},t.prototype.onWillStart=function(){return this.beforeAnimation(!this._isOpen),this.loadAnimation()},t.prototype.onStart=function(){this.isAnimating&&this.animation?this.animation.progressStart(!0,this._isOpen?1:0):Object(a.b)(!1,"isAnimating has to be true")},t.prototype.onMove=function(t){if(this.isAnimating&&this.animation){var e=u(t.deltaX,this._isOpen,this.isEndSide)/this.width;this.animation.progressStep(this._isOpen?1-e:e)}else Object(a.b)(!1,"isAnimating has to be true")},t.prototype.onEnd=function(t){var e=this;if(this.isAnimating&&this.animation){var n=this._isOpen,i=this.isEndSide,o=u(t.deltaX,n,i),r=this.width,d=o/r,c=t.velocityX,h=r/2,l=c>=0&&(c>.2||t.deltaX>h),p=c<=0&&(c<-.2||t.deltaX<-h),b=n?i?l:p:i?p:l,m=!n&&b;n&&!b&&(m=!0),this.lastOnEnd=t.currentTime;var f=b?.001:-.001,g=d<0?.01:d;f+=Object(s.a)([0,0],[.4,0],[.6,1],[1,1],Object(a.c)(0,g,.9999))[0]||0;var v=this._isOpen?!b:b;this.animation.easing("cubic-bezier(0.4, 0.0, 0.6, 1)").onFinish((function(){return e.afterAnimation(m)}),{oneTimeCallback:!0}).progressEnd(v?1:0,this._isOpen?1-f:f,300)}else Object(a.b)(!1,"isAnimating has to be true")},t.prototype.beforeAnimation=function(t){Object(a.b)(!this.isAnimating,"_before() should not be called while animating"),this.el.classList.add(b),this.backdropEl&&this.backdropEl.classList.add(m),this.blocker.block(),this.isAnimating=!0,t?this.ionWillOpen.emit():this.ionWillClose.emit()},t.prototype.afterAnimation=function(t){Object(a.b)(this.isAnimating,"_before() should be called while animating"),this._isOpen=t,this.isAnimating=!1,this._isOpen||this.blocker.unblock(),t?(this.contentEl&&this.contentEl.classList.add(f),this.ionDidOpen.emit()):(this.el.classList.remove(b),this.contentEl&&this.contentEl.classList.remove(f),this.backdropEl&&this.backdropEl.classList.remove(m),this.animation&&this.animation.stop(),this.ionDidClose.emit())},t.prototype.updateState=function(){var t=this._isActive();this.gesture&&this.gesture.enable(t&&this.swipeGesture),!t&&this._isOpen&&this.forceClosing(),this.disabled||c.a._setActiveMenu(this),Object(a.b)(!this.isAnimating,"can not be animating")},t.prototype.forceClosing=function(){Object(a.b)(this._isOpen,"menu cannot be closed"),this.isAnimating=!0,this.animation.direction("reverse").play({sync:!0}),this.afterAnimation(!1)},t.prototype.render=function(){var t,e=this,n=this.isEndSide,i=this.type,a=this.disabled,s=this.isPaneVisible,d=Object(r.b)(this);return Object(o.j)(o.b,{role:"navigation",class:(t={},t[d]=!0,t["menu-type-"+i]=!0,t["menu-enabled"]=!a,t["menu-side-end"]=n,t["menu-side-start"]=!n,t["menu-pane-visible"]=s,t)},Object(o.j)("div",{class:"menu-inner",part:"container",ref:function(t){return e.menuInnerEl=t}},Object(o.j)("slot",null)),Object(o.j)("ion-backdrop",{ref:function(t){return e.backdropEl=t},class:"menu-backdrop",tappable:!1,stopPropagation:!1,part:"backdrop"}))},Object.defineProperty(t.prototype,"el",{get:function(){return Object(o.g)(this)},enumerable:!1,configurable:!0}),Object.defineProperty(t,"watchers",{get:function(){return{type:["typeChanged"],disabled:["disabledChanged"],side:["sideChanged"],swipeGesture:["swipeGestureChanged"]}},enumerable:!1,configurable:!0}),t}(),u=function(t,e,n){return Math.max(0,e!==n?-t:t)},p=function(t,e,n,i){return n?e>=t.innerWidth-i:e<=i},b="show-menu",m="show-backdrop",f="menu-content-open";l.style={ios:":host{--width:304px;--min-width:auto;--max-width:auto;--height:100%;--min-height:auto;--max-height:auto;--background:var(--ion-background-color, #fff);left:0;right:0;top:0;bottom:0;display:none;position:absolute;contain:strict}:host(.show-menu){display:block}.menu-inner{left:0;right:auto;top:0;bottom:0;-webkit-transform:translate3d(-9999px,  0,  0);transform:translate3d(-9999px,  0,  0);display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:justify;justify-content:space-between;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);contain:strict}[dir=rtl] .menu-inner,:host-context([dir=rtl]) .menu-inner{left:unset;right:unset;left:auto;right:0}[dir=rtl] .menu-inner,:host-context([dir=rtl]) .menu-inner{-webkit-transform:translate3d(calc(-1 * -9999px),  0,  0);transform:translate3d(calc(-1 * -9999px),  0,  0)}:host(.menu-side-start) .menu-inner{--ion-safe-area-right:0px;right:auto;left:0}:host(.menu-side-end) .menu-inner{--ion-safe-area-left:0px;right:0;left:auto;}ion-backdrop{display:none;opacity:0.01;z-index:-1}@media (max-width: 340px){.menu-inner{--width:264px}}:host(.menu-type-reveal){z-index:0}:host(.menu-type-reveal.show-menu) .menu-inner{-webkit-transform:translate3d(0,  0,  0);transform:translate3d(0,  0,  0)}:host(.menu-type-overlay){z-index:1000}:host(.menu-type-overlay) .show-backdrop{display:block;cursor:pointer}:host(.menu-pane-visible){width:var(--width);min-width:var(--min-width);max-width:var(--max-width)}:host(.menu-pane-visible) .menu-inner{left:0;right:0;width:auto;-webkit-transform:none !important;transform:none !important;-webkit-box-shadow:none !important;box-shadow:none !important}:host(.menu-pane-visible) ion-backdrop{display:hidden !important;}:host(.menu-type-push){z-index:1000}:host(.menu-type-push) .show-backdrop{display:block}",md:":host{--width:304px;--min-width:auto;--max-width:auto;--height:100%;--min-height:auto;--max-height:auto;--background:var(--ion-background-color, #fff);left:0;right:0;top:0;bottom:0;display:none;position:absolute;contain:strict}:host(.show-menu){display:block}.menu-inner{left:0;right:auto;top:0;bottom:0;-webkit-transform:translate3d(-9999px,  0,  0);transform:translate3d(-9999px,  0,  0);display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:justify;justify-content:space-between;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);contain:strict}[dir=rtl] .menu-inner,:host-context([dir=rtl]) .menu-inner{left:unset;right:unset;left:auto;right:0}[dir=rtl] .menu-inner,:host-context([dir=rtl]) .menu-inner{-webkit-transform:translate3d(calc(-1 * -9999px),  0,  0);transform:translate3d(calc(-1 * -9999px),  0,  0)}:host(.menu-side-start) .menu-inner{--ion-safe-area-right:0px;right:auto;left:0}:host(.menu-side-end) .menu-inner{--ion-safe-area-left:0px;right:0;left:auto;}ion-backdrop{display:none;opacity:0.01;z-index:-1}@media (max-width: 340px){.menu-inner{--width:264px}}:host(.menu-type-reveal){z-index:0}:host(.menu-type-reveal.show-menu) .menu-inner{-webkit-transform:translate3d(0,  0,  0);transform:translate3d(0,  0,  0)}:host(.menu-type-overlay){z-index:1000}:host(.menu-type-overlay) .show-backdrop{display:block;cursor:pointer}:host(.menu-pane-visible){width:var(--width);min-width:var(--min-width);max-width:var(--max-width)}:host(.menu-pane-visible) .menu-inner{left:0;right:0;width:auto;-webkit-transform:none !important;transform:none !important;-webkit-box-shadow:none !important;box-shadow:none !important}:host(.menu-pane-visible) ion-backdrop{display:hidden !important;}:host(.menu-type-overlay) .menu-inner{-webkit-box-shadow:4px 0px 16px rgba(0, 0, 0, 0.18);box-shadow:4px 0px 16px rgba(0, 0, 0, 0.18)}"};var g=function(t){return Object(i.b)(void 0,void 0,void 0,(function(){var e,n;return Object(i.d)(this,(function(i){switch(i.label){case 0:return[4,c.a.get(t)];case 1:return e=i.sent(),(n=e)?[4,e.isActive()]:[3,3];case 2:n=i.sent(),i.label=3;case 3:return[2,!!n]}}))}))},v=function(){function t(t){var e=this;Object(o.l)(this,t),this.visible=!1,this.disabled=!1,this.autoHide=!0,this.type="button",this.onClick=function(){return Object(i.b)(e,void 0,void 0,(function(){return Object(i.d)(this,(function(t){return[2,c.a.toggle(this.menu)]}))}))}}return t.prototype.componentDidLoad=function(){this.visibilityChanged()},t.prototype.visibilityChanged=function(){return Object(i.b)(this,void 0,void 0,(function(){var t;return Object(i.d)(this,(function(e){switch(e.label){case 0:return t=this,[4,g(this.menu)];case 1:return t.visible=e.sent(),[2]}}))}))},t.prototype.render=function(){var t,e=this.color,n=this.disabled,i=Object(r.b)(this),a=r.c.get("menuIcon","ios"===i?"menu-outline":"menu-sharp"),s=this.autoHide&&!this.visible,d={type:this.type};return Object(o.j)(o.b,{onClick:this.onClick,"aria-disabled":n?"true":null,"aria-hidden":s?"true":null,class:Object.assign(Object.assign((t={},t[i]=!0,t),Object(h.a)(e)),{button:!0,"menu-button-hidden":s,"menu-button-disabled":n,"in-toolbar":Object(h.c)("ion-toolbar",this.el),"in-toolbar-color":Object(h.c)("ion-toolbar[color]",this.el),"ion-activatable":!0,"ion-focusable":!0})},Object(o.j)("button",Object.assign({},d,{disabled:n,class:"button-native",part:"native","aria-label":"menu"}),Object(o.j)("span",{class:"button-inner"},Object(o.j)("slot",null,Object(o.j)("ion-icon",{part:"icon",icon:a,mode:i,lazy:!1,"aria-hidden":"true"}))),"md"===i&&Object(o.j)("ion-ripple-effect",{type:"unbounded"})))},Object.defineProperty(t.prototype,"el",{get:function(){return Object(o.g)(this)},enumerable:!1,configurable:!0}),t}();v.style={ios:':host{--background:transparent;--color-focused:currentColor;--border-radius:initial;--padding-top:0;--padding-bottom:0;color:var(--color);text-align:center;text-decoration:none;text-overflow:ellipsis;text-transform:none;white-space:nowrap;-webkit-font-kerning:none;font-kerning:none}.button-native{border-radius:var(--border-radius);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:-ms-flexbox;display:flex;position:relative;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%;border:0;outline:none;background:var(--background);line-height:1;cursor:pointer;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:0;-webkit-appearance:none;-moz-appearance:none;appearance:none}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.button-native{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}.button-inner{display:-ms-flexbox;display:flex;position:relative;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%;z-index:1}ion-icon{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;pointer-events:none}:host(.menu-button-hidden){display:none}:host(.menu-button-disabled){cursor:default;opacity:0.5;pointer-events:none}:host(.ion-focused) .button-native{color:var(--color-focused)}:host(.ion-focused) .button-native::after{background:var(--background-focused);opacity:var(--background-focused-opacity)}.button-native::after{left:0;right:0;top:0;bottom:0;position:absolute;content:"";opacity:0}@media (any-hover: hover){:host(:hover) .button-native{color:var(--color-hover)}:host(:hover) .button-native::after{background:var(--background-hover);opacity:var(--background-hover-opacity, 0)}}:host(.ion-color) .button-native{color:var(--ion-color-base)}:host(.in-toolbar:not(.in-toolbar-color)){color:var(--ion-toolbar-color, var(--color))}:host{--background-focused:currentColor;--background-focused-opacity:.1;--border-radius:4px;--color:var(--ion-color-primary, #3880ff);--padding-start:5px;--padding-end:5px;height:32px;font-size:31px}:host(.ion-activated){opacity:0.4}@media (any-hover: hover){:host(:hover){opacity:0.6}}',md:':host{--background:transparent;--color-focused:currentColor;--border-radius:initial;--padding-top:0;--padding-bottom:0;color:var(--color);text-align:center;text-decoration:none;text-overflow:ellipsis;text-transform:none;white-space:nowrap;-webkit-font-kerning:none;font-kerning:none}.button-native{border-radius:var(--border-radius);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:-ms-flexbox;display:flex;position:relative;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%;border:0;outline:none;background:var(--background);line-height:1;cursor:pointer;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:0;-webkit-appearance:none;-moz-appearance:none;appearance:none}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.button-native{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}.button-inner{display:-ms-flexbox;display:flex;position:relative;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%;z-index:1}ion-icon{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;pointer-events:none}:host(.menu-button-hidden){display:none}:host(.menu-button-disabled){cursor:default;opacity:0.5;pointer-events:none}:host(.ion-focused) .button-native{color:var(--color-focused)}:host(.ion-focused) .button-native::after{background:var(--background-focused);opacity:var(--background-focused-opacity)}.button-native::after{left:0;right:0;top:0;bottom:0;position:absolute;content:"";opacity:0}@media (any-hover: hover){:host(:hover) .button-native{color:var(--color-hover)}:host(:hover) .button-native::after{background:var(--background-hover);opacity:var(--background-hover-opacity, 0)}}:host(.ion-color) .button-native{color:var(--ion-color-base)}:host(.in-toolbar:not(.in-toolbar-color)){color:var(--ion-toolbar-color, var(--color))}:host{--background-focused:currentColor;--background-focused-opacity:.12;--background-hover:currentColor;--background-hover-opacity:.04;--border-radius:50%;--color:initial;--padding-start:8px;--padding-end:8px;width:48px;height:48px;font-size:24px}:host(.ion-color.ion-focused)::after{background:var(--ion-color-base)}@media (any-hover: hover){:host(.ion-color:hover) .button-native::after{background:var(--ion-color-base)}}'};var y=function(){function t(t){var e=this;Object(o.l)(this,t),this.visible=!1,this.autoHide=!0,this.onClick=function(){return c.a.toggle(e.menu)}}return t.prototype.connectedCallback=function(){this.visibilityChanged()},t.prototype.visibilityChanged=function(){return Object(i.b)(this,void 0,void 0,(function(){var t;return Object(i.d)(this,(function(e){switch(e.label){case 0:return t=this,[4,g(this.menu)];case 1:return t.visible=e.sent(),[2]}}))}))},t.prototype.render=function(){var t,e=Object(r.b)(this),n=this.autoHide&&!this.visible;return Object(o.j)(o.b,{onClick:this.onClick,"aria-hidden":n?"true":null,class:(t={},t[e]=!0,t["menu-toggle-hidden"]=n,t)},Object(o.j)("slot",null))},t}();y.style=":host(.menu-toggle-hidden){display:none}"},280:function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"d",(function(){return d}));var i=n(1),o=function(t,e){return null!==e.closest(t)},r=function(t){var e;return"string"===typeof t&&t.length>0?((e={"ion-color":!0})["ion-color-"+t]=!0,e):void 0},a=function(t){var e={};return function(t){return void 0!==t?(Array.isArray(t)?t:t.split(" ")).filter((function(t){return null!=t})).map((function(t){return t.trim()})).filter((function(t){return""!==t})):[]}(t).forEach((function(t){return e[t]=!0})),e},s=/^[a-z][a-z0-9+\-.]*:/,d=function(t,e,n,o){return Object(i.b)(void 0,void 0,void 0,(function(){var r;return Object(i.d)(this,(function(i){return null!=t&&"#"!==t[0]&&!s.test(t)&&(r=document.querySelector("ion-router"))?(null!=e&&e.preventDefault(),[2,r.push(t,n,o)]):[2,!1]}))}))}}}]);
//# sourceMappingURL=57.b202ce9d.chunk.js.map