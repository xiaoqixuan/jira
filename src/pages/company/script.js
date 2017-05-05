import echarts from 'echarts'

var e=window.navigator.appVersion;
var a=e.match(/android/gi);
var f=e.match(/iphone/gi);
var imgFontSize ;
if(a){
    imgFontSize = 14;
}
if(f){
    imgFontSize = 35;
} 

// 指定图表的配置项和数据
var areaStyle = {
	normal: {
	    color:"rgba(0,0,0,0)"
	}
};
var textStyle = {
    fontSize:imgFontSize,
    color:"#999"
};
var label = {
    normal:{
        show:true,
        position:"top",
        textStyle:{
            color:"#999",
            fontSize:imgFontSize
        }
    }
}

//团队颜色
var teamRequirementsColor = ["#f6cf57","#e75b58","#5a649d","#b7d0f9","#6091e5","#a154af","#86c3bd","#439247"];
//未解决需求状态颜色
// var requierMentsColor = ["#f6cf57","#e75b58","#5a649d","#b7d0f9","#6091e5","#a154af","#86c3bd","#439247"];
//周prd颜色
var weekPrdColor = ["#f6cf57","#e75b58","#5a649d","#b7d0f9","#6091e5","#a154af","#86c3bd","#439247"];

// 假数据
var peopleData = {
	list: [
		{ptotal: 25, name: "O2M"}, 
		{ptotal: 7, name: "基础架构"}, 
		{ptotal: 13, name: "项目营运支撑"},
		{ptotal: 5, name: "控股"},
		{ptotal: 3, name: "萤火虫"},
		{ptotal: 12, name: "费控"},
		{ptotal: 21, name: "HR"},
		{ptotal: 28, name: "来购"},
		{ptotal: 5, name: "移动开发"},
		{ptotal: 10, name: "行政人员"},
		{ptotal: 24, name: "共享服务中心"},
	],
	total: {ptotal: 153, name: "总人数"},
};
var basicList = [
	{num: 49, name: "完成的需求"},
	{num: 290, name: "未解决的需求"},
	{num: 147, name: "进行中的需求"},
	{num: 5, name: "重点项目"},
	{name: "开发任务", num: 202},
	{name: "测试任务", num: 28},
	{name: "团队成员", num: 153}
];
var efficiency = {
	time: ["11月", "12月", "1月", "2月", "3月", "4月"],
	data: {
		'HR': ["10.00", "33.20", "10.12", "13.00", "36.74", "11.00"],
		'O2M': ["13.46", "19.53", "31.25", "18.29", "14.16", "17.44"],
		'基础架构': ["2.50", "3.00", "20.00", "119.00", "--", "--"],
		'控股': ["29.50", "6.31", "11.25", "5.88", "19.33", "3.50"],
		'来购': ["28.50", "52.86", "38.08", "44.00", "11.03", "9.73"],
		'萤火虫': ["--", "--", "16.00", "19.50", "35.50", "--"],
		'费控': ["--", "7.62", "--", "11.29", "6.50", "15.28"]
	}
};
var pressure = {
	data: {
		dev: [34, 36, 32, 33, 47, 40, 36, 33, 45, 30, 27, 22, 48, 49, 42],
		pm: [20, 16, 16, 16, 14, 12, 13, 7, 10, 4, 4, 7, 8, 12, 10],
		test: [14, 17, 17, 16, 27, 31, 32, 26, 16, 18, 16, 9, 11, 12, 14]
	},
	week: ["53周", "1周", "2周", "3周", "7周", "8周", "9周", "10周", "11周", "12周", "13周", "14周", "15周", "16周", "17周"]
};
var percentage = {
	data: {'费控': 36, 'HR': 48, '控股': 8, 'O2M': 43, '来购': 58, '萤火虫': 6, '基础架构': 69, '其他': 22},
	total:290
};
var status = {
	data: {'挂起': 9, '需求确认中': 177, '开发中': 36, '排期进行中': 22, '500测试': 8, '300测试': 8, 'PRD创建中': 16, '其他': 14},
	total:290
};
var prd = {
	data: [20, 13, 5, 12, 14, 14, 7, 20, 11, 15, 9, 12, 21, 12, 6],
	week: ["52周", "53周", "1周", "2周", "3周", "7周", "8周", "9周", "10周", "11周", "12周", "13周", "14周", "15周", "16周"]
};
var week = {
	created: [73, 6, 0, 65, 44, 23, 50, 45, 38, 26, 86, 50, 51, 35, 67],
	resolved: [63, 25, 0, 18, 36, 54, 63, 49, 49, 41, 61, 12, 41, 47, 49],
	week: ["3周", "4周", "5周", "6周", "7周", "8周", "9周", "10周", "11周", "12周", "13周", "14周", "15周", "16周", "17周"]
};

export default {
	route: {
		path: "/company/:projectkey",
		meta: {
			title: "公司概况"
		}
	},
	data() {
		return {
			companyName: '',
			time: {
				deadline:'',				
				startTime:'',
				endTime:'',
			},
			loading1: false,
			loading2: false,

			peopleConfig: {},
			peopleList: [],

			basicList: [],

			efficiencyThead:[],
			efficiencyTbody:[],

			pressure: null,
			pressureBar: {
		        tooltip: {
		            trigger: "axis",
		            borderColor: "#1970e3",
		            borderWidth: 1,
		            backgroundColor: "rgba(255,255,255,0.78)",
		            textStyle: {
		                fontSize: imgFontSize,
		                color: '#888'
		            },
		        },
		        color:["#f6cf57","#6091e5","#6eb372"],
		        legend: {
		            data:['产品','开发','测试'],
		            itemWidth:20,
		            itemHeight:20,
		            right:"10%",
		            top:10,
		            textStyle:{
		                color:"#999",
		                fontSize:imgFontSize
		            },

		        },
		        grid: {
		            left: '3%',
		            right: '4%',
		            bottom: '8%',
		            containLabel: true
		        },
		        xAxis: {
		            type : 'category',
		            data: [
		                {value:"第49周",textStyle:textStyle},
		                {value:"第49周",textStyle:textStyle},
		                {value:"第49周",textStyle:textStyle},
		                {value:"第49周",textStyle:textStyle},
		                {value:"第49周",textStyle:textStyle},
		                {value:"第49周",textStyle:textStyle},
		                {value:"第49周",textStyle:textStyle},
		                {value:"第49周",textStyle:textStyle},
		                {value:"第49周",textStyle:textStyle},
		                {value:"第49周",textStyle:textStyle},
		            ],
		            axisLine:{
		                show:false,
		            },
		            axisTick:{
		                show:false
		            }
		        },
		        yAxis : {
		            type : 'value',
		            // max:2.5,
		            axisLine:{
		                show:false,
		            },
		            axisTick:{
		                show:false
		            },
		            axisLabel:{
		                textStyle:{
		                    fontSize:imgFontSize,
		                    color:"#999"
		                }
		            }

		        },
		        dataZoom: [
		            {
		                type: 'inside',
		                xAxisIndex: [0],
		                start: 50,
		                end: 100,
		                zoomLock: true,
		            },
		        ],
		        series : [
		            {
		                name:'产品',
		                type:'bar',
		                barGap: '-30%',
		                data:[
		                    {value:1.7,label:label},
		                    {value:1.3,label:label},
		                    {value:1.5,label:label},
		                    {value:1.77,label:label},
		                    {value:1.8,label:label},
		                    {value:1.7,label:label},
		                    {value:1.3,label:label},
		                    {value:1.5,label:label},
		                    {value:1.77,label:label},
		                    {value:1.8,label:label},
		                ]
		            },
		            {
		                name:'开发',
		                type:'bar',                
		                barGap: '-30%',
		                data:[
		                    {value:1.2,label:label},
		                    {value:2.3,label:label},
		                    {value:1.3,label:label},
		                    {value:1.47,label:label},
		                    {value:1.7,label:label},
		                    {value:1.2,label:label},
		                    {value:2.3,label:label},
		                    {value:1.3,label:label},
		                    {value:1.47,label:label},
		                    {value:1.7,label:label},
		                ]
		            },
		            {
		                name:'测试',
		                type:'bar',                
		                barGap: '-30%',
		                data:[
		                    {value:1.3,label:label},
		                    {value:1.36,label:label},
		                    {value:1.7,label:label},
		                    {value:1.87,label:label},
		                    {value:1.8,label:label},
		                    {value:1.3,label:label},
		                    {value:1.36,label:label},
		                    {value:1.7,label:label},
		                    {value:1.87,label:label},
		                    {value:1.8,label:label},
		                ]
		            },


		        ]
		    },

		    percentageData: {
		    	total: 0,
		    	list:[]
		    },
		    percentage: null,
		    statusData: {
		    	total: 0,
		    	list:[]
		    },
		    status: null,
		    teamPie: {
		        color:teamRequirementsColor,
		        series: [
		            {
		                hoverAnimation:true,
		                type:'pie',
		                radius: ["25%", '60%'],
		                avoidLabelOverlap: false,
		                label: {
		                    normal: {
		                        show: false,
		                        /*formatter:'{b}:\n{d}%',
		                        textStyle: {
		                            fontSize: imgFontSize,
		                            color:"#999"
		                        }*/
		                        	
		                    },
		                    emphasis: {
		                        show: true,
		                        formatter:'{b}:\n{d}%',
		                        textStyle: {
		                            fontSize: imgFontSize,
		                            color:"#999"
		                        }
		                    }
		                },
		                labelLine: {
		                    normal: {
		                        show: true
		                    }
		                },
		                data:[
		                    {value:20},
		                    {value:20},
		                    {value:20},
		                    {value:20},
		                    {value:20},
		                ]
		            }
		        ]
		    },

		    prdLine: null,
		    weekLine: null,
		    lineChart: {
		        color:weekPrdColor,
		        toolbox:{show:false},        
		        tooltip: {
		            trigger: "axis",
		            borderColor: "#1970e3",
		            borderWidth: 1,
		            backgroundColor: "rgba(255,255,255,0.78)",
		            textStyle: {
		                fontSize: imgFontSize,
		                color: '#888'
		            },
		        },
		        legend: {
		            show:true,
		            data:[
		                {name:"PRD数量",icon:"roundRect" },
		            ],
		            itemWidth:20,
		            itemHeight:20,
		            right:"10%",
		            top:10,
		            textStyle:{
		                color:"#999",
		                fontSize:"1.5rem"
		            },

		        },
		        grid: {
		            // top:20,
		            left: '3%',
		            right: '4%',
		            bottom: '8%',
		            containLabel: true
		        },
		        xAxis : [
		            {
		                type : 'category',
		                data: [
		                    // {value:"第49周",textStyle:textStyle},
		                ],
		                axisLine:{
		                    show:false,
		                },
		                axisTick:{
		                    show:false
		                },
		            }
		        ],
		        yAxis : [
		            {
		                type : 'value',
		                // max:15,
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


		            }
		        ],
		        series : [],
		        dataZoom: [
		            {
		                type: 'inside',
		                xAxisIndex: [0],
		                start: 50,
		                end: 100,
		                zoomLock: true,
		            },
		        ],
		    }
		}
	},
	beforeMount() {
		// 获取时间		
		this.time.startTime = new Date(Date.now() - 1000*60*60*24*9).toLocaleDateString();
		this.time.endTime = new Date(Date.now() - 1000*60*60*24*2).toLocaleDateString();		
		this.time.deadline = new Date().toLocaleDateString();
		// 获取公司名称
		this.companyName = '成都研发中心';

		// 获取团队人员情况
		this.loading1 = true;
		var _self = this;
		setTimeout(function () {
			var _data = peopleData;
			_self.loading1 = false;
			_self.peopleConfig = _data.total;
			_self.peopleList = _data.list;
		},1000);

		
		// 获取公司项目情况
		this.loading2 = true;
		setTimeout(function () {
			_self.loading2 = false;
			_self.basicList = basicList;
		},1000);
			
		// 获取需求处理效率 &projectkey=CDDEV
		var _data = efficiency;
		var list = [];				
		for (let k in _data.data) {
			var obj = {
				name: k,
				value:  _data.data[k],
			};
			list.push(obj);
		}
		
		this.efficiencyThead = _data.time;
		this.efficiencyTbody = list;

		// 基于准备好的dom，初始化echarts实例
		this.$nextTick(function() {
			this.getPressure();
			this.getPercentagePie();
			this.getStatusPie();
			this.getPrdLine();
			this.getWeekLine();
		})
	},
	computed: {
		projectkey() {
			return this.$route.params.projectkey;
		},
	},
	methods: {
		getPressure() {
			this.pressure = echarts.init(document.getElementById("pressure-histogram")),
	        this.pressure.setOption(this.pressureBar);
	        // 获取压力数据
	        var _data = pressure;

			var xAxis = [];
            var pm = [];
            var dev = [];
            var test = [];

            for(var i = 0;i< _data.week.length;i++){
                var object = {};
                var pmObject = {};
                var devObject = {};
                var testObject = {};

                object.value = _data.week[i]
                object.textStyle = textStyle;
                xAxis.push(object)

                pmObject.value = _data.data.pm[i];
                pmObject.label = 'label';
                pm.push(pmObject);

                devObject.value = _data.data.dev[i];
                devObject.label = 'label';
                dev.push(devObject);

                testObject.value = _data.data.test[i];
                testObject.label = 'label';
                test.push(testObject);
            }   

            this.pressure.setOption({
                xAxis: {
                    data: xAxis
                },
                series : [
                    {
                        name:'产品',
                        type:'bar',
                        data:pm
                    },
                    {
                        name:'开发',
                        type:'bar',
                        data:dev
                    },
                    {
                        name:'测试',
                        type:'bar',
                        data:test
                    },
                ]
            });
		},
		getPercentagePie() {
			this.percentage = echarts.init(document.getElementById("percentagePie")),
	        this.percentage.setOption(this.teamPie);
	        
	        var _data = percentage;

            var arr= [];
            for(var i  in _data['data']){
                var object = {};
                object.value = _data['data'][i];
                object.name = i;
                arr.push(object);
            }
            var list = arr.map((obj,index) => {
            	obj.color = teamRequirementsColor[index];
            	return obj;
            });

			this.percentageData.total = _data['total'];
            this.percentageData.list = list;
            this.percentage.setOption({
                series: [{data:arr}]
            });

		},
		getStatusPie() {
			this.status = echarts.init(document.getElementById("statusPie")),
	        this.status.setOption(this.teamPie);
	        
	        var _data = status;

            var arr= [];
            for(var i  in _data['data']){
                var object = {};
                object.value = _data['data'][i];
                object.name = i;
                arr.push(object);
            }
            var list = arr.map((obj,index) => {
            	obj.color = teamRequirementsColor[index];
            	return obj;
            });

			this.statusData.total = _data['total'];
            this.statusData.list = list;
            this.status.setOption({
                series: [{data:arr}]
            });
		},
		getPrdLine() {
			this.prdLine = echarts.init(document.getElementById("prdLine")),
	        this.prdLine.setOption(this.lineChart);
	        
	        var _data = prd;

            var xAxis = [];
            for(var i = 0;i< _data.week.length;i++){
                var obj = {
                    value: _data.week[i],
                    textStyle: textStyle,
                };
                xAxis.push(obj);
            }

            var series = {
                name:'PRD数量',
                type:'line',
                areaStyle: areaStyle,
                data: _data.data,
                smooth:true,
            };
            this.prdLine.setOption({
            	legend: {data:[{name:"PRD数量",icon:"roundRect" },],},
                xAxis : [{ data: xAxis,}],
                series : [series],
            });		
		},
		getWeekLine() {
			this.weekLine = echarts.init(document.getElementById("weekLine")),
	        this.weekLine.setOption(this.lineChart);
	        
	        var _data = week;

            var arr = [];
            for(var i = 0;i< _data.week.length;i++){
                var object =  {};
                object.value = _data.week[i]
                object.textStyle = textStyle;
                arr.push(object)
            }
            this.weekLine.setOption({
            	legend: {
            		data:[
            			{name:"完成",icon:"roundRect" },
						{name:"新增",icon:"roundRect" },
            		],
            	},
                xAxis : [{ data: arr,}],
                series : [
                    {
                        name:'完成',
                        type:'line',
                        areaStyle: areaStyle,
                        data:_data.resolved,
                		smooth:true,
                    },
                    {
                        name:'新增',
                        type:'line',
                        areaStyle: areaStyle,
                        data:_data.created,
                        smooth:true,
                    },

                ]
            });	
		}
	}
}