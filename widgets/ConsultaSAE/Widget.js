// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

//>>built
define(["dojo/_base/declare", "jimu/BaseWidget"],
function (declare, BaseWidget) {

    
     return declare([BaseWidget], {
        baseClass: "jimu-widget-ConsultaSAE",
        startup: function() {
            console.log(111111);
            this.inherited(arguments);
            this.mapIdNode.innerHTML = 'map id is:' + this.map.id;
          },
    })
});