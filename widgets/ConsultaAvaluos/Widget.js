// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

//>>built
// import {showLoader} from "../../utils/utilSAE.js";
var storeConsultaAvaluos = {
    departamento:{},
    municipios:[],
    municipio:{},
    tiposBienInmnueble:[],
    tiposBienInmnuebleSelected:'',
    numero: 0,
    dataAlfanumerica:{},
    respoGeometriaConsultaMultiple:{
        features:[]
    },
    urlGeografica:'',
    consultaUnica:'',
    consuSelected:''
}

var wm, appGlobal = "";

var divConsultaMasiva, divConsultaUnica, divLoading, divTipInmu, btnConsultaMasiva, 
divMunicipio, tw, EsriMap;


define(["dojo/_base/declare", "jimu/BaseWidget", 'jimu/WidgetManager',
'jimu/PanelManager', "dojo/query"],
function (declare, BaseWidget, WidgetManager, PanelManager, query) {

    return declare([BaseWidget], {
        baseClass: "jimu-widget-ConsultaAvaluos",
        widgetConsAval:{
            urlDparts: endPoints.departamentos
        },
        postCreate: function() {
            this.inherited(arguments);
            //console.log('postCreate');
        },

        startup: function() {
            this.inherited(arguments);
            tw = this;
            appGlobal = this;
            EsriMap = this.map
            // this.mapIdNode.innerHTML = 'map id:' + this.map.id;
            //console.log('startup');
            
            /*  */
            /* query("#xxx").on("change", async function (evt) {
                var xxx = this.options[this.selectedIndex].text;
                //console.log(xxx);
                
            }); */

            query("#selectConsulta").on("change", async function (evt) {
                var consuSelected = this.options[this.selectedIndex].text;
                if (consts.debug) {
                    console.log(consuSelected);                    
                }
                divConsultaMasiva = document.querySelector("#divConsultaMasiva");
                tw._getDivs();
                if (consuSelected === consts.avaluosMultiple) {
                    storeConsultaAvaluos.consuSelected = consts.consulAvaluoMasivo;
                    divConsultaUnica.style.display = 'none';
                    divTipInmu.style.display = 'none';
                    btnConsultaMasiva.style.display = 'none';
                    divConsultaMasiva.style.display = 'flex';
                    tw._loading(true);
                    let depart, munic;
                    try {
                        if (dataStorage.departamentos.length < 1) {
                            // consulta departamentos
                            depart = await ejecutarConsulta(OG_Rancheria_Microfocalización_ICBF);
                            dataStorage.departamentos = depart.features;
                            depart = dataStorage.departamentos;
                            // consulta Municipios
                            munic = await ejecutarConsulta(Municipio_generalizado);
                            dataStorage.municipios = munic.features;
                            munic = dataStorage.municipios;
                        } else {
                            depart = dataStorage.departamentos;
                            munic = dataStorage.municipios;
                        } 
                        agregarDataSelect(depart, "sDepart","DEPARTAMEN","COD_DEPART");
                        // construirTabla(depart, 'idDivTabla')  
                        if (consts.debug) {
                            console.log(depart);
                        }
                    } catch (error) {
                        console.error(error)
                        divConsultaMasiva.style.display = 'none';
                    }
                    tw._loading(false);
            
                } else if(consuSelected === consts.avaluosUnica){
                    storeConsultaAvaluos.consuSelected = consts.consulAvaluoUnica;
                    divConsultaMasiva.style.display = 'none'
                    divConsultaUnica.style.display = 'flex';
                }
            });

            query("#sDepart").on("change", async function (evt) {
                var departSelected = this.options[this.selectedIndex].value;
                if (departSelected != 0) {
                    if (consts.debug) {
                        console.log({departSelected});
                    }
                    storeConsultaAvaluos.departamento = dataStorage.departamentos.filter(e => e.attributes.COD_DEPART === departSelected)[0].attributes;
                    const municipios = retunMunicipios(departSelected);
                    storeConsultaAvaluos.municipios = municipios;
                    //console.log(municipios);
                    divMunicipio.style.display = 'contents';
                    agregarDataSelect(municipios, "sMunicipio","NOM_MUNICI","COD_DANE");
                    divTipInmu?divTipInmu.style.display = 'none':'';
                }else{
                    divMunicipio.style.display = 'none';
                    divTipInmu.style.display = 'none';
                    btnConsultaMasiva.style.display = 'none';
                }
            });

            query("#sMunicipio").on("change", async function (evt) {
                var muniSelected = this.options[this.selectedIndex].value;
                if (muniSelected != 0) {
                    //console.log(muniSelected);
                    storeConsultaAvaluos.municipio = storeConsultaAvaluos.municipios.filter(e => e.attributes.COD_DANE === muniSelected)[0].attributes;
                    // tw._getTiposBienInmueble();
                    divTipInmu.style.display = 'block';                    
                    agregarDataSelect2(["Rural", "Urbano"], "sTipInmu")
                }else{
                    divTipInmu.style.display = 'none';
                    btnConsultaMasiva.style.display = 'none';
                }
                
            });

            query("#btnConsultaMasiva").on("click", async function (evt) {
                // var xxx = this.options[this.selectedIndex].text;
                storeConsultaAvaluos.respoGeometriaConsultaMultiple = {
                    features:[]
                }
                if (consts.debug) {
                    console.log(storeConsultaAvaluos.departamento);
                    console.log(storeConsultaAvaluos.municipio);
                    console.log(storeConsultaAvaluos.tiposBienInmnuebleSelected);
                }
                cerrarWidgetResultados("widgets_MyWidgetResultados_Widget_41")                
                let columnName = "MPIO_NOM",
                columnValue = storeConsultaAvaluos.municipio.ENTIDAD_TE,
                fileName = fileNameBaseAvaluos;
                tw._getDataAlfanumerica(columnName, columnValue, fileName);
            });

            query("#idNumero").on("change", async function (evt) {
                const value = evt.target.value;
                if (consts.debug) {
                    console.log({value});
                }
                storeConsultaAvaluos = {
                    ...storeConsultaAvaluos,
                    numero: value,
                }
            });

            query("#btnConsultaUnica").on("click", async function (evt) {                
                if (consts.debug) {
                    console.log({storeConsultaAvaluos});
                }
                
                cerrarWidgetResultados("widgets_MyWidgetResultados_Widget_41")
                tw._getDataAlfanumerica();
                // tw._abrirWresultados();
                /* tw._fixDataToSendWidResultados({
                    tipoResultado: consts.consulAvaluoUnica,
                    data:{
                        response:"test",
                        panel:{
                            width:300,
                            height:500,
                        }
                    },
                    respuestaTest: function(par){
                        //console.log("in respuesta", par, this.data.response);
                    }
                }); */
                
            });
            
            query("#folioMatricula").on("click", async function (evt) {
                if (consts.debug) {
                    console.log({evt});
                }
                storeConsultaAvaluos.consultaUnica = evt.target.value;
                
            });
            query("#ingresarGeograficas").on("click", async function (evt) {
                if (consts.debug) {
                    console.log({evt});
                }
                storeConsultaAvaluos.consultaUnica = evt.target.value;                
            });

        },
        

        onOpen: function() {
            //console.log('onOpen');
            var panel = this.getPanel();
            //console.log(panel);
            ajustarTamanioWidget(panel, panel.position.width, 400)
        },

        bindEvents: function() {
            //console.log("bindEvents")
        },

        onExecute: function(featureSet) {
            //console.log("onExecute");

        },

        onClose: function() {
            //console.log('onClose');
            // divConsultaMasiva.style.display = 'none'
            divConsultaUnica.style.display = 'none';
            document.getElementById('selectConsulta').value = 0
        },

        onchange: function(){
            //console.log(storeConsultaAvaluos);
        },

        onMinimize: function(){
            //console.log('onMinimize');
        },

        onMaximize: function(){
            //console.log('onMaximize');
        },

        onSignIn: function(credential){
            /* jshint unused:false*/
            //console.log('onSignIn');
        },

        onSignOut: function(){
            //console.log('onSignOut');
        },

        onPositionChange: function(){
            //console.log('onPositionChange');
        },

        resize: function(){
            //console.log('resize');
        },
        _getDivs: function(){
            divConsultaUnica = document.querySelector("#divConsultaUnica");
            btnConsultaMasiva = document.querySelector("#btnConsultaMasiva");
            divMunicipio = document.querySelector("#divMunicipio");
            divMunicipio.style.display = 'none'
            divTipInmu = document.querySelector("#divTipInmu");
            divLoading = document.querySelector("#divLoading");

        },

        _resetWiget: function(){
            btnConsultaMasiva.style.display = 'none';
            divTipInmu.style.display = 'none';
        },

        _loading: function(mode){
            mode ? divLoading.style.display = 'flex' :  divLoading.style.display = 'none';
        },
        _getTiposBienInmueble: async function(){
            tw._loading(true);
            try {
                // storeConsultaAvaluos.tiposBienInmnueble = await ejecutarConsulta(urlTiposBienInmueble);
                const endPoint = `${servicioSNRalfanumerico}${"FOLIO DE MATRICULA"}&columnValue=${columnValue}&fileName=${fileNameBaseAvaluos}`
                storeConsultaAvaluos.tiposBienInmnueble = await ejecutarConsulta(endPoint);
                if (consts.debug) {
                    console.log(storeConsultaAvaluos.tiposBienInmnueble);
                }
                divTipInmu.style.display = 'contents';
    
                let tbi = [];//tipo bien inmueble
                // toma de la respuesta solo los tipos
                storeConsultaAvaluos.tiposBienInmnueble.forEach(ts => { 
                    tbi.push(ts.tipoDeBien);
                });
                // discrimina los repetidos tbi
                tbi = tbi.filter((item,index)=>{
                    return tbi.indexOf(item) === index;
                });
                storeConsultaAvaluos.tiposBienInmnueble = tbi;
                agregarDataSelect2(tbi, "sTipInmu");
                tw._loading(false);
                
            } catch (error) {
                console.log(error);
                divTipInmu.style.display = 'none';
                tw._loading(false);
            }
        },

        /* _abrirWresultados: function(){
            // this._widgetResultados = this.appConfig.getConfigElementById(widgetMyResultados);
            var widget = this.appConfig.getConfigElementById("widgets_MyWidgetResultados_Widget_41");
            var widgetId = widget.id;
            this.openWidgetById(widgetId);
        }, */

        _fixDataToSendWidResultados: function(data){
            var widget = appGlobal.appConfig.getConfigElementById(consts.widgetMyResultados);
            var widgetId = widget.id;
            widget.data = data;
            appGlobal.openWidgetById(widgetId);
        },

        _getDataAlfanumerica: async function (columnName = storeConsultaAvaluos.consultaUnica, columnValue = storeConsultaAvaluos.numero, fileName = fileNameBaseAvaluos) {
            loader2(true, "loadingAval")
            let dataAlfanumerica = await getDataNotariadoRegistro(columnName, columnValue, fileName);
            if (consts.debug) {                                  
                console.log({dataAlfanumerica});
                if(dataAlfanumerica==''){
                    dataAlfanumerica = response_BASE_AVALUOS;
                    dataAlfanumerica.FMI = "303-47692";
                }else if(storeConsultaAvaluos.consuSelected === consts.consulAvaluoMasivo){
                    dataAlfanumerica = response_BASE_AVALUOS_1.filter(e => e["TIPO DE BIEN"] === storeConsultaAvaluos.tiposBienInmnuebleSelected.toUpperCase());
                }
                console.log({dataAlfanumerica});
            }
            
            if (dataAlfanumerica.status === 400){
                createDialogInformacionGeneral("Info","No se encontró información para esta consulta"); loader2(false, "loadingAval")            
                return
            }else if(dataAlfanumerica.message === "Failed to fetch" || dataAlfanumerica.message === "Unexpected end of input"){
                createDialogInformacionGeneral("Info","Inconvenientes de conexión con los servidores, intentalo mas tarde o comunícate con el administrador"); loader2(false, "loadingAval")            
                return
            }
            storeConsultaAvaluos.dataAlfanumerica = dataAlfanumerica;

            let miMunicipio = "", objConsultaA = {};
            if(storeConsultaAvaluos.consuSelected === consts.consulAvaluoMasivo){                
                miMunicipio = dataAlfanumerica[0].MPIO_NOM
            }else{
                miMunicipio = dataAlfanumerica.MPIO_NOM
            }
            let urlGeografica = await getDataGeograficaNotariadoRegistro(`?municipio=${miMunicipio}`);
            if(consts.debug && urlGeografica.message === 'Unexpected end of input' ){
                urlGeografica = response_API_gestor;
            }else if (consts.debug) { 
                console.log({urlGeografica});
            }
            if (urlGeografica.status === 400){
                createDialogInformacionGeneral("Info","No se encontró información geográfica para esta consulta")
                loader2(false, "loadingAval")
                return
            }
            storeConsultaAvaluos.urlGeografica = urlGeografica.URL;

            if(storeConsultaAvaluos.consuSelected === consts.consulAvaluoMasivo){                
                dataAlfanumerica.forEach(e => {
                    setTimeout(() => {
                        objConsultaA = {
                            urlCapa:urlGeografica.URL,
                            where: `FMI='${e.FMI}'`
                        }
                        ejecutarQueryAndQueryTask(objConsultaA, tw._succeededRequest, tw._errorRequest); //ArcGis
                    }, 1000);
                });
            }else{
                objConsultaA = {
                    urlCapa:urlGeografica.URL,
                    where: `FMI='${dataAlfanumerica.FMI}'`
                }
                ejecutarQueryAndQueryTask(objConsultaA, tw._succeededRequest, tw._errorRequest); //ArcGis
            }

        },
        _succeededRequest: function (resp) { // ArcGis
            if (consts.debug) {                
                console.log({resp});  
                console.log(storeConsultaAvaluos.dataAlfanumerica);
            }
            const { features, geometryType, fields, spatialReference } = resp;
            
            /* Object.keys(storeConsultaAvaluos.dataAlfanumerica).forEach(e => fields.push(
                { name: e, type: 'esriFieldTypeString', alias: e, length: 250 })
            );

            resp.features[0].attributes = storeConsultaAvaluos.dataAlfanumerica */
            if(storeConsultaAvaluos.consuSelected === consts.consulAvaluoMasivo){
                if (storeConsultaAvaluos.dataAlfanumerica.length != storeConsultaAvaluos.respoGeometriaConsultaMultiple.features.length) {
                    storeConsultaAvaluos.respoGeometriaConsultaMultiple.features.push(resp.features[0]);
                    if (storeConsultaAvaluos.dataAlfanumerica.length != storeConsultaAvaluos.respoGeometriaConsultaMultiple.features.length) return                    
                }
            }else{
                storeConsultaAvaluos.respoGeometriaConsultaMultiple.features = resp.features
            }
            resp.features = storeConsultaAvaluos.respoGeometriaConsultaMultiple.features;
            if (resp.features.length == 0) {
                createDialogInformacionGeneral("Info","No se encontró información geográfica para esta consulta")
                loader2(false, "loadingAval")
                // if (storeConsultaAvaluos.consuSelected != consts.consulAvaluoMasivo) return
                return
            }            
            // loader2(true, "loadingAval")
            tw._SendResultados({
                tipoResultado: storeConsultaAvaluos.consuSelected,
                data:{
                    panel:{
                        width:600,
                        height:300,
                    }
                },
                featureCollection: {
                    featureSet: crearfeatureSet(storeConsultaAvaluos.respoGeometriaConsultaMultiple.features),
                    layerDefinition: { geometryType, fields },
                },
                urlGeografica: storeConsultaAvaluos.urlGeografica,
                responseQueryGeografica: resp,
                dataAlfanumerica: storeConsultaAvaluos.dataAlfanumerica,
                loading: "loadingAval"
            })
            // loader2(false, "loadingAval")
        },
        _errorRequest: function (error) {
            console.error({error});
                createDialogInformacionGeneral("Info","No se encontró información geográfica para esta consulta")
                loader2(false, "loadingAval")
        },
        _SendResultados: function(data){
            var widget = tw.appConfig.getConfigElementById(consts.widgetMyResultados);
            var widgetId = widget.id;
            widget.data = data;
            tw.openWidgetById(widgetId);
        },

    })
});



const starConsulta = async({value}) => {
    //console.log(value);
    divConsultaMasiva = document.querySelector("#divConsultaMasiva");
    divConsultaUnica = document.querySelector("#divConsultaUnica");
    btnConsultaMasiva = document.querySelector("#btnConsultaMasiva");
    divMunicipio = document.querySelector("#divMunicipio");
    divMunicipio.style.display = 'none'
    divTipInmu = document.querySelector("#divTipInmu");
    
    resetWiget();
    
    if (value === consts.avaluosMultiple) {
        divConsultaUnica.style.display = 'none';
        divConsultaMasiva.style.display = 'flex';
        loading(true);
        let depart, munic;
        if (dataStorage.departamentos.length < 1) {
            // consulta departamentos
            depart = await ejecutarConsulta(OG_Rancheria_Microfocalización_ICBF);
            dataStorage.departamentos = depart.features;
            depart = dataStorage.departamentos;
            // consulta Municipios
            munic = await ejecutarConsulta(Municipio_generalizado);
            dataStorage.municipios = munic.features;
            munic = dataStorage.municipios;
        } else {
            depart = dataStorage.departamentos;
            munic = dataStorage.municipios;
        } 
        agregarDataSelect(depart, "sDepart","DEPARTAMEN","COD_DEPART");
        construirTabla(depart, 'idDivTabla')  
        //console.log(depart);
        loading(false);

    } else if(value === consts.avaluosMultiple){
        divConsultaMasiva.style.display = 'none'
        divConsultaUnica.style.display = 'flex';
    }
}

const cambioSelectDepart = ({id}) => {
    resetWiget();
    const departSelected = document.querySelector("#"+id).value;
    storeConsultaAvaluos.departamento = dataStorage.departamentos.filter(e => e.attributes.DEPARTAMEN === consuSelected)[0].attributes;
    const municipios = retunMunicipios(departSelected);
    storeConsultaAvaluos.municipios = municipios;
    //console.log(municipios);
    divMunicipio.style.display = 'contents';
    agregarDataSelect(municipios, "sMunicipio","NOM_MUNICI","COD_DANE");
    divTipInmu?divTipInmu.style.display = 'none':'';
}

const cambioSelectMuni = ({id}) => {
    const codeSelected = document.querySelector("#"+id).value;
    if (codeSelected !== "0") {
        storeConsultaAvaluos.municipio = storeConsultaAvaluos.municipios.filter(e => e.attributes.COD_DANE === codeSelected)[0].attributes;
        getTiposBienInmueble();
    } else {
        divTipInmu.style.display = 'none';
        btnConsultaMasiva.style.display = 'none';
    }
}

const getTiposBienInmueble = async() => {
    loading(true);
    storeConsultaAvaluos.tiposBienInmnueble = await ejecutarConsulta(urlTiposBienInmueble);
    //console.log(storeConsultaAvaluos.tiposBienInmnueble);
    divTipInmu.style.display = 'contents';

    let tbi = [];//tipo bien inmueble
    // toma de la respuesta solo los tipos
    storeConsultaAvaluos.tiposBienInmnueble.forEach(ts => { 
        tbi.push(ts.tipoDeBien);
    });
    // discrimina los repetidos tbi
    tbi = tbi.filter((item,index)=>{
        return tbi.indexOf(item) === index;
    });
    storeConsultaAvaluos.tiposBienInmnueble = tbi;
    agregarDataSelect2(tbi, "sTipInmu");
    loading(false);
}

const cambioSTipInmu = (d) => {
    storeConsultaAvaluos.tiposBienInmnuebleSelected = d.value;
    console.log(storeConsultaAvaluos.tiposBienInmnuebleSelected);
    if (storeConsultaAvaluos.tiposBienInmnuebleSelected != 0) {
        btnConsultaMasiva.style.display = 'block';        
    }else{
        btnConsultaMasiva.style.display = 'none';
    }
}

const makeQuery = () => {
    //console.log("ejecutarConsultaMasiva");
}

const makeQueryUnica = () => {
    //console.log("ejecutarConsultaUnica");
    
    const fnm = document.querySelector("#folioNumMatricula").value;
    const fnp = document.querySelector("#folioNumPredial").value;
    const wcu = document.querySelector("#warningConsUnica");
    if ((fnm !== "" && validarSoloEspacios(fnm)) || (fnp !== "" && validarSoloEspacios(fnp))) {
        fnm = fnm.trim();
        fnp = fnp.trim();
        wcu.style.display = 'none'
       //console.log("make query unica", fnm, fnp);
    }else{
        wcu.style.display = 'block';
    }
}

const inputFolio = (d) => {
    //console.log("inputFolio => ", d);
}



const resetWiget = () => {
    btnConsultaMasiva.style.display = 'none';
    divTipInmu.style.display = 'none';
}


 