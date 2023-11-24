var myFeatureTable = "null";
var extentInicial, panelManager, widgetCerrar;
var operacionRealizarGlobal;
var ResultadosJson;
var resultados;
var widgetResultados = {};
var sg;
var selectedRegisterFromTable = {
    rows: [],
    features: []
}

define(['dojo/_base/declare', 'jimu/BaseWidget'],
    function (declare, BaseWidget, on) {

        var widgetOpen = false;

        return declare([BaseWidget], {

            startup: function () {
                extentInicial = this.map.extent;
            },

            onOpen: function () {
                window.widgetOpen = true;

                wgtResultados = this.appConfig.getConfigElementById("widgets_TablaResultadoSae_Widget_63");
                console.log(">>> widgetResultados >> data:" + wgtResultados.data);
                var panel = this.getPanel();

                panel.position.width = 800;
                panel.position.height = 300;

                panel.setPosition(panel.position);
                panel.panelManager.normalizePanel(panel);
                var fuente = wgtResultados.data.prmts.fuente;
                if (fuente === "ConsultaCatastro" || fuente === "IndicadoresSae") {

                    let divTablaResultadoSae = document.getElementById("divTablaResultadoSae");
                    //divTablaResultadoSae.style.display = "none";
                    divTablaResultadoSae.style.display = "block";

                    let divResultadoSaeJson = document.getElementById("divResultadoSaeJson");
                    //divResultadoSaeJson.style.display = "block";
                    divResultadoSaeJson.style.display = "none";

                    //cargarResultadosJson(wgtResultados.data.prmts);
                    createTableLayer(wgtResultados.data.prmts.json);
                    //testFeatureColletion();

                } else {
                    let divTablaResultadoSae = document.getElementById("divTablaResultadoSae");
                    divTablaResultadoSae.style.display = "block";

                    let divResultadoSaeJson = document.getElementById("divResultadoSaeJson");
                    divResultadoSaeJson.style.display = "none";

                    cargarTablaResultados(wgtResultados.data.prmts);
                }
            },

            onClose: function () {

                if (typeof (appGlobal) !== 'undefined') {
                    for (var i = appGlobal.widgetManager.loaded.length; i > 0; i--) {
                        var idWidgets = appGlobal.widgetManager.loaded[i - 1].id;

                        if (window.widgetOpen && idWidgets == "widgets_TablaResultadoSae_Widget_63") {
                            window.widgetOpen = false;
                            //cerrarTablaDeResultadoSae("widgets_TablaResultadoSae_Widget_63");
                            cerrarWidgetResultados("widgets_TablaResultadoSae_Widget_63"); //utilSae
                            break;
                        }
                    }
                } else {
                    //cerrarTablaDeResultadoSae("widgets_TablaResultadoSae_Widget_63");
                    cerrarWidgetResultados("widgets_TablaResultadoSae_Widget_63"); // utilSae
                }
            },
        });
    })

function cargarTablaResultados(prmts) {

    console.log(">>> cargarTablaResultados.." + prmts);

    require(["esri/layers/FeatureLayer", "esri/dijit/FeatureTable", "esri/tasks/GeometryService", "esri/SpatialReference",
        "esri/geometry/Extent", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol", "esri/Color", "esri/graphic",
        "esri/graphicsUtils", "esri/tasks/query", "dojo/dom"],

        function (FeatureLayer, FeatureTable, GeometryService, SpatialReference,
            Extent, SimpleFillSymbol, SimpleLineSymbol, Color, Graphic, graphicsUtils, Query, dom) {

            var urlCapa = prmts.url;
            var myFeatureLayerSae = new FeatureLayer(urlCapa, {
                mode: FeatureLayer.MODE_ONDEMAND,
                outFields: ["*"],
                //where: prmts.where,
                visible: true,
                id: "fLayerSae"
            });
            myFeatureLayerSae.setDefinitionExpression(prmts.where);

            myTableSae = new FeatureTable({
                featureLayer: myFeatureLayerSae,
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
                    pagingDelay: 300
                    //sort: {
                    //    field: "StateName", descending: true}
                },
                editable: true,
                showColumnHeaderTooltips: true,
                //fieldInfos
            }, "myTableNodeSae");

            myTableSae.startup();

        });
}

function cargarResultadosJson(prmts) {

    //console.log(">>> cargarResultadosJson.." + prmts);

    require(["esri/layers/FeatureLayer", "esri/dijit/FeatureTable", "esri/tasks/GeometryService", "esri/SpatialReference",
        "esri/geometry/Extent", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol", "esri/Color", "esri/graphic",
        "esri/graphicsUtils", "esri/tasks/query", "dojo/dom"],

        function (FeatureLayer, FeatureTable, GeometryService, SpatialReference,
            Extent, SimpleFillSymbol, SimpleLineSymbol, Color, Graphic, graphicsUtils, Query, dom) {

            var jsonData = JSON.parse(prmts.json);
            //createTableFromJson(jsonData) // tabla de una sola fila(para ConsultaCatastro)
            if (wgtResultados.data.prmts.fuente === "ConsultaCatastro") {
                jsonData = Object.entries(jsonData); // para hacer pivot.
            }
            createGridFromJson(jsonData);

        });
}

function createTableLayer(result) {
    require(["dojo/dom", "esri/tasks/FeatureSet", "esri/layers/FeatureLayer", "esri/dijit/FeatureTable", "esri/tasks/GeometryService", "esri/SpatialReference",
        "esri/geometry/Extent", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol", "esri/Color", "esri/graphic",
        "esri/graphicsUtils", "esri/tasks/query"],
        function (dom,FeatureSet, FeatureLayer, FeatureTable, GeometryService, SpatialReference,
            Extent, SimpleFillSymbol, SimpleLineSymbol, Color, Graphic, graphicsUtils, Query) {

            let fields = [/* {name: 'OBJECTID', type: 'esriFieldTypeOID', alias: 'OBJECTID'} */];

            var resp = JSON.parse(result);

            var keys = Object.keys(resp[0]); // para Indicadores OK

            keys.forEach(e => fields.push(
                { name: e, type: 'esriFieldTypeString', alias: e, length: 250 })
            );
            //resp.features[0].attributes = thisSAE.storeConsultaSAE.dataAlfanumerica;

            var features = ['attributes'];
            features.attributes = resp;

            //var featureSet = new FeatureSet(features.attributes); //(*)

            //featureSet.features = features // error at Object._addFeatures
            //featureSet.features = resp; // error at Object._addFeatures

            var featureCollection = {
                //featureSet: crearfeatureSet(features), // ??? Rigo
                featureSet: createfeatureSet(features), // retorna featureSet +-
                //featureSet: features.attributes, // da null
                //featureSet: features, // los tiene, no pasa a la tabla
                //featureSet: featureSet, // sin resultados para consulta (*)
                layerDefinition: {
                    geometryType: "esriGeometryPolygon",
                    objectIdField: "IdActivo",
                    //geometryType: "esriGeometryPolyline",
                    fields
                },
            };

            var myFeatureLayer = new FeatureLayer(featureCollection, {
                showLabels: true
            });

            console.log(featureCollection.featureSet);

            var fieldInfos = featureCollection.layerDefinition.fields;

            var myTable = new FeatureTable({
                featureLayer: myFeatureLayer,
                //outFields: ["Fmi", "NoMatrix", "Dpto","Mpio"],
                showGridMenu: true,
                syncSelection: true,
                zoomToSelection: false,
                gridOptions: {
                    noDataMessage: "Sin resultados para esta consulta",
                    //allowSelectAll: true,
                    allowSelectAll: false, 
                    cellNavigation: false,
                    selectionMode: "extended",
                    pagination: false,
                    allowTextSelection: true,
                    pageSizeOptions: [10, 25, 50],
                    columnHider: false,
                    columnResizer: true,
                    pagingDelay: 300,
                    sort: {
                        field: "Fmi", descending: true
                    }
                },
                editable: true,
                showColumnHeaderTooltips: true,
                fieldInfos
            },
                "myTableNodeSae"
            );
            myTable.startup();

            if (loading) loader2(false, loading)

            myTable.on("row-select", function (evt) {
                console.log("selectedRows => ", myTable.selectedRows[0].Fmi); // OK

                var prop = "FMI";
                var valor = myTable.selectedRows[0].Fmi;
                var mcpio = myTable.selectedRows[0].Mpio;

                //myTable.selectRows([0], true);  // probar cuando hay datos tanto en argis como en sae
                //myTable.centerOnSelection();    //  probar cuando hay datos tanto en argis como en sae

                //continuarPintarPredio(prop,valor,mcpio); // propedad, vlr, mcpi
                continuarPintarPredioSae(prop,valor,mcpio); // propedad, vlr, mcpi
                //myTable.getFeatureDataById(myTable.selectedRowIds).then(function (features) {
                //    console.log(features);
                //    console.log("selectedRowIds => ", myTable.selectedRowIds);
                //    console.log("selectedRows => ", myTable.selectedRows[0].Fmi); // OK
                //});

            });

            //myTable.on("row-deselect", function (evt) {
            //    myTable.getFeatureDataById(myTable.selectedRowIds).then(function (features) {
            //        console.log(features);
            //    });
            //});


        }
    )
}

function testFeatureColletion() {
    require(["esri/map", "esri/symbols/SimpleMarkerSymbol", "esri/Color", "esri/renderers/SimpleRenderer",
        "esri/tasks/FeatureSet", "esri/layers/FeatureLayer", "esri/dijit/FeatureTable",
        "dojo/domReady!"],
        function (Map, SimpleMarkerSymbol, Color, SimpleRenderer,
            FeatureSet, FeatureLayer, FeatureTable) {

            console.log(">>> testFeatureColletion");

        var jsonFS = {
            "displayFieldName": "Name",
            "fieldAliases": {
                "Name": "Name"
            },
            "geometryType": "esriGeometryPoint",
            "spatialReference": {
                "wkid": 102100
            },
            "fields": [{
                "name": "Name",
                "type": "esriFieldTypeOID",
                "alias": "Name"
            }],
            "features": [{
                "attributes": {
                    "Name": "1"
                },
                "geometry": {
                    "x": -8919439.31450887,
                    "y": 4928270.761925456
                }
            }, {
                "attributes": {
                    "Name": "2"
                },
                "geometry": {
                    "x": -8155495.379532158,
                    "y": 5075380.311392084
                }
            }]
        };

        var fs = new FeatureSet(jsonFS);


        var layerDefinition = {
            "geometryType": "esriGeometryPoint",
            "drawingInfo": {
                "renderer": {
                    "type": "simple",
                    "symbol": {
                        "type": "esriPMS",
                        "style": "esriSMSSquare",
                        "color": [76, 115, 0, 255],
                        "width": 50,
                        "height": 50
                    }
                }
            },
            "fields": [{
                "name": "Name",
                "type": "esriFieldTypeOID",
                "alias": "Name"
            }]
        };

        var featureCollection = {
            layerDefinition: layerDefinition,
            featureSet: fs
        };

            myFeatureLayer = new FeatureLayer(featureCollection);

            console.log(myFeatureLayer); // >>>>>>

            fieldInfos = featureCollection.layerDefinition.fields

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
                        field: "Name", descending: true
                    }
                },
                editable: true,
                showColumnHeaderTooltips: true,
                fieldInfos
            },
                "myTableNodeSae"
            );
            console.log(myTable); // >>>>>>

            myTable.startup();

            if (loading) loader2(false, loading)

        }
    )
}

function createGridFromJson(json) {
    var jsonData = json;
    var totRegistrosLable = "Total registros: " + Object.keys(jsonData).length; // ok

    var keys = Object.keys(jsonData[0]);
    var values = Object.values(jsonData);

    //   columnas
    var tableHTML = "<tr>";
    for (i = 0; i < keys.length; i++) {
        tableHTML += "<th>" + keys[i] + "</th>";
    }
    tableHTML += "</tr>";

    // filas
    tableHTML += "<tr >";
    for (i = 0; i < values.length; i++) {
        //tableHTML += "<tr>";
        tableHTML += "<tr  class='clickableRow'>";
        for (j = 0; j < keys.length; j++) {
            var dataObj = values[i][keys[j]];
            tableHTML += "<td>" + dataObj + "</td>";
        }
        tableHTML += "</tr>";
    }
    tableHTML += "</tr>";

    document.getElementById("idTableJson").innerHTML = tableHTML;

    $('#idTableJson').on('click', 'tbody tr', function (event) {
        $(this).addClass('highlight').siblings().removeClass('highlight');
    });

    $('td').click(function () {
        let $cell = $(this);
        let value = $cell.text();
        let column = $cell.closest('table').find('th').eq($cell.index()).text();

        var currentRow = $(this).closest("tr");
        var mncpio = currentRow.find("td:eq(4)").html(); // 4=idxColumna:Mncpio

        console.log(column + ':' + value);
        //alert("pintar predio: " + column + " = " + value);
        continuarPintarPredio(column, value, mncpio);
    });

}

function createTableFromJson(json) {
    jsonData = json;

    var tableHTML = "<tr>";
    for (var headers in jsonData) {
        tableHTML += "<th>" + headers + "</th>";
    }
    tableHTML += "</tr>";

    tableHTML += "<tr>";
    for (var eachItem in jsonData) {
        var dataObj = jsonData[eachItem];
        tableHTML += "<td>" + dataObj + "</td>";
    }
    tableHTML += "</tr>";

    document.getElementById("idTableJson").innerHTML = tableHTML;
}
function cerrarTablaDeResultadoSae(idWidget) {
    require(["jimu/PanelManager"],
        function (PanelManager) {
            console.log(">>> cerrarTablaDeResultadoSae.. ");
            panelManager = PanelManager.getInstance();
            widgetCerrar = PanelManager.getInstance().getPanelById(idWidget);
            for (var e in PanelManager.getInstance().panels) {
                if (PanelManager.getInstance().panels[e].id == idWidget) {
                    widgetCerrar = PanelManager.getInstance().panels[e].id;
                }
            }
            if (widgetCerrar != undefined) {
                idWidget += "_panel"
                //panelManager.closePanel("widgets_TablaResultadoSae_Widget_63_panel");
                //panelManager.destroyPanel("widgets_TablaResultadoSae_Widget_63_panel");
                panelManager.closePanel(idWidget);
                panelManager.destroyPanel(idWidget);
            }
        }
    )
}

