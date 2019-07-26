<template>
    <div class="container">
        <!-- 导航栏页 -->
        <navigation-bar :title="'发表评论'" :backVisible="true" :fontSize="15" :imgsrc="naviImgsrc"
            :linkBack="'/pages/mine2/main'" :linkKind="false"></navigation-bar>
        <view class="panel">
            <input type="text" placeholder="宝贝满足你的期待吗？说说它的优点和美中不足的地方吧">
        </view>
    </div>
</template>

<script>
    import {
        globalBus
    } from "@/components/globalBus";

    import navigationBar from "@/components/acomponents/navigation";
    // import checkBox from '@/components/lycomponents/checkbox';

    export default {

        components: {
            // commyBar,
            // checkBox，
            navigationBar,
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

            //从页面mine1获取数据picker
            // getData: function() {
            //     console.log("pick" + pick)
            //     this.pick = mag;
            // },
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
    
    .panel {
        margin-top: 30rpx;
        font-size: 20rpx;
        width: 100%;
        height: 400rpx;
    }
    /* .panel input {
        margin-right: 36rpx;
        margin-top: 20rpx;
        font-size: 20rpx;
        width: 100%;
        height: 400rpx;
    } */
</style>