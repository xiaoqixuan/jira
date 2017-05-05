
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
    imgFontSize = 25;
    leftGap = '18%';
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
var lineColor = ["#f6cf57","#e75b58","#5a649d","#b7d0f9","#6091e5","#a154af","#86c3bd"];
// 假数据
var configList = [
	{name: "研发团队人员", value: "119"},
	{name: "非研发团队人员", value: "34"},
	{name: "总人数", value: "153"},
	{name: "待完成需求", value: 170},
	{name: "完成子需求", value: 15},
	{name: "完成开发任务", value: 110},
	{name: "完成测试任务", value: 19},
	{name: "完成专项/项目", value: 5}
];
var compareData = {
	in_two: {
		development_num: 110,
		resolvedDev_num: 835,
		resolvedProject_num: 10,
		resolved_num: 235,
		sharing_center_num: 43,
		test_num: 108,
		total: 153,
		unresolved_num:0
	},
	in_two_time: "2017年3月",
	last: {
		development_num: 117,
		resolvedDev_num: 662,
		resolvedProject_num: 18,
		resolved_num: 132,
		sharing_center_num: 34,
		test_num: 103,
		total: 151,
		unresolved_num:129
	},
	last_time: "2017年4月",
};
var compareData2 = {
	in_two: {
		development_num: 110,
		resolvedDev_num: 835,
		resolvedProject_num: 10,
		resolved_num: 235,
		sharing_center_num: 43,
		test_num: 108,
		total: 153,
		unresolved_num:0
	},
	in_two_time: "2016年4季度",
	last: {
		development_num: 117,
		resolvedDev_num: 662,
		resolvedProject_num: 18,
		resolved_num: 132,
		sharing_center_num: 34,
		test_num: 103,
		total: 151,
		unresolved_num:129
	},
	last_time: "2017年1季度",
};

var historyData = {
	data:{
		development: {'2016年10月': 78, '2016年11月': 86, '2016年12月': 94, '2017年1月': 92, '2017年2月': 95, '2017年3月': 110, '2017年4月': 117},
		resolved: {'2016年10月': 23, '2016年11月': 35, '2016年12月': 83, '2017年1月': 155, '2017年2月': 132, '2017年3月': 235, '2017年4月': 132},
		resolvedDev: {'2016年10月': 263, '2016年11月': 341, '2016年12月': 324, '2017年1月': 343, '2017年2月': 505, '2017年3月': 835, '2017年4月': 662},
		resolvedProject: {'2016年10月': 3, '2016年11月': 11, '2016年12月': 21, '2017年1月': 5, '2017年2月': 10, '2017年3月': 10, '2017年4月': 18},
		sharing_center: {'2016年10月': 18, '2016年11月': 20, '2016年12月': 23, '2017年1月': 26, '2017年2月': 37, '2017年3月': 43, '2017年4月': 34},
		test: {'2016年10月': 30, '2016年11月': 74, '2016年12月': 103, '2017年1月': 80, '2017年2月': 44, '2017年3月': 108, '2017年4月': 103},
		unresolved: {'2016年10月': 0, '2016年11月': 0, '2016年12月': 0, '2017年1月': 0, '2017年2月': 0, '2017年3月': 0, '2017年4月': 129},
	},
	monthList: ["2016年10月", "2016年11月", "2016年12月", "2017年1月", "2017年2月", "2017年3月", "2017年4月"]
};
export default {
	route: {
		path: "/kpi",
		meta: {
			title: "所有KPI"
		}
	},
	data() {
		return {
			time: '',
			compareTime:{
				time1: '',
				time2: '',
				time3: '',
				time4: '',
			},
			configList: [],

			transverse: null,
			transverseBar: {
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
		        color: ["#6eb372","#f6cf57"],
		        legend: {
		            data: ['2017-02', '2017-01'],
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
		        },
		        yAxis: {
		            type: 'category',
		            data: [
		                {value:"总人数",textStyle:textStyle},
		                {value:"非研发团队人员",textStyle:textStyle},
		                {value:"研发团队人员",textStyle:textStyle},
		                {value:"完成专项/项目",textStyle:textStyle},
		                {value:"完成测试任务",textStyle:textStyle},
		                {value:"完成开发任务",textStyle:textStyle},
		                {value:"完成需求(子需求)",textStyle:textStyle},
		                {value:"待完成需求",textStyle:textStyle},
		            ],                  
		            axisLabel:{
		                show:true,
		            }, 
		        },
		        series: [
		            {
		                name: '2017-02',
		                type: 'bar',                
		                barGap: '0%',
		                data: [18, 23, 29, 104, 131, 630,33,21],                    
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
		                name: '2017-01',
		                type: 'bar',                
		                barGap: '0%',
		                data: [19, 23, 31, 121, 134, 681,30,18],
		                label: {
		                    normal: {
		                        position: 'right',
		                        show: true,
		                        textStyle: {
		                            fontSize: imgFontSize
		                        }
		                    }
		                },
		            }
		        ]
		    },
		    transverseTable: [],

		    longitudinal: null,
		    longitudinalTable: [],

		    history: null,
		    historyLine: {
	            color:lineColor,
	            toolbox:{
	                show:false,
	            },
	            tooltip: {
	                trigger: "axis",
	                borderColor: "#1970e3",
	                borderWidth: 1,
	                backgroundColor: "rgba(255,255,255,0.78)",
	                textStyle: {
	                    fontSize: imgFontSize,
	                    color: '#999'
	                },
	            },
	            legend: {
	                data:[
	                    // {name:"总人数",icon:"roundRect"},
	                    {name:"非研发团队人员",icon:"roundRect"},
	                    {name:"研发团队人员",icon:"roundRect"},
	                    {name:"完成专项/项目",icon:"roundRect"},
	                    {name:"完成测试任务",icon:"roundRect"},
	                    {name:"完成开发任务",icon:"roundRect"},
	                    {name:"完成需求(子需求)",icon:"roundRect"},
	                ],
	                itemWidth:imgFontSize,
	                itemHeight:imgFontSize,
	                // right:"5%",
	                bottom:"2%",
	                textStyle:{
	                    color:"#999",
	                    fontSize:imgFontSize
	                },
	            },

	            grid: {
	                top: '3%',
	                left: '3%',
	                right: '4%',
	                bottom: '30%',
	                containLabel: true
	            },
	            xAxis : {
	                type : 'category',
	                data: [/*
	                    {value:"1月",textStyle:textStyle},
	                    {value:"2月",textStyle:textStyle},
	                    {value:"3月",textStyle:textStyle},
	                    {value:"4月",textStyle:textStyle},
	                    {value:"5月",textStyle:textStyle},*/
	                ],
	                axisLabel: {
	                    interval: 0,
	                    rotate: 45
	                },
	                axisLine:{
	                    show:false,
	                },
	                axisTick:{
	                    show:false
	                }
	            },
	            yAxis : {
	                type : 'value',
	                axisTick:{
	                    show:false,
	                },
	                axisLine:{
	                    show:false
	                },
	                axisLabel:{
	                    textStyle:{
	                        fontSize:imgFontSize,
	                        color:"#999"
	                    }
	                }
	            },
	            series : [
	                /*{
	                    name:'总人数',
	                    type:'line',
	                    areaStyle: areaStyle,                
	                    smooth:true,
	                    data:[
	                        12, 13, 10, 14, 9, 20, 20
	                    ],

	                },*/
	                {
	                    name:'非研发团队人员',
	                    type:'line',
	                    areaStyle: areaStyle,
	                    smooth:true,
	                    data:[
	                        // 20, 12, 11, 24, 20, 30, 30
	                    ]
	                },
	                {
	                    name:'研发团队人员',
	                    type:'line',
	                    areaStyle: areaStyle,
	                    smooth:true,
	                    data:[
	                        // 20, 12, 18, 24, 20, 20, 30
	                    ]
	                },
	                {
	                    name:'完成专项/项目',
	                    type:'line',
	                    areaStyle: areaStyle,
	                    smooth:true,
	                    data:[
	                        // 20, 12, 11, 34, 20, 35, 30
	                    ]
	                },
	                {
	                    name:'完成测试任务',
	                    type:'line',
	                    areaStyle: areaStyle,
	                    smooth:true,
	                    data:[
	                        // 20, 12, 11, 24, 25, 13, 30
	                    ]
	                },
	                {
	                    name:'完成开发任务',
	                    type:'line',
	                    areaStyle: areaStyle,
	                    smooth:true,
	                    data:[
	                        // 20, 12, 11, 24, 20, 30, 30
	                    ]
	                },
	                {
	                    name:'完成需求(子需求)',
	                    type:'line',
	                    areaStyle: areaStyle,
	                    smooth:true,
	                    data:[
	                        // 24, 20, 30, 30,20, 12, 11, 
	                    ]
	                },
	            ],
	            dataZoom: [
	                {
	                    type: 'inside',
	                    xAxisIndex: [0],
	                    start: 40,
	                    end: 100,
	                    zoomLock: true,
	                },
	            ],
	        }
		}
	},
	beforeMount() {		
		// 获取时间
		this.time = new Date().toLocaleDateString();
		// 获取当月数据概况
		this.configList = configList;

		// 基于准备好的dom，初始化echarts实例
		this.$nextTick(function() {
			this.getTransverse();
			this.getLongitudinal();
			this.getHistoryLine();
		})
		
	},
	methods: {
		getTransverse() {	
	        this.transverse = echarts.init(document.getElementById("transverse-histogram")),
	        this.transverse.setOption(this.transverseBar);
	        // 获取同比
			var _data = compareData;

			this.compareTime.time1 =  _data.last_time;
			this.compareTime.time2 =  _data.in_two_time;
			// 解析数据
    		var dataObj = this.parseData(_data);
    		// 渲染echarts数据
    		this.renderHistogramImg(dataObj,this.transverse);
    		// 获取表格数据
    		this.makeTable(dataObj,true);
				
		},
		getLongitudinal() {	
	        this.longitudinal = echarts.init(document.getElementById("longitudinal-histogram")),
	        this.longitudinal.setOption(this.transverseBar);
	        // 获取同比
			var _data = compareData2;
				
			this.compareTime.time3 =  _data.last_time;
			this.compareTime.time4 =  _data.in_two_time;
			// 解析数据
    		var dataObj = this.parseData(_data);
    		// 渲染echarts数据
    		this.renderHistogramImg(dataObj,this.longitudinal);
    		// 获取表格数据
    		this.makeTable(dataObj,false);
		},
		parseData(_data) {
		    var last = _data.last;
		    var inTwo = _data.in_two;

		    var lastData = [
		        last.total,
		        last.sharing_center_num,
		        last.development_num,
		        last.resolvedProject_num,
		        last.test_num,
		        last.resolvedDev_num,
		        last.resolved_num,
		        last.unresolved_num
		    ];
		    var inTwoData = [
		        inTwo.total,
		        inTwo.sharing_center_num,
		        inTwo.development_num,
		        inTwo.resolvedProject_num,
		        inTwo.test_num,
		        inTwo.resolvedDev_num,
		        inTwo.resolved_num,
		        inTwo.unresolved_num
		    ];

		    var dataObj = {
		        lastTime: _data.last_time,
		        inTwoTime: _data.in_two_time,
		        lastData: lastData,
		        inTwoData: inTwoData
		    };

		    return dataObj;
		},
		renderHistogramImg(dataObj,myChart) {

		    var legend = [dataObj.lastTime,dataObj.inTwoTime];
		    var series = [
		        {
		            name: dataObj.lastTime,
		            type: 'bar',                
		            barGap: '0%',
		            data: dataObj.lastData,                    
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
		            name: dataObj.inTwoTime,
		            type: 'bar',                
		            barGap: '0%',
		            data: dataObj.inTwoData,                    
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
		    ];

		    // 数据渲染
		    var max = Math.max.apply(null ,dataObj.lastData.concat(dataObj.inTwoData))*1.2;
		    myChart.setOption({                
		        legend: {
		            data: legend
		        },
		        xAxis: {
		            max:max
		        },
		        series : series
		    });
		},
		makeTable(dataObj,isTransverse) {
		    var lastData = dataObj.lastData;
		    var inTwoData = dataObj.inTwoData;

		    // 获取表格数据
		    var arr = [
		        {name:"总人数",value1:'/',value2:'/',percentage:'/'},
		        {name:"非研发团队人员",value1:'/',value2:'/',percentage:'/'},
		        {name:"研发团队人员",value1:'/',value2:'/',percentage:'/'},
		        {name:"完成专项/项目",value1:'/',value2:'/',percentage:'/'},
		        {name:"完成测试任务",value1:'/',value2:'/',percentage:'/'},
		        {name:"完成开发任务",value1:'/',value2:'/',percentage:'/'},
		        {name:"完成需求(子需求)",value1:'/',value2:'/',percentage:'/'},
		        {name:"待完成需求",value1:'/',value2:'/',percentage:'/'},
		    ];
		    arr.forEach(function (obj,index) {
		        obj.value1 = lastData[index] ? lastData[index] : '/';
		        obj.value2 = inTwoData[index] ? inTwoData[index] : '/';

		        if (inTwoData[index] != 0 && lastData[index] != 0 ) {                     
		            var percentage = (lastData[index]/inTwoData[index] - 1)*100;
		            percentage = percentage%1 == 0 ? percentage : percentage.toFixed(1);
		            obj.percentage = percentage;
		        }                
		    });

		    if (isTransverse) {
		        this.transverseTable = arr;
		    } else {     
		        this.longitudinalTable = arr;  
		    } 
		},
		getHistoryLine() {
			this.history = echarts.init(document.getElementById("history-line")),
	        this.history.setOption(this.historyLine);
	        // 获取历史数据
			var _data = historyData;
				
			var xAxis = _data.monthList.map(function (el,index) {
                var obj = {
                    value: el,
                    textStyle: textStyle
                };
                return obj;
            });
            var arr = [                
                _data.data.sharing_center, // 非研发团队人员
                _data.data.development, // 研发人员
                _data.data.resolvedProject, // 完成专项/项目
                _data.data.test, // 测试
                _data.data.resolvedDev, // 完成开发任务
                _data.data.resolved, // 完成需求
                // _data.data.unresolved, // 待解决
            ];

            var seriesData = [];
            seriesData = arr.map(function (obj,index) {
                var array = [];
                for(var i in obj){
                    array.push(obj[i]);
                }
                return array;
            });

            this.historyLine.series.forEach(function (obj,index) {
                obj.data = seriesData[index];
            });
            this.historyLine.xAxis.data = xAxis;
            this.history.setOption(this.historyLine)
		}
	}
}