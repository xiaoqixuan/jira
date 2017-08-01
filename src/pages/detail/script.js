var info = {
	peopleConfig:[
		{name:'产品经理',value:1},
		{name:'开发人员',value:5},
		{name:'测试人员',value:3},
	],
	taskConfig:[
		{name:'开发任务',value:10},
		{name:'测试任务',value:10},
		{name:'bug数目',value:5},
	],
	chartData:[
		{name:'已完成',data:[2,5,7]},
		{name:'进行中',data:[3,5,3]},
	],
	aggregateprogress:"0%",
	estimate:"0.0",
	isconcern:true,
	isimportant:false,
	issuekey:"CDDEV-6164",
	issuetitle:"【海棠湾】国美海棠湾官网",
	leader:"虞立昂",
	projectstatus:"正常",
	publishtime:"2017-03-31",
	soncount:"25",
	status:"开发中",
	team:"控股",
	teamperson:"0",
}

import echarts from 'echarts'

var e=window.navigator.appVersion;
var a=e.match(/android/gi);
var f=e.match(/iphone/gi);
var imgFontSize,leftGap,topGap ;
if(a){
    imgFontSize = 14;
    leftGap = '4%';
    topGap = '15%';
}
if(f){
    imgFontSize =  screen.width > 400 ? 32 : 25;
    leftGap = '5%';
    topGap = '15%';
}
var areaStyle = {
	normal:{
	    color:"rgba(0,0,0,0)"
	}
};
var textStyle = {
    fontSize:imgFontSize,
    color:"#999"
};

export default {
	route: {
		path: "/detail/:issuekey",
		meta: {
			title: "项目详情"
		}
	},
	data() {
		return {
			loading: false,
			info: {},
			// chartData: [],

			histogram: null,
			histogramBar: {
		        tooltip: {
		            trigger: "axis",
		            borderColor: "#1970e3",
		            borderWidth: 1,
		            backgroundColor: "rgba(255,255,255,0.78)",
		            textStyle: {
		                fontSize: imgFontSize,
		                color: '#888'
		            },
		            formatter: function(e) {
		                var a = e.map(function(e) {
		                    return '<br/><span style="color:' + e.color + ';">·</span> ' + e.seriesName + "：" + e.value
		                });
		                return e[0].axisValueLabel + a.join("")
		            }
		        },
		        color:["#6eb372","#f6cf57","#d3d5e0"],
		        legend: {
		            data:['已完成','进行中'/*,'未提交'*/],
		            itemWidth:imgFontSize,
		            itemHeight:imgFontSize,
		            right:"5%",
		            top:"5%",
		            textStyle:{
		                color:"#999",
		                fontSize:imgFontSize
		            },
		        },          
		        grid: {
		            left: leftGap,
		            top: topGap,
		            right: '15%',
		            bottom: '5%',
		            containLabel: true
		        },
		        xAxis: {
		            type: 'value',
		            boundaryGap: [0, 0.01],
		            axisLabel:{
		                show:true,
		                textStyle:{
		                    fontSize:imgFontSize,
		                    color:"#999"
		                }
		            },
		            splitLine: {
						show: false,
					},
		        },
		        yAxis: {
		            type: 'category',
		            data: [
		                {value:"bug",textStyle:textStyle},
	                    {value:"测试",textStyle:textStyle},
	                    {value:"开发",textStyle:textStyle},
		            ],                  
		            axisLabel:{
		                show:true,
		            }, 
		        },
		        series: [
		            {
		                name:'已完成',
                		type:'bar',               
		                barGap: '0%',
		                data: [18, 23, 29],                    
		                label: {
		                    normal: {
		                        position: 'right',
		                        show: true,
		                        textStyle: {
		                            fontSize: imgFontSize
		                        }
		                    },
		                },
		            },
		            {
		                name: '进行中',
		                type: 'bar',                
		                barGap: '0%',
		                data: [19, 23, 31],
		                label: {
		                    normal: {
		                        position: 'right',
		                        show: true,
		                        textStyle: {
		                            fontSize: imgFontSize
		                        }
		                    }
		                },
		            },
		            /*{
		                name: '未提交',
		                type: 'bar',                
		                barGap: '0%',
		                data: [10, 15, 20],
		                label: {
		                    normal: {
		                        position: 'right',
		                        show: true,
		                        textStyle: {
		                            fontSize: imgFontSize
		                        }
		                    }
		                },
		            }*/
		        ]
		    },
		}
	},
	beforeMount() {
		var _self = this;
		_self.loading = true;

		setTimeout(function () {
			_self.loading = false;
			_self.info = info;
			if (_self.info.soncount !=0) {
				// 基于准备好的dom，初始化echarts实例
				_self.$nextTick(function() {
					_self.getHistogram();
				})					
			}
		},1000)
	},
	computed: {
		issuekey() {
			return this.$route.params.issuekey
		},
	},
	methods: {
		doAttention(item) {
			item.isconcern = !item.isconcern;
		},
		getHistogram(){
			this.histogram = echarts.init(document.getElementById("histogram")),
	        this.histogram.setOption(this.histogramBar);
	        
	        var series = this.info.chartData.map((obj,index)=>{
	        	var o = {
	                name:obj.name,
            		type:'bar',               
	                barGap: '0%',
	                data: obj.data,                    
	                label: {
	                    normal: {
	                        position: 'right',
	                        show: true,
	                        textStyle: {
	                            fontSize: imgFontSize
	                        }
	                    },
	                },
	            };
	            return o;
	        });

		    // 数据渲染
		    this.histogram.setOption({ 
		        series : series
		    });
		}		
	}
}