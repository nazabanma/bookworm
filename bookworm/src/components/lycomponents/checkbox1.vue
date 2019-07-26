<template>
    <div>
        <input type="checkbox" class="input_check" :disabled="disabled" :checked="checked" @change="change" /></div>
</template>
<script>
    export default {
        data() {
            return {
                // checked: false
            }
        },
        model: {
            prop: 'checked',
            event: 'change'
        },
        methods: {
            change(e) {
                this.$emit('change', e.target.checked)
            }
        },
        props: {
            checked: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            }
        }
    }
</script>
<style lang="less" scoped>
    input[type=checkbox] {
        width: 30rpx;
        height: 30rpx;
        -webkit-appearance: none;
        background-color: transparent;
        border: 0;
        /* outline: 0 !important; */
        color: #d8d8d8;
        position: relative;
    }
    
    input[type=checkbox]:before {
        content: "";
        display: block;
        width: 30rpx;
        height: 30rpx;
        border: 2rpx solid #ddd;
        background-color: #fff;
        box-sizing: border-box;
        border-radius: 3px;
        position: absolute;
    }
    
    input[type=checkbox]:disabled:before {
        content: "";
        display: block;
        width: 30rpx;
        height: 30rpx;
        border: 2rpx solid #333;
        background-color: #333;
        box-sizing: border-box;
        border-radius: 3px;
        position: absolute;
    }
    
    input[type=checkbox]:checked:before {
        content: "";
        display: block;
        width: 30rpx;
        height: 30rpx;
        border: 2rpx solid #D2A47E;
        background-color: #D2A47E;
        box-sizing: border-box;
        border-radius: 3px;
        position: absolute;
    }
    
    input[type=checkbox]:checked:after {
        content: "";
        display: block;
        width: .15rem;
        height: .3rem;
        border-left: .06rem solid #fff;
        border-top: .06rem solid #fff;
        border-radius: .06rem;
        box-sizing: border-box;
        position: absolute;
        transform: rotate(-135deg) translate(-70%, 25%);
    }
</style>