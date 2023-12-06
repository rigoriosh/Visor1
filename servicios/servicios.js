const OG_Rancheria_Microfocalización_ICBF = "https://mapassig.icbf.gov.co:6443/arcgis/rest/services/ICBF/Sistema_Nacional/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&f=pjson";
const Municipio_generalizado = "https://mapassig.icbf.gov.co:6443/arcgis/rest/services/ICBF/Sistema_Nacional/MapServer/2/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&f=pjson";
// SERVICIO_TABLA_CONTENIDO = "http://190.85.164.56:90/ADMINSERV/AdminGeoApplication/AdminGeoWebServices/getTablaContenidoJsTree/public";
// SERVICIO_TABLA_CONTENIDO = "http://190.255.42.26:90/ADMINSERV/AdminGeoApplication/AdminGeoWebServices/getTablaContenidoJsTree/public";
// SERVICIO_TABLA_CONTENIDO = "https://sig.icbf.gov.co/Icbf.SIG.Service/AdministradorServicios.svc";
// SERVICIO_TABLA_CONTENIDO = "http://localhost:3000/ADMINSERV/AdminGeoApplication/AdminGeoWebServices/getTablaContenidoJsTree/public";
SERVICIO_TABLA_CONTENIDO = "http://172.17.3.143:8090/ADMINSERV/AdminGeoApplication/AdminGeoWebServices/getTablaContenidoJsTree/public";

// const SERVICIO_SHAPEFILE = "http://172.17.3.142:6080/arcgis/rest/services/ICBF/exportarSHAPE/GPServer/exportarSHAPE";
const SERVICIO_SHAPEFILE = "https://mapassig.icbf.gov.co:6443/arcgis/rest/services/ICBF/exportarSHAPE/GPServer/exportarSHAPE";
const urlGetPuntosLineasPoligonos =[
  "https://sae.igac.gov.co/arcgis/rest/services/SAE/EDICION1/MapServer/0",
  "https://sae.igac.gov.co/arcgis/rest/services/SAE/EDICION1/MapServer/1",
  "https://sae.igac.gov.co/arcgis/rest/services/SAE/EDICION1/MapServer/2"
];
const urlPostEditPuntosLineasPoligonos =[
  "https://sae.igac.gov.co/arcgis/rest/services/SAE/EDICION1/FeatureServer/0/updateFeatures",
  "https://sae.igac.gov.co/arcgis/rest/services/SAE/EDICION1/FeatureServer/1/updateFeatures",
  "https://sae.igac.gov.co/arcgis/rest/services/SAE/EDICION1/FeatureServer/2/updateFeatures"
];
const urlPost_AddFeatures_PuntosLineasPoligonos = {
  punto:"https://sae.igac.gov.co/arcgis/rest/services/SAE/EDICION1/FeatureServer/0/addFeatures",
  linea:"https://sae.igac.gov.co/arcgis/rest/services/SAE/EDICION1/FeatureServer/1/addFeatures",
  poligono:"https://sae.igac.gov.co/arcgis/rest/services/SAE/EDICION1/FeatureServer/2/addFeatures"
}
const urlPost_deleteFeatures_PuntosLineasPoligonos = {
  punto:"https://sae.igac.gov.co/arcgis/rest/services/SAE/EDICION1/FeatureServer/0/deleteFeatures",
  linea:"https://sae.igac.gov.co/arcgis/rest/services/SAE/EDICION1/FeatureServer/1/deleteFeatures",
  poligono:"https://sae.igac.gov.co/arcgis/rest/services/SAE/EDICION1/FeatureServer/2/deleteFeatures"
}
const servConsultaSimple = [
    {
        value: "https://sae.igac.gov.co/arcgis/rest/services/SAE/ADICIONALES_IGAC_RURAL/MapServer",
        label: "RURAL"
    },
    {
      value: "https://sae.igac.gov.co/arcgis/rest/services/SAE/ADICIONALES_IGAC_URBANO/MapServer",
      label: "URBANO"
    },
    {
      value: "https://sae.igac.gov.co/arcgis/rest/services/SAE/OTROS/MapServer",
      label: "OTROS"
    },
    {
      value: "https://sae.igac.gov.co/arcgis/rest/services/SAE/PREDIOS_SAE/MapServer",
      label: "PREDIOS_SAE"
    }
    /* ,
    {
        // value: "http://172.17.3.205:6080/arcgis/rest/services/SAE/PREDIOS_SAE/MapServer",
        // value: "https://172.17.3.205:6443/arcgis/rest/services/SAE/PRUEBA/MapServer",
        // label: "SAE/PRUEBA"
    },
    {
        // value: "https://172.17.3.205:6443/arcgis/rest/services/SAE/PREDIOS_SAE/MapServer",
        // value: "https://sae.igac.gov.co/arcgis/rest/services/SAE/PREDIOS_SAE/MapServer",
        
        // value: "http://localhost:3000/arcgis/rest/services/SAE/PREDIOS_SAE/MapServer",
        // label: "Cartografía Básica"
    },
    {
        // value: "https://172.17.3.205:6443/arcgis/rest/services/SAE/OTROS/MapServer",
        // label: "Capas adicionales"
    } */
]

const servConsultaSAvanzada = {
    "urlServicios": [
      {
        "url": "https://172.17.3.205:6443/arcgis/rest/services/SAE/PRUEBA/MapServer",
        "nombreMostrar": "SAE/PRUEBA"
      },
      {
        "url": "https://sae.igac.gov.co/arcgis/rest/services/SAE/PREDIOS_SAE/MapServer",
        "nombreMostrar": "Cartografía Básica"
      }
  ]
  };

                            
const urlTiposBienInmueble = "http://localhost:3000/baseAvaluos"; //pruebas locales

const endPoints = {
    departamentos: "https://mapassig.icbf.gov.co:6443/arcgis/rest/services/ICBF/Sistema_Nacional/MapServer/0"
}

const fileName = "BASE_REGISTRO_R1R2";
const fileNameBaseAvaluos = "BASE_AVALUOS";
const servicioSNRalfanumerico = "https://sae.igac.gov.co/alfanumericosae/Sae.SIG.RestFileExcel/api/ArchivoExcel/?columnName="
// const servicioSNRalfanumerico = "http://localhost:61025/api/ArchivoExcel/?columnName="
const servicioSNRgeometrias = "https://sae.igac.gov.co/alfanumericosae/Sae.SIG.RestGestor/api/Gestor/";
// const servicioSNRgeometrias = "http://localhost:53906/api/Gestor/?municipio=";

const UrlGetByFmi = "http://utilidades.apipreprod.saesas.gov.co:4444/ServGeoPortal/api/FuenteGeoPortal/GetByFmi/";
const servicio_GetByidDepartamento = "http://utilidades.apipreprod.saesas.gov.co:4444/ServGeoPortal/api/FuenteGeoPortal/GetByidDepartamento/11?Usuario=mcortes&Clave=Junio2023*+";
const servicio_GetByidRegional = "http://utilidades.apipreprod.saesas.gov.co:4444/ServGeoPortal/GetByidRegional/1";
const servicio_GetByidMunicipio = "http://utilidades.apipreprod.saesas.gov.co:4444/ServGeoPortal/api/FuenteGeoPortal/GetByidMunicipio/";