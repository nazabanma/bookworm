<template>
    <div class="popup">
        <!-- 打开弹窗按钮 -->
        <!-- <button @click="open" class="Btn">打开弹窗</button> -->

        <!-- 弹窗 -->
        <view class="modal">
            <!-- v-if="isdisplay" @click="close" -->
            <!-- 弹窗内容 -->
            <view class="title">取消订单</view>
            <view class="choose">请选择取消订单的原因</view>
            <view class="options">
                <view class="row">
                    <view class="text">我不想买了</view>
                    <check-box></check-box>
                </view>
                <view>
                    <view class="text">信息填写错误，重新拍</view>
                    <check-box></check-box>
                </view>
                <view>
                    <view class="text">卖家缺货</view>
                    <check-box></check-box>
                </view>
                <view>
                    <view class="text">同城见面交易</view>
                    <check-box></check-box>
                </view>
                <view>
                    <view class="text">其他原因</view>
                    <check-box></check-box>
                </view>
            </view>
            <view class="footer">
                <view class="tem">暂不取消</view>
                <view class="ensure">确定取消</view>
            </view>
        </view>

    </div>
</template>

<script>
    import checkBox from "@/components/lycomponents/checkbox";

    export default {

        components: {
            checkBox,
        },

        data: {
            // isdisplay: 'true',
        },
        methods: {

            open() {
                this.isdisplay = 'true';
                console.log("open = " + this.visible);

            },
            close() {
                this.visible = 'false';
                console.log("close = " + this.visible);
            },
            cancel() {

            }
        }
    }
</script>
<style scoped>
    /* 弹窗 (background) */
    
    .modal {
        /* display: none; */
        /* 默认隐藏 */
        position: fixed;
        z-index: 2;
        width: 100%;
        height: 50%;
        overflow: auto;
        background: white;
    }
    /* 弹窗内容 */
    
    .title {
        margin-top: 35rpx;
        text-align: center;
        font-size: 30rpx;
        color: #36282B;
        background: cyan;
    }
    
    .choose {
        position: relative;
        margin-top: 50rpx;
        margin-left: 36rpx;
        font-size: 24rpx;
        background: antiquewhite;
    }
    
    .options {
        position: relative;
        margin-top: 50rpx;
        margin-left: 36rpx;
        font-size: 28rpx;
        line-height: 50rpx;
        background: azure;
    }
    
    .row {
        float: left;
    }
    
    check-box {
        background: #000;
        float: left;
        margin-right: 36rpx;
    }
    
    .footer {
        position: relative;
        float: left;
        width: 100%;
        height: 100rpx;
        text-align: center;
        font-size: 30rpx;
    }
    
    .tem {
        float: left;
        width: 50%;
        height: 100rpx;
        border: 2rpx, rgb(169, 128, 62);
        color: rgb(169, 128, 62);
    }
    
    .ensure {
        float: left;
        width: 50%;
        height: 100rpx;
        border: 2rpx, rgb(82, 29, 35);
        color: rgb(82, 29, 35);
    }
</style>