var myFeatureTable = "null";
var extentInicial, panelManager, widgetCerrar;
var operacionRealizarGlobal;
var ResultadosJson;
var resultados;
var widgetResultados = {};
var sg;
var selectedRegisterFromTable = {
    rows:[],
    features:[]
}
define(['dojo/_base/declare', 'jimu/BaseWidget',
"esri/tasks/FeatureSet",
 "dojo/dom", "dojo/query", "dojo/domReady!"],
    function (declare, BaseWidget, 
        FeatureSet,
        dom, query) {

        var widgetOpen = false;
        //To create a widget, you need to derive from BaseWidget.
        return declare([BaseWidget], {
            
            startup: function () {
                extentInicial = null;
                extentInicial = this.map.extent;

                setearMapa(this);
                let thisMyWidResul = this;

                query("#btnExportar").on("click", async function (evt) {
                    //console.log("exporto the wollow");
                    //console.log(selectedRegisterFromTable.features);
                    //console.log(selectedRegisterFromTable.rows);
                    if (consts.debug) {                                            
                        console.log({thisMyWidResul});
                    }
                    var featureSet = new FeatureSet();
                    featureSet.features = EsriMap.graphics.graphics;
                    const load = widgetResultados.data.tipoResultado == consts.consultas.consultaAvanzada
                    ? "loadingCA" : widgetResultados.data.tipoResultado == consts.consulNotariadoRegistro
                    ? "loadingNR" :"loadingCS"
                    exportarShape(featureSet, load)
                    
                });
            },

            onOpen: function () {
                window.widgetOpen = true;
                
                widgetResultados = this.appConfig.getConfigElementById(consts.widgetMyResultados);
                //console.log(widgetResultados);
                
                var panel = this.getPanel();
                // panel.position.width = 1000;
                // panel.position.height = 300;
                panel.position.width = !widgetResultados?.data?.data.panel.width?100:widgetResultados.data.data.panel.width;
                panel.position.height = !widgetResultados?.data?.data.panel.height?100:widgetResultados.data.data.panel.height;
                panel._originalBox = {
                    w: panel.position.width,
                    h: panel.position.height,
                    l: panel.position.left || 0,
                    t: panel.position.top || 0
                };
                panel.setPosition(panel.position);
                panel.panelManager.normalizePanel(panel);                

                let divResulConsultaUnica = dom.byId("divResulConsultaUnica");
                let divResulConsultaMultiple = dom.byId("divResulConsultaMultiple");
                let divResulConsultaCatastro = dom.byId("divResulConsultaCatastro");
                if (widgetResultados.data) {
                    switch (widgetResultados.data.tipoResultado) {
                        case consts.consulAvaluoMasivo:
                            //console.log(consts.consulAvaluoMasivo);
                            cargarTablaResultados(widgetResultados);
                            // divResulConsultaUnica.style.display = "none";
                            divResulConsultaCatastro.style.display = "none";
                            divResulConsultaMultiple.style.display = "block";
                            break;
                        case (consts.consulNotariadoRegistro):
                            //console.log(consts.consulAvaluoMasivo);
                            cargarTablaResultados(widgetResultados);
                            // divResulConsultaUnica.style.display = "none";
                            divResulConsultaCatastro.style.display = "none";
                            divResulConsultaMultiple.style.display = "block";
                            // dom.byId("divExportar").style.display = "none";
                            break;
                        case consts.consulSAE:
                            //console.log(consts.consulAvaluoMasivo);
                            cargarTablaResultados(widgetResultados);
                            // divResulConsultaUnica.style.display = "none";
                            divResulConsultaCatastro.style.display = "none";
                            divResulConsultaMultiple.style.display = "block";
                            // dom.byId("divExportar").style.display = "none";
                            break;
                        case consts.consulAvaluoUnica:
                            if (consts.debug) {                
                                console.log(consts.consulAvaluoUnica);
                            }
                            // document.querySelector("#divResulConsultaUnica").style.display = 'block'
                            divResulConsultaMultiple.style.display = "block";
                            // divResulConsultaUnica.style.display = "none";
                            divResulConsultaCatastro.style.display = "none";
                            cargarTablaResultados(widgetResultados);
                            // this.ejecutarConsultaUnica();
                            break;
                        case consts.consulCatastro:
                            //console.log(consts.consulCatastro);
                            // divResulConsultaUnica.style.display = "none";
                            divResulConsultaMultiple.style.display = "none";
                            divResulConsultaCatastro.style.display = "block";
                            // this.ejecutarConsultaUnica();
                            break;
                        case consts.consultas.consultaSimple:
                            //console.log(consts.consultas.consultaSimple);
                            cargarTablaResultados(widgetResultados);
                            // divResulConsultaUnica.style.display = "none";
                            divResulConsultaCatastro.style.display = "none";
                            divResulConsultaMultiple.style.display = "block";
                            break;
                        case consts.consultas.consultaAvanzada:
                            //console.log(consts.consultas.consultaAvanzada);
                            cargarTablaResultados(widgetResultados);
                            // divResulConsultaUnica.style.display = "none";
                            divResulConsultaCatastro.style.display = "none";
                            divResulConsultaMultiple.style.display = "block";
                            break;
                        default:
                            break;
                    }
                }

                // var divCarga = document.getElementById("loadingFeatureTable");
                // divCarga.style.visibility = 'visible';
                // divCarga.style.visibility = 'hidden';
                // window.widgetOpen = true;
            },

            onClose: function () {
           
                if (typeof(appGlobal) !== 'undefined') {
                    for (var i = appGlobal.widgetManager.loaded.length; i > 0; i--) {
                        var idWidgets = appGlobal.widgetManager.loaded[i - 1].id;
                    
                        if (window.widgetOpen && idWidgets == consts.widgetMyResultados) {
                            window.widgetOpen = false;
                            cerrarWidgetResultados();                                    
                            break;
                        }
                    }
                }else{
                    cerrarWidgetResultados();                                    

                }

            },

            ejecutarConsultaUnica: ()=>{
                //console.log("ejecutarConsultaUnica  ===>");
                const simulaRespCosUni = [
                    {
                        label: 'FOLIO DE MATRICULA',
                        value: '290-1709'
                    },
                    {
                        label: 'BASE',
                        value: 'SOCIEDADES ACTIVAS'
                    },
                    {
                        label: 'ESTADO AVALUO',
                        value: 'APROBADO'
                    },
                    {
                        label: 'TIPO DE BIEN',
                        value: 'RURAL'
                    },
                    {
                        label: 'CLASE DE BIEN',
                        value: 'FINCA'
                    },
                    {
                        label: 'DIRECCIÓN AVALUO',
                        value: 'LA SOFIA HOY CARMINA'
                    },
                    {
                        label: 'PROPIEDAD HORIZONTAL',
                        value: 'NPH'
                    },
                    {
                        label: 'FIRMA AVALUADORA',
                        value: 'LONPROCOL'
                    },
                    {
                        label: 'FUNCIONARIO QUE REVISA',
                        value: 'ANDRES FELIPE FRANCO'
                    },
                    {
                        label: 'ESTADO VISITA',
                        value: 'VISITADO SI ESTADO'
                    },
                    {
                        label: 'PERITO AVALUADOR',
                        value: 'WILSON QUITOGA ORGUELA'
                    },
                    {
                        label: 'NUMERO AVALUO',
                        value: '3233'
                    },
                    {
                        label: 'ESTRATO',
                        value: '1'
                    },
                    {
                        label: 'EDAD INMUEBLE',
                        value: '60 AÑOS'
                    },
                    {
                        label: 'VALOR COMERCIAL APROBADO',
                        value: "4320786000"
                    },
                    {
                        label: 'VALOR M2 TERRENO',
                        value: '6954,644758'
                    },
                    {
                        label: 'VALOR M2 CONSTRUCCIÓN',
                        value: '505831,7168'
                    },
                    {
                        label: 'AREA TERRENO',
                        value: '321330'
                    },
                    {
                        label: 'AREA M2 CONSTRUCCIÓN',
                        value: '4124'
                    },
                    {
                        label: 'FOTO',
                        value: 'https://storage.contextoganadero.com/s3fs-public/styles/noticias_one/public/ganaderia/field_image/2017-03/finca_productiva.jpg?itok=hOnEq0TG'
                    }
                    
                ]
                var divConsultaUnica = document.querySelector("#divResulConsultaUnica");
                let newHtml = ``;
                simulaRespCosUni.forEach(e => {
                    if (e.label !== "FOTO") {
                        newHtml += `
                            <div class="fila">
                                    <label class="label">${e.label}</label>
                                    <p class="fila2">${e.value}</p>
                            </div>`
                    } else {
                        
                        newHtml += `
                        <div class="fila foto">
                            <img class="imagen" src=${e.value}”>
                        </div>`
                    }
                })
                divConsultaUnica.innerHTML = `
                    <div>
                        <div></div>
                        ${newHtml}
                    </div>
                `
            }

        });
    })

var objetoMapa = null;
function cargarTablaResultados(widget) {
    require(["esri/layers/FeatureLayer", "esri/dijit/FeatureTable", "esri/tasks/GeometryService", "esri/SpatialReference", 
    "esri/geometry/Extent", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol", "esri/Color", "esri/graphic",
    "esri/graphicsUtils", "esri/tasks/query"],
		function (FeatureLayer, FeatureTable, GeometryService, SpatialReference, 
            Extent, SimpleFillSymbol, SimpleLineSymbol, Color, Graphic, graphicsUtils, Query) {
		    
            let myFeatureLayer, fieldInfos = [], outFields = [], tablaToRender = "myTableNode";
            const {featureCollection, tipoResultado, loading, urlGeografica} = widget.data
            if (consts.debug) {                
                console.log(widget.data);                    
            }
            if (tipoResultado === consts.consultas.consultaSimple || tipoResultado === consts.consultas.consultaAvanzada
                || tipoResultado === consts.consulNotariadoRegistro || tipoResultado === consts.consulSAE || tipoResultado === consts.consulAvaluoUnica
                || tipoResultado === consts.consulAvaluoMasivo) {
                myFeatureLayer = new FeatureLayer(featureCollection, {
                    showLabels: true
                });
                if (consts.debug) {                
                    console.log(consts.consulAvaluoUnica);
                    console.log(featureCollection);
                }

                fieldInfos = featureCollection.layerDefinition.fields
                /* fieldInfos = [
                    {
                        name: 'OBJECTID', 
                        alias: 'id', 
                        editable: false //disable editing on this field 
                        },
                    {
                        name: 'ETIQUETA', 
                        alias: 'Departamento', 
                        editable: false //disable editing on this field 
                    },
                    {
                        name: 'FECHA_LOG', 
                        alias: 'Cod_Departamento', 
                        editable: false //disable editing on this field 
                    },
                    {
                        name: 'GLOBALID', 
                        alias: 'Region'
                    },
                    {
                        name: 'IDENTIFICADOR', 
                        alias: 'Poblado'
                    }
                ] */
            } /* if (tipoResultado === consts.consulNotariadoRegistro) {
                
            } */else {
                myFeatureLayer = new FeatureLayer(widget.data.data.urlDparts, {
                    // mode: FeatureLayer.MODE_ONDEMAND,
                    // outFields: "*",
                    outFields: ["DEPARTAMEN","COD_DEPART","REGION","Poblado", "Tamano", "Area_M", "OBSERVACIO"],
                    definitionExpression: "1=1",
                    visible: true,
                    id: "capaResultadoCA",
                    showLabels:true
                });
                fieldInfos = [
                    {
                        name: 'OBJECTID_12', 
                        alias: 'id', 
                        editable: false //disable editing on this field 
                        },
                    {
                        name: 'DEPARTAMEN', 
                        alias: 'Departamento', 
                        editable: false //disable editing on this field 
                    },
                    {
                        name: 'COD_DEPART', 
                        alias: 'Cod_Departamento', 
                        editable: false //disable editing on this field 
                    },
                    {
                        name: 'REGION', 
                        alias: 'Region'
                    },
                    {
                        name: 'Poblado', 
                        alias: 'Poblado'
                    },
                    {
                        name: 'Tamano', 
                        alias: 'Tamaño'
                    },
                    {
                        name: 'Area_M', 
                        alias: 'Área'
                    },
                    {
                        name: 'OBSERVACIO', 
                        alias: 'Observación'
                    }
                    
                ]
            }

            // map.add(featureLayer);
    
                myTable = new FeatureTable({
                    featureLayer: myFeatureLayer,
                    showGridMenu: true,
                    syncSelection: true,
                    zoomToSelection: false,
                    gridOptions: {
                        noDataMessage: "Sin resultados para esta consulta",
                        allowSelectAll: true,
                        cellNavigation: false,
                        selectionMode: "extended",
                        pagination: false,
                        allowTextSelection: true,
                        pageSizeOptions: [10, 25, 50],
                        columnHider: false,
                        columnResizer: true,
                        pagingDelay: 300,
                        sort: {
                            field: "StateName", descending: true}
                    },
                    editable: true,
                    showColumnHeaderTooltips:true,
                    fieldInfos
                },
                tablaToRender);
    
                
                myTable.startup();
                // myTable.selectRows([1, 2, 3], false);
                if (loading) loader2(false, loading)
                
                myTable.on("row-select", function (evt) {
                    myTable.getFeatureDataById(myTable.selectedRowIds).then(function (features) {
                        var symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 0, 0, 2]), 3), new Color([0, 0, 0, 1]));
                        if (tipoResultado === consts.consultas.consultaAvanzada) {
                           //console.log(widget) 
                           
                            var query = new Query();
                            query.objectIds = myTable.selectedRowIds;
                            query.returnGeometry = true;
                            query.outSpatialReference = EsriMap.spatialReference;
                            EsriMap.graphics.clear()
                            EsriMap.lastfeatureLayerDrawed.selectFeatures(query, FeatureLayer.SELECTION_NEW, dojo.hitch(this, function(features) {
                                //console.log(features)
                                selectedRegisterFromTable.features.length = 0
                                widget.data.objConsultaAvanzada.queryFinalyResponse.features.forEach(finalfeature => {
                                    features.forEach(feature => {
                                        if(feature.attributes.OBJECTID == finalfeature.attributes.OBJECTID){
                                            let featureFixed = {...feature, ...finalfeature}
                                            featureFixed.symbol = symbol;
                                            featureFixed._extent = finalfeature.geometry.getExtent()
                                            selectedRegisterFromTable.features.push(featureFixed);
                                            pintarFeaturesConInfoTemplate({features:[finalfeature]});
                                            EsriMap.setExtent(selectedRegisterFromTable.features[0].geometry.getExtent())
                                        } 
                                    })
                                });
                            }))
                            //console.log(selectedRegisterFromTable.features)
                        } else if (tipoResultado === consts.consultas.consultaSimple) {
                            const lastLayerLoad = EsriMap.getLayer(widget.data.objConsulta.nameObjConsulta);
                            //console.log(tipoResultado)
                            //console.log("selectedRowIds => ", myTable.selectedRowIds)
                            //console.log("selectedRows => ", myTable.selectedRows)
                            //console.log("featureCollection => ", widget.data.featureCollection)
                            selectedRegisterFromTable.features = []
                            //console.log(FeatureLayer)
                            widget.data.featuresSelected.forEach(f => {
                                myTable.selectedRowIds.forEach(objectid => {
                                    if(objectid == f.attributes.OBJECTID){
                                        f.symbol = symbol;
                                        selectedRegisterFromTable.features.push(f);
                                    } 
                                })
                            })
                            EsriMap.graphics.clear()
                            pintarFeaturesConInfoTemplate({features:selectedRegisterFromTable.features});
                            const finalFeature = [];
                            //creacion del query y asignacion de los ids seleccionados
                            var query = new Query();
                            query.objectIds = myTable.selectedRowIds;
                            lastLayerLoad.selectFeatures(query, FeatureLayer.SELECTION_NEW, dojo.hitch(this, function(features) {
                                //console.log(features)
                                features.forEach((f, i) => {
                                    finalFeature.push({
                                        // ...features2[i],
                                        ...f,
                                        _extent: EsriMap.graphics.graphics[0].geometry.getExtent(),
                                        _offsets: EsriMap.graphics.graphics[0]._offsets,
                                        _shape: EsriMap.graphics.graphics[0]._shape,
                                        symbol: EsriMap.graphics.graphics[0].symbol,
                                        geometry: EsriMap.graphics.graphics[0].geometry
                                        // _layer: EsriMap.getLayer('test'),
                                        // _graphicsLayer: EsriMap.getLayer('test'),
                                        // _sourceLayer: EsriMap.getLayer('test')
                                    });
                                    // finalFeature[finalFeature.length - 1].geometry._ring = 0;
                                    // finalFeature[finalFeature.length - 1]._layer.fields = widgetResultados.data.response.fields;
                                    // finalFeature[finalFeature.length - 1]._graphicsLayer.fields = widgetResultados.data.response.fields;
                                    // finalFeature[finalFeature.length - 1]._sourceLayer.fields = widgetResultados.data.response.fields;
                                })
                                selectedRegisterFromTable.features = finalFeature;
                                EsriMap.setExtent(finalFeature[0].geometry.getExtent())
                                // var stateExtent = graphicsUtils.graphicsExtent(features);
                                // EsriMap.setExtent(stateExtent.expand(1.5));
                            }));
                        /* 
                            // widget.data.featureCollection.featureSet.features.forEach(f => {
                            widget.data.featuresSelected.forEach(f => {
                                myTable.selectedRowIds.forEach(objectid => {
                                    if(objectid == f.attributes.OBJECTID){
                                        f.symbol = symbol;
                                        selectedRegisterFromTable.features.push(f);
                                    } 
                                })
                            })
                            pintarFeaturesConInfoTemplate({features:selectedRegisterFromTable.features});
                            const features2 = []
                            widget.data.featureCollection.featureSet.features.forEach(f => {
                                myTable.selectedRowIds.forEach(objectid => {
                                    if(objectid == f.attributes.OBJECTID) features2.push(f)
                                })
                            })
                            const finalFeature = [];
                            selectedRegisterFromTable.features.forEach((f, i) => {
                                finalFeature.push({
                                    ...features2[i],
                                    ...f,
                                    _extent: f.geometry.getExtent(),
                                    _offsets: EsriMap.graphics.graphics[0]._offsets,
                                    _shape: EsriMap.graphics.graphics[0]._shape,
                                    // _layer: EsriMap.getLayer('test'),
                                    // _graphicsLayer: EsriMap.getLayer('test'),
                                    // _sourceLayer: EsriMap.getLayer('test')
                                });
                                finalFeature[finalFeature.length - 1]._layer.fields = widgetResultados.data.response.fields;
                                finalFeature[finalFeature.length - 1]._graphicsLayer.fields = widgetResultados.data.response.fields;
                                finalFeature[finalFeature.length - 1]._sourceLayer.fields = widgetResultados.data.response.fields;
                            })
                            selectedRegisterFromTable.features = finalFeature;
                            if(features.features.length > 0) EsriMap.setExtent(objConsultaSimple.featuresSelected.filter(e => e.attributes.OBJECTID == features.features[0].attributes.OBJECTID)[0].geometry.getExtent())
                        */
                        } else if(tipoResultado === consts.consulNotariadoRegistro || tipoResultado === consts.consulSAE || tipoResultado === consts.consulAvaluoUnica
                            || tipoResultado === consts.consulAvaluoMasivo){

                            // const rs = widget.data.responseQueryGeografica.features[0].geometry.spatialReference;
                            const f = widget.data.responseQueryGeografica.features;
                            let response = {}
                            /* let myPolygon = {
                                "geometry":{
                                    "rings":widget.data.responseQueryGeografica.features[0].geometry.rings,
                                    "spatialReference":rs,
                                    "attributes":widget.data.responseQueryGeografica.features[0].attributes
                                },
                                "symbol":{
                                    "color":[0,0,0,64],
                                    "outline":{
                                        "color":[0,0,0,255],
                                        "width":1,
                                        "type":"esriSLS",
                                        "style":"esriSLSSolid"
                                    },
                                    "type":"esriSFS",
                                    "style":"esriSFSSolid"
                                }
                            }; */
                            // const it = buildInfoTemplate("Información Punto", f[0].attributes)
                            // pintarGeometry(EsriMap, myPolygon, symbol, f[0].attributes, it)
                            if (tipoResultado === consts.consulAvaluoMasivo) {
                                response = {
                                    geometryType: "esriGeometryPolygon",
                                    features: f.filter(e => e.attributes.FMI ===  features.features[0].attributes.FMI)
                                }
                                
                            } else {
                                response = widget.data.responseQueryGeografica;
                            }
                            pintarPolygons(EsriMap, response);
                            // let graphic = new Graphic(myPolygon, symbol);
                            // objetoMapa.graphics.add(graphic);

                            // EsriMap.setExtent(f[0].geometry.getExtent())
                            
                            /* if (features.geometryType == "esriGeometryPoint") {
                                tipoGeometria = "Punto";
                            } else {
                                tipoGeometria = "Poligono";
                            }
                            let extentT = esri.graphicsExtent(f);
                            let sistemaRefSalida = new SpatialReference({ wkid: 4326 });		              
        
                            sg ? '' : sg = new GeometryService("https://utility.arcgisonline.com/arcgis/rest/services/Geometry/GeometryServer");
                            let extentConver = new Extent(extentT.xmin, extentT.ymin, extentT.xmax, extentT.ymax, sistemaRefSalida);		                
        
                            sg.project([extentConver], sistemaRefSalida, function (resultados) {
                                realizarExtent(resultados, tipoGeometria, features);
                            }, function (error) {
                                //console.log("FALLO....");
                            }); */
                        }else {
                            objetoMapa.graphics.clear() 
                            const rfeatures = features.features;
                            selectedRegisterFromTable.features = rfeatures;
                            selectedRegisterFromTable.rows = myTable.selectedRows;
                            rfeatures.forEach(feature => {
                                let myPolygon = {
                                    "geometry":{
                                        "rings":feature.geometry.rings,
                                        "spatialReference":{"wkid":4326},
                                        "attributes":feature.attributes
                                    },
                                    "symbol":{
                                        "color":[0,0,0,64],
                                        "outline":{
                                            "color":[0,0,0,255],
                                            "width":1,
                                            "type":"esriSLS",
                                            "style":"esriSLSSolid"
                                        },
                                        "type":"esriSFS",
                                        "style":"esriSFSSolid"
                                    }
                                };
                                let graphic = new Graphic(myPolygon, symbol);
                                objetoMapa.graphics.add(graphic);
                                
                            });
                            if (features.geometryType == "esriGeometryPoint") {
                                tipoGeometria = "Punto";
                            } else {
                                tipoGeometria = "Poligono";
                            }
        
                            let extentT = esri.graphicsExtent(features.features);
                            // let sistemaRefSalida = new SpatialReference({ wkid: 3115 });		              
                            // let sistemaRefSalida = new SpatialReference({ wkid: 102100 });		              
                            let sistemaRefSalida = new SpatialReference({ wkid: 4326 });		              
        
                            sg ? '' : sg = new GeometryService("https://utility.arcgisonline.com/arcgis/rest/services/Geometry/GeometryServer");
                            let extentConver = new Extent(extentT.xmin, extentT.ymin, extentT.xmax, extentT.ymax, sistemaRefSalida);		                
        
                            sg.project([extentConver], sistemaRefSalida, function (resultados) {
                                realizarExtent(resultados, tipoGeometria, features);
                            }, function (error) {
                                //console.log("FALLO....");
                            });
                        }

                        if (myTable.selectedRowIds.length > 0) {
                            document.querySelector("#btnExportar").style.display = "block"
                        }
                        

                        const divMap = document.getElementById("map");
                        divMap.style.position = divMap.style.position === 'absolute' ? 'initial': 'absolute'; // ayuda a redimensionar todo el mapa
                        divMap.style.position === 'initial';
                        setTimeout(() => {
                            divMap.style.position === 'absolute';
                        }, 1000);
                            
                    });
                });
    
                myTable.on("row-deselect", function (evt) {
                    myTable.getFeatureDataById(myTable.selectedRowIds).then(function (featureDeselect) {
                        //console.log(featureDeselect);
    
                        let graphicsOn = objetoMapa.graphics.graphics;

                        if(widget.data.tipoResultado === consts.consultas.consultaSimple 
                            || widget.data.tipoResultado === consts.consultas.consultaAvanzada || widget.data.tipoResultado === consts.consulAvaluoMasivo){

                        }else{
                            if (graphicsOn.length === 1) {
                                objetoMapa.graphics.remove(graphicsOn[0])
                            }else{
                                let deselecGraphics = featureDeselect.features
                                let graphicToRemove = [];
                                graphicsOn.forEach(go => {
                                    let find = false;
                                    deselecGraphics.forEach(dg => {
                                        if(go.geometry.attributes.COD_DEPART === dg.attributes.COD_DEPART){
                                            find = true;
                                        }
                                    });
                                    if (!find) {
                                        graphicToRemove.push(go);
                                    }
                                });
                                graphicToRemove.forEach(gtr => {
                                    objetoMapa.graphics.remove(gtr)
                                });
                            }
                        }

                        if (myTable.selectedRowIds.length === 0) {
                            document.querySelector("#btnExportar").style.display = "none"
                        }


                    });
                });

		});
}

function setearMapa(mapa) {
    objetoMapa = mapa.map;
}
function Exportar() {
    //console.log(object);
    //ResultadosJson
    
    //exportar a CSV
    var ReportTitle = "Resultados";
    var ShowLabel = true;    
    if (ResultadosJson != undefined) {
        //JSONData = "["+ JSONData +"]";
        var arrData = typeof ResultadosJson != 'object' ? JSON.parse(ResultadosJson) : ResultadosJson;   
        if (arrData[0] == undefined) {
            ResultadosJson = "[" + ResultadosJson + "]";
            arrData = typeof ResultadosJson != 'object' ? JSON.parse(ResultadosJson) : ResultadosJson;
        }
        var CSV = '';

        CSV += ReportTitle + '\r\n\n';

        if (ShowLabel) {
            var row = "";
            for (var index in arrData[0]) {

                row += index + ',';

            }

            row = row.slice(0, -1);            
            CSV += row + '\r\n';
        }

        for (var i = 0; i < arrData.length; i++) {
            var row = "";
            for (var index in arrData[i]) {

                row += '"' + arrData[i][index] + '",';
               
            }

            row.slice(0, row.length - 1);

            CSV += row + '\r\n';
        }

      
        if (CSV == '') {
            alert("Invalid data");
            return;
        }
        var fileName = "Reporte_";
        fileName += ReportTitle.replace(/ /g, "_");
        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
        var link = document.createElement("a");
        link.href = uri;
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } else {

        alert("No  hay elementos")
    }

}
function realizarExtent(resultado, tGeometria, geometria) {
    var nivelZoom;

    if (tGeometria == "Punto") {
        nivelZoom = objetoMapa.getMaxZoom();
      
        objetoMapa.centerAndZoom(geometria.features[0].geometry, nivelZoom - 1);
    } else {
        objetoMapa.setExtent(resultado[0]);
    }
}
