<template>
  <div class="container">
    <!-- 导航栏页 -->
    <navigation-bar :title="'我的订单'" :backVisible="true" :fontSize="15" :imgsrc="naviImgsrc"></navigation-bar>

    <!-- :linkBack="'/pages/mine1/main'"
    :linkKind="false"-->
    <!-- 活动导航栏 -->
    <!-- <kind-tabbar :kindList="kindList" @pickItem="getPick"></kind-tabbar> -->
    <!--导航条-->
    <view class="panel">
      <view
        class="kindItems"
        v-for="(item, index) in kindList"
        :key="index"
        @click="linkType(item)"
      >
        <a class="kindItem" :class="pick_item == item.id ?'active':''">{{item.typename}}</a>
      </view>
    </view>

    <!--全部-->

    <view v-if="show">
      <commy-bar :run="pick_item" :bookList="bookList" :isDisplay="isdisplay">
        <!-- <commy-bar :bookList="bookListb" :display="display">                     -->
      </commy-bar>
    </view>
    <view v-if="!show" style="text-align: center;">
      <view v-if="pick_item=='all'">
        <img :src="imgArr[0]" />
        <view class="txt">客官，您还没有订单呢~</view>
      </view>

      <view v-else-if="pick_item == 0">
        <img :src="imgArr[1]" />
        <view class="txt">谈钱伤感情，该付还是要付的~</view>
      </view>

      <view v-else-if="pick_item == 1">
        <img :src="imgArr[2]" />
        <view class="txt">客官，您还没有订单呢~</view>
      </view>

      <view v-else-if="pick_item == 2">
        <img :src="imgArr[3]" />
        <view class="txt">客官，您还没有订单呢~</view>
      </view>

      <view v-else>
        <img :src="imgArr[4]" />
        <view class="txt">客官，您还没有订单呢~</view>
      </view>
    </view>
  </div>
</template>

<script>
import { globalBus } from "@/components/globalBus";

import commyBar from "@/components/lycomponents/commy";
import navigationBar from "@/components/acomponents/navigation";

export default {
  components: {
    navigationBar,
    commyBar
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
      kindList: [
        {
          id: "all",
          typename: "全部"
        },
        {
          id: "0",
          typename: "待付款"
        },
        {
          id: "1",
          typename: "待发货"
        },
        {
          id: "2",
          typename: "待收货"
        },
        {
          id: "3",
          typename: "待评价"
        }
      ],
      //   pick_item: "all",
      pick_item: "all",
      bookList: [],
      res: "",
      run: "",
      isdisplay: false,
      show: false,
      imgArr: [
        this.GLOBAL.serverSrc + "/static/images/msg_empty_orders.png",
        this.GLOBAL.serverSrc + "/static/images/msg_empty_pay.png",
        this.GLOBAL.serverSrc + "/static/images/msg_empty_orders.png",
        this.GLOBAL.serverSrc + "/static/images/msg_empty_orders.png",
        this.GLOBAL.serverSrc + "/static/images/msg_empty_orders.png"
      ]
    };
  },

  onShow() {
    this.getList();
  },
<<<<<<< HEAD
  // onLoad: function(options) {
  //   if (!options.i) {
  //     this.pick_item = options.i-1;
  //   }
  // },
=======
>>>>>>> 1eda815ab7bedfb55b4e0b845964db1eb0834c2e

  watch: {
    // res: {
    //     handler: function() {}
    // },
    pick_item: {
      // immediate:true,
      handler(newName, oldName) {
        this.getList();
      }
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
    }
  },

  created() {
    // console.log("fuzujian" + _this.picker);
    this.getList();
  },

  mounted() {},

  methods: {
    //================================================   刷新当前页
    reload() {
      this.isRouterAlive = false;
      // console.log("刷新");
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    linkType(item) {
      this.pick_item = item.id;
      //   this.$emit("pickItem", item.id);
    },
    getList() {
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
<<<<<<< HEAD
          if (res.data.code == "404") {
=======
          if (res.data.data == null) {
>>>>>>> 1eda815ab7bedfb55b4e0b845964db1eb0834c2e
            _this.show = false;
          } else {
            _this.show = true;
            _this.bookList = res.data.data;
            console.log(res.data.data);
            // console.log(res.data.data);
            // console.log(_this.run);
            // console.log(_this.pick_item);
          }
        }
      });
    }
  },
  onLoad: function(options) {
    this.pick_item = options.id;
    let _this = this;
  }
};
</script>

<style>
.container {
  display: block;
  top: 0px;
  margin: 0;
  /* height: 100%; */
  position: relative;
  width: 100%;
  padding: 0;
  /*Firefox*/
  min-height: -moz-calc(100vh);
  /*chrome safari*/
  min-height: -webkit-calc(100vh);
  /*Standard */
  min-height: calc(100vh);
  background-color: #f5f5f5;
  /* background-color: pink; */
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

.panel {
  display: table;
  position: relative;
  /* position: fixed; */
  top: 0;
  width: 100%;
  height: 0.9rem;
  padding: 0 0.3rem 0 0.3rem;
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
  max-width: 1.2rem;
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