var info = {
	count: 12,
	moduleName: "费控",
	peopleConfig: [
		{name: "开发人员", value: 12}, 
		{name: "产品经理", value: 0}, 
		{name: "测试人员", value: 0},
		{name: "其他人员", value: 0},
	],
	taskConfig: [
		{name: "完成需求", value: 11}, 
		{name: "未完成需求", value: 36}, 
		{name: "创建开发子任务", value: 10},
		{name: "关闭开发子任务", value: 27},
		{name: "创建测试子任务", value: 0},
		{name: "关闭测试子任务", value: 0},
	],
};
var projectList = [
	{issuekey:"CDDEV-10633",issuetitle: "测试并修改流程BUG",status: "需求确认中"},
	{issuekey:"CDDEV-2763",issuetitle: "CO凭证还原接口",status: "已关闭",isconcern: "true",isimportant: false},
	{issuekey:"CDDEV-10633",issuetitle: "测试并修改流程BUG",status: "需求确认中"},
	{issuekey: "CDDEV-7803",issuetitle: "智能定价项目（O2M接爬虫数据）",status: "开发中",isimportant: true},
];
export default {
	route: {
		path: "/team/:teamkey",
		meta: {
			title: "研发团队概况"
		}
	},
	data() {
		return {
			loading: false,
			info: {
				peopleConfig: [],
				taskConfig: [],
			},
			time:{
				startTime:'',
				endTime:'',
			},
			projectList: [],
		}
	},
	beforeMount() {
		this.loading = true;

		// 获取时间
		this.time.startTime = new Date(Date.now() - 1000*60*60*24*9).toLocaleDateString();
		this.time.endTime = new Date(Date.now() - 1000*60*60*24*2).toLocaleDateString();
		
		// 获取团队详情
		var _self = this;
		setTimeout(() => {				
			this.loading = false;
			this.info = info;
		},1000);
		// 获取团队列表
		var _data = projectList;
		_data.forEach((obj,index)=> {
			obj.isconcern = obj.isconcern ? obj.isconcern : false;
		});
		this.projectList = _data;
	},
	computed: {
		teamkey() {
			return this.$route.params.teamkey
		},
	},
	methods: {
		doAttention(item) {
			item.isconcern = !item.isconcern;
			// 发送请求
			/*this.getData('/team.do?projectconcern&issuekey=' + item.issuekey)
				.then(_data => {
					console.log('切换关注状态成功');
				}).catch(_err => {
					alert(_err);
				});*/
		}
	}
}