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
			teamUrl:'',
			teamList:[],
		}
	},
	beforeMount() {
		// 获取团队列表
		this.getData('/mainshow.do?progress&jirauser=')
			.then(_data => {
				this.teamList = _data;
			}).catch(_err => {
				alert(_err);
			})
	},
	methods: {
		
	}
}