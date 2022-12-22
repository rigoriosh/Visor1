// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

//>>built
var widgetAddAtributes = {}, mythis;;

define(["dojo/_base/declare", "jimu/BaseWidget", "dojo/query", "esri/InfoTemplate",
"esri/graphic"],
function (declare, BaseWidget, query, InfoTemplate, Graphic) {

    
     return declare([BaseWidget], {
        baseClass: "jimu-widget-AddAtributes",
        
        startup: function() {
          mythis = this;
          //console.log("AddAtributes");
          this.inherited(arguments);
          // this.mapIdNoderrh.innerHTML = 'map id is:' + this.map.id;

          query("#btnDibujar").on("click", async function (evt) {
            //pendiente validar los campos ingresados en el form de atributos
            mythis.pasoDespuesDeCapturarAtributos()
          });
        },
        onOpen: function () {
          widgetAddAtributes = this.appConfig.getConfigElementById(consts.widgetAddAtributes);
          //console.log(widgetAddAtributes);
          
          var panel = this.getPanel();
          // panel.position.width = 1000;
          // panel.position.height = 300;
          panel.position.width = !widgetAddAtributes?.data?.data.panel.width?100:widgetAddAtributes.data.data.panel.width;
          panel.position.height = !widgetAddAtributes?.data?.data.panel.height?100:widgetAddAtributes.data.data.panel.height;
          panel._originalBox = {
              w: panel.position.width,
              h: panel.position.height,
              l: panel.position.left || 0,
              t: panel.position.top || 0
          };
          panel.setPosition(panel.position);
          panel.panelManager.normalizePanel(panel);
          // this.pasoDespuesDeCapturarAtributos()
        },

        pasoDespuesDeCapturarAtributos: function () {
          console.log(widgetAddAtributes);
          const {evt, symbol} = widgetAddAtributes.data;
          var infoTemplate = new InfoTemplate(`Vernal Pool Locations","Latitude: ${456} <br/>
          Longitude: ${654} <br/>
          Plant Name:${"Testing"}`);
          var attr = {"Xcoord":"evt.mapPoint.x","Ycoord":"evt.mapPoint.y","Plant":"Mesa Mint"};

          var graphic = new Graphic(evt.geometry, symbol, attr, infoTemplate);

          EsriMap.graphics.add(graphic);
          dibujo.deactivate();
          textInfo = document.querySelector("#textInfo");
          textInfo.style.display = 'block';
        }
        
        
    })
});