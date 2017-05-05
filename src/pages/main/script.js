var teamList = [
	{moduleKey: "10036", moduleName: "费控"},
	{moduleKey: "10035", moduleName: "HR"},
	{moduleKey: "10208", moduleName: "控股"},
	{moduleKey: "10043", moduleName: "O2M"},
	{moduleKey: "10039", moduleName: "来购"},
	{moduleKey: "10205", moduleName: "萤火虫"},
	{moduleKey: "10102", moduleName: "基础架构"}
];

var projectList = [
	{issuetitle: "智能定价项目（O2M接爬虫数据）", issuekey: "CDDEV-7803", publishtime: "2017-05-05", status: "开发中", projectstatus: "正常", soncount: 56},
	{issuetitle: "Cloudzone模块TPS和流量统计等功能设计评审", issuekey: "CDDEV-7805", publishtime: "2017-05-25", status: "开发中", projectstatus: "正常", soncount: 16},
];

export default {
	route: {
		path: "/main",
		meta: {
			title: "首页"
		}
	},
	data() {
		return {
			isOpen1: false,
			isOpen2: false,
			loading: false,
			teamUrl:'',
			teamList:[],
			projectList:[],
		}
	},
	beforeMount() {
		// 获取团队列表
		this.teamList = teamList;

		this.loading = true;
		// 获取集团重点项目列表
		var _self = this;
		setTimeout(function () {
			_self.loading = false;
			_self.projectList = projectList;
		},1000)
		
	},
	methods: {
		
	}
}