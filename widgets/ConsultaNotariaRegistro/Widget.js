// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

//>>built
var appGlobal;

define(["dojo/_base/declare", "jimu/BaseWidget", "dojo/query"],
function (declare, BaseWidget, query) {
     return declare([BaseWidget], {
        baseClass: "jimu-widget-NotariaRegistro",
        widgetConsNotariadoRegistro:{},
        startup: function() {
            this.inherited(arguments);
            appGlobal = this;
            console.log(appGlobal);

            query("#IdFMI").on("change", async function (evt) {
                const value = evt.target.value;
                appGlobal.widgetConsNotariadoRegistro = {
                    ...appGlobal.widgetConsNotariadoRegistro,
                    fichaMatriInmob: value
                }
                console.log(appGlobal.widgetConsNotariadoRegistro);
            });
            query("#IdnumeroPredial").on("change", async function (evt) {
                const value = evt.target.value;
                appGlobal.widgetConsNotariadoRegistro = {
                    ...appGlobal.widgetConsNotariadoRegistro,
                    numeroPredial: value
                }
                console.log(appGlobal.widgetConsNotariadoRegistro);
            });
            query("#btnConsultaNotariadoRegistro").on("click", async function (evt) {
                console.log(appGlobal.widgetConsNotariadoRegistro);
                appGlobal._fixDataToSendWidResultados({
                    tipoResultado: consts.consulCatastro,
                    data:{
                        panel:{
                            width:500,
                            height:300,
                        }
                    }
                })
            });

        },
        _fixDataToSendWidResultados: function(data){
            var widget = appGlobal.appConfig.getConfigElementById(consts.widgetMyResultados);
            var widgetId = widget.id;
            widget.data = data;
            appGlobal.openWidgetById(widgetId);
        },
    })
});