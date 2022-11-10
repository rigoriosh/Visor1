var map;
var widgetEdit = {};
define(['dojo/_base/declare', 'jimu/BaseWidget', "esri/config",
"esri/map", 
"esri/toolbars/edit",
"esri/graphic",

"esri/geometry/Point",
"esri/geometry/Polyline",
"esri/geometry/Polygon",

"esri/symbols/SimpleLineSymbol",
"esri/symbols/SimpleFillSymbol",
"esri/symbols/TextSymbol",

"dojo/_base/event",
"dojo/parser",
"dojo/dom", 
"dojo/dom-style", 
"dijit/registry", 
"dijit/Menu",

"dijit/form/ToggleButton",
"dijit/form/DropDownButton",
"dijit/CheckedMenuItem",
"dijit/layout/BorderContainer", 
"dijit/layout/ContentPane", 
"dojo/domReady!"
],
    function (declare, BaseWidget, esriConfig, 
        Map, Edit, Graphic,
        Point, Polyline, Polygon,
        SimpleLineSymbol, SimpleFillSymbol, TextSymbol,
        event, parser, dom, domStyle, registry, Menu
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
                widgetEdit = this;
                this.map.on("load", this.createToolbar);
                // domStyle.set(document.getElementById("mainWindow").domNode, "visibility", "visible");
                this.createToolbar();

                
            },
            createToolbar: function() {
                debugger
                this.addGraphics();
                editToolbar = new Edit(map);

                //Activate the toolbar when you click on a graphic
                map.graphics.on("click", function (evt) {
                    event.stop(evt);
                    widgetEdit.activateToolbar(evt.graphic);
                });

                //deactivate the toolbar when you click outside a graphic
                map.on("click", function (evt) {
                    editToolbar.deactivate();
                });
            },
            addGraphics: function() {
                debugger
                //add pre-defined geometries to map
                var polygonSymbol = new SimpleFillSymbol();
                var polylineSymbol = new SimpleLineSymbol();
                var text = new TextSymbol("Editable Text");
                text.font.setSize("20pt");

                var polyline = new Polyline({
                    "paths": [
                        [
                            [-12484306, 7244028],
                            [-7318386, 10061803],
                            [-3013453, 10727111]
                        ]
                    ], "spatialReference": {
                        "wkid": 102100
                    }
                });
                var polygon = new Polygon({
                    "rings": [
                        [
                            [-4226661, 8496372],
                            [-3835304, 8731187],
                            [-2269873, 9005137],
                            [-1213208, 8613780],
                            [-1017529, 8065879],
                            [-1213208, 7478843],
                            [-2230738, 6891806],
                            [-2935181, 6735263],
                            [-3522218, 6891806],
                            [-3952711, 7165757],
                            [-4265797, 7283164],
                            [-4304933, 7635386],
                            [-4304933, 7674521],
                            [-4226661, 8496372]
                        ]
                    ],
                    "spatialReference": {
                        "wkid": 102100
                    }
                });
                var arrow = new Polygon({
                    "rings": [
                        [
                            [9862211, 6617856],
                            [8922952, 5522055],
                            [8922952, 5991684],
                            [6105178, 5991684],
                            [6105178, 7087485],
                            [8922952, 7087485],
                            [8922952, 7557114],
                            [9862211, 6617856]
                        ]
                    ],
                    "spatialReference": {
                        "wkid": 102100
                    }
                });
                var triangle = new Polygon({
                    "rings": [
                        [
                            [2426417, 8535508],
                            [4304933, 12292541],
                            [6183449, 8535508],
                            [2426417, 8535508]
                        ]
                    ],
                    "spatialReference": {
                        "wkid": 102100
                    }
                });
                var point = new Point(-40, 35);

                map.graphics.add(new Graphic(polyline, polylineSymbol));
                map.graphics.add(new Graphic(polygon, polygonSymbol));
                map.graphics.add(new Graphic(arrow, polygonSymbol));
                map.graphics.add(new Graphic(triangle, polygonSymbol));
                map.graphics.add(new Graphic(point, text));
            },
            activateToolbar: function(graphic) {
                debugger
                var tool = 0;

                if (/* registry.byId("tool_move").checked */true) {
                    tool = tool | Edit.MOVE;
                }
                if (/* registry.byId("tool_vertices").checked */true) {
                    tool = tool | Edit.EDIT_VERTICES;
                }
                if (/* registry.byId("tool_scale").checked */true) {
                    tool = tool | Edit.SCALE;
                }
                if (/* registry.byId("tool_rotate").checked */true) {
                    tool = tool | Edit.ROTATE;
                }
                // enable text editing if a graphic uses a text symbol
                if (graphic.symbol.declaredClass === "esri.symbol.TextSymbol") {
                    tool = tool | Edit.EDIT_TEXT;
                }
                //specify toolbar options        
                var options = {
                    allowAddVertices: document.getElementById("vtx_ca").checked,
                    allowDeleteVertices: document.getElementById("vtx_cd").checked,
                    uniformScaling: document.getElementById("uniform_scaling").checked
                };
                editToolbar.activate(tool, graphic, options);
            }


            // methods to communication between widgets:


        });



    });

