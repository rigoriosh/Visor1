const OG_Rancheria_Microfocalización_ICBF = "https://mapassig.icbf.gov.co:6443/arcgis/rest/services/ICBF/Sistema_Nacional/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&f=pjson";
const Municipio_generalizado = "https://mapassig.icbf.gov.co:6443/arcgis/rest/services/ICBF/Sistema_Nacional/MapServer/2/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&f=pjson";
// SERVICIO_TABLA_CONTENIDO = "http://190.85.164.56:90/ADMINSERV/AdminGeoApplication/AdminGeoWebServices/getTablaContenidoJsTree/public";
// SERVICIO_TABLA_CONTENIDO = "http://190.255.42.26:90/ADMINSERV/AdminGeoApplication/AdminGeoWebServices/getTablaContenidoJsTree/public";
// SERVICIO_TABLA_CONTENIDO = "https://sig.icbf.gov.co/Icbf.SIG.Service/AdministradorServicios.svc";
SERVICIO_TABLA_CONTENIDO = "http://localhost:3000/ADMINSERV/AdminGeoApplication/AdminGeoWebServices/getTablaContenidoJsTree/public";
// const SERVICIO_SHAPEFILE = "http://172.17.3.142:6080/arcgis/rest/services/ICBF/exportarSHAPE/GPServer/exportarSHAPE";
const SERVICIO_SHAPEFILE = "https://mapassig.icbf.gov.co:6443/arcgis/rest/services/ICBF/exportarSHAPE/GPServer/exportarSHAPE";


const servConsultaSimple = [
    {
        // value: "http://172.17.3.205:6080/arcgis/rest/services/SAE/PREDIOS_SAE/MapServer",
        value: "https://172.17.3.205:6443/arcgis/rest/services/SAE/PRUEBA/MapServer",
        label: "SAE/PRUEBA"
    },
    {
        // value: "https://172.17.3.205:6443/arcgis/rest/services/SAE/PREDIOS_SAE/MapServer",
        value: "https://sae.igac.gov.co/arcgis/rest/services/SAE/PREDIOS_SAE/MapServer",
        
        // value: "http://localhost:3000/arcgis/rest/services/SAE/PREDIOS_SAE/MapServer",
        label: "Cartografía Básica"
    },
    {
        value: "https://172.17.3.205:6443/arcgis/rest/services/SAE/OTROS/MapServer",
        label: "Capas adicionales"
    }
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