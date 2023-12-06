// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

//const { isUndefined } = require("../../libs/underscore/underscore-min");

//>>built
var tw, EsriMap;
var configWidget;
var idIndicadorActivo = "-1";
var idxIndicadorActivo = "-1";
var tipoRecaudoSelected = "";
var fullUrlActiva = "";
var idCapaActiva = "";
var nomInd = "";
var totPrediosMpio = -1;

var dptoActivo = "";
var mpioActivo = "";
var regionalActiva;

var aplicaPorDpto = false;
var gContinua = false;
var entidadEspacialActiva;
var nombreEntidad = "";
var dataStorageWidIndicadores = { // por rigo
    indicador: '',
    entidadEspacialSelected: '',
    tipoRecaudo:'',
    departamento:'',
    idCapaActiva:''
};


// var projectionPromise;

const DEPARTAMENTOS = "1";
const MUNICIPIOS = "2";
const REGIONALES = "3";

var clickHandler;


var alertaTitulo = "<B> Informaci&oacute;n </B>";
var alertaContenido = "Diligencie todos las parámetros de la consulta";

const cargarIndicadores = (data, selec) => {
    console.log(">>> cargarIndicadores - data.. " + data[0]._id + " " + data[0]._nombre);

    const select = document.getElementById(selec);
    select.options.length = 0;
    if (data[0]._nombre != "Seleccione") select.options[select.options.length] = new Option("Seleccione...", 0);
    data.forEach(d => {
        select.options[select.options.length] = new Option(d._nombre, d._id)
    });
};

define(['dojo/_base/declare', 'jimu/BaseWidget',
    'dojo/on',
    "dojo/query",
    "esri/SpatialReference",
    "esri/geometry/Point",
    "esri/tasks/GeometryService",
    "esri/layers/GraphicsLayer",
    "esri/InfoTemplate",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    'esri/symbols/SimpleFillSymbol',
    "esri/graphic",
    "esri/layers/LayerInfo",
    "esri/layers/layer",
    'esri/layers/FeatureLayer', //
    'esri/layers/LayerDrawingOptions', ///
    'esri/layers/ImageParameters',///
    "esri/symbols/TextSymbol",
    "esri/symbols/Font",
    "dojo/_base/array",
    "dojo/number",
    "esri/Color",
    "esri/request",
    "esri/geometry/Extent",

    "dojo/domReady!",

    'esri/tasks/StatisticDefinition',
    'esri/tasks/query',
    'esri/tasks/QueryTask',
    'esri/layers/ArcGISDynamicMapServiceLayer',
    'esri/dijit/FeatureTable',
    "esri/renderers/SimpleRenderer",

    "dijit/TooltipDialog",
    "dijit/popup",

    "esri/lang",
    'dojo/dom-style',
    'dojox/grid/DataGrid', 'dojox/charting/Chart',
    "dojox/charting/themes/Wetland",
    "dojox/charting/plot2d/Bars",
    "dojox/charting/axis2d/Default",
    "dojox/charting/plot2d/StackedAreas",
    "dojox/charting/Chart2D",
    "dojox/charting/plot2d/Columns",
    "dojox/charting/action2d/Highlight",
    "dojox/charting/action2d/Tooltip",
    "dojox/charting/themes/CubanShirts",
    "dojox/charting/widget/SelectableLegend",
    "dojox/charting/widget/Legend", 'dojo/data/ItemFileWriteStore',
    "dojo/dom", "dojo/parser", "dojo/ready"
],

    function (declare, BaseWidget,
        on,
        query,
        SpatialReference,
        Point,
        GeometryService,
        GraphicsLayer,
        InfoTemplate,
        SimpleMarkerSymbol,
        SimpleLineSymbol,
        SimpleFillSymbol,
        Graphic,
        LayerInfo,
        TextSymbol,
        Font,
        array,
        number,
        Color,
        esriRequest,
        Extent,
        Layer,
        FeatureLayer,
        LayerDrawingOptions,
        ImageParameters,

        StatisticDefinition,
        Query,
        QueryTask,
        ArcGISDynamicMapServiceLayer,
        FeatureTable,
        SimpleRenderer,

        esriLang,
        TooltipDialog,
        dijitPopup,

        domStyle,
        DataGrid, Chart, Wetland, Bars, Default, StackedAreas, Chart2D,
        Columns, Highlight, Tooltip, CubanShirts, SelectableLegend, Legend, ItemFileWriteStore,
        dom, parser, ready

    ) {
        return declare([BaseWidget], {
            baseClass: "jimu-widget-IndicadoreSae",
            store: {
                fieldsForm: ["seleccioneIndicador", "seleccioneTematica", "entidadEspacial", "departamento", "tematica", "anio", "selectTipoRecaudo"]
            },

            postCreate: function () {
                console.log(">>> postCreate...");
                this.inherited(arguments);
            },

            startup: function () {
                this.inherited(arguments);
                tw = this;
                EsriMap = this.map
                tw.store = { // por rigo
                    seleccioneTematica:'',
                    tipoRecaudo: '',
                    indicador: '',
                    entidadEspacial:''
                }
                appGlobal = this;
                configWidget = this.config;

                this.getTematicas();

                query("#seleccioneIndicador").on("change", async function (evt) {
                    var datoSelected = this.options[this.selectedIndex].value;
                    idIndicadorActivo = datoSelected;
                    //idxIndicadorActivo = this.options[this.selectedIndex];
                    idxIndicadorActivo = this.options.selectedIndex - 1;
                    console.log(">>> seleccioneIndicador " + datoSelected);

                    if (datoSelected == 0) {
                        tw.store = {
                            ...tw.store,
                            indicador: ''
                        }
                        tw.limpiar();
                        tw.hideing();
                    } else {                                                
                        tw.store = {
                            ...tw.store,
                            indicador: datoSelected
                        }
                    }
                    tw.seleccionarIndicador();
                });

                query("#seleccioneTematica").on("change", async function (evt) {
                    var datoSelected = this.options[this.selectedIndex].value;
                    if (datoSelected !== 0) {
                        tw.store = {
                            ...tw.store,
                            seleccioneTematica: datoSelected
                        }
                    } else {
                        tw.store = {
                            ...tw.store,
                            seleccioneTematica: ''
                        }
                    }
                });

                query("#entidadEspacial").on("change", async function (evt) {
                    var datoSelected = this.options[this.selectedIndex].value;
                    if (datoSelected !== 0) {
                        tw.store = {
                            ...tw.store,
                            entidadEspacial: datoSelected
                        }
                    } else {
                        tw.store = {
                            ...tw.store,
                            entidadEspacial: ''
                        }
                    }
                    console.log(">>> entidadEspacial (onChange) " + tw.store.entidadEspacial);
                    entidadEspacialActiva = tw.store.entidadEspacial;
                    tw.validarEntidadEspacial();
                    const {indicador} = tw.store;
                    if (indicador == '8' && datoSelected == '1') { // por rigo
                        document.querySelector("#labelTematica").innerHTML = "Típo Recaudo";
                    }
                });
                query("#departamento").on("change", async function (evt) {
                    var datoSelected = this.options[this.selectedIndex].value;
                    this.dptoActivo = datoSelected;
                    console.log(datoSelected);
                    if (datoSelected !== 0) {
                        tw.store = {
                            ...tw.store,
                            departamento: datoSelected
                        }
                    } else {
                        tw.store = {
                            ...tw.store,
                            entidadEspacial: ''
                        }
                    }
                    console.log('>>>>> Dpto ', datoSelected);
                    console.log(">>> departamento (onChange) " + tw.store.departamento);

                });
                query("#tematica").on("change", async function (evt) {
                    var datoSelected = this.options[this.selectedIndex].value;
                    var textSelected = this.options[this.selectedIndex].text;
                    //  console.log(">>> tematica datoSelected " + datoSelected);
                    const {indicador, entidadEspacial} = tw.store;
                    if (indicador == '8' && entidadEspacial == '1'){ // rigo
                        if (datoSelected !== 0) {
                            tw.store = {
                                ...tw.store,
                                tipoRecaudo: datoSelected
                            }
                        } else {
                            tw.store = {
                                ...tw.store,
                                tipoRecaudo: ''
                            }
                        }
                    }else{
                        if (datoSelected !== 0) {
                            tw.store = {
                                ...tw.store,
                                tematica: datoSelected
                            }
                        } else {
                            tw.store = {
                                ...tw.store,
                                tematica: ''
                            }
                        }
                        $('#divInformacion').show();
                        $('#divEstadoOcupacion').hide();
                        $('#divClasifActivo').hide();
                        if (datoSelected !== 0 && datoSelected === "4") { // Estado de ocupacion
                            $('#divEstadoOcupacion').show();
                        }
                        // var includeClasiActivo = false;
                        // includeClasiActivo = 
                            /* monic dps solución dudas
                            if (datoSelected !== 0 && textSelected.includes("Clasificación de activo")) { // Catastral o comercial
                                $('#divClasifActivo').show();
                            }
                            */
                    }
                });
                query("#anio").on("change", async function (evt) {
                    var datoSelected = this.options[this.selectedIndex].value;
                    console.log(datoSelected);
                    if (datoSelected !== 0) {
                        tw.store = {
                            ...tw.store,
                            anio: datoSelected
                        }
                    } else {
                        tw.store = {
                            ...tw.store,
                            anio: ''
                        }
                    }
                    console.log(tw.store);
                });
                query("#selectTipoRecaudo").on("change", async function (evt) {
                    console.log(">>> on click tipoRecaudo ");
                    var datoSelected = this.options[this.selectedIndex].value;
                    //idxIndicadorActivo = this.options[this.selectedIndex];
                    // idxIndicadorActivo = this.options.selectedIndex - 1;
                    console.log(">>> tipoRecaudo " + datoSelected);
                    tipoRecaudoSelected = "";
                    if (datoSelected != 0) {
                        tipoRecaudoSelected = datoSelected;
                        // consulta alfanumerica
                        // consulta geometrías
                        // pintar Coropletico nacional o departamental
                        // genero grafico de barras
                        tw.store = {
                            ...tw.store,
                            tipoRecaudo: datoSelected
                        }

                    } else {
                        tw.store = {
                            ...tw.store,
                            tipoRecaudo: ''
                        }
                    }
                });
                query("#ejecutar").on("click", async function (evt) {
                    const {indicador, entidadEspacial, tipoRecaudo} = tw.store;                    
                    loader2(true, "loadingIndicadores");
                    if (indicador == '8' && entidadEspacial == '1' && tipoRecaudo != '') { // logica rigo
                        tw._getGeometriesDepartamentos();
                    }else{
                        tw.ejecutar();
                    }
                });
                query("#btnRetornar").on("click", async function (evt) {
                    console.log(">>> on click retornar ");
                    tw.onClickRetornar();
                });
            },
            onOpen: function () {
                console.log(">>> onOpen...");
                this.limpiar();
                //var meta = document.createElement("meta");
                //meta.textContent = 'charset="UTF-8"'>
                //document.head.appendChild(meta);
                $('#idForm').show();
            },

            getTematicas: function () {
                console.log(">>> getTematicas...");
                this.hideing();

                const dataIndicadores = configWidget.Data.Indicadores;
                const dataEntidadEspacial = configWidget.Data.EntidadEspacial;
                const dataEstadoOcupacion = configWidget.Data.EstadoOcupacion;
                const dataClasifActivo = configWidget.Data.ClasificacionActivo;
                const dataTipoRecaudo = configWidget.Data.Indicadores;;

                cargarIndicadores(dataIndicadores, "seleccioneIndicador");
                agregarDataSelect(dataEntidadEspacial, "entidadEspacial", "valor", "clave");
                agregarDataSelect(dataEstadoOcupacion, "estadoOcupacion", "valor", "clave");
                agregarDataSelect(dataClasifActivo, "clasifActivo", "valor", "clave");
                cargarIndicadores(dataTipoRecaudo, "seleccioneIndicador");
            },

            ejecutar: function () {
                console.log(">>> ejecutar.. " + idIndicadorActivo);
                aplicaPorDpto = false;
                if (tw.esVisible("#estadoOcupacion") && estadoOcupacion.options.selectedIndex == 0) {
                    //console.log(">>> esVisible.. " + tw.esVisible("#estadoOcupacion"));
                    tw.displayMsgAlerta(alertaTitulo, alertaContenido);
                    return;
                }
                if (tw.esVisible("#clasifActivo") && clasifActivo.options.selectedIndex == 0) {
                    //console.log(">>> esVisible.. " + tw.esVisible("#clasifActivo"));
                    tw.displayMsgAlerta(alertaTitulo, alertaContenido);
                    return;
                }
                if (selectTipoRecaudo.options.selectedIndex < 1 && entidadEspacial.options.selectedIndex < 1) {
                    tw.displayMsgAlerta(alertaTitulo, alertaContenido);
                    return
                }
                if (tw.esVisible("#departamento")) {
                    aplicaPorDpto = true;
                }

                if (seleccioneIndicador.options.selectedIndex != 0 && entidadEspacial.options.selectedIndex != 0
                    && tematica.options.selectedIndex != 0) {

                    if (tw.getPrmt("entidadEspacial").includes("Departamento")) {
                        tw.procesarPorDpto();
                    } else {
                        if (departamento.options.selectedIndex != 0) {
                            tw.procesarPorMunicipio();
                        } else {
                            tw.displayMsgAlerta(alertaTitulo, alertaContenido);
                        }
                    }
//                    loader2(true, "loadingIndicadores");
                }
                else {
                    tw.displayMsgAlerta(alertaTitulo, alertaContenido);
                }
            },

            onClickRetornar: function () {
                console.log(">>> onClickRetornar.. ");
                document.getElementById("seleccioneIndicador").value = "0";
                tw.limpiar();
                tw.hideing();
                tw.removerCapa();

                tw.map.centerAndZoom(new Point(-74.0048100, 5.0220800), 5); 

                cerrarWidgetById("widgets_TablaResultadoSae_Widget_63_panel");
                $('#idForm').show();
                $('#tabResultado').hide();
                $('#divInformacion').hide();
            },
            seleccionarIndicador: function () {
                nomInd = configWidget.Data.Indicadores[idxIndicadorActivo]._nombre;
                console.log(">>> seleccionarIndicador.. " + nomInd + " id=" + idIndicadorActivo + " idx=" + idxIndicadorActivo);

                fullUrlActiva = configWidget.Data.Indicadores[idxIndicadorActivo].Servicio._url;
                fullUrlActiva += configWidget.Data.Indicadores[idxIndicadorActivo].Servicio._capa;
                idCapaActiva = configWidget.Data.Indicadores[idxIndicadorActivo].Servicio._capa;

                tw.limpiar();
                tw.hideing();
                tw.removerCapa();
                tematica.options.length = 0;
                $('#divEntidadEspacial').show();

                //if (seleccioneIndicador.options.selectedIndex != 0 && entidadEspacial.options.selectedIndex > 0) {
                if (seleccioneIndicador.options.selectedIndex != 0) {
                    console.log(">>> seleccionarIndicador.. (idx) " + idxIndicadorActivo);
                    // document.getElementById("lblNombreIndiciador").innerHTML = nomInd;
                    var secData, idSelect = "", divToShow = "";
                    if (idIndicadorActivo == 8) {
                        secData = configWidget.Data.Indicadores[idxIndicadorActivo].Sectorizacion;
                        idSelect = "selectTipoRecaudo"
                        divToShow = "divTipoRecaudo";
                    } else {
                        secData = configWidget.Data.Indicadores[idxIndicadorActivo].Sectorizacion;
                        idSelect = "tematica"
                        divToShow = "divTematica";
                    }
                    agregarDataSelectValueLabel(secData, idSelect);

                    var secData = configWidget.Data.Indicadores[idxIndicadorActivo].Sectorizacion;
                    agregarDataSelectValueLabel(secData, "tematica");

                    $('#divTematica').show();
                    if (idIndicadorActivo === "1") { // cef
                        tematica.options.selectedIndex = 1;
                        $('#divTematica').hide();
                    }
                } else {
                    tw.displayMsgAlerta("", "Debe seleccionar un indicador");
                }
            },
            _getGeometriesDepartamentos: function (params) { // RIGO
                loader2(true, "loadingIndicadores")
                const objConsulta = {
                    urlCapa: srvSae.geometriaLmteDepartamental
                }
                ejecutarQueryAndQueryTask(objConsulta, tw.succeededRequest, tw.errorRequest)                
            },
            succeededRequest: async function (respuesta) { //RIGO
                console.log({respuesta});
                //Agregarle variable alfanumerica a cada departamento     
                const dataByFMI = await tw._getDataAlfanumerica();
                const resAjusteCampoResponse = tw._ajusteCampoResponse(respuesta);
                const agregarDataNuevoCampo = tw._agregarDataNuevoCampo(dataByFMI, resAjusteCampoResponse);
                pintarPolygons(tw.map, agregarDataNuevoCampo)
                coropleticoNacional(agregarDataNuevoCampo);
            
            },
            errorRequest: function (error) { //RIGO
                console.error({error});
                loader2(false, "loadingIndicadores")
            },
            _ajusteCampoResponse: function (resp) { // RIGO
                const field = {
                    name: "TOTAL",
                    type: "esriFieldTypeInteger",
                    alias: "TOTAL"
                };
                resp.fields.push(field);
               return resp;
            },
            _agregarDataNuevoCampo: function (data, results) {
                for (i = 0; i < results.features.length; i++) {
                    var toPush = {};
                    toPush["TOTAL"] = acumularPorPropiedadCondicion(data, "idMunicipio", results.features[i].attributes.MpCodigo, "idMunicipio"); // ("AT_M2") acumulo usondo idMunicipio como prueba
                    // toPush["TOTAL"] = contarPorPropiedad(data, "idMunicipio", results.features[i].attributes.MpCodigo);                                        
                    Object.assign(results.features[i].attributes, toPush);
                }
                return results;
            },
            validarEntidadEspacial() {
                console.log(">>> validarEntidadEspacial.. " + tw.getPrmt("entidadEspacial"));
                $('#divDepartamento').hide();
                if (tw.getPrmt("entidadEspacial").includes("Municipio")) {
                    tw.cargarDepartamentos();
                }

            },
            cargarDepartamentos: async function () {
                console.log(">>> cargarDepartamentos.. ");
                // TODO: Consultar departamentos.
                let depart = await ejecutarConsulta(OG_Rancheria_Microfocalización_ICBF);
                // dataStorage.departamentos = depart.features;
                // depart = dataStorage.departamentos;
                console.log(depart);
                agregarDataSelect(depart.features, "departamento", "DEPARTAMEN", "COD_DEPART");
                // agregarDataSelectValueLabel(configWidget.Data.Departamentos, "departamento");
                $('#divDepartamento').show();
            },
            _getDataAlfanumerica: async function () {
                let resp = '';
                if (tw.store.entidadEspacial == '1') {                    
                    resp = await GetByidDepartamento(servicio_GetByidDepartamento)
                }else if(tw.store.entidadEspacial == '2'){
                    resp = await GetByidMunicipio(servicio_GetByidMunicipio + tw.store.departamento)
                }else if(tw.store.entidadEspacial == '3'){
                    resp = await GetByidRegional(servicio_GetByidRegional)
                }
                if (resp.status === 404) {
                    tw.displayMsgAlerta("Informacíón", `La consulta no encontró información`);
                    return
                } else if(resp.name === 'TypeError'){
                    // tw.displayMsgAlerta("Atención", `Se estan presentando problemas de red, favor intentarlo mas tarde o ponerse en contacto con tecnología`);
                    resp = dataInputJson;   // data de prueba
                    // return
                }
                return resp;
            },
            cargarTematica: function () {
            },

            esVisible: function (elemento) {
                //console.log(">>> esVisible.. ");
                var visible = false;
                if ($(elemento).is(':visible') && $(elemento).css("visibility") != "hidden"
                    && $(elemento).css("opacity") > 0) {
                    visible = true;
                }
//                console.log(">>> esVisible.. " + visible);
                return visible;
            },

            procesarPorDpto: async function () {
                console.log(">>> procesarPorDpto.. ");
                var capaLeyenda = "layerRenderMcpio";
                idCapaActivaAnt = idCapaActiva; 
                idCapaActiva = capaLeyenda;  
                tw.removerCapa(); 
                idCapaActiva = idCapaActivaAnt; 
                const resultJsonSae = dataInputJson; // 
                tw.acumularSegunPrmts(resultJsonSae); // 

            },

            //procesarPorMunicipio: async function () {
            procesarPorMunicipio: async function () {
                console.log(">>> procesarPorMunicipio.. ");
                //var urltmp = "http://utilidades.apipreprod.saesas.gov.co:4444/ServGeoPortal/api/FuenteGeoPortal/GetByidMunicipio/25815?Usuario=cflorez&Clave=Junio2023*+";
                // 25815 TOCAIMA
                //consumirSrvSae(urltmp);
                //const resultJsonSae = await ejecutarConsulta(urltmp); // ok
                //const resultJsonSae = await consumirSrvSae(urltmp); // Error de CORS

                const resultJsonSae =  await tw._getDataAlfanumerica(); // nueva data
                tw.acumularSegunPrmts(resultJsonSae);

            },
            acumularSegunPrmts: async function (datos) {
                console.log(">>> acumularSegunPrmts.. ");
                console.log({ datos });
                var idTematica = tw.getPrmtValue("tematica");
                var datos = await tw._getDataAlfanumerica(); // nueva data

                var propiedadAfiltrar = "";
                var valorAfiltrar = "";

                //var filtrado;
                var totales;

                switch (idIndicadorActivo) {
                    case "1":
                        //generarPorZonasDeUbicacion(datos);
                        coropleticoNacional(datos); // sin filtros solo contar rurales y ubanos
                        return;
                        break;

                    case "2":
                        propiedadAfiltrar = "ACTIVOSOCIAL";
                        valorAfiltrar = 'ACTIVO SOCIAL';

                        if (tw.getPrmt("tematica").includes("ACTIVO NO SOCIAL")) {
                            valorAfiltrar = "ACTIVO NO SOCIAL";
                        }
                        break;
                    case "3": // Inmuebles por estado legal
                        propiedadAfiltrar = "ESTADOLEGAL";
                        switch (idTematica) {
                            case "1":
                                valorAfiltrar = "EN PROCESO";
                                //valorAfiltrar = "EN PROCESO 100.00";
                                //valorAfiltrar = "EN PROCESO 50.00";
                                break;
                            case "2":
                                valorAfiltrar = "EXTINTO";
                                //valorAfiltrar = "EXTINTO 100.00";
                                break;
                            case "3":
                                valorAfiltrar = "IMPROCEDENTE";
                                break;
                            default:
                                break;
                        }
                        filtrado = filtarPorPropiedadValorIncludes(datos, propiedadAfiltrar, valorAfiltrar);
                        coropleticoNacional(filtrado); // Inmuebles por estado legal
                        return;
                        break;
                    case "4": //Inmuebles por rango de áreas, falta definir unidad de medida y rangos (Front)
                        propiedadAfiltrar = "AT_M2"; // ó "AreaTerreno"
                        switch (idTematica) {
                            case "1": // rango de areas catastrales en m2
                                //valorAfiltrar = "UNVALOR";
                                coropleticoNacional(datos);
                                return;
                                break;
                            case "2": // cantidad de inmuebles por rango de areas
//                                valorAfiltrar = "UNVALOR";
//                                tw.displayMsgAlerta("Informacíón", "Por implementar");
                                coropleticoNacional(datos);
                                return;
                                break;
                            default:
                                break;
                        }
                        break;
                    case "5": //Inmuebles por mecanismo de administración
                        // Consultar ESTADO DE OcUPACION - SUB FILTRO ???
                        // propiedadAfiltrar = "MecanismoAdministracion";
                        propiedadAfiltrar = "MECANISMOADMINISTRACIÓN" //monica;

                        switch (idTematica) {
                            case "1":
                                valorAfiltrar = "DEPÓSITO PROVISIONAL";
                                break;
                            case "2":
                                //valorAfiltrar = "ADMINISTRACI�N DIRECTA";
                                valorAfiltrar = "ADMINISTRACIÓN DIRECTA"; // no encuentra
                                break;
                            case "3":
                                valorAfiltrar = "DESTINACIÓN PROVICIONAL";
                                break;
                            case "4":
                                propiedadAfiltrar = "ESTADODEOCUPACION" //monica;
                                var estadoOcupacion = tw.getPrmtValue("estadoOcupacion");
                                switch (estadoOcupacion) {
                                    case "1":// 
                                        valorAfiltrar = "Ocupado";
                                        break;
                                    case "2":// 
                                        valorAfiltrar = "Desocupado";
                                        break;
                                    case "3":// 
                                        valorAfiltrar = "Arrendado";
                                        break;
                                }
                                break;
                            default:
                                break;
                        }
                        break;
                    case "6": //Inmuebles en disposicion final
                        propiedadAfiltrar = "ESTADOINVENTARIO";//monica
                        switch (idTematica) {
                            case "1":
                                valorAfiltrar = "VENTA DIRECTA";
                                break;
                            case "2":
                                valorAfiltrar = "VENTA POR ENAJENACIÓN TEMPRANA"; // si -  venta por operador comercial
                                break;
                            case "3":
                                valorAfiltrar = "VENTA MASIVA";  // venta por operador comercial
                                break;
                            case "4":
                                valorAfiltrar = "VENTA INDIVIDUAL"; // venta por operador comercial
                                break;
                            case "5":
                                valorAfiltrar = "DONACION";
                                break;
                            case "6":
                                valorAfiltrar = "DONACION EN PAGO O CRUCE DE CUENTAS";
                                break;
                            case "7":
                                valorAfiltrar = "REMATE";
                                break;
                            case "8":
                                valorAfiltrar = "DESTINACIÓN DEFINITIVA";
                                break;
                            case "9":
                                valorAfiltrar = "EN DEVOLUCIÓN";
                                break;
                            case "10":
                                valorAfiltrar = "EN DISPOSICIÓN TEMPORAL"; //si
                                break;
                            default:
                                break;
                        }
                        break;
                    case "7": //Valor economico del portafolio de inmuebles de SAE
                        //  solo un variabla (Avcat), valuo comercial no hay. aclarar 
                        //  var tematicaIndicador7 = tw.getPrmtValue("tematica");
                        propiedadAfiltrar = "ClasificacionActivo";
                        switch (idTematica) {
                            case "1":
                                propiedadAfiltrar = "AVALUOCOMERCIAL";
                                valorAfiltrar = "CASA";
                                coropleticoNacional(datos);
                                return;
                                break;
                            case "2":
                                propiedadAfiltrar = "AVALÚOCATASTRAL";
                                valorAfiltrar = "FINCA";
                                console.log("opc 2  este es el dats");
                                console.log(datos);
                                coropleticoNacional(datos);
                                return;
                                break;
                            case "3":
                                var clasifActivo = tw.getPrmtValue("clasifActivo");
                                switch (clasifActivo) {
                                    case "1":// 
                                        valorAfiltrar = "CASA";
                                        break;
                                    case "2":// 
                                        valorAfiltrar = "FINCA";
                                        break;
                                    case "3":// 
                                        valorAfiltrar = "LOTE";
                                        break;
                                    case "4":// 
                                        valorAfiltrar = "CASA LOTE";
                                        break;
                                }
                                propiedadAfiltrar = "CLASIFICACIÓNACTIVO";
                                filtrado = filtarPorPropiedadValorIncludes(datos, propiedadAfiltrar, valorAfiltrar);
                                console.log("opc 3  este es el filtado");
                                console.log(filtrado);
                                coropleticoNacional(filtrado); // 
                                return;
                                break;
                            case "2":
                                valorAfiltrar = "CASA LOTE";
                                break;
                            default:
                                break;
                        }
                        break;
                    case "12":
                        switch (idTematica) {
                            case "1": // Proyectos e Iniciativas
/*
                                propiedadAfiltrar = "UNAPROPIEDAD";
                                valorAfiltrar = 'UNVALOR';
                                filtrado = filtarPorPropiedadValor(datos, propiedadAfiltrar, valorAfiltrar);
                                coropleticoNacional(datos);
*/
                                tw.displayMsgAlerta("Informacíón", "Por definir variable");

                                return;
                                break;
                            case "2": // Inmuebles por proyecto especial
                                propiedadAfiltrar = "PROYECTOS_ESPECIALES";
                                valorAfiltrar = '1';
                                filtrado = filtarPorPropiedadValor(datos, propiedadAfiltrar, valorAfiltrar);
                                coropleticoNacional(filtrado);
                                return;
                                break;
                            default:
                                break;
                        }

                        break;
                    case "13":
                        switch (idTematica) {
                            case "1": // Beneficiarios de arrendamientos sociales
                                /*
                                   propiedadAfiltrar = "UNAPROPIEDAD";
                                   valorAfiltrar = 'UNVALOR';
                                   filtrado = filtarPorPropiedadValor(datos, propiedadAfiltrar, valorAfiltrar);
                                   coropleticoNacional(datos);
                                */
                                tw.displayMsgAlerta("Informacíón", "Por definir variable");

                                return;
                                break;
                            case "2": // Beneficiarios indirectos de destinaciones provisionales
/*
                                propiedadAfiltrar = "ADSFASDFASDF";
                                valorAfiltrar = 'XYZ';
                                filtrado = filtarPorPropiedadValor(datos, propiedadAfiltrar, valorAfiltrar);
                                coropleticoNacional(filtrado);
*/
                                tw.displayMsgAlerta("Informacíón", "Por definir variable");

                                return;
                                break;
                            case "3": //Beneficiarios de destinaciones definitivas
                                /*
                                  propiedadAfiltrar = "ADSFASDFASDF";
                                  valorAfiltrar = 'XYZ';
                                  filtrado = filtarPorPropiedadValor(datos, propiedadAfiltrar, valorAfiltrar);
                                  coropleticoNacional(filtrado);
                                */
                                tw.displayMsgAlerta("Informacíón", "Por definir variable");

                                return;
                                break;
                            default:
                                break;
                        }

                        break;
                    case "14": // Areas democratizadas
                        switch (idTematica) {
                            case "1": // Proyectos e iniciativas con fines sociales
                                /*
                                   propiedadAfiltrar = "ADSFASDFASDF";
                                   valorAfiltrar = 'XYZ';
                                   filtrado = filtarPorPropiedadValor(datos, propiedadAfiltrar, valorAfiltrar);
                                   coropleticoNacional(datos);
                                */
                                tw.displayMsgAlerta("Informacíón", "Por definir variable");

                                return;
                                break;
                            case "2": // Otras, por definir
                                tw.displayMsgAlerta("Informacíón", "Por definir variable - Desagregacion");
                                return;
                                break;
                            default:
                                break;
                        }

                        break;
                    default:
                        break;
                } // final switch

                if (parseInt(idIndicadorActivo) > 7) {
                    tw.displayMsgAlerta("Informacíón", "Por aclarar !!!");
                } else if (parseInt(idIndicadorActivo) == 7) {
                    totales = contarPorTematica(datos, propiedadAfiltrar);
                    if (idIndicadorActivo === "7") { //Valor economico del portafolio
                        totales = acumularValor(datos, propiedadAfiltrar, "Avcat");
                        // acumularValorIndicador7
                        var resultadoMunicipio = acumularValorIndicador7(datos, propiedadAfiltrar, 'idMunicipio');
                        console.log(resultadoMunicipio);
                        tw.displayMsgAlerta("Informacíón", "Por aclarar !!! *"); 
                    }
                }
                else {

                    filtrado = filtarPorPropiedadValor(datos, propiedadAfiltrar, valorAfiltrar);
                    //filtrado = datos // prueba

                    if (Object.keys(filtrado).length == 0) {
                        tw.displayMsgAlerta("Informacíón", "Sin regitros para criterios seleccionados");
                    } else {
                        totales = contarPorTematica(filtrado, "Subtipo");
                        if (idIndicadorActivo === "7") { //Valor economico del portafolio
                            totales = acumularValor(filtrado, "SUBTIPOACTIVO", "AT_M2"); //  "idDepartamento"
                        }
                        console.log({ filtrado });
                        coropleticoNacional(filtrado);
                    }
                }
            },


            getExpresionWhere: function () {
                var idTematica = tw.getPrmtValue("tematica");
                var where = "1=1 ";

                //var mcpio = "ZIPAQUIRÁ"; // temporal  
                //var andMcpio = "AND MPIO = '" + dptoActivo+ "'"; //   

                switch (idIndicadorActivo) {
                    case "1":
                        //where += andMcpio;
                        break;
                    case "2000":
                        where = "ACTIVO_SO = 'ACTIVO SOCIAL'";
                        if (tw.getPrmt("tematica").includes("Inmuebles NO Sociales")) {
                            where = "ACTIVO_SO = 'ACTIVO NO SOCIAL'";
                        }
                        break;
                    case "2":
                        var valor = tw.getPrmt("tematica")
                        var variable = tw.getPrmtValue("tematica")
                        where = variable + " = " + "'" + valor + "'";
                        console.log("case 2 where: " + where);
                        break;
                    case "3":
                        switch (idTematica) {
                            case "1":
                                where = "VARIABLE31 = 'En proceso de extincion de dominio' "
                                break;
                            case "2":
                                where = "VARIABLE32 = 'Extinto' "
                                break;
                            case "3":
                                where = "VARIABLE33 = 'Improcedente' "
                                break;
                            default:
                                break;
                        }
                        break;
                    case "4":

                        break;
                    case "5":
                        if (tw.getPrmtValue("tematica") === "4") {  // estado de ocupacion
                            var vlrSeleccion = "'" + tw.getPrmt("estadoOcupacion") + "'";
                            where = "ESTADO_OC = " + vlrSeleccion;
                        }
                        break;
                    case "6":
                        switch (idTematica) {
                            case "1":
                                where = "VARIABLE61 = 'Venta directa' "
                                break;
                            case "2":
                                where = "VARIABLE62 = 'Enajenaci\u00f3n temprana' "
                                break;
                            case "3":
                                where = "VARIABLE63 = 'Venta masiva' "
                                break;
                            case "4":
                                where = "VARIABLE64 = 'Venta Individual' "
                                break;
                            case "5":
                                where = "VARIABLE65 = 'Donaci\u00f3n' "
                                break;
                            case "6":
                                where = "VARIABLE66 = 'Daci\u00f3n en pago o cruce de cuentas' "
                                break;
                            case "7":
                                where = "VARIABLE67 = 'Remate' "
                                break;
                            case "8":
                                where = "VARIABLE68 = 'Destinaci\u00f3n Definitiva' "
                                break;
                            default:
                                break;
                        }
                        break;
                    case "9":
                        //where = "1 = 1";
                        break;
                    default:
                        break;

                }
                //if (tw.esVisible("#departamento")) { //da false cuando esta minimizado
                if (aplicaPorDpto) {
                    where += " AND DPTO = '" + tw.getPrmt("departamento").toUpperCase() + "'";
                }
                //console.log(">>> getExpresionWhere.. "+where);
                return where;
            },

            queryTask_Failed: function (error) {
                var titulo = "<B> Informaci&oacute;n </B>";
                var contenido = "Error consultando información. ";
                tw.displayMsgAlerta(titulo, contenido + "CodError:" + error.code);
            },

            mostrarGraficoBarras: function (featuresResultados) {
                //console.log(">>> mostrarGraficoBarras  ", featuresResultados);
                var totRural = featuresResultados.features[0].attributes.TotalSubtipo;
                var totUrbano = featuresResultados.features[1].attributes.TotalSubtipo;

                if (totRural === undefined && totUrbano === undefined) {
                    tw.displayMsgAlerta("Información", "Sin datos para graficar");
                    return;
                }
                document.getElementById("reportTotalsChartDiv").innerHTML = "";
                document.getElementById("lblNombreIndiciador").innerHTML = "";
                var titInd = document.getElementById("lblNombreIndiciador").innerHTML = nomInd;
                var nomTematica = "<br>" + tw.getPrmt("tematica");
                var nomEntidadEspacial = "<br>" + tw.getPrmt("entidadEspacial");
                var nombreEntEspacio = "<br>" + nombreEntidad;

                document.getElementById("lblNombreIndiciador").innerHTML = titInd.toUpperCase() + nomTematica + nomEntidadEspacial + nombreEntEspacio;
                //document.getElementById("lblNombreIndiciador").innerHTML = titInd.toUpperCase() + nomTematica + nomEntidadEspacial;

                $('#idForm').hide();
                $('#tabResultado').show();
                $('#btnRetornar').show();

                var dataForTable = featuresResultados.features;

                if (dataForTable.length <= 0) {
                    tw.displayMsgAlerta("Informacion", "Sin registros para procesar");
                } else {

                    var labelsGenerar = [];
                    var tmpindice = 1;

                    var c = new dojox.charting.Chart2D("reportTotalsChartDiv");

                    c.addPlot("default", {
                        type: "Columns",
                        tension: 3,
                        gap: 10,
                    });

                    dataForTable.forEach(registro => {
                        labelsGenerar.push({
                            value: tmpindice,
                            text: registro.attributes.SUBTIPOACTIVO
                        });
                        tmpindice += 1;
                    });

                    c.addAxis("x", {
                        labels: labelsGenerar,
                        fixLower: "major",
                        fixUpper: "major"
                    });
                    c.addAxis("y", {
                        vertical: true,
                        fixLower: "major",
                        fixUpper: "major",
                        min: 0
                    });
                    c.setTheme(dojox.charting.themes.Wetland);


                    //Aqui las series
                    dataForTable = featuresResultados.features;
                    tmpindice = 1;
                    dataForTable.forEach(registro => {
                        c.addSeries("PREDIOS" + tmpindice, [{
                            y: registro.attributes.TotalSubtipo,
                            x: tmpindice,
                            tooltip: registro.attributes.SUBTIPO + ':' + registro.attributes.TotalSubtipo,
                        }], {
                            stroke: {
                                color: registro.attributes.SUBTIPO == "RURAL" ? "gold" : "salmon",
                                width: 2
                            },
                            fill: registro.attributes.SUBTIPO == "RURAL" ? "khaki" : "lightsalmon",
                        });
                        tmpindice += 1;
                    });

                    var a1 = new dojox.charting.action2d.Tooltip(c, "default");
                    var a2 = new dojox.charting.action2d.Highlight(c, "default");
                    c.render();
                }
            },

            getPrmt: function (idSel) {
                combo = document.getElementById(idSel);
                selected = combo.options[combo.selectedIndex].text;
                return selected;
            },

            getPrmtValue: function (idSel) {
                combo = document.getElementById(idSel);
                selected = combo.options[combo.selectedIndex].value;
                return selected;
            },

            removerCapa: function () {
                console.log(">>> removerCapa.. ", idCapaActiva);

                if (clickHandler) {
                    clickHandler.remove();
                }

                if (tw.map.getLayer(idCapaActiva) != undefined) {
                    tw.map.removeLayer(tw.map.getLayer(idCapaActiva));
                }
            },


            onClose: function () {
                console.log(">>> onClose.. ");
                document.getElementById("seleccioneIndicador").value = "0";
                ////this.limpiar();
                ////this.hideing();
                tw.onClickRetornar(); // limpia y oculta
            },
            limpiar: function () {
                console.log(">>> limpiar.. ");
                //document.getElementById("seleccioneIndicador").value = "0";
                document.getElementById("seleccioneTematica").value = "0";
                document.getElementById("entidadEspacial").value = "0";
                document.getElementById("departamento").value = "0";
                document.getElementById("tematica").value = "0";
                document.getElementById("anio").value = "0";
                document.getElementById("clasifActivo").value = "0";
                document.getElementById("lblNombreIndiciador").innerHTML = "";
            },

            hideing: function () {
                console.log(">>> hideing.. ");
                $('#divSeleccioneTematica').hide();
                $('#divEntidadEspacial').hide();
                $('#divDepartamento').hide();
                $('#divTematica').hide();
                $('#divAnio').hide();
                $('#tabResultado').hide();
                $('#btnRetornar').hide();
                $('#divInformacion').hide();
                $('#divEstadoOcupacion').hide();
                $('#divClasifActivo').hide();
                $('#divTipoRecaudo').hide();
            },

            showing: function () {
                console.log(">>> showing.. ");
                $('#divSeleccioneTematica').show();
                $('#divEntidadEspacial').show();
                $('#divDepartamento').show();
                $('#divTematica').show();
                $('#divAnio').show();
            },

            displayMsgAlerta: function (titulo, msg) {
                createDialogInformacionGeneral(titulo, msg);
                loader2(false, "loadingIndicadores");
            },
        })

    });

function cerrarWidgetById(idWidget) {
    require(["jimu/PanelManager"],
        function (PanelManager) {
            console.log(">>> cerrarWidgetById.. ");
            panelManager = PanelManager.getInstance();
            //widgetCerrar = PanelManager.getInstance().getPanelById("widgets_TablaResultadoSae_Widget_63_panel");
            widgetCerrar = PanelManager.getInstance().getPanelById(idWidget);
            for (var e in PanelManager.getInstance().panels) {
                //if (PanelManager.getInstance().panels[e].id == "widgets_TablaResultadoSae_Widget_63_panel") {
                if (PanelManager.getInstance().panels[e].id == idWidget) {
                    widgetCerrar = PanelManager.getInstance().panels[e].id;
                }
            }
            if (widgetCerrar != undefined) {
                //panelManager.closePanel("widgets_TablaResultadoSae_Widget_63_panel");
                //panelManager.destroyPanel("widgets_TablaResultadoSae_Widget_63_panel");
                panelManager.closePanel(idWidget);
                panelManager.destroyPanel(idWidget);
            }
        }
    )
}
function consumirSrvSae(url) {
    console.log(">>> consumirSrvSae: ")
    $.ajax({
        cache: true,
        type: "GET",
        url: url,
        timeout: 10000,
        contentType: "application/javascript",
        dataType: "json",
        async: false,
        success: function (result) {
            //SrvSucceeded(result);
            return result;
        },
        error: function (xhr, status, error) {
            //SrvFailed(xhr);
            alert(">>> " + error + " status:" + status + " xhr:" + xhr);
            return {};
        },

    });
    function SrvSucceeded(result, whereExpression) {
        console.log(">>> SrvSucceeded: " + result)
    }
    function SrvFailed(xhr) {
        console.log(">>> SrvFailed: " + xhr)
    }
}




function escClosesPopup(key) {
    if (key.keyCode == 27) {
        tw.map.infoWindow.hide();
    }
}
function coropleticoNacional(filtrado) {
    require([
        "esri/layers/FeatureLayer",
        "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol",
        "esri/renderers/SimpleRenderer", "esri/graphic", "esri/InfoTemplate",
        "esri/Color",
        "dijit/popup",
        "esri/geometry/Point",
        "esri/tasks/query",
        "dojo/parser",
        "esri/geometry/projection",
        "esri/renderers/ClassBreaksRenderer",
        "esri/SpatialReference",
        "esri/graphicsUtils",
        "dojo/data/ItemFileReadStore",
        "esri/renderers/smartMapping",

    ], function (
        FeatureLayer,
        SimpleFillSymbol, SimpleLineSymbol,
        SimpleRenderer, Graphic, InfoTemplate,
        Color,
        dijitPopup,
        Point,
        Query,
        parser,
        projection,
        ClassBreaksRenderer,
        SpatialReference,
        graphicsUtils,
        ItemFileReadStore,
        smartMapping

    ) {
        parser.parse(); //

        console.log(">>> coropleticoNacional.. ", filtrado );

        var where = "1 = 1";
        var url = srvSae.geometriaLmteDepartamental;
        if (entidadEspacialActiva === MUNICIPIOS) {
            url = srvSae.geometriaLmteMunicipal;
            var dptoSelected = tw.getPrmtValue("departamento");
            where = "DeCodigo = '" + dptoSelected + "'";
        } else if (entidadEspacialActiva === REGIONALES){
            url = srvSae.geometriaRegional;
        }

        var idCapa = "layerNacional";
        idCapaActiva = idCapa;
        dptoActivo = "";

        tw.removerCapa();

        clickHandler = tw.map.graphics.on('click', changeHandler);

        function changeHandler(evt) {
            var graphic = evt.graphic;
            console.log("Clicked graphic:", graphic);

            var filtradoPorEntidad;
            if (entidadEspacialActiva === DEPARTAMENTOS) {
                filtradoPorEntidad = filtarPorPropiedadValor(filtrado, "idDepartamento", dptoActivo);
                if (filtradoPorEntidad.length > 0) {
                    nombreEntidad = filtradoPorEntidad[0].DEPARTAMENTO;
                } else {
                    nombreEntidad = " ";
                }
            }
            if (entidadEspacialActiva === MUNICIPIOS) {
                filtradoPorEntidad = filtarPorPropiedadValor(filtrado, "idMunicipio", mpioActivo);
                if (filtradoPorEntidad.length > 0) {
                    nombreEntidad = filtradoPorEntidad[0].MUNICIPIO;
                } else {
                    nombreEntidad = " ";
                }
            }
            if (entidadEspacialActiva === REGIONALES) {
                filtradoPorEntidad = filtarPorPropiedadValor(filtrado, "idRegional", regionalActiva);
                if (filtradoPorEntidad.length > 0) {
                    nombreEntidad = filtradoPorEntidad[0].REGIONAL;
                } else {
                    nombreEntidad = " ";
                }
            }
			//mfc
			var totales = null;
			if (idIndicadorActivo === "7") {

				var idTematicaInd7 = tw.getPrmtValue("tematica");
				console.log("idTematicaInd7: " + idTematicaInd7);
				var propAcumular = "";
				if (idTematicaInd7 == "1") {
					propAcumular = "AVALUOCOMERCIAL";
				} else if (idTematicaInd7 == "2") {

					propAcumular = "AVALÚOCATASTRAL";
				}

				totales = sumarPorTematicaValor(filtradoPorEntidad, "SUBTIPOACTIVO", propAcumular);
			} else {

				totales = contarPorTematica(filtradoPorEntidad, "SUBTIPOACTIVO");
			}
			
			//cef
            //var totales = contarPorTematica(filtradoPorEntidad, "SUBTIPOACTIVO");
            tw.mostrarGraficoBarras(totales);
        };

        var outSpatialReference = new SpatialReference({ wkid: 102100, "latestWkid": 4326 })

        var query = new esri.tasks.Query();
        var queryTask = new esri.tasks.QueryTask(url);

        query.where = where;
        query.outFields = ["*"];
        query.OutSpatialReference = outSpatialReference; //.
        query.returnGeometry = true;

        //queryTask.execute(query, setearTotales, tw.queryTask_Failed);
        queryTask.execute(query).then(function (results) {

            projection.load().then(function () {
                var features = results.features;
                for (var i = 0; i < features.length; i++) {
                    var projectedGeometry = projection.project(features[i].geometry, outSpatialReference);
                    features[i].geometry = projectedGeometry;

                    if (features[i]._extent != undefined) {
                        var projectedExtend = projection.project(features[i]._extent, outSpatialReference);
                        features[i]._extent = projectedExtend;
                    }
                };
            }).otherwise(function (error) {
                console.log("Se produjo un error al proyectar.", error);
            });

            console.log('>>>> features ', results.features);


            var field = {
                name: "TOTAL",
                type: "esriFieldTypeInteger",
                alias: "TOTAL"
            };

            results.fields.push(field);

            for (i = 0; i < results.features.length; i++) {
                var toPush = {};
                if (entidadEspacialActiva === MUNICIPIOS) {
                    if (idIndicadorActivo === "4") {

                        toPush["TOTAL"] = acumularPorPropiedadCondicion(filtrado, "idMunicipio", results.features[i].attributes.MpCodigo, "idMunicipio"); // ("AT_M2") acumulo usondo idMunicipio como prueba
                    }else if (idIndicadorActivo === "7") {

                        var idTematicaInd7 = tw.getPrmtValue("tematica");
                        console.log("idTematicaInd7: " + idTematicaInd7);
                        var propAcumular = "";
                        if (idTematicaInd7 == "1") {
                            propAcumular = "AVALUOCOMERCIAL";
                        } else if (idTematicaInd7 == "2") {

                            propAcumular = "AVALÚOCATASTRAL";
                        }

                        toPush["TOTAL"] = acumularPorPropiedadCondicion(filtrado, "idMunicipio", results.features[i].attributes.MpCodigo, propAcumular);
                    } else {

                        toPush["TOTAL"] = contarPorPropiedad(filtrado, "idMunicipio", results.features[i].attributes.MpCodigo);
//                      toPush["TOTAL"] = getRandomInt();
                    }


                }
                if (entidadEspacialActiva === DEPARTAMENTOS) {
                    if (idIndicadorActivo === "4") {
                        toPush["TOTAL"] = acumularPorPropiedadCondicion(filtrado, "idDepartamento", results.features[i].attributes.DeCodigo, "idMunicipio"); // ("AT_M2") acumulo usando idMunicipio como prueba
                    } else if (idIndicadorActivo === "7") {

                        var idTematicaInd7 = tw.getPrmtValue("tematica");
                        console.log("idTematicaInd7: " + idTematicaInd7);
                        var propAcumular = "";
                        if (idTematicaInd7 == "1") {
                            propAcumular = "AVALUOCOMERCIAL";
                        } else if (idTematicaInd7 == "2") {

                            propAcumular = "AVALÚOCATASTRAL";
                        }

                        toPush["TOTAL"] = acumularPorPropiedadCondicion(filtrado, "idDepartamento", results.features[i].attributes.DeCodigo, propAcumular);
                    } else {
                        toPush["TOTAL"] = contarPorPropiedad(filtrado, "idDepartamento", results.features[i].attributes.DeCodigo);
                    }
                }
                if (entidadEspacialActiva === REGIONALES) {
                    if (idIndicadorActivo === "4") {
                        toPush["TOTAL"] = acumularPorPropiedadCondicion(filtrado, "idRegional", results.features[i].attributes.OBJECTID, "AT_M2"); 
                    } else {
                        toPush["TOTAL"] = contarPorPropiedad(filtrado, "idRegional", results.features[i].attributes.OBJECTID);
                    }
                }
                Object.assign(results.features[i].attributes, toPush);
            }


            let layerDefinition = {
                objectIdField: "OBJECTID",
                geometryType: "esriGeometryPolygon",
                spatialReference: outSpatialReference,
                fields: results.fields,
                name: 'layerNacional',
                mode: FeatureLayer.MODE_SNAPSHOT
            };

            if (consts.debug) {
                console.log(">>>>>>>>>>>> layerDefinition");
                console.log(layerDefinition);
            }

            let featureCollection = {
                layerDefinition: layerDefinition,
                featureSet: {
                    features: results.features,
                    //                    features: features.features,
                    //                    features: features,
                    geometryType: results.geometryType,
                    "spatialReference": outSpatialReference
                }
            };

            var symbol = new SimpleFillSymbol();
            symbol.setColor(new Color([150, 150, 150, 0.5]));

            var renderer = new ClassBreaksRenderer(symbol, "TOTAL");
            renderer.addBreak(1, 10, new SimpleFillSymbol().setColor(new Color([56, 168, 0, 0.5])));
            renderer.addBreak(10, 20, new SimpleFillSymbol().setColor(new Color([139, 209, 0, 0.5])));
            renderer.addBreak(20, 30, new SimpleFillSymbol().setColor(new Color([255, 255, 0, 0.5])));
            renderer.addBreak(30, 40, new SimpleFillSymbol().setColor(new Color([255, 128, 0, 0.5])));
            renderer.addBreak(40, Infinity, new SimpleFillSymbol().setColor(new Color([255, 0, 0, 0.5])));

            //var infoTemplate = new InfoTemplate("${DEPARTAMEN}", "${TOTAL}");

            var layerDptos = new FeatureLayer(featureCollection, {
                id: idCapa,
                visible: true,
                //infoTemplate: infoTemplate
            });

            tw.map.addLayer(layerDptos);
            layerDptos.on("load", function () {
                if (idIndicadorActivo === "4" || idIndicadorActivo === "7" ) {
                    var fieldName = "TOTAL";
                    crearRenderRangoAreas_Cef(fieldName);
                } else {
                    layerDptos.setRenderer(renderer);
                }
            });

            function crearRenderRangoAreas_Cef(field) {
                console.log(">>> crearRenderRangoAreas_Cef");
                smartMapping.createClassedColorRenderer({
                    layer: layerDptos,
                    field: field,
                    //basemap: "osm", // ok
                    basemap: "streets", // ok
                    classificationMethod: "equal-interval"
                }).then(function (response) {
                    layerDptos.setRenderer(response.renderer);
                    layerDptos.redraw();
                    //createLegend(map, layer, field);
                });
            }
            projection.load().then(function () {
                let extent = graphicsUtils.graphicsExtent(layerDptos.graphics);
                let extendNew = projection.project(extent, outSpatialReference);
                tw.map.setExtent(extendNew, true);
                loader2(false, "loadingIndicadores");
            });

            layerDptos.on("mouse-over", function (evt) {
                //console.log(">>> mouse-over");
                dptoActivo = evt.graphic.attributes.DeCodigo;
                mpioActivo = evt.graphic.attributes.MpCodigo;
                regionalActiva = evt.graphic.attributes.OBJECTID;

                var highlightSymbol = new SimpleFillSymbol(
                    SimpleFillSymbol.STYLE_SOLID,
                    new SimpleLineSymbol(
                        SimpleLineSymbol.STYLE_SOLID,
                        new Color([255, 0, 0]), 3
                    ),
                    new Color([125, 125, 125, 0.35])
                );

                mostrarTotalPredios(evt.graphic.attributes.TOTAL, evt.pageX, evt.pageY);

                var highlightGraphic = new Graphic(evt.graphic.geometry, highlightSymbol);
                tw.map.graphics.add(highlightGraphic);

                tw.map.graphics.enableMouseEvents();

                //tw.map.graphics.on("click", procesarClickCapa(filtrado));
/*
                tw.map.graphics.on("click", function (evt) {
                    var filtradoPorEntidad;
                    if (entidadEspacialActiva === DEPARTAMENTOS) {
                        filtradoPorEntidad = filtarPorPropiedadValor(filtrado, "idDepartamento", dptoActivo);
                        if (filtradoPorEntidad.length > 0) {
                            nombreEntidad = filtradoPorEntidad[0].DEPARTAMENTO;
                        } else {
                            nombreEntidad = " ";
                        }
                    }
                    if (entidadEspacialActiva === MUNICIPIOS) {
                        filtradoPorEntidad = filtarPorPropiedadValor(filtrado, "idMunicipio", mpioActivo);
                        if (filtradoPorEntidad.length > 0) {
                            nombreEntidad = filtradoPorEntidad[0].MUNICIPIO;
                        } else {
                            nombreEntidad = " ";
                        }
                    }

                    var totales = null;
                    if (idIndicadorActivo === "7") {

                        var idTematicaInd7 = tw.getPrmtValue("tematica");
                        console.log("idTematicaInd7: " + idTematicaInd7);
                        var propAcumular = "";
                        if (idTematicaInd7 == "1") {
                            propAcumular = "AVALUOCOMERCIAL";
                        } else if (idTematicaInd7 == "2") {

                            propAcumular = "AVALÚOCATASTRAL";
                        }

                        totales = sumarPorTematicaValor(filtradoPorEntidad, "SUBTIPOACTIVO", propAcumular);
                    } else {

                        totales = contarPorTematica(filtradoPorEntidad, "SUBTIPOACTIVO");
                    }
                  //  var totales = contarPorTematica(filtradoPorEntidad, "SUBTIPOACTIVO"); // Subtipo: anterior, SUBTIPOACTIVO: nuevo
                   // sumarPorTematicaValor
                    //                    console.log(">>> click: filtrado", filtrado);
                    //                    console.log(">>> click: totales", totales);

                    if (entidadEspacialActiva === REGIONALES) {
                        filtradoPorEntidad = filtarPorPropiedadValor(filtrado, "idRegional", regionalActiva);
                        if (filtradoPorEntidad.length > 0) {
                            nombreEntidad = filtradoPorEntidad[0].REGIONAL;
                        } else {
                            nombreEntidad = " ";
                        }
                    }
                    var totales = contarPorTematica(filtradoPorEntidad, "SUBTIPOACTIVO"); 
                    //console.log(">>> click: filtrado", filtrado);
                    //console.log(">>> click: totales", totales);

                    tw.mostrarGraficoBarras(totales);


                });
*/

            });
        });
    })
}
function mostrarTotalPredios(total, x, y) {
    require([
        "dojo/dom-style",
        "dijit/TooltipDialog", "dijit/popup", "dojo/domReady!",
    ], function (
        domStyle,
        TooltipDialog, dijitPopup,
    ) {
        //        console.log(">>> mostrarTotalPredios ");
        totPrediosMpio = total;

        tw.map.graphics.enableMouseEvents();
        tw.map.graphics.on("mouse-out", closeDialogInQuery);

        var idDialog = "tooltipDialog";
        if (dijit.byId(idDialog)) { dijit.byId(idDialog).destroyRecursive(); }

        var contenido = "<strong>Total Predios: </strong>" + "<strong>" + totPrediosMpio + "</strong>";


        contenido += "<br><br> Click para detalle.";
        var dialog = new TooltipDialog({
            id: idDialog,
            style: "position: absolute; width: 200px; font: normal normal normal 10pt Helvetica;z-index:100",
            content: "",
            onBlur: function () {
                popup.close(this);
                this.destroyRecursive();
            }
        });
        dialog.startup();

        if (totPrediosMpio > 0) {
            dialog.setContent(contenido);

            domStyle.set(dialog.domNode, "opacity", 0.85);
            dijitPopup.open({
                popup: dialog,
                x: x,
                y: y
            });
        }

        function closeDialogInQuery() {
            //console.log(">>> closeDialogInQuery.. ");
            tw.map.graphics.enableMouseEvents();
            tw.map.graphics.clear();
            dijitPopup.close(dialog);
        }
    });
    return;
}

function generarPorZonasDeUbicacion(data) {
    console.log('>>> generarPorZonasDeUbicacion');

    var totales;
    var propiedadAfiltrar = "SUBTIPOACTIVO"; // Rural - Urbano
    var valorAfiltrar = "URBANO";
    var filtradoUrbano = filtarPorPropiedadValor(data, propiedadAfiltrar, valorAfiltrar);

    var valorAfiltrar = "RURAL";
    var filtradorRural = filtarPorPropiedadValor(data, propiedadAfiltrar, valorAfiltrar);
    var filtradoUnion = filtradoUrbano.concat(filtradorRural);

    //totales = contarPorTematica(filtradoUnion, propiedadAfiltrar);
    coropleticoNacional(data);
}
function forzarSoloPuertosHttps() {
    if (window.location.protocol.indexOf('https') == 0) { // solo par https
        var el = document.createElement('meta')
        el.setAttribute('http-equiv', 'Content-Security-Policy')
        el.setAttribute('content', 'upgrade-insecure-requests')
        document.head.append(el)
    }
}
