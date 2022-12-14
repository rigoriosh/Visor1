// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

//>>built
require({
    cache: {
        "esri/dijit/HomeButton": function () {
            define("dojo/Evented dojo/_base/declare dojo/_base/lang dojo/has ../kernel dijit/_WidgetBase dijit/a11yclick dijit/_TemplatedMixin dojo/on dojo/Deferred dojo/text!./templates/HomeButton.html dojo/i18n!../nls/jsapi dojo/dom-class dojo/dom-style".split(" "), function (e, g, f, t, n, u, h, v, p, q, m, a, k, l) {
                e = g("esri.dijit.HomeButton", [u, v, e], {
                    templateString: m, options: { theme: "HomeButton", map: null, extent: null, fit: !1, visible: !0 }, constructor: function (b, c) {
                        b = f.mixin({},
                            this.options, b); this.domNode = c; this._i18n = a; this.set("map", b.map); this.set("theme", b.theme); this.set("visible", b.visible); this.set("extent", b.extent); this.set("fit", b.fit); this.watch("theme", this._updateThemeWatch); this.watch("visible", this._visible); this._css = { container: "homeContainer", home: "home", loading: "loading" }
                    }, postCreate: function () { this.inherited(arguments); this.own(p(this._homeNode, h, f.hitch(this, this.home))) }, 
                    startup: function () {
                        this.inherited(arguments); this.map || (this.destroy(), console.log("HomeButton::map required"));
                        if (this.map.loaded) this._init(); else p.once(this.map, "load", f.hitch(this, function () { this._init() }))
                    }, destroy: function () { this.inherited(arguments) }, home: function () {
                        var b = new q, c = this.get("extent"); this._showLoading(); var d = { extent: c }; c ? this.map.extent !== c ? this.map.setExtent(c, this.get("fit")).then(f.hitch(this, function () { this._hideLoading(); this.emit("home", d); b.resolve(d) }), f.hitch(this, function (r) { r || (r = Error("HomeButton::Error setting map extent")); d.error = r; this.emit("home", d); b.reject(r) })) : (this._hideLoading(),
                            this.emit("home", d), b.resolve(d)) : (this._hideLoading(), c = Error("HomeButton::home extent is undefined"), d.error = c, this.emit("home", d), b.reject(c)); return b.promise
                    }, show: function () { this.set("visible", !0) }, hide: function () { this.set("visible", !1) }, _init: function () { this._visible(); this.get("extent") || this.set("extent", this.map.extent); this.set("loaded", !0); this.emit("load", {}) }, _showLoading: function () { k.add(this._homeNode, this._css.loading) }, _hideLoading: function () { k.remove(this._homeNode, this._css.loading) },
                    _updateThemeWatch: function (b, c, d) { k.remove(this.domNode, c); k.add(this.domNode, d) }, _visible: function () { this.get("visible") ? l.set(this.domNode, "display", "block") : l.set(this.domNode, "display", "none") }
                }); t("extend-esri") && f.setObject("dijit.HomeButton", e, n); return e
            })
        }, "widgets/HomeButton/_build-generate_module": function () { define(["dojo/text!./css/style.css", "dojo/i18n!./nls/strings"], function () { }) }, "url:esri/dijit/templates/HomeButton.html": '\x3cdiv class\x3d"${theme}" role\x3d"presentation"\x3e\r\n    \x3cdiv class\x3d"${_css.container}"\x3e\r\n            \x3cdiv data-dojo-attach-point\x3d"_homeNode" title\x3d"${_i18n.widgets.homeButton.home.title}" role\x3d"button" class\x3d"${_css.home}" tabindex\x3d"0"\x3e\x3cspan\x3e${_i18n.widgets.homeButton.home.button}\x3c/span\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n\x3c/div\x3e',
        "url:widgets/HomeButton/css/style.css": ".jimu-widget-homebutton {background-color: #555; border-radius: 5px; border: 1px solid #999;}.jimu-widget-homebutton .HomeButton .home {background-color: #555;}.jimu-widget-homebutton.inHome {background-color: #000;}.jimu-widget-homebutton .HomeButton .home:hover {background-color: #333;}.jimu-widget-homebutton.inHome .HomeButton .home {background-color: #000;}", "*now": function (e) { e(['dojo/i18n!*preload*widgets/HomeButton/nls/Widget*["ar","bg","bs","ca","cs","da","de","en","el","es","et","fi","fr","he","hr","hu","id","it","ja","ko","lt","lv","nb","nl","pl","pt-br","pt-pt","ro","ru","sk","sl","sr","sv","th","tr","zh-cn","uk","vi","zh-hk","zh-tw","ROOT"]']) },
        "*noref": 1
    }
});
define("dojo/_base/declare dojo/_base/lang jimu/BaseWidget esri/dijit/HomeButton esri/geometry/Extent esri/SpatialReference dojo/_base/html dojo/dom-construct dojo/topic dojo/keys dojo/on".split(" "), function (e, g, f, t, n, u, h, v, p, q, m) {
    return e([f], {
        name: "HomeButton", baseClass: "jimu-widget-homebutton", moveTopOnActive: !1, postCreate: function () { h.setAttr(this.domNode, "aria-label", window.apiNls.widgets.homeButton.home.title); this.own(p.subscribe("appConfigChanged", g.hitch(this, this.onAppConfigChanged))) }, startup: function () {
            var a =
                null; this.inherited(arguments); this.own(m(this.map, "extent-change", g.hitch(this, "onExtentChange"))); a = (a = this.appConfig && this.appConfig.map && this.appConfig.map.mapOptions && this.appConfig.map.mapOptions.extent) ? new n(a.xmin, a.ymin, a.xmax, a.ymax, new u(a.spatialReference)) : this.map._initialExtent || this.map.extent; this.createHomeDijit({ map: this.map, extent: a })
        }, createHomeDijit: function (a) {
            this.homeDijit = new t(a, v.create("div")); this.own(m(this.homeDijit, "home", g.hitch(this, "onHome"))); this.own(m(this.domNode,
                "keydown", g.hitch(this, this.onHomeKeyDown))); h.place(this.homeDijit.domNode, this.domNode); this.homeDijit.startup()
        }, onAppConfigChanged: function (a, k, l) { "mapOptionsChange" === k && l && a && l.extent && (a = new n(l.extent), this.homeDijit.set("extent", a)) }, onExtentChange: function () { h.removeClass(this.domNode, "inHome") }, onHomeKeyDown: function (a) { a.keyCode !== q.ENTER && a.keyCode !== q.SPACE || this.homeDijit.home() }, onHome: function (a) { a && a.error || h.addClass(this.domNode, "inHome") }
    })
});