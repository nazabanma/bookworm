<template>
  <div>
    <view class="container">
      <view class="kindItems" v-for="(item, index) in kindList" :key="index" @click="linkType(index)">
        <a class="kindItem">{{item.typename}}</a>
      </view>
    </view>
  </div>
</template>

<script>
    import {
        globalBus
    } from "@/components/globalBus";

    export default {
        props: ["kindList"],
        data() {
            return {

            };
        },
        mounted() {

        },
        methods: {
            linkType(index) {
                this.$emit("getPick", index);
            },
        }
    };
</script>
<style scoped>
    .container {
        display: table;
        position: relative;
        /* display: table-row;对padding不敏感，这里只能用table进行限制 */
        width: 100%;
        height: 0.9rem;
        padding: 0 0 0 0.3rem;
        vertical-align: middle;
    }
    /* 类型列表 */
    
    .kindItems {
        display: table-cell;
        /* display: -webkit-flex; */
        word-break: break-all;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: flex-start;
        align-content: flex-start;
        /* background-color: antiquewhite; */
        vertical-align: middle;
    }
    /* 单个类型： a */
    
    .kindItem {
        /* flex-grow: 1; */
        font-size: 24rpx;
        text-align: center;
        vertical-align: middle;
        color: #36282b;
        /* border: 1px solid red; */
    }
    /* 选中之后的样式 */
    /* .kindItem:after , */
    
    .kindItem:visited:after,
    .kindItem:hover:after,
    .kindItem:active:after,
    .kindItem.active:after {
        position: relative;
        display: block;
        content: "";
        margin: 0 auto;
        height: 4rpx;
        max-width: 80rpx;
        /* align-items: center;
        align-content: center; */
        left: 0;
        top: 10rpx;
        bottom: 30rpx;
        background: #521d23;
        border-radius: 2rpx;
        color: #521d23;
    }
</style>