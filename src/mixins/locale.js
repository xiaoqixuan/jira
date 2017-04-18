import { t } from './locale/index';

export default {
    methods: {
        t(...args) {
            return t.apply(this, args);
        }
    }
};
