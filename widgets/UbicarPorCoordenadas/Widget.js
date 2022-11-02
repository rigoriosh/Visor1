var map;
define(['dojo/_base/declare', 'jimu/BaseWidget',
  'dojo/on',
  "dojo/query",
  "esri/SpatialReference",
  "esri/geometry/Point",
  "esri/tasks/GeometryService",
  "esri/layers/GraphicsLayer",
  "esri/InfoTemplate",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/symbols/SimpleFillSymbol",
  "esri/graphic",
  "esri/layers/LayerInfo",
  "esri/symbols/TextSymbol",
  "esri/symbols/Font",
  "dojo/_base/array",
  "dojo/number",
  "esri/Color",
  "esri/request",
  "esri/geometry/Extent",

  "dojo/domReady!"],
  function(declare, BaseWidget,
    on,
    query,
    SpatialReference,
    Point,
    GeometryService,
    GraphicsLayer,
    InfoTemplate,
    SimpleMarkerSymbol,
    SimpleLineSymbol,
    SimpleFillSymbol,
    Graphic,
    LayerInfo,
    TextSymbol,
    Font,
    array,
    number,
    Color,
    esriRequest,
    Extent

    ) {
    var capaGrafica = new GraphicsLayer();
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget], {

      // Custom widget code goes here

  //    baseClass: 'jimu-widget-ubicarPorCoordenas'

      //this property is set by the framework when widget is loaded.
      name: 'UbicarPorCoordenas',


      //methods to communication with app container:

      postCreate: function() {
        this.inherited(arguments);
        //console.log('postCreate');

        map = this.map;
      },

      startup: function() {
       this.inherited(arguments);
       //this.mapIdNode.innerHTML = 'map id:' + this.map.id;
       //console.log('startup');

          //



/* 
                       var panel = this.getPanel();
                       panel.position.width = 530;
                       panel.position.height = 400;
                       panel._originalBox = {
                           w: panel.position.width,
                           h: panel.position.height,
                           l: panel.position.left || 0,
                           t: panel.position.top || 0
                       };
                       panel.setPosition(panel.position);
                       panel.panelManager.normalizePanel(panel); */



          //
       query("#ubicar").on("click", function (evt) {
          var spatialRef = new SpatialReference({ wkid: 4326 });
          var spatialRef3115 = new SpatialReference(3115);          
          if (mostrarCoorPlanas) {
              var coorX = parseInt(document.getElementById("coorX").value);
              var coorY = parseInt(document.getElementById("coorY").value);
               geometryService = new GeometryService("https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
              //gsvc = new GeometryService("http://200.21.93.53/ArcGIS/rest/services/Quindio_Fase_II/Geometry/GeometryServer");
               var loc = new Point(coorX, coorY, spatialRef3115);
              geometryService.project([loc], spatialRef, function (projectedPoints) {
                  pt = projectedPoints[0];               
                  attr = { "Xcoord": loc.x, "Ycoord": loc.y };
                  dibujarPunto(pt, attr);
              });
          } else {
              var gradosLati = document.getElementById("grados").value;
              var minuLati = document.getElementById("minutos").value;
              var segunLati = document.getElementById("Segundos").value;
              var gradosLongi = document.getElementById("grados1").value;
              var minuLongi = document.getElementById("minutos1").value;
              var segunLongi = document.getElementById("Segundos1").value;
              if (gradosLongi < 0) {
                  longitud = -((segunLongi / 3600) * 1) - ((minuLongi / 60) * 1) + (1 * gradosLongi);
              } else {
                  longitud = (gradosLongi * 1) + ((minuLongi * 1) / 60) + ((segunLongi * 1) / 3600);
              }
              if (gradosLati < 0) {
                  latitud = -((segunLati / 3600) * 1) - ((minuLati / 60) * 1) + (1 * gradosLati);
              } else {
                  latitud = (gradosLati * 1) + ((minuLati * 1) / 60) + ((segunLati * 1) / 3600);
              }             
              var loc = new Point(longitud, latitud, spatialRef);
              var attr = {
                  "Latitud": "° " + gradosLati + " ' " + minuLati + " '' " + segunLati,
                  "Longitud": "° " + gradosLongi + " ' " + minuLongi + " '' " + segunLongi
              };
              dibujarPunto(loc, attr);
          }
      });
       query("#Borrar").on("click", function (evt) {
         // capaGrafica.clear();
         map.graphics.clear();
         realizarConsultaServicio();

      });
      },

      onOpen: function(){
        //console.log('onOpen');
        var panel = this.getPanel();
        ajustarTamanioWidget(panel, 530, 400)
      },

      onClose: function(){
        //console.log('onClose');
      },

      onMinimize: function(){
        //console.log('onMinimize');
      },

      onMaximize: function(){
        //console.log('onMaximize');
      },

      onSignIn: function(credential){
        /* jshint unused:false*/
        //console.log('onSignIn');
      },

      onSignOut: function(){
        //console.log('onSignOut');
      },

      onPositionChange: function(){
        //console.log('onPositionChange');
      },

      resize: function(){
        //console.log('resize');
      }

     // methods to communication between widgets:

    });

    


function dibujarPunto(loc, attr) {
  //map.graphics.clear();
  //map.addLayer(capaGrafica);   
  //var infoTemplate = new InfoTemplate("Coordenadas");
  //capaGrafica.setInfoTemplate(infoTemplate);  
  var symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 0, 0.3]), 10), new Color([0, 255, 0, 1]));
  //var symbol = new SimpleMarkerSymbol();
  var newPunto = new Graphic(loc, symbol, attr);  

  map.graphics.add(newPunto);
  //geometryService.simplify([loc], colocaTextoPunto);
  var newZoom = 5000;  
  map.setScale(newZoom);
  //capaGrafica.add(newPunto);
  map.centerAt(loc);    
  colocaTextoPunto(loc, attr);
};

function colocaTextoPunto(geometries, attr){    
  var labelPoint = geometries;
  var font = new Font("20px", Font.STYLE_NORMAL, Font.VARIANT_NORMAL, Font.WEIGHT_BOLDER);
  if (attr.Xcoord != undefined) {
    var textSymbol = new TextSymbol("X: " + attr.Xcoord + ", Y: " + attr.Ycoord, font, new Color([0, 72, 132, 1]));
  }else{
    var textSymbol = new TextSymbol("Latitud: " + attr.Latitud + ", Longitud: " + attr.Longitud, font, new Color([0, 72, 132, 1]));
  }    
  var labelPointGraphic = new Graphic(labelPoint, textSymbol);
  map.graphics.add(labelPointGraphic);  
}   

function realizarConsultaServicio() {
  var url = "http://172.17.3.59:85/ArcGIS2/rest/services/QuindioFaseII/CartografiaBasica1_Nuevo/MapServer?f=json";
  var requestHandle = esriRequest({
    "url": url
  });
  requestHandle.then(requestSucceeded, requestFailed);  
}
function requestSucceeded(response, io) {
  ajustarExtend(response);  
}

function ajustarExtend(response) {
  var spatialRef = new SpatialReference({ wkid: 102100 });
  var extent = response.fullExtent;
  var spatialRef1 = new SpatialReference(3115);
  gsvc = new GeometryService("https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
  var extent2 = new Extent(extent.xmin, extent.ymin, extent.xmax, extent.ymax, spatialRef1);
  gsvc.project([extent2], spatialRef, function (projectedPoints) {        
    pt = projectedPoints[0];
    var extentconver = new Extent(pt.xmin, pt.ymin, pt.xmax, pt.ymax, spatialRef);
    map.setExtent(extentconver);
  });
}

function requestFailed(error, io) {
  //console.log(error);    
}





});

function toggle(elemento) {
  if (elemento.value == "ingresarPlanas") {
      document.getElementById("planas").style.display = "block";
      document.getElementById("Geog").style.display = "none";
      document.getElementById("botonBorrar").style.display = "flex";
      mostrarCoorPlanas = true;
  } else if (elemento.value == "ingresarGeograficas") {
      document.getElementById("planas").style.display = "none";
      document.getElementById("Geog").style.display = "block";
      document.getElementById("botonBorrar").style.display = "flex";
      mostrarCoorPlanas = false;
  }
}