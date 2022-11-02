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
            style: "width: 50%; font: message-box; text-align: center;"
        });
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
            let RS = feature.geometry.spatialReference;
            let R = feature.geometry.rings            
            var b = {rings:[R]}
            b.spatialReference = {wkid: RS.wkid}
        poligono = new Polygon(RS);       
        poligono.addRing(R)      
        if(poligono.getCentroid() == null){
            poligono = new Polygon(b)
        }
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