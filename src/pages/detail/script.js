export default {
	route: {
		path: "/detail/:issuekey",
		meta: {
			title: "项目详情"
		}
	},
	data() {
		return {
			// name1:1,
			// name2:2,
			// name3:3,
			info: {},
		}
	},
	beforeMount() {
		this.getData(`/team.do?detail&issuekey=${this.issuekey}`)
			.then(_data => {
				this.info = _data;
			}).catch(_err => {
				alert(_err);
			})
	},
	computed: {
		issuekey() {
			return this.$route.params.issuekey
		},
	},
	methods: {
		
	}
}