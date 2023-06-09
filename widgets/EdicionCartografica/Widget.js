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
var objEdicionCartografica = {
  graficosSeleccionados:[],
  geometriesSeleccionados:[],
  seleccionarGeometry:false,
  flatToSelectDeselect:true,
  flatCheckExportGeomet:false,
  attibutesSelected:{},

}, appGlobal;

const dataTest = 11111

define([
  "dojo/_base/declare", "jimu/BaseWidget", "dojo/query",
  
  "esri/toolbars/draw", "esri/toolbars/edit",
  "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol",
  "esri/symbols/SimpleFillSymbol", "esri/graphic", "dijit/Menu", "dijit/MenuSeparator",
  "esri/geometry/Polygon", "esri/symbols/CartographicLineSymbol", "esri/tasks/FeatureSet",
  "esri/layers/GraphicsLayer", "esri/geometry/Point", "esri/config",

  "dojo/_base/connect", "esri/Color", "dojo/parser", "dijit/registry", "dijit/MenuItem",
  "esri/InfoTemplate",
  "dojo/domReady!"
],
  function (declare, BaseWidget, query,
    Draw, Edit,
    SimpleMarkerSymbol, SimpleLineSymbol,
    SimpleFillSymbol, Graphic, Menu, MenuSeparator, Polygon, CartographicLineSymbol, FeatureSet,
    GraphicsLayer, Point, esriConfig,
    
    connect, Color, parser, registry, MenuItem, InfoTemplate) {

    return declare([BaseWidget], {
      baseClass: "jimu-widget-EdicionCartografica",

      startup: function () {
        console.log("CrearGeometrias");
        esriConfig.defaults.io.corsEnabledServers.push("earthquake.usgs.gov"); // supports CORS

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
            console.log(EsriMap.graphics.graphics)
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
            console.log(EsriMap.graphics.graphics)
            textInfo?textInfo.style.display = 'block':""
          }
        });
        /* query("#btnAceptar").on("click", async function (evt) {
        }) */
        query("#btnAceptar").on("click", async function (evt) {
          
          let inputIdProject = document.getElementById("IdDelProyecto").value.trim();
          if (inputIdProject) {
            objEdicionCartografica.ID_PROYECT = inputIdProject;
            console.log(inputIdProject);
            loader2(true)
            myThis.renderDivs({idHerramientas:'none'});
            myThis.a_contQuerys = 1;
            EsriMap.graphics.clear(); // limpia todos los grapghics presentes en el visor
            myThis.queryPointsLinesPoligons(inputIdProject);
            // realiza consulta al servicio segun idproject
            // pinta los features
            // myThis.addGraphicsTest();
          }else{
            createDialogInformacionGeneral("Nota","El Id del proyecto es requerido");
          }
        })
        query("#iconoEditarNodos").on("click", async function (evt) {
          objEdicionCartografica.seleccionarGeometry = false;
          myThis.renderDivs({editar:'flex',regresar:'flex'});
          console.log("iconoEditarNodos");
          myThis.initToolbar();
        });
        
        query("#iconoGuardarGeometrias").on("click", async function (evt) {
          
          myThis.renderDivs({guardar:'flex', regresar:'flex'});

        });
        query("#iconoUnirGeometrias").on("click", async function (evt) {
          myThis.renderDivs({unir:'flex', regresar:'flex'});
          myThis.initToolbar();
          setTimeout(() => {
            editToolbar?editToolbar.deactivate():"";
          }, 1000);
          // objEdicionCartografica.seleccionarGeometry = true;
          // objEdicionCartografica.flatToSelectDeselect = true;
        });
        query("#iconoExportarGeometrias").on("click", async function (evt) {
          myThis.renderDivs({exportar:'flex', regresar:'flex'});
          document.getElementById("selectGeometrias").checked = false;
          objEdicionCartografica.seleccionarGeometry = true;
          objEdicionCartografica.flatToSelectDeselect = false;
        });
        query("#iconoCrearGeometrias").on("click", async function (evt) {
          objEdicionCartografica.seleccionarGeometry = false;
          myThis.renderDivs({crear:'flex', regresar:'flex'});
          myThis.initToolbar();
        });
        query("#regresar").on("click", async function (evt) {
          objEdicionCartografica.seleccionarGeometry = false;
          document.getElementById("selectGeometrias").checked = false;
          console.log("regresar");
          myThis.renderDivs({idHerramientas: 'flex'});
          editToolbar?editToolbar.deactivate():"";
          dibujo?dibujo.deactivate():""
          ocultarMostrarTootilp(true)
          objEdicionCartografica.flatCheckExportGeomet=false;
          ctxMenuForGraphics.destroy();
          document.getElementById("selectGeometriasExportar").checked = false;
          myThis._deleteGeomtryesSelected();
        });
        query("#btnGuardarNodos").on("click", async function (evt) {
          console.log("btnGuardarNodos");
          editToolbar ? editToolbar.deactivate():"";
          /* const loader = document.getElementById("loader_2");
          loader.style.display = "flex"; */
          // myThis.confirmarGuardarGeometrias();
          myThis.renderizarFront(true);  
          
        });
        
        query("#btnSelectAtributos").on("click", async function (evt) {
          console.log("btnSelectAtributos");
          if (objEdicionCartografica.graficosSeleccionados.length > 1) {
            myThis._render_Attributes_To_Select();
            objEdicionCartografica.seleccionarGeometry = false;
            ocultarMostrarTootilp(true);
            document.getElementById("selectGeometrias").checked = false;
            // document.getElementsByClassName("esriPopup").item(0).style.display="none"
          } else {
            createDialogInformacionGeneral("! Nota", "Recuerda seleccionar por lo menos 2 geometrías de tipo poligono");
          }

        })
        query("#selectGeometrias").on("click", async function (evt) {
          console.log("selectGeometrias", evt.currentTarget.checked);
          if (evt.currentTarget.checked) {
            myThis._logicExportarGeometrias();
          }else{
            objEdicionCartografica.seleccionarGeometry = false;
            objEdicionCartografica.flatToSelectDeselect = false;
            ocultarMostrarTootilp(true);
          }
          
        })
        query("#selectGeometriasExportar").on("click", async function (evt) {
          console.log("selectGeometriasExportar", evt.currentTarget.checked);
          if (evt.currentTarget.checked) {
            myThis._logicExportarGeometrias();
            objEdicionCartografica.flatCheckExportGeomet=true;
          }else{
            objEdicionCartografica.seleccionarGeometry = false;
            objEdicionCartografica.flatToSelectDeselect = false;
            ocultarMostrarTootilp(true);
            objEdicionCartografica.flatCheckExportGeomet=false;
          }
          
        })
        query("#exportarGeom").on("click", async function (evt) {
          console.log("exportarGeom");
          if (objEdicionCartografica.graficosSeleccionados.length > 0) {
            myThis.logicaExportarGeometrias()
            ocultarMostrarTootilp(true);
            document.getElementById("selectGeometriasExportar").checked = false;        
            objEdicionCartografica.seleccionarGeometry = false;
            objEdicionCartografica.flatCheckExportGeomet=false;
          }else{
            createDialogInformacionGeneral("! Nota", "Recuerda primero seleccionar las geometrías a exportar");
          }
        });
        query("#aceptarModal").on("click", async function (evt) {
          myThis.responseGuardarGeometrias();
          myThis.renderDivs({idHerramientas:'flex'});
        });
        query("#cancelarModal").on("click", async function (evt) {
          myThis.renderizarFront(false);
        });
        query("#aceptarModalEliminar").on("click", async function (evt) {
            loader2(true)
            myThis._deleteGeometryByService(selected)
        });
        query("#cancelarModalEliminar").on("click", async function (evt) {
          myThis.renderFrontToDeleteGeometry(false);
        });
        query(".x").on("click", async function (evt) {
          console.log("check");
        });
/* 
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
      },
      confirmarGuardarGeometrias: function (){
        myThis.renderizarFront(true);  
      },
      responseGuardarGeometrias: function (resp){
        myThis.renderizarFront(false); 
        loader2(true)
        //  logica que separa geometrias de puntos, lineas y poligonos, para luego persistir
        const geometrias = EsriMap.graphics.graphics.filter( gd =>  gd.attributes !== undefined);
        console.log(geometrias);
        // for para recorrer los geometrias, segun tipo de geometria formar json para actualizar
        let puntos=[], lineas=[], poligonos=[];
        geometrias.forEach(geometria => {
          console.log(geometria.geometry.paths?"Línea":geometria.geometry.rings?"Poligono":"Punto");            
          if (geometria.geometry.x) {
            puntos.push(
              {
                geometry: geometria.geometry,
                attributes: geometria.attributes
              }
            )
          } else if (geometria.geometry.paths) {
            lineas.push(
              {
                geometry: geometria.geometry,
                attributes: geometria.attributes
              }
            )
          }else if(geometria.geometry.rings){
            poligonos.push(
              {
                geometry: geometria.geometry,
                attributes: geometria.attributes
              }
            )
          }else{
            console.log("para otros tipos de geometrias");
          }
          console.log(`puntos: ${{puntos}}, lineas:${{lineas}}, poligonos${{poligonos}}`);
        });
        myThis.formarJsonToPersistir(puntos, lineas, poligonos); // separados los envia a persitir
        /* setTimeout(() => {
            loader2(false)
            createDialogInformacionGeneral("Correcto","Nodos almacenados");
            myThis.renderDivs({idHerramientas: 'flex'});
          }, 5000); */

      },
      renderizarFront: function (valorBool) {
        if (valorBool) {
          document.getElementById("filalabelBtn").style.display = 'none';
          document.getElementById("input-group").style.display = 'none';
          document.getElementById("regresarDiv").style.display = 'none';
          document.getElementById("guardar").style.display = 'none';    
          document.getElementById("ModalConfirmacion").style.display = 'block';    
        }else{
          document.getElementById("ModalConfirmacion").style.display = 'none';    
          document.getElementById("filalabelBtn").style.display = 'flex';
          document.getElementById("input-group").style.display = 'flex';
          document.getElementById("regresarDiv").style.display = 'flex';
          document.getElementById("guardar").style.display = 'flex';
        }
      },
      renderFrontToDeleteGeometry: function (valorBool) {
        if (valorBool) {
          document.getElementById("filalabelBtn").style.display = 'none';
          document.getElementById("input-group").style.display = 'none';
          document.getElementById("editar").style.display = 'none';  
          document.getElementById("regresarDiv").style.display = 'none';
          document.getElementById("ModalConfirmacionDelete").style.display = 'block';    
        }else{
          document.getElementById("ModalConfirmacionDelete").style.display = 'none';    
          document.getElementById("filalabelBtn").style.display = 'flex';
          document.getElementById("input-group").style.display = 'flex';
          document.getElementById("editar").style.display = 'flex';  
          document.getElementById("regresarDiv").style.display = 'flex';
        }
      },
      queryPointsLinesPoligons: function (ID_PROYECT) {
        let objConsulta = {
          where: `ID_PROYECT=${ID_PROYECT}`
        }
        //consulta Puntos
        // this.initToolbar();
        urlGetPuntosLineasPoligonos.forEach(url => {
          objConsulta.urlCapa = url;
          ejecutarQueryAndQueryTask(objConsulta,this.succeededRequest,this.errorRequest)
        });        
      },
      succeededRequest: function (response) {
        console.log(response);
        if (response.features.length < 1) {
          if (myThis.a_contQuerys > urlGetPuntosLineasPoligonos.length-1) {
            createDialogInformacionGeneral(consts.notas.consultaSimple[2].titulo,
              `Este proyecto no presenta geometrías para visualizar`)
          } else {
            myThis.a_contQuerys = myThis.a_contQuerys + 1;
          }
        } else {
          // let atributes = [];
          // response.features.forEach(f => atributes.push(f.attributes))
          // atributes.map(a => a.FECHA_CAPT = new Date(a.FECHA_CAPT).toLocaleDateString())
          // console.log(atributes);
          // response.features.forEach(f => f.attributes["uuid"] = generateUUID());
          response.features.forEach(f => { // ajusta los atributos antes de pintar los Features
            f.attributes["uuid"] = generateUUID()
            f.attributes.FECHA_CAPT = new Date(f.attributes.FECHA_CAPT).toLocaleDateString()
          });
          if (response.geometryType == "esriGeometryPoint") {
            pintarPuntos(EsriMap, response, {});
          } else if(response.geometryType == "esriGeometryPolyline"){
            console.log("Lineas "); 
            pintarPolyLines(EsriMap, response);
          }else if(response.geometryType == "esriGeometryPolygon"){
            console.log("Polygon "); 
            pintarPolygons(EsriMap, response)
          }else{

          }
        }
        loader2(false)
        console.log(response);
        myThis.renderDivs({idHerramientas:'flex'});

      },
      errorRequest: function (error) {
        createDialogInformacionGeneral(consts.notas.consultaSimple[0].titulo, consts.notas.consultaSimple[0].body)
        console.error({error});
        loader2(false)
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
      formarJsonToPersistir: function (puntos, lineas, poligonos){
        // se utiliza al momento de modificar alguna geometria
        try {
          urlPostEditPuntosLineasPoligonos.forEach(async (url, i) => {
            // const url = urlPostEditPuntosLineasPoligonos[0];
            const data = {
              features: i==0?puntos:i==1?lineas:poligonos
            }
            console.log(data);
            const resp = await postData(url, data);
            console.log(resp);
            
          });
          myThis.renderizarFront(false);
          createDialogInformacionGeneral("! Correcto !","Las geometrías han sido actualizadas");
          EsriMap.graphics.clear(); // limpia todos los grapghics presentes en el visor
          /* 
            A continuación elimina geometrias fusionadas y guarda el resultado de la funsion
           */
          if (objEdicionCartografica.toDeleteGeometriesOriginations1) {
            objEdicionCartografica.toDeleteGeometriesOriginations1.forEach(async tdgo => {
              const data = {
                objectIds: tdgo.attributes.OBJECTID,
                where : `ID_PROYECT = '${tdgo.attributes.ID_PROYECT}'`
              }
              url=urlPost_deleteFeatures_PuntosLineasPoligonos.poligono;
              const resp = await postDeleteGeomtry(url,data);
              console.log(resp);
            });
            objEdicionCartografica.toDeleteGeometriesOriginations1=[]
          }
          if (objEdicionCartografica.toPersistirGeometriFution) {
            objEdicionCartografica.toPersistirGeometriFution.forEach(async tpgf => {
              let features = [
                {
                  attributes: {
                    "ID_PROYECT": Number(tpgf.attributes.ID_PROYECT),
                    ID_PREDIO: tpgf.attributes.ID_PREDIO,
                    "ACOMPANIAN":tpgf.attributes.ACOMPANIAN,
                    "OBSERVACIO":tpgf.attributes.OBSERVACIO,
                    "FUNCIONARI":tpgf.attributes.FUNCIONARI,
                    FIRMA:tpgf.attributes.FIRMA,
                    FECHA_CAPTURA: fechaActual(),
                    ID_INICIO: tpgf.attributes.ID_INICIO,
                    ID_FINAL: tpgf.attributes.ID_FINAL,
                    DESCRIPCIO: tpgf.attributes.DESCRIPCIO,
                    AREA_M2: calcularAreaPoligono(tpgf),
                  },
                  geometry: tpgf.geometry,
                }
              ];
              console.log(features);
              const data = { features }
              const resp = await postData(urlPost_AddFeatures_PuntosLineasPoligonos.poligono, data);
              console.log(resp);
            });
            objEdicionCartografica.toPersistirGeometriFution=[]
          }
        } catch (error) {
            console.error(...error)          
        }
        loader2(false)
      },
      initToolbar: function () {
        console.log("initToolbar")
        dibujo = new Draw(this.map);
        dibujo.on("draw-end", this.addGraphic);
        dibujo.on("click", function (evt) {
          console.log(evt);
        });

        // Create and setup editing tools
        editToolbar = new Edit(this.map);
        objEdicionCartografica.editToolbar = editToolbar;
        this.map.on("click", function (evt) {
          editToolbar?editToolbar.deactivate():"";
        });

        this.createMapMenu();

        // activate drawing tools on button click
        query("#point").on("click", function () {
          dibujo.activate(this.id);
          objEdicionCartografica.typeGeomtryToCreate = this.id
        });
        query("#line").on("click", function () {
          dibujo.activate(this.id);
          objEdicionCartografica.typeGeomtryToCreate = this.id
        });
        query("#polygon").on("click", function () {
          dibujo.activate(this.id);
          objEdicionCartografica.typeGeomtryToCreate = this.id
        });
      },
      addGraphic: function (evt) {
       
        const symbol = generarSymbol(evt.geometry.type);
        abrirWidgetResultados({
          data: {
              panel: {
                  width: 350,
                  height: 430
              }
          },
          tipoResultado: consts.consultas.edicionCartografica,
          objConsulta:objEdicionCartografica,
          evt,
          symbol

        }, consts.widgetAddAtributes);
        
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
            // renderice front para confirmar eliminación de la geometria
            myThis.renderFrontToDeleteGeometry(true);
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
          if (objEdicionCartografica.seleccionarGeometry) {
            console.log(evt)
            // let esriMapGraphics = EsriMap.graphics.graphics.slice(1).filter( gd =>  gd.attributes !== undefined);
            let esriMapGraphics = EsriMap.graphics.graphics.filter(e => (e.attributes !== undefined && e.geometry.type == consts.GEOMETRIAS.POLIGONO));
            
            // let grSelected = gr.filter(e => e.geometry.rings[0] == evt.graphic.geometry.rings[0])[0];
            // console.log(grSelected);
            // if (!objEdicionCartografica.graficosSeleccionados.filter(e => e.geometry.rings[0] == evt.graphic.geometry.rings[0])[0]) {
            if (objEdicionCartografica.flatToSelectDeselect) {
              objEdicionCartografica.flatToSelectDeselect = false; // antirrebote de pm
              if (evt.graphic.geometry.type === consts.GEOMETRIAS.POLIGONO || objEdicionCartografica.flatCheckExportGeomet) {
                if (objEdicionCartografica.graficosSeleccionados.filter(e => e.attributes.uuid == evt.graphic.attributes.uuid).length < 1) {
                  // evt.graphic.attributes.tipo=2
                  objEdicionCartografica.graficosSeleccionados = [...objEdicionCartografica.graficosSeleccionados, evt.graphic];
                  // const copia = {...Object.assign(EsriMap.graphics.graphics[EsriMap.graphics.graphics.length-1])}
                  const copia = evt.graphic.clone();
                  copia.setAttributes({...evt.graphic.attributes, tipo:2})
                  
                  objEdicionCartografica.geometriesSeleccionados.push(copia); // son los q se pintan en naranja,"geometriesSeleccionados"
                  pintarGeometry(EsriMap, copia.geometry, {}, copia.attributes,{});
                  // pintarGeometry(EsriMap, evt.graphic.geometry, {}, evt.graphic.attributes,{});
                  console.log(objEdicionCartografica);
                }else{
                  //const grs = EsriMap.graphics.graphics.slice(1);
                  const target = esriMapGraphics.filter(e => e.attributes.PUNTO === evt.graphic.attributes.PUNTO)
                  EsriMap.graphics.remove(target[target.length-1]);
                  objEdicionCartografica.graficosSeleccionados = objEdicionCartografica.graficosSeleccionados.filter(e => e.attributes.PUNTO != evt.graphic.attributes.PUNTO)
                  // const rr = objEdicionCartografica.graficosSeleccionados.filter(e => e.attributes.DESCRIPCION === selected.attributes.DESCRIPCION)
                }
              }else{
                createDialogInformacionGeneral("! Nota", "Recuerda que solo polígonos se pueden unir")
              }
              setTimeout(() => {
                objEdicionCartografica.flatToSelectDeselect = true; // antirrebote de pm
              }, 500);
            }
          }else{
            console.log("just to test");
          }
        });

        EsriMap.graphics.on("mouse-out", function (evt) {
          ctxMenuForGraphics.unBindDomNode(evt.graphic.getDojoShape().getNode());
        });
      },
      onOpen: function () {
        var panel = this.getPanel();
        ajustarTamanioWidget(panel, panel.position.width, 370);

        

      },
      onClose: function () {
        console.log('onClose');
        myThis.renderDivs({});
        cerrarWidgetResultados(consts.widgetAddAtributesPanel);
      },
      addGraphicsTest: function() {
       
        var polygonSymbol = generarSymbol("polygon");
        
        var polygon = new Polygon({
          "rings": [
            [
              [-8441093.907586426,759885.6531015814],
              [-8404404.13400955,784935.912302344],
              [-8257645.0397020485,814161.2147032345],
              [-8158582.651044486,772410.7827019631],
              [-8140237.764256048,713960.1779001825],
              [-8158582.651044486,651334.5298982749],
              [-8253976.062344361,588708.8818963678],
              [-8320017.654782737,572008.7090958592],
              [-8375052.31514805,588708.8818963678],
              [-8415411.066082612,617934.184297258],
              [-8444762.884944113,630459.3138976395],
              [-8448431.8623018,668034.7026987837],
              [-8448431.8623018,672209.745898911],
              [-8441093.907586426,759885.6531015814]
            ]
          ],
          "spatialReference": {
            "wkid": 102100
          }
        });
        var arrow = new Polygon({
          "rings": [
            [
              [9862211.137464028, 6617856.40100763],
              [8922952.933896024, 5522055.163511626],
              [8922952.933896024, 5991684.265295628],
              [6105178.323192019, 5991684.265295628],
              [6105178.323192019, 7087485.50279163],
              [8922952.933896024, 7087485.50279163],
              [8922952.933896024, 7557114.604575632],
              [9862211.137464028, 6617856.40100763]
            ]
          ],
          "spatialReference": {
            "wkid": 102100
          }
        });

        var triangle = new Polygon({
          "rings": [
            [
              [-8102632.55113454,391764.9248803073],
              [-7946089.51720654,704037.7821704486],
              [-7789546.483278541,391764.9248803073],
              [-8102632.55113454,391764.9248803073]
            ]
          ],
          "spatialReference": {
            "wkid": 102100
          }
        });
        var polygon1 = new Polygon({
          "rings": [
            [
              [-8467999.741542768,251120.79283561767],
              [-8375052.315148019,246228.8230253677],
              [-8306564.737804519,187525.1853023679],
              [-8331024.586855769,99469.72871786822],
              [-8453323.832112018,75009.8796666183],
              [-8507135.50002477,148389.42682036804],
              [-8467999.741542768,251120.79283561767]
            ]
          ],
          "spatialReference": {
            "wkid": 102100
          }
        });
        var polygon2 = new Polygon({
          "rings": [[[-8003262.609569021,260904.73245611764],[-8145129.73406627,-13045.576917881379]]],
          "spatialReference": {
            "wkid": 102100
          }
        });


        EsriMap.graphics.add(new Graphic(polygon, polygonSymbol));
        EsriMap.graphics.add(new Graphic(triangle, polygonSymbol));
        EsriMap.graphics.add(new Graphic(polygon1, polygonSymbol));
        // EsriMap.graphics.add(new Graphic(polygon2, polygonSymbol));
        // map.graphics.add(new Graphic(arrow, polygonSymbol));

      },
      _render_Attributes_To_Select: function () {
        
          abrirWidgetResultados({
          data: {
              panel: {
                  width: 650,
                  height: 380
              }
          },
          tipoResultado: consts.unirGeometrias,
          objConsulta:objEdicionCartografica,

        }, consts.widgetAddAtributes);

        /* Crea la tabla para ser renderizada en front */
        let atributes = this._extraeAtributsGeomSelected();
        
        
        setTimeout(() => {
          this._genera_tabla(atributes);
          // let aa = document.getElementById("attributesToSelect")
          // aa.innerHTML = "<h1>rrrr</>"
        }, 500);

      },
      _extraeAtributsGeomSelected: function () {
        const gtris = objEdicionCartografica.graficosSeleccionados;
        let atributes = [];
        gtris.forEach(e => atributes.push(e.attributes))
        return atributes;
      },
      _genera_tabla: function(atributes) {
        
        let tblBody = document.createElement("tbody"),
        tabla = document.createElement("table"),
        body = document.getElementById("TablaSelectAtributes"),
        heder = document.createElement("tr"),
        // columnasHeaders = ["Check","Punto", "Predio", "Acompañante", "Descripción", "Observaciones", "Fecha_captura", "Funcionario_SAE", "Firma", "Tipo", "Id"];
        columnasHeaders = ["Check", ...Object.keys(atributes[0])];
        console.log("columnasHeaders => ",columnasHeaders, columnasHeaders.length);
        heder.setAttribute("class", "classHeader")
        tabla.setAttribute("id", "tablaAtributos")
        
        columnasHeaders.forEach(e => {
          celda = document.createElement("td")
          celda.setAttribute("class", "celdaHeader")
          textoCelda = document.createTextNode(e)
          celda.appendChild(textoCelda)
          heder.appendChild(celda)
        })
        tblBody.appendChild(heder);
        tabla.appendChild(tblBody);

        for (let i = 0; i < atributes.length; i++) {
          // Crea las hileras de la tabla
          let hilera = document.createElement("tr");
          hilera.setAttribute("class", "hilera")
          let celda = document.createElement("td");
          celda.setAttribute("class", "celdaCheck")
          let inputCheck = document.createElement("INPUT");
          inputCheck.setAttribute("class", "x")
          inputCheck.setAttribute("type", `checkbox`);
          inputCheck.setAttribute("name", `check_${i}`);
          inputCheck.setAttribute('onclick',`checkSelected(${JSON.stringify(atributes[i])},'check_${i}');`);
          celda.appendChild(inputCheck);
          hilera.appendChild(celda);
          for (let j = 0; j < Object.keys(atributes[0]).length; j++) {
            // Crea un elemento <td> y un nodo de texto, haz que el nodo de
            // texto sea el contenido de <td>, ubica el elemento <td> al final
            // de la hilera de la tabla
            let celda = document.createElement("td");
            celda.setAttribute("class", "celda")
            let textoCelda = document.createTextNode(atributes[i][Object.keys(atributes[i])[j]]);
            console.log(textoCelda);
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
            // tblBody.appendChild(hilera);
          }
          // agrega la hilera al final de la tabla (al final del elemento tblbody)
          tblBody.appendChild(hilera);
          // posiciona el <tbody> debajo del elemento <table>
          // tabla.appendChild(tblBody);
        }
        // posiciona el <tbody> debajo del elemento <table>
        tabla.appendChild(tblBody);
        // appends <table> into <body>
        if (body) {
          body.appendChild(tabla);
        }else{
          setTimeout(() => {
            this._genera_tabla(atributes)
          }, 2000);
        }
        // modifica el atributo "border" de la tabla y lo fija a "2";
        tabla.setAttribute("border", "2");

        /* 
        // Obtener la referencia del elemento body
        var body = document.getElementById("attributesToSelect");
      
        // Crea un elemento <table> y un elemento <tbody>
        var tabla   = document.createElement("table");
        var tblBody = document.createElement("tbody");
      
        // Crea las celdas
        for (var i = 0; i < 2; i++) {
          // Crea las hileras de la tabla
          var hilera = document.createElement("tr");
      
          for (var j = 0; j < 2; j++) {
            // Crea un elemento <td> y un nodo de texto, haz que el nodo de
            // texto sea el contenido de <td>, ubica el elemento <td> al final
            // de la hilera de la tabla
            var celda = document.createElement("td");
            var textoCelda = document.createTextNode("celda en la hilera "+i+", columna "+j);
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
          }
      
          // agrega la hilera al final de la tabla (al final del elemento tblbody)
          tblBody.appendChild(hilera);
        }
      
        // posiciona el <tbody> debajo del elemento <table>
        tabla.appendChild(tblBody);
        // appends <table> into <body>
        body.appendChild(tabla);
        // modifica el atributo "border" de la tabla y lo fija a "2";
        tabla.setAttribute("border", "2");
         */
      },
      _logicExportarGeometrias: function(){
        console.log("_logicExportarGeometrias");
        // this.initToolbar();
        objEdicionCartografica.seleccionarGeometry = true;
        objEdicionCartografica.flatToSelectDeselect = true;
        ocultarMostrarTootilp(false)
      },
      logicaExportarGeometrias: function(){
        console.log("logicaExportarGeometrias");
        loader2(true)
        var featureSet = new FeatureSet();
        featureSet.features = objEdicionCartografica.graficosSeleccionados;
        exportarShape(featureSet, "loader_2");
        // setTimeout(() => {
        //   loader2(true)
        //   createDialogInformacionGeneral("Resultado", "La descarga se realizó correctamente")
        // }, 30000);
        this._deleteGeomtryesSelected()
      },
      _deleteGeomtryesSelected: function(){
        try {
          objEdicionCartografica.geometriesSeleccionados.forEach(e=>{
            const geoDelete  = EsriMap.graphics.graphics.slice(1).filter( gd =>  e.attributes.tipo == gd.attributes.tipo)
            console.log(geoDelete)
            geoDelete.forEach(td => EsriMap.graphics.remove(td))    
          })
          objEdicionCartografica.geometriesSeleccionados=[]
          objEdicionCartografica.graficosSeleccionados=[]
        } catch (error) {
            createDialogInformacionGeneral("Error", "Demaciados gráficos en el visor estan generando conflito, favor recargar el visor")
        }
      },
      _deleteGeometryByService: async function (selected) {              
        try {

          const url = selected.geometry.type == consts.GEOMETRIAS.PUNTO ? urlPost_deleteFeatures_PuntosLineasPoligonos.punto :
            selected.geometry.type == consts.GEOMETRIAS.LINEA ? urlPost_deleteFeatures_PuntosLineasPoligonos.linea :
            selected.geometry.type == consts.GEOMETRIAS.POLIGONO ? urlPost_deleteFeatures_PuntosLineasPoligonos.poligono : ''
          const data = {
            objectIds: selected.attributes.OBJECTID,
            where : `ID_PROYECT = '${selected.attributes.ID_PROYECT}'`
          }
          const resp = await postDeleteGeomtry(url,data);
          console.log(resp);
          myThis.renderFrontToDeleteGeometry(false);
        } catch (error) {
          console.error(error);
          createDialogInformacionGeneral("!Atención¡","No se logró eliminar la geometría, intentalo luego o comunicate con tecnología");
        }
        EsriMap.graphics.remove(selected);
        objEdicionCartografica.graficosSeleccionados = objEdicionCartografica.graficosSeleccionados.filter(e => e.attributes.DESCRIPCION !== selected.attributes.DESCRIPCION)
        loader2(false)
        createDialogInformacionGeneral("! Correcto !", `La geometría ${selected.attributes.OBJECTID} ha sido eliminada`);
      },    
      
      
    })
  });

  

function checkSelected(data, check) {
  const getCheck = document.getElementsByName(check)
  
  if (getCheck.item(0).checked) {
    objEdicionCartografica.attibutesSelected = data
    desseleccionarOtrsChecks(check, objEdicionCartografica.graficosSeleccionados);
  } else {
    objEdicionCartografica.attibutesSelected = ""
  }
}

const desseleccionarOtrsChecks = (check, allChecks)=>{
  allChecks.forEach((ac, i) => {
    const newCheck = `check_${i}`
    if (newCheck != check) {
      otherCheck = document.getElementsByName(newCheck)
      otherCheck.item(0).checked = false
    }
  })
}
