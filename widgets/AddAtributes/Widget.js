// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

//>>built
var widgetAddAtributes = {}, mythis;;

define(["dojo/_base/declare", "jimu/BaseWidget", "dojo/query", "esri/InfoTemplate",
"esri/graphic", "esri/geometry/geometryEngine","esri/SpatialReference", "esri/geometry/Point",
"esri/geometry/Polygon","esri/symbols/SimpleFillSymbol","esri/symbols/SimpleLineSymbol",
"esri/Color"],
function (declare, BaseWidget, query, InfoTemplate, Graphic, geometryEngine, SpatialReference, Point,
  Polygon, SimpleFillSymbol, SimpleLineSymbol, Color) {

    
     return declare([BaseWidget], {
        baseClass: "jimu-widget-AddAtributes",
        
        startup: function() {
          mythis = this;
          //console.log("AddAtributes");
          this.inherited(arguments);
          // this.mapIdNoderrh.innerHTML = 'map id is:' + this.map.id;

          query("#agregarGeometria").on("click", async function (evt) {
            //pendiente validar los campos ingresados en el form de atributos
            if (mythis._validarAtributos()) {
              mythis.pasoDespuesDeCapturarAtributos();
              cerrarWidgetResultados(consts.widgetAddAtributesPanel, false)
              console.log("alistar gemetrias para persistir")
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
              const { PUNTO, PREDIO } = objEdicionCartografica.attibutesSelected;
              let infoTemplate = new InfoTemplate(`Punto: ${PUNTO} <br> Predio: ${PREDIO} `);
              objEdicionCartografica.attibutesSelected.tipo=3;
              objEdicionCartografica.attibutesSelected.uuid=generateUUID();              
              EsriMap.graphics.add(new Graphic(polygon, symbol, objEdicionCartografica.attibutesSelected, infoTemplate));
              mythis._deleteGeomtryesSelected();
              cerrarWidgetResultados(consts.widgetAddAtributesPanel, false);
              loader2(false)
              createDialogInformacionGeneral("! Información", "Geomtrías unidas");
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
          }else{
            document.getElementById("attributesToSelect").style.display = 'none';
            document.getElementById("divAddAtributes").style.display = 'block';
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
        },
        pasoDespuesDeCapturarAtributos: function () {
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
          const {ID_PUNTO, ID_PREDIO, ACOMPANANTE, DESCRIPCION, OBSERVACIONES, FECHA_CAPTURA, FUNCIONARIO_SAE, FIRMA} = attributes;
          let infoTemplate = new InfoTemplate(`Punto: ${ID_PUNTO} <br> Predio: ${ID_PREDIO} `);
          let attr = {
            "PUNTO": ID_PUNTO,
            "PREDIO":ID_PREDIO,
            "ACOMPAÑANTE":ACOMPANANTE,
            "DESCRIPCION":DESCRIPCION,
            "OBSERVACIONES":OBSERVACIONES,
            "FECHA_CAPTURA":FECHA_CAPTURA,
            "FUNCIONARIO_SAE":FUNCIONARIO_SAE,
            "FIRMA":FIRMA,
            "tipo":1,
            "uuid":generateUUID()
          };

          return { infoTemplate, attr}
        },
        _validarAtributos: function(){
          const ID_PUNTO = document.getElementById("ID_PUNTO").value.trim();
          const ID_PREDIO = document.getElementById("ID_PREDIO").value.trim();
          const ACOMPANANTE = document.getElementById("ACOMPAÑANTE").value.trim();
          const DESCRIPCION = document.getElementById("DESCRIPCION").value.trim();
          const OBSERVACIONES = document.getElementById("OBSERVACIONES").value.trim();
          const FECHA_CAPTURA = document.getElementById("FECHA_CAPTURA").value.trim();
          const FUNCIONARIO_SAE = document.getElementById("FUNCIONARIO_SAE").value.trim();
          const FIRMA = document.getElementById("FIRMA").value.trim();
          if (ID_PUNTO && ID_PREDIO && ACOMPANANTE && DESCRIPCION && OBSERVACIONES && FECHA_CAPTURA && FUNCIONARIO_SAE && FIRMA) {
            return {ID_PUNTO, ID_PREDIO, ACOMPANANTE, DESCRIPCION, OBSERVACIONES, FECHA_CAPTURA, FUNCIONARIO_SAE, FIRMA}
          } else {
            createDialogInformacionGeneral("Nota","Todos los atributos son requeridos");
            return false;
          }
        },
        _deleteGeomtryesSelected: function(){
          let geoDelete  = EsriMap.graphics.graphics.slice(1).filter( gd =>  gd.attributes !== undefined);
          objEdicionCartografica.geometriesSeleccionados.forEach(e=>{
            geoDelete  = geoDelete.filter( gd =>  e.attributes.tipo == gd.attributes.tipo)
            console.log(geoDelete)
            geoDelete.forEach(td => EsriMap.graphics.remove(td))    
          })
          objEdicionCartografica.graficosSeleccionados.forEach(e=>{
            const geoDelete  = EsriMap.graphics.graphics.slice(1).filter( gd =>  e.attributes.uuid == gd.attributes.uuid)
            console.log(geoDelete)
            geoDelete.forEach(td => EsriMap.graphics.remove(td))    
          })
          objEdicionCartografica.geometriesSeleccionados=[]
          // objEdicionCartografica.graficosSeleccionados=[]
        }
        
        
    })
});