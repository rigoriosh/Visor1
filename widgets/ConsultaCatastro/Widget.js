// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

//>>built
var thisConsultaCatastro;

define(["dojo/_base/declare", "jimu/BaseWidget", "dojo/query"],
function (declare, BaseWidget, query) {
     return declare([BaseWidget], {
         baseClass: "jimu-widget-ConsultaCatastro",
        widgetConsCatastro:{},
        startup: function() {
            this.inherited(arguments);
            thisConsultaCatastro = this;
            //console.log(thisConsultaCatastro);
            EsriMap = this.map
            query("#IdFmi").on("change", async function (evt) {
                const value = evt.target.value;
                thisConsultaCatastro.widgetConsCatastro = {
                    ...thisConsultaCatastro.widgetConsCatastro,
                    fichaMatriculaInmob: value,
                    numeroPredial: '',
                    nomColumna: "FMI"
                }
                if (consts.debug) {
                    console.log(thisConsultaCatastro.widgetConsCatastro);
                }
            });
            query("#IdNPN").on("change", async function (evt) {
                const value = evt.target.value;
                thisConsultaCatastro.widgetConsCatastro = {
                    ...thisConsultaCatastro.widgetConsCatastro,
                    numeroPredial: value,
                    fichaMatriculaInmob: '',
                    nomColumna: "NPN"
                }
            });
            query("#IdChip").on("change", async function (evt) {
                const value = evt.target.value;
                thisConsultaCatastro.widgetConsCatastro = {
                    ...thisConsultaCatastro.widgetConsCatastro,
                    numeroPredial: value,
                    fichaMatriculaInmob: '',
                    nomColumna: "CHIP"
                }
            });
            query("#idValorColumna").on("change", async function (evt) {
                const value = evt.target.value;
                thisConsultaCatastro.widgetConsCatastro = {
                    ...thisConsultaCatastro.widgetConsCatastro,
                    valorColumna: value,
                }
            });

            query("#btnConsultaCatastro").on("click", async function (evt) {
                //const columnValue = document.getElementById("numero").value;
                //const columnValue = document.getElementById("idValorColumna").value;
                
                if (consts.debug) {                    
                    console.log(thisConsultaCatastro.widgetConsCatastro);
                    console.log("fichaMatriculaInmob");
                    console.log(thisConsultaCatastro.widgetConsCatastro.fichaMatriculaInmob);
                    console.log(thisConsultaCatastro.widgetConsCatastro);
                }

                const columnName = thisConsultaCatastro.widgetConsCatastro.nomColumna;
                const columnValue = thisConsultaCatastro.widgetConsCatastro.valorColumna;

                //const columnName = thisConsultaCatastro.widgetConsCatastro.fichaMatriculaInmob === 'on' ? "FMI" : "NPN";
                // const fileName = "BASE_REGISTRO_R1R2";
                thisConsultaCatastro._consultaAlfanumerica(columnName, columnValue, fileName);
            });

        },
        onOpen: function () {
            var panel = this.getPanel();
            //console.log(panel);
            ajustarTamanioWidget(panel, panel.position.width, 350)

         },
         onClose: function () {
             document.getElementById("idValorColumna").value = "";
             document.getElementById("IdFmi").checked = false;
             document.getElementById("IdNPN").checked = false;
             document.getElementById("IdChip").checked = false;
         },
        _consultaAlfanumerica: async function(columnName, columnValue, fileName){            
            loader2(true, "loadingCC")
            let dataAlfanumerica = await getDataNotariadoRegistro(columnName, columnValue, fileName);
            if (consts.debug) {                                  
                console.log({dataAlfanumerica});
                if(dataAlfanumerica==''){
                    dataAlfanumerica = JSON.parse(dataPrueba_BASE_REGISTRO_R1R2);
                    dataAlfanumerica.FMI = "303-47692";
                }
                console.log({dataAlfanumerica});
            }
            // dataAlfanumerica = JSON.parse(dataAlfanumerica)

            loader2(false, "loadingCC")            
            if (dataAlfanumerica.status === 400){
                createDialogInformacionGeneral("Info","No se encontró información para esta consulta")
                return
            }else if(dataAlfanumerica.message === "Failed to fetch" || dataAlfanumerica.message === "Unexpected end of input"){
                createDialogInformacionGeneral("Info","Inconvenientes de conexión con los servidores, intentalo mas tarde o comunícate con el administrador")
                // loader2(false, "loadingCC")
                return
            }
            loader2(true, "loadingCC")
            thisConsultaCatastro.widgetConsCatastro.dataAlfanumerica = dataAlfanumerica;
            //const miMunicipio = dataAlfanumerica.CIUDAD
            const miMunicipio = dataAlfanumerica.MPIO_NOM
            let urlGeografica = await getDataGeograficaNotariadoRegistro(`?municipio=${miMunicipio}`);
            if(consts.debug && urlGeografica.message === 'Unexpected end of input' ){
                urlGeografica = response_API_gestor;
            }else if (consts.debug) {
                console.log({urlGeografica});
            }
            loader2(false, "loadingCC") 
            if (urlGeografica.status === 400){
                createDialogInformacionGeneral("Info","No se encontró información geográfica para esta consulta")
                return
            }
            thisConsultaCatastro.widgetConsCatastro.urlGeografica = urlGeografica.URL;
            const objConsulta = {
                urlCapa:urlGeografica.URL,
                where: `FMI='${dataAlfanumerica.FMI}'`
            }
            ejecutarQueryAndQueryTask(objConsulta, thisConsultaCatastro._succeededRequest, thisConsultaCatastro._errorRequest); //ArcGis

            
        },
        _succeededRequest: function (resp) { // ArcGis
            if (consts.debug) {                    
                console.log({resp});  
            }
            let fields = [/* {name: 'OBJECTID', type: 'esriFieldTypeOID', alias: 'OBJECTID'} */];
            if (resp.features.length == 0) {
                createDialogInformacionGeneral("Info","No se encontró información geográfica para esta consulta")
                loader2(false, "loadingCC")
                return
            }
            Object.keys(thisConsultaCatastro.widgetConsCatastro.dataAlfanumerica).forEach(e => fields.push(
                { name: e, type: 'esriFieldTypeString', alias: e, length: 250 })
            );
            resp.features[0].attributes = thisConsultaCatastro.widgetConsCatastro.dataAlfanumerica
            thisConsultaCatastro._SendResultados({
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

                urlGeografica: thisConsultaCatastro.widgetConsCatastro.urlGeografica,
                responseQueryGeografica: resp,
                dataAlfanumerica: thisConsultaCatastro.widgetConsCatastro.dataAlfanumerica,
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
            var widget = thisConsultaCatastro.appConfig.getConfigElementById(consts.widgetMyResultados);
            var widgetId = widget.id;
            widget.data = data;
            thisConsultaCatastro.openWidgetById(widgetId);
        },
    })
});