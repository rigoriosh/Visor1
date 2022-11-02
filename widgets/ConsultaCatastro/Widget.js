// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

//>>built
var appGlobal;
define(["dojo/_base/declare", "jimu/BaseWidget", "dojo/query"],
function (declare, BaseWidget, query) {
     return declare([BaseWidget], {
        baseClass: "jimu-widget-ConsultaCatastro",
        widgetConsCatastro:{},
        startup: function() {
            this.inherited(arguments);
            appGlobal = this;
            console.log(appGlobal);

            query("#IdnumeroPredial").on("change", async function (evt) {
                const value = evt.target.value;
                appGlobal.widgetConsCatastro = {
                    ...appGlobal.widgetConsCatastro,
                    numPredial: value
                }
                console.log(appGlobal.widgetConsCatastro);
            });
            query("#IdmatriculaInmobiliaria").on("change", async function (evt) {
                const value = evt.target.value;
                appGlobal.widgetConsCatastro = {
                    ...appGlobal.widgetConsCatastro,
                    matriculaInmobiliaria: value
                }
                console.log(appGlobal.widgetConsCatastro);
            });
            query("#Idchip").on("change", async function (evt) {
                const value = evt.target.value;
                appGlobal.widgetConsCatastro = {
                    ...appGlobal.widgetConsCatastro,
                    chip: value
                }
                console.log(appGlobal.widgetConsCatastro);
            });
            query("#btnConsultaCatastro").on("click", async function (evt) {
                console.log(appGlobal.widgetConsCatastro);
                appGlobal._fixDataToSendWidResultados({
                    tipoResultado: consts.consulCatastro,
                    data:{
                        panel:{
                            width:1000,
                            height:300,
                        }
                    }
                })
            });

        },
        onOpen: function () {
            var panel = this.getPanel();
            ajustarTamanioWidget(panel, panel.position.width, 338)

        },
        _fixDataToSendWidResultados: function(data){
            var widget = appGlobal.appConfig.getConfigElementById(consts.widgetMyResultados);
            var widgetId = widget.id;
            widget.data = data;
            appGlobal.openWidgetById(widgetId);
            ajustarTamanioWidget(panel, width, height)
        },
    })
});