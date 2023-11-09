const insertProjecGeometry = async(dataToSend, url) => {
    // let formData = new FormData();
    // formData.append('data', dataToSend);
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
        formData.append('json', 
        {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "geometry": { "type": "Point", "coordinates": [102.0, 0.5] },
              "properties": { "prop0": "value0" }
            }
          ]
        }
        );
        // formData.append('gdbVersion', '');
        // formData.append('rollbackOnFailure', true);
        // formData.append('timeReferenceUnknownClient', false);
        // Default options are marked with *
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
      // mode: "no-cors",
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
  
  try {
    const response = await fetch(`${servicioSNRalfanumerico}${columnName}&columnValue=${columnValue}&fileName=${fileName}`, {
      method:'GET',
      // mode: "no-cors",
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
    const response = await fetch("http://localhost:61025/api/ArchivoExcel/?columnName=FMI&columnValue=037-5884&fileName=BASE_REGISTRO_SNR", {
      method:'GET',
      // mode: "no-cors",
      // body: dataToSend
    } );
  console.log(response);
  const resp = await response.json(); // parses JSON response into native JavaScript objects 
  console.log({resp});
  return response
  } catch (error) {
    console.error({error});
  } */
}

const getDataByFmi = async(Fmi)  => {
  try {
    const url = `${UrlGetByFmi}${Fmi}`
    const response = await fetch(url, {
      method:'GET',
      // mode: "no-cors",
      // body: dataToSend
    } );
    console.log(response);
    if (response.status == 404) return response
    const resp = await response.json(); // parses JSON response into native JavaScript objects 
    console.log({resp});
    return resp
    /* var myHeaders = new Headers();
    myHeaders.append("Usuario", "mcortes");
    myHeaders.append("Clave", "Saesas2023@");
    myHeaders.append("Cookie", "cookiesession1=678A3E42A866C0A6B9FE4B7AF09F0439");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      // redirect: 'follow',
      mode: "no-cors", // no-cors, *cors, same-origin
    };

    const response = await fetch(url, requestOptions);
    console.log(response);

    const resp = await response.json(); // parses JSON response into native JavaScript objects 
    console.log({resp});
    return resp */

    /* fetch(url, requestOptions)
      .then(response => {
        console.log(response);
        response.text()
      })
      .then(result => {
        console.log(result)
        return result
      })
      .catch(error => console.log('error', error)); */
      
  } catch (error) {
    console.error({error});
    // return error
    return GetByFmi
  }
}
