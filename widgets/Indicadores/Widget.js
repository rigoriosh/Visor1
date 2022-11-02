// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

//>>built
var tw;
define(["dojo/_base/declare", "jimu/BaseWidget", "dojo/query"],
function (declare, BaseWidget, query) {

    
     return declare([BaseWidget], {
        baseClass: "jimu-widget-Indicadores",
        store:{
          fieldsForm: ["seleccioneTematica", "entidadEspacial", "departamento", "tematica", "anio"]
        },
        startup: function() {

          this.inherited(arguments);
          tw = this;
          // this.mapIdNoderrh.innerHTML = 'map id is:' + this.map.id;

          this.getTematicas();

        query("#seleccioneTematica").on("change", async function (evt) {
            var datoSelected = this.options[this.selectedIndex].value;
            console.log(datoSelected);
            if (datoSelected !== 0) {
              tw.store = {
                ...tw.store,
                seleccioneTematica:datoSelected 
              }
            }else{
              tw.store = {
                ...tw.store,
                seleccioneTematica: ''
              }
            }
            console.log(tw.store);
        });
        query("#entidadEspacial").on("change", async function (evt) {
          var datoSelected = this.options[this.selectedIndex].value;
          console.log(datoSelected);
          if (datoSelected !== 0) {
            tw.store = {
              ...tw.store,
              entidadEspacial:datoSelected 
            }
          }else{
            tw.store = {
              ...tw.store,
              entidadEspacial: ''
            }
          }
          console.log(tw.store);
        });
        query("#departamento").on("change", async function (evt) {
          var datoSelected = this.options[this.selectedIndex].value;
          console.log(datoSelected);
          if (datoSelected !== 0) {
            tw.store = {
              ...tw.store,
              departamento:datoSelected 
            }
          }else{
            tw.store = {
              ...tw.store,
              entidadEspacial: ''
            }
          }
          console.log(tw.store);
        });
        query("#tematica").on("change", async function (evt) {
          var datoSelected = this.options[this.selectedIndex].value;
          console.log(datoSelected);
          if (datoSelected !== 0) {
            tw.store = {
              ...tw.store,
              tematica:datoSelected 
            }
          }else{
            tw.store = {
              ...tw.store,
              tematica: ''
            }
          }
          console.log(tw.store);
        });  
        query("#anio").on("change", async function (evt) {
          var datoSelected = this.options[this.selectedIndex].value;
          console.log(datoSelected);
          if (datoSelected !== 0) {
            tw.store = {
              ...tw.store,
              anio:datoSelected 
            }
          }else{
            tw.store = {
              ...tw.store,
              anio: ''
            }
          }
          console.log(tw.store);
        });
        query("#ejecutar").on("click", async function (evt) {
          console.log(tw.store);

          if (tw.validarForm()) {
            console.log("renderizar consulta y mostrar grafico");
          } else {
            
          }
          

        });


        },
        onOpen: function () {
          console.log(55555);
          // var panel = this.getPanel();
          // ajustarTamanioWidget(panel, 700, 500)

          /* option = {
            xAxis: {
              data: ['A', 'B', 'C', 'D', 'E']
            },
            yAxis: {},
            series: [
              {
                type: 'bar',
                barWidth: '20%',
                data: [
                  10,
                  22,
                  28,
                  {
                    value: 43,
                    // Specify the style for single bar
                    itemStyle: {
                      color: '#004884',
                      shadowColor: '#91cc75',
                      borderType: 'dashed',
                      opacity: 0.5
                    }
                  },
                  49
                ],
                itemStyle: {
                  barBorderRadius: 5,
                  borderWidth: 1,
                  borderType: 'solid',
                  borderColor: '#73c0de',
                  shadowColor: '#5470c6',
                  shadowBlur: 3
                },
                barGap: '20%',
                showBackground: true,
                backgroundStyle: {
                  color: 'rgba(220, 220, 220, 0.8)'
                }
              }
            ]
          }; */
         /*  option = {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: [
                'Acceso Directo',
                'Email Marketing',
                'Afiliación Ads',
                'Video Ads',
                'Buscadores'
              ]
            },
            series: [
              {
                name: 'Fuente de acceso',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                  { value: 335, name: 'Acceso Directo' },
                  { value: 310, name: 'Email Marketing' },
                  { value: 234, name: 'Afiliación Ads' },
                  { value: 135, name: 'Video Ads' },
                  { value: 1548, name: 'Buscadores' }
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          }; */
          
          
          /* option = {
            legend: {
              // Try 'horizontal'
              orient: 'vertical',
              right: 10,
              top: 'center',
              data: [
                {
                  name: '2015',
                  icon: 'rect'
                },
                {
                  name: '2016',
                  icon: 'circle'
                },
                {
                  name: '2017',
                  icon: 'pin'
                }
              ],
              selected: {
                '2015': true,
                '2016': true,
                '2017': false
              }
            },
            dataset: {
              source: [
                ['product', '2015', '2016', '2017'],
                ['Matcha Latte', 43.3, 85.8, 93.7],
                ['Milk Tea', 83.1, 73.4, 55.1],
                ['Cheese Cocoa', 86.4, 65.2, 82.5],
                ['Walnut Brownie', 72.4, 53.9, 39.1]
              ]
            },
            xAxis: { type: 'category' },
            yAxis: {},
            tooltip: {},
            series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
          }; */
          /* var option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: { type: 'cross' }
            },
            legend: {},
            xAxis: [
              {
                type: 'category',
                axisTick: {
                  alignWithLabel: true
                },
                axisLabel: {
                  rotate: 30
                },
                data: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                  'August',
                  'September',
                  'October',
                  'November',
                  'December'
                ]
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: 'Precipitation',
                min: 0,
                max: 250,
                position: 'right',
                axisLabel: {
                  formatter: '{value} ml'
                }
              },
              {
                type: 'value',
                name: 'Temperature',
                min: 0,
                max: 25,
                position: 'left',
                axisLabel: {
                  formatter: '{value} °C'
                }
              }
            ],
            series: [
              {
                name: 'Precipitation',
                type: 'bar',
                yAxisIndex: 0,
                data: [6, 32, 70, 86, 68.7, 100.7, 125.6, 112.2, 78.7, 48.8, 36.0, 19.3]
              },
              {
                name: 'Temperature',
                type: 'line',
                smooth: true,
                yAxisIndex: 1,
                data: [
                  6.0,
                  10.2,
                  10.3,
                  11.5,
                  10.3,
                  13.2,
                  14.3,
                  16.4,
                  18.0,
                  16.5,
                  12.0,
                  5.2
                ]
              }
            ]
          }; */
          /* option = {
            dataset: [
              {
                source: [
                  ['Product', 'Sales', 'Price', 'Year'],
                  ['Cake', 123, 32, 2011],
                  ['Latte', 231, 14, 2011],
                  ['Tofu', 235, 5, 2011],
                  ['Milk Tee', 341, 25, 2011],
                  ['Porridge', 122, 29, 2011],
                  ['Cake', 143, 30, 2012],
                  ['Latte', 201, 19, 2012],
                  ['Tofu', 255, 7, 2012],
                  ['Milk Tee', 241, 27, 2012],
                  ['Porridge', 102, 34, 2012],
                  ['Cake', 153, 28, 2013],
                  ['Latte', 181, 21, 2013],
                  ['Tofu', 395, 4, 2013],
                  ['Milk Tee', 281, 31, 2013],
                  ['Porridge', 92, 39, 2013],
                  ['Cake', 223, 29, 2014],
                  ['Latte', 211, 17, 2014],
                  ['Tofu', 345, 3, 2014],
                  ['Milk Tee', 211, 35, 2014],
                  ['Porridge', 72, 24, 2014]
                ]
              },
              {
                transform: {
                  type: 'filter',
                  config: { dimension: 'Year', '=': 2011 }
                  // The config is the "condition" of this filter.
                  // This transform traverse the source data and
                  // and retrieve all the items that the "Year"
                  // is `2011`.
                }
              }
            ],
            series: {
              type: 'pie',
              datasetIndex: 1
            }
          }; */
          /* var option = {
            dataset: {
              source: [
                ['Producto', 'Sales', 'Price', 'Year'],
                ['Cake', 123, 32, 2011],
                ['Latte', 231, 14, 2011],
                ['Tofu', 235, 5, 2011],
                ['Milk Tee', 341, 25, 2011],
                ['Porridge', 122, 29, 2011],
                ['Cake', 143, 30, 2012],
                ['Latte', 201, 19, 2012],
                ['Tofu', 255, 7, 2012],
                ['Milk Tee', 241, 27, 2012],
                ['Porridge', 102, 34, 2012],
                ['Cake', 153, 28, 2013],
                ['Latte', 181, 21, 2013],
                ['Tofu', 395, 4, 2013],
                ['Milk Tee', 281, 31, 2013],
                ['Porridge', 92, 39, 2013],
                ['Cake', 223, 29, 2014],
                ['Latte', 211, 17, 2014],
                ['Tofu', 345, 3, 2014],
                ['Milk Tee', 211, 35, 2014],
                ['Porridge', 72, 24, 2014]
              ]
            },
            visualMap: {
              show: true,
              dimension: 1, // means the 3rd column
              min: 2, // lower bound
              max: 15, // higher bound
              inRange: {
                // Size of the bubble.
                symbolSize: [5, 60]
              }
            },
            tooltip: {},
            legend: {},
            xAxis: {},
            yAxis: {},
            series: {
              type: 'pie'
            }
          }; */
          /* var option = {
            dataset: [
              {
                // This dataset is on `datasetIndex: 0`.
                source: [
                  ['Product', 'Sales', 'Price', 'Year'],
                  ['Cake', 123, 32, 2011],
                  ['Cereal', 231, 14, 2011],
                  ['Tofu', 235, 5, 2011],
                  ['Dumpling', 341, 25, 2011],
                  ['Biscuit', 122, 29, 2011],
                  ['Cake', 143, 30, 2012],
                  ['Cereal', 201, 19, 2012],
                  ['Tofu', 255, 7, 2012],
                  ['Dumpling', 241, 27, 2012],
                  ['Biscuit', 102, 34, 2012],
                  ['Cake', 153, 28, 2013],
                  ['Cereal', 181, 21, 2013],
                  ['Tofu', 395, 4, 2013],
                  ['Dumpling', 281, 31, 2013],
                  ['Biscuit', 92, 39, 2013],
                  ['Cake', 223, 29, 2014],
                  ['Cereal', 211, 17, 2014],
                  ['Tofu', 345, 3, 2014],
                  ['Dumpling', 211, 35, 2014],
                  ['Biscuit', 72, 24, 2014]
                ]
                // id: 'a'
              },
              {
                // This dataset is on `datasetIndex: 1`.
                // A `transform` is configured to indicate that the
                // final data of this dataset is transformed via this
                // transform function.
                transform: {
                  type: 'filter',
                  config: { dimension: 'Year', value: 2011 }
                }
                // There can be optional properties `fromDatasetIndex` or `fromDatasetId`
                // to indicate that where is the input data of the transform from.
                // For example, `fromDatasetIndex: 0` specify the input data is from
                // the dataset on `datasetIndex: 0`, or `fromDatasetId: 'a'` specify the
                // input data is from the dataset having `id: 'a'`.
                // [DEFAULT_RULE]
                // If both `fromDatasetIndex` and `fromDatasetId` are omitted,
                // `fromDatasetIndex: 0` are used by default.
              },
              {
                // This dataset is on `datasetIndex: 2`.
                // Similarly, if neither `fromDatasetIndex` nor `fromDatasetId` is
                // specified, `fromDatasetIndex: 0` is used by default
                transform: {
                  // The "filter" transform filters and gets data items only match
                  // the given condition in property `config`.
                  type: 'filter',
                  // Transforms has a property `config`. In this "filter" transform,
                  // the `config` specify the condition that each result data item
                  // should be satisfied. In this case, this transform get all of
                  // the data items that the value on dimension "Year" equals to 2012.
                  config: { dimension: 'Year', value: 2012 }
                }
              },
              {
                // This dataset is on `datasetIndex: 3`
                transform: {
                  type: 'filter',
                  config: { dimension: 'Year', value: 2013 }
                }
              }
            ],
            series: [
              {
                type: 'pie',
                radius: 50,
                center: ['25%', '50%'],
                // In this case, each "pie" series reference to a dataset that has
                // the result of its "filter" transform.
                datasetIndex: 1
              },
              {
                type: 'pie',
                radius: 50,
                center: ['50%', '50%'],
                datasetIndex: 2
              },
              {
                type: 'pie',
                radius: 50,
                center: ['75%', '50%'],
                datasetIndex: 3
              }
            ]
          }; */
          /* var option = {
            dataset: {
              source: [
                [12, 323, 11.2],
                [23, 167, 8.3],
                [81, 284, 12],
                [91, 413, 4.1],
                [13, 287, 13.5]
              ]
            },
            visualMap: {
              show: true,
              dimension: 2, // means the 3rd column
              min: 2, // lower bound
              max: 15, // higher bound
              inRange: {
                // Size of the bubble.
                symbolSize: [5, 60]
              }
            },
            tooltip: {},
            xAxis: {},
            yAxis: {},
            series: {
              type: 'pie'
            }
          }; */
          /* option = {
            legend: {},
            tooltip: {},
            dataset: {
              // Define the dimension of array. In cartesian coordinate system,
              // if the type of x-axis is category, map the first dimension to
              // x-axis by default, the second dimension to y-axis.
              // You can also specify 'series.encode' to complete the map
              // without specify dimensions. Please see below.
          
              dimensions: ['product', '2015', '2016', '2017'],
              source: [
                { product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7 },
                { product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1 },
                { product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5 },
                { product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1 }
              ]
            },
            xAxis: { type: 'category' },
            yAxis: {},
            series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
          }; */
          /* var data = [
            [
              [28604, 77, 17096869, 'Australia', 1990],
              [31163, 77.4, 27662440, 'Canada', 1990],
              [1516, 68, 1154605773, 'China', 1990],
              [13670, 74.7, 10582082, 'Cuba', 1990],
              [28599, 75, 4986705, 'Finland', 1990],
              [29476, 77.1, 56943299, 'France', 1990],
              [31476, 75.4, 78958237, 'Germany', 1990],
              [28666, 78.1, 254830, 'Iceland', 1990],
              [1777, 57.7, 870601776, 'India', 1990],
              [29550, 79.1, 122249285, 'Japan', 1990],
              [2076, 67.9, 20194354, 'North Korea', 1990],
              [12087, 72, 42972254, 'South Korea', 1990],
              [24021, 75.4, 3397534, 'New Zealand', 1990],
              [43296, 76.8, 4240375, 'Norway', 1990],
              [10088, 70.8, 38195258, 'Poland', 1990],
              [19349, 69.6, 147568552, 'Russia', 1990],
              [10670, 67.3, 53994605, 'Turkey', 1990],
              [26424, 75.7, 57110117, 'United Kingdom', 1990],
              [37062, 75.4, 252847810, 'United States', 1990]
            ],
            [
              [44056, 81.8, 23968973, 'Australia', 2015],
              [43294, 81.7, 35939927, 'Canada', 2015],
              [13334, 76.9, 1376048943, 'China', 2015],
              [21291, 78.5, 11389562, 'Cuba', 2015],
              [38923, 80.8, 5503457, 'Finland', 2015],
              [37599, 81.9, 64395345, 'France', 2015],
              [44053, 81.1, 80688545, 'Germany', 2015],
              [42182, 82.8, 329425, 'Iceland', 2015],
              [5903, 66.8, 1311050527, 'India', 2015],
              [36162, 83.5, 126573481, 'Japan', 2015],
              [1390, 71.4, 25155317, 'North Korea', 2015],
              [34644, 80.7, 50293439, 'South Korea', 2015],
              [34186, 80.6, 4528526, 'New Zealand', 2015],
              [64304, 81.6, 5210967, 'Norway', 2015],
              [24787, 77.3, 38611794, 'Poland', 2015],
              [23038, 73.13, 143456918, 'Russia', 2015],
              [19360, 76.5, 78665830, 'Turkey', 2015],
              [38225, 81.4, 64715810, 'United Kingdom', 2015],
              [53354, 79.1, 321773631, 'United States', 2015]
            ]
          ]; */
          /* option = {
            legend: {},
            tooltip: {},
            dataset: {
              // Provide a set of data.
              source: [
                ['product', '2015', '2016', '2017'],
                ['Matcha Latte', 43.3, 85.8, 93.7],
                ['Milk Tea', 83.1, 73.4, 55.1],
                ['Cheese Cocoa', 86.4, 65.2, 82.5],
                ['Walnut Brownie', 72.4, 53.9, 39.1]
              ]
            },
            // Declare an x-axis (category axis).
            // The category map the first column in the dataset by default.
            xAxis: { type: 'category' },
            // Declare a y-axis (value axis).
            yAxis: {},
            // Declare several 'bar' series,
            // every series will auto-map to each column by default.
            series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
          }; */
          /* option = {
            xAxis: {
              type: 'category',
              data: ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie']
            },
            yAxis: {},
            series: [
              {
                type: 'bar',
                name: '2015',
                data: [89.3, 92.1, 94.4, 85.4]
              },
              {
                type: 'bar',
                name: '2016',
                data: [95.8, 89.4, 91.2, 76.9]
              },
              {
                type: 'bar',
                name: '2017',
                data: [97.7, 83.1, 92.5, 78.1]
              }
            ]
          }; */
          /* option = {
            backgroundColor: {
              type: 'radial',
              x: 0.3,
              y: 0.3,
              r: 0.8,
              colorStops: [
                {
                  offset: 0,
                  color: '#f7f8fa'
                },
                {
                  offset: 1,
                  color: '#cdd0d5'
                }
              ]
            },
            grid: {
              left: 10,
              containLabel: true,
              bottom: 10,
              top: 10,
              right: 30
            },
            xAxis: {
              splitLine: {
                show: false
              }
            },
            yAxis: {
              splitLine: {
                show: false
              },
              scale: true
            },
            series: [
              {
                name: '1990',
                data: data[0],
                type: 'bar',
                symbolSize: function(data) {
                  return Math.sqrt(data[2]) / 5e2;
                },
                emphasis: {
                  focus: 'series',
                  label: {
                    show: true,
                    formatter: function(param) {
                      return param.data[3];
                    },
                    position: 'top'
                  }
                },
                itemStyle: {
                  shadowBlur: 10,
                  shadowColor: 'rgba(120, 36, 50, 0.5)',
                  shadowOffsetY: 5,
                  color: {
                    type: 'radial',
                    x: 0.4,
                    y: 0.3,
                    r: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: 'rgb(251, 118, 123)'
                      },
                      {
                        offset: 1,
                        color: 'rgb(204, 46, 72)'
                      }
                    ]
                  }
                }
              },
              {
                name: '2015',
                data: data[1],
                type: 'bar',
                symbolSize: function(data) {
                  return Math.sqrt(data[2]) / 5e2;
                },
                emphasis: {
                  focus: 'series',
                  label: {
                    show: true,
                    formatter: function(param) {
                      return param.data[3];
                    },
                    position: 'top'
                  }
                },
                itemStyle: {
                  shadowBlur: 10,
                  shadowColor: 'rgba(25, 100, 150, 0.5)',
                  shadowOffsetY: 5,
                  color: {
                    type: 'radial',
                    x: 0.4,
                    y: 0.3,
                    r: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: 'rgb(129, 227, 238)'
                      },
                      {
                        offset: 1,
                        color: 'rgb(25, 183, 207)'
                      }
                    ]
                  }
                }
              }
            ]
          };
 */
          /* var option = {
            
            title: {
              text: 'EJEMPLO INDICADOR'
            },
            tooltip: {},
            legend: {
              data: ['sales1', 'sales2']
            },
            xAxis: {
              data: ['Shirts', 'Cardigans', 'Chiffons', 'Pants', 'Heels', 'Socks'],
              axisLine: {
                symbol: 'arrow',
                lineStyle: {
                  type: 'dashed'
                }
              },
              axisLabel: {
                formatter: '{value} kg',
                // align: 'center'
               
              }
            },
            yAxis: {
              axisTick: {
                length: 6,
                lineStyle: {
                  type: 'dashed'
                }
              }
            },
            series: [
              {
                name: 'sales1',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
              },
              {
                name: 'sales2',
                type: 'bar',
                data: [15, 25, 16, 20, 15, 10]
              }
            ]
          }; */
          // renderGrafico(option, 'mainIndicadores', 650, 400);
          
        },
        getTematicas: function(){

          const dataTest = [
            {
              attributes:{
                clave:"1",
                valor: "Test0"
              }
            },
            {
              attributes:{
                clave:"2",
                valor: "Test1"
              }
            }
          ]
          agregarDataSelect(dataTest, "seleccioneTematica","valor","clave");
          agregarDataSelect(dataTest, "entidadEspacial","valor","clave");
          agregarDataSelect(dataTest, "departamento","valor","clave");
          agregarDataSelect(dataTest, "tematica","valor","clave");
          agregarDataSelect(dataTest, "anio","valor","clave");
        },
        validarForm: function(){
          let validacion = true;
          tw.store.fieldsForm.forEach(e => {
            console.log(tw.store[e])
            if (Number(tw.store[e]) === 0 || tw.store[e] === undefined) {
              validacion = false
            } 
          })
          return validacion;
        }
        
        
    })
});