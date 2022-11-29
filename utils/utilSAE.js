console.log("utilsSAE");

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

function cerrarWidgetResultados(wiget) {
    require(["jimu/PanelManager"],
        function (PanelManager) {
            /////codigo q cierra el widgetResultados
            var panelManager = PanelManager.getInstance();
            var widgetCerrar;            
            for (var e in PanelManager.getInstance().panels) {
                if (PanelManager.getInstance().panels[e].id == wiget) {
                    widgetCerrar = PanelManager.getInstance().panels[e].id;
                }

            }            
            var ajustar = true;
            if (widgetCerrar != undefined) {
                panelManager.closePanel(wiget);
                panelManager.destroyPanel(wiget);             
                ajustar = false;

                var currentLayer = appGlobal.map.getLayer("capaResultadoCA");
                if (currentLayer != null) {
                    appGlobal.map.removeLayer(currentLayer);
                }
            }
            widgetOpen = false;
        }
      )
};

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
            mode: FeatureLayer.MODE_ONDEMAND,
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
            EsriMap.setExtent(featureSet.features[0].geometry.getExtent())
            setTimeout(() => {
                EsriMap.setScale(300000);
                
            }, 1000);
        })
}