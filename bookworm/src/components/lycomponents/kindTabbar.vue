<template>
    <div>
        <!--导航条-->
        <view class="container">
            <view class="kindItems" v-for="(item, index) in kindList" :key="index" @click="linkType(item)">
                <!-- <view class="kindItems" v-for="(item, index) in kindList" :key="index"> -->
                <a class="kindItem" :class="pick_item==item.id ? 'active': ''" @click="getData">{{item.typename}}</a>
            </view>
        </view>

        <!--全部-->
        <view v-if="pick_item==''">
            <view v-if="show">
                <commy-bar :bookList="bookList" :run="''" :res="res" >
                </commy-bar>
            </view>
            <view v-if="!show" style="text-align: center;">
                <img :src="'/static/images/empty_orders.png'">
                <view class="txt">客官，您还没有订单呢~</view>
            </view>
        </view>

        <!--待付款-->
        <view v-if="pick_item == 0">
            <view v-if="show">
                <commy-bar :bookList="bookList" :run="0" :res="res" >
                </commy-bar>
            </view>
            <view v-if="!show" style="text-align: center;">
                <img :src="'/static/images/msg_buy_wait.png'">
                <view class="txt">谈钱伤感情，该付还是要付的~</view>
            </view>
        </view>

        <!--待发货-->
        <view v-if="pick_item == 1">
            <view v-if="show">
                <commy-bar :bookList="bookList" :run="1" :res="res" >
                </commy-bar>
            </view>
            <view v-if="!show" style="text-align: center;">
                <img :src="'/static/images/msg_empty_orders.png'">
                <view class="txt">客官，您还没有订单呢~</view>
            </view>
        </view>

        <!--待收货-->
        <view v-if="pick_item == 2">
            <view v-if="show">
                <commy-bar :bookList="bookList" :run="2" :res="res">
                </commy-bar>
            </view>
            <view v-if="!show" style="text-align: center;">
                <img :src="'/static/images/msg_empty_orders.png'">
                <view class="txt">客官，您还没有订单呢~</view>
            </view>
        </view>

        <!--待评价-->
        <view v-if="pick_item == 3">
            <view v-if="show">
                <commy-bar :bookList="bookList" :run="3" :res="res">
                </commy-bar>
            </view>
            <view v-if="!show" style="text-align: center;">
                <img :src="'/static/images/msg_empty_orders.png'">
                <view class="txt">客官，您还没有订单呢~</view>
            </view>
        </view>

    </div>
</template>

<script>
    import {
        globalBus
    } from "@/components/globalBus";

    import commyBar from '@/components/lycomponents/commy';

    export default {
        provide() {
            return {
                reload: this.reload
            };
        },
        inject: ["reload"],
        props: ["kindList"],

        components: {
            commyBar,
        },

        data() {
            return {
                // pick_item: 'all',
                pick_item: '1',
                bookList: [],
                res: '',
                run: '',
                // isdiaplay: false,
                show: false,
            };
        },

        created() {
            let _this = this;
            // _this.$watch('pick_item', _this.linkType);
            wx.request({
                url: _this.GLOBAL.serverSrc + "/order/order",
                method: "POST",
                data: {
                    user_id: _this.GLOBAL.userId,
                    state_id: _this.pick_item
                },
                success(res) {
                    // console.log(res);
                    // console.log(_this.pick_item)
                    if (res.data.data.length == 0) {
                        _this.show = false;
                    } else {
                        _this.show = true;
                        if (_this.run == 0) {
                            _this.res = 0;
                        } else {
                            _this.res = 1;
                        }
                        _this.bookList = res.data.data;
                        // console.log(res.data.data);
                        // console.log(_this.run);
                        // console.log(_this.pick_item);
                    }
                }
            });
        },

        watch: {
            res: {
                handler: function() {}
            },
            pick_item: {
                // immediate:true,
                handler(newName, oldName) {
                    // console.log("newName" + newName);
                    // console.log("oldName" + oldName);
                    let _this = this;
                    wx.request({
                        url: _this.GLOBAL.serverSrc + "/order/order",
                        method: "POST",
                        data: {
                            user_id: _this.GLOBAL.userId,
                            state_id: _this.pick_item
                        },
                        success(res) {
                            // console.log(res);
                            // console.log(_this.pick_item)
                            if (res.data.data.length == 0) {
                                _this.show = false;
                            } else {
                                _this.show = true;
                                if (_this.run == 0) {
                                    _this.res = 0;
                                } else {
                                    _this.res = 1;
                                }
                                _this.bookList = res.data.data;
                                // console.log(res.data.data);
                                // console.log(_this.run, 'llllaaa');
                                // console.log(_this.pick_item);
                            }
                        }
                    });
                },
                // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
            }
        },

        mounted() {
            let _this = this;
            // wx.request({
            //     url: _this.GLOBAL.serverSrc + "/order/order",
            //     method: "POST",
            //     data: {
            //         user_id: _this.GLOBAL.userId,
            //         state_id: _this.pick_item
            //     },
            //     success(res) {
            //         // console.log(res);
            //         // console.log(_this.pick_item)
            //         if (res.data.data.length == 0) {
            //             _this.show = false;
            //         } else {
            //             _this.show = true;
            //             if (_this.run == 0) {
            //                 _this.res = 0;
            //             } else {
            //                 _this.res = 1;
            //             }
            //             _this.bookList = res.data.data;
            //             // console.log(res.data.data);
            //             console.log(_this.run);
            //             console.log(_this.pick_item);
            //         }
            //     }
            // });
        },

        computed() {

        },

        methods: {
            //子传父 方法
            linkType(item) {
                this.pick_item = item.id;
                this.$emit("pickItem", item.id);
            },

            //================================================   刷新当前页
            reload() {
                this.isRouterAlive = false;
                // console.log("刷新");
                this.$nextTick(function() {
                    this.isRouterAlive = true;
                });
            },
            // getData: function() {
            //     console.log("pick" + pick)
            //     this.pick = mag;
            // },
        },
    };
</script>

<style scoped>
    /* 最外层view */
    
    .container {
        display: table;
        position: relative;
        /* position: fixed; */
        top: 0;
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
        flex-grow: 1;
        flex-basis: 0.4rem;
        /* max-width: 1.2rem; */
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
        width: 80%;
        margin: 0 auto;
        height: 4rpx;
        left: 0;
        top: 0.1rem;
        bottom: 0.3rem;
        background: #521d23;
        border-radius: 2rpx;
        color: #521d23;
    }
</style>