// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

//>>built
var thisNotariadoRegistro;


define(["dojo/_base/declare", "jimu/BaseWidget", "dojo/query"],
function (declare, BaseWidget, query) {
     return declare([BaseWidget], {
        baseClass: "jimu-widget-NotariaRegistro",
        
        startup: function() {
            this.inherited(arguments);
            thisNotariadoRegistro = this;
            thisNotariadoRegistro.widgetConsNotariadoRegistro = {
                fichaMatriInmob:'',
                numeroNotariadoRegistro: ''
            };
            //console.log(thisNotariadoRegistro);
            EsriMap = this.map
            query("#IdFMI").on("change", async function (evt) {
                const value = evt.target.value;
                thisNotariadoRegistro.widgetConsNotariadoRegistro = {
                    ...thisNotariadoRegistro.widgetConsNotariadoRegistro,
                    fichaMatriInmob: value
                }
            });
            query("#IdnumeroNotariadoRegistro").on("change", async function (evt) {
                const value = evt.target.value;
                thisNotariadoRegistro.widgetConsNotariadoRegistro = {
                    ...thisNotariadoRegistro.widgetConsNotariadoRegistro,
                    numeroNotariadoRegistro: value
                }
            });
            query("#btnConsultaNotariadoRegistro").on("click", async function (evt) {
                let {widgetConsNotariadoRegistro} = thisNotariadoRegistro;
                const columnValue = document.getElementById("IdnumeroNotariadoRegistro").value;
                const columnName = widgetConsNotariadoRegistro.fichaMatriInmob === 'on' ? "FMI" : "NUMERO DE ESCRITURA PUBLICA DE CABIDA Y LINDEROS";
                if (consts.debug) {                    
                    console.log(thisNotariadoRegistro.widgetConsNotariadoRegistro);
                    console.log(widgetConsNotariadoRegistro.fichaMatriInmob);
                    console.log(widgetConsNotariadoRegistro.numeroNotariadoRegistro);
                }
                const fileName = "BASE_REGISTRO_SNR";
                if (widgetConsNotariadoRegistro.fichaMatriInmob == '' || widgetConsNotariadoRegistro.numeroNotariadoRegistro == '') {
                    createDialogInformacionGeneral("Info","Recuerda completar todos los campos...")
                } else {                    
                    thisNotariadoRegistro._consultaAlfanumerica(columnName, columnValue, fileName);
                }
            });

        },
        onOpen: function () {
            var panel = this.getPanel();
            //console.log(panel);
            ajustarTamanioWidget(panel, panel.position.width, 300)

        },
        _consultaAlfanumerica: async function(columnName, columnValue, fileName){            
            loader2(true, "loadingNR")
            let {widgetConsNotariadoRegistro} = thisNotariadoRegistro;
            const dataAlfanumerica = await getDataNotariadoRegistro(columnName, columnValue, fileName);
            if (consts.debug) {                    
                console.log({dataAlfanumerica});
            }
            loader2(false, "loadingNR")
            if (dataAlfanumerica.status === 400){
                createDialogInformacionGeneral("Info","No se encontró información para esta consulta")
                return
            }else if(dataAlfanumerica.message === "Failed to fetch" || dataAlfanumerica.message === "Unexpected end of input"){
                createDialogInformacionGeneral("Info","Inconvenientes de conexión con los servidores, intentalo mas tarde o comunícate con el administrador")
                // loader2(false, "loadingCC")
                return
            }
            loader2(true, "loadingNR")
            widgetConsNotariadoRegistro.dataAlfanumerica = dataAlfanumerica;
            const miMunicipio = dataAlfanumerica.CIUDAD
            const urlGeografica = await getDataGeograficaNotariadoRegistro(miMunicipio);
            if (consts.debug) {                    
                console.log({urlGeografica});
            }
            loader2(false, "loadingNR")
            if (urlGeografica.status === 400){
                createDialogInformacionGeneral("Info","No se encontró información geográfica para esta consulta")
                loader2(false, "loadingCC")
                return
            }
            widgetConsNotariadoRegistro.urlGeografica = urlGeografica.URL;
            const objConsultaNR = {
                urlCapa:urlGeografica.URL,
                where: `FMI='${columnValue}'`
            }
            ejecutarQueryAndQueryTask(objConsultaNR, thisNotariadoRegistro._succeededRequest, thisNotariadoRegistro._errorRequest);

            
        },
        _succeededRequest: function (resp) {
            if (consts.debug) {                    
                console.log({resp});  
            }
            let {widgetConsNotariadoRegistro} = thisNotariadoRegistro;
            let fields = [/* {name: 'OBJECTID', type: 'esriFieldTypeOID', alias: 'OBJECTID'} */];
            Object.keys(widgetConsNotariadoRegistro.dataAlfanumerica).forEach(e => fields.push(
                { name: e, type: 'esriFieldTypeString', alias: e, length: 250 })
            );
            resp.features[0].attributes = widgetConsNotariadoRegistro.dataAlfanumerica
            _SendResultados({
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
                urlGeografica: widgetConsNotariadoRegistro.urlGeografica,
                responseQueryGeografica: resp,
                dataAlfanumerica: widgetConsNotariadoRegistro.dataAlfanumerica,
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
            var widget = thisNotariadoRegistro.appConfig.getConfigElementById(consts.widgetMyResultados);
            var widgetId = widget.id;
            widget.data = data;
            thisNotariadoRegistro.openWidgetById(widgetId);
        },
    })
});