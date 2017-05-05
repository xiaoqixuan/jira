var importantList = [
	{issuekey: "CDDEV-8871", issuetitle: "EC客户通V1.0-新建/编辑客户", isimportant: true,},
	{issuekey: "CDDEV-8439", issuetitle: "【专项】杜总专项二期：库存管理、台账管理、费用报销", isimportant: true,},
	{issuekey: "CDDEV-8281", issuetitle: "海外购超市POS项目", isimportant: true, isconcern: "true",},
	{issuekey: "CDDEV-7803", issuetitle: "智能定价项目（O2M接爬虫数据）", isimportant: true,},
	{issuekey: "CDDEV-4648", issuetitle: "国美会员管理平台", isimportant: true, isconcern: "true",},
];
export default {
	route: {
		path: "/important",
		meta: {
			title: "集团重点项目"
		}
	},
	data() {
		return {
			loading: false,
			importantList: [],
		}
	},
	beforeMount() {
		this.loading = true;

		var _self = this;
		setTimeout(() => {
			var _data = importantList;
			this.loading = false;
			_data.forEach((obj,index)=> {
				obj.isconcern = obj.isconcern ? obj.isconcern : false;
			});
			this.importantList = _data;
		},1000);
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