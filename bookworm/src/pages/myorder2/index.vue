<template>
    <div class="container">
        <!-- 导航栏页 -->
        <navigation-bar :title="'我的订单'" :backVisible="true" :fontSize="15" :imgsrc="naviImgsrc"
            :linkBack="'/pages/mine1/main'" :linkKind="false"></navigation-bar>

        <!-- 活动导航栏 -->
        <kind-tabbar :kindList="kindList" @pickItem="getPick"></kind-tabbar>
        <!-- <kind-tabbar :kindList="kindList"></kind-tabbar> -->

        <!-- <my-cart :kindList="kindList" @pickItem="getPick"></my-cart> -->


        

    </div>
</template>

<script>
    import {
        globalBus
    } from "@/components/globalBus";

    import navigationBar from "@/components/acomponents/navigation";
    import kindTabbar from "@/components/lycomponents/kindTabbar";
    // import checkBox from '@/components/lycomponents/checkbox';

    // import myCart from "@/components/lycomponents/mycart";

    export default {

        components: {
            // commyBar,
            // checkBox,
            kindTabbar,
            navigationBar,
            // myCart,
        },
        provide() {
            return {
                reload: this.reload
            };
        },
        inject: ["reload"],
        data() {
            return {
                naviImgsrc: "/static/images/left.png",
                kindList: [{
                    id: "",
                    typename: "全部",
                }, {
                    id: "0",
                    typename: "待付款",
                }, {
                    id: "1",
                    typename: "待发货",
                }, {
                    id: "2",
                    typename: "待收货",
                }, {
                    id: "3",
                    typename: "待评价",
                }],
            }
        },

        created() {
            // console.log("fuzujian" + _this.picker);
        },
        mounted() {
            let _this = this;

            // 用$on事件来接收参数
            // globalBus.$on('val', (data) => {
            //     console.log(data)
            //     _this.pick = data
            // });

            // _this.getData();

        },
        methods: {
            //================================================   刷新当前页
            reload() {
                this.isRouterAlive = false;
                // console.log("刷新");
                this.$nextTick(function() {
                    this.isRouterAlive = true;
                });
            },

            // //从组件传数据上来
            getPick(msg) {
                // console.log("点击的类别：" + msg);
                this.pick_item = msg;

                this.reload();
                // this.getBookData(msg);
            },
            //从页面mine1获取数据picker
            // getData: function() {
            //     console.log("pick" + pick)
            //     this.pick = mag;
            // },


            change(val) {
                console.log(val);
            }

        }
    }
</script>

<style>
    .container {
        display: block;
        top: 0px;
        margin: 0;
        height: 100%;
        position: relative;
        width: 100%;
        padding: 0;
        background-color: #F5F5F5;
    }
    
    .container img {
        margin-top: 180rpx;
        width: 400rpx;
        height: 600rpx;
    }
    
    .txt {
        margin-top: 30rpx;
        font-size: 24rpx;
        width: 100%;
        height: 300rpx;
    }
</style>