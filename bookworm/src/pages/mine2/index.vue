<template>
    <div class="container">
        <!-- 导航栏页 -->
        <navigation-bar :title="'我的订单'" :backVisible="true" :fontSize="15" :imgsrc="naviImgsrc"
            :linkBack="'/pages/index/main'" :linkKind="false"></navigation-bar>

        <kind-tabbar :kindList="kindList" @click="link(kindList.id)"></kind-tabbar>
        <view v-if="show">
            <commy-bar :bookList="bookList" :run="run" :res="res" :isdiaplay="isdiaplay"></commy-bar>
        </view>
        
        <!-- <pop-up :isdiaplay="isdiaplay"></pop-up> -->

    </div>
</template>

<script>
    import commyBar from '@/components/lycomponents/commy';
    import checkBox from '@/components/lycomponents/checkbox';
    import navigationBar from "@/components/acomponents/navigation";
    import kindTabbar from "@/components/lycomponents/kindTabbar";
    // import popUp from "@/components/lycomponents/popup";

    export default {
        components: {
            // comcart,
            commyBar,
            // popupBar,
            checkBox,
            kindTabbar,
            navigationBar,
            // popUp,
        },
        data() {
            return {
                naviImgsrc: "/static/images/left.png",
                kindList: [{
                    id: "1",
                    typename: "全部"
                }, {
                    id: "2",
                    typename: "待付款"
                }, {
                    id: "3",
                    typename: "待发货"
                }, {
                    id: "4",
                    typename: "待收货"
                }, {
                    id: "5",
                    typename: "待评价"
                }],

                // bookList: [],
                bookList: [{
                    book_img: '/static/images/mime2.png',
                    book_name: '哎呀，我的牙！',
                    book_price: '17.50',
                    count: '1'
                }, {
                    book_img: '/static/images/mime2.png',
                    book_name: 'hhhhhh',
                    book_price: '112.50',
                    count: '2'
                }, {
                    book_img: '/static/images/mime2.png',
                    book_name: '筚路蓝缕hhhhh巴啦啦啦啦啦啦啦啦',
                    book_price: '992112.50',
                    count: '10'
                }],
                run: '待付款',
                res: '',
                show: '',
                isdiaplay: false,
            }
        },

        created() {
            if (this.bookList.length == 0) {
                this.show = false;
            } else {
                this.show = true;
                if (this.run == '待付款') {
                    this.res = '等待买家付款';
                } else {
                    this.res = '交易成功';
                }
            }

        },
        mounted() {
            this.getData(1);
        },
        methods: {
            Link(id) {
                wx.navigateTo({
                    // url: "/pages/mine2/main?book_id=" + id
                });
            },
            getData(id) {
                let _this = this;
                wx.request({
                    // url: "http://api.wyxs.talesrunner.org/order/order/" + id,
                    method: "GET",
                    success(res) {
                        _this.bookList = res.data.data;
                        // let Imgarry = res.data.data.book_img.split(";");
                        //console.log(_this.imgUrls);
                    }
                });
            }

        }
    }
</script>

<style>
    .container {
        display: block;
        top: 0px;
        margin: 0;
        height: auto;
        position: relative;
        width: 100%;
        padding: 0;
        background-color: #F5F5F5;
    }
</style>