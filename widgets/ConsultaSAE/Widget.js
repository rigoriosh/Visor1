// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

//>>built
let thisSAE,divMunicipioSAE, divLoadingSAE, formFinal, divBtnConsultaMasiva;
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
          let tw = this;
          thisSAE = tw;
          query("#sDepartSAE").on("change", async function (evt) {
            let sDepartSAE = this.options[this.selectedIndex].value;
            if (sDepartSAE !== "0") {
                //console.log(sDepartSAE);
                tw.storeConsultaSAE.departamento = dataStorage.departamentos.filter(e => e.attributes.COD_DEPART === sDepartSAE)[0].attributes;
                const municipios = retunMunicipios(sDepartSAE);
                tw.storeConsultaSAE.municipios = municipios;
                //console.log(municipios);
                divMunicipioSAE.style.display = 'contents';
                agregarDataSelect(municipios, "sMunicipioSAE","NOM_MUNICI","COD_DANE");
                tw.validaciones.departamento = true;
            }else{
              tw.validaciones.departamento = false;
              divMunicipioSAE.style.display = 'none';
              formFinal.style.display = "none";
            }
            tw._abilitarBtnConsulta();
            
          });
          query("#sMunicipioSAE").on("change", async function (evt) {
            var sMunicipioSAE = evt.target.value;
            if (sMunicipioSAE !== 0) {
              //console.log(sMunicipioSAE);
              formFinal.style.display = "block";
              tw.validaciones.municipio = true;
              tw.storeConsultaSAE.municipio = sMunicipioSAE;
            } else {
              tw.validaciones.municipio = false;
              formFinal.style.display = "none";
            }
            tw._abilitarBtnConsulta();

          });
          query("#IdFMI-SAE").on("change", async function (evt) {
            let FMI_SAE = evt.target.value;
            tw.validaciones.fmi = true;
            tw.validaciones.noMatrix = false;
            console.log({FMI_SAE});

            //console.log(IdFMI_SAE);
            tw._abilitarBtnConsulta();

          });
          query("#btnEjecutar-SAE").on("click", async function (evt) {
            console.log({evt});
            const vali = tw._abilitarBtnConsulta();
            console.log({vali});
            const numero = document.getElementById("numero-SAE").value;
            if (tw._abilitarBtnConsulta() && numero) {
              tw._EjecutarConsulta(numero);
            } else {
              createDialogInformacionGeneral("Recuerda", "Todos los campos son obligatorios");
            }
          });

          query("#btnLimpiar-SAE").on("click", async function (evt) {
            console.log({evt});
            tw._limpiarFormulario();
          });
          
          query("#Id_No_MATRIX").on("change", async function (evt) {
            let IdNoMatrix = evt.target.value;
            //console.log(IdNoMatrix);
            console.log({IdNoMatrix});
            tw.validaciones.fmi = false;
            tw.validaciones.noMatrix = true;
            tw._abilitarBtnConsulta();
          });
          

        },
        _abilitarBtnConsulta: function (){
          const {departamento, municipio, fmi, noMatrix} = this.validaciones;
          if (departamento && municipio && (fmi || noMatrix)) {
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
              //console.log(depart);
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
          document.getElementById("Id_No_MATRIX").checked = false;
          document.getElementById("numero-SAE").value = "";
          seleccionarUnaOpcionDelSelect("sDepartSAE", 0);
          agregarDataSelect2([], "sMunicipioSAE");
          divBtnConsultaMasiva.style.display = "none";
        },
        _EjecutarConsulta: async function (numero) {
          loader2(true, "loadingSAE");
          console.log("_EjecutarConsulta");
          console.log(this.validaciones);
          console.log(this.storeConsultaSAE);
          const resp = await getDataByFmi(numero)
          console.log(resp);

          if (resp.status == 404) {
            createDialogInformacionGeneral("Información", `La consulta con ${thisSAE.validaciones.fmi?"FMI":"No_Matrix"}: ${numero} no encontró información`);
            loader2(false, "loadingSAE");
            return
          } else if(resp.name === 'TypeError'){
            createDialogInformacionGeneral("Atención", `Se estan presentando problemas de red, favor intentarlo mas tarde o ponerse en contacto con tecnología`);
            loader2(false, "loadingSAE");
            return
          } else {
            console.log(2222222222222);
            this.storeConsultaSAE.dataAlfanumerica = resp[0]
            this._getDataGeográfica(numero);
          }
        },
        _getDataGeográfica: async function(numero){
          const miMunicipio = thisSAE.storeConsultaSAE.dataAlfanumerica.Mpio;
          const urlGeografica = await getDataGeograficaNotariadoRegistro(miMunicipio);
            console.log(urlGeografica);
            if (urlGeografica.status == 400 || !urlGeografica.URL){
                createDialogInformacionGeneral("Info","No se encontró información geográfica para esta consulta")
                loader2(false, "loadingSAE")
                return
            }
            thisSAE.storeConsultaSAE.urlGeografica = urlGeografica.URL;
            const objConsultaSAE = {
                urlCapa:urlGeografica.URL,
                where: `FMI='${numero}'`
            }
            ejecutarQueryAndQueryTask(objConsultaSAE, this._succeededRequest, this._errorRequest);
        },
        _succeededRequest: function (resp) {
          console.log(resp);  
          let fields = [/* {name: 'OBJECTID', type: 'esriFieldTypeOID', alias: 'OBJECTID'} */];
          Object.keys(thisSAE.storeConsultaSAE.dataAlfanumerica).forEach(e => fields.push(
              { name: e, type: 'esriFieldTypeString', alias: e, length: 250 })
          );
          resp.features[0].attributes = thisSAE.storeConsultaSAE.dataAlfanumerica;
          resp.fields = fields;
          // pintarPolygons(EsriMap, resp)
          // EsriMap.setExtent(resp.features[0].geometry.getExtent())
          thisSAE._SendResultados({
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
              urlGeografica: thisSAE.storeConsultaSAE.urlGeografica,
              responseQueryGeografica: resp,
              dataAlfanumerica: thisSAE.storeConsultaSAE.dataAlfanumerica,
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