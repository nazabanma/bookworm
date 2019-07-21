<template>
    <div>
        <view class="cart">
            <view class="top">
                <img src="../../../static/images/mime2.png">
                <view class="shopname">淘書斋</view>
                <view class="result">
                    <view class="res" v-if="res === '交易成功'">交易成功</view>
                    <view class="res" v-else="res === '等待买家付款'">等待买家付款</view>
                </view>
            </view>
            <view class="middle" v-for="(items,index) in bookList" :key="index">
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
                <view class="runbtn" v-else="run === '待付款'">
                    <button class="btn4" @click="pay">付款</button>
                    <button class="btn1" @click="cancel">取消订单</button>
                </view>
            </view>
        </view>
    </div>
</template>

<script>
    export default {
        // props: ["bookList", "res", "run"],

        data() {

            return {
                res: '等待买家付款',
                run: '待付款',
                bookList: [{
                    book_img: '',
                    book_name: '哎呀，我的牙！',
                    book_price: '17.50',
                    count: '1'
                }], //books的集合
                books: {
                    book_img: '',
                    book_name: '',
                    book_price: '',
                    count: ''
                },
            };
        },

        methods: {
            //==============  取消订单   ===========
            cancel() {

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



        }
    }
</script>

<style scoped>
    /* .container {
        display: block;
        top: 0px;
        margin: 0;
        height: auto;
        position: relative;
        width: 100%;
        padding: 0.9rem 0 0;
        background-color: #F5F5F5;
    }*/
    
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
        max-width: 50%;
        font-size: 30rpx;
        color: #36282B;
    }
    
    .right {
        float: none;
        width: 22%;
        height: 50%;
        top: 0rpx;
        margin-left: 560rpx;
    }
    
    .price {
        float: right;
        margin-right: 20rpx;
        margin-top: 2rpx;
        font-size: 28rpx;
        color: #36282B;
        /* margin-top: 120rpx;   书名没有出来时的 顶部位置*/
    }
    
    .num {
        float: right;
        margin-right: 20rpx;
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
        margin-right: 0rpx;
        margin-top: 4rpx;
        width: 28%;
        letter-spacing: 2rpx;
        font-size: 24rpx;
        color: #36282B;
        white-space: nowrap;
    }
    
    .allprice {
        font-size: 28rpx;
        max-width: 22%;
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
</style>