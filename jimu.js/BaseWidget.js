// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

//>>built
define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/html dojo/topic dijit/_WidgetBase jimu/dijit/BindLabelPropsMixin dijit/_TemplatedMixin jimu/utils ./PanelManager".split(" "), function (l, e, h, f, c, m, n, p, q, g) {
    return l([m, n, p], {
        type: "widget", id: void 0, label: void 0, icon: void 0, uri: void 0, position: {}, config: void 0, openAtStart: !1, map: null, appConfig: null, folderUrl: null, state: "closed", windowState: "normal", started: !1, name: "", baseClass: null, templateString: "\x3cdiv\x3e\x3c/div\x3e", moveTopOnActive: !0,
        constructor: function () { this.listenWidgetNames = []; this.listenWidgetIds = []; this.own(c.subscribe("publishData", e.hitch(this, this._onReceiveData))); this.own(c.subscribe("dataFetched", e.hitch(this, this._onReceiveData))); this.own(c.subscribe("noData", e.hitch(this, this._onNoData))); this.own(c.subscribe("dataSourceDataUpdated", e.hitch(this, this.onDataSourceDataUpdate))) }, startup: function () { this.inherited(arguments); this.started = !0 }, onOpen: function () { }, onClose: function () { }, onNormalize: function () { }, onMinimize: function () { },
        onMaximize: function () { }, onActive: function () { }, onDeActive: function () { }, onSignIn: function (a) { }, onSignOut: function () { }, onPositionChange: function (a) { this.setPosition(a) }, setPosition: function (a, b) { this.position = a; var d = q.getPositionStyle(this.position); d.position = "absolute"; b || (b = "map" === a.relativeTo ? this.map.id : window.jimuConfig.layoutId); f.place(this.domNode, b); f.setStyle(this.domNode, d); this.started && this.resize() }, getPosition: function () { return this.position }, getMarginBox: function () { return f.getMarginBox(this.domNode) },
        setMap: function (a) { this.map = a }, setState: function (a) { this.state = a }, setWindowState: function (a) { this.windowState = a }, resize: function () { }, onConfigChanged: function (a) { }, onAppConfigChanged: function (a, b, d) { }, onAction: function (a, b) { }, getPanel: function () { if (!1 === this.inPanel) return null; if ("widgetOnScreen" === this.gid || "widgetPool" === this.gid) return g.getInstance().getPanelById(this.id + "_panel"); var a = g.getInstance().getPanelById(this.gid + "_panel"); return a ? a : g.getInstance().getPanelById(this.id + "_panel") },
        publishData: function (a, b) { "undefined" === typeof b && (b = !1); c.publish("publishData", this.name, this.id, a, b) }, fetchData: function (a) { a ? c.publish("fetchData", a) : 0 !== this.listenWidgetIds.length ? h.forEach(this.listenWidgetIds, function (b) { c.publish("fetchData", b) }, this) : c.publish("fetchData") }, fetchDataByName: function (a) { a = this.widgetManager.getWidgetsByName(a); h.forEach(a, function (b) { this.fetchData(b.id) }, this) }, openWidgetById: function (a) { return this.widgetManager.triggerWidgetOpen(a) }, _onReceiveData: function (a,
            b, d, k) { if (b !== this.id && !(0 !== this.listenWidgetIds.length && 0 > this.listenWidgetIds.indexOf(b))) this.onReceiveData(a, b, d, k) }, onReceiveData: function (a, b, d, k) { }, updateDataSourceData: function (a, b) { c.publish("updateDataSourceData", "widget~" + this.id + "~" + a, b) }, onDataSourceDataUpdate: function (a, b) { }, _onNoData: function (a, b) { if (!(0 !== this.listenWidgetIds.length && 0 > this.listenWidgetIds.indexOf(b))) this.onNoData(a, b) }, onNoData: function (a, b) { }
    })
});