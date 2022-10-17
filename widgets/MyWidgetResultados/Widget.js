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
define(['dojo/_base/declare', 'jimu/BaseWidget', /* "dojo/_base/json",
    "dojo/_base/array", "dojo/string", "esri/request", "jimu/PanelManager",  */"dojo/query", "dojo/domReady!"],
    function (declare, BaseWidget, /* PanelManager,  */query) {

        var widgetOpen = false;
        //To create a widget, you need to derive from BaseWidget.
        return declare([BaseWidget], {
            
            startup: function () {
                extentInicial = null;
                extentInicial = this.map.extent;

                setearMapa(this);
                query("#btnExportar").on("click", async function (evt) {
                    console.log("exporto the wollow");
                    console.log(selectedRegisterFromTable.features);
                    console.log(selectedRegisterFromTable.rows);
                    
                });
            },

            onOpen: function () {
                window.widgetOpen = true;
                
                var widgetResultados = this.appConfig.getConfigElementById('widgets_MyWidgetResultados_Widget_41');
                console.log(widgetResultados);
                
                var panel = this.getPanel();
                // panel.position.width = 1000;
                // panel.position.height = 300;
                panel.position.width = widgetResultados.data.data.panel.width;
                panel.position.height = widgetResultados.data.data.panel.height;
                panel._originalBox = {
                    w: panel.position.width,
                    h: panel.position.height,
                    l: panel.position.left || 0,
                    t: panel.position.top || 0
                };
                panel.setPosition(panel.position);
                panel.panelManager.normalizePanel(panel);

                switch (widgetResultados.data.tipoResultado) {
                    case consts.consulAvaluoMasivo:
                        console.log(consts.consulAvaluoMasivo);
                        cargarTablaResultados(widgetResultados);
                        break;
                    case consts.consulAvaluoUnica:
                        console.log(consts.consulAvaluoUnica);
                        break;
                    default:
                        break;
                }

                // var divCarga = document.getElementById("loadingFeatureTable");
                // divCarga.style.visibility = 'visible';
                // divCarga.style.visibility = 'hidden';
                // window.widgetOpen = true;
            },

            onClose: function () {
           

                for (var i = appGlobal.widgetManager.loaded.length; i > 0; i--) {
                    var idWidgets = appGlobal.widgetManager.loaded[i - 1].id;
                
                    if (window.widgetOpen && idWidgets == "widgets_MyWidgetResultados_Widget_41") {
                        window.widgetOpen = false;
                        cerrarWidgetResultados();                                    
                        break;
                    }
                }

            },


        });
    })


function cerrarWidgetResultados() {
    require(["jimu/PanelManager"],
        function (PanelManager) {
            /////codigo q cierra el widgetResultados
            this.widgetResultados.cerradoManual = 0;
            var panelManager = PanelManager.getInstance();
            var widgetCerrar;            
            for (var e in PanelManager.getInstance().panels) {
                if (PanelManager.getInstance().panels[e].id == "widgets_MyWidgetResultados_Widget_41_panel") {
                    widgetCerrar = PanelManager.getInstance().panels[e].id;
                }

            }            
            var ajustar = true;
            if (widgetCerrar != undefined) {
                panelManager.closePanel("widgets_MyWidgetResultados_Widget_41_panel");
                panelManager.destroyPanel("widgets_MyWidgetResultados_Widget_41_panel");             
                ajustar = false;


                /* var currentLayer = appGlobal.map.getLayer("capaResultadoCA");
                if (currentLayer != null) {
                    appGlobal.map.removeLayer(currentLayer);
                } */
            }
            widgetOpen = false;
            objetoMapa.graphics.clear()
            // console.log("cerrarWidgetResultados");
        }
      )
};

var objetoMapa = null;
function cargarTablaResultados(widget) {
    require(["esri/layers/FeatureLayer", "esri/tasks/query", "esri/dijit/FeatureTable", "dojo/dom", "esri/symbols/SimpleLineSymbol",
	"esri/symbols/SimpleFillSymbol", "esri/Color", "esri/symbols/SimpleMarkerSymbol", "dojo/parser", "dojo/ready", "esri/tasks/GeometryService",
	"esri/SpatialReference", "esri/tasks/ProjectParameters", "esri/geometry/Extent", "esri/geometry/Point", "esri/geometry/Polyline",
	"esri/graphicsUtils", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol", "esri/Color", "esri/renderers/UniqueValueRenderer",
	"esri/graphic"],
		function (FeatureLayer, Query, FeatureTable, dom, SimpleLineSymbol, SimpleFillSymbol, Color,
			SimpleMarkerSymbol, parser, ready, GeometryService, SpatialReference, ProjectParameters, Extent, Point,
			Polyline, graphicsUtils, SimpleFillSymbol, SimpleLineSymbol, Color, UniqueValueRenderer, Graphic) {
		    // var urlCapa = widget.urlCapa;
		    var camposCapa = widget.camposMostrar;
		    // var expresion = widget.expresionConsultar;
		    // var tipoGeometria;
		    // var operacionRealizar = widget.operacionRealizar;
		    // operacionRealizarGlobal = operacionRealizar;
		    // var resultados = widget.data;
		    // ResultadosJson = widget.resultadosJson;
           
                var myFeatureLayer = new FeatureLayer(widget.data.data.urlDparts, {
                    // mode: FeatureLayer.MODE_ONDEMAND,
                    // outFields: "*",
                    outFields: ["DEPARTAMEN","COD_DEPART","REGION","Poblado"],
                    definitionExpression: "1=1",
                    visible: true,
                    id: "capaResultadoCA",
                    showLabels:true
                });
                // map.add(featureLayer);
    
                myTable = new FeatureTable({
                    featureLayer: myFeatureLayer,
                    showGridMenu: true,
                    syncSelection: true,
                    zoomToSelection: false,
                    gridOptions: {
                        noDataMessage: "No Data",
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
                    fieldInfos: [
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
                        }
                        ]
                },
                    "myTableNode"
                );
    
                
                myTable.startup();
                // myTable.selectRows([1, 2, 3], false);
    
                myTable.on("row-select", function (evt) {
                    myTable.getFeatureDataById(myTable.selectedRowIds).then(function (features) {
                        var symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 0, 0, 2]), 3), new Color([0, 0, 0, 1]));
                        // var geometria = features.features[0].geometry;
                        // var graphic = new Graphic(geometria, symbol);
                        /* var myPolygon = { // poligono de prueba
                            "geometry":{
                                "rings":[[[-115.3125,37.96875],[-111.4453125,37.96875],
                                [-99.84375,36.2109375],[-99.84375,23.90625],[-116.015625,24.609375],
                                [-115.3125,37.96875]]],
                                "spatialReference":{"wkid":4326}},
                                "symbol":{
                                    "color":[0,0,0,64],
                                    "outline":{
                                        "color":[0,0,0,255],
                                        "width":1,"type":"esriSLS","style":"esriSLSSolid"
                                    },
                                "type":"esriSFS",
                                "style":"esriSFSSolid"
                            }
                        }; */
                        objetoMapa.graphics.clear() 
                        const rfeatures = features.features;
                        selectedRegisterFromTable.features = rfeatures;
                        selectedRegisterFromTable.rows = myTable.selectedRows;
                        rfeatures.forEach(feature => {
                            var myPolygon = {
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
                            var graphic = new Graphic(myPolygon, symbol);
                            objetoMapa.graphics.add(graphic);
                            
                        });
                        // let feature = features.features[0];
                        
                        // if (myTable.selectedRows.length === 1) {
                        //     objetoMapa.graphics.clear() 
                        // }
    
                        console.log(myTable.selectedRows);
    
                        // objetoMapa.graphics.add(graphic);
    
    
                        if (features.geometryType == "esriGeometryPoint") {
                            tipoGeometria = "Punto";
                        } else {
                            tipoGeometria = "Poligono";
                        }
    
                        var extentT = esri.graphicsExtent(features.features);
                        // var sistemaRefSalida = new SpatialReference({ wkid: 3115 });		              
                        // var sistemaRefSalida = new SpatialReference({ wkid: 102100 });		              
                        var sistemaRefSalida = new SpatialReference({ wkid: 4326 });		              
    
    
                        sg ? '' : sg = new GeometryService("https://utility.arcgisonline.com/arcgis/rest/services/Geometry/GeometryServer");
                        var extentConver = new Extent(extentT.xmin, extentT.ymin, extentT.xmax, extentT.ymax, sistemaRefSalida);		                
    
                        sg.project([extentConver], sistemaRefSalida, function (resultados) {
                            realizarExtent(resultados, tipoGeometria, features);
                        }, function (error) {
                            console.log("FALLO....");
                        });
                        document.querySelector("#btnExportar").style.display = "block"
                    });
                });
    
                myTable.on("row-deselect", function (evt) {
                    myTable.getFeatureDataById(myTable.selectedRowIds).then(function (featureDeselect) {
                        console.log(featureDeselect);
    
                        let graphicsOn = objetoMapa.graphics.graphics;
                        if (graphicsOn.length === 1) {
                            objetoMapa.graphics.remove(graphicsOn[0])
                            document.querySelector("#btnExportar").style.display = "none"
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
                    });
                });

		});
}

function setearMapa(mapa) {
    objetoMapa = mapa.map;
}
function Exportar() {
    console.log(object);
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
