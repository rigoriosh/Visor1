// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

//>>built
require({ cache: { "url:themes/LaunchpadTheme/panels/LaunchpadPanel/Panel.html": '\x3cdiv\x3e\r\n  \x3cdiv class\x3d"title jimu-panel-title jimu-main-background" data-dojo-attach-point\x3d"titleNode"\x3e\r\n    \x3cdiv class\x3d"color-header" data-dojo-attach-point\x3d"colorfulHeader"\x3e\x3c/div\x3e\r\n    \x3cdiv class\x3d"widget-icon"\x3e\r\n      \x3cimg class\x3d"icon" src\x3d"${config.icon}" data-dojo-attach-point\x3d"iconNode"/\x3e\r\n    \x3c/div\x3e\r\n    \x3ch2 class\x3d"title-label" data-dojo-attach-point\x3d"titleLabelNode" data-dojo-attach-event\x3d"onkeydown:_onTitleLabelKeyDown" tabindex\x3d"-1"\x3e\r\n      ${config.label}\r\n    \x3c/h2\x3e\r\n    \x3cdiv class\x3d"btns-container"\x3e\r\n      \x3cdiv class\x3d"min-icon" data-dojo-attach-point\x3d"minNode" data-dojo-attach-event\x3d"onclick:_onMinNodeClick"\x3e-\x3c/div\x3e\r\n      \x3cdiv role\x3d"button" tabindex\x3d"0" class\x3d"max-icon" data-dojo-attach-point\x3d"maxNode"\r\n        data-dojo-attach-event\x3d"onclick:_onMaxNodeClick,onkeydown:_onMaxNodeKeydown" style\x3d"display:none"\x3e\x3c/div\x3e\r\n      \x3cdiv role\x3d"button" tabindex\x3d"0" class\x3d"close-icon" data-dojo-attach-point\x3d"closeNode"\r\n        data-dojo-attach-event\x3d"onclick:_onCloseBtnClicked,onkeydown:_onCloseBtnKeydown"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv class\x3d"jimu-panel-content" data-dojo-attach-point\x3d"containerNode"\x3e\x3c/div\x3e\r\n\x3c/div\x3e\r\n' } });
define("dojo/_base/declare dojo/_base/lang dojo/_base/html dojo/on dojo/keys dojo/dom-style dojo/dom-class dojo/dom-construct dojo/dom-geometry dojo/mouse dojo/_base/fx dojo/fx dojo/dnd/move dojo/Deferred dojox/layout/ResizeHandle jimu/utils jimu/BaseWidgetPanel dijit/_TemplatedMixin dojo/text!./Panel.html".split(" "), function (u, d, h, m, k, c, g, v, n, r, l, t, w, p, x, q, y, z, A) {
    return u([y, z], {
        baseClass: "jimu-panel jimu-launchpad-panel", templateString: A, titleHeight: 33, normalPosition: null, lastWindowState: null,
        openAnimation: "fadeIn", closeAnimation: "fadeOut", animationDuration: 400, _device: "desktop", postMixInProperties: function () { this.headerNls = window.jimuNls.panelHeader }, postCreate: function () {
            this.inherited(arguments); this._makeOriginalBox(); c.set(this.colorfulHeader, "background-color", this.config.backgroundColor || "#FFFFFF"); this.own(m(this.iconNode, r.enter, d.hitch(this, function () { "minimized" === this.windowState && this.disableMoveable() }))); this.own(m(this.iconNode, r.leave, d.hitch(this, function () {
                "minimized" ===
                this.windowState && this.makeMoveable(this.domNode, 40, 40)
            }))); this.own(m(this.iconNode, "click", d.hitch(this, function () { "minimized" === this.windowState && (this.panelManager.normalizePanel(this), c.set(this.domNode, "overflow", "visible")) })))
        }, startup: function () {            
            this.inherited(arguments); this.panelManager.normalizePanel(this); h.setAttr(this.domNode, "role", "dialog"); h.setAttr(this.domNode, "aria-label", this.label); h.setAttr(this.iconNode, "alt", this.config.label); h.setAttr(this.maxNode, "aria-label", this.headerNls.maxWindow);
            h.setAttr(this.closeNode, "aria-label", this.headerNls.closeWindow); this.own(m(this.domNode, "keydown", d.hitch(this, function (a) { h.hasClass(a.target, "close-btn") || a.keyCode !== k.ESCAPE || this.closeNode.focus() })))
        }, _makeOriginalBox: function () {            
             this._originalBox = { w: this.position.width || 350, h: this.position.height || 480, l: this.position.left || 0, t: this.position.top || 0 } }, makeMoveable: function (a, b, f) {
            this.disableMoveable(); var e = this._getLayoutBox(); e.l = e.l - b + f; e.w += 2 * (b - f); this.moveable = new w.boxConstrainedMoveable(this.domNode,
                { box: e, handle: a || this.titleNode, within: !0 }); this.own(m(this.moveable, "MoveStart", d.hitch(this, this.onMoveStart))); this.own(m(this.moveable, "Moving", d.hitch(this, this.onMoving))); this.own(m(this.moveable, "MoveStop", d.hitch(this, this.onMoveStop)))
        }, disableMoveable: function () { this.moveable && (this.moveable.destroy(), this.moveable = null) }, makeResizable: function () {
            this.disableResizable(); this.resizeHandle = (new x({ targetId: this, minWidth: this._originalBox.w, minHeight: this._originalBox.h, activeResize: !1 })).placeAt(this.domNode);
            this.resizeHandle.startup()
        }, disableResizable: function () { this.resizeHandle && (this.resizeHandle.destroy(), this.resizeHandle = null) }, onMoveStart: function (a) { if (window.isRTL) { var b = this._getLayoutBox(), f = n.getMarginBox(this.domNode), e = c.get(a.node, "right"); c.set(a.node, "left", b.w - f.w - parseInt(e, 10) + "px"); c.set(a.node, "right", "") } }, onMoving: function () { c.set(this.domNode, "opacity", .9) }, onMoveStop: function () {
            c.set(this.domNode, "opacity", 1); var a = n.getMarginBox(this.domNode); this.position.left = a.l; this.position.top =
                a.t
        }, _getLayoutBox: function () { return n.getMarginBox(jimuConfig.mapId) }, _onTitleLabelKeyDown: function (a) { a.shiftKey && a.keyCode === k.TAB && a.preventDefault() }, _onMinNodeClick: function () { this.panelManager.minimizePanel(this); c.set(this.domNode, "overflow", "hidden") }, _onMaxNodeClick: function () {
            "normal" === this.windowState ? (this.panelManager.maximizePanel(this), g.add(this.maxNode, "maximized"), h.setAttr(this.maxNode, "aria-label", this.headerNls.restoreWindow)) : "maximized" === this.windowState && (this.panelManager.normalizePanel(this),
                g.remove(this.maxNode, "maximized"), h.setAttr(this.maxNode, "aria-label", this.headerNls.maxWindow))
        }, _onMaxNodeKeydown: function (a) { a.keyCode === k.ENTER || a.keyCode === k.SPACE ? this._onMaxNodeClick() : a.keyCode === k.TAB && a.shiftKey && a.preventDefault() }, _onCloseBtnClicked: function (a) { a.stopPropagation(); this.panelManager.closePanel(this, "wipe") }, _onCloseBtnKeydown: function (a) {
            a.keyCode === k.ENTER || a.keyCode === k.SPACE ? this._onCloseBtnClicked(a) : a.keyCode === k.TAB && a.shiftKey && "none" === h.getStyle(this.maxNode,
                "display") && a.preventDefault()
        }, _minimize: function () {
            this.disableMoveable(); this.disableResizable(); var a = new p, b = []; b.push(l.animateProperty({ node: this.domNode, properties: { height: 40, width: 40 }, duration: this.animationDuration, onEnd: d.hitch(this, function () { c.set(this.containerNode, "display", "none"); c.set(this.domNode, "border-radius", "50%"); c.set(this.domNode, "-webkit-border-radius", "50%"); this.makeMoveable(this.domNode, 40, 40) }) })); b.push(l.animateProperty({
                node: this.titleNode, properties: {
                    height: 40,
                    width: 40, "background-color": this.config.backgroundColor
                }, duration: this.animationDuration, onEnd: d.hitch(this, function () { g.remove(this.titleNode, "jimu-main-background") })
            })); b.push(l.animateProperty({ node: this.iconNode, properties: { height: 20, width: 20 }, duration: this.animationDuration, onEnd: function () { a.resolve() } })); t.combine(b).play(); return a
        }, _maximize: function () {
            var a = this._getLayoutBox(), b = new p; l.animateProperty({
                node: this.domNode, properties: { top: 0, height: a.h, width: a.w }, duration: this.animationDuration,
                onEnd: function () { b.resolve() }
            }).play(); return b
        }, _normalize: function () {
            var a = new p, b = []; c.set(this.containerNode, "display", ""); c.set(this.domNode, "border-radius", ""); c.set(this.domNode, "-webkit-border-radius", ""); if (window.appInfo.isRunInMobile) { var f = this._getLayoutBox(); var e = f.w; b.push(l.animateProperty({ node: this.domNode, properties: { height: f.h / 2, width: e, left: 0, top: f.h / 2 }, duration: this.animationDuration, onEnd: function () { a.resolve() } })) } else e = this.position.width, b.push(l.animateProperty({
                node: this.domNode,
                properties: { height: this.position.height, width: e }, duration: this.animationDuration, onEnd: function () { a.resolve() }
            })); b.push(l.animateProperty({ node: this.titleNode, properties: { height: 30, width: e }, duration: this.animationDuration, onEnd: d.hitch(this, function () { c.set(this.titleNode, "background-color", ""); c.set(this.titleNode, "width", "100%"); g.add(this.titleNode, "jimu-main-background") }) })); b.push(l.animateProperty({ node: this.iconNode, properties: { height: 16, width: 16 }, duration: this.animationDuration })); t.combine(b).play();
            return a
        }, _setPositionStyle: function (a) { this.position.zIndex && (a.zIndex = this.position.zIndex); this.position.left = a.left; this.position.top = a.top; this.position.width = a.width; this.position.height = a.height; var b = q.getPositionStyle(a); d.mixin(b, a.borderRadiusStyle); c.set(this.domNode, b) }, onWindowResize: function () {
            var a = {}; if ("minimized" !== this.windowState) if (window.appInfo.isRunInMobile) {
                var b = this._getLayoutBox(); "maximized" === this.windowState ? (a.top = 0, a.height = b.h) : (a.top = b.h / 2, a.height = b.h / 2); c.set(this.domNode,
                    { left: 0, top: a.top + "px", right: 0, height: a.height + "px", width: "auto" }); this.resize(); "mobile" !== this._device && (this._device = "mobile", this._onResponsible())
            } else "desktop" !== this._device && (this._device = "desktop", a = d.clone(this.position), this.setWindowState("normal"), c.set(this.domNode, { left: a.left + "px", top: a.top + "px", height: a.height + "px", width: a.width + "px" }), this.resize(), this._onResponsible())
        }, setPosition: function (a) {
            var b = this._getLayoutBox(); var f = Math.floor(b.w / (a.width + a.margin)); var e = Math.floor(a.index /
                f); a.left = (e + 1) * a.margin + a.index % f * (a.width + a.margin) + 50; a.top -= a.margin * e; this.position = d.clone(a); window.appInfo.isRunInMobile && (a.left = 0, a.top = b.h / 2, a.width = b.w, a.height = b.h / 2); a = q.getPositionStyle(a); a.position = "absolute"; v.place(this.domNode, jimuConfig.mapId); c.set(this.domNode, a); this._onResponsible()
        }, onNormalize: function () {
            this.domNode && this.containerNode && this._normalize().then(d.hitch(this, function () {
                c.set(this.iconNode, "cursor", "default"); g.remove(this.domNode, "minimized"); g.remove(this.domNode,
                    "maximized"); this.resize(); this._onResponsible()
            }))
        }, onMinimize: function () { this.inherited(arguments); this._minimize().then(d.hitch(this, function () { c.set(this.iconNode, "cursor", "pointer"); g.remove(this.domNode, "maximized"); g.add(this.domNode, "minimized") })) }, onClose: function () { this.inherited(arguments); this.setWindowState("normal"); this.onNormalize() }, onMaximize: function () {
            this.inherited(arguments); this._maximize().then(d.hitch(this, function () {
                c.set(this.iconNode, "cursor", "default"); g.remove(this.domNode,
                    "minimized"); g.add(this.domNode, "maximized"); this.resize()
            }))
        }, resize: function (a) {
             if (a) { this.position = { left: a.l ? a.l : this.position.left, top: a.t ? a.t : this.position.top, width: a.w ? a.w : this.position.width, height: a.h ? a.h : this.position.height, zIndex: this.position.zIndex }; var b = q.getPositionStyle(this.position); window.isRTL && "right" in b && (b.left = b.right, b.right = ""); c.set(this.domNode, b) } this.inherited(arguments) }, _onResponsible: function () {
            window.appInfo.isRunInMobile ? ("minimized" !== this.windowState && this.disableMoveable(),
                this.disableResizable(), c.set(this.maxNode, "display", "")) : (c.set(this.maxNode, "display", "none"), this.makeResizable(), this.makeMoveable(this.titleLabelNode, this.position.width, .25 * this.position.width))
        }
    })
});