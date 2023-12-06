const insertProjecGeometry = async(dataToSend, url) => {
  try {
      const response = await fetch(url, {
          method:'POST',
          mode: "no-cors",
          body: dataToSend} );
          console.log(response);
      return response
  } catch (error) {
      return error        
  }
}
const postData = async (url = "", data = {}) => {
  try {
      let formData = new FormData();
      formData.append('features', JSON.stringify(data.features));
      formData.append('gdbVersion', '');
      formData.append('rollbackOnFailure', true);
      formData.append('timeReferenceUnknownClient', false);
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "no-cors", // no-cors, *cors, same-origin
      //   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "omit", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/octet-stream",
          // "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      //   redirect: "follow", // manual, *follow, error
        referrerPolicy: "strict-origin-when-cross-origin", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: formData, // body data type must match "Content-Type" header
      //   body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      // const resp = await response.json(); // parses JSON response into native JavaScript objects        
      return response; // parses JSON response into native JavaScript objects        
  } catch (error) {
      console.error(error);
      return error;
  }
}

const postDeleteGeomtry = async (url = "", data = {}) => {
  try {
      let formData = new FormData();
      formData.append('objectIds', data.objectIds);
      formData.append('where', data.where);
      formData.append('gdbVersion', '');
      formData.append('rollbackOnFailure', true);
      formData.append('returnDeleteResults', true);
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "no-cors", // no-cors, *cors, same-origin
        credentials: "omit", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
        referrerPolicy: "strict-origin-when-cross-origin", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: formData, // body data type must match "Content-Type" header
      });
      return response; // parses JSON response into native JavaScript objects        
  } catch (error) {
      console.error(error);
      return error;
  }
}


const getDataGeograficaNotariadoRegistro = async(miMunicipio)  => {
  try {
    const url = `${servicioSNRgeometrias}${miMunicipio}`
    const response = await fetch(url, {
      method:'GET',
      mode: "no-cors",
      // body: dataToSend
    } );
    console.log(response);
    if (response.status == 400) return response
    const resp = await response.json(); // parses JSON response into native JavaScript objects 
    console.log({resp});
    return resp
  } catch (error) {
    console.error({error});
    return error;
  }
}
const getDataNotariadoRegistro = async(columnName, columnValue, fileName)  => {
  
  
    
    var requestOptions = {
      method: 'GET',
      mode: "no-cors",
      redirect: 'follow',
      // referrerPolicy: "no-referrer",
      // cache: "no-cache",
      // credentials: "omit", // include, *same-origin, omit
      // headers: {
      //   "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      //   "Accept-Language": "es-419,es;q=0.7",
      //   "Sec-Fetch-Dest": "document",
      //   "Sec-Fetch-Mode": "navigate",
      //   "Sec-Fetch-Site": "none",
      //   "Sec-Fetch-User": "?1",
      //   "Upgrade-Insecure-Requests": 1,
      //   "Content-Type": 'text/xml', //"application/json",
      //   "referrerPolicy": "same-origin",
      //   "cache": "default",//"only-if-cached",
      //   "method": 'CONNECT',
      //   "Content-Type": "application/json; charset=utf-8",
      //   "Accept-Encoding": "gzip, deflate, br",
      //   "X-Firefox-Spdy": "h2",
      //   "access-control-allow-origin": "*",
      //   "cache-control": "no-cache",
      //   "content-length": 447,
      //   "date": "Tue, 14 Nov 2023 17:08:19 GMT",
      //   "expires": -1,
      //   "pragma": "no-cache",
      //   "server": "Microsoft-IIS/10.0",
      //   "x-aspnet-version": "4.0.30319",
      //   "x-powered-by": "ASP.NET",
      //   "Connection": "keep-alive",
      //   "Host": "sae.igac.gov.co",
      //   "Sec-Fetch-Dest": "document",
      //   "Upgrade-Insecure-Requests": "1",
      //   "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0",
      //   "Access-Control-Allow-Methods": "GET",
      //   "Access-Control-Allow-Headers": "Content-Type, X-Auth-Token, Origin, Authorization"
       
      // },
    };
    const endPoint = `${servicioSNRalfanumerico}${columnName}&columnValue=${columnValue}&fileName=${fileName}`
    // const endPoint = `https://sae.igac.gov.co/alfanumericosae/Sae.SIG.RestFileExcel/api/ArchivoExcel/?columnName=NPN&columnValue=76020000000020048000&fileName=BASE_REGISTRO_R1R2`;
    // const endPoint = `https://geoserver.cntindigena.org:9443/geoserver/INDIGENA/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=INDIGENA:limite_departamental&outputFormat=json&_dc=1700151419584`;
    
    console.log("endPoint => ", endPoint);
    /* 
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        // La respuesta del servidor está disponible en this.responseText
        console.log(this.responseText);
      }
    };
    xhttp.open("GET", endPoint, true);
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*, *, *');
    xhttp.send();
    */
    /* 
    fetch(endPoint, {
      method: "GET",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        // Puedes agregar otros encabezados según sea necesario
      },
      // Puedes incluir credenciales como 'credentials: 'include'' si es necesario
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error(`Error de red - ${response.status}`);
        }
        // return response.json(); // o response.text() si esperas una respuesta de texto en lugar de JSON
        return response.text(); // o response.text() si esperas una respuesta de texto en lugar de JSON
      })
      .then((data) => {
        // Manipula los datos recibidos aquí
        console.log(data);
      })
      .catch((error) => {
        // Maneja errores de red o errores en la respuesta
        console.error("Error:", error);
      });
    */ 
  /* 
      $.ajax({
        url: endPoint,
        type: "GET",
        // dataType: "JSON",
        dataType: 'jsonp',
        crossDomain: true,
        success: function (result) {
          console.log(result);
        },
        error: function (error) {
          console.log(error);
        }
      })
 */
  /* 
    const Http = new XMLHttpRequest();
    const url=endPoint
    Http.open("GET", url);
    Http.setRequestHeader('Content-Type', 'application/json');
    // Http.setRequestHeader('Access-Control-Allow-Origin', '*');
    Http.setRequestHeader('Access-Control-Allow-Origin', '*, *, *');
    Http.setRequestHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
    // Http.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Origin, Authorization');
    Http.send();

    Http.onreadystatechange = (e) => {
      console.log(Http.responseText)
    }
     */

    /* 
    // fetch("https://sae.igac.gov.co/alfanumericosae/Sae.SIG.RestFileExcel/api/ArchivoExcel?columnName=NPN&columnValue=76020000000020048000&fileName=BASE_REGISTRO_R1R2", requestOptions)
    await fetch(endPoint, requestOptions)
    // .then(response => response.json())
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
     */

  
    try {
    const response = await fetch(endPoint, requestOptions);
    console.log(response);
    if (response.status == 400) return response
    // const resp = await response.json(); // parses JSON response into native JavaScript objects 
    const resp = await response.json(); // parses JSON response into native JavaScript objects 
    console.log({resp});
    // return response
    return resp
    
  } catch (error) {
    console.error({error});
    return error;
  }
 
  /* try {
    let formData = new FormData();
    // formData.append('features', JSON.stringify(data.features));
    formData.append('gdbVersion', '');
    formData.append('rollbackOnFailure', true);
    formData.append('timeReferenceUnknownClient', false);
    // Default options are marked with *
    const response = await fetch("http://localhost:61025/api/ArchivoExcel/?columnName=FMI&columnValue=037-5884&fileName=BASE_REGISTRO_SNR", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "no-cors", // no-cors, *cors, same-origin
      //   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "omit", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      //   redirect: "follow", // manual, *follow, error
      referrerPolicy: "strict-origin-when-cross-origin", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body: formData, // body data type must match "Content-Type" header
      //   body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    // const resp = await response.json(); // parses JSON response into native JavaScript objects        
    // return response; // parses JSON response into native JavaScript objects        
    return {
      "FMI": "037-5884",
      "NOMBRE COMPLETO DEL PROPIETARIO": "GUERRA ARTURO",
      "CLASE DE DOCUMENTO CC CE NIT": "NA",
      "NUMERO DE IDENTIFICACION DATO TRADICION": "NA",
      "NUMERO DE ANOTACION DATO TRADICION": "1",
      "ESPECIFICACIÓN DE TÍTULO TRASLATICIO DE DOMINIO (COMPRAVENTA, PERMUTA)": "COMPRAVENTA",
      "NOMBRE ULTIMO PROPIETARIO INSCRITO ANTES DEL REGISTRO DE LA": "SOCIEDAD \"GUERRA MU\\OZ LTDA CIVIL\"",
      "CLASE DE DOCUMENTO": "NA",
      "NUMERO DE IDENTIFICACION": "NA",
      "EL ULTIMO PROPIETARIO ES PERSONA JURIDICA SI/NO": "SI",
      "DATOS DE TRADICION": "JURIDICA",
      "ACTIVO SOCIAL": "SI",
      "REGISTRA PROPIEDAD HORIZONTAL": "NO",
      "CIRCULO REGISTRAL": "YARUMAL",
      "DIRECCION QUE REGISTRA EL FMI": "FINCA EL REMOLINO",
      "CIUDAD": "VALDIVIA",
      "DEPARTAMENTO": "ANTIOQUIA",
      "ESTADO DEL FOLIO ACTIVO O CERRADO": "ACTIVO",
      "TIPO DE PREDIO": "RURAL",
      "IDENTIFICA CABIDA Y LINDEROS": "SI",
      "NOTARIA DE LA ESCRITURA PUBLICA": "VALDIVIA",
      "NUMERO DE ESCRITURA PUBLICA DE CABIDA Y LINDEROS": "125",
      "DESCRIPCION CABIDA Y LINDEROS": "UNA FINCA RURAL DENOMINADA REMOLINO, SITUADA EN EL MUNICIPIO DE VALDIVIA, EN EL PUNTO DEPUERTO VALDIVIA, CON UNA CABIDA APROXIMADA DE SEISCIENTOS CINCUENTA Y SEIS (656) HECT. Y QUELINDA: POR EL FRENTE CON EL RIO CAUCA; POR EL COSTADO IZQUIERDO CON LA QUEBRADA TAPIAS, ESTAARRIBA HASTA SU NACIMIENTO LINDANDO CON PROPIEDAD DE RAFAEL VILLA; DE ESTE NACIMIENTO POR LACORDILLERA A BUSCARL EL NACIMIENTO DE LA QUEBRADA IRSE; ESTA ABAJO HASTA SU DESEMBOQUE EN ELRIO CAUCA PUNTO DE PARTIDA.\nEN ENCABEZADO MATRICULA BASE (T. 1. FL. 63 # 61). -ESTE INMUEBLE QUEDACON UN AREA DE 602.4951 HECTAREAS Y SUS LINDEROS ACTUALIZADOS CONSTAN EN LA ESCRITURA NRO.125 DEL 09-12-2020 DE LA NOTARIA DE VALDIVIA."
  }
} catch (error) {
    console.error(error);
} */
  /* try {
    const response = await fetch(endPoint, requestOptions);
    console.log(response);
    // const resp = await response.json();
    // const respB = await response.body.json();
    // console.log(respB);
    // const resp = await response.text();
    // console.log({resp});
    return response
  } catch (error) {
    console.error({error});
  } */
}

const getDataByFmi = async (Fmi) => {
try {
  var myHeaders = new Headers();
  myHeaders.append("Usuario", "mcortes");
  myHeaders.append("Clave", "Junio2023*+");
  myHeaders.append(
    "Cookie",
    "cookiesession1=678A3E429FBC05482128809D6AE8ED6C"
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const url = `${UrlGetByFmi}${Fmi}`;
  const response = await fetch(url, requestOptions);
  if (response.status === 404) return response;
  const resp = await response.json(); // parses JSON response into native JavaScript objects
  return resp;
} catch (error) {
  console.error({error});
  return error;
}
};

const GetByidDepartamento = async (url) => {
try {
  
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "cookiesession1=678A3E429FBC05482128809D6AE8ED6C");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetch(url, requestOptions);
  if (response.status === 404) return response;
  const resp = await response.text(); // parses JSON response into native JavaScript objects
  return resp;

} catch (error) {
  console.error({error});
  return error;
}
}

const GetByidMunicipio = async (url) => {
try {
  
  var myHeaders = new Headers();
  myHeaders.append("Usuario", "mcortes");
  myHeaders.append("Clave", "Junio2023*+");
  myHeaders.append("Cookie", "cookiesession1=678A3E429FBC05482128809D6AE8ED6C");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetch(url, requestOptions);
  if (response.status === 404) return response;
  const resp = await response.text(); // parses JSON response into native JavaScript objects
  return resp;

} catch (error) {
  console.error({error});
  return error;
}
}

const GetByidRegional = async (url) => {
try {
  var myHeaders = new Headers();
  myHeaders.append("Usuario", "mcortes");
  myHeaders.append("Clave", "Junio2023*+");
  myHeaders.append("Cookie", "cookiesession1=678A3E429FBC05482128809D6AE8ED6C");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  const response = await fetch(url, requestOptions);
  if (response.status === 404) return response;
  const resp = await response.text(); // parses JSON response into native JavaScript objects
  return resp;

} catch (error) {
  console.error({error});
  return error;
}
}
