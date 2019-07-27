<template>
    <div class="container">
        <!-- 顶部导航栏 -->
        <navigation-bar :title="'添加收货地址'" :backVisible="true" :fontSize="15" :imgsrc="naviImgsrc"
            :linkBack="'/pages/myaddress2/main'" :linkKind="false" :titleColor="'#36282B'">
        </navigation-bar>
        <view class="userinfo">
            <view class="edited_1">
                <input name="input"   type="text" v-model="address.receiver_name" />
                <!-- <view class="edited_1">彭冰婷</view> -->
            </view>
            <view class="edited_2">
                <input maxlength="11" v-model="address.receiver_phone" />
                <!-- <view edited_1>18723783492</view> -->
            </view>
            <view class="picker_1">
                <!-- <picker mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
                    <view class="picker">
                        {{region[0]}}
                        {{region[1]}}
                        {{region[2]}}
                    </view>
                </picker> -->
                <view >{{region[0]}} {{region[1]}} {{region[2]}}</view>
            </view>
            <view class="editing">
                <input  name="input"   type="text" v-model="address.concrete_address" placeholder="请输入详细地址" />
                <!-- <view class="editing_1">请输入详细地址</view> -->
            </view>
        </view>

        <view class="setting">
            <view class="edited1">
                <view class="set">设为默认地址</view>
                <view class="icon">
                    <switch @change="seted" color="#D2AC6E" />
                    <!-- <switch @change="unseted" v-if=""/> -->
                </view>
            </view>
            <view class="edited2">
                <view class="del">删除收货地址</view>
            </view>
        </view>
        
        <view class="comfirm">
            <view class="opration">添加</view>
        </view>


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
                region: ['福建省', '厦门市', '集美区'],
                customItem: '全部',
                address: {
                    receiver_name: '',
                    receiver_phone: '',
                    concrete_address: '',
                    province: '',
                    city: '',
                    area: '',
                    if_default: '',
                    user_id: this.GLOBAL.userId
                }
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
            add() {
                let _this = this;
                wx.request({
                    url: _this.GLOBAL.serverSrc + "/address/addAddress",
                    method: "POST",
                    data: _this.address,
                    success(res) {
                        // console.log(res.data.data);
                        console.log(res.data.code);
                    }
                });
            }
        },

        seted: function(e) {
            console.log('switch1 发生 change 事件，携带值为', e.detail.value)
        },

        unseted: function(e) {
            console.log('switch2 发生 change 事件，携带值为', e.detail.value)
        },

        bindRegionChange: function(e) {
            console.log('picker发送选择改变，携带值为', e.detail.value)
            this.region = e.detail.value
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
        position: relative;
        width: 100%;
        padding: 0;
        background-color: #F5F5F5;
        min-height: -moz-calc(100vh);
        /*chrome safari*/
        min-height: -webkit-calc(100vh);
        /*Standard */
        min-height: calc(100vh);
    }
    
    .container img {
        margin-top: 180rpx;
        width: 400rpx;
        height: 600rpx;
    }
    /* ========================  头部 */
    /* ========================  上 */
    
    .userinfo {
        width: 100%;
        /* height: 450rpx; */
        height: auto;
        float: left;
    }
    
    .edited_1 {
        width: 100%;
        height: 99rpx;
        /* margin-left: 36rpx; */
        font-size: 30rpx;
        color: #36282B;
        background: white;
        border-top: 1rpx solid rgb(184, 181, 182);
        line-height: 99rpx;
        float: left;
        vertical-align: middle;
        /* border-bottom: 1rpx solid #36282B; */
    }
    
    .edited_2 {
        width: 100%;
        height: 99rpx;
        /* margin-left: 36rpx; */
        font-size: 30rpx;
        color: #36282B;
        background: white;
        border-top: 1rpx solid rgb(184, 181, 182);
        line-height: 99rpx;
        float: left;
        vertical-align: middle;
        /* border-bottom: 1rpx solid #36282B; */
    }
    
    .edited_1 input .edited_2 input {
        margin-left: 36rpx;
        color: #36282B;
        float: left;
        /* line-height: 80rpx; */
    }
    
    .picker_1 {
        float: left;
        position: relative;
        width: 100%;
        height: 98rpx;
        /* margin-left: 36rpx; */
        font-size: 30rpx;
        color: #36282B;
        background: white;
        border-top: 1rpx solid rgb(184, 181, 182);
        border-bottom: 1rpx solid rgb(184, 181, 182);
        /* line-height: 98rpx; */
        /* float: left; */
    }
    /* .picker_1 picker {
        float: left;
        width: 100%;
        height: 98rpx;
        /* margin-left: 36rpx; */
    /* line-height: 98rpx; */
    /* float: left; */
    /* }
*/
    
    */ .editing {
        position: relative;
        width: 100%;
        height: 149rpx;
        margin-top: 100rpx;
        /* margin-left: 36rpx; */
        font-size: 24rpx;
        color: #BBACAB;
        border-bottom: 1rpx solid rgb(184, 181, 182);
        background: pink;
    }
    /* .editing_1 {
        margin-left: 36rpx;
        color: #36282B;
    } */
    
    .editing input {
        margin-left: 36rpx;
        color: #36282B;
        /* line-height: 80rpx; */
    }
    /* ========================  中 */
    
    .setting {
        float: left;
        margin-top: 20rpx;
        width: 100%;
        height: 200rpx;
        background: #BBACAB;
    }
    
    .edited1 {
        width: 100%;
        height: 100rpx;
        /* margin-left: 36rpx; */
        font-size: 30rpx;
        color: #36282B;
        background: white;
        border-top: 1rpx solid rgb(184, 181, 182);
        line-height: 100rpx;
        float: left;
    }
    
    .set {
        width: 80%;
        float: left;
        margin-left: 36rpx;
    }
    
    .icon {
        width: 20%;
        height: 40rpx;
        float: left;
        margin-left: 560rpx;
    }
    /* switch {
        width: 80rpx;
        height: 40rpx;
        color: #D2AC6E;
    } */
    
    .edited2 {
        width: 100%;
        height: 100rpx;
        /* margin-left: 36rpx; */
        font-size: 30rpx;
        color: #36282B;
        background: white;
        border-top: 1rpx solid rgb(184, 181, 182);
        border-bottom: 1rpx solid rgb(184, 181, 182);
        line-height: 100rpx;
        float: left;
    }
    
    .del {
        margin-left: 36rpx;
    }
    /* ========================  下 */
    
    .comfirm {
        position: fixed;
        bottom: 0rpx;
        width: 100%;
        height: 100rpx;
        /* margin-left: 36rpx; */
        font-size: 30rpx;
        color: white;
        background: #D2AC6E;
        text-align: center;
        line-height: 100rpx;
    }
</style>