// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

//>>built
var appGlobal;
define(["dojo/_base/declare", "jimu/BaseWidget", "dojo/query"],
    function (declare, BaseWidget, query) {
        return declare([BaseWidget], {
            baseClass: "jimu-widget-ConsultaCatastro",
            widgetConsCatastro: {},

            startup: function () {
                this.inherited(arguments);
                appGlobal = this;
                //console.log(appGlobal);

                query("#IdFMI").on("change", async function (evt) {
                    const value = evt.target.value;
                    console.log(">>>>> value fmi change " + value);
                    appGlobal.widgetConsCatastro = {
                        ...appGlobal.widgetConsCatastro,
                        nomColumna: "FMI",
                    }
                    //console.log(appGlobal.widgetConsCatastro);
                });
                query("#IdNPN").on("change", async function (evt) {
                    const value = evt.target.value;
                    appGlobal.widgetConsCatastro = {
                        ...appGlobal.widgetConsCatastro,
                        nomColumna: "NPN",

                    }
                    //console.log(appGlobal.widgetConsCatastro);
                });
                query("#IdChip").on("change", async function (evt) {
                    const value = evt.target.value;
                    appGlobal.widgetConsCatastro = {
                        ...appGlobal.widgetConsCatastro,
                        nomColumna: "CHIP",
                    }
                    //console.log(appGlobal.widgetConsCatastro);
                });

                query("#idValorColumna").on("change", async function (evt) {
                    const value = evt.target.value;
                    appGlobal.widgetConsCatastro = {
                        ...appGlobal.widgetConsCatastro,
                        valorColumna: value,
                    }
                    //console.log(appGlobal.widgetConsCatastro);
                });

                query("#btnConsultaCatastro").on("click", async function (evt) {
                    //console.log(appGlobal.widgetConsCatastro);

                    appGlobal.ejecutarConsultaCatastro({
                        tipoResultado: consts.consulCatastro,
                        data: {
                            panel: {
                                width: 1000,
                                height: 300,
                            }
                        }
                    })

                    //pintarPredio();
                });

            },
            onOpen: function () {
                var panel = this.getPanel();
                ajustarTamanioWidget(panel, panel.position.width, 338)

            },
            onClose: function () {
                document.getElementById("idValorColumna").value = "";
                document.getElementById("IdFMI").checked = false;
                document.getElementById("IdNPN").checked = false;
                document.getElementById("IdChip").checked = false;
                cerrarWidgetResultados("widgets_ConsultaCatastro_Widget_38");
                cerrarWidgetResultados("widgets_TablaResultadoSae_Widget_63");
            },

            ejecutarConsultaCatastro: function (data) {

                var nomColumna = appGlobal.widgetConsCatastro.nomColumna;
                var valorColumna = appGlobal.widgetConsCatastro.valorColumna;
                var nomArchivo = "BASE_REGISTRO_R1R2";

                if (!Boolean(nomColumna) && !Boolean(valorColumna)) {
                    alert("Debe selecionar una opcion de de consulta y digitar el numero.");
                } else if (!Boolean(valorColumna)) {
                    alert("Número no puede ser vacio.");
                } else if (!Boolean(nomColumna)) {
                    alert("Debe selecionar una opcion de de consulta.");
                }
                //appGlobal.callSrvR1R2();

                var url = "http://localhost:61025/api/ArchivoExcel/?columnName=nomColumna&columnValue=valorColumna&fileName=nomArchivo";
                url = url.replace("nomColumna", nomColumna);
                url = url.replace("valorColumna", valorColumna);
                url = url.replace("nomArchivo", nomArchivo);

                var whereExpression = nomColumna + " = '" + valorColumna + "'";

                $.ajax({
                    cache: true,
                    type: "GET",
                    url: url,
                    timeout: 10000,
                    contentType: "application/javascript",
                    dataType: "json",
                    async: false,
                    success: function (result) {
                        appGlobal.ServiceSucceeded(result, whereExpression);
                       
                    },
                    error: function (xhr, status, error) {
                        appGlobal.ServiceFailed(xhr);
                        //alert(">>> " + error + " status:" + status + " xhr:" + xhr);
                    }
                });
            },

            ServiceSucceeded: function (result, whereExpression) {
                console.log(">>> ServiceSucceeded: " + result)

                abrirTablaResultadosSae({
                    prmts: {
                        panel: {
                            width: 700,
                            height: 500
                        },
                        json: JSON.stringify(result),
                        //json: result
                        fuente: "ConsultaCatastro"
                    }
                });
                //var nomMcpio = JSON.stringify(result).MPIO_NOM;
                var nomMcpio = result.MPIO_NOM;
                pintarPredio(nomMcpio,whereExpression);
            },
            ServiceFailed: function (xhr) {
                console.log(">>> ServiceFailed: " + xhr)
                alert("No se logro realizar la consulta. Revise su coneccion");
            },
        })
    });

function pintarPredio(nomMcpio, where) {
    require([
        "esri/layers/FeatureLayer",
        "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol",
        "esri/renderers/SimpleRenderer", "esri/graphic", "esri/InfoTemplate",
        "esri/Color",
        "dijit/popup",
        "esri/geometry/Point",
        "esri/tasks/query"

    ], function (
        FeatureLayer,
        SimpleFillSymbol, SimpleLineSymbol,
        SimpleRenderer, Graphic, InfoTemplate,
        Color,
        dijitPopup,
        Point,
        Query

    ) {
        console.log(">>> pintarPredio.. ");

        idCapa = "layerPredio";
        var url = getUrlGestor(nomMcpio);

        dptoActivo = "";

        var idLayer = idCapa.toString();
        var infoTemplate = new InfoTemplate("${FMI}", "${*}");

        if (url.indexOf("/featureserver") > 0 || url.indexOf("/MapServer") > 0) {
            var layerPredio = new FeatureLayer(url, {
                id: idLayer,
                mode: FeatureLayer.MODE_SNAPSHOT, //
                outFields: ["FMI", "ID_ACTIVO", "DPTO", "MPIO", "SUBTIPO", "ACTIVO_SO", "ESTADO_OC", "Shape_Leng"],
                //outFields: ["*"],
                infoTemplate: infoTemplate
            });
            console.log(">>> setDefinitionExpression.. where " + where);

            layerPredio.setDefinitionExpression(where);

            var symbol = new SimpleFillSymbol(
                SimpleFillSymbol.STYLE_SOLID,
                new SimpleLineSymbol(
                    SimpleLineSymbol.STYLE_SOLID,
                    new Color([255, 255, 255, 0.35]),
                ),
                new Color([255, 0, 0, 0.35]) 
            );

            layerPredio.setRenderer(new SimpleRenderer(symbol));
            appGlobal.map.addLayer(layerPredio);

            var query = new Query();
            query.geometry = appGlobal.map.extent;
            query.returnGeometry = true;
            query.outFields = ["*"];

            layerPredio.queryFeatures(query, function (featureSet) {
                var polygon = featureSet.features[0].geometry;
                var polygonExtent = polygon.getExtent();

                var x = polygonExtent.xmin;
                var y = polygonExtent.ymin;
                var spRef = polygonExtent.spatialReference;

                console.log("polygonExtent", polygonExtent);
                appGlobal.map.setExtent(polygonExtent)
                //setReferenciaEspacial(spRef, x, y); // ok
                //appGlobal.map.setZoom(16);  // ok
            });
        }
    })
}

function getUrlGestor(nomMcpio) {

    var url = "http://localhost:53906/api/Gestor/?municipio=nomMunicipio";
    url = url.replace("nomMunicipio", nomMcpio);
    var myJson;

    $.ajax({
        cache: true,
        type: "GET",
        url: url,
        timeout: 10000,
        contentType: "application/javascript",
        dataType: "json",
        async: false,
        success: function (result) {
            myJson = result;
        },
        error: function (xhr, status, error) {
            appGlobal.ServiceFailed(xhr);
        }
    });
    return myJson.URL;
}

function setReferenciaEspacial(spRef, coorXx, coorYy) {
    require([
        "esri/geometry/Point",
        "esri/SpatialReference",
        "esri/tasks/GeometryService",
    ], function (
        Point,
        SpatialReference,
        GeometryService,
    ) {

        console.log(">>> setReferenciaEspacial: " + spRef + " " + coorX + " " + coorY)
//        var spatialRef = new SpatialReference(spRef); // ok
        var spatialRef = new SpatialReference({ wkid: 102100, latestWkid: 3857 }); // ok

        var transf = true;
        var coorX = -8438942.670452103; // ok tomados del extend xmax
        var coorY = 521681.3028855363; // ok tomados del extend ymax

        if (transf) {
            geometryService = new GeometryService("https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
            var loc = new Point(coorX, coorY, spatialRef);
            geometryService.project([loc], spatialRef, function (projectedPoints) {
                pt = projectedPoints[0];
                attr = { "Xcoord": loc.x, "Ycoord": loc.y };
                appGlobal.map.centerAt(pt);
            });
        }
    })
}

