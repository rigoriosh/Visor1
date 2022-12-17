// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

//>>built
var divMunicipioSAE, divLoadingSAE, formFinal, divBtnConsultaMasiva;
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
          ajustarTamanioWidget(panel, panel.position.width, 400)

        },
        startup: function() {

          //console.log(111111);
          this.inherited(arguments);
          // this.mapIdNoderrh.innerHTML = 'map id is:' + this.map.id;
          this._getDivs();
          this._getDepartamentos();
          let tw = this;
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
            } else {
              tw.validaciones.municipio = false;
              formFinal.style.display = "none";
            }
            tw._abilitarBtnConsulta();

          });
          query("#IdFMI_SAE").on("change", async function (evt) {
            var FMI_SAE = evt.target.value;
            if (validarSoloEspacios(FMI_SAE)) {
              //console.log("dato valido");
              tw.validaciones.fmi = true;
            } else {
              //console.log("dato no valido");
              tw.validaciones.fmi = false;
            }

            //console.log(IdFMI_SAE);
            tw._abilitarBtnConsulta();

          });
          query("#IdNoMatrix").on("change", async function (evt) {
            var IdNoMatrix = evt.target.value;
            //console.log(IdNoMatrix);
            if (validarSoloEspacios(IdNoMatrix)) {
              //console.log("dato valido");
              tw.validaciones.noMatrix = true;
            } else {
              //console.log("dato no valido");
              tw.validaciones.noMatrix = false;
            }
            tw._abilitarBtnConsulta();
          });
          query("#btnConsultaMasiva").on("click", async function (evt) {
            
            if (tw._abilitarBtnConsulta()) {
              //console.log("ejecutando consulta");
              
            } else {
              
            }
            
          });

        },
        _abilitarBtnConsulta: function (){
          const {departamento, municipio, fmi, noMatrix} = this.validaciones;
          if (departamento && municipio && fmi && noMatrix) {
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
                  dataStorage.departamentos = depart.features;
                  depart = dataStorage.departamentos;
                  // consulta Municipios
                  munic = await ejecutarConsulta(Municipio_generalizado);
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
    })
});