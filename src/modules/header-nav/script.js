export default {
	data() {
		return {};
	},
	props: ['title'],
	methods: {
		onBack() {
			this.$router.back();
		},
	}
}