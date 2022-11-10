var map;
var widgetEdit = {};
define(['dojo/_base/declare', 'jimu/BaseWidget', "esri/config",
    "esri/map",
    "esri/SnappingManager",
    "esri/dijit/editing/Editor",
    "esri/layers/FeatureLayer",
    "esri/tasks/GeometryService",
    "esri/toolbars/draw",
    "dojo/keys",
    "dojo/parser",
    "dojo/_base/array",
    "dojo/i18n!esri/nls/jsapi",
    "esri/toolbars/edit",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleMarkerSymbol",

    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",    
    "dojo/domReady!"],
    function (declare, BaseWidget, esriConfig, Map, SnappingManager, Editor, FeatureLayer, GeometryService,
        Draw, keys, parser, arrayUtils, i18n, Edit, SimpleLineSymbol, SimpleMarkerSymbol
    ) {

        //parser.parse();

        
        return declare([BaseWidget], {

            // Custom   widget code goes here

            //    baseClass: 'jimu-widget-ubicarPorCoordenas'

            //this property is set by the framework when widget is loaded.
            name: 'EditarNodos',


            //methods to communication with app container:

            postCreate: function () {
                this.inherited(arguments);              

                map = this.map;
            },

            startup: function () {

                $('#widgets_EditarNodos_Widget_panel').find(".title").find(".close-icon").after('<div class = "help-icon jimu-float-trailing" title = "Funcionalidad para crear, eliminar y editar zonas de riesgos"></div>');

                this.inherited(arguments);
                //this.mapIdNode.innerHTML = 'map id:' + this.map.id;                
                ///////////////////////////////////
                //snapping is enabled for this sample - change the tooltip to reflect this
                //i18n.toolbars.draw.start += "<br/>Press <b>CTRL</b> to enable snapping";
                //i18n.toolbars.draw.addPoint += "<br/>Press <b>CTRL</b> to enable snapping";

                //This sample requires a proxy page to handle communications with the ArcGIS Server services. You will need to
                //replace the url below with the location of a proxy on your machine. See the 'Using the proxy page' help topic
                //for details on setting up a proxy page.
                esriConfig.defaults.io.proxyUrl = "/proxy/";

                //This service is for development and testing purposes only. We recommend that you create your own geometry service for use within your applications
                esriConfig.defaults.geometryService = new GeometryService("https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");


                ////// tree cod
                dojo.require("dijit.layout.BorderContainer");
                dojo.require("dijit.layout.TabContainer");
                dojo.require("dijit.layout.ContentPane");

                dojo.require("dojo.data.ItemFileWriteStore");
                dojo.require("dijit.Tree");
                document.getElementById('templatePickerPane').style.display = "block";
                dojo.ready(function () {
                    var appLayout = new dijit.layout.BorderContainer({
                        design: "headline"
                    }, dojo.byId("appLayout"));


                    var store = new dojo.data.ItemFileWriteStore({
                        data: widgetEdit.riesgosData
                    });

                    var treeModel = new dijit.tree.ForestStoreModel({
                        store: store,
                        query: {
                            "type": "continent"
                        },
                        rootId: "root",
                        rootLabel: "Continents",
                        childrenAttrs: ["children"]
                    });

                    var contentTree = new dijit.Tree({
                        model: treeModel,
                        persist: false,
                        showRoot: false,
                        getIconClass: function (item, opened) {

                        }
                    });


                    dojo.connect(contentTree, "onClick", function (item, node, evt) {
                        //console.log('content tree clicked', item, node, evt);                        
                        if (widgetEdit.editorWidget != undefined) {
                            widgetEdit.editorWidget.destroy();
                            document.getElementById('templatePickerPane').appendChild(widgetEdit.iDiv);
                        }
                        if (widgetEdit.layerCargado != undefined) {
                            map.removeLayer(widgetEdit.layerCargado);
                        }
                        widgetEdit.riesgo = item.id[0];

                        switch (widgetEdit.riesgo){
                            case "Emergencias":   
                                widgetEdit.layerCargado = widgetEdit.layers[0];
                                map.addLayers([widgetEdit.layerCargado]);
                                widgetEdit.ejecutaEdit();                                
                                break;
                            case "Desastres":
                                widgetEdit.layerCargado = widgetEdit.layers[3];
                                map.addLayers([widgetEdit.layerCargado]);
                                widgetEdit.ejecutaEdit();                                
                                break;
                            case "mapaRiesgos":
                                widgetEdit.layerCargado = widgetEdit.layers[1];
                                map.addLayers([widgetEdit.layerCargado]);
                                widgetEdit.ejecutaEdit();
                                break;
                            case "mapaOperativo":
                                widgetEdit.layerCargado = widgetEdit.layers[2];
                                map.addLayers([widgetEdit.layerCargado]);
                                widgetEdit.ejecutaEdit();                                
                                break;
                        }
                    });


                    var counter = 0;

                    function dynamicallyUpdateStoreAndTree() {
                        counter++;
                        store.newItem({ id: counter, name: ('Fake' + counter), type: 'continent' });
                    }

                    function openLeafInTree() {
                        contentTree.set('paths', [['children', 'AS']]);
                    }


                    appLayout.addChild(contentTree);                    
                    //appLayout.startup();    
                });
                ///////

                

                map.on("layers-add-result", initEditing);

                var emergencias = new FeatureLayer("https://sampleserver6.arcgisonline.com/arcgis/rest/services/Military/FeatureServer/6", {
                    mode: FeatureLayer.MODE_ONDEMAND,
                    outFields: ["*"]
                });                
                var mapaRiesgos = new FeatureLayer("https://sampleserver6.arcgisonline.com/arcgis/rest/services/Military/FeatureServer/8", {
                    mode: FeatureLayer.MODE_ONDEMAND,
                    outFields: ["*"]
                });                
                var mapaOperativo = new FeatureLayer("https://sampleserver6.arcgisonline.com/arcgis/rest/services/Military/FeatureServer/9", {
                    mode: FeatureLayer.MODE_ONDEMAND,
                    outFields: ["*"]
                });
                /* var desastres = new FeatureLayer("http://190.85.164.56:6080/arcgis/rest/services/QUINDIO_III/Riesgo_Edicion/FeatureServer/1", {
                    mode: FeatureLayer.MODE_ONDEMAND,
                    outFields: ["*"]
                }); */

                widgetEdit.layers = [emergencias, mapaRiesgos, mapaOperativo/* , desastres */];

               
                map.infoWindow.resize(1000, 700);

                var ghostLine = new SimpleLineSymbol().setWidth(1);
                var markerSymbol = new SimpleMarkerSymbol();
               
                function initEditing(event) {
                    console.log("initEditing", event);
                    var featureLayerInfos = arrayUtils.map(event.layers, function (layer) {
                        return {
                            "featureLayer": layer.layer
                        };
                    });

                    widgetEdit.featureLayerInfos = featureLayerInfos;
                    widgetEdit.ejecutaEdit = function () {
                                       
                        var settings = {
                            map: map,
                            layerInfos: widgetEdit.featureLayerInfos,
                            createOptions: true,
                            enableUndoRedo: true
                        };

                        var params = {
                            settings: settings
                        };
                        var editorWidget = new Editor(params, 'editorDiv');
                        editorWidget.startup();
                        widgetEdit.editorWidget = editorWidget;
                       
                    };
                    map.enableSnapping();
                   
                    

                    var currentLayer = null;
                    var layers = arrayUtils.map(event.layers, function (result) {
                        return result.layer;
                    });
                    //console.log("layers", layers);

                    var editToolbar = new Edit(map, {
                        ghostLineSymbol: ghostLine,
                        ghostVertexSymbol: markerSymbol
                    });
                    editToolbar.on("deactivate", function (event) {
                        currentLayer.applyEdits(null, [event.graphic], null);
                    });

                    arrayUtils.forEach(layers, function (layer) {
                        var editingEnabled = false;
                        layer.on("dbl-click", function (event) {
                            //event.stop(event);
                            
                            if (editingEnabled === false) {
                                if (event.graphic.geometry.type != "point") {
                                    map.disableDoubleClickZoom(true);
                                    editingEnabled = true;
                                    editToolbar.activate(Edit.EDIT_VERTICES, event.graphic);
                                }                                
                            } else {                                
                                currentLayer = this;
                                editToolbar.deactivate();
                                editingEnabled = false;
                                map.disableDoubleClickZoom(false);
                                map.isShiftDoubleClickZoom = true;
                            }
                        });

                        layer.on("click", function (event) {
                            //event.stop(event);
                            if (event.ctrlKey === true || event.metaKey === true) {  //delete feature if ctrl key is depressed
                                layer.applyEdits(null, null, [event.graphic]);
                                currentLayer = this;
                                editToolbar.deactivate();
                                editingEnabled = false;
                            }
                        });
                    });                    
                }
                
                /////////////////////////////////////
            },

            onOpen: function () {              
                var panel = this.getPanel();
                widgetEdit.panel = panel;
                var width = 262;
                var height = 434;
                widgetEdit.widthInicial = width;
                widgetEdit.heightInicial = height;                
                ajustarTamanioWidget(panel, width, height);
                var continentData = {
                    identifier: 'id',
                    label: 'name',
                    items: [
                        {
                            id: 'editRiesgos', name: 'Riesgos', type: 'continent',
                            children: [
                                { _reference: 'Emergencias' },
                                // { _reference: 'Desastres' },
                                { _reference: 'mapaRiesgos' },
                                { _reference: 'mapaOperativo' }
                            ]
                        },
                        { id: 'Emergencias', name: 'Emergencias' },
                        // { id: 'Desastres', name: 'Desastres' },
                        { id: 'mapaRiesgos', name: 'mapaRiesgos' },
                        { id: 'mapaOperativo', name: 'mapaOperativo' }
                    ]
                };
                widgetEdit.riesgosData = continentData;
                var iDiv = document.createElement('div');
                iDiv.id = 'editorDiv';
                widgetEdit.iDiv = iDiv;
                widgetEdit.contador = 0;
                widgetEdit.contadorGridView = 2;
            },
            onClose: function () {
                map.setExtent(map._initialExtent);
                map.disableDoubleClickZoom(false);
                map.isShiftDoubleClickZoom = true;
                if (widgetEdit.layerCargado != undefined) {
                    map.removeLayer(widgetEdit.layerCargado);
                }
                if (widgetEdit.editorWidget != undefined) {
                    widgetEdit.editorWidget.destroy();
                    document.getElementById('templatePickerPane').appendChild(widgetEdit.iDiv);
                    widgetEdit.editorWidget = undefined;
                }
            },


            // methods to communication between widgets:

           
        });

        

    });

