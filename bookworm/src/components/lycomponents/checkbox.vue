<template>
    <div class="checkbox">
        <input type="checkbox" id="check" :checked="checked" @change="change">
        <label for="check"></label>
    </div>
</template>

<script>
    export default {
        mhthods: {
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

<style scoped>
    .checkbox {
        position: relative;
        width: 30rpx;
        height: 30rpx;
        /* background: #000; */
    }
    
    .checkbox input {
        position: absolute;
        opacity: 0;
    }
    
    input+label {
        width: 30rpx;
        height: 30rpx;
        background-color: #ffffff;
        display: block;
        cursor: pointer;
        position: absolute;
        border: 1rpx solid #000;
        border-radius: 50%;
    }
    
    input:checked+label {
        content: '\2714';
        font-size: 30rpx;
        text-align: center;
        position: absolute;
        color: #ffffff;
        display: block;
    }
</style>