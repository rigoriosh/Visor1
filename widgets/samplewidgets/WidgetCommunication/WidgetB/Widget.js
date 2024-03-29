// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

//>>built
define(["dojo/_base/declare", "dojo/_base/array", "jimu/BaseWidget"], function (
  c,
  d,
  e
) {
  return c([e], {
    baseClass: "jimu-widget-widgetb",
    startup: function () {
      this.inherited(arguments);
      this.fetchDataByName("WidgetA");
    },
    onReceiveData: function (a, f, g, b) {
      "WidgetA" === a &&
        ((a =
          '\x3cdiv style\x3d"margin:10px;"\x3e\x3cb\x3eReceive data from\x3c/b\x3e:' +
          a +
          "\x3cbr\x3e\x3cb\x3ewidgetId:\x3c/b\x3e" +
          f +
          "\x3cbr\x3e\x3cb\x3edata:\x3c/b\x3e" +
          g.message),
        !0 === b
          ? ((this.messageNode.innerHTML +=
              a +
              ("\x3cbr\x3e\x3cb\x3ehistoryData:\x3c/b\x3e" +
                b +
                ". Fetch again.\x3c/div\x3e")),
            this.fetchDataByName("WidgetA"))
          : ((a +=
              "\x3cbr\x3e\x3cb\x3ehistoryData:\x3c/b\x3e\x3cbr\x3e" +
              d
                .map(b, function (h, k) {
                  return k + ":" + h.message;
                })
                .join("\x3cbr\x3e") +
              "\x3c/div\x3e"),
            (this.messageNode.innerHTML += a)));
    },
  });
});
