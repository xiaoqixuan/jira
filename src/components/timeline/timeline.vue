<template>
    <ul :class="classes">
        <slot></slot>
    </ul>
</template>
<script>
    const prefixCls = 'mep-timeline';

    export default {
        name: 'Timeline',
        props: {
            pending: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-pending`]: this.pending
                    }
                ];
            }
        }
    };
</script>
