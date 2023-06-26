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
            //console.log(appGlobal);
            EsriMap = this.map
            query("#IdFMI").on("change", async function (evt) {
                const value = evt.target.value;
                appGlobal.widgetConsNotariadoRegistro = {
                    ...appGlobal.widgetConsNotariadoRegistro,
                    fichaMatriInmob: value,
                    numeroPredial: ''
                }
                //console.log(appGlobal.widgetConsNotariadoRegistro);
            });
            query("#IdnumeroPredial").on("change", async function (evt) {
                const value = evt.target.value;
                appGlobal.widgetConsNotariadoRegistro = {
                    ...appGlobal.widgetConsNotariadoRegistro,
                    numeroPredial: value,
                    fichaMatriInmob: '',
                }
                //console.log(appGlobal.widgetConsNotariadoRegistro);
            });
            query("#btnConsultaNotariadoRegistro").on("click", async function (evt) {
                console.log(appGlobal.widgetConsNotariadoRegistro);
                const columnValue = document.getElementById("numero").value;
                const columnName = appGlobal.widgetConsNotariadoRegistro.fichaMatriInmob === 'on' ? "FMI" : "NUMERO DE ESCRITURA PUBLICA DE CABIDA Y LINDEROS";
                const fileName = "BASE_REGISTRO_SNR";
                appGlobal._consultaAlfanumerica(columnName, columnValue, fileName);
            });

        },
        onOpen: function () {
            var panel = this.getPanel();
            //console.log(panel);
            ajustarTamanioWidget(panel, panel.position.width, 300)

        },
        _consultaAlfanumerica: async function(columnName, columnValue, fileName){            
            const dataAlfanumerica = await getDataNotariadoRegistro(columnName, columnValue, fileName);
            console.log(dataAlfanumerica);
            loader2(true, "loadingNR")
            if (dataAlfanumerica.status == 400){
                createDialogInformacionGeneral("Info","No se encontró información para esta consulta")
                loader2(false, "loadingNR")
                return
            }
            appGlobal.widgetConsNotariadoRegistro.dataAlfanumerica = dataAlfanumerica;
            const miMunicipio = dataAlfanumerica.CIUDAD
            const urlGeografica = await getDataGeograficaNotariadoRegistro(miMunicipio);
            console.log(urlGeografica);
            if (urlGeografica.status == 400){
                createDialogInformacionGeneral("Info","No se encontró información geográfica para esta consulta")
                loader2(false, "loadingNR")
                return
            }
            appGlobal.widgetConsNotariadoRegistro.urlGeografica = urlGeografica.URL;
            const objConsultaNR = {
                urlCapa:urlGeografica.URL,
                where: `FMI='${columnValue}'`
            }
            ejecutarQueryAndQueryTask(objConsultaNR, appGlobal._succeededRequest, appGlobal._errorRequest);

            
        },
        _succeededRequest: function (resp) {
            console.log(resp);  
            let fields = [/* {name: 'OBJECTID', type: 'esriFieldTypeOID', alias: 'OBJECTID'} */];
            Object.keys(appGlobal.widgetConsNotariadoRegistro.dataAlfanumerica).forEach(e => fields.push(
                { name: e, type: 'esriFieldTypeString', alias: e, length: 250 })
            );
            resp.features[0].attributes = appGlobal.widgetConsNotariadoRegistro.dataAlfanumerica
            appGlobal._SendResultados({
                tipoResultado: consts.consulNotariadoRegistro,
                data:{
                    panel:{
                        width:600,
                        height:300,
                    }
                },
                featureCollection: {
                    featureSet: crearfeatureSet(resp.features),
                    layerDefinition: {
                      geometryType: resp.geometryType,
                      fields
                    },
                },
                urlGeografica: appGlobal.widgetConsNotariadoRegistro.urlGeografica,
                responseQueryGeografica: resp,
                dataAlfanumerica: appGlobal.widgetConsNotariadoRegistro.dataAlfanumerica,
                loading: "loadingNR"
            })
            loader2(false, "loadingNR")
        },
        _errorRequest: function (error) {
            console.error({error});
                createDialogInformacionGeneral("Info","No se encontró información geográfica para esta consulta")
                loader2(false, "loadingNR")
        },
        _SendResultados: function(data){
            var widget = appGlobal.appConfig.getConfigElementById(consts.widgetMyResultados);
            var widgetId = widget.id;
            widget.data = data;
            appGlobal.openWidgetById(widgetId);
        },
    })
});