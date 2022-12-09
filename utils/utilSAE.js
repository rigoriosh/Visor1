var loading = document.getElementById("loading")

var loadHtml = document.createElement('div');
loadHtml.innerHTML = '<img id="gifLoader" class="spinner" src="images/loadingCapa.gif" alt="SIG SAE"/>';

function showLoader(idPage) { //metodo que se encarga de mostrar el icono de loader
    document.getElementById("main-page").appendChild(loadHtml);
}

function ejecutarConsulta(url) { //metodo que genera consulta y retorna info en json
    let a = fetch(url)
        .then(data => { return data.json() })
        .catch(() => {            
            createDialogInformacionGeneral(`Fallo comunicación','Por favor intentalo mas tarde ó comunicate con el administrador`)
        });
    return a;
}

function createDialogInformacionGeneral(titulo, contenido) {
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
    console.log(di);
    di = di.length;
    console.log(di);
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

function crearPoligono(feature) {
    //sirve para obtener el centroide
    var poligono    
    require([
        "esri/geometry/Polygon", "esri/SpatialReference"], function(Polygon, SpatialReference) {
            /* let RS = feature.geometry.spatialReference;
            let R = feature.geometry.rings            
            var b = {rings:[R]}
            b.spatialReference = {wkid: RS.wkid}
        poligono = new Polygon(RS);       
        poligono.addRing(R)      
        if(poligono.getCentroid() == null){
            poligono = new Polygon(b)
        } */
        poligono = new Polygon(new SpatialReference({wkid:4326}));
        poligono.addRing([[-180,-90],[-180,90],[180,90],[180,-90],[-180,-90]]);
      });
      return poligono
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
        console.log(params.name);
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
    console.log("renderModal")
    let myModal = document.getElementById(modal);
    if (render) {
        myModal.style.display = 'block';
        myModal.className += " show"
    }else{
        myModal.style.display = 'none';
        myModal.className =  "modal fade"
    }
    document.getElementById("exampleModalLabel").innerHTML = titulo;
    document.getElementById("bodyModal").innerHTML = body
}

const pintarFeatureLayer = (url, id, map) => {//pintar capa
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
        console.log(5555)  
        // map.setExtent(featureLayer.initialExtent)  
    });
    return featureLayer;
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
                            console.log(outputpoint)
                            EsriMap.graphics.add(outputpoint)
                            EsriMap.setExtent(outputpoint.geometry.getExtent())
                        }); */
                    }
                    
                    if (element.geometry.type == "polygon") {
                        myGraphic.symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_LONGDASHDOT, new Color([255, 0, 0, 1]), 3), new Color([255, 128, 0, 0.15]));
                    } else if (element.geometry.type == "point") {
                        myGraphic.symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 0, 0.3]), 10), new Color([0, 255, 0, 1]));
                    }
                    (map.graphics != undefined) ? map.graphics.add(myGraphic) : EsriMap.graphics.add(myGraphic);    
                    return myGraphic;                
                }
            });
            /* if (featureSet.features.length > 1) {
                setTimeout(() => {
                    EsriMap.setExtent(featureSet.features[0].geometry.getExtent())
                    EsriMap.setScale(90000);
                    
                }, 1000);
            } */
        })
}

const abrirWidgetResultados = (data) => {
    var widget = appGlobal.appConfig.getConfigElementById(consts.widgetMyResultados);
    var widgetId = widget.id;
    widget.data = data;
    appGlobal.openWidgetById(widgetId);
}

function cerrarWidgetResultados() {
    require(["jimu/PanelManager"],
        function (PanelManager) {
            /////codigo q cierra el widgetResultados
            // this.widgetResultados.cerradoManual = 0;
            var panelManager = PanelManager.getInstance();
            var widgetCerrar;            
            for (var e in PanelManager.getInstance().panels) {
                if (PanelManager.getInstance().panels[e].id == consts.widgetMyResultadosPanel) {
                    widgetCerrar = PanelManager.getInstance().panels[e].id;
                }

            }            
            var ajustar = true;
            if (widgetCerrar != undefined) {
                panelManager.closePanel(consts.widgetMyResultadosPanel);
                panelManager.destroyPanel(consts.widgetMyResultadosPanel);             
                ajustar = false;


                /* var currentLayer = appGlobal.map.getLayer("capaResultadoCA");
                if (currentLayer != null) {
                    appGlobal.map.removeLayer(currentLayer);
                } */
            }
            widgetOpen = false;
            appGlobal.map.graphics.clear()
            appGlobal.map.setExtent(appGlobal.map._initialExtent);
            // console.log("cerrarWidgetResultados");
        }
      )
};

const exportarShape = (featureDataSet) => {

    /* 
        ejemplo featureDataSet
        featureDataSet = {
            features:[],
            geometryType:"",
            spatialReference:{}
        }
     */

    require(["esri/tasks/Geoprocessor",], function (Geoprocessor,) {
        document.getElementById("loadingResultados").style.display = 'flex';
        document.getElementById("loadingResultados").style.zIndex = 1;
        var gp = new Geoprocessor(SERVICIO_SHAPEFILE);
        let parametros = {featureDataSet};
        console.log(parametros)
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
            } else {
                createDialogInformacionGeneral("Error", "No se pudo generar el archivo Shape")
            }
            document.getElementById("loadingResultados").style.display = 'none';
        }

        function errorExportarShapeCompleto(e) {
            document.getElementById("loadingResultados").style.display = 'none';
            createDialogInformacionGeneral("Error", consts.notas.consultaSimple[0].body);
        }

    });


}

function consultaCapasSegunTematica(_this, obj) { // implementado en consulta Simple y Avanzada
        // console.log(_this)
        // console.log(obj)
        let select = _this.attributes.id.nodeValue;
        selAtributos = document.getElementById(select);
    
        let urlSel = _this.value;
      
        // document.getElementById("palabraClave").value = "";
        // selAtributos.options.length = 0;
        if (urlSel !== '0') {
    
            require([ "esri/request" ], function (esriRequest) {
                var lasCapas = "";
               
                loading.style.display = 'flex';
    
    
                var layersRequest = esriRequest({
                    url: urlSel,
                    content: { f: "json" },
                    handleAs: "json",
                    callbackParamName: "callback"
                });
                layersRequest.then((response) =>
                    requestSucceeded(response),
                    function (error) {
                        console.log("Error: ", error.message);
                        createDialogInformacionGeneral(consts.notas.consultaSimple[0].titulo, consts.notas.consultaSimple[0].body)
                        loading.style.display = 'none';
                    });
    
                function requestSucceeded(response) {
                    if (response.hasOwnProperty("layers")) {
    
                        var layerInfo = [];
                        var pad;
                        pad = dojo.string.pad;
                        layerInfo = dojo.map(response.layers, function (f) {
                            // return pad(f.id, 2, " ", true) + "/" + pad(f.name, 8, " ", true).trim() + "/" + pad(f.subLayerIds, 25, " ", true).trim();
                            return pad(f.id, 2, " ", true).trim() + "/" + pad(f.name, 8, " ", true).trim() + "/" + pad(f.subLayerIds, 25, " ", true).trim();
                        });
                        lasCapas = layerInfo;
                        var todo = [];
                        for (var i = 0; i < lasCapas.length.toString(); i++) {
                            var capa = [];
                            capa = lasCapas[i].split("/");
                            todo.push(capa);
                        }
    
                        if (todo.length>0) {
                            insetarCapas(todo, "selCapasCA");
                        } else {
                            createDialogInformacionGeneral(consts.notas.consultaSimple[0].titulo, 'Esta temática no contiene capas a mostrar')
                        }
                    }
                    loading.style.display = 'none';
                }
    
            });
        } else {
            selCapas.options.length = 0;
            obj = {
                atributo: '',
                capaSelected: {},
                palabraClave: '',
                urlCapa: ''
            }
        }
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

/* function consultaAtributosSegunCapa(selGrupos, selCapas, selServicios, objConsulta) { // implementado en consulta Simple y Avanzada

    let capaSeleccionado = selGrupos.value.trim();
    document.getElementById("palabraClave").value = "";
    if (capaSeleccionado !== 'Seleccione...') {
        require([
            "esri/request"
        ], function (esriRequest) {

            // selCapas.options.length = 0;
            // txtCampos.options.length = 0;
            // selValores.options.length = 0;
            // document.getElementById("palabraClave").value = "";
            // consultarCapas(urlCapa);

            loading.style.display = 'flex';

            let urlCapa = selServicios.value + "/" + capaSeleccionado;
            
            // pintarFeatureLayer("https://mapassig.icbf.gov.co:6443/arcgis/rest/services/ICBF/Administrativo/MapServer/4", 'test', EsriMap);
            pintarFeatureLayer(urlCapa, objConsulta.nameObjConsulta, EsriMap);

            objConsulta.urlCapa = urlCapa;
            // const queryAtributos =  await ejecutarConsulta(urlCapa);
            // console.log(queryAtributos)

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
                console.log(response)
                fixAttributesToShow(response.fields, "selAtributosCA");
            }
        }

        )
    } else {
        objConsultaSimple.urlCapa = '';
        objConsultaSimple.capaSelected = {};
    }

} */

/* function fixAttributesToShow(fields, select) { // implementado en consulta Simple y Avanzada
    let fieldsToShow = fields.filter(e => (e.name !== 'OBJECTID_1' && e.name !== 'OBJECTID' && e.name !== 'Shape_Leng'
        && e.name !== 'Shape' && e.name !== 'Shape.STArea()' && e.name !== 'Shape.STLength()'
        && e.name !== 'SHAPE_Leng' && e.name !== 'SHAPE' && e.name !== 'SHAPE.STArea()' && e.name !== 'SHAPE.STLength()'));
    let finalFieldsToShow = [];
    fieldsToShow.forEach(fts => {
        finalFieldsToShow.push(fts.name)
    });
    agregarDataSelect2(finalFieldsToShow, select)

    loading.style.display = 'none';

} */

/* const ejecutarQueryAndQueryTask = (objConsulta) => {
    const {urlCapa, atributo} = objConsulta;
    require(["esri/tasks/query", "esri/tasks/QueryTask"], function (Query, QueryTask) {
        let queryTask = new QueryTask(urlCapa);
        let query = new Query();
        let where = '1=1';
        query.outSpatialReference = EsriMap.spatialReference;
        query.returnGeometry = true;
        query.where = where;
        query.outFields = [atributo];
        // query.outFields = [objConsultaSimple.atributo + ", OBJECTID"];
        // query.outFields = ["*"];
        queryTask.execute(query, succeededRequest, errorRequest);
    })
} */
    
/* const succeededRequest = (response) => {
    console.log(response)
}

const errorRequest = (error) => {
    console.log(error)
} */