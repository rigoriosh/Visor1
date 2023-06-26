var loading = document.getElementById("loading")
// 
// JSON.stringify(EsriMap.graphics.graphics[1].geometry.rings[0]) // toma los rings de un map grafic

var loadHtml = document.createElement('div');
loadHtml.innerHTML = '<img id="gifLoader" class="spinner" src="images/loadingCapa.gif" alt="SIG SAE"/>';

function showLoader(idPage) { //metodo que se encarga de mostrar el icono de loader
    console.log("showLoader");
    document.getElementById("main-page").appendChild(loadHtml);
}

function loader2(activar, load="loader_2") {
    const loader = document.getElementById(load);
    loader.style.display = activar?"flex":"none";
}

function ejecutarConsulta(url) { //metodo que genera consulta y retorna info en json
    let a = fetch(url)
        .then(data => { return data.json() })
        .catch(() => {            
            createDialogInformacionGeneral(`Fallo comunicación','Por favor intentalo mas tarde ó comunicate con el administrador`)
        });
    return a;
}

function createDialogInformacionGeneral(titulo="", contenido="") {
    require(["dijit/Dialog", "dojo/domReady!"], function (Dialog) {
        myDialogOT = new Dialog({
            title: titulo,
            content: contenido,
            style: "width: 50%; font: message-box; text-align: center;;"
        });
        myDialogOT.title.fontcolor('red')
        myDialogOT.title.fontsize('50px')
        myDialogOT.show();
        setTimeout(() => {
            myDialogOT.hide()
          }, 5000);
    });
}

/* const agregarDepartSelect = (depart, select, campo) => {
    const sDepart = document.getElementById(select);
    if (depart[0].attributes.DEPARTAMEN != "Seleccione") sDepart.options[sDepart.options.length] = new Option("Seleccione...", 0);
    depart.forEach(({attributes}) => {
        sDepart.options[sDepart.options.length] = new Option(attributes.DEPARTAMEN, attributes.COD_DEPART)
    });
}; */

const agregarDataSelect = (data, selec, campo1, campo2) => {
    const select = document.getElementById(selec);
    select.options.length = 0;
    if (data.length < 1) {select.options[select.options.length] = new Option("Seleccione...", 0);return}
    if (data[0].attributes[campo1] != "Seleccione") select.options[select.options.length] = new Option("Seleccione...", 0);
    data.forEach(({attributes}) => {
        select.options[select.options.length] = new Option(attributes[campo1], attributes[campo2])
    });
};
const agregarDataSelect2 = (data, selec) => {
    const select = document.getElementById(selec);
    select.options.length = 0;
    if (data[0] != "Seleccione") select.options[select.options.length] = new Option("Seleccione...", 0);
    data.forEach(d => {
        select.options[select.options.length] = new Option(d, d)
    });
};

const agregarDataSelectValueLabel = (data, selec) => {
    const select = document.getElementById(selec);
    select.options.length = 0;
    if (data.length < 1) {select.options[select.options.length] = new Option("Seleccione...", 0);return}
    if (data[0].label != "Seleccione") select.options[select.options.length] = new Option("Seleccione...", 0);
    data.forEach(d => {
        select.options[select.options.length] = new Option(d.label, d.value)
    });
};

const retunMunicipios = (departSelect) => {
    return dataStorage.municipios.filter( e => e.attributes.COD_DEPTO === departSelect)
}

const validarSoloEspacios = (dataIn) => {
    let di = dataIn.trim();
    //console.log(di);
    di = di.length;
    //console.log(di);
    if (di > 0) {
        return true
    } else {
        return false;
    }
}

var grid;
var data_list = [];

function construirTabla(features, div) {
    require(['dojox/grid/DataGrid', 'dojo/data/ItemFileWriteStore', "dojo/_base/lang",
    'dojo/dom', 'dojo/domReady!'],
        function (DataGrid, ItemFileWriteStore, lang, dom) {
            let atributos;
            features[0] == undefined ? atributos = features.attributes : atributos = features[0].attributes
            let nombreColum = Object.keys(atributos);
            var layout;
            data_list = [];
            var data = {
                identifier: "Ítem",
                items: []
            };
            features.forEach(feature => {
                let dato = {};
                let datoLayout = {};
                layout = [{ 'name': 'Ítem', 'field': 'Ítem', 'width': '40px' }];
                nombreColum.forEach(function callback(currentValue, index, array) {
                    if (currentValue != "ESRI_OID" && currentValue != "IdAAVNDistRegional" && currentValue != "OBJECTID" && currentValue != "Codigo"
                    && currentValue != "CodigoMuni") {
                        dato[currentValue] = feature.attributes[currentValue];
                        datoLayout = {
                            name: currentValue,
                            field: currentValue,
                            width: '100px'
                        }
                        layout.push(datoLayout);
                    }
                });
                data_list.push(dato);
            });
            var rows = features.length;
            for (var i = 0, l = data_list.length; i < rows; i++) {
                data.items.push(lang.mixin({ 'Ítem': i + 1 }, data_list[i % l]));
            }
            var store = new ItemFileWriteStore({ data: data });
            if (grid != undefined) {
                grid.destroy()
            }
            grid = new DataGrid({
                id: 'grid',
                rowSelector: '20px',
                structure: layout,
                store: store
            });
            grid.placeAt(div);
            grid.startup();
            // hideLoader();
        })
}

function ajustarTamanioWidget(panel, width, height) {

    panel.position.width = width;
    panel.position.height = height;
    //panel.position.left = 50;
    //panel.position.top = 260;
    panel._originalBox = {
        w: panel.position.width,
        h: panel.position.height,
        l: panel.position.left || 0,
        t: panel.position.top || 0
    };
    panel.setPosition(panel.position);
    panel.panelManager.normalizePanel(panel);

}

function renderGrafico(data, div, width, height) {
    // var chart = echarts.init(dom, 'purple-passion');

    var myChart = echarts.init(document.getElementById(div),null,{
        width,
        height,
        pointerSize: 500
      });

    window.onresize = function() {
        myChart.resize();
    };

    // Display the chart using the configuration items and data just specified.
    myChart.setOption(data);

    myChart.on('click', function(params) {
        // Print name in console
        //console.log(params.name);
    });

    let currentIndex = -1;
          
    setInterval(function() {
        var dataLen = option.series[0].data.length;
        myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: currentIndex
        });
        currentIndex = (currentIndex + 1) % dataLen;
        myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: currentIndex
        });
        myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: currentIndex
        });
    }, 3000);
}

const renderModal = (modal, render, titulo, body) => {
    //console.log("renderModal")
    let myModal = document.getElementById(modal);
    if (render) {
        myModal.style.display = 'block';
        myModal.className += " show"
        document.getElementById("exampleModalLabel").innerHTML = titulo;
        document.getElementById("bodyModal").innerHTML = body
    }else{
        myModal.style.display = 'none';
        myModal.className =  "modal fade"
    }
}

const pintarFeatureLayer = (url, id, map) => {//pintar capa
    console.log("pintarFeatureLayer");
    var featureLayer;
    require(["esri/layers/FeatureLayer"], function (FeatureLayer) {
        featureLayer = new FeatureLayer(url, {
            id: id,
            outFields: ['*'],
            //infoTemplate : new (InfoTemplate),
            mode: FeatureLayer.MODE_AUTO,
            definitionExpression:"1=1",
            visible: true,
            showLabels:true
        });
        map.addLayer(featureLayer);
        map.lastfeatureLayerDrawed = featureLayer;    
        //console.log(5555)  
        // map.setExtent(featureLayer.initialExtent)  
    });
    return featureLayer;
}

const pintarGeometry = (EsriMap, geometry, symbol={}, attributes={}, infoTemplate={}) => {
    require(["esri/symbols/CartographicLineSymbol","esri/graphic", "esri/Color",
    "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol"], 
    function (CartographicLineSymbol, Graphic, Color, SimpleFillSymbol, SimpleLineSymbol) {

        let simbolo = symbol != {} ? new CartographicLineSymbol(
            CartographicLineSymbol.STYLE_SOLID,
            new Color([234,150,10]), 5, 
            CartographicLineSymbol.CAP_ROUND,
            CartographicLineSymbol.JOIN_MITER, 5
        ) : symbol;

        const polygonSymbol = new SimpleFillSymbol(
            SimpleFillSymbol.STYLE_SOLID, 
            new SimpleLineSymbol(
              SimpleLineSymbol.STYLE_DOT, 
              new Color([151, 249, 0, 0.8]),
              3
            ), 
            new Color([151, 249, 0, 0.45])
        );
        
        EsriMap.graphics.add(new Graphic(geometry, simbolo, attributes, infoTemplate));
        
    });
}

const pintarPuntos = (EsriMap, response, symbol={}) => {
    require(["esri/graphic", "esri/layers/GraphicsLayer", "esri/geometry/Point"], 
    function (Graphic, GraphicsLayer, Point) {

        // let capaGrafica = new GraphicsLayer();
        // const simbolo = symbol == {} ? generarSymbol(response.geometryType):symbol;
        response.features.forEach(feature => {
            const simbolo = generarSymbol(response.geometryType);
            let longitud = feature.geometry.x;
            let latitud = feature.geometry.y;
            // let spatialRef = EsriMap.spatialReference
            let spatialRef = feature.geometry.spatialReference
            let loc = new Point(longitud, latitud, spatialRef);
            const INFO_T = buildInfoTemplate("Información Punto",feature.attributes);
            let newPunto = new Graphic(loc, simbolo, feature.attributes, INFO_T);
            // let newPunto = new Graphic(feature.geometry, simbolo, feature.attributes, INFO_T);
            // capaGrafica.add(newPunto);
            // EsriMap.addLayer(capaGrafica);
            EsriMap.graphics.add(newPunto);
            EsriMap.centerAt(loc); 
        })
        // let newPunto = new Graphic(loc, simbolo, attr);
        // let newZoom = 500000;
        // EsriMap.setScale(newZoom);
        
    });
}

const pintarPolyLines = (EsriMap, response, symbol={}) => {
    require(["esri/graphic", "esri/geometry/Polyline"], 
    function (Graphic, Polyline) {

        /* var mypolyline = new Polyline({
            "paths":[
              [
                [-12484306,7244028],
                [-7318386,10061803],
                [-3013453,10727111]
              ]
            ],"spatialReference":{
              "wkid":102100
            }
        });
          var polylineSymbol = new SimpleLineSymbol();
        EsriMap.graphics.add(new Graphic(mypolyline, polylineSymbol)); */
        /* 
            var polylineJson = {
                "paths":[[[-122.68,45.53], [-122.58,45.55],
                [-122.57,45.58],[-122.53,45.6]]],
                "spatialReference":{"wkid":4326}
            };
         */
        response.features.forEach(feature => {
            const simbolo = generarSymbol(response.geometryType);
            let polylineJson = {
                "paths":feature.geometry.paths,
                "spatialReference": feature.geometry.spatialReference
            }            
            const INFO_T = buildInfoTemplate("Información",feature.attributes);
            let polyline = new Polyline(polylineJson)
            let newGeometry = new Graphic(polyline, simbolo, feature.attributes, INFO_T);            
            EsriMap.graphics.add(newGeometry);
        })
    });
}

const pintarPolygons = (EsriMap, response, symbol={}) => {
    require(["esri/graphic", "esri/geometry/Polygon"], 
    function (Graphic, Polygon) {

        response.features.forEach(feature => {
            const simbolo = generarSymbol(response.geometryType);
            let polygonJson = {
                "rings":feature.geometry.rings,
                "spatialReference": feature.geometry.spatialReference
            }            
            const INFO_T = buildInfoTemplate("Información",feature.attributes);
            let poligono = new Polygon(polygonJson);
            let newGeometry = new Graphic(poligono, simbolo, feature.attributes, INFO_T);            
            EsriMap.graphics.add(newGeometry);
        })
    });
}
function crearPoligono(feature) {
    //sirve para obtener el centroide
    var poligono    
    require([
        "esri/geometry/Polygon", "esri/SpatialReference"], function(Polygon, SpatialReference) {
            /* 
                let RS = feature.geometry.spatialReference;
                let R = feature.geometry.rings            
                var b = {rings:[R]}
                b.spatialReference = {wkid: RS.wkid}
                poligono = new Polygon(RS);       
                poligono.addRing(R)      
                if(poligono.getCentroid() == null){
                    poligono = new Polygon(b)
                } 
            */
        poligono = new Polygon(new SpatialReference({wkid:4326}));
        poligono.addRing([[-180,-90],[-180,90],[180,90],[180,-90],[-180,-90]]);
      });
      return poligono
}

const buildInfoTemplate = (titulo, attributes) => {
    let it
    require(["esri/InfoTemplate"], 
    function (InfoTemplate) {
        /* 
            ejemplo
            var json = {
                title:"Attributes",
                content:"State Name: ${STATE_NAME}<br>Population: ${POP2001}"
            }
         */
        let content = ``;
        Object.keys(attributes).forEach(k => content += `<div class="divIT"><p class="fieldIT">${k}:</p> <p class="ITdata">${attributes[k]}</p></div>`)
        let json = {title:titulo, content}
        // ,content:"State Name: ${STATE_NAME}<br>Population: ${POP2001}"}
        it = new InfoTemplate(json);
    });
    return it;
}

function pintarFeaturesConInfoTemplate(featureSet) { //función que se encarga de pintar features
    require(["esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/Color", "esri/graphic",
        "esri/symbols/SimpleFillSymbol", "dijit/TooltipDialog", "esri/InfoTemplate",
        "dojo/dom-construct", "esri/SpatialReference", "esri/geometry/projection"
    ],
        function (SimpleMarkerSymbol, SimpleLineSymbol, Color,
            Graphic, SimpleFillSymbol, TooltipDialog, InfoTemplate,
            domConstruct, SpatialReference, projection) {
            var myGraphic
            featureSet.features.forEach(element => {
                if (element.geometry != undefined) {
                    let f = Object.keys(featureSet.features[0].attributes);
                    let info = '';
                    f.forEach(campo => {
                        if (campo != "ESRI_OID") {
                            info += "<b>" + campo + ": </b>" + element.attributes[campo] + "<br/>"
                        }

                    });
                    if (this.infoTemplate != undefined) {
                        this.infoTemplate.setContent(info);
                        myGraphic = new Graphic({
                            geometry: element.geometry,
                            infoTemplate: this.infoTemplate
                        });                        
                    } else {
                        myGraphic = new Graphic({
                            geometry: element.geometry
                        });
                        /* var outSpatialReference = new SpatialReference({
                            wkid: 4326 //Sphere_Sinusoidal
                           });
                        // myGraphic.geometry = projection.project(myGraphic.geometry, outSpatialReference);
                        var geometryService = new esri.tasks.GeometryService("https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
                        // var inputpoint = new esri.geometry.Point(inlon, inlat, inSR);
                        var PrjParams = new esri.tasks.ProjectParameters();
                        PrjParams.geometries = [myGraphic];
                        PrjParams.outSR = outSpatialReference;
                        PrjParams.transformation = datumtrans != "default" ? {
                            wkid: parseInt(datumtrans, 10)
                        } : null;
                        geometryService.project(PrjParams, function (outputpoint) {
                            //console.log(outputpoint)
                            EsriMap.graphics.add(outputpoint)
                            EsriMap.setExtent(outputpoint.geometry.getExtent())
                        }); */
                    }
                    myGraphic.attributes = element.attributes
                    if (element.geometry.type == "polygon") {
                        myGraphic.symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_LONGDASHDOT, new Color([255, 0, 0, 1]), 3), new Color([255, 128, 0, 0.15]));
                    } else if (element.geometry.type == "point") {
                        myGraphic.symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 0, 0.3]), 10), new Color([0, 255, 0, 1]));
                    }
                    (map.graphics != undefined) ? map.graphics.add(myGraphic) : EsriMap.graphics.add(myGraphic);    
                    return myGraphic;                
                }
            });
            /* if (featureSet.features.length > 0) {
                setTimeout(() => {
                    EsriMap.setExtent(featureSet.features[0].geometry.getExtent())
                    EsriMap.setScale(90000);
                    
                }, 1000);
            } */
        })
}

const abrirWidgetResultados = (data, idWiget=consts.widgetMyResultados) => {
    var widget = appGlobal.appConfig.getConfigElementById(idWiget);
    var widgetId = widget.id;
    widget.data = data;
    appGlobal.openWidgetById(widgetId);
}

function cerrarWidgetResultados(widgetACerrar=consts.widgetMyResultadosPanel, clearGraphics=true) {
    require(["jimu/PanelManager"],
        function (PanelManager) {
            /////codigo q cierra el widgetResultados
            // this.widgetResultados.cerradoManual = 0;
            var panelManager = PanelManager.getInstance();
            var widgetCerrar;            
            for (var e in PanelManager.getInstance().panels) {
                if (PanelManager.getInstance().panels[e].id == widgetACerrar) {
                    widgetCerrar = PanelManager.getInstance().panels[e].id;
                }

            }            
            var ajustar = true;
            if (widgetCerrar != undefined) {
                panelManager.closePanel(widgetACerrar);
                panelManager.destroyPanel(widgetACerrar);             
                ajustar = false;


                /* var currentLayer = appGlobal.map.getLayer("capaResultadoCA");
                if (currentLayer != null) {
                    appGlobal.map.removeLayer(currentLayer);
                } */
            }
            widgetOpen = false;
            if (typeof(appGlobal) !== 'undefined' && clearGraphics) {
                appGlobal.map.graphics.clear()
                appGlobal.map.setExtent(appGlobal.map._initialExtent);
            }
            // //console.log("cerrarWidgetResultados");
        }
      )
};

const exportarShape = (featureDataSet, load) => {

    /* 
        ejemplo featureDataSet
        featureDataSet = {
            features:[],
            geometryType:"",
            spatialReference:{}
        }
     */

    require(["esri/tasks/Geoprocessor",], function (Geoprocessor,) {
        loader2(true, load);
        var gp = new Geoprocessor(SERVICIO_SHAPEFILE);
        let parametros = {featureDataSet};
        //console.log(parametros)
        gp.execute(parametros, exportarShapeCompleto, errorExportarShapeCompleto);

        function exportarShapeCompleto(e) {
            if (e[1].value == true) {
                var link = document.createElement('a');
                link.setAttribute('href', e[0].value.url);
                link.setAttribute('download', 'Shape' + '.zip');
                link.setAttribute('type', "application/zip");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                loader2(false, load)
                createDialogInformacionGeneral("Resultado", "La descarga se realizó correctamente")
            } else {
                createDialogInformacionGeneral("Error", "No se pudo generar el archivo Shape")
                loader2(false, load)
            }
            // document.getElementById("loadingResultados").style.display = 'none';
        }

        function errorExportarShapeCompleto(e) {
            // document.getElementById("loadingResultados").style.display = 'none';
            createDialogInformacionGeneral("Error", consts.notas.consultaSimple[0].body);
            loader2(false, load)
        }

    });


}

function insetarCapas(capas, select) { // implementado en consulta Simple y Avanzada
    selCapas = document.getElementById(select);
    selCapas.options.length = 0;
    // selGrupos.options.length = 0;
    // document.getElementById("grupoLabel").style.display = 'inline';
    // document.getElementById("selGrupos").style.display = 'inline';
    var optsel = document.createElement('option');
    optsel.value = "Seleccione...";
    optsel.text = "Seleccione...";
    selCapas.options.add(optsel);
    // for (var i = 1; i < capas.length; i++) {
    for (var i = 0; i < capas.length; i++) {
        var opt = document.createElement('option');
        opt.value = capas[i][0];
        opt.text = capas[i][1];
        selCapas.options.add(opt);
    }
}

function consultaAtributosSegunCapa(selCapas, selServicios, selAtributos, objConsulta, load) { // implementado en consulta Simple y Avanzada
    console.log("consultaAtributosSegunCapa");
    if(EsriMap.lastfeatureLayerDrawed)EsriMap.removeLayer(EsriMap.lastfeatureLayerDrawed)
    let capaSeleccionado = selCapas.value.trim();
    agregarDataSelectValueLabel([], objConsulta.nameObjConsulta==="ConsultaSimple"?selAtributos:"selValoresCA"); // limpia el campo select
    document.getElementById(objConsulta.nameObjConsulta==="ConsultaSimple"?"palabraClave":"expresion").value = "";
    // document.getElementById("palabraClave").value = "";
    if (capaSeleccionado !== 'Seleccione...') {
        require([
            "esri/request"
        ], function (esriRequest) {

            // selCapas.options.length = 0;
            // txtCampos.options.length = 0;
            // selValores.options.length = 0;
            // document.getElementById("palabraClave").value = "";
            // consultarCapas(urlCapa);

            load.style.display = 'flex';

            let urlCapa = selServicios.value + "/" + capaSeleccionado;
            
            // pintarFeatureLayer("https://mapassig.icbf.gov.co:6443/arcgis/rest/services/ICBF/Administrativo/MapServer/4", 'test', EsriMap);
            pintarFeatureLayer(urlCapa, objConsulta.nameObjConsulta, EsriMap);
            setTimeout(() => {
                if(EsriMap.lastfeatureLayerDrawed._graphicsVal.length > 0 && EsriMap.lastfeatureLayerDrawed._graphicsVal[0].geometry.rings.length > 0){
                    EsriMap.setExtent(EsriMap.lastfeatureLayerDrawed._graphicsVal[0].geometry.getExtent())
                }
            }, 500);

            objConsulta.urlCapa = urlCapa;
            // const queryAtributos =  await ejecutarConsulta(urlCapa);
            // //console.log(queryAtributos)

            var requestHandle = esriRequest({
                "url": urlCapa,
                "content": {
                    "f": "json"
                },
                "callbackParamName": "callback",
            });

            requestHandle.then(requestSucceeded);
            function requestSucceeded(response) {
                objConsulta.capaSelected = response;
                //console.log(response)
                fixAttributesToShow(response.fields, selAtributos, load);
            }
        }

        )
    } else {
        objConsulta.urlCapa = '';
        objConsulta.capaSelected = {};
    }

}

function fixAttributesToShow(fields, select, load) { // implementado en consulta Simple y Avanzada
    let fieldsToShow = fields.filter(e => (e.name !== 'OBJECTID_1' && e.name !== 'OBJECTID' && e.name !== 'Shape_Leng'
        && e.name !== 'Shape' && e.name !== 'Shape.STArea()' && e.name !== 'Shape.STLength()' && e.name !== 'SHAPE_Length'
        && e.name !== 'SHAPE_Leng' && e.name !== 'SHAPE' && e.name !== 'SHAPE.STArea()' && e.name !== 'SHAPE.STLength()'
        && e.name !== 'SHAPE_Area'));
    let finalFieldsToShow = [];
    fieldsToShow.forEach(fts => {
        finalFieldsToShow.push(fts.name)
    });
    agregarDataSelect2(finalFieldsToShow, select)

    load.style.display = 'none';

}

const ejecutarQueryAndQueryTask = (objConsulta, succeededRequest, errorRequest) => {
    const {urlCapa, atributo = '*', where = '1=1', returnGeometry = true} = objConsulta;
    require(["esri/tasks/query", "esri/tasks/QueryTask"], function (Query, QueryTask) {
        let queryTask = new QueryTask(urlCapa);
        let query = new Query();
        query.outSpatialReference = EsriMap.spatialReference;
        query.returnGeometry = returnGeometry;
        query.where = where;
        query.outFields = [atributo];
        // query.outFields = [objConsultaSimple.atributo + ", OBJECTID"];
        // query.outFields = ["*"];
        queryTask.execute(query, succeededRequest, errorRequest);
    })
}

const crearfeatureSet = (features) => {
    var featureSet
    require(["esri/graphic", "esri/tasks/FeatureSet"],
        function (Graphic, FeatureSet) {
            //console.log("Creating a featureSet")
            const graphics = [];
            features.forEach(element => {
                var graphic = new Graphic({
                    geometry: element.geometry,
                    attributes: element.attributes
                });
                graphics.push(graphic);
            });
            featureSet = new FeatureSet();
            featureSet.features = graphics;
        })
    return featureSet;

}

const  generateUUID = () => {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

const generarSymbol = (type) => {
    let symbol
    require(["esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol","esri/Color",
    "esri/symbols/SimpleFillSymbol"],
    function (SimpleMarkerSymbol, SimpleLineSymbol, Color, SimpleFillSymbol) {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        if (type === "point" || type === "multipoint" || type === "esriGeometryPoint") {
            symbol = new SimpleMarkerSymbol(
              SimpleMarkerSymbol.STYLE_CIRCLE,
              10, new SimpleLineSymbol(
                SimpleLineSymbol.STYLE_SOLID,
                new Color([r, g, b, 0.5]),
                10
              ),
              new Color([r, g, b, 0.9]));
        } else if (type === "line" || type === "polyline" || type === "esriGeometryPolyline") {
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
                    new Color([r, g, b, 0.9]), 3), new Color([r, g, b, 0.5]));
        }

    })
    return symbol
}

const ocultarMostrarTootilp = (mostrar) => {
    mostrar
    ?document.getElementsByClassName("esriPopup").item(0).style.display="block"
    :document.getElementsByClassName("esriPopup").item(0).style.display="none"
}

const agruparDataAmostrar = (response, objPadre) => {                    
    let data=[], pad, layerInfo = [];
    pad = dojo.string.pad;

    layerInfo = response.layers.filter(layer => layer.subLayerIds !== null)
    objPadre.layers = layerInfo;
    objPadre.fullLayers = response.layers;
    objPadre.subLayers = [];
    layerInfo.forEach(layer => data.push({label:layer.name,value:layer.id}))

    /* 
        layerInfo = dojo.map(response.layers, function (f) {
            // return pad(f.id, 2, " ", true) + "/" + pad(f.name, 8, " ", true).trim() + "/" + pad(f.subLayerIds, 25, " ", true).trim();
            return pad(f.id, 2, " ", true).trim() + "/" + pad(f.name, 8, " ", true).trim() + "/" + pad(f.subLayerIds, 25, " ", true).trim();
        });
        lasCapas = layerInfo;
        for (var i = 0; i < lasCapas.length.toString(); i++) {
            var capa = [];
            capa = lasCapas[i].split("/");
            todo.push(capa);
        }
    */
    
    
    return data
}

const logicaSelectCapa = (objPadre, selectToLoad) => {
    const fullLayers = objPadre.fullLayers, fullSubLayers = [];
    const subLayerIds = objPadre.fullLayers.filter(cs => cs.id === Number(objPadre.capaSelected))[0].subLayerIds ;
    subLayerIds.forEach(sli => fullSubLayers.push(fullLayers.find(fl => fl.id === sli)));
    objPadre.fullSubLayers = fullSubLayers
    agregarDataSelectValueLabel(ordenarDataSubLayers(fullSubLayers), selectToLoad)
}
const ordenarDataSubLayers = (data) => {
    let dataFix = [];
    data.forEach(dt => dataFix.push({label:dt.name,value:dt.id}))
    return dataFix
}
const randomId = () => {
    const id = Math.round(Number(new Date()) * Math.random())
    return id;
}
const gradosARadianes = (grados) => {
  return grados * Math.PI / 180;
};
const calcularLongitud = (lat1, lon1, lat2, lon2) => {
    // Convertir todas las coordenadas a radianes
  lat1 = gradosARadianes(lat1);
  lon1 = gradosARadianes(lon1);
  lat2 = gradosARadianes(lat2);
  lon2 = gradosARadianes(lon2);
  // Aplicar fórmula
  const RADIO_TIERRA_EN_KILOMETROS = 6371;
  let diferenciaEntreLongitudes = (lon2 - lon1);
  let diferenciaEntreLatitudes = (lat2 - lat1);
  let a = Math.pow(Math.sin(diferenciaEntreLatitudes / 2.0), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(diferenciaEntreLongitudes / 2.0), 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const absoluteValue = Math.abs(RADIO_TIERRA_EN_KILOMETROS * c);
  return absoluteValue;
}
const calcularAreaPoligono = (evtObj, {dataWidget, widgetTarget}) => {
    // calula el area de solo una geometria o poligono
    require(["esri/tasks/AreasAndLengthsParameters", "esri/tasks/GeometryService",],
        function (AreasAndLengthsParameters, GeometryService) {

            let geometryService = new GeometryService("https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer");
            geometryService.on("areas-and-lengths-complete", function (resp) {
                areaLong = resp;
                console.log({resp});
                console.log({evtObj});
                dataWidget.areaLong = resp
                abrirWidgetResultados(dataWidget, widgetTarget)
            });

            let geometry = evtObj.geometry;

            if (geometry) {
                let areasAndLengthParams = new AreasAndLengthsParameters();
                areasAndLengthParams.areaUnit = GeometryService.UNIT_SQUARE_METERS;
                areasAndLengthParams.calculationType = "geodesic";
                geometryService.simplify([geometry], function(simplifiedGeometries) {
                    areasAndLengthParams.polygons = simplifiedGeometries;
                    geometryService.areasAndLengths(areasAndLengthParams);
                });
            }

        })
}

const getAreaPoligon = (poligonos, formarJsonToPersistir) => {
    //    este metodo a diferencial del anterior, calcula areas de varios poligonos
    require(["esri/tasks/AreasAndLengthsParameters", "esri/tasks/GeometryService",],
        function (AreasAndLengthsParameters, GeometryService) {
        
            let fixPoligons = [];
            let geometryService = new GeometryService("https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer");
            geometryService.on("areas-and-lengths-complete", function ({result, target}) {
                console.log({result, target});
                fixPoligons.push(
                    {
                        geometry: poligonos[fixPoligons.length].geometry,
                        attributes:{
                            ...poligonos[fixPoligons.length].attributes,
                            AREA_M2: result.areas[0]
                        }
                    }
                );
                if (fixPoligons.length === poligonos.length) {
                    formarJsonToPersistir([], [], fixPoligons);
                }
            });

            poligonos.forEach(({geometry, attributes}) => {
                console.log({geometry, attributes});
                let areasAndLengthParams = new AreasAndLengthsParameters();
                areasAndLengthParams.areaUnit = GeometryService.UNIT_SQUARE_METERS;
                areasAndLengthParams.calculationType = "geodesic";
                geometryService.simplify([geometry], function(simplifiedGeometries) {
                    areasAndLengthParams.polygons = simplifiedGeometries;
                    geometryService.areasAndLengths(areasAndLengthParams);
                });

            });

        })


  };


const fechaActual = ()=> new Date().toLocaleDateString().split('/').join('-');



