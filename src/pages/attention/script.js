var attentionList = [
	{isconcern: true,isimportant: true,issuekey: "CDDEV-82811",issuetitle: "海外购超市POS项目"},
	{isconcern: true,isimportant: false,issuekey: "CDDEV-55922",issuetitle: "年会餐券"},
	{isconcern: true,isimportant: false,issuekey: "CDDEV-269242",issuetitle: "【报表】新增合同台账功能"},
];
export default {
	route: {
		path: "/attention",
		meta: {
			title: "我的关注"
		}
	},
	data() {
		return {
			loading: false,
			attentionList: [],
		}
	},
	beforeMount() {
		this.loading = true;
		var _self = this;
		setTimeout(() => {
			var _data = attentionList;
			_self.loading = false;
			_self.attentionList = _data;
		},1000);
	},
	methods: {		
		doAttention(item,_index) {
			this.attentionList.splice(_index, 1);
			// 发送请求
			/*this.getData('/team.do?projectconcern&issuekey=' + item.issuekey)
				.then(_data => {
					console.log('取消关注成功');
				}).catch(_err => {
					alert(_err);
				});*/
		}
	}
}