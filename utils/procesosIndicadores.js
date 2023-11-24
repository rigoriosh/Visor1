const srvSae = {
    urlSrvGestorCatastral : "http://localhost:53906/api/Gestor/?municipio=nomMunicipio",
    getByidMunicipio : "http://utilidades.apipreprod.saesas.gov.co:4444/ServGeoPortal/api/FuenteGeoPortal/GetByidMunicipio/25815?Usuario=cflorez&Clave=Junio2023*+",
}

const filtarPorPropiedadValor = (array, propiedad, query) => {
    const q = query.toString().toLowerCase();
    //return array.filter(element => element[propiedad].toString().toLowerCase().includes(query))
    //return array.filter(element => element[propiedad].toString().toLowerCase().includes(q))
    return array.filter(element => element[propiedad].toString().toLowerCase() === q)
    //return array.filter(element => element[propiedad].includes(query))
};
const contarPorTematica = (filtrado, propiedad) => {

    var contadores = {};
    var totales = configWidget.Data.Totales;

    for (var i = 0; i < filtrado.length; i++) {
        if (!contadores.hasOwnProperty(filtrado[i][propiedad])) {
            contadores[filtrado[i][propiedad]] = 0;
        }
        contadores[filtrado[i][propiedad]]++;
    }
    totales.features[0].attributes.TotalSubtipo = contadores.RURAL;
    totales.features[1].attributes.TotalSubtipo = contadores.URBANO;

    return totales;
}
const acumularValor = (filtrado, propiedad, propAcumular) => {

    var contadores = {};
    var totales = configWidget.Data.Totales;

    for (var i = 0; i < filtrado.length; i++) {
        if (!contadores.hasOwnProperty(filtrado[i][propiedad])) {
            contadores[filtrado[i][propiedad]] = 0;
        }
        contadores[filtrado[i][propiedad]] += filtrado[i][propAcumular];
    }
    totales.features[0].attributes.TotalSubtipo = contadores.RURAL;
    totales.features[1].attributes.TotalSubtipo = contadores.URBANO;

    return totales;
}

const getResultFromFecth = async (url, method='GET') => {
    try {
        const response = await fetch(url, {
            method: method,
        });
        if (response.status === 400 || response.status === 404) return response
            const resp = await response.json(); // parses JSON response into native JavaScript objects 
            //const resp = response; // parses JSON response into native JavaScript objects 
            return resp;
    } catch (error) {
        console.error({ error });
        return error;
    }
}

const createfeatureSet = (features) => {
    var featureSetInd;
    require(["esri/graphic", "esri/tasks/FeatureSet", "esri/geometry/Point"],
        function (Graphic, FeatureSet, Point,) {
            //console.log("Creating a featureSet")
            const graphics = [];
            //features.forEach(element => {
            features.attributes.forEach(element => {
                //console.log(ele);
                var graphic = new Graphic({
                    //geometry: ele.geometry,
//                    geometry: new Point({ x: -100, y: 38 }), // por cumplir
                    geometry: null,
                    //attributes: ele.attributes
                    attributes: element
                });
                graphics.push(graphic);
            });
            featureSetInd = new FeatureSet();
            featureSetInd.features = graphics;
        })
    return featureSetInd;
}

function setSpatialReference(spRef, coorX, coorY) {
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
        //var coorX = -8438942.670452103; // ok tomados del extend xmax
        //var coorY = 521681.3028855363; // ok tomados del extend ymax

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


