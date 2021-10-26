(function (PV) {  
    
    function symbolVis() { }  
    PV.deriveVisualizationFromBase(symbolVis);  
    var definition = {
      typeName: 'ct-poev2',
      
      datasourceBehavior: PV.Extensibility.Enums.DatasourceBehaviors.Multiple,
      
      iconUrl: 'scripts/app/editor/symbols/ext/icons/graph.png',
      getDefaultConfig: function () {
          return {
            DataShape: 'TimeSeries',  
            DataQueryMode: PV.Extensibility.Enums.DataQueryMode.ModePlotValues,
            Interval: 400,
            Height: 80,
            Width: 80
          }
      },
      
    visObjectType: symbolVis
    }
    function loadLibraries() {
        var links = [
            'Scripts/app/editor/symbols/ext/libraries/consurv_libv2.js'
        ];

        links.forEach(function (link) {
            var s = document.createElement("script");
            s.type = "text/javascript";
            s.src = link;
            s.async = false;
            s.setAttribute('nonce', 'consurv12345');
            document.head.appendChild(s);
        });
    }
    symbolVis.prototype.init = function init(scope, elem) { 
        this.onDataUpdate = dataUpdate;  
        this.onConfigChange = configChanged;  
        this.onResize = resize;  
        
        var container = elem.find('#container')[0];
        var id = 'timeseries_' + Math.random().toString(36).substr(2, 16);
        container.id = id;
        var chart;
        function _sorteddata(data){
            //console.log('tasdwst',data.Data)
            //console.log('twst',data.Data[23].Values[0].Value)
            let returndata = { _input_gas_MW : data.Data[7]? data.Data[7].Values[0].Value :20.4,
                _input_direction : data.Data[6]? data.Data[6].Values[0].Value : 'Horizontal',
                _input_separator_type : data.Data[16]? data.Data[16].Values[0].Value : '2 phase',
                _input_demisting_device : data.Data[5]? data.Data[5].Values[0].Value :'HiCap Vane UpFl',
                _input_nozzle_gas_Outlet : data.Data[13]? data.Data[13].Values[0].Value :456,
                _input_nozzle_iq_outlet : data.Data[14]? data.Data[14].Values[0].Value :49.3,    
                _corrected_Ks_pressure_if_MWD : data.Data[1]? data.Data[1].Values[0].Value : 0.250,
                _density_flow_area : data.Data[3]? data.Data[3].Values[0].Value :2.08,
                _input_watercut : data.Data[18]? data.Data[18].Values[0].Value :20,
                _input_pgvg2 : data.Data[15]? data.Data[15].Values[0].Value :4500,
                _input_lighter_liquid_density : data.Data[11]? data.Data[11].Values[0].Value :671.24,
                _input_lighter_liquid_viscosity : data.Data[12]? data.Data[12].Values[0].Value :0.37,
                _input_heavier_liquid_viscosity : data.Data[8]? data.Data[8].Values[0].Value :0.897,
                _input_vessel_ID : data.Data[17]? data.Data[17].Values[0].Value :2.4,
                _input_length_of_compressor : data.Data[10]? data.Data[10].Values[0].Value :5000,
                _input_lenght_height_TT : data.Data[9]? data.Data[9].Values[0].Value :5,
                CSA_in_m2 : data.Data[2]? data.Data[2].Values[0].Value :0.163,
                pmv2m_pa : data.Data[21]? data.Data[21].Values[0].Value :8000,
                pg_kgm3 : data.Data[19]? data.Data[19].Values[0].Value :11.15,
                pl_kgm3 : data.Data[20]? data.Data[20].Values[0].Value :738,
                _calc_gas_flow_area : data.Data[0]? data.Data[0].Values[0].Value :3.7,
                _relief_valve_MMscfd :data.Data[23]? data.Data[23].Values[0].Value :51.28,}/*{_input_gas_MW : data.Data[7]? data.Data[7].Values[0].Value :20.4,
             //(dN.gas)
            ,
                
            //input GAS Density
            }*/
            //console.log('returndata',returndata)
            return returndata
        }
        function dataUpdate(data) {
            let _data = _sorteddata(data);
            //console.log('sorted',_data)
            let curveplot = _initcurve_CTv2(_data);
            
            //console.log('curbeplot',curveplot)
          if(data) {
              //var series = convertToChartData(data);
              console.log('data',data);
              
              var series =  [{
                  name: "Multivane",
                  data: curveplot.multivane,
                  fillColor:'rgb(62,149,205,0.2)',
                  type:'area',
                  }, {
                  name: "Gas outlet nozzle",
                  data: curveplot.gasOutletNozle,
                  fillColor:'rgb(255,140,0,0.2)',
                  type:'area',
                  }, {
                  name: "Fire Case",
                  data: curveplot.fircecaseRV,
                  fillColor:'rgb(128,128,128,0.2)',
                  type:'area',
                  }, {
                  name: "Demister Capa",
                  data: curveplot.demisterCapa,
                  fillColor:'rgb(139,69,19,0.2)',
                  type:'area',
                  }, {
                  name: "Q_liq_nozzle",
                  data:  curveplot.Q_liq_nozzle,
                  fillColor:'rgb(0,100,0,0.2)',
                  type:'area',
                  }, {
                  name: "Defoaming",
                  data:  curveplot.Defoaming,
                  fillColor:'rgb(85,107,47,0.2)',
                  type:'area',
                  }, {
                  name: "Live Data",
                  data: [/*{x:70, y:46}, {x:82, y:34}, {x:24, y:47}, {x:61, y:37.80}, {x:10.7, y:68.4}, 
                  {x:190, y:73.77}, {x:20, y:84.18}, {x:90, y:91.71}, {x:69, y:99.32}, {x:78, y:111.89}, {x:45, y:114.29}, 
                  {x:68, y:121.40}, {x:280, y:40.99},{x:250, y:170},{x:223, y:164.6}*/],
                  fillColor:'rgb(255, 99, 71)',
                  type:'scatter',
                  }]
              if(!chart) {
                chart = new Highcharts.Chart({
                    chart: {
                        type: 'spline',
                        renderTo: id
                    },
                    title: {
                        text: ''
                    },
                    yAxis: {
                        title: {
                            text: 'Gas flowrate, MMscfd'
                        },
                        tickInterval: 20,
                    },
            
                    xAxis: {
                        title: {
                            text: 'Liquid flow, k bpd'
                        },
                        tickInterval: 50,
                    },
            
                    legend: {
                        align: 'center',
                        verticalAlign: 'top',
                    },
                    plotOptions: {
                        series: {
                            zones: [{
                                value: 0,
                                className: 'green'
                            }],
                            label: {
                                connectorAllowed: false
                            },
                        }
                    },
                    series: series
                });
                
              } else {
                console.log(data.Data[4],data.Data[22],'checked')
                    let _datatoloop = data.Data[22].Values;
                    let livedata = []
                    _datatoloop.forEach(function(item,index){
                        //console.log('testt',data.Data[4].Values[index] ,data.Data[22].Values[index])
                        if(data.Data[4].Values[index] && data.Data[22].Values[index]){
                            //console.log('pusshingg',data.Data[4].Values[index] ,data.Data[22].Values[index])
                            livedata.push([parseFloat(data.Data[4].Values[index].Value), parseFloat(data.Data[22].Values[index].Value) ])
                        }
                        
                    })
                    console.log(livedata,'livedata')
                    series.forEach(function(item, index) {
                      
                        if(chart.series[index].name == 'Live Data') {
                          
                          chart.series[index].remove(true);
                        }
                    });
                    chart.addSeries({
                        name: 'Live Data',
                        id: 'xyz',
                        data: livedata,
                        fillColor:'rgb(255, 99, 71)',
                        type:'scatter',
                    });
                    chart.redraw()
                  
              }
          }
      }

  function resize(width, height) {
      if(chart) {
          chart.setSize(width, height);
      }
  }

	function configChanged(config, oldConfig) {  
        console.log(config, oldConfig,'config')
            
        };  
  loadLibraries();        
  

        
	
    
    
       

        

        
    }
    
    PV.symbolCatalog.register(definition);  
})(window.PIVisualization);  