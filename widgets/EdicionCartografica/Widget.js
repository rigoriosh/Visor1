// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

//>>built
/* var dojoConfig = {
  packages: [{
    "name": "myModules",
    "location": location.pathname.replace(/\/[^/]+$/, "") + "myModules"
  }]
}; */
var dibujo, editToolbar, EsriMap, ctxMenuForGraphics, selected, textInfo, myThis;
var graphicRemoved = [];
var objEdicionCartografica = {}, appGlobal;

define([
  "dojo/_base/declare", "jimu/BaseWidget", "dojo/query",
  
  "esri/toolbars/draw", "esri/toolbars/edit",
  "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol",
  "esri/symbols/SimpleFillSymbol", "esri/graphic", "dijit/Menu", "dijit/MenuSeparator",

  "dojo/_base/connect", "esri/Color", "dojo/parser", "dijit/registry", "dijit/MenuItem",
  "esri/InfoTemplate",
  "dojo/domReady!"
],
  function (declare, BaseWidget, query,
    Draw, Edit,
    SimpleMarkerSymbol, SimpleLineSymbol,
    SimpleFillSymbol, Graphic, Menu, MenuSeparator,
    
    connect, Color, parser, registry, MenuItem, InfoTemplate) {

    return declare([BaseWidget], {
      baseClass: "jimu-widget-EdicionCartografica",

      startup: function () {
        //console.log("CrearGeometrias");
        this.inherited(arguments);
        appGlobal = this;
        // this.mapIdNoderrh.innerHTML = 'map id is:' + this.map.id;

        // undoManager = new UndoManager();
        // hook up undo/redo buttons
        EsriMap = this.map;
        myThis = this;

        $(function () { //despliega los tooltip
          $('[data-toggle="tooltip"]').tooltip()
        })

        query("#undo").on("click", async function (evt) {
          // undoManager.undo();
          if (EsriMap.graphics.graphics.length > 1) {
            graphicRemoved.push(EsriMap.graphics.graphics[EsriMap.graphics.graphics.length - 1])
            EsriMap.graphics.remove(EsriMap.graphics.graphics[EsriMap.graphics.graphics.length - 1]);
            //console.log(EsriMap.graphics.graphics)
          }
          if (EsriMap.graphics.graphics.length == 1) {
            textInfo.style.display = 'none';
          }
        });
        query("#redo").on("click", async function (evt) {
          if (graphicRemoved.length > 0) {
            let graphicToWork = graphicRemoved.length - 1;
            EsriMap.graphics.add(graphicRemoved[graphicToWork]);
            graphicRemoved.length = graphicToWork;
            //console.log(EsriMap.graphics.graphics)
            textInfo.style.display = 'block'
          }
        });
        /* query("#btnAceptar").on("click", async function (evt) {
        }) */
        query("#btnAceptar").on("click", async function (evt) {
          
          myThis.renderDivs({idHerramientas:'flex'});

        })
        query("#iconoEditarNodos").on("click", async function (evt) {
          myThis.renderDivs({editar:'flex',regresar:'flex'});

        });
        query("#iconoGuardarGeometrias").on("click", async function (evt) {
          
          myThis.renderDivs({guardar:'flex', regresar:'flex'});

        });
        query("#iconoUnirGeometrias").on("click", async function (evt) {
          
          myThis.renderDivs({unir:'flex', regresar:'flex'});

        });
        query("#iconoExportarGeometrias").on("click", async function (evt) {
         
          
          myThis.renderDivs({exportar:'flex', regresar:'flex'});

        });
        query("#iconoCrearGeometrias").on("click", async function (evt) {
          

          myThis.renderDivs({crear:'flex', regresar:'flex'});

        });
        query("#regresar").on("click", async function (evt) {
          
          myThis.renderDivs({idHerramientas: 'flex'});
        });
        /* registry.byId("undo").on("click", function() {
          undoManager.undo();
        });
        registry.byId("redo").on("click", function() {
          undoManager.redo();
        }); */

        /* connect.connect(undoManager,"onChange",function(){
          //enable or disable buttons depending on current state of application
          if (undoManager.canUndo) {
            registry.byId("undo").set("disabled", false);
            registry.byId("undo").set("iconClass","undoIcon");
          } else {
            registry.byId("undo").set("disabled", true);
            registry.byId("undo").set("iconClass","undoGrayIcon");
          }
 
          if (undoManager.canRedo) {
            registry.byId("redo").set("disabled", false);
            registry.byId("redo").set("iconClass","redoIcon");
          } else {
            registry.byId("redo").set("disabled", true);
            registry.byId("redo").set("iconClass","redoGrayIcon");
          }
        }); */

        this.initToolbar();

      },

      renderDivs: function ({idHerramientas="none",unir="none",crear="none",guardar="none",
        exportar="none"/* ,btnAceptar="none" */,editar="none",regresar="none"}){
          document.getElementById("idHerramientas").style.display = idHerramientas;
          document.getElementById("unir").style.display = unir;
          document.getElementById("crear").style.display = crear;
          document.getElementById("guardar").style.display = guardar;
          document.getElementById("exportar").style.display = exportar;
          // document.getElementById("btnAceptar").style.display = btnAceptar;
          document.getElementById("editar").style.display = editar;
          document.getElementById("regresar").style.display = regresar;
      },

      initToolbar: function () {
        //console.log("initToolbar")
        dibujo = new Draw(this.map);
        dibujo.on("draw-end", this.addGraphic);
        dibujo.on("click", function (evt) {
          console.log(evt);
        });

        // Create and setup editing tools
        editToolbar = new Edit(this.map);
        this.map.on("click", function (evt) {
          editToolbar.deactivate();
        });

        this.createMapMenu();

        // activate drawing tools on button click
        query("#point").on("click", function () {
          dibujo.activate(this.id);
        });
        query("#line").on("click", function () {
          dibujo.activate(this.id);
        });
        query("#polygon").on("click", function () {
          dibujo.activate(this.id);
        });
      },
      addGraphic: function (evt) {
        //create a random color for the symbols
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);

        var type = evt.geometry.type;
        var symbol;

        if (type === "point" || type === "multipoint") {
          symbol = new SimpleMarkerSymbol(
            SimpleMarkerSymbol.STYLE_CIRCLE,
            20, new SimpleLineSymbol(
              SimpleLineSymbol.STYLE_SOLID,
              new Color([r, g, b, 0.5]),
              10
            ),
            new Color([r, g, b, 0.9]));
        } else if (type === "line" || type === "polyline") {
          symbol = new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SOLID,
            new Color([r, g, b, 0.85]),
            6
          );
        } else {
          symbol = new SimpleFillSymbol(
            SimpleFillSymbol.STYLE_SOLID,
            new SimpleLineSymbol(
              SimpleLineSymbol.STYLE_SOLID,
              new Color([r, g, b, 0.9]),
              4
            ), new Color([r, g, b, 0.5]));
        }

        abrirWidgetResultados({
          data: {
              panel: {
                  width: 350,
                  height: 380
              }
          },
          tipoResultado: consts.consultas.edicionCartografica,
          objConsulta:objEdicionCartografica,
          evt,
          symbol

        }, consts.widgetAddAtributes);
        
        /* var infoTemplate = new InfoTemplate(`Vernal Pool Locations","Latitude: ${456} <br/>
        Longitude: ${654} <br/>
        Plant Name:${"Testing"}`);
        var attr = {"Xcoord":"evt.mapPoint.x","Ycoord":"evt.mapPoint.y","Plant":"Mesa Mint"};

        var graphic = new Graphic(evt.geometry, symbol, attr, infoTemplate);

        EsriMap.graphics.add(graphic);
        dibujo.deactivate();
        textInfo = document.querySelector("#textInfo");
        textInfo.style.display = 'block'; */
      },
      createMapMenu: function () {
        // Creates right-click context menu for GRAPHICS
        ctxMenuForGraphics = new Menu({});
        ctxMenuForGraphics.addChild(new MenuItem({
          label: "Edit",
          onClick: function () {
            if (selected.geometry.type !== "point") {
              editToolbar.activate(Edit.EDIT_VERTICES, selected);
            } else {
              // renderModal('myModal', true, 'Nota', 'La edición no aplica para este tipo de geometría');
              createDialogInformacionGeneral(consts.notas.crearGeometrias[1].titulo, consts.notas.crearGeometrias[1].body)

              // alert("Not implemented");
            }
          }
        }));

        ctxMenuForGraphics.addChild(new MenuItem({
          label: "Move",
          onClick: function () {
            editToolbar.activate(Edit.MOVE, selected);
          }
        }));

        ctxMenuForGraphics.addChild(new MenuItem({
          label: "Rotate/Scale",
          onClick: function () {
            if (selected.geometry.type !== "point") {
              editToolbar.activate(Edit.ROTATE | Edit.SCALE, selected);
            } else {
              // renderModal('myModal', true, 'Nota', 'La rotación no aplica para este tipo de geometría');
              createDialogInformacionGeneral(consts.notas.crearGeometrias[0].titulo, consts.notas.crearGeometrias[0].body)

            }
          }
        }));

        /* ctxMenuForGraphics.addChild(new MenuItem({
          label: "Style",
          onClick: function () {
            alert("Not implemented");
          }
        })); */

        ctxMenuForGraphics.addChild(new MenuSeparator());

        ctxMenuForGraphics.addChild(new MenuItem({
          label: "Delete",
          onClick: function () {
            EsriMap.graphics.remove(selected);
          }
        }));

        ctxMenuForGraphics.startup();

        EsriMap.graphics.on("mouse-over", function (evt) {
          // We'll use this "selected" graphic to enable editing tools
          // on this graphic when the user click on one of the tools
          // listed in the menu.
          selected = evt.graphic;

          // Let's bind to the graphic underneath the mouse cursor           
          ctxMenuForGraphics.bindDomNode(evt.graphic.getDojoShape().getNode());
        });

        EsriMap.graphics.on("click", function (evt) {
          console.log(evt)
        });

        EsriMap.graphics.on("mouse-out", function (evt) {
          ctxMenuForGraphics.unBindDomNode(evt.graphic.getDojoShape().getNode());
        });
      },
      onOpen: function () {
        var panel = this.getPanel();
        ajustarTamanioWidget(panel, panel.position.width, 340);

        

      },
      onClose: function () {
        console.log('onClose');
        myThis.renderDivs({});
        cerrarWidgetResultados(consts.widgetAddAtributesPanel);
      },
    })
  });

  