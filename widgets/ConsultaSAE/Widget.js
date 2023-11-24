// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

//>>built
let thisConsultaSAE,divMunicipioSAE, divLoadingSAE, formFinal, divBtnConsultaMasiva;
define(["dojo/_base/declare", "jimu/BaseWidget", "dojo/query"],
function (declare, BaseWidget, query) {

    
     return declare([BaseWidget], {
        baseClass: "jimu-widget-ConsultaSAE",
        storeConsultaSAE: {
          departamento:{},
          municipios:[],
          municipio:{},
          tiposBienInmnueble:[],
          tiposBienInmnuebleSelected:''
        },
        validaciones:{
          departamento: false,
          municipio: false,
          fmi: false,
          noMatrix:false,
          numero:false
        },
        onOpen: function () {
          var panel = this.getPanel();
          //console.log(panel);
          ajustarTamanioWidget(panel, panel.position.width, 430)

        },
        startup: function() {
          EsriMap = this.map
          //console.log(111111);
          this.inherited(arguments);
          // this.mapIdNoderrh.innerHTML = 'map id is:' + this.map.id;
          this._getDivs();
          this._getDepartamentos();
          thisConsultaSAE = this;
          query("#sDepartSAE").on("change", async function (evt) {
            let sDepartSAE = this.options[this.selectedIndex].value;
            if (sDepartSAE !== "0") {
              if (consts.debug) {                    
                console.log({sDepartSAE});
              }
                thisConsultaSAE.storeConsultaSAE.departamento = dataStorage.departamentos.filter(e => e.attributes.COD_DEPART === sDepartSAE)[0].attributes;
                const municipios = retunMunicipios(sDepartSAE);
                thisConsultaSAE.storeConsultaSAE.municipios = municipios;
                if (consts.debug) {                    
                  console.log({municipios});
                }
                divMunicipioSAE.style.display = 'contents';
                agregarDataSelect(municipios, "sMunicipioSAE","NOM_MUNICI","COD_DANE");
                thisConsultaSAE.validaciones.departamento = true;
            }else{
              thisConsultaSAE.validaciones.departamento = false;
              divMunicipioSAE.style.display = 'none';
              formFinal.style.display = "none";
            }
            thisConsultaSAE._abilitarBtnConsulta();
            
          });
          query("#sMunicipioSAE").on("change", async function (evt) {
            var sMunicipioSAE = evt.target.value;
            if (sMunicipioSAE !== 0) {
              if (consts.debug) {                    
                console.log({sMunicipioSAE});
              }
              formFinal.style.display = "block";
              thisConsultaSAE.validaciones.municipio = true;
              thisConsultaSAE.storeConsultaSAE.municipio = sMunicipioSAE;
            } else {
              thisConsultaSAE.validaciones.municipio = false;
              formFinal.style.display = "none";
            }
            thisConsultaSAE._abilitarBtnConsulta();

          });
          query("#IdFMI-SAE").on("change", async function (evt) {
            let FMI_SAE = evt.target.value;
            thisConsultaSAE.validaciones.fmi = true;
            thisConsultaSAE.validaciones.noMatrix = false;
            if (consts.debug) {                    
              console.log({FMI_SAE});
            }
            thisConsultaSAE._abilitarBtnConsulta();
          });
          query("#btnEjecutar-SAE").on("click", async function (evt) {
            const vali = thisConsultaSAE._abilitarBtnConsulta();
            if (consts.debug) {                    
              console.log({evt});
              console.log({vali});
            }
            const numero = document.getElementById("idNumeroSAE").value;
            if (thisConsultaSAE._abilitarBtnConsulta()) {
              thisConsultaSAE._EjecutarConsulta(numero);
            } else {
              createDialogInformacionGeneral("Recuerda", "Todos los campos son obligatorios");
            }
          });

          query("#btnLimpiar-SAE").on("click", async function (evt) {
            if (consts.debug) {                    
              console.log({evt});
            }
            thisConsultaSAE._limpiarFormulario();
          });
          
          query("#Id_No_MATRIX").on("change", async function (evt) {
            let IdNoMatrix = evt.target.value;            
            if (consts.debug) {                    
              console.log({IdNoMatrix});
            }
            thisConsultaSAE.validaciones.fmi = false;
            thisConsultaSAE.validaciones.noMatrix = true;
            thisConsultaSAE._abilitarBtnConsulta();
          });

          query("#idNumeroSAE").on("change", async function (evt) {
            if (consts.debug) {                    
              console.log(evt.target.value);
            }
            thisConsultaSAE.validaciones.numero = evt.target.value != '';
            thisConsultaSAE._abilitarBtnConsulta();
          });
          

        },
        _abilitarBtnConsulta: function (){
          const {departamento, municipio, fmi, noMatrix, numero} = this.validaciones;
          if (departamento && municipio && (fmi || noMatrix) && numero) {
            divBtnConsultaMasiva.style.display = "flex";
            return true;
          } else {
            divBtnConsultaMasiva.style.display = "none";
            return false;
          }
        },
        _getDepartamentos: async function(){
          this._loading(true);
          let depart, munic;
          try {
              if (dataStorage.departamentos.length < 1) {
                  // consulta departamentos
                  depart = await ejecutarConsulta(OG_Rancheria_Microfocalización_ICBF);
                  // console.log(JSON.stringify(depart));
                  dataStorage.departamentos = depart.features;
                  depart = dataStorage.departamentos;
                  // consulta Municipios
                  munic = await ejecutarConsulta(Municipio_generalizado);
                  // console.log(JSON.stringify(munic));
                  dataStorage.municipios = munic.features;
                  munic = dataStorage.municipios;
              } else {
                  depart = dataStorage.departamentos;
                  munic = dataStorage.municipios;
              } 
              agregarDataSelect(depart, "sDepartSAE","DEPARTAMEN","COD_DEPART");
              // construirTabla(depart, 'idDivTabla')  
              if (consts.debug) {                    
                console.log({depart});
              }
          } catch (error) {
              console.error(error)
              // divConsultaMasiva.style.display = 'none';
          }
          this._loading(false);
        },
        _loading: function(mode){
          mode ? divLoadingSAE.style.display = 'flex' :  divLoadingSAE.style.display = 'none';
        },
        _getDivs: function(){
          divMunicipioSAE = document.querySelector("#divMunicipioSAE");
          divMunicipioSAE.style.display = 'none'
          divLoadingSAE = document.querySelector("#divLoadingSAE");
          formFinal = document.querySelector("#formFinal");
          divBtnConsultaMasiva = document.querySelector("#divBtnConsultaMasiva");
        },
        _limpiarFormulario: function () {
          document.getElementById("IdFMI-SAE").checked = false;
          // document.getElementById("Id_No_MATRIX").checked = false;
          document.getElementById("idNumeroSAE").value = "";
          seleccionarUnaOpcionDelSelect("sDepartSAE", 0);
          agregarDataSelect2([], "sMunicipioSAE");
          divBtnConsultaMasiva.style.display = "none";
        },
        _EjecutarConsulta: async function (numero) {
          loader2(true, "loadingSAE");
          const resp = await getDataByFmi(numero)
          if (consts.debug) {                                
            console.log(this.validaciones);
            console.log(this.storeConsultaSAE);
            console.log({resp});
          }
          loader2(false, "loadingSAE");
          if (resp.status === 404) {
            createDialogInformacionGeneral("Información", `La consulta con ${thisConsultaSAE.validaciones.fmi?"FMI":"No_Matrix"}: ${numero} no encontró información`);
            return
          } else if(resp.name === 'TypeError'){
            createDialogInformacionGeneral("Atención", `Se estan presentando problemas de red, favor intentarlo mas tarde o ponerse en contacto con tecnología`);
            return
          } else {            
            this.storeConsultaSAE.dataAlfanumerica = resp[0]
            this._getDataGeográfica(numero);
          }
        },
        _getDataGeográfica: async function(numero){
          loader2(true, "loadingSAE")
          const miMunicipio = thisConsultaSAE.storeConsultaSAE.dataAlfanumerica.Mpio;
          const urlGeografica = await getDataGeograficaNotariadoRegistro(miMunicipio);
          if (consts.debug) {                    
           console.log({urlGeografica});
          }
          loader2(false, "loadingSAE")
          if (urlGeografica.status == 400 || !urlGeografica.URL){
            createDialogInformacionGeneral("Info","No se encontró información geográfica para esta consulta")
            return
          }
          thisConsultaSAE.storeConsultaSAE.urlGeografica = urlGeografica.URL;
          const objConsultaSAE = {
            urlCapa:urlGeografica.URL,
            where: `FMI='${numero}'`
          }
          loader2(true, "loadingSAE")
          ejecutarQueryAndQueryTask(objConsultaSAE, this._succeededRequest, this._errorRequest);
        },
        _succeededRequest: function (resp) {
          if (consts.debug) {                    
            console.log({resp});  
          }
          let fields = [/* {name: 'OBJECTID', type: 'esriFieldTypeOID', alias: 'OBJECTID'} */];
          Object.keys(thisConsultaSAE.storeConsultaSAE.dataAlfanumerica).forEach(e => fields.push(
              { name: e, type: 'esriFieldTypeString', alias: e, length: 250 })
          );
          resp.features[0].attributes = thisConsultaSAE.storeConsultaSAE.dataAlfanumerica;
          resp.fields = fields;
          // pintarPolygons(EsriMap, resp)
          // EsriMap.setExtent(resp.features[0].geometry.getExtent())
          thisConsultaSAE._SendResultados({
              tipoResultado: consts.consulSAE,
              data:{
                  panel:{
                      width:600,
                      height:300,
                  }
              },
              featureCollection: {
                  featureSet: crearfeatureSet(resp.features),
                  layerDefinition: {
                    geometryType: resp.geometryType,
                    fields
                  },
              },
              urlGeografica: thisConsultaSAE.storeConsultaSAE.urlGeografica,
              responseQueryGeografica: resp,
              dataAlfanumerica: thisConsultaSAE.storeConsultaSAE.dataAlfanumerica,
              loading: "loadingSAE"
          })
          loader2(false, "loadingSAE")
      },
      _errorRequest: function (error) {
          console.error({error});
              createDialogInformacionGeneral("Info","No se encontró información geográfica para esta consulta")
              loader2(false, "loadingSAE")
      },
      _SendResultados: function(data){
          var widget = this.appConfig.getConfigElementById(consts.widgetMyResultados);
          var widgetId = widget.id;
          widget.data = data;
          this.openWidgetById(widgetId);
      },
    })
});