<template>
    <div class="popup">
        <!-- 打开弹窗按钮 -->


        <button @click="open" class="btn">取消订单</button>

        <!-- 弹窗 -->
        <view v-if="isdisplay">
            <!-- v-if="isdisplay" @click="close" -->
            <!-- 遮盖层 -->
            <view class="mask">

                <!-- 弹窗内容 -->
                <view class="modal">
                    <view class="title">取消订单</view>
                    <view class="choose">请选择取消订单的原因</view>
                    <view class="options">
                        <view class="row">
                            <view class="text">我不想买了</view>
                            <!-- <check-box></check-box> -->
                        </view>
                        <view class="row">
                            <view class="text">信息填写错误，重新拍</view>
                            <!-- <check-box></check-box> -->
                        </view>
                        <view class="row">
                            <view class="text">卖家缺货</view>
                            <!-- <check-box></check-box> -->
                        </view>
                        <view class="row">
                            <view class="text">同城见面交易</view>
                            <!-- <check-box></check-box> -->
                        </view>
                        <view class="row">
                            <view class="text">其他原因</view>
                            <!-- <check-box></check-box> -->
                        </view>
                    </view>
                    <view class="footer">
                        <view class="tem">暂不取消</view>
                        <view class="ensure" @click="close">确定取消</view>
                    </view>
                </view>
            </view>
        </view>
    </div>
</template>

<script>
    import checkBox from "@/components/lycomponents/checkbox";

    import {
        globalBus
    } from "@/components/globalBus";

    export default {

        props: ["isdisplay"],
        components: {
            checkBox,
        },

        data() {
            return {
                // isdisplay: '',
            }
        },
        methods: {

            open() {
                this.isdisplay = !this.isdisplay;
                console.log("open = " + this.isdisplay);
                // globalBus.$emit("swiperFlag", this.isdisplay);

            },
            close() {
                this.isdisplay = !this.isdisplay;
                console.log("close = " + this.isdisplay);
            },
            cancel() {

            }
        }
    }
</script>
<style scoped>
    /* 弹窗 (background) */
    
    .btn {
        float: right;
        width: 22%;
        height: 60rpx;
        margin-top: 10rpx;
        margin-right: 20rpx;
        background: white;
        /* 字体设置处于按钮居中位置 */
        padding: 0rpx;
        text-align: center;
        vertical-align: middle;
        font-size: 28rpx;
        line-height: 60rpx;
        /* 字体设置处于按钮居中位置 */
        border-radius: 30rpx;
        border: 1rpx solid;
        white-space: nowrap;
        /* 文本不换行 */
        color: #521D23;
        border-color: #521D23;
    }
    
    .mask {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgb(184, 182, 182);
        z-index: 9000;
        opacity: 1;
    }
    
    .modal {
        /* display: none; */
        /* 默认隐藏 */
        position: fixed;
        z-index: 2;
        width: 100%;
        height: 50%;
        overflow: auto;
        background: rgb(255, 255, 255);
        bottom: 0;
    }
    /* 弹窗内容 */
    
    .title {
        margin-top: 35rpx;
        text-align: center;
        font-size: 30rpx;
        color: #36282B;
        /* background: cyan; */
    }
    
    .choose {
        position: relative;
        margin-top: 50rpx;
        margin-left: 4.8%;
        margin-right: 4.8%;
        font-size: 24rpx;
        /* background: antiquewhite; */
    }
    
    .options {
        position: relative;
        margin-left: 4.8%;
        margin-right: 4.8%;
        /* background: azure; */
    }
    
    .row {
        float: left;
        width: 100%;
        font-size: 28rpx;
        margin-top: 50rpx;
        /* background: aquamarine; */
    }
    
    .text {
        float: left;
    }
    
    check-box {
        background: #000;
        float: left;
        margin-left: 642rpx;
    }
    
    .footer {
        position: relative;
        float: left;
        width: 100%;
        height: 100rpx;
        text-align: center;
        font-size: 30rpx;
        vertical-align: middle;
        padding: 0rpx;
        line-height: 98rpx;
        margin-bottom: 0rpx;
    }
    
    .tem {
        float: left;
        width: 49.5%;
        height: 98%;
        border: 1rpx solid #A9803E;
        color: #A9803E;
    }
    
    .ensure {
        float: left;
        width: 49.5%;
        height: 98%;
        border: 1rpx solid rgb(82, 29, 35);
        color: rgb(82, 29, 35);
    }
</style>