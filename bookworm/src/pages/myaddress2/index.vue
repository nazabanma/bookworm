<template>
    <div class="container">
        <!-- 顶部导航栏 -->
        <navigation-bar :title="'我的收货地址'" :backVisible="true" :fontSize="15" :imgsrc="naviImgsrc"
            :linkBack="'/pages/mine1/main'" :linkKind="false" :titleColor="'#521d23'">
        </navigation-bar>
        <view class="panel">
            <view class="userinfo">
                <view class="username">彭冰婷</view>
                <view class="phone">18723783492</view>
            </view>
            <view class="address"></view>
        </view>
        <img src="/static/images/add.png">
    </div>
</template>

<script>
    import {
        globalBus
    } from "@/components/globalBus";

    import navigationBar from "@/components/acomponents/navigation";

    export default {
        data() {
            return {
                naviImgsrc: "/static/images/left.png",
            };
        },
        components: {
            navigationBar
        },
        mounted() {
            let _this = this;
            wx.request({
                url: _this.GLOBAL.serverSrc + "/user/userInfo/" + _this.GLOBAL.userId,
                method: "GET",
                success(res) {
                    // console.log(res.data.data);
                    _this.myInfo = res.data.data;
                }
            });
        },
        methods: {
            //-----------------------------------------------------   获取navigation的高度，作为轮播图片的margin-top

        },

        created() {
            // let app = getApp()
        }
    };
</script>

<style scoped>
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
    /* ========================  头部 */
</style>