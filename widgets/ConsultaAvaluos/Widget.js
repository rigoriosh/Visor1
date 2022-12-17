// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

//>>built
// import {showLoader} from "../../utils/utilSAE.js";
var storeConsultaAvaluos = {
    departamento:{},
    municipios:[],
    municipio:{},
    tiposBienInmnueble:[],
    tiposBienInmnuebleSelected:''
}

var wm, appGlobal = "";

var divConsultaMasiva, divConsultaUnica, divLoading, divTipInmu, btnConsultaMasiva, 
divMunicipio, tw;


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
            // this.mapIdNode.innerHTML = 'map id:' + this.map.id;
            //console.log('startup');
            
            /*  */
            /* query("#xxx").on("change", async function (evt) {
                var xxx = this.options[this.selectedIndex].text;
                //console.log(xxx);
                
            }); */

            query("#selectConsulta").on("change", async function (evt) {
                var consuSelected = this.options[this.selectedIndex].text;
                //console.log(consuSelected);
                divConsultaMasiva = document.querySelector("#divConsultaMasiva");
                tw._getDivs();
                if (consuSelected === consts.avaluosMultiple) {
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
                        //console.log(depart);
                    } catch (error) {
                        console.error(error)
                        divConsultaMasiva.style.display = 'none';
                    }
                    tw._loading(false);
            
                } else if(consuSelected === consts.avaluosUnica){
                    divConsultaMasiva.style.display = 'none'
                    divConsultaUnica.style.display = 'flex';
                }
            });

            query("#sDepart").on("change", async function (evt) {
                var departSelected = this.options[this.selectedIndex].value;
                if (departSelected !== 0) {
                    //console.log(departSelected);
                    storeConsultaAvaluos.departamento = dataStorage.departamentos.filter(e => e.attributes.COD_DEPART === departSelected)[0].attributes;
                    const municipios = retunMunicipios(departSelected);
                    storeConsultaAvaluos.municipios = municipios;
                    //console.log(municipios);
                    divMunicipio.style.display = 'contents';
                    agregarDataSelect(municipios, "sMunicipio","NOM_MUNICI","COD_DANE");
                    divTipInmu?divTipInmu.style.display = 'none':'';
                }
            });

            query("#sMunicipio").on("change", async function (evt) {
                var muniSelected = this.options[this.selectedIndex].value;
                if (muniSelected !== 0) {
                    //console.log(muniSelected);
                    storeConsultaAvaluos.municipio = storeConsultaAvaluos.municipios.filter(e => e.attributes.COD_DANE === muniSelected)[0].attributes;
                    tw._getTiposBienInmueble();
                }else{
                    divTipInmu.style.display = 'none';
                    btnConsultaMasiva.style.display = 'none';
                }
                
            });

            query("#btnConsultaMasiva").on("click", async function (evt) {
                // var xxx = this.options[this.selectedIndex].text;
                //console.log(storeConsultaAvaluos.departamento);
                //console.log(storeConsultaAvaluos.municipio);
                //console.log(storeConsultaAvaluos.tiposBienInmnuebleSelected);
                cerrarWidgetResultados("widgets_MyWidgetResultados_Widget_41")
                // tw._abrirWresultados();
                // tw._fixDataToSendWidResultados(tw.widgetConsAval.urlDparts);
                tw._fixDataToSendWidResultados({
                    tipoResultado: consts.consulAvaluoMasivo,
                    data:{
                        urlDparts:tw.widgetConsAval.urlDparts,
                        panel:{
                            width:1000,
                            height:300,
                        }
                    },
                    respuestaTest: function(par){
                        //console.log("in respuesta", par);
                    }
                });
                
            });

            query("#btnConsultaUnica").on("click", async function (evt) {
                // var xxx = this.options[this.selectedIndex].text;
                // //console.log(storeConsultaAvaluos.departamento);
                // //console.log(storeConsultaAvaluos.municipio);
                // //console.log(storeConsultaAvaluos.tiposBienInmnuebleSelected);
                cerrarWidgetResultados("widgets_MyWidgetResultados_Widget_41")

                // tw._abrirWresultados();
                tw._fixDataToSendWidResultados({
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
                });
                
            });
            
            query("#folioMatricula").on("click", async function (evt) {
                //console.log(evt);
                
            });
            query("#ingresarGeograficas").on("click", async function (evt) {
                //console.log(evt);
                
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
            divConsultaMasiva.style.display = 'none'
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
                tw._loading(false);
                
            } catch (error) {
                //console.log(error);
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

        _widgetResultados:{}

        //methods to communication between widgets:

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
    //console.log(storeConsultaAvaluos);
    
    btnConsultaMasiva.style.display = 'block';
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


 