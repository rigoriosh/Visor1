// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

//>>built
var widgetAddAtributes = {}, thisAddAtributes, urlToPersistir_AddAtributes="";

define(["dojo/_base/declare", "jimu/BaseWidget", "dojo/query", "esri/InfoTemplate",
"esri/graphic", "esri/geometry/geometryEngine","esri/SpatialReference", "esri/geometry/Point",
"esri/geometry/Polygon","esri/symbols/SimpleFillSymbol","esri/symbols/SimpleLineSymbol",
"esri/Color"],
function (declare, BaseWidget, query, InfoTemplate, Graphic, geometryEngine, SpatialReference, Point,
  Polygon, SimpleFillSymbol, SimpleLineSymbol, Color) {

    
     return declare([BaseWidget], {
        baseClass: "jimu-widget-AddAtributes",
        
        startup: function() {
          thisAddAtributes = this;
          //console.log("AddAtributes");
          this.inherited(arguments);
          // this.mapIdNoderrh.innerHTML = 'map id is:' + this.map.id;

          query("#agregarGeometria").on("click", async function (evt) {
            //pendiente validar los campos ingresados en el form de atributos
            if (thisAddAtributes._validarAtributos()) {
              loader2(true)
              
              console.log("alistar geometrias para persistir")
              thisAddAtributes.formarJsonToPersistir_addAtributes();
            };
          });
          query("#btnUnirGeometrias").on("click", async function (evt) {
            console.log("btnUnirGeometrias");
            if (Object.keys(objEdicionCartografica.attibutesSelected).length > 0) {
              loader2(true)
              console.log(objEdicionCartografica.graficosSeleccionados);
              console.log("ejecutar geoservicio unir geometrias");
              const gmt = objEdicionCartografica.graficosSeleccionados.map(e => e.geometry)
              // var contains = geometryEngine.contains(objEdicionCartografica.graficosSeleccionados[0].geometry,objEdicionCartografica.graficosSeleccionados[0].geometry);
              // console.log(contains);
              var union = geometryEngine.union(gmt);
              console.log("geometryEngine.union: %o", union);
              var polygon = new Polygon({
                "rings": union.rings,
                "spatialReference": union.spatialReference
              });
              var symbol = generarSymbol("'polygon'");
              const { ID_PROYECT, ID_PREDIO } = objEdicionCartografica.attibutesSelected;
              let infoTemplate = new InfoTemplate(`Proyecto: ${ID_PROYECT} <br> Predio: ${ID_PREDIO} `);
              objEdicionCartografica.attibutesSelected.tipo=3;
              objEdicionCartografica.attibutesSelected.uuid=generateUUID();              
              EsriMap.graphics.add(new Graphic(polygon, symbol, objEdicionCartografica.attibutesSelected, infoTemplate));
              thisAddAtributes._deleteGeomtryesSelected();
              cerrarWidgetResultados(consts.widgetAddAtributesPanel, false);
              loader2(false)
              createDialogInformacionGeneral("! Información", "Geomtrías unidas, recuerda guardar las geometrías, para mantener los cambios");
              thisAddAtributes._renderFrontToQueryProyect()
              objEdicionCartografica.seleccionarGeometry = false;
              document.getElementsByClassName("esriPopup").item(0).style.display="block"
            } else {
              createDialogInformacionGeneral("! Nota", "Recuerda seleccionar los atributos para la union de las geomtrías");
            }
            objEdicionCartografica.attibutesSelected={}
          });
          query("#btnUnirCerrar").on("click", async function (evt) {
            console.log("btnUnirCerrar");
            //pendiente validar los campos ingresados en el form de atributos
              cerrarWidgetResultados(consts.widgetAddAtributesPanel, false)
          });
          
        },
        onOpen: function () {
          widgetAddAtributes = this.appConfig.getConfigElementById(consts.widgetAddAtributes);
          const {data}=widgetAddAtributes
          console.log(widgetAddAtributes);
          
          var panel = this.getPanel();
          // panel.position.width = 1000;
          // panel.position.height = 300;
          panel.position.width = !widgetAddAtributes?.data?.data.panel.width?100:widgetAddAtributes.data.data.panel.width;
          panel.position.height = !widgetAddAtributes?.data?.data.panel.height?100:widgetAddAtributes.data.data.panel.height;
          panel._originalBox = {
              w: panel.position.width,
              h: panel.position.height,
              l: panel.position.left || 0,
              t: panel.position.top || 0
          };
          panel.setPosition(panel.position);
          panel.panelManager.normalizePanel(panel);
          if (data.tipoResultado == consts.unirGeometrias) {
            document.getElementById("divAddAtributes").style.display = 'none';
            document.getElementById("attributesToSelect").style.display = 'flex';
          }else if (data.tipoResultado ==  consts.edicionCartografica) {
            document.getElementById("attributesToSelect").style.display = 'none';
            document.getElementById("divAddAtributes").style.display = 'block';            
            if (data.evt.geometry.type == consts.GEOMETRIAS.PUNTO) {
              document.getElementById("mostrarCamposPunto").style.display = 'block';
              document.getElementById("mostrarCamposLinea").style.display = 'none';
              document.getElementById("mostrarCamposPoligono").style.display = 'none';
              urlToPersistir_AddAtributes = urlPost_AddFeatures_PuntosLineasPoligonos.punto              
            } else if (data.evt.geometry.type == consts.GEOMETRIAS.LINEA) {
              document.getElementById("mostrarCamposPunto").style.display = 'none';
              document.getElementById("mostrarCamposLinea").style.display = 'block';
              document.getElementById("mostrarCamposPoligono").style.display = 'none';
              urlToPersistir_AddAtributes = urlPost_AddFeatures_PuntosLineasPoligonos.linea
            } else if (data.evt.geometry.type == consts.GEOMETRIAS.POLIGONO) {
              document.getElementById("mostrarCamposPunto").style.display = 'none';
              document.getElementById("mostrarCamposLinea").style.display = 'none';
              document.getElementById("mostrarCamposPoligono").style.display = 'block';
              urlToPersistir_AddAtributes = urlPost_AddFeatures_PuntosLineasPoligonos.poligono
            }
          }
        },
        onClose: function(){
          const padre=document.getElementById("TablaSelectAtributes"),
          hijo=document.getElementById("tablaAtributos");
          if (hijo) {
            padre.removeChild(hijo);
            objEdicionCartografica.seleccionarGeometry = true;
            objEdicionCartografica.flatToSelectDeselect = true;
          }
          loader2(false)
        },
        pasoDespuesDeCapturarAtributos: function () { // agrega el grafico al mapa
          console.log(widgetAddAtributes);
          const {evt, symbol} = widgetAddAtributes.data;
          const { infoTemplate, attr} = this._formarInfoTeample(this._validarAtributos());
          var graphic = new Graphic(evt.geometry, symbol, attr, infoTemplate);
          EsriMap.graphics.add(graphic);
          dibujo.deactivate();
          textInfo = document.querySelector("#textInfo");
          textInfo.style.display = 'block';
        },
        _formarInfoTeample: function(attributes){
          const {ID_PUNTO, ID_PREDIO, ACOMPANANTE, OBSERVACIONES, FECHA_CAPTURA, FUNCIONARIO_SAE, FIRMA,
            DESCRIPCION_POLIGONO, DESCRIPCION_PUNTO, ID_FINAL, ID_INICIO, LONGITUD, AREA_M2
          } = attributes;
          let infoTemplate = new InfoTemplate(`Punto: ${ID_PUNTO} <br> Predio: ${ID_PREDIO} `);
          let attr = {
            "ID_PROYECT": Number(objEdicionCartografica.ID_PROYECT),
            ACOMPANIAN:ACOMPANANTE,
            FECHA_CAPT: FECHA_CAPTURA,
            FUNCIONARI:FUNCIONARIO_SAE,
            FIRMA,
            "OBSERVACIO":OBSERVACIONES,
            ID_PREDIO,
            "tipo":1,//ayuda a diferenciar en el front
            "uuid":generateUUID()
          };
          if (widgetAddAtributes.data.evt.geometry.type == consts.GEOMETRIAS.PUNTO) {
            attr.DESCRIPCIO = DESCRIPCION_PUNTO
            attr.ID_PUNTO = ID_PUNTO
          } else if (widgetAddAtributes.data.evt.geometry.type == consts.GEOMETRIAS.LINEA) {
            attr.LONGITUD = LONGITUD
          }else if (widgetAddAtributes.data.evt.geometry.type == consts.GEOMETRIAS.POLIGONO) {
            attr.DESCRIPCION = DESCRIPCION_POLIGONO
            attr.AREA_M2 = AREA_M2
            attr.ID_INICIO=ID_INICIO
            attr.ID_FINAL=ID_FINAL
          }         
          return { infoTemplate, attr}
        },
        _validarAtributos: function(){
          const ID_PUNTO = document.getElementById("ID_PUNTO").value.trim();
          const ID_PREDIO = document.getElementById("ID_PREDIO").value.trim();
          const ACOMPANANTE = document.getElementById("ACOMPAÑANTE").value.trim();
          const OBSERVACIONES = document.getElementById("OBSERVACIONES").value.trim();
          const FECHA_CAPTURA = document.getElementById("FECHA_CAPTURA").value.trim();
          const FUNCIONARIO_SAE = document.getElementById("FUNCIONARIO_SAE").value.trim();
          const FIRMA = document.getElementById("FIRMA").value.trim();
          const DESCRIPCION_PUNTO = document.getElementById("DESCRIPCION_PUNTO").value.trim();
          const ID_INICIO = document.getElementById("ID_INICIO").value.trim();
          const ID_FINAL = document.getElementById("ID_FINAL").value.trim();
          const DESCRIPCION_POLIGONO = document.getElementById("DESCRIPCION_POLIGONO").value.trim();

          if (((ID_PUNTO && DESCRIPCION_PUNTO)||(ID_INICIO && ID_FINAL && DESCRIPCION_POLIGONO)
          ||objEdicionCartografica.typeGeomtryToCreate == consts.GEOMETRIAS.line)
           && (ID_PREDIO && ACOMPANANTE && OBSERVACIONES && FECHA_CAPTURA && FUNCIONARIO_SAE && FIRMA)) {
            return {ID_PUNTO, ID_PREDIO, ACOMPANANTE, OBSERVACIONES, FECHA_CAPTURA, FUNCIONARIO_SAE, FIRMA,
              DESCRIPCION_PUNTO, ID_INICIO, ID_FINAL, DESCRIPCION_POLIGONO,
              LONGITUD: widgetAddAtributes.data.areaLong?widgetAddAtributes.data.areaLong.result.lengths[0]:0,
              AREA_M2: widgetAddAtributes.data.areaLong?widgetAddAtributes.data.areaLong.result.areas[0]:0
             }
          } else {
            createDialogInformacionGeneral("Nota","Todos los atributos son requeridos");
            return false;
          }
        },
        _deleteGeomtryesSelected: function(){
          
          const esriMapGraphics = EsriMap.graphics.graphics.filter(e => (e.attributes !== undefined && e.geometry.type == consts.GEOMETRIAS.POLIGONO));
          // const toDeleteGeometriesOriginations = esriMapGraphics.filter(g => !g.attributes.tipo); // los q se emplean para elminiar de la DB
          const toDeleteGeometriesOriginations = [], toDeleteGeometriesOriginations1 = [];  // los q se emplean para elminiar de la DB          
          objEdicionCartografica.geometriesSeleccionados.forEach(e => toDeleteGeometriesOriginations.push(esriMapGraphics.filter(f1 => (f1.attributes.OBJECTID === e.attributes.OBJECTID && (!f1.attributes.tipo || f1.attributes.tipo != 3)&&(f1.geometry.type==consts.GEOMETRIAS.POLIGONO)))));
          toDeleteGeometriesOriginations.forEach(e=>e.forEach(el => toDeleteGeometriesOriginations1.push(el)))
          objEdicionCartografica.toDeleteGeometriesOriginations1 = toDeleteGeometriesOriginations1;
          /* 
            se suspenden estas logicas para ser ejecutadas cuando el usuario se valla por guardar geometrias
            widget EdicionCartografica linea 414 y 426
           */
          /* toDeleteGeometriesOriginations1.forEach(async tdgo => {
            const data = {
              objectIds: tdgo.attributes.OBJECTID,
              where : `ID_PROYECT = '${tdgo.attributes.ID_PROYECT}'`
            }
            url=urlPost_deleteFeatures_PuntosLineasPoligonos.poligono;
            const resp = await postDeleteGeomtry(url,data);
            console.log(resp);
          }); */

          const toPersistirGeometriFution = esriMapGraphics.filter(g => g.attributes.tipo==3) // para persistir
          objEdicionCartografica.toPersistirGeometriFution = toPersistirGeometriFution;
          /*toPersistirGeometriFution.forEach(async tpgf => {
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
              const resp = await postData(urlToPersistir_AddAtributes, data);
              console.log(resp);
          }); */
            
          // const toRemoveGeometriVisor = esriMapGraphics.filter(g => g.attributes.tipo==2 || !g.attributes.tipo);
          // toRemoveGeometriVisor.forEach(toRemove => EsriMap.graphics.remove(toRemove))
          toDeleteGeometriesOriginations1.forEach(toRemove => EsriMap.graphics.remove(toRemove))
          objEdicionCartografica.geometriesSeleccionados=[]
          objEdicionCartografica.graficosSeleccionados=[]
        },
        formarJsonToPersistir_addAtributes: async function () {
          try {
            const {ID_PUNTO, ID_PREDIO, ACOMPANANTE, OBSERVACIONES, FECHA_CAPTURA, FUNCIONARIO_SAE, FIRMA, DESCRIPCION_PUNTO,
              ID_INICIO, ID_FINAL, DESCRIPCION_POLIGONO, LONGITUD, AREA_M2} = this._validarAtributos();
            let features = [
              {
                attributes: {
                  "ID_PROYECT": Number(objEdicionCartografica.ID_PROYECT),
                  ID_PREDIO,
                  "ACOMPANIAN":ACOMPANANTE,
                  "OBSERVACIO":OBSERVACIONES,
                  "FUNCIONARI":FUNCIONARIO_SAE,
                  FIRMA,
                  // FECHA_CAPTURA: Number(new Date(FECHA_CAPTURA.split('-').map(e => Number(e)).join('-')))
                  FECHA_CAPTURA
                },
                geometry:widgetAddAtributes.data.evt.geometry,
              }
            ];
            if (widgetAddAtributes.data.evt.geometry.type == consts.GEOMETRIAS.PUNTO) {
              features[0].attributes.ID_PUNTO = ID_PUNTO;
              features[0].attributes.DESCRIPCIO = DESCRIPCION_PUNTO;            
            } else if (widgetAddAtributes.data.evt.geometry.type == consts.GEOMETRIAS.LINEA) {
              features[0].attributes.LONGITUD = LONGITUD;
            } else if (widgetAddAtributes.data.evt.geometry.type == consts.GEOMETRIAS.POLIGONO) {
              features[0].attributes.ID_INICIO = ID_INICIO;            
              features[0].attributes.ID_FINAL = ID_FINAL;            
              features[0].attributes.DESCRIPCIO = DESCRIPCION_POLIGONO;
              features[0].attributes.AREA_M2 = AREA_M2;
            }
            const data = { features }
            const resp = await postData(urlToPersistir_AddAtributes, data);
            console.log(resp);
            if (resp) {
            // if (1) {
              thisAddAtributes.pasoDespuesDeCapturarAtributos(); // pinta grafic con sus atributos
              createDialogInformacionGeneral("!Felicitaciones¡",`La geometría fue creada, recuerda guardar para ver, editar o eliminar, la geometria creada`);
              // EsriMap.graphics.clear(); // limpia todos los grapghics presentes en el visor
              thisAddAtributes._renderFrontToQueryProyect();
              cerrarWidgetResultados(consts.widgetAddAtributesPanel, false)
            } else {
              createDialogInformacionGeneral("!Atención¡","No se logró crear la geometría, intentalo luego o comunicate con tecnología");
            }
            loader2(false)
          } catch (error) {
            createDialogInformacionGeneral("!Atención¡","No se logró crear la geometría, intentalo luego o comunicate con tecnología");
          }          
        },
        _renderFrontToQueryProyect: function () {
          document.getElementById("idHerramientas").style.display = "flex";
          document.getElementById("unir").style.display = "none";
          document.getElementById("crear").style.display = "none";
          document.getElementById("guardar").style.display = "none";
          document.getElementById("exportar").style.display = "none";
          // document.getElementById("btnAceptar").style.display = "none";
          document.getElementById("editar").style.display = "none";
          document.getElementById("regresar").style.display = "none";
        }  
        
        
    })
});