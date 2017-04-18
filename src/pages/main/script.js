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
		}
	},
	mounted() {
		this.getData('/PermitService/permit/report/list/company/23')
			.then(_data => {
				if (_data.code == 200) {
					this.allReports = _data.companyReportList;
				}
			})
	},
	computed: {
		reportList() {
			let _list = this.allReports.slice((this.curPage - 1) * this.pageSize, this.curPage * this.pageSize);
			return _list;
		}
	},
	methods: {
		onCreate() {
			this.$router.push('/actual-emissions-info1');
		},
		onViewDetails(report) {
			this.$router.push(`/preview/${report.reportId}`);
		},
		onPageChange(_page) {
			this.curPage = _page;
		}
	}
}