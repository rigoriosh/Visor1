// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

//>>built
require({ cache: { "url:themes/LaunchpadTheme/widgets/AnchorBarController/GroupItems.html": '\x3cdiv\x3e\r\n  \x3cdiv class\x3d"title jimu-panel-title jimu-main-background jimu-corner-top" data-dojo-attach-point\x3d"titleNode"\x3e\r\n    \x3cdiv class\x3d"color-header" data-dojo-attach-point\x3d"colorfulHeader"\x3e\x3c/div\x3e\r\n    \x3cdiv class\x3d"widget-icon"\x3e\r\n      \x3cimg class\x3d"icon" src\x3d"${config.icon}"/\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"title-label" data-dojo-attach-point\x3d"titleLabelNode"\x3e\r\n      ${config.label}\r\n    \x3c/div\x3e\r\n    \x3cdiv role\x3d"button" tabindex\x3d"0" aria-label\x3d"${headerNls.closeWindow}" class\x3d"close-icon jimu-float-trailing" data-dojo-attach-point\x3d"closeNode"\r\n      data-dojo-attach-event\x3d"onclick:_onCloseBtnClicked,onkeydown:_onCloseBtnKeydown"\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv class\x3d"jimu-panel-content jimu-corner-bottom" data-dojo-attach-point\x3d"containerNode"\x3e\x3c/div\x3e\r\n\x3c/div\x3e' } });
define("dojo/_base/declare dojo/_base/array dojo/_base/lang dojo/_base/html dojo/fx dojo/on dojo/keys dijit/Tooltip jimu/utils dojo/Evented dojo/dom-style dojo/dom-class dojo/dom-geometry dojo/dnd/move dijit/_WidgetBase dijit/_TemplatedMixin dojo/text!./GroupItems.html ./BaseIconItem".split(" "), function (m, n, c, h, k, f, d, p, q, r, g, t, l, u, v, w, x, y) {
    return m([v, w, r], {
        baseClass: "jimu-anchorbar-controller-group", templateString: x, config: null, dockableItem: null, backgroundColor: null, itemList: [], box: null, postMixInProperties: function () {           
            this.headerNls =
            window.jimuNls.panelHeader
        }, postCreate: function () {           
            this.inherited(arguments); n.forEach(this.config.widgets, function (a, b) { b = new y({ config: a, backgroundIndex: b, itemTabIndex: 0 }); b.placeAt(this.containerNode); this.own(f(b, "nodeClick", c.hitch(this, this._onIconClick))); this.itemList.push(b); q.addTooltipByDomNode(p, b.iconItemNode, a.label) }, this); t.add(this.colorfulHeader, "icon-item-background" + this.dockableItem.getBackgroundColorIndex()); this.own(f(this.domNode, "keydown", c.hitch(this, function (a) {               
                if (!h.hasClass(a.target,
                    "close-icon") && a.keyCode === d.ESCAPE) this.closeNode.focus(); else if (a.keyCode === d.TAB && h.hasClass(a.target, "icon-item")) { var b; a.shiftKey || a.target.parentNode.nextElementSibling ? a.shiftKey && !a.target.parentNode.previousElementSibling && (b = this.itemList[this.itemList.length - 1]) : b = this.itemList[0]; b && (a.preventDefault(), b.iconItemNode.focus()) }
            })))
        }, startup: function () {            
            this.inherited(arguments); this.box = l.getMarginBox(this.domNode); this.makeMoveable(this.titleNode, this.box) }, getItemList: function () { return this.itemList },
        makeMoveable: function (a, b) {           
             this.disableMoveable(); var e = l.getMarginBox(jimuConfig.layoutId); e.l -= .5 * b.w; e.w += b.w; this.moveable = new u.boxConstrainedMoveable(this.domNode, { box: e, handle: a || this.titleNode, within: !0 }); this.own(f(this.moveable, "Moving", c.hitch(this, this.onMoving))); this.own(f(this.moveable, "MoveStop", c.hitch(this, this.onMoveStop))) }, getItemNum: function () { return this.config.widgets.length }, disableMoveable: function () { this.moveable && (this.moveable.destroy(), this.moveable = null) }, onMoving: function (a) {
            g.set(a.node,
                "opacity", .9)
        }, onMoveStop: function (a) { g.set(a.node, "opacity", 1) }, open: function () {           
            k.wipeIn({ node: this.domNode, duration: 400 }).play(); setTimeout(c.hitch(this, function () { this.itemList[0].iconItemNode.focus() }), 405) }, close: function () { k.wipeOut({ node: this.domNode, duration: 400 }).play(); this.dockableItem.setOpened(!1) }, closeImmedaite: function () { g.set(this.domNode, "display", "none"); this.dockableItem.setOpened(!1) }, _onCloseBtnClicked: function () { this.close(); this.emit("groupCloseBtnClicked") }, _onCloseBtnKeydown: function (a) {
            a.keyCode ===
            d.ENTER || a.keyCode === d.SPACE ? this._onCloseBtnClicked() : a.keyCode === d.TAB && a.shiftKey && a.preventDefault()
        }, _onIconClick: function (a) {           
             this.emit("groupItemClicked", c.mixin({ group: this }, a)) }, setPosition: function (a) {               
                g.set(this.domNode, { top: "number" === typeof a.top ? a.top + "px" : "auto", left: "number" === typeof a.left ? a.left + "px" : "auto", right: "number" === typeof a.right ? a.right + "px" : "auto" }) }
    })
});