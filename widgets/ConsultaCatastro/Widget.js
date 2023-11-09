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
            //console.log(appGlobal);
            EsriMap = this.map
            query("#IdFmi").on("change", async function (evt) {
                const value = evt.target.value;
                appGlobal.widgetConsCatastro = {
                    ...appGlobal.widgetConsCatastro,
                    fichaMatriculaInmob: value,
                    numeroPredial: '',
                    nomColumna: "FMI"
                }
                //console.log(appGlobal.widgetConsCatastro);
            });
            query("#IdNPN").on("change", async function (evt) {
                const value = evt.target.value;
                appGlobal.widgetConsCatastro = {
                    ...appGlobal.widgetConsCatastro,
                    numeroPredial: value,
                    fichaMatriculaInmob: '',
                    nomColumna: "NPN"
                }
            });
                //console.log(appGlobal.widgetConsCatastro);
            query("#IdChip").on("change", async function (evt) {
                const value = evt.target.value;
                appGlobal.widgetConsCatastro = {
                    ...appGlobal.widgetConsCatastro,
                    numeroPredial: value,
                    fichaMatriculaInmob: '',
                    nomColumna: "CHIP"
                }
            });
            query("#idValorColumna").on("change", async function (evt) {
                const value = evt.target.value;
                appGlobal.widgetConsCatastro = {
                    ...appGlobal.widgetConsCatastro,
                    valorColumna: value,
                }
            });

            query("#btnConsultaCatastro").on("click", async function (evt) {
                // console.log(appGlobal.widgetConsCatastro);
                //const columnValue = document.getElementById("numero").value;
                //const columnValue = document.getElementById("idValorColumna").value;

                //console.log("fichaMatriculaInmob");
                //console.log(appGlobal.widgetConsCatastro.fichaMatriculaInmob);

                const columnName = appGlobal.widgetConsCatastro.nomColumna;
                const columnValue = appGlobal.widgetConsCatastro.valorColumna;

                //const columnName = appGlobal.widgetConsCatastro.fichaMatriculaInmob === 'on' ? "FMI" : "NPN";
                const fileName = "BASE_REGISTRO_R1R2";
                appGlobal._consultaAlfanumerica(columnName, columnValue, fileName);
            });

        },
        onOpen: function () {
            var panel = this.getPanel();
            //console.log(panel);
            ajustarTamanioWidget(panel, panel.position.width, 300)

         },
         onClose: function () {
             document.getElementById("idValorColumna").value = "";
             document.getElementById("IdFmi").checked = false;
             document.getElementById("IdNPN").checked = false;
             document.getElementById("IdChip").checked = false;
         },
        _consultaAlfanumerica: async function(columnName, columnValue, fileName){            
            const dataAlfanumerica = await getDataNotariadoRegistro(columnName, columnValue, fileName);
            // console.log(dataAlfanumerica);
            loader2(true, "loadingCC")
            if (dataAlfanumerica.status == 400){
                createDialogInformacionGeneral("Info","No se encontró información para esta consulta")
                loader2(false, "loadingCC")
                return
            }
            appGlobal.widgetConsCatastro.dataAlfanumerica = dataAlfanumerica;
            //const miMunicipio = dataAlfanumerica.CIUDAD
            const miMunicipio = dataAlfanumerica.MPIO_NOM
            const urlGeografica = await getDataGeograficaNotariadoRegistro(miMunicipio);
            // console.log(urlGeografica);
            if (urlGeografica.status == 400){
                createDialogInformacionGeneral("Info","No se encontró información geográfica para esta consulta")
                loader2(false, "loadingCC")
                return
            }
            appGlobal.widgetConsCatastro.urlGeografica = urlGeografica.URL;
            const objConsultaNR = {
                urlCapa:urlGeografica.URL,
                where: `FMI='${columnValue}'`
                // where: `${columnName}='${columnValue}'`
            }
            ejecutarQueryAndQueryTask(objConsultaNR, appGlobal._succeededRequest, appGlobal._errorRequest); //ArcGis

            
        },
        _succeededRequest: function (resp) { // ArcGis
            // console.log(resp);  
            let fields = [/* {name: 'OBJECTID', type: 'esriFieldTypeOID', alias: 'OBJECTID'} */];
            Object.keys(appGlobal.widgetConsCatastro.dataAlfanumerica).forEach(e => fields.push(
                { name: e, type: 'esriFieldTypeString', alias: e, length: 250 })
            );
            resp.features[0].attributes = appGlobal.widgetConsCatastro.dataAlfanumerica
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

                urlGeografica: appGlobal.widgetConsCatastro.urlGeografica,
                responseQueryGeografica: resp,
                dataAlfanumerica: appGlobal.widgetConsCatastro.dataAlfanumerica,
                loading: "loadingCC"
            })
            loader2(false, "loadingCC")
        },
        _errorRequest: function (error) {
            console.error({error});
                createDialogInformacionGeneral("Info","No se encontró información geográfica para esta consulta")
                loader2(false, "loadingCC")
        },
        _SendResultados: function(data){
            var widget = appGlobal.appConfig.getConfigElementById(consts.widgetMyResultados);
            var widgetId = widget.id;
            widget.data = data;
            appGlobal.openWidgetById(widgetId);
        },
    })
});