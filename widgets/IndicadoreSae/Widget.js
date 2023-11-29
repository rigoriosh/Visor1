// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

//const { isUndefined } = require("../../libs/underscore/underscore-min");

//>>built
var tw;
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
var aplicaPorDpto = false;
var gContinua = false;

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

            _codTest: function () {
                console.log("_codTest");
                const FL = pintarFeatureLayer("https://sae.igac.gov.co/arcgis/rest/services/SAE/OTROS/MapServer/3", "limiteDepartamental", this.map);
                setTimeout(() => {
                    console.log({ FL });
                    pintarPolygons(tw.map, {
                        features: FL.graphics,
                        geometryType: FL.geometryType
                    })
                }, 2000);
            },

            postCreate: function () {
                console.log(">>> postCreate...");
                this.inherited(arguments);
            },

            startup: function () {
                this.inherited(arguments);
                tw = this;
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
                        tw.limpiar();
                        tw.hideing();
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
                    //console.log(">>>>>>>> store"+tw.store);
                });

                query("#entidadEspacial").on("change", async function (evt) {
                    var datoSelected = this.options[this.selectedIndex].value;
                    //console.log(datoSelected);
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
                    tw.validarEntidadEspacial();
                });
                query("#departamento").on("change", async function (evt) {
                    var datoSelected = this.options[this.selectedIndex].value;
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
                    console.log(tw.store);
                });
                query("#tematica").on("change", async function (evt) {
                    var datoSelected = this.options[this.selectedIndex].value;
                    var textSelected = this.options[this.selectedIndex].text;
                    //  console.log(">>> tematica datoSelected " + datoSelected);
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
                    if (datoSelected !== 0 && (textSelected.includes === "comerciales" || textSelected.includes === "catastrales" )) { // Catastral o comercial
                        $('#divClasifActivo').show();
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
                    tipoRecaudoSelected="";
                    if (datoSelected != 0) {
                        tipoRecaudoSelected = datoSelected;
                        // consulta alfanumerica
                        // consulta geometrías
                        // pintar Coropletico nacional o departamental
                        // genero grafico de barras
                        
                    }
                    // tw.seleccionarIndicador();
                });
                query("#ejecutar").on("click", async function (evt) {
                    tw.ejecutar();
                });
                query("#btnRetornar").on("click", async function (evt) {
                    console.log(">>> on click retornar ");
                    tw.onClickRetornar();
                });
            },
            onOpen: function () {
                console.log(">>> onOpen...");
                this.limpiar();
//                this._codTest(); // ok

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
                if (selectTipoRecaudo.options.selectedIndex < 1 &&  entidadEspacial.options.selectedIndex < 1) {
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
                    loader2(true, "loadingIndicadores");
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
                    if (idIndicadorActivo ==  8) {
                        secData = configWidget.Data.Indicadores[idxIndicadorActivo].Sectorizacion;
                        idSelect = "selectTipoRecaudo"       
                        divToShow = "divTipoRecaudo";
                    }else{
                        secData = configWidget.Data.Indicadores[idxIndicadorActivo].Sectorizacion;
                        idSelect = "tematica"
                        divToShow = "divTematica";
                    }
                    agregarDataSelectValueLabel(secData, idSelect);

                    $(`#${divToShow}`).show();

                } else {
                    tw.displayMsgAlerta("", "Debe seleccionar un indicador");
                }
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
                agregarDataSelect(depart.features, "departamento","DEPARTAMEN","COD_DEPART");
                // agregarDataSelectValueLabel(configWidget.Data.Departamentos, "departamento");
                $('#divDepartamento').show();
            },


            cargarTematica: function () {
            },

            esVisible: function (elemento) {
                //                console.log(">>> esVisible.. ");
                var visible = false;
                if ($(elemento).is(':visible') && $(elemento).css("visibility") != "hidden"
                    && $(elemento).css("opacity") > 0) {
                    visible = true;
                }
                console.log(">>> esVisible.. " + visible);
                return visible;
            },

            procesarPorDpto: function () {
                console.log(">>> procesarPorDpto.. ");
                var capaLeyenda = "layerRenderMcpio";
                idCapaActivaAnt = idCapaActiva; // tmp
                idCapaActiva = capaLeyenda;  //tmp
                tw.removerCapa(); //tmp
                idCapaActiva = idCapaActivaAnt; //tmp
                tw.prenderCapa(fullUrlActiva, idCapaActiva);
                prenderLimiteDptal(); // ok
            },

            //procesarPorMunicipio: async function () {
            procesarPorMunicipio: function () {
                console.log(">>> procesarPorMunicipio.. ");
                //tw.prenderCapa(fullUrlActiva, idCapaActiva);
                //renderPorRangos();
                //addFielToLayer();

                //var urltmp = "http://utilidades.apipreprod.saesas.gov.co:4444/ServGeoPortal/api/FuenteGeoPortal/GetByidMunicipio/25815?Usuario=cflorez&Clave=Junio2023*+";
                // 25815 TOCAIMA
                //consumirSrvSae(urltmp);
                //const resultJsonSae = await ejecutarConsulta(urltmp); // ok
                //const resultJsonSae = await consumirSrvSae(urltmp); // Error de CORS

                const resultJsonSae = configWidget.Data.rtajson;

                //console.log(">>> resultJsonSae.. " + resultJsonSae[0].Mpio); // ok
                tw.acumularSegunPrmts(resultJsonSae);

            },
            acumularSegunPrmts: function (datos) {
                console.log(">>> acumularSegunPrmts.. ");
                console.log({datos});
                var idTematica = tw.getPrmtValue("tematica");
                var datos = configWidget.Data.rtajson;
                console.log("datos => ", configWidget.Data.rtajson);
                var propiedadAfiltrar = "";
                var valorAfiltrar = "";

                //var filtrado;
                var totales;

                switch (idIndicadorActivo) {
                    case "1":
                        //where += andMcpio;
                        break;

                    case "2":
                        propiedadAfiltrar = "ActivoSocial";
                        valorAfiltrar = 'ACTIVO SOCIAL';

                        if (tw.getPrmt("tematica").includes("ACTIVO NO SOCIAL")) {
                            valorAfiltrar = "ACTIVO NO SOCIAL";
                        }
                        break;
                    case "3": // Inmuebles por estado legal
                        propiedadAfiltrar = "EstadoLegalGral";
                        switch (idTematica) {
                            case "1":
                                valorAfiltrar = "EN PROC";
                                break;
                            case "2":
                                valorAfiltrar = "EXTINTO";
                                break;
                            case "3":
                                valorAfiltrar = "IMPROCEDENTE";
                                break;
                            default:
                                break;
                        }

                        break;
                    case "4": //Inmuebles por rango de áreas, falta definir unidad de medida y rangos (Front)
                        propiedadAfiltrar = "asdfasdfasdfasdfa";
                        switch (idTematica) {
                            case "1":
                                valorAfiltrar = "ASDFASDFASDF";
                                break;
                            case "2":
                                valorAfiltrar = "ASDFASDFASDF";
                                break;
                            default:
                                break;
                        }
                        break;
                    case "5": //Inmuebles por mecanismo de administración
                        // Consultar ESTADO DE OcUPACION - SUB FILTRO ???
                        propiedadAfiltrar = "MecanismoAdministracion";
                        switch (idTematica) {
                            case "1":
                                valorAfiltrar = "DEP�SITO PROVISIONAL";
                                break;
                            case "2":
                                valorAfiltrar = "ADMINISTRACI�N DIRECTA";
                                //valorAfiltrar = "ADMINISTRACIÓN DIRECTA"; // no encuentra
                                break;
                            case "3":
                                valorAfiltrar = "DESTINACI�N PROVICIONAL";
                                break;
                            case "4":
                                propiedadAfiltrar = "EstadoOcupacion";
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
                        propiedadAfiltrar = "EstadoInventario";
                        switch (idTematica) {
                            case "1":
                                valorAfiltrar = "VENTA DIRECTA";
                                break;
                            case "2":
                                valorAfiltrar = "VENTA POR ENAJENACI�N TEMPRANA"; // si -  venta por operador comercial
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
                                valorAfiltrar = "DESTINACION DEFINITIVA";
                                break;
                            case "9":
                                valorAfiltrar = "EN DEVOLUCION";
                                break;
                            case "10":
                                valorAfiltrar = "EN DISPOSICI�N TEMPORAL"; //si
                                break;
                            default:
                                break;
                        }
                        break;
                    case "7": //Valor economico del portafolio de inmuebles de SAE
                        //  solo un variabla (Avcat), valuo comercial no hay. aclarar 
                        propiedadAfiltrar = "ClasificacionActivo";
                        switch (idTematica) {
                            case "1":
                                valorAfiltrar = "CASA";
                                break;
                            case "2":
                                valorAfiltrar = "FINCA";
                                break;
                            case "2":
                                valorAfiltrar = "LOTE";
                                break;
                            case "2":
                                valorAfiltrar = "CASA LOTE";
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
                }else {

                    filtrado = filtarPorPropiedadValor(datos, propiedadAfiltrar, valorAfiltrar);
                    if (Object.keys(filtrado).length == 0) {
                        tw.displayMsgAlerta("Informacíón", "Sin regitros para criterios seleccionados");
                    } else {
                        totales = contarPorTematica(filtrado, "Subtipo");
                        if (idIndicadorActivo === "7") { //Valor economico del portafolio
                            totales = acumularValor(filtrado, "Subtipo", "Avcat");
                        }                        
                        console.log({filtrado});
                        coropleticoNacional(filtrado);
//                        coropleticoFromCollectionNal(filtrado)
//                        coropleticoDepartamental(filtrado);
//                        tw.mostrarGraficaYTabla(totales, filtrado);
                    }
                  
                }
            },
            mostrarGraficaYTabla: function (totales, filtrado) {
                tw.mostrarGraficoBarras(totales);

                  abrirTablaResultadosSae({
                    prmts: {
                        panel: {
                            width: 700,
                            height: 500
                        },
                        json: JSON.stringify(filtrado),
                        //json: filtrado,
                        fuente: "IndicadoresSae"
                    }
                }); // widget tabla resultados sae
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

            ejecutarConsultaYGraficar: function (fullUrl) {
                console.log(">>> ejecutarConsultaYGraficar.. " + fullUrl);

                var where = tw.getExpresionWhere();
                where += " AND MPIO = '" + mpioActivo + "'"

                var query = new esri.tasks.Query();
                var queryTask = new esri.tasks.QueryTask(fullUrlActiva);
                var statisticDef = new esri.tasks.StatisticDefinition();

                statisticDef.onStatisticField = "SUBTIPO",
                    statisticDef.outStatisticFieldName = "TotalSubtipo",
                    statisticDef.statisticType = "count"

                if (idIndicadorActivo == "9") { // prueba
                    statisticDef.onStatisticField = "CAST(AV_CAT AS FLOAT)",
                        statisticDef.outStatisticFieldName = "TotalSubtipo",
                        statisticDef.statisticType = "sum"
                }

                //query.where = "1=1";
                query.where = where;
                query.outFields = ["*"];
                query.returnGeometry = false;

                //query.orderByFields = ["SUBTIPO"];
                query.groupByFieldsForStatistics = ["SUBTIPO"];
                query.outStatistics = [statisticDef];

                queryTask.execute(query, tw.mostrarGraficoBarras, tw.queryTask_Failed);
            },

            queryTask_Failed: function (error) {
                var titulo = "<B> Informaci&oacute;n </B>";
                var contenido = "Error consultando información. ";
                tw.displayMsgAlerta(titulo, contenido + "CodError:" + error.code);
            },

            mostrarGraficoBarras: function (featuresResultados) {
                console.log(">>> mostrarGraficoBarras  " + featuresResultados);
                document.getElementById("reportTotalsChartDiv").innerHTML = "";
                document.getElementById("lblNombreIndiciador").innerHTML = "";
                var titInd = document.getElementById("lblNombreIndiciador").innerHTML = nomInd;
                var nomTematica = "<br>" + tw.getPrmt("tematica");
                var nomEntidadEspacial = "<br>" + tw.getPrmt("entidadEspacial");
                document.getElementById("lblNombreIndiciador").innerHTML = titInd.toUpperCase() + nomTematica + nomEntidadEspacial;

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
                            text: registro.attributes.SUBTIPO
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


                    //ingreso las series
                    dataForTable = featuresResultados.features;
                    tmpindice = 1;
                    dataForTable.forEach(registro => {
                        c.addSeries("PREDIOS" + tmpindice, [{
                            y: registro.attributes.TotalSubtipo,
                            x: tmpindice,
                            tooltip: 'Tot: ' + registro.attributes.TotalSubtipo,
                            //color: "lightgold",
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

            prenderCapa: function (urlCapa, idCapaServicio) {
                console.log(">>> prenderCapa\n" + urlCapa);

                resaltarEnCapa(urlCapa, idCapaServicio);

                tw.map.centerAndZoom(new Point(-74.0048100, 5.0220800), 12);
            },

            mostrarTablaResultados: function () {
                console.log(">>> mostrarTablaResultados..");

                //cerrarWidgetById("widgets_TablaResultadoSae_Widget_63");

                var miWhere = tw.getExpresionWhere();
                miWhere += " AND MPIO = '" + mpioActivo + "'"

                console.log(">>> mostrarTablaResultados.. where= " + miWhere);

                abrirTablaResultadosSae({
                    prmts: {
                        panel: {
                            width: 700,
                            height: 500
                        },
                        url: fullUrlActiva,
                        where: miWhere
                    }
                });
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
                console.log(">>> limpiar.. ");
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
function resaltarEnCapa(urlCapa, idCapaServicio) {
    require([
        "esri/layers/FeatureLayer",
        "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol",
        "esri/renderers/SimpleRenderer", "esri/graphic",
        "esri/Color",
        "dijit/popup"

    ], function (
        FeatureLayer,
        SimpleFillSymbol, SimpleLineSymbol,
        SimpleRenderer, Graphic,
        Color,
        dijitPopup,

    ) {
        console.log(">>> resaltarEnCapa.. " + urlCapa);

        var where = "";
        dptoActivo = "";

        where = tw.getExpresionWhere();

        if (tw.getPrmt('entidadEspacial').includes("Municipio")) {
            dptoActivo = tw.getPrmt('departamento').toUpperCase()
            var where = tw.getExpresionWhere() + " AND DPTO = '" + dptoActivo + "'";
        }

        var idLayer = idCapaServicio.toString();

        if (urlCapa.indexOf("/featureserver") > 0 || urlCapa.indexOf("/MapServer") > 0) {
            var layerNuevo = new FeatureLayer(urlCapa, {
                id: idLayer,
                mode: FeatureLayer.MODE_SNAPSHOT, //
                outFields: ["FMI", "ID_ACTIVO", "DPTO", "MPIO", "SUBTIPO", "ACTIVO_SO", "ESTADO_OC", "Shape_Leng"]
                //outFields: ["*"],
            });
            //layerNuevo.setDefinitionExpression("MPIO = 'ZIPAQUIRÁ'"); // ¡¡¡
            //console.log(">>> resaltarEnCapa.. where " + where);

            layerNuevo.setDefinitionExpression(where);

            var symbol = new SimpleFillSymbol(
                SimpleFillSymbol.STYLE_SOLID,
                new SimpleLineSymbol(
                    SimpleLineSymbol.STYLE_SOLID,
                    new Color([255, 255, 255, 0.35]),
                    1
                ),
                new Color([125, 125, 125, 0.35])
            );
            layerNuevo.setRenderer(new SimpleRenderer(symbol));
            tw.map.addLayer(layerNuevo);

            var highlightSymbol = new SimpleFillSymbol(
                SimpleFillSymbol.STYLE_SOLID,
                new SimpleLineSymbol(
                    SimpleLineSymbol.STYLE_SOLID,
                    new Color([255, 0, 0]), 3
                ),
                new Color([125, 125, 125, 0.35])
            );

            //layerNuevo.on("click", function (evt) {
            //    console.log(">>> click");
            //    tw.map.graphics.enableMouseEvents();
            //    tw.map.graphics.on("click", clickCapa(urlCapa));
            //});

            layerNuevo.on("mouse-out", function (evt) {
                totPrediosMpio = 0;
                tw.map.graphics.enableMouseEvents();
                //tw.map.graphics.on("mouse-out", closeDialog);
            });

            layerNuevo.on("mouse-over", function (evt) {
                //console.log(">>> mouse-over");
                dptoActivo = evt.graphic.attributes.MPIO;
                mpioActivo = evt.graphic.attributes.MPIO;

                displayTotalPredios(evt.graphic.attributes.MPIO, evt.pageX, evt.pageY);

                tw.map.graphics.enableMouseEvents();
                tw.map.graphics.on("click", clickCapa);

                var highlightGraphic = new Graphic(evt.graphic.geometry, highlightSymbol);
                tw.map.graphics.add(highlightGraphic);

            });

            layerNuevo.on("onKeyDown", escClosesPopup);

            function closeDialog() {
                console.log(">>> closeDialog.. ");
                tw.map.graphics.enableMouseEvents();
                tw.map.graphics.clear();
                dijitPopup.close(dialog);
            }
        }
    })
}

function clickCapa(data) {
    console.log(">>> clickCapa >>> " + data);
    tw.mostrarTablaResultados()
    tw.ejecutarConsultaYGraficar();

//    addFielToLayer(); 
}

function graficarIndicador() {
    console.log("graficarIndicador >>> ");
}

//function  continuarPintarPredio(propiedad, valor, mncpio) {
//    console.log("continuarPintarPredio >>> " + propiedad + " ; " + valor);
//    //var where = propiedad.toString().toUpperCase() + " = '" + valor + "'";
//    var where = "FMI = '307-64815'"; // prueba, en unico en arcgis Tocaima

//    //const url = await getUrlGestorCatastral(mncpio);
//    var url = "https://sae.igac.gov.co/arcgis/rest/services/SAE/PREDIOS_SAE/MapServer/12"; // Cundinamarca

//    if (url != null || url.length > 0) {
//        pintarPredioSeleccionado(url,where);
//    }
//}

async function continuarPintarPredioSae(propiedad, valor, nomMcpio) {
    console.log("continuarPintarPredioSae >>> " + propiedad + " ; " + valor);
    //var where = propiedad.toString().toUpperCase() + " = '" + valor + "'";
    var where = "FMI = '307-64815'"; // prueba, en unico en arcgis Tocaima

    //var url = "https://sae.igac.gov.co/arcgis/rest/services/SAE/PREDIOS_SAE/MapServer/12"; // Cundinamarca

    var urlGestor = srvSae.urlSrvGestorCatastral.replace("nomMunicipio", nomMcpio);

    const dataResult = await getResultFromFecth(urlGestor);

    let isEmpty = JSON.stringify(dataResult) === '{}'

    if (dataResult.status === 400 || dataResult.status === 404 || isEmpty) {
        createDialogInformacionGeneral("Info", "No se encontró información para esta consulta")
        return
    }

    if (dataResult.URL != null || dataResult.URL.length > 0) {
        pintarPredioSeleccionado(dataResult.URL, where);
    }

}
function getUrlGestorCatastral(nomMcpio) {

    var url = srvSae.urlSrvGestorCatastral;
    url = url.replace("nomMunicipio", nomMcpio);
    var myJson;

    $.ajax({
        cache: true,
        type: "GET",
        url: url,
        timeout: 10000,
        contentType: "application/javascript",
        dataType: "json",
        async: false,
        success: function (result) {
            myJson = result;
            return myJson.URL;
        },
        error: function (xhr, status, error) {
            return;
        }
    });
}

function pintarPredioSeleccionado(url, where) {
    require([
        "esri/layers/FeatureLayer",
        "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol",
        "esri/renderers/SimpleRenderer", "esri/graphic", "esri/InfoTemplate",
        "esri/Color",
        "dijit/popup",
        "esri/geometry/Point",
        "esri/tasks/query"

    ], function (
        FeatureLayer,
        SimpleFillSymbol, SimpleLineSymbol,
        SimpleRenderer, Graphic, InfoTemplate,
        Color,
        dijitPopup,
        Point,
        Query

    ) {
        console.log(">>> pintarPredioSeleccionado.. " + url +" where "+  where);

        idCapa = "layerPredio";
        idCapaActiva = idCapa;
        dptoActivo = "";

        tw.removerCapa();

        var idLayer = idCapa.toString();
        var infoTemplate = new InfoTemplate("${FMI}", "${*}");

        if (url.indexOf("/featureserver") > 0 || url.indexOf("/MapServer") > 0) {
            var layerPredio = new FeatureLayer(url, {
                id: idLayer,
                mode: FeatureLayer.MODE_SNAPSHOT, //
                outFields: ["FMI", "ID_ACTIVO", "DPTO", "MPIO", "SUBTIPO", "ACTIVO_SO", "ESTADO_OC", "Shape_Leng"],
                //outFields: ["*"],
                infoTemplate: infoTemplate
            });
            //console.log(">>> setDefinitionExpression.. where " + where);

            layerPredio.setDefinitionExpression(where);

//            let graphicsIsEmpty = JSON.stringify(layerPredio.graphics) === '[]'

            var symbol = new SimpleFillSymbol(
                SimpleFillSymbol.STYLE_SOLID,
                new SimpleLineSymbol(
                    SimpleLineSymbol.STYLE_SOLID,
                    new Color([255, 255, 255, 0.35]),
                ),
                new Color([255, 0, 0, 0.35])
            );

            layerPredio.setRenderer(new SimpleRenderer(symbol));
            appGlobal.map.addLayer(layerPredio);

            var query = new Query();
            query.geometry = appGlobal.map.extent;
            query.returnGeometry = true;
            query.outFields = ["*"];


            layerPredio.queryFeatures(query, function (featureSet) {
                //console.log(">>>>>>>>>>>>>>>>> featureSet ");
                //console.log(featureSet);
                //let isEmpty = JSON.stringify(featureSet.features) === '[]' ;
                //let isEmpty = false;
                console.log(featureSet.graphics);
                //if (!isEmpty) {
                if (featureSet.features.length > 0) {
                    //console.log(">>>>>>>>>>>>>>>>> featureSet length " + featureSet.features.length);

                    var polygon = featureSet.features[0].geometry;
                    var polygonExtent = polygon.getExtent();

                    var x = polygonExtent.xmin;
                    var y = polygonExtent.ymin;
                    var spRef = polygonExtent.spatialReference;

                    //console.log("polygonExtent", polygonExtent);
                    appGlobal.map.setExtent(polygonExtent)
                    //setSpatialReference(spRef, x, y); // ok
                    //appGlobal.map.setZoom(18);  // ok
                } else {
                    createDialogInformacionGeneral("Info", "No se encontró geometria para predio seleccionado")
                    return
                }
            });
        }
    })
}


function displayTotalPredios(mcpio, x, y) {
    require([
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "esri/tasks/StatisticDefinition",
        "dojo/dom-style",
        "dijit/TooltipDialog", "dijit/popup", "dojo/domReady!",
    ], function (
        Query, QueryTask, StatisticDefinition,
        domStyle,
        TooltipDialog, dijitPopup,
    ) {
        console.log(">>> displayTotalPredios ");

        var where = tw.getExpresionWhere();
        where += " AND MPIO = '" + mcpio + "'"

        var query = new Query();
        var queryTask = new QueryTask(fullUrlActiva);


        //query.where = "MPIO = '" + mcpio + "'";
        query.where = where;
        query.returnGeometry = false;

        queryTask.executeForCount(query).then(function (count) {
            totPrediosMpio = count;

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
    });
    return;
}

function escClosesPopup(key) {
    if (key.keyCode == 27) {
        tw.map.infoWindow.hide();
    }
}
function addFielToLayer() {
    console.log("addFielToLayer >>> ");
    fullUrlActiva = 'https://sae.igac.gov.co/arcgis/rest/services/SAE/OTROS/MapServer/3';
    var where = "1=1";
    //var where = tw.getExpresionWhere();
    //where += " AND MPIO = '" + mpioActivo + "'"

    var query = new esri.tasks.Query();
    var queryTask = new esri.tasks.QueryTask(fullUrlActiva);

    query.where = where;
    query.outFields = ["*"];
    query.returnGeometry = true;
    queryTask.execute(query, calcularYcolorear, tw.queryTask_Failed);
}
function calcularYcolorear(featuresResult) {
    require([

        "esri/geometry/Point",

        "esri/renderers/UniqueValueRenderer",

        "esri/map", "esri/layers/FeatureLayer",
        "esri/InfoTemplate", "esri/symbols/SimpleFillSymbol",
        "esri/renderers/ClassBreaksRenderer",
        "esri/Color",
        "esri/dijit/Legend",
        "esri/symbols/SimpleLineSymbol",
        "esri/renderers/SimpleRenderer",

        "dojo/parser",
        "dojo/dom-style",
        "dojo/dom",
        "dojo/dom-construct",

        "dojo/domReady!"
    ], function (
        Point,
        UniqueValueRenderer,
        Map, FeatureLayer,
        InfoTemplate, SimpleFillSymbol,
        ClassBreaksRenderer,
        Color, Legend,
        SimpleLineSymbol,
        SimpleRenderer,
        parser,
        domStyle,
        dom, domConstruct
    ) {

        console.log("calcularYcolorear >>> " + featuresResult);
        parser.parse(); //

        var legend;

        var field = {
            name: "TOTAL",
            type: "esriFieldTypeInteger",
            alias: "TOTAL"
        };


        var newFeatures = featuresResult.fields.push(field);
        console.log(featuresResult)

        for (i = 0; i < featuresResult.features.length; i++) {
            var toPush = {};
            toPush["TOTAL"] = getRandomInt();
            Object.assign(featuresResult.features[i].attributes, toPush);
        }

        console.log(">>> featuresResult: " + featuresResult)

        var symbolSimple = new SimpleFillSymbol(
            SimpleFillSymbol.STYLE_SOLID,
            new SimpleLineSymbol(
                SimpleLineSymbol.STYLE_SOLID,
                new Color([255, 255, 255, 0.35]),
                1
            ),
            new Color([125, 125, 125, 0.35])
        );

        var symbol = new SimpleFillSymbol();
        symbol.setColor(new Color([150, 150, 150, 0.5]));

        var renderer = new ClassBreaksRenderer(symbol, "TOTAL");
        renderer.addBreak(0, 15, new SimpleFillSymbol().setColor(new Color([56, 168, 0, 0.5])));
        renderer.addBreak(15, 30, new SimpleFillSymbol().setColor(new Color([139, 209, 0, 0.5])));
        renderer.addBreak(30, 45, new SimpleFillSymbol().setColor(new Color([255, 255, 0, 0.5])));
        renderer.addBreak(45, 65, new SimpleFillSymbol().setColor(new Color([255, 128, 0, 0.5])));
        renderer.addBreak(65, Infinity, new SimpleFillSymbol().setColor(new Color([255, 0, 0, 0.5])));

        let layerDefinition = {
            geometryType: featuresResult.geometryType,
            objectIdField: "OBJECTID",
            spatialReference: tw.map.spatialReference,
            fields: featuresResult.fields,
            name: 'layerResultadoNew',
            mode: FeatureLayer.MODE_SNAPSHOT //
        };
        console.log(">>>>>>>>>>>> " + layerDefinition);

        let featureCollection = {
            layerDefinition: layerDefinition,
            featureSet: {
                features: featuresResult.features,
                //geometryType: "esriGeometryPolygon",
                geometryType: featuresResult.geometryType,
                spatialReference: tw.map.spatialReference
            }
        };

        var layerResultados = new FeatureLayer(featureCollection, {
            id: 'layerResultadoNew',
            visible: true
        });
        //layerResultados.setSelectionSymbol(infoSymbol);
        //resultadoApiArgis = featuresResultados;
        //layerResultados.setRenderer(renderer);
        layerResultados.setRenderer(new SimpleRenderer(symbolSimple));

//        tw.map.setBasemap("osm");
        tw.map.addLayer(layerResultados);
        //layerResultados.redraw(); //nada
        //this.layerResultados.on("click", lang.hitch(this, this.clickCapa));

        tw.map.centerAndZoom(new Point(-74.0048100, 5.0220800), 12);

        //layerResultados.on("load", function () {
        //    //            createRenderer(field);
        //    //featureLayer.setRenderer(renderer);
        //    layerResultados.setRenderer(renderer);
        //    createLegend(map, layerResultados, "TOTAL");
        //});

        function createLegend(map, layer, field) {
            // se destruye si existe
            if (legend) {
                legend.destroy();
                domConstruct.destroy(dom.byId("legendDiv"));
            }

            // crear nuevo div para la leyenda
            var legendDiv = domConstruct.create("div", {
                id: "legendDiv"
            }, dom.byId("legendWrapper"));

            legend = new Legend({
                map: tw.map,
                layerInfos: [{
                    layer: layer,
                    title: "Grupo total predios: " + field
                }]
            }, legendDiv);
            legend.startup();
        }

    });
}
function prenderLimiteDptal() {
    require([
        "esri/layers/FeatureLayer",

    ], function (
        FeatureLayer,
    ) {
        console.log(">>> prenderLimiteDptal.. " );

        var idLayer = "lmteDptos";
        var urlCapa = srvSae.geometriaLmteDepartamental; // SAE

        if (urlCapa.indexOf("/featureserver") > 0 || urlCapa.indexOf("/MapServer") > 0) {
            var layerDptos = new FeatureLayer(urlCapa, {
                id: idLayer,
                mode: FeatureLayer.MODE_SNAPSHOT,
//                mode: MODE_AUTO,
                outFields: ["*"],
            });

            tw.map.addLayer(layerDptos);

/*
            var dataLayerJson = layerDptos.toJson();
            console.log('>>>>>>> dataLayerJson', dataLayerJson); // undefined

            var dataLayerGraphics = layerDptos.graphics;
            console.log('>>>>>>> dataLayerGraphics', dataLayerGraphics); // [] length:0
*/
            var miCapaDpto = tw.map.getLayer(idLayer)
            console.log('>>>>>>>>>> miCapaDpto');
            console.log(miCapaDpto);

        }
    })
}
function coropleticoNacional(filtrado, url, where) {
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
        "esri/graphicsUtils"

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
        graphicsUtils



    ) {
        parser.parse(); //

        console.log(">>> coropleticoNacional.. " + url + " where " + where);

//        var url = 'https://sae.igac.gov.co/arcgis/rest/services/SAE/OTROS/MapServer/3';
        var url = srvSae.geometriaLmteDepartamental; // SAE


        var idCapa = "layerNacional";
        idCapaActiva = idCapa;
        dptoActivo = "";
        
        tw.removerCapa();

//        var where = "DPTO_CCDGO = '25'";
        var where = "1 = 1";
        var query = new esri.tasks.Query();
        var queryTask = new esri.tasks.QueryTask(url);

        query.where = where;
        query.outFields = ["*"];
        query.OutSpatialReference = { wkid: 102100 }; //.
        query.returnGeometry = true;
        //        queryTask.execute(query, setearTotales, tw.queryTask_Failed);

        queryTask.execute(query).then(function (results) {
            var features = results.features;

            projection.load().then(function () {
                for (var i = 0; i < features.length; i++) {
                    var projectedGeometry = projection.project(features[i].geometry, new SpatialReference({ wkid: 102100, "latestWkid": 4326 }));
                    features[i].geometry = projectedGeometry;
                    var projectedExtend = projection.project(features[i]._extent, new SpatialReference({ wkid: 102100, "latestWkid": 4326 }));
                    features[i]._extent = projectedExtend;
                };
            });


            console.log('>>>> features ',results.features);


            var field = {
                name: "TOTAL",
                type: "esriFieldTypeInteger",
                alias: "TOTAL"
            };
            var newFeatures = results.fields.push(field);

            for (i = 0; i < results.features.length; i++) {
                var toPush = {};
                var geometryIn = results.features[i].geometry.rings;
                toPush["TOTAL"] = contarPorPropiedad(filtrado, "Dpto", results.features[i].attributes.DEPARTAMEN);
//                toPush["TOTAL"] = getRandomInt();
                Object.assign(results.features[i].attributes, toPush);
//                results.features[i].geometry.spatialReference = mySpatialRef;
//                results.features[i].geometry = reprojection(results.features[i].geometry);
//                results.features[i].geometry.rings = reprojection(geometryIn); //Cannot read properties of undefined (reading 'wkid')
            }

            let layerDefinition = {
//                geometryType: results.geometryType,
                objectIdField: "OBJECTID",
                geometryType: "esriGeometryPolygon",
//                spatialReference: tw.map.spatialReference,

                spatialReference: {
                    "wkid": 102100,
                    "latestWkid": 4326
                },

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
                    //geometryType: "esriGeometryPolygon",
                    geometryType: results.geometryType,

                    // spatialReference: tw.map.spatialReference

                    "spatialReference": {
                        "wkid": 102100,
                        "latestWkid": 4326
                    }
                }
            };
            if (consts.debug) {
                console.log(">>>>>>>>>>>> results.features");
                console.log(results.features);
            }

            var symbol = new SimpleFillSymbol();
            symbol.setColor(new Color([150, 150, 150, 0.5]));

//            var renderer = new esri.renderers.ClassBreaksRenderer(symbol, "TOTAL");
            var renderer = new ClassBreaksRenderer(symbol, "TOTAL");
            renderer.addBreak(0, 10, new SimpleFillSymbol().setColor(new Color([56, 168, 0, 0.5])));
            renderer.addBreak(10, 20, new SimpleFillSymbol().setColor(new Color([139, 209, 0, 0.5])));
            renderer.addBreak(20, 30, new SimpleFillSymbol().setColor(new Color([255, 255, 0, 0.5])));
            renderer.addBreak(30, 40, new SimpleFillSymbol().setColor(new Color([255, 128, 0, 0.5])));
            renderer.addBreak(40, Infinity, new SimpleFillSymbol().setColor(new Color([255, 0, 0, 0.5])));

            var layerDptos = new FeatureLayer(featureCollection, {
                id: idCapa,
                visible: true,
            });
//            layerDptos.setRenderer(renderer);
//            let extent = graphicsUtils.graphicsExtent(layerDptos.graphics);
//            tw.map.setExtent(extent, true); 
// error:Map: Geometry (wkid: 9377) cannot be converted to spatial reference of the map (wkid: 102100)

            tw.map.addLayer(layerDptos);
            layerDptos.on("load", function () {
                layerDptos.setRenderer(renderer);
            });
            tw.map.setScale(5000000);
            setTimeout(() => {
                tw.map.setScale(18489297)
                loader2(false, "loadingIndicadores")
            }, 500);
//            tw.map.getLayer(idCapa).show();
//            tw.map.getLayer(idCapa).refresh();
            
        });

    })
}

function coropleticoFromCollectionNal(filtrado, url, where) {
    require([
        "esri/layers/FeatureLayer",
        "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol",
        "esri/renderers/SimpleRenderer", "esri/graphic","esri/InfoTemplate",
        "esri/Color",
        "dijit/popup",
        "esri/geometry/Point",
        "esri/tasks/query",
        "dojo/parser",
        "esri/graphicsUtils",
        
        "esri/SpatialReference"

    ], function (
        FeatureLayer,
        SimpleFillSymbol, SimpleLineSymbol,
        SimpleRenderer, Graphic, InfoTemplate,
        Color,
        dijitPopup,
        Point,
        Query,
        parser,
        graphicsUtils,
        SpatialReference

    ) {
//        parser.parse(); //

        console.log(">>> coropleticoFromCollectionNal");
        console.log(tw.map.spatialReference);

        var url = srvSae.geometriaLmteDepartamental; // SAE

        idCapaDtos = "lmteDptos";
        idCapaActiva = idCapaDtos;
        tw.removerCapa();

        idCapa = "layerDptal";
        idCapaActiva = idCapa;
        dptoActivo = "";

        tw.removerCapa();

        var where = "1 = 1";
        var query = new esri.tasks.Query();
        var queryTask = new esri.tasks.QueryTask(url);
        var mySpatialReference = new SpatialReference({ wkid: 102100 }); 


        query.where = where;
        query.outFields = ["*"];
        query.returnGeometry = true;
//        query.OutSpatialReference = { wkid: tw.map.spatialReference }; //.
//        query.OutSpatialReference = mySpatialReference; //.
        query.OutSpatialReference = { wkid: 102100 }; //.
//        query.OutSpatialReference = { wkid: 9377 }; //.
        queryTask.execute(query).then(function (results) {

            let layerDefinition = {
                geometryType: results.geometryType,
                objectIdField: "OBJECTID",
//                spatialReference: tw.map.spatialReference,
//                spatialReference: mySpatialReference,
                spatialReference: { wkid: 102100 },
//                spatialReference: { wkid: 9377 },
//                spatialReference: { wkid: 4326 },
                fields: results.fields,
                name: 'layerDptal',
                mode: FeatureLayer.MODE_SNAPSHOT
            };
            console.log(">>>>>>>>>>>> " );
            console.log(layerDefinition);

            let featureCollection = {
                layerDefinition: layerDefinition,
                featureSet: {
                    features: results.features,
                    //geometryType: "esriGeometryPolygon",
                    geometryType: results.geometryType,
//                    spatialReference: tw.map.spatialReference
//                    spatialReference: mySpatialReference
                    spatialReference: { wkid: 102100 },
                }
            };
            console.log(results.features);

            var layerResultados = new FeatureLayer(featureCollection, {
                id: idCapa,
                visible: true
            });
            tw.map.addLayer(layerResultados);
            let extent = graphicsUtils.graphicsExtent(layerResultados.graphics);
            tw.map.setExtent(extent, true);

            var miCapa = tw.map.getLayer(idCapa)
            console.log('>>>>>>>>>> miCapa');
            console.log(miCapa);
            tw.map.getLayer(idCapa).show();
            tw.map.getLayer(idCapa).refresh();
/*
    Map: Geometry (wkid: 9377) cannot be converted to spatial reference of the map (wkid: 102100)
 */


        });
    })
}


function coropleticoDepartamental(filtrado ,url, where) {
    require([
        "esri/layers/FeatureLayer",
        "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol",
        "esri/renderers/SimpleRenderer", "esri/graphic", "esri/InfoTemplate",
        "esri/Color",
        "dijit/popup",
        "esri/geometry/Point",
        "esri/tasks/query",
        "dojo/parser",

    ], function (
        FeatureLayer,
        SimpleFillSymbol, SimpleLineSymbol,
        SimpleRenderer, Graphic, InfoTemplate,
        Color,
        dijitPopup,
        Point,
        Query,
        parser

    ) {
        parser.parse(); //

        console.log(">>> coropleticoDepartamental.. " + url + " where " + where);

        var url = 'https://mapassig.icbf.gov.co:6443/arcgis/rest/services/ICBF/Administrativo/MapServer/3';

        idCapa = "layerDptal";
        idCapaActiva = idCapa;
        dptoActivo = "";

        tw.removerCapa();

        var where = "DPTO_CCDGO = '25'";
        var query = new esri.tasks.Query();
        var queryTask = new esri.tasks.QueryTask(url);

        query.where = where;
        query.outFields = ["*"];
        query.returnGeometry = true;
//        queryTask.execute(query, setearTotales, tw.queryTask_Failed);
        queryTask.execute(query).then(function (results) {

            var field = {
                name: "TOTAL",
                type: "esriFieldTypeInteger",
                alias: "TOTAL"
            };
            var newFeatures = results.fields.push(field);

            for (i = 0; i < results.features.length; i++) {
                var toPush = {};
                toPush["TOTAL"] = contarPorPropiedad(filtrado, "Mpio", results.features[i].attributes.DPTO_CNMBR);
                Object.assign(results.features[i].attributes, toPush);
            }
            let layerDefinition = {
                geometryType: results.geometryType,
                objectIdField: "OBJECTID",
                spatialReference: tw.map.spatialReference,
                fields: results.fields,
                name: 'layerDpto',
                mode: FeatureLayer.MODE_SNAPSHOT 
            };
            console.log(">>>>>>>>>>>> " + layerDefinition);

            let featureCollection = {
                layerDefinition: layerDefinition,
                featureSet: {
                    features: results.features,
                    //geometryType: "esriGeometryPolygon",
                    geometryType: results.geometryType,
                    spatialReference: tw.map.spatialReference
                }
            };
            console.log(results.features);

            var layerResultados = new FeatureLayer(featureCollection, {
                id: 'layerDptoNew',
                visible: true
            });
            tw.map.addLayer(layerResultados);
        });



/*
        var idLayer = idCapa.toString();
        var infoTemplate = new InfoTemplate("${MPIO_CNMBR}", "${*}");

        if (url.indexOf("/featureserver") > 0 || url.indexOf("/MapServer") > 0) {
            var layerDpto = new FeatureLayer(url, {
                id: idLayer,
                mode: FeatureLayer.MODE_SNAPSHOT, //
                outFields: ["*"],
                infoTemplate: infoTemplate
            });
            //console.log(">>> setDefinitionExpression.. where " + where);

            layerDpto.setDefinitionExpression(where);

            var symbol = new SimpleFillSymbol(
                SimpleFillSymbol.STYLE_SOLID,
                new SimpleLineSymbol(
                    SimpleLineSymbol.STYLE_SOLID,
                    new Color([255, 255, 255, 0.35]),
                ),
                new Color([255, 0, 0, 0.35])
            );

            layerDpto.setRenderer(new SimpleRenderer(symbol));

            var field = {
                name: "TOTAL",
                type: "esriFieldTypeInteger",
                alias: "TOTAL"
            };


            var newFeatures = layerDpto.fields.push(field);
            console.log(layerDpto.features)

            for (i = 0; i < layerDpto.features.length; i++) {
                var toPush = {};
//                toPush["TOTAL"] = i + 2;
                toPush["TOTAL"] = contarPorPropiedad(filtrado, "Dpto", layerDpto.features[i].attributes.DPTO_CNMBR);
                Object.assign(layerDpto.features[i].attributes, toPush);
            }

            console.log(">>> featuresResult: " + featuresResult)

            appGlobal.map.addLayer(layerDpto);



            var query = new Query();
            query.geometry = appGlobal.map.extent;
            query.returnGeometry = true;
            query.outFields = ["*"];


            layerDpto.queryFeatures(query, function (featureSet) {
                console.log(featureSet.graphics);
                if (featureSet.features.length > 0) {
                    var polygon = featureSet.features[0].geometry;
                    var polygonExtent = polygon.getExtent();

                    var x = polygonExtent.xmin;
                    var y = polygonExtent.ymin;
                    var spRef = polygonExtent.spatialReference;

                    appGlobal.map.setExtent(polygonExtent)
                    //setSpatialReference(spRef, x, y); // ok
                } else {
                    createDialogInformacionGeneral("Info", "No se encontró geometria para predio seleccionado")
                    return
                }
            });
        }
*/
    })
}

function renderPorColorAnt() {

    var layer, legend;

    require([

        "esri/map",
        "esri/dijit/PopupTemplate",
        "esri/layers/FeatureLayer",
        "esri/dijit/Legend",
        "esri/renderers/smartMapping",

        "dojo/_base/array",
        "dojo/dom",
        "dojo/dom-construct",
        "dojo/data/ItemFileReadStore",
        "dijit/form/FilteringSelect",
        "dojo/parser",

        "dijit/layout/BorderContainer",
        "dijit/layout/ContentPane",

        "dojo/domReady!"

    ], function (
        Map,
        PopupTemplate,
        FeatureLayer,
        Legend,
        smartMapping,

        array,
        dom,
        domConstruct,
        ItemFileReadStore,
        FilteringSelect,
        parser

    ) {
        console.log("renderPorColor >>> .................");

        parser.parse(); //

        //var baseMap = tw.map.getBasemap()
        //var mapOptions = {
        //    //basemap: "terrain",
        //    basemap: baseMap,
        //    center: [-74.0048100, 5.0220800],
        //    zoom: 14,
        //    slider: false
        //};

        //var map = new Map("map", mapOptions);

        //tw.map = map;

        //var fieldName = "POP2007";
        var fieldName = "Shape_Leng";

        var fields = {
            "Shape_Leng": "Shape_Leng",
            "DPTO": "Departamento",
            "MPIO": "Municipio",
            "SUBTIPO": "Urb/Rral",
            "ESTADO_OC": "Estado Ocup",
            "ACTIVO_SO": "Activo Social"
        };
        var outFields = ["Shape_Leng", "DPTO", "MPIO", "SUBTIPO", "ESTADO_OC", "ACTIVO_SO"];

        //create popup
        var popupTemplate = new PopupTemplate({
            title: "{MPIO} Municipio",
            fieldInfos: [{
                "fieldName": fieldName,
                "label": fields[fieldName],
                "visible": true,
                "format": {
                    places: 0,
                    digitSeparator: true
                }
            }],
            showAttachments: true
        });

        //layer = new FeatureLayer("//sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/2", {
        layer = new FeatureLayer("https://sae.igac.gov.co/arcgis/rest/services/SAE/PREDIOS_SAE/MapServer/38", {
            "id": "ZipaquiraSae",
            "infoTemplate": popupTemplate,
            "mode": FeatureLayer.MODE_SNAPSHOT,
            "outFields": outFields,
            "opacity": 0.8
        });

        //only working with Washington state
        //layer.setDefinitionExpression("STATE_NAME='Washington'");
        tw.map.addLayer(layer);

        layer.on("load", function () {
            createRenderer(fieldName);
        });

        function createRenderer(field) {
            //smart mapping functionality begins
            smartMapping.createClassedColorRenderer({
                layer: layer,
                field: field,
                //basemap: tw.map.getBasemap(),
                basemap: "osm",
                classificationMethod: "quantile"
            }).then(function (response) {
                layer.setRenderer(response.renderer);
                layer.redraw();
                createLegend(tw.map, layer, field);
            });
        }

        //this function gets called when fields are selected to render
        function updateAttribute(ch) {
            tw.map.infoWindow.hide();

            var popupTemplateUpdated = new PopupTemplate({
                title: "{MPIO} Municipio",
                fieldInfos: [{
                    "fieldName": ch,
                    "label": fields[ch],
                    "visible": true,
                    "format": { places: 0, digitSeparator: true }
                }],
                showAttachments: true
            });
            layer.setInfoTemplate(popupTemplateUpdated);
            createRenderer(ch);
            layer.redraw();
            createLegend(tw.map, layer, ch);
        }

        //Create a legend
        function createLegend(map, layer, field) {
            //If applicable, destroy previous legend
            if (legend) {
                legend.destroy();
                domConstruct.destroy(dom.byId("legendDiv"));
            }

            // create a new div for the legend
            var legendDiv = domConstruct.create("div", {
                id: "legendDiv"
            }, dom.byId("legendWrapper"));

            legend = new Legend({
                map: tw.map,
                layerInfos: [{
                    layer: layer,
                    title: "Municipio: " + field
                }]
            }, legendDiv);
            legend.startup();
        }

        // create a store and a filtering select for the county layer's fields
        var fieldNames, fieldStore, fieldSelect;
        fieldNames = {
            "identifier": "value",
            "label": "name",
            "items": []
        };
        array.forEach(outFields, function (f) {
            if (array.indexOf(f.split("_"), "NAME") == -1) { // exclude attrs that contain "NAME"
                fieldNames.items.push({
                    "name": fields[f],
                    "value": f
                });
            }
        });

        fieldStore = new ItemFileReadStore({
            data: fieldNames
        });
        fieldSelect = new FilteringSelect({
            displayedValue: fieldNames.items[0].name,
            value: fieldNames.items[0].value,
            name: "fieldsFS",
            required: false,
            store: fieldStore,
            searchAttr: "name",
            style: {
                "width": "290px",
                "fontSize": "12pt",
                "color": "#444"
            }
        }, domConstruct.create("div", null, dom.byId("fieldWrapper")));
        fieldSelect.on("change", updateAttribute);

    });

}
function cerrarWidgetLeyenda() {
    require(["jimu/PanelManager", "jimu/WidgetManager"],
        function (PanelManager, WidgetManager) {
            console.log(">>> cerrarWidgetLeyenda.. ");
            panelManager = PanelManager.getInstance();
            widgetCerrar = PanelManager.getInstance().getPanelById("widgets_Legend_Widget_18_panel");
            for (var e in PanelManager.getInstance().panels) {
                if (PanelManager.getInstance().panels[e].id == "widgets_Legend_Widget_18_panel") {
                    widgetCerrar = PanelManager.getInstance().panels[e].id;
                }
            }
            if (widgetCerrar != undefined) {
                panelManager.closePanel("widgets_Legend_Widget_18_panel");
                panelManager.destroyPanel("widgets_Legend_Widget_18_panel");
                WidgetManager.getInstance().closeWidget("widgets_Legend_Widget_18")
            }
        }
    )
}

function renderPorColor() { // aplica solo para variables numericas

    var layer, legend;

    require([

        "esri/map",
        "esri/dijit/PopupTemplate",
        "esri/layers/FeatureLayer",
        "esri/dijit/Legend",
        "esri/renderers/smartMapping",

        "dojo/_base/array",
        "dojo/dom",
        "dojo/dom-construct",
        "dojo/data/ItemFileReadStore",
        "dijit/form/FilteringSelect",
        "dojo/parser",

        "dijit/layout/BorderContainer",
        "dijit/layout/ContentPane",

        "dojo/domReady!"

    ], function (
        Map,
        PopupTemplate,
        FeatureLayer,
        Legend,
        smartMapping,

        array,
        dom,
        domConstruct,
        ItemFileReadStore,
        FilteringSelect,
        parser

    ) {
        console.log("renderPorColor >>> .................");

        parser.parse(); //

        var fieldName = "Shape_Leng";
        //var fieldName = "MPIO"; // no es numerica

        var fields = {
            "Shape_Leng": "Shape_Leng",
            "DPTO": "Departamento",
            "MPIO": "Municipio",
            "SUBTIPO": "Urb/Rral",
            "ESTADO_OC": "Estado Ocup",
            "ACTIVO_SO": "Activo Social"
        };
        var outFields = ["Shape_Leng", "DPTO", "MPIO", "SUBTIPO", "ESTADO_OC", "ACTIVO_SO"];

        //create popup
        var popupTemplate = new PopupTemplate({
            title: "{MPIO} Municipio",
            fieldInfos: [{
                "fieldName": fieldName,
                "label": fields[fieldName],
                "visible": true,
                "format": {
                    places: 0,
                    digitSeparator: true
                }
            }],
            showAttachments: true
        });

        layer = new FeatureLayer("https://sae.igac.gov.co/arcgis/rest/services/SAE/PREDIOS_SAE/MapServer/38", {
            "id": "ZipaquiraSae",
            "infoTemplate": popupTemplate,
            "mode": FeatureLayer.MODE_SNAPSHOT,
            "outFields": outFields,
            "opacity": 0.8
        });

        //only working with Washington state
        //layer.setDefinitionExpression("STATE_NAME='Washington'");
        tw.map.addLayer(layer);

        layer.on("load", function () {
            createRenderer(fieldName);
        });

        function createRenderer(field) {
            //smart mapping functionality begins
            smartMapping.createClassedColorRenderer({
                layer: layer,
                field: field,
                //basemap: tw.map.getBasemap(),
                basemap: "osm",
                classificationMethod: "quantile"
            }).then(function (response) {
                layer.setRenderer(response.renderer);
                layer.redraw();
                createLegend(tw.map, layer, field);
            });
        }

        //esta función se llama cuando los campos se seleccionan para representar
        function updateAttribute(ch) {
            tw.map.infoWindow.hide();

            var popupTemplateUpdated = new PopupTemplate({
                title: "{MPIO} Municipio",
                fieldInfos: [{
                    "fieldName": ch,
                    "label": fields[ch],
                    "visible": true,
                    "format": { places: 0, digitSeparator: true }
                }],
                showAttachments: true
            });
            layer.setInfoTemplate(popupTemplateUpdated);
            createRenderer(ch);
            layer.redraw();
            createLegend(tw.map, layer, ch);
        }

        //Create a legend
        function createLegend(map, layer, field) {
            //If existe, destruye la anterior
            if (legend) {
                legend.destroy();
                domConstruct.destroy(dom.byId("legendDiv"));
            }

            // crear un nuevo div para la leyenda
            var legendDiv = domConstruct.create("div", {
                id: "legendDiv"
            }, dom.byId("legendWrapper"));

            legend = new Legend({
                map: tw.map,
                layerInfos: [{
                    layer: layer,
                    title: "Municipio: " + field
                }]
            }, legendDiv);
            legend.startup();
        }

        // cree un store y una selección de filtrado para los campos de la capa del dpto. o mcpio
        var fieldNames, fieldStore, fieldSelect;
        fieldNames = {
            "identifier": "value",
            "label": "name",
            "items": []
        };
        array.forEach(outFields, function (f) {
            if (array.indexOf(f.split("_"), "NAME") == -1) { // excluye atributos que contienen "NAME", ej.
                fieldNames.items.push({
                    "name": fields[f],
                    "value": f
                });
            }
        });

        fieldStore = new ItemFileReadStore({
            data: fieldNames
        });
        fieldSelect = new FilteringSelect({
            displayedValue: fieldNames.items[0].name,
            value: fieldNames.items[0].value,
            name: "fieldsFS",
            required: false,
            store: fieldStore,
            searchAttr: "name",
            style: {
                "width": "290px",
                "fontSize": "12pt",
                "color": "#444"
            }
        }, domConstruct.create("div", null, dom.byId("fieldWrapper")));
        fieldSelect.on("change", updateAttribute);

    });

}

function renderPorRangos() {

    require([
        "dojo/query",

        "esri/renderers/UniqueValueRenderer",

        "esri/map", "esri/layers/FeatureLayer",
        "esri/InfoTemplate", "esri/symbols/SimpleFillSymbol",
        "esri/renderers/ClassBreaksRenderer",
        "esri/Color",
        "esri/dijit/Legend",
        "jimu/PanelManager",
        "jimu/WidgetManager",

        "dojo/parser",
        "dojo/dom-style",
        "dojo/dom",
        "dojo/dom-construct",

        "dojo/domReady!"
    ], function (
        query,
        UniqueValueRenderer,
        Map, FeatureLayer,
        InfoTemplate, SimpleFillSymbol,
        ClassBreaksRenderer,
        Color, Legend,
        PanelManager,
        WidgetManager,
        parser,
        domStyle,
        dom, domConstruct
    ) {

        console.log("renderPorRangos >>> .................");

        parser.parse(); //

        var legendSae;
        var field = "MPIO";
        var idCapa = "layerRenderMcpio";
        var widgetLegend;

        idCapaActiva = idCapa;

        tw.removerCapa();

        var defaultSymbol = new SimpleFillSymbol();
        var rendererUniqValue = new UniqueValueRenderer(defaultSymbol, "MPIO");
        rendererUniqValue.addValue("CAJICÁ", new SimpleFillSymbol().setColor(new Color([255, 255, 0, 0.5])));
        rendererUniqValue.addValue("ZIPAQUIRÁ", new SimpleFillSymbol().setColor(new Color([128, 0, 128, 0.5])));
        rendererUniqValue.addValue("SOPÓ", new SimpleFillSymbol().setColor(new Color([255, 0, 0, 0.5])));

        var symbol = new SimpleFillSymbol();
        symbol.setColor(new Color([150, 150, 150, 0.5]));

        // Add five breaks to the renderer.
        //var renderer = new ClassBreaksRenderer(symbol, "SUBTIPO");
        var renderer = new ClassBreaksRenderer(symbol, field);
        //renderer.addBreak(0, 25, new SimpleFillSymbol().setColor(new Color([56, 168, 0, 0.5])));
        //renderer.addBreak(25, 75, new SimpleFillSymbol().setColor(new Color([139, 209, 0, 0.5])));
        //renderer.addBreak(75, 175, new SimpleFillSymbol().setColor(new Color([255, 255, 0, 0.5])));
        //renderer.addBreak(175, 400, new SimpleFillSymbol().setColor(new Color([255, 128, 0, 0.5])));
        //renderer.addBreak(400, Infinity, new SimpleFillSymbol().setColor(new Color([255, 0, 0, 0.5])));

        renderer.addBreak(0, 18, new SimpleFillSymbol().setColor(new Color([56, 168, 0, 0.5]))); // sopo 18
        renderer.addBreak(18, 100, new SimpleFillSymbol().setColor(new Color([255, 128, 0, 0.5]))); // zipa 87
        renderer.addBreak(100, Infinity, new SimpleFillSymbol().setColor(new Color([255, 255, 0, 0.5]))); //kjik 284


        //var infoTemplate = new InfoTemplate("${SUBTIPO}", "${*}");
        var infoTemplate = new InfoTemplate("${MPIO}", "${*}");
        var featureLayer = new FeatureLayer("https://sae.igac.gov.co/arcgis/rest/services/SAE/PREDIOS_SAE/MapServer/38", {
            id: idCapa,
            mode: FeatureLayer.MODE_SNAPSHOT,
            outFields: ["*"],
            infoTemplate: infoTemplate
        });

        //featureLayer.setDefinitionExpression("SUBTIPO = 'URBANO'");
        //featureLayer.setRenderer(renderer);

        tw.map.addLayer(featureLayer);

        featureLayer.on("load", function () {
            //            createRenderer(field);
            //featureLayer.setRenderer(renderer);
            featureLayer.setRenderer(rendererUniqValue);
            //createLegend(map, featureLayer, field);
            abrirLeyenda();
        });

        function createLegend(map, layer, field) {
            // se destruye si existe
            if (legendSae) {
                legendSae.destroy();
                domConstruct.destroy(dom.byId("legendDivSae"));
            }

            // crear nuevo div para la leyenda
            var legendDivSae = domConstruct.create("div", {
                id: "legendDivSae"
            }, dom.byId("legendWrapper"));

            legendSae = new Legend({
                map: tw.map,
                layerInfos: [{
                    layer: layer,
                    title: "Grupo total predios: " + field
                }]
            }, legendDivSae);
            legendSae.startup();
        }
        function abrirLeyenda() {

            var widget = appGlobal.appConfig.getConfigElementById("widgets_Legend_Widget_18");
            var widgetId = widget.id;

            cerrarWidgetById(widgetId)
            appGlobal.openWidgetById(widgetId);

        }
    });
}
function forzarSoloPuertosHttps() {
    if (window.location.protocol.indexOf('https') == 0) { // solo par https
        var el = document.createElement('meta')
        el.setAttribute('http-equiv', 'Content-Security-Policy')
        el.setAttribute('content', 'upgrade-insecure-requests')
        document.head.append(el)
    }
}
