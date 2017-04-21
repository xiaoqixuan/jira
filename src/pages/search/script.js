export default {
	route: {
		path: "/search",
		meta: {
			title: "项目搜索"
		}
	},
	data() {
		return {	
			isOpen1: false,
			isOpen2: false,
			loading: false,
			searchStart: false,
			history: [], // 历史记录
			result: [],  // 搜索结果

			kw:'',
            place: {value: '',label: '地点'},	
			placeList: [
                {value: '',label: '地点'},
                {value: 'cd',label: '成都'},
            ],
            state: {value: '',label: '状态'},		
            stateList: [
                {value: '',label: '状态'},
                {value: 'zc',label: '正常'},
                {value: 'yj',label: '预警'},
                {value: 'gw',label: '高危'},
            ],
		}
	},
	beforeMount() {
		this.history = JSON.parse(window.localStorage.getItem("search-history"));
	},
	methods: {
		changeFilter(n,type) {
			let str = type;
			this[str] = n;

			this.getResult();
		},
		getResult() {	
			this.searchStart = true;
			this.loading = true;		
			let status = this.state.value;
			let place = this.place.value;
			let kw = this.kw;

			
			this.getData('/search.do?index&status='+status+'&place='+place+'&summary='+kw)
				.then(_data => {
					this.loading = false;

					let obj = _data;
					let result = [];
					for (let i in obj) {
						var o = {
							key: i,
							title: obj[i],
						};
						result.push(o);
					}
					this.result = result;
				}).catch(_err => {
					this.loading = false;
					alert(_err);
				})
		},
		toDetail(item) {
			// 存储历史记录
			this.saveHistory(item);

			// 跳转项目详情
		},
		saveHistory(kw) {
		    // 取出现有记录
		    var history = JSON.parse(window.localStorage.getItem("search-history"));

		    var newHistory = [];
		    newHistory.push(kw);
		    if(history){// 有记录
		        // 是否重复
		        history.forEach(function (obj,index) {
		            if (obj.key != kw.key){
		                newHistory.push(obj);
		            }
		        });
		        // history.reverse();
		        if (newHistory.length > 8){
		            newHistory = newHistory.slice(0,8);
		        }
		    }

		    window.localStorage.setItem("search-history",JSON.stringify(newHistory));
		    // renderHistory(); // 顺序变更,再次渲染
		},
		deleteHistory() {
			if(confirm("确定要删除历史记录？")){
			   window.localStorage.setItem("search-history",null);
			   this.history = [];
			}
		}
	}
}