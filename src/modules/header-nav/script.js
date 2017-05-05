var teamList = [
	{moduleKey: "10036", moduleName: "费控"},
	{moduleKey: "10035", moduleName: "HR"},
	{moduleKey: "10208", moduleName: "控股"},
	{moduleKey: "10043", moduleName: "O2M"},
	{moduleKey: "10039", moduleName: "来购"},
	{moduleKey: "10205", moduleName: "萤火虫"},
	{moduleKey: "10102", moduleName: "基础架构"}
];

export default {
	data() {
		return {
			isOpen: false,
			teamList: [],
		};
	},
	props: ['title','projectkey'],
	beforeMount() {
		if (this.projectkey) {
			this.teamList = teamList;
		}
	},
	methods: {
		onBack() {
			if (this.title == '提示') {
				this.$router.push('/main');
			} else {
				this.$router.back();
			}
		},
	}
}