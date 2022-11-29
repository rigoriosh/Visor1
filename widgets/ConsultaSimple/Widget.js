var urlSel = "no tengo nada";
var capaUrl = "";
var todosGrupos = [];
var fieldsCapa = [];
var appGlobal;
var theLayer;
var resultadosMandar
var extentInicial;
var selAtributos;
var loading, selCapas, EsriMap;
var objConsultaSimple = {}
define(['dojo/_base/declare', 'jimu/BaseWidget', 'jimu/DataSourceManager',
        "esri/tasks/query", "esri/tasks/QueryTask", "esri/SpatialReference",
        "dojo/query",
        "esri/layers/FeatureLayer", "jimu/PanelManager", "dojo/domReady!"
    ],
    function(declare, BaseWidget, DataSourceManager,
        Query, QueryTask, SpatialReference, query, FeatureLayer, PanelManager) {
        //To create a widget, you need to derive from BaseWidget.
        return declare([BaseWidget], {
            // Custom widget code goes here

            //baseClass: 'jimu-widget-mywidget',

            // postCreate: function() {
            //   this.inherited(arguments);
            //console.log('postCreate');

            //},

            startup: function() {
                //  this.inherited(arguments);
                //this.mapIdNode.innerHTML = 'map id:' + this.map.id;
                //console.log('startup');
                // mostrarResultados(this);
                loading = document.getElementById("loading");
                appGlobal = this;
                EsriMap = this.map
                query("#selAtributos").on("change", async function (evt) {
                    // undoManager.undo();
                    objConsultaSimple.atributo = evt.target.value !== "0" ?  evt.target.value : '';
                });
                query("#palabraClave").on("change", async function (evt) {
                    // undoManager.undo();
                    objConsultaSimple.palabraClave = evt.target.value;
                });
            },

            onOpen: function() {
                console.log('onOpen');
                const selServicios = document.getElementById("selServicios");
                selServicios.value = 0;
                var panel = this.getPanel();
                ajustarTamanioWidget(panel, panel.position.width, 400)

            },
            bindEvents: function() {

                // console.log("bindEvents")

            },
            onExecute: function(featureSet) {
                //console.log("onExecute")
            },
            onClose: function() {
                console.log('onClose');
                //cerrarWidgetResultados();
            },
/* 
            onMinimize: function(){
              console.log('onMinimize');
            },

            onMaximize: function(){
              console.log('onMaximize');
            },

            onSignIn: function(credential){
            //   jshint unused:false
              console.log('onSignIn');
            },

            onSignOut: function(){
              console.log('onSignOut');
            },

            onPositionChange: function(){
              console.log('onPositionChange');
            },

            resize: function(){
              console.log('resize');
            }
 */
            //methods to communication between widgets:
        });
    });

    
function consultaCapasSegunTematica(selServicios) {

    selAtributos = document.getElementById("selAtributos");

    let urlSel = selServicios.value;
    // var servicioSeleccionado = selServicios.value;
    // selCapas.options.length = 0;
    // selGrupos.options.length = 0;
    // txtCampos.options.length = 0;
    // selValores.options.length = 0;
    
    document.getElementById("palabraClave").value = "";
    selAtributos.options.length = 0;
    if (urlSel !== '0') {
        require([
            "esri/map",
            "dojo/dom", "dojo/on",
            "esri/layers/ArcGISDynamicMapServiceLayer",
            "esri/layers/LayerInfo",
            "dojo/_base/array",
            "esri/tasks/query", "esri/tasks/QueryTask",
            "dojo/_base/json",
            "esri/request",
            "jimu/PanelManager",
            "dojo/domReady!"
        ], function(Map, dom, on,
            ArcGISDynamicMapServiceLayer, LayerInfo, arrayUtils, Query, QueryTask, dojoJson, esriRequest, PanelManager) {
            // var infoCapas = "";
            var lasCapas = "";
            /* var layer = new ArcGISDynamicMapServiceLayer(
                urlSel, {
                    useMapImage: false
                }
            ); */
            loading.style.display = 'flex';


            var layersRequest = esriRequest({
                url: urlSel,
                content: { f: "json" },
                handleAs: "json",
                callbackParamName: "callback"
              });
              layersRequest.then((response)=>
                requestSucceeded(response),
                function(error) {
                  console.log("Error: ", error.message);
                  createDialogInformacionGeneral(consts.notas.consultaSimple[0].titulo, consts.notas.consultaSimple[0].body)
                  loading.style.display = 'none';
              });

            /* var requestHandle = esriRequest({
                "url": urlSel,
                "content": {
                    "f": "json"
                },
                "callbackParamName": "callback",
            });
    
            requestHandle.then(requestSucceeded);
             */
            function requestSucceeded(response, io) {
                var jsonEjemplo;
                if (response.hasOwnProperty("layers")) {
    
                    var layerInfo = [];
                    var pad;
                    pad = dojo.string.pad;
                    layerInfo = dojo.map(response.layers, function(f) {
                        // return pad(f.id, 2, " ", true) + "/" + pad(f.name, 8, " ", true).trim() + "/" + pad(f.subLayerIds, 25, " ", true).trim();
                        return pad(f.id, 2, " ", true).trim() + "/" + pad(f.name, 8, " ", true).trim() + "/" + pad(f.subLayerIds, 25, " ", true).trim();
                    });
                    lasCapas = layerInfo;
                    var todo = [];
                    for (var i = 0; i < lasCapas.length.toString(); i++) {
                        var capa = [];
                        capa = lasCapas[i].split("/");
                        todo.push(capa);
                    }

                    insetarCapas(todo);

    
                    /* todosGrupos = todo;
                    var grupos = [];
                    var tieneGrupos = "false";
                    for (var i = 0; i < todo.length.toString(); i++) {
                        if (todo[i][2] != "null") {
                            grupos.push(todo[i]);
                            tieneGrupos = "true";
                        }
                    }
                    if (tieneGrupos == "true") {
                        // insetarCapas(grupos);
                        insetarCapas(todo);
                    } else {
                        insertarCapasSinGrupos(todo);
                    } */
                }
                loading.style.display = 'none';
            }
           
           // cerrarWidgetResultados();
        });
    }else{
        selCapas.options.length = 0;
        objConsultaSimple = {
            atributo:'',
            capaSelected:{},
            palabraClave:'',
            urlCapa:''        }
    }
}

function insetarCapas(capas) {
    selCapas = document.getElementById("selCapas");
    selCapas.options.length = 0;
    // selGrupos.options.length = 0;
    // document.getElementById("grupoLabel").style.display = 'inline';
    // document.getElementById("selGrupos").style.display = 'inline';
    var optsel = document.createElement('option');
    optsel.value = "Seleccione...";
    optsel.text = "Seleccione...";
    selCapas.options.add(optsel);
    // for (var i = 1; i < capas.length; i++) {
    for (var i = 0; i < capas.length; i++) {
        var opt = document.createElement('option');
        opt.value = capas[i][0];
        opt.text = capas[i][1];
        selCapas.options.add(opt);
    }
}

function consultaAtributosSegunCapa(selGrupos, selCapas, selServicios) {
    
    let capaSeleccionado = selGrupos.value.trim();
    document.getElementById("palabraClave").value = "";
    if (capaSeleccionado !== 'Seleccione...') {
        require([
            "esri/map",
            "dojo/dom", "dojo/on",
            "esri/layers/ArcGISDynamicMapServiceLayer",
            "esri/layers/LayerInfo",
            "dojo/_base/array",
            "esri/tasks/query", "esri/tasks/QueryTask",
            "dojo/_base/json",
            "esri/request",
            "jimu/PanelManager",
            "dojo/domReady!"
        ], function(Map, dom, on,
            ArcGISDynamicMapServiceLayer, LayerInfo, arrayUtils, Query, QueryTask, dojoJson, esriRequest, PanelManager) {

                // selCapas.options.length = 0;
                // txtCampos.options.length = 0;
                // selValores.options.length = 0;
                /* document.getElementById("palabraClave").value = "";
                consultarCapas(urlCapa); */

                loading.style.display = 'flex';
        
                let urlCapa = selServicios.value + "/" + capaSeleccionado;
                objConsultaSimple.urlCapa = urlCapa;
                /* const queryAtributos =  await ejecutarConsulta(urlCapa);
                console.log(queryAtributos) */
        
                var requestHandle = esriRequest({
                    "url": urlCapa,
                    "content": {
                        "f": "json"
                    },
                    "callbackParamName": "callback",
                });
        
                requestHandle.then(requestSucceeded);
                function requestSucceeded(response, io) {
                    objConsultaSimple.capaSelected = response;
                    console.log(response)
                    console.log(io)
                    fixAttributesToShow(response.fields);
                }
            }
        
        )
    }else{
        objConsultaSimple.urlCapa = '';
        objConsultaSimple.capaSelected = {};
    }

}

function fixAttributesToShow(fields) {
    let fieldsToShow = fields.filter(e => (e.name !== 'OBJECTID_1' && e.name !== 'OBJECTID' && e.name !== 'Shape_Leng'
    && e.name !== 'Shape' && e.name !== 'Shape.STArea()'&& e.name !== 'Shape.STLength()'
    && e.name !== 'SHAPE_Leng' && e.name !== 'SHAPE' && e.name !== 'SHAPE.STArea()'&& e.name !== 'SHAPE.STLength()'));
    let finalFieldsToShow = [];
    fieldsToShow.forEach(fts => {
        finalFieldsToShow.push(fts.name)
    });
    agregarDataSelect2(finalFieldsToShow,'selAtributos')

    loading.style.display = 'none';
    
}

function consultaSimple() {

    // var campoSeleccionado = txtCampos.value;
    // var campo = campoSeleccionado.split("(");
    // var valorSeleccionado = selValores.value;
    var fields = fieldsCapa;
    //console.log(fields);
    // var queryprueba;
    // var lids = appGlobal.map.layerIds;

    require(["esri/tasks/query", "esri/tasks/QueryTask", "esri/SpatialReference", "esri/layers/FeatureLayer", "esri/dijit/FeatureTable", "esri/geometry/Extent", "esri/tasks/GeometryService",
    "esri/tasks/ProjectParameters", "dojo/dom", "dojo/on", "dojo/_base/lang", 'jimu/BaseWidget', "jimu/LayerInfos/LayerInfos", "jimu/PanelManager", "dojo/request",
    "esri/request", "esri/symbols/SimpleFillSymbol", "esri/Color", "dojo/domReady!"
        ],
        function(Query, QueryTask, SpatialReference, FeatureLayer, FeatureTable, Extent, GeometryService, ProjectParameters, dom, on, lang, BaseWidget, LayerInfos, PanelManager, request,
            esriRequest, SimpleFillSymbol, Color) {
            /* if (campoSeleccionado == "") {

                alert("Por favor seleccione un campo");
            } */
            const {atributo, capaSelected, palabraClave, urlCapa} = objConsultaSimple;
            if (/* atributo && capaSelected && palabraClave && urlCapa */1) {
                loading.style.display = 'flex';
/* 
                // pintarFeatureLayer(urlCapa,'dddd',appGlobal.map)
                // let featureLayer = new FeatureLayer("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Petroleum/KGS_OilGasFields_Kansas/MapServer/0", {
                let featureLayer = new FeatureLayer(urlCapa, {
                    id: 'id',
                    outFields: ['*'],
                    //infoTemplate : new (InfoTemplate),
                    mode: FeatureLayer.MODE_ONDEMAND,
                    definitionExpression:"1=1",
                    visible: true,
                    showLabels:true
                });
                appGlobal.map.addLayer(featureLayer);
                appGlobal.map.lastfeatureLayerDrawed = featureLayer; 
                request.get(urlCapa, {
                    handleAs: 'json'
                }).then(lang.hitch(this, llenarSelectDependencias));
                request
                        .post(urlCapa, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        handleAs: "json"
                        }).then(lang.hitch(this, llenarSelectDependencias));
                var requestHandle = esriRequest({
                    "url": urlCapa,
                    "content": {
                        "f": "json"
                    },
                    "callbackParamName": "callback",
                });
        
                requestHandle.then(requestSucceeded1); */
                var symbol = new SimpleFillSymbol();
                symbol.setColor(new Color([255, 255, 255, 0.9]));
                /* var spatialRef1 = new SpatialReference(21892);
                var spatialRef1 = new SpatialReference(102101);
                var spatialRef1 = new SpatialReference(3115);
                var spatialRef1 = new SpatialReference(4686);
                var spatialRef1 = new SpatialReference(3114);
                var spatialRef1 = new SpatialReference(4192); */

                var spatialRef1 = new SpatialReference(Number(objConsultaSimple.palabraClave));
                var where = '1=1';
                var queryGeo = new Query();
                var queryTask = new QueryTask(urlCapa);
                // var queryTask = new QueryTask('https://172.17.3.205:6443/arcgis/rest/services/SAE/PRUEBA/MapServer/0');
                //queryGeo.outSpatialReference = spatialRef1;
                queryGeo.outSpatialReference = EsriMap.spatialReference;
                queryGeo.returnGeometry = true;
                queryGeo.where = where;
                queryGeo.outFields = ["*"];
                queryTask.execute(queryGeo, lang.hitch(this, requestSucceeded1), lang.hitch(this, errorRequest),);
                function requestSucceeded1({features, geometryType, fields, spatialReference}) {
                    console.log(features)
                    console.log(features[0].geometry.getExtent())
                    pintarFeaturesConInfoTemplate({features})
                    /* console.log(io)
                    let layerDefinition = {
                        geometryType: geometryType,
                        objectIdField: fields[0].name,
                        spatialReference: EsriMap.spatialReference,
                        fields: fields,
                        name: 'layerResultadoGeoestadistica',
                        drawingInfo: {
                            renderer: {
                                type: "simple",
                                symbol
                            }
                        }
                    };
                    var featureCollection = {
                        "layerDefinition": layerDefinition,
                        "featureSet": {
                            "features": features,
                            "geometryType": geometryType,
                            spatialReference: EsriMap.spatialReference
                        }
                    };
            
                    featureCollection.layerDefinition = {
                        "geometryType": geometryType,
                        "objectIdField": fields[0].name,
                        "drawingInfo": {
                            "renderer": {
                                "type": "simple",
                                "symbol": symbol
                            }
                        },
                        "fields": fields
                    };

                    let layer = new FeatureLayer(featureCollection, {
                        id: 'this.idMapTeamLayer',
                        mode: FeatureLayer.MODE_ONDEMAND,                                                   
                        // mode: FeatureLayer.MODE_SNAPSHOT,                                                   
                    });  

                    // reproyectarMapa(layer);

                    EsriMap.setExtent(featureCollection.featureSet.features[0]._extent)
                    EsriMap.addLayer(layer);
                    console.log(layer) */
                    loading.style.display = 'none';
                }
                function errorRequest(error) {
                    console.log(error)
                    createDialogInformacionGeneral(consts.notas.consultaSimple[0].titulo, consts.notas.consultaSimple[0].body)
                    loading.style.display = 'none';
                }
                    
               
                //cerrarWidgetResultados();


                /* if (capaUrl.indexOf("Educacion_T") > -1 && capaUrl.indexOf("4") > -1) {

                    var fieldE = "SIGQ.V_UNIVERSIDAD.";
                    for (var i = 0; i < fieldsCapa.length ; i++) {

                        fieldsCapa[i] = fieldE + fieldsCapa[i];

                    }
                } */

                /* var query = new Query();
                var queryTask = new QueryTask(capaUrl);
                query.returnGeometry = true;
                // query.outFields = [atributo];
                query.outFields = "*";
                // queryprueba = query;
                var where = "1=1";
                var campoSel = atributo; */
                // where = campoSel + " LIKE '%" + palabraClave + "%'";

                /* if (campoSeleccionado.includes("String")) {

                    where = campoSel[0] + " LIKE '%" + selValores.value + "%'";
                } else {
                    where = campoSel[0] + "= " + selValores.value;
                } */
                /* query.where = where;
                queryTask.execute(query, monstrarConsulta); */
                function monstrarConsulta(featureSet) {
                    var resultados = null;
                    resultados = featureSet;
                    var info = featureSet.features;
                    resultadosMandar = resultados;
                    var result = [];
                    for (var i = 0, il = info.length; i < il; i++) {
                        result.push(info[i].attributes);
                    }
                    var jsonconvertio = JSON.stringify(result);
                    var resultFeatures = featureSet.features;
                    var prueba = resultFeatures[0];
                    appGlobal.appConfig.getConfigElementById('widgets_MyWidgetResultados_Widget_40').resultados = resultados;
                    appGlobal.appConfig.getConfigElementById('widgets_MyWidgetResultados_Widget_40').urlCapa = capaUrl;
                    appGlobal.appConfig.getConfigElementById('widgets_MyWidgetResultados_Widget_40').camposMostrar = fieldsCapa;
                    appGlobal.appConfig.getConfigElementById('widgets_MyWidgetResultados_Widget_40').expresionConsultar = where;
                    appGlobal.appConfig.getConfigElementById('widgets_MyWidgetResultados_Widget_40').operacionRealizar = "consultas";
                    appGlobal.appConfig.getConfigElementById('widgets_MyWidgetResultados_Widget_40').resultadosJson = jsonconvertio;
                    console.log(appGlobal);


                    var widget = appGlobal.appConfig.getConfigElementById('widgets_MyWidgetResultados_Widget_40');
					//cerrarWidgetResultados();
                    var widgetId = widget.id;
                    appGlobal.openWidgetById(widgetId);

                    if (appGlobal.contador == 0) {
                       
                        appGlobal.contador++;
                        monstrarConsulta(resultados);
                    }
                }

            } else {
                createDialogInformacionGeneral(consts.notas.consultaSimple[1].titulo, consts.notas.consultaSimple[1].body);                 
            }
        });


}

function reproyectarMapa(layer) {
    require(["esri/SpatialReference", "esri/tasks/GeometryService"], function(SpatialReference, GeometryService){
        var gs = new GeometryService("https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer");
        console.log(layer)
        var sr = new SpatialReference(9377);
        var project = gs.project([ EsriMap.extent ], EsriMap.spatialReference);
        project.then(success, failure);
    })
}

function success(result) {
    console.log("project successful: ", result);
    if ( result.length ) {
        var bounds = result[0];
        buildMap(bounds);
    //   showInfo(bounds);
    } else {
        console.log("Project was successful, but no results were returned.");
    }
}
function failure(err) {
    console.log("Project failed:  ", err);
}
function buildMap(b) {
    require(["esri/map", "esri/layers/FeatureLayer", "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol", "esri/renderers/SimpleRenderer", "esri/Color"],
    function(Map, FeatureLayer, SimpleLineSymbol, SimpleFillSymbol, SimpleRenderer, Color){
        if ( appGlobal.map ) { // kill the map, if it already exists
            appGlobal.map.extentChange && appGlobal.map.extentChange.remove();
            appGlobal.map.destroy();
            appGlobal.map = null;
            // console.log("destroyed previous map instance");
        }
        appGlobal.map = {bounds:{}}
        appGlobal.map.bounds = b || appGlobal.map.bounds;
        appGlobal.map = new Map("map", {
            extent: appGlobal.map.bounds,
            showAttribution: false,
            sliderStyle: "small"
        });
        console.log("map extent: ", appGlobal.map.extent.spatialReference.wkid);
        // USA
        var layer = new FeatureLayer(objConsultaSimple.urlCapa);
        // other layers to use...world regions:
        // var layer = new FeatureLayer("https://sampleserver6.arcgisonline.com/arcgis/rest/services/WorldTimeZones/MapServer/2");
        // countries:
        // var layer = new FeatureLayer("https://wwtw.esriuk.com/ArcGIS/rest/services/CG/WorldCountries/MapServer/0");
        var outline = new SimpleLineSymbol("solid", new Color([255, 255, 255, 1]), 1);
        var fill = new SimpleFillSymbol("solid", outline, new Color([64, 64, 64, 0.5]));
        layer.setRenderer(new SimpleRenderer(fill));
        appGlobal.map.addLayer(layer);
        // appGlobal.map.extentChange = appGlobal.map.on("extent-change", showInfo);
        })

}
///////////////////////////

function llenarSelectDependencias(data) {
    console.log(data)
}

function configurarWms()
{

    require(["esri/map", "esri/layers/WMSLayer","esri/layers/LayerInfo", "esri/config", "dojo/_base/array", "dojo/domReady!"],
       function (Map, WMSLayer, LayerInfo, esriConfig, array) {

           esriConfig.defaults.io.alwaysUseProxy = true;
           esriConfig.defaults.io.corsDetection = false;

           map = new Map("map", {
               basemap: "streets",
               center: [-70, 5],
               zoom: 5
           });

           var wmsLayer = new WMSLayer("http://172.17.3.142:6080/arcgis/services/QUINDIO_III/Cartografia_Basica/MapServer/WMSServer", {
               format: "png"
           });


            
          
           

           this.map.addLayer(wmsLayer);

           esriConfig.defaults.io.alwaysUseProxy = false;
           

       });


}

function insertarCapasSinGrupos(todo) {

    selCapas.options.length = 0;
    // document.getElementById("grupoLabel").style.display = 'none';
    // document.getElementById("selGrupos").style.display = 'none';
    var optsel = document.createElement('option');
    optsel.value = "Seleccione...";
    optsel.text = "Seleccione...";
    selCapas.options.add(optsel);
    for (var i = 0; i < todo.length; i++) {

        var opt = document.createElement('option');
        opt.value = todo[i][0];
        opt.text = todo[i][1];
        selCapas.options.add(opt);
    }

}

function consultarCapas(urlCapa) {

    // var grupoSeleccionado = selGrupos.value;
    require([
        "esri/map",
        "dojo/dom", "dojo/on",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/layers/LayerInfo",
        "dojo/_base/array",
        "esri/tasks/query", "esri/tasks/QueryTask",
        "dojo/_base/json",
        "esri/request",
        "jimu/PanelManager",
        "dojo/domReady!"
    ], function(Map, dom, on,
        ArcGISDynamicMapServiceLayer, LayerInfo, arrayUtils, Query, QueryTask, dojoJson, esriRequest, PanelManager) {
        var capas = "";
        /* for (var i = 0; i < todosGrupos.length; i++) {
            if (todosGrupos[i][0] == grupoSeleccionado.toString()) {

                capas = todosGrupos[i][2];
            }
        } */

        var capasCompleta = [];
        capasCompleta = capas.split(",");
        var idCapasCompleta;
        var idTodosGrupos;
        var capasDelGrupo = [];
        for (var i = 0; i < capasCompleta.length; i++) {
            idCapasCompleta = capasCompleta[i].replace(/\D/g, '');
            for (var j = 0; j < todosGrupos.length; j++) {
                idTodosGrupos = todosGrupos[j][0].replace(/\D/g, '');
                if (idCapasCompleta == idTodosGrupos) {
                    capasDelGrupo.push(todosGrupos[j]);
                }
            }

        }
        insertarCapas(capasDelGrupo);
        //cerrarWidgetResultados();
    });

}
function insertarCapas(todo) {
    selCapas.options.length = 0;
    var optsel = document.createElement('option');
    optsel.value = "Seleccione...";
    optsel.text = "Seleccione...";
    selCapas.options.add(optsel);
    for (var i = 0; i < todo.length; i++) {

        var opt = document.createElement('option');
        opt.value = todo[i][0];
        opt.text = todo[i][1];
        selCapas.options.add(opt);
    }

}

function configureDropDownListCampos(selCapas) {
    var capaSeleccionada = selCapas.value;
    var capaCorregida = capaSeleccionada.replace(/([\ \t]+(?=[\ \t])|^\s+|\s+$)/g, '');
    // txtCampos.options.length = 0;
    // selValores.options.length = 0;
    document.getElementById("palabraClave").value = "";
    var urlCapa = urlSel + "/" + capaSeleccionada;
    capaUrl = urlCapa.replace("/ /g", '');
    require([
        "esri/map",
        "dojo/dom", "dojo/on",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/layers/LayerInfo",
        "dojo/_base/array",
        "dojo/_base/array",
        "esri/tasks/query", "esri/tasks/QueryTask",
        "dojo/_base/json",
        "dojo/string",
        "esri/request",
        "jimu/PanelManager",
        "dojo/domReady!"
    ], function(Map, dom, on,
        ArcGISDynamicMapServiceLayer, LayerInfo, arrayUtils, array, Query, QueryTask, dojoJson, dojoString, esriRequest, PanelManager) {
        var losFields = [];
        // loading.style.display = 'flex';
        loading.style.display = 'flex';
        var requestHandle = esriRequest({
            "url": urlCapa,
            "content": {
                "f": "json"
            },
            "callbackParamName": "callback",
        });
        requestHandle.then(requestSucceeded);
        function requestSucceeded(response, io) {
            var fieldInfo, pad;
            pad = dojoString.pad;
            dojoJson.toJsonIndentStr = "  ";
            if (response.hasOwnProperty("fields")) {
                fieldInfo = array.map(response.fields, function(f) {
                    return pad(f.alias, 25, " ", true) +
                        "/" + pad(f.type, 25, " ", true);
                });
                losFields = fieldInfo;
                var todo = [];
                for (var i = 0; i < losFields.length.toString(); i++) {
                    var field = [];
                    field = losFields[i].split("/");
                    todo.push(field);

                }
                insertarCampos(todo);
            }
            // loading.style.display = 'none';
            loading.style.display = 'none';
        }

        //cerrarWidgetResultados();
    });
}

function insertarCampos(todo) {
    // document.getElementById("txtCampos").value = "";
    var fields = "";
    var campos = [];
    var field;
    var tipo = "";
    var type = "";
    var estossonfields = [];
    //console.log(todo);
    for (var i = 0; i < todo.length; i++) {
        tipo = todo[i][1].slice(13);
        tipo = tipo.replace(/([\ \t]+(?=[\ \t])|^\s+|\s+$)/g, '');
        type = "(" + tipo + ")";
        estossonfields.push(todo[i][0].replace(/([\ \t]+(?=[\ \t])|^\s+|\s+$)/g, ''));
        field = todo[i][0] + type;
        field = field.replace(/([\ \t]+(?=[\ \t])|^\s+|\s+$)/g, '');
        fields = fields + field + "\n";
    }
    fieldsCapa = estossonfields;
    insertarCamposSelect(fields);
}

function insertarCamposSelect(fields) {
    txtCampos.options.length = 0;
    var campos = [];
    campos = fields.split("\n");
    for (var i = 0; i < campos.length; i++) {
        var opt = document.createElement('option');
        opt.value = campos[i];
        opt.text = campos[i];
        txtCampos.options.add(opt);
        
    }

}


    
function configureDropDownListIngresarCampos(txtCampos) {
    document.getElementById("palabraClave").value = "";
    var campoSeleccionado = txtCampos.value;
    var campo = campoSeleccionado.split("(");
    var field = campo[0].replace(/([\ \t]+(?=[\ \t])|^\s+|\s+$)/g, '');
    capaUrl = capaUrl.replace(/^\s+|\s+|\s+$/, '');



    if (capaUrl.indexOf("Educacion_T") > -1 && capaUrl.indexOf("4") > -1) {

        var fieldE = "SIGQ.V_UNIVERSIDAD.";
        field = fieldE + field;
    }


    require(["esri/tasks/query", "esri/tasks/QueryTask", "esri/SpatialReference", "esri/layers/FeatureLayer", "dojo/dom",
            "dojo/on", "dojo/domReady!"
        ],
        function(Query, QueryTask, SpatialReference, FeatureLayer, dom, on) {
            loading.style.display = 'flex';
            if (campoSeleccionado != null) {

                var valores = [];
                var valoressolos = [];	
				//console.log("Consulta simple: ");
				var queryTask = new QueryTask(capaUrl);
                var query = new Query();
                
                query.outFields = [field];
                //console.log(field);
                query.where = "1=1";
				query.returnGeometry = false;
                queryTask.execute(query, monstrarConsulta);
				
                function monstrarConsulta(featureSet) {
				
                    var resultFeatures = featureSet.features;
					//console.log(featureSet);
					if(resultFeatures != undefined)
					{
						var resultadoPeticion = resultFeatures;
						for (var i = 0; i < resultFeatures.length; i++) {
							valores.push(resultFeatures[i].attributes);
						}
						var prueba = JSON.stringify(valores);
						var result = [];
						var resultado = prueba.split(",");
						var valor;
						var campito = campo[0].replace(/([\ \t]+(?=[\ \t])|^\s+|\s+$)/g, '');
						var valorsolo;
						var valoresCompleto = [];
						for (var j = 0; j < resultado.length; j++) {
							valor = resultado[j].split(":");
							if (valor.length > 1) {
								valorsolo = valor[1].split("}");
							} else {
								valorsolo = valor[0].split("}");
							}
							valoresCompleto.push(valorsolo[0]);
						}

						function comparar(a, b) {
							return a - b;
						}
						valoresCompleto.sort(comparar);

						var listaGrupo02 = [];
						var SinDuplicados = [];
						var SinDuplicados = valoresCompleto.filter(function(elem, pos) {
							return valoresCompleto.indexOf(elem) == pos;
						});
						insertarValoresSelect(SinDuplicados);
						loading.style.display = 'none';
					
					}else{
					
					 // console.log(field);
					  console.log(capaUrl);
					  
					}
                }
            }
        });
}

function insertarValoresSelect(valoresCompleto) {

    selValores.options.length = 0;
    var campoSeleccionado = txtCampos.value;
    var campo = campoSeleccionado.split("(");
    var esNull = "";
    if (campo[0] != "SHAPE ") {

        for (var i = 0; i < valoresCompleto.length; i++) {

            esNull = valoresCompleto[i].replace(/['"]+/g, '')
            if (esNull != "null") {
                var opt = document.createElement('option');

                opt.value = valoresCompleto[i].replace(/['"]+/g, '');
                opt.text = valoresCompleto[i].replace(/['"]+/g, '');
                selValores.options.add(opt);
            } else {
                var opt = document.createElement('option');

                opt.value = "";
                opt.text = "";
                selValores.options.add(opt);
            }
        }
    }
}

function configureDropDownListValores(selValores) {

    var valor = selValores.value;
    document.getElementById("palabraClave").value = valor;
}

function limpiar() {
    document.getElementById("palabraClave").value = "";
    selValores.options.length = 0;
}


function mostrarResultados(aplicacion) {
    appGlobal = aplicacion;

    extentInicial = null;
    extentInicial = appGlobal.map.extent;
}
	
function cerrarWidgetResultados() {
    
    require([
        "esri/map",
        "dojo/dom", "dojo/on",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/layers/LayerInfo",
        "dojo/_base/array",
        "dojo/_base/array",
        "esri/tasks/query", "esri/tasks/QueryTask",
        "dojo/_base/json",
        "dojo/string",
        "esri/request",
        "jimu/PanelManager",
		"jimu/WidgetManager",
        "dojo/domReady!"
    ], function(Map, dom, on,
        ArcGISDynamicMapServiceLayer, LayerInfo, arrayUtils, array, Query, QueryTask, dojoJson, dojoString, esriRequest, PanelManager,WidgetManager) {
   

        var panelManager = PanelManager.getInstance();
        var widgetCerrar = PanelManager.getInstance().getPanelById("widgets_MyWidgetResultados_Widget_40_panel");
        if (widgetCerrar != undefined) {
            panelManager.closePanel("widgets_MyWidgetResultados_Widget_40_panel");
            panelManager.destroyPanel("widgets_MyWidgetResultados_Widget_40_panel");
            appGlobal.map.graphics.clear();
            var currentLayer = appGlobal.map.getLayer("capaResultadoCA");
            if (currentLayer != null) {
                appGlobal.map.removeLayer(currentLayer);
            }
            appGlobal.map.setExtent(extentInicial);
        } else {
            console.log("No se pudo cerrar");
        }
    });
}	
	



   