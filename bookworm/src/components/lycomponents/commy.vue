<template>
    <div>
        <view class="cart" v-for="(items,index) in bookList" :key="index">
            <view class="top">
                <img src="../../../static/images/mime2.png">
                <view class="shopname">淘書斋</view>
                <view class="result">
                    <view class="res" v-if="res === '交易成功'">交易成功</view>
                    <view class="res" v-else="res === '等待买家付款'">等待买家付款</view>
                </view>
            </view>
            <view class="middle">
                <img :src="items.book_img" alt="">
                <view class="name">《{{items.book_name}}》</view>
                <view class="right">
                    <span class="price">￥ {{items.book_price}}</span>
                    <span class="num">X {{items.count}}</span>
                </view>

                <view class="allcount">
                    <view class="allprice">￥ {{items.book_price}}</view>
                    <view class="allnum">共{{items.count}}件商品 总计：</view>
                </view>

            </view>
            <!-- 按钮 操作 -->
            <view class="run">
                <view class="runbtn" v-if="run === '待发货'">
                    <button class="btn2" @click="cancel">取消订单</button>
                    <button class="btn1" @click="revise">修改地址</button>
                </view>
                <view class="runbtn" v-else-if="run === '待收货'">
                    <button class="btn2" @click="confirm">确认收货</button>
                    <button class="btn1" @click="check">查看物流</button>
                </view>
                <view class="runbtn" v-else-if="run === '待评价'">
                    <button class="btn3" @click="assess">去评价</button>
                </view>
                <!-- <view class="runbtn" v-else-if="run === '评价后'">
                    <button class="btn1" @click="del">删除订单</button>
                </view> -->
                <view class="runbtn" v-else="run === '待付款'">
                    <button class="btn4" @click="pay">付款</button>
                    <button class="btn1" @click="cancel">取消订单</button>
                </view>

            </view>

        </view>

        <!-- 弹窗 -->
        <view v-if="isdisplay">
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
    export default {
        props: ["bookList", "run", "res", "isdisplay"],

        // props: ["isdisplay"], //弹框的引用
        data() {
            return {
                res: '',
                run: '',
                bookList: [],
            };
        },

        methods: {
            //==============  取消订单   ===========
            cancel() {
                this.isdisplay = !this.isdisplay;

                wx.hideTabBar({
                    animation: false //隐藏tabbar
                })

                console.log("open = " + this.isdisplay);
            },
            close() {
                this.isdisplay = !this.isdisplay;
                console.log("close = " + this.isdisplay);
            },
            //==============  取消订单   ===========

            //==============  修改地址   ===========
            revise() {
                wx.navigateTo({
                    url: "/pages/counter/main"
                });
            },
            //==============  修改地址   ===========

            //==============  确认收货  ===========
            confirm() {

            },
            //==============  确认收货  ===========

            //==============  查看物流   ===========
            check() {

            },
            //==============  查看物流   ===========

            //==============  去评价   ===========
            assess() {
                wx.navigateTo({
                    url: "/pages/counter/main"
                });
            },
            //==============  去评价   ===========

            //==============  付款   ===========
            pay() {

            },
            //==============  付款   ===========
            delete() {

            },
        }
    }
</script>

<style scoped>
    .cart {
        display: inline-block;
        width: 96%;
        margin: 0 2% 0 2%;
        background-color: white;
        height: 400rpx;
        border-radius: 15rpx;
    }
    /* 顶部标签   始 */
    
    .top {
        width: 100%;
        height: 20%;
    }
    
    .top img {
        float: left;
        margin-left: 20rpx;
        width: 54rpx;
        height: 50rpx;
        margin-top: 20rpx;
    }
    
    .shopname {
        float: left;
        margin-top: 25rpx;
        margin-left: 10rpx;
        max-width: 25%;
        font-size: 30rpx;
        color: #36282B;
        text-align: center;
    }
    
    .result {
        float: right;
        margin-right: 20rpx;
        margin-top: 30rpx;
        height: 10%;
        font-size: 24rpx;
        color: #BC2B37;
    }
    
    .res {
        float: right;
    }
    /* 顶部标签   终*/
    /* 中部标签   始 */
    
    .middle {
        margin-top: 10rpx;
        width: 100%;
        height: 55%;
    }
    
    .middle img {
        float: left;
        margin-left: 20rpx;
        width: 200rpx;
        height: 180rpx;
    }
    
    .name {
        float: left;
        margin-left: 10rpx;
        max-width: 40%;
        font-size: 30rpx;
        color: #36282B;
        /* white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis; */
    }
    
    .right {
        float: none;
        width: 25%;
        height: 50%;
        top: 0rpx;
        margin-left: 520rpx;
    }
    
    .price {
        float: right;
        width: 100%;
        text-align: right;
        margin-right: 20rpx;
        margin-top: 2rpx;
        font-size: 28rpx;
        color: #36282B;
        /* margin-top: 120rpx;   书名没有出来时的 顶部位置*/
    }
    
    .num {
        float: right;
        width: 100%;
        text-align: right;
        margin-right: 20rpx;
        margin-top: 20rpx;
        font-size: 24rpx;
        color: #36282B;
    }
    
    .allcount {
        height: 10%;
        width: 100%;
        margin-top: 65rpx;
    }
    
    .allnum {
        float: right;
        margin-right: 2rpx;
        margin-top: 4rpx;
        width: 28%;
        letter-spacing: 2rpx;
        font-size: 24rpx;
        color: #36282B;
        white-space: nowrap;
    }
    
    .allprice {
        font-size: 28rpx;
        max-width: 25%;
        float: right;
        margin-right: 20rpx;
        text-align: right;
    }
    
    .run {
        width: 100%;
        height: 25%;
        float: none;
    }
    
    button {
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
    }
    
    .btn1 {
        color: #A9803E;
        border-color: #A9803E;
    }
    
    .btn2 .btn3 .btn4 {
        color: #521D23;
        border-color: #521D23;
    }
    
    .btn3 {
        width: 18%;
    }
    
    .btn4 {
        width: 16%;
    }
    /* 以下为弹框样式 */
    
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
        height: 55%;
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
        position: fixed;
        width: 100%;
        height: 100rpx;
        text-align: center;
        font-size: 30rpx;
        vertical-align: middle;
        padding: 0rpx;
        line-height: 98rpx;
        bottom: 0;
    }
    
    .tem {
        float: left;
        width: 49.5%;
        height: 96%;
        border: 1rpx solid #A9803E;
        color: #A9803E;
        bottom: 0;
    }
    
    .ensure {
        float: left;
        width: 49.5%;
        height: 96%;
        border: 1rpx solid rgb(82, 29, 35);
        color: rgb(82, 29, 35);
        bottom: 0;
    }
    /* 弹框样式   end */
</style>