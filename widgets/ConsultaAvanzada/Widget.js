define(['dojo/_base/declare', 'jimu/BaseWidget', "dojo/_base/json",
    "dojo/_base/array", "dojo/string", "esri/request", "dojo/domReady!",
    "jimu/WidgetManager"],
  function(declare, BaseWidget, WidgetManager) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget], {
      // Custom widget code goes here

      //baseClass: 'jimu-widget-mywidget'

      //this property is set by the framework when widget is loaded.
      name: 'ConsultaAvanzada',


      //methods to communication with app container:

      // postCreate: function() {
      //   this.inherited(arguments);
      //   console.log('postCreate');
      // },

      startup: function() {
        // this.inherited(arguments);
        // this.mapIdNode.innerHTML = 'map id:' + this.map.id;
        // console.log('startup');
        obtenerApp(this);
      },

      onOpen: function() {

        html = "";
        var servicios = {
          "urlServicios": [
            {
              "url": "http://172.17.3.59:85/ArcGIS2/rest/services/QuindioFaseII/CartografiaBasica1_Nuevo/MapServer?f=json",
              "nombreMostrar": "CARTOGRAFÍA BÁSICA"
            },
            {
              "url": "http://172.17.3.142:6080/arcgis/rest/services/QUINDIO_III/Ambiental/MapServer?f=json",
              "nombreMostrar": "AMBIENTAL"
            },
            {
              "url": "http://172.17.3.59:85/ArcGIS2/rest/services/QuindioFaseII/Educacion_T/MapServer?f=json",
              "nombreMostrar": "EDUCACIÓN"
            },
            {
              "url": "http://172.17.3.59:85/ArcGIS2/rest/services/QuindioFaseII/Salud_T/MapServer?f=json",
              "nombreMostrar": "SALUD"
            },
            {
              "url": "http://172.17.3.59:85/ArcGIS2/rest/services/QuindioFaseII/CulturaTurismo_T/MapServer?f=json",
              "nombreMostrar": "CULTURA Y TURISMO"
            }
		]
        };

        html += "<option value=" + 'Seleccione...' + ">" +
          'Seleccione...' + "</option>"

        for (var i in servicios.urlServicios) {
          html += "<option value=" + servicios.urlServicios[i].url +
            ">" + servicios.urlServicios[i].nombreMostrar + "</option>"
        }

        document.getElementById("selectServiciosCA").innerHTML = html;

        var divCarga = document.getElementById("loading");
        divCarga.style.visibility = 'hidden';
      },

      // onClose: function(){
      //   console.log('onClose');
      // },

      // onMinimize: function(){
      //   console.log('onMinimize');
      // },

      // onMaximize: function(){
      //   console.log('onMaximize');
      // },

      // onSignIn: function(credential){
      //   /* jshint unused:false*/
      //   console.log('onSignIn');
      // },

      // onSignOut: function(){
      //   console.log('onSignOut');
      // }

      // onPositionChange: function(){
      //   console.log('onPositionChange');
      // },

      // resize: function(){
      //   console.log('resize');
      // }

      //methods to communication between widgets:
    });
  });

var objetoGrupos = [];
var objetoCapas = [];
var objetoCampos = [];
var aplicacion = null;

function obtenerSelects(select) {
  require(["jimu/WidgetManager", "jimu/PanelManager", "esri/graphic",
      "esri/geometry/Extent", "esri/SpatialReference"],
    function(WidgetManager, PanelManager, Graphic, Extent, SpatialReference) {
      var valorSeleccionado = null;
      var urlPeticion = null;
      var divGrupos = document.getElementById("divGrupos");
      html = "";

      if (select == "servicios") {
        var numOptionSelectGrupos = document.getElementById("selectGruposCA")
          .options.length;
        var numOptionSelectCapa = document.getElementById("selectCapasCA").options
          .length;
        var numOptionSelectCamposCapa = document.getElementById(
          "selectCamposCA").options.length;
        var numOptionSelectValoresCapa = document.getElementById(
          "selectValoresCA").options.length;

        if (numOptionSelectGrupos != 0 || numOptionSelectCapa != 0 ||
          numOptionSelectCamposCapa != 0 || numOptionSelectValoresCapa != 0) {
          document.getElementById("selectGruposCA").options.length = 0;
          document.getElementById("selectCapasCA").options.length = 0;
          document.getElementById("selectCamposCA").options.length = 0;
          document.getElementById("selectValoresCA").options.length = 0;
        }

        var selectServicios = document.getElementById("selectServiciosCA");
        valorSeleccionado = selectServicios.options[selectServicios.selectedIndex]
          .value;
        urlPeticion = valorSeleccionado;
        objetoGrupos = [];
        objetoCapas = [];

        var divCarga = document.getElementById("loading");
        // divCarga.style.display = 'block';
        divCarga.style.visibility = 'visible';

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", urlPeticion, false);
        xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
              if (xmlhttp.responseText) {
                eval("jsonRespuesta=" + xmlhttp.responseText);
                console.log(jsonRespuesta);

                for (var x in jsonRespuesta.layers) {
                  if (jsonRespuesta.layers[x].subLayerIds != null) {
                    llenarObjetoGrupos(jsonRespuesta.layers[x].id,
                      jsonRespuesta.layers[x].name);
                  } else {
                    if (jsonRespuesta.layers[x].subLayerIds == null) {
                      llenarObjetoCapas(jsonRespuesta.layers[x].id,
                        jsonRespuesta.layers[x].name, jsonRespuesta.layers[
                          x].parentLayerId);
                    }
                  }
                }
              }
            } else {
              console.log('Error: ' + xmlhttp.statusText)
            }
          }
        }
        xmlhttp.send();

        divCarga.style.visibility = 'hidden';
        // divCarga.style.display = 'none';

        if (objetoGrupos.length != 0) {
          console.log("HAY GRUPOS...");
          divGrupos.style.visibility = 'visible';

          html += "<option value=" + 'Seleccione...' + ">" + 'Seleccione...' +
            "</option>"
          for (var i in objetoGrupos) {
            html += "<option value=" + objetoGrupos[i].idGrupo + ">" +
              objetoGrupos[i].nombreGrupo + "</option>"
          }
          document.getElementById("selectGruposCA").innerHTML = html;
        } else {
          console.log("NO HAY GRUPOS...");
          divGrupos.style.visibility = 'hidden';

          html += "<option value=" + 'Seleccione...' + ">" + 'Seleccione...' +
            "</option>"
          for (var z in objetoCapas) {
            html += "<option value=" + objetoCapas[z].idCapa + ">" +
              objetoCapas[z].nombreCapa + "</option>"
          }
          document.getElementById("selectCapasCA").innerHTML = html;
        }
      } else if (select == "grupos") {

        var numOptionSelectCamposCapa = document.getElementById(
          "selectCamposCA").options.length;
        var numOptionSelectValoresCapa = document.getElementById(
          "selectValoresCA").options.length;

        if (numOptionSelectCamposCapa != 0 || numOptionSelectValoresCapa != 0) {
          console.log("HAY QUE BORRAR ELEMENTOS...");
          document.getElementById("selectCamposCA").options.length = 0;
          document.getElementById("selectValoresCA").options.length = 0;
        }

        var selectGrupos = document.getElementById("selectGruposCA");
        valorSeleccionado = selectGrupos.options[selectGrupos.selectedIndex].value;

        html += "<option value=" + 'Seleccione...' + ">" + 'Seleccione...' +
          "</option>"
        for (var z in objetoCapas) {
          if (objetoCapas[z].grupoPadre == valorSeleccionado) {
            html += "<option value=" + objetoCapas[z].idCapa + ">" +
              objetoCapas[z].nombreCapa + "</option>"
          }
        }
        document.getElementById("selectCapasCA").innerHTML = html;

        var panelManager = PanelManager.getInstance();
        var widgetCerrar = PanelManager.getInstance().getPanelById(
          "widgetResultados_panel");

        if (widgetCerrar != undefined) {
          panelManager.closePanel("widgetResultados_panel");
          panelManager.destroyPanel("widgetResultados_panel");
        }

        var capaCA = aplicacion.map.getLayer("capaResultadoCA");

        if (capaCA != undefined) {
          aplicacion.map.removeLayer(capaCA);
          aplicacion.map.graphics.clear();

          var startExtent = new Extent(-9990876.058960484, -679950.551177913, -
            6272979.0031705005, 1545895.712485828,
            new SpatialReference({
              wkid: 102100
            }));

          aplicacion.map.setExtent(startExtent);
        } else {
          console.log("NO EXISTE LA CAPA......");
        }
      } else if (select == "capas") {
        var selectCapas = document.getElementById("selectCapasCA");
        var selectServicios = document.getElementById("selectServiciosCA");
        valorSeleccionado = selectCapas.options[selectCapas.selectedIndex].value;
        var urlServicioSeleccionado = selectServicios.options[selectServicios
          .selectedIndex].value;
        var urlFormatear = urlServicioSeleccionado.indexOf("?");
        var urlPeticionCampos = urlServicioSeleccionado.substring(0,
          urlFormatear) + "/" + valorSeleccionado;


        var numOptionSelectCamposCapa = document.getElementById(
          "selectCamposCA").options.length;
        var numOptionSelectValoresCapa = document.getElementById(
          "selectValoresCA").options.length;

        if (numOptionSelectCamposCapa != 0 || numOptionSelectValoresCapa != 0) {
          console.log("HAY QUE BORRAR ELEMENTOS...");
          document.getElementById("selectCamposCA").options.length = 0;
          document.getElementById("selectValoresCA").options.length = 0;
        }

        obtenerCamposCapa(urlPeticionCampos);
        document.getElementById("textCondicionBusqueda").value = "";

        var panelManager = PanelManager.getInstance();
        var widgetCerrar = PanelManager.getInstance().getPanelById(
          "widgetResultados_panel");

        if (widgetCerrar != undefined) {
          panelManager.closePanel("widgetResultados_panel");
          panelManager.destroyPanel("widgetResultados_panel");
        }

        var capaCA = aplicacion.map.getLayer("capaResultadoCA");

        if (capaCA != undefined) {
          aplicacion.map.removeLayer(capaCA);
          aplicacion.map.graphics.clear();

          var startExtent = new Extent(-9990876.058960484, -679950.551177913, -
            6272979.0031705005, 1545895.712485828,
            new SpatialReference({
              wkid: 102100
            }));

          aplicacion.map.setExtent(startExtent);
        } else {
          console.log("NO EXISTE LA CAPA......");
        }

      } else if (select == "campos") {
        var selectCampos = document.getElementById("selectCamposCA");
        var textConsulta = document.getElementById("textCondicionBusqueda");
        valorSeleccionado = selectCampos.options[selectCampos.selectedIndex].value;

        var selectCapas = document.getElementById("selectCapasCA");
        valorSeleccionadoCapas = selectCapas.options[selectCapas.selectedIndex]
          .value;

        var selectServicios = document.getElementById("selectServiciosCA");
        var urlServicioSeleccionado = selectServicios.options[selectServicios
          .selectedIndex].value;
        var urlFormatear = urlServicioSeleccionado.indexOf("?");
        var urlPeticionCampos = urlServicioSeleccionado.substring(0,
          urlFormatear) + "/" + valorSeleccionadoCapas;
        textConsulta.value += " " + valorSeleccionado;

        var divCarga = document.getElementById("loading");
        divCarga.style.visibility = 'visible';

        obtenerValoresCapa(valorSeleccionado, urlPeticionCampos);

        divCarga.style.visibility = 'hidden';

      } else {
        var selectValores = document.getElementById("selectValoresCA");
        var textConsulta = document.getElementById("textCondicionBusqueda");
        valorSeleccionado = selectValores.options[selectValores.selectedIndex]
          .text;
        textConsulta.value += " " + "'" + valorSeleccionado + "'";
      }
    });
}

function llenarObjetoGrupos(id, nombre) {
  objetoGrupos.push({
    idGrupo: id,
    nombreGrupo: nombre
  });
}

function llenarObjetoCapas(id, nombre, grupoPadre) {
  objetoCapas.push({
    idCapa: id,
    nombreCapa: nombre,
    grupoPadre: grupoPadre
  });
}

function obtenerCamposCapa(urlPeticion) {
  require(["dojo/_base/json", "dojo/_base/array", "dojo/string", "esri/request",
      "dojo/domReady!"],
    function(dojoJson, array, dojoString, esriRequest) {

      var divCarga = document.getElementById("loading");
      divCarga.style.visibility = 'visible';

      var requestHandle = esriRequest({
        "url": urlPeticion,
        "content": {
          "f": "json"
        },
        "callbackParamName": "callback"
      });
      requestHandle.then(requestSucceeded, requestFailed);

      function requestSucceeded(response, io) {
        var fieldInfo, pad;
        pad = dojoString.pad;

        for (var x in response.fields) {
          html += "<option value=" + response.fields[x].name + ">" + response
            .fields[x].name + "</option>"
          objetoCampos.push(response.fields[x].name);

        }
        document.getElementById("selectCamposCA").innerHTML = html;
        divCarga.style.visibility = 'hidden';
      }

      function requestFailed(error, io) {
        console.log("ERROR EN LA PETICION...");
        divCarga.style.visibility = 'hidden';
      }
    });
}


function obtenerValoresCapa(campo, url) {
  require(["esri/tasks/query", "esri/tasks/QueryTask"], function(Query,
    QueryTask) {

    var queryTask = new QueryTask(url);
    var query = new Query();

    var divCarga = document.getElementById("loading");
    divCarga.style.visibility = 'visible';

    query.returnGeometry = true;
    query.outFields = [campo];
    query.where = "1=1";
    queryTask.execute(query, showResults);

    function showResults(results) {
      var resultItems = [];
      var resultadosFinal = [];
      var resultCount = results.features.length;
      for (var i = 0; i < resultCount; i++) {
        var featureAttributes = results.features[i].attributes;
        for (var attr in featureAttributes) {
          resultItems.push("<option value=" + featureAttributes[attr] + ">" +
            featureAttributes[attr] + "</option>");
        }
      }

      resultadosFinal = resultItems.filter(function(item, pos) {
        return resultItems.indexOf(item) == pos;
      });

      document.getElementById("selectValoresCA").innerHTML =
        resultadosFinal;
      divCarga.style.visibility = 'hidden';
    }
  });
}

function borrarTextAreaConsulta() {
  var textConsulta = document.getElementById("textCondicionBusqueda");
  textConsulta.value = "";
}

function obtenerBotonesConsulta(texto) {
  var textConsulta = document.getElementById("textCondicionBusqueda");

  if (texto == "LIKE") {
    textConsulta.value += " " + texto;
  } else if (texto == "AND") {
    textConsulta.value += " " + texto;
  } else if (texto == "OR") {
    textConsulta.value += " " + texto;
  } else if (texto == "NOT") {
    textConsulta.value += " " + texto;
  } else if (texto == "IS") {
    textConsulta.value += " " + texto;
  } else if (texto == "NULL") {
    textConsulta.value += " " + texto;
  } else if (texto == "=") {
    textConsulta.value += " " + texto;
  } else if (texto == "<>") {
    textConsulta.value += " " + texto;
  } else if (texto == ">") {
    textConsulta.value += " " + texto;
  } else if (texto == "<") {
    textConsulta.value += " " + texto;
  } else if (texto == ">=") {
    textConsulta.value += " " + texto;
  } else if (texto == "<=") {
    textConsulta.value += " " + texto;
  }
}

function obtenerApp(app) {
  aplicacion = app;
}

function ejecutarConsulta() {
  require(["esri/tasks/query", "esri/tasks/QueryTask"], function(Query,
    QueryTask) {


    var divCarga = document.getElementById("loading");
    // divCarga.style.display = 'block';
    divCarga.style.visibility = 'visible';

    var textExpresion = document.getElementById("textCondicionBusqueda").value;
    var urlConsulta = document.getElementById("selectServiciosCA").value;
    var capaSeleccionada = document.getElementById("selectCapasCA").value;
    var urlFormatear = urlConsulta.indexOf("?");
    var urlPeticionConsulta = urlConsulta.substring(0, urlFormatear) + "/" +
      capaSeleccionada;
    var queryTask = new QueryTask(urlPeticionConsulta);

    var query = new Query();
    query.returnGeometry = true;
    query.outFields = objetoCampos;
    query.where = textExpresion;
    queryTask.execute(query, showResults);

    function showResults(results) {
      var objetoLocalResults = null;
      // console.log(results);
      objetoLocalResults = results;

      cargarWidgetResultados(objetoLocalResults);
    }
  });
}

function cargarWidgetResultados(resultados) {
  var divCarga = document.getElementById("loading");
  // divCarga.style.visibility = 'visible';

  require(["jimu/WidgetManager", 'jimu/BaseWidget'], function(WidgetManager,
    BaseWidget) {
    // var wm = WidgetManager.getInstance().getWidgetById('widgetResultados');
    // WidgetManager.getInstance().openWidget(widget);
    var urlConsulta = document.getElementById("selectServiciosCA").value;
    var urlFormatear = urlConsulta.indexOf("?");
    var capaSeleccionada = document.getElementById("selectCapasCA").value;
    var urlPeticionConsulta = urlConsulta.substring(0, urlFormatear) + "/" +
      capaSeleccionada;
    var textExpresion = document.getElementById("textCondicionBusqueda").value;

    aplicacion.appConfig.getConfigElementById('widgetResultados').resultados =
      resultados;
    aplicacion.appConfig.getConfigElementById('widgetResultados').urlCapa =
      urlPeticionConsulta;
    aplicacion.appConfig.getConfigElementById('widgetResultados').camposMostrar =
      objetoCampos;
    aplicacion.appConfig.getConfigElementById('widgetResultados').expresionConsultar =
      textExpresion;
    aplicacion.appConfig.getConfigElementById('widgetResultados').operacionRealizar =
      "consultas";

    var widget = aplicacion.appConfig.getConfigElementById(
      'widgetResultados');
    var widgetId = widget.id;
    console.log(resultados);

    aplicacion.openWidgetById(widgetId);
  });
  divCarga.style.visibility = 'hidden';
}