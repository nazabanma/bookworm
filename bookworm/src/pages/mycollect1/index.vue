<template>
  <div class="index1">
    <!------------------------------------------------------ 顶部导航栏 -->
    <navigation-bar
      :title="'我的收藏'"
      :backVisible="true"
      :fontSize="16"
      :imgsrc="'/static/images/left.png'"
      :linkBack="'/pages/index1/main'"
      :linkKind="false"
    ></navigation-bar>

    <!------------------------------------------------------ 我的收藏列表 -->
    <view v-if="!emptyFlag" class="collectPanel">
      <view class="collectList" v-for="(item,index) in collectList" :key="index">
        <!-- 某个收藏 -->
        <view class="collectItem">
          <view class="collect_left">
            <view class="collect_area">
              <!-- <view
                @click="pickThis(index)"
                class="circle"
                :class="{' active':checkMsg[index]}"
                :value="index"
                v-model="checkMsg[index]"
              ></view>-->
              <view @click="pickThis(index)" class="circle" :class="{' active':checkMsg[index]}"></view>
            </view>
          </view>
          <view class="collect_right">
            <view class="collect_content__left">
              <image class="collect_img" :src="item.book_img" />
            </view>
            <view class="collect_content__right" @click="linkTo(item.book_id)">
              <view class="collect_content__name">《{{item.book_name}}》</view>
              <view class="collect_content__num">{{item.collect_num}}人收藏</view>
              <view class="collect_content__price">￥{{item.book_price}}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view v-if="emptyFlag" class="emptyPanel">
      <image class="empty_img"  :src="emptyImg" />
    </view>

    <view class="empty"></view>
    <!-- ==================================================     组件：商品详情页面底部的按钮组合     ======================================================= -->
    <view class="foot_tabbar">
      <view class="collect">
        <view class="collect_area">
          <view
            class="circle"
            @click="checkAll"
            v-model="checkedAll"
            :class="{'active':checkedAll}"
          ></view>
        </view>
        <view class="collect_text">全选</view>
      </view>
      <view class="btnLine">
        <view class="cancelBtn" @click="cancelCollect">取消收藏</view>
        <view class="addBtn" @click="addToCart">加入购物车</view>
      </view>
    </view>
  </div>
</template>

<script>
import { globalBus } from "@/components/globalBus";
import navigationBar from "@/components/acomponents/navigation";

export default {
  data() {
    return {
      emptyFlag: 1,
      emptyImg:
        this.GLOBAL.serverSrc + "/static/images/msg_empty_collection.png",
      //pick_item: 1,
      checkedAll: false,
      checkedCount: 0,
      collectList: [], //获取到的数据列表
      pickList: [], //选中的列表
      checkMsg: [] //添加样式的列表
    };
  },

  components: {
    navigationBar
  },

  methods: {
    //=========================================================    获取收藏数据
    getData() {
      let _this = this;
      wx.request({
        url: _this.GLOBAL.serverSrc + "/collect/collect",
        method: "POST",
        data: { user_id: _this.GLOBAL.userId },
        success(res) {
          // 获取data数据
          let data = res.data.data;
          //获取data长度，判断是否为空
          let code_msg = data.length;
          console.log("数据长度" + code_msg);
          //获取数据，不为空
          if (code_msg) {
            _this.collectList = data;
            for (let i = 0; i < data.length; i++) {
              _this.checkMsg.push(0);
            }
            _this.emptyFlag = 0;
          }
        }
      });
    },
    //=========================================================    点击
    pickThis(bookID) {
      let _this = this;
      if (!this.checkMsg[bookID]) {
        _this.checkMsg[bookID] = 1;
        _this.checkedCount++;
      } else {
        _this.checkMsg[bookID] = 0;
        _this.checkedCount--;
      }
      this.checkMsg.push();
      
      // console.log(this.checkMsg);
    },
    //=========================================================    全选
    checkAll() {
      this.checkMsg = [];
      let _this = this;
      if (this.checkedAll) {
        //选中
        this.collectList.forEach(function(item, index) {
          _this.checkMsg[index] = 0;
          _this.checkMsg.push(index);
        });
      } else {
        this.collectList.forEach(function(item, index) {
          _this.checkMsg[index] = 1;
          _this.checkMsg.push(index);
        });
      }
      _this.checkedAll = !_this.checkedAll;
    },
    //=========================================================    点击跳转
    linkTo(bookID) {
      wx.redirectTo({
        url: "/pages/bookdetail1/main"
      });
      globalBus.$emit("bookID", bookID);
    },
    getList() {
      let _this = this;
      for (let i = 0; i < _this.checkMsg.length; i++) {
        if (_this.checkMsg[i] == 1) {
          _this.pickList.push(_this.collectList[i].book_id);
        }
        return _this.pickList;
      }
    },

    cancelCollectArr() {
      let collectsList = this.getList();
      let _this = this;
      wx.request({
        url: _this.GLOBAL.serverSrc + "/collect/collectDelete",
        method: "POST",
        data: {
          user_id: _this.GLOBAL.userId,
          collects: collectsList
        },
        success(res) {
          console.log("cancelCollectArr");
        }
      });
    },
    cancelCollectAll() {
      let _this = this;
      wx.request({
        url: _this.GLOBAL.serverSrc + "/collect/collectDeleteAll",
        method: "POST",
        data: {
          user_id: _this.GLOBAL.userId
        },
        success(res) {
          console.log("cancelCollectAll");
        }
      });
    },
    cancelCollect() {
      let _this = this;
      if (_this.checkedAll) {
        this.cancelCollectAll();
      } else {
        this.cancelCollectArr();
      }
    },
    addToCart() {
      let collectsList = this.getList();
      let _this = this;
      wx.request({
        url: _this.GLOBAL.serverSrc + "/collect/removeToCart",
        method: "POST",
        data: {
          user_id: _this.GLOBAL.userId,
          collects: collectsList
        },
        success(res) {
          console.log("addToCart");
        }
      });
    }
  },
  watch: {
    checkMsg: {
      handler: function(newVal, oldVal) {}
    },
    checkedCount: {
      handler: function(newVal, oldVal) {
        if (newVal == this.collectList.length) {
          this.checkedAll = true;
        } else {
          this.checkedAll = false;
        }
      }
    }
  },

  created() {
    this.getData();
    // let app = getApp()
  }
};
</script>

<style scoped>
.empty {
  height: 1rem;
  display: block;
  width: 100%;
  position: relative;
  background: #f5f5f5;
}
.index1 {
  /* height: 600px; */
  background-color: #f5f5f5;
}
.collectPanel {
  display: block;
  width: 100%;
  height: auto;
  overflow: hidden;
  background-color: white;
}
.collectList {
  width: 100%;
  height: 2.5rem;
  border-bottom: 1px solid #f5f5f5;
  /* padding: 0.1rem 0.3rem; */
}
.collectItem {
  display: -webkit-flex;
  display: flex;
}
.collect_left {
  flex: 1;
  max-width: 100rpx;
  height: 2.5rem;
  vertical-align: middle;
  /* background-color: red; */
  /* width: 1rem; */
  display: flex;
  flex-direction: row;
  align-items: center; /*垂直居中*/
  justify-content: center; /*水平居中*/
}
.collect_area {
  display: inline-block;
  width: 60rpx;
  height: 60rpx;
  margin: 0 auto;
  /* background-color: #f5f5f5; */
}
.circle {
  display: block;
  position: relative;
  width: 30rpx;
  height: 30rpx;
  margin: 13rpx auto;
  /* left: 0;
  right: 0; */
  border-radius: 20rpx;
  border: 1px solid #b9abaa;
}

.circle.active:after {
  position: relative;
  display: block;
  content: "";
  width: 14rpx;
  height: 14rpx;
  margin: 0 auto;
  left: 0rpx;
  top: 6rpx;
  /* bottom: 0.3rem; */
  background: #521d23;
  border: 1px solid #521d23;
  border-radius: 50%;
  color: #521d23;
  /* transform: translate(-50%, -50%) scale(1);
  -webkit-transform: translate(-50%, -50%) scale(1); */
}

.collect_right {
  flex: 7;
  width: 1rem;
  /* border: 1px solid red; */
  overflow: hidden;
}
.collect_content__left {
  display: table-cell;
  /* border: 1px solid gold; */
  /* line-height: 2rem; */
  vertical-align: middle;
  text-align: center;
  width: 2rem;
  height: 2.5rem;
}
.collect_img {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  margin: 0 auto;
  max-width: 2rem;
  max-height: 2rem;
  /* border: 1px solid blue; */
}
.collect_content__right {
  display: table-cell;
  width: 4rem;
  height: 100%;
  padding: 0.2rem 0.2rem 0.2rem 0.4rem;
}
.collect_content__name {
  display: block;
  color: #36282b;
  font-size: 15px;
  margin-top: 0.05rem;
  margin-left: -0.5em;
}
.collect_content__num {
  display: block;
  color: #b9abaa;
  font-size: 10px;
  margin-top: 0.1rem;
}
.collect_content__price {
  display: block;
  color: #bc2b37;
  font-size: 15px;
  margin-top: 0.8rem;
}
/* ------------------------------------清除button所有默认样式 */
button,
.button-hover {
  color: unset;
  background-color: unset;
  padding: unset;
  font-size: unset;
  line-height: unset;
  border-radius: unset;
  -webkit-tap-highlight-color: unset;
  overflow: hidden;
}
button::after {
  display: none;
}
/* ------------------------------------清除结束 */
.foot_tabbar {
  height: 1rem;
  width: 100%;
  transform: none;
  position: fixed;
  bottom: 0;
  z-index: 999;
  background-color: #f5f5f5;
  display: -webkit-flex;
  display: flex;
}
/*  */
.collect {
  flex: 1;
  display: inline-block;
  width: 1.5rem;
  max-width: 150rpx;
  vertical-align: middle;
  display: flex;
  flex-direction: row;
  align-items: center; /*垂直居中*/
  align-content: flex-start;
  justify-content: center; /*水平居中*/
}
.collect .collect_area {
  /* flex: 1; */
  min-width: 100rpx;
  max-width: 100rpx;
}

/*  */
.collect_text {
  display: inline-block;
  color: #36282b;
  font-size: 12px;
}

/*  */
.btnLine {
  flex: 3;
  /* display: inline-block; */
  width: 4.5rem;
  min-width: 4.5rem;
  /* background: red; */
  align-items: center; /*垂直居中*/
  vertical-align: middle;
  /* line-height: 1rem; */
}

.cancelBtn,
.addBtn {
  display: inline-block;
  max-height: 0.6rem;
  margin-top: 0.15rem;
  padding: 15rpx 20rpx;
  font-size: 15px;
  background-color: transparent;
}

.cancelBtn {
  border: 1rpx solid #d2ac6e;
  border-radius: 17px;
  color: #d2ac6e;
  margin-left: 80px;
  margin-right: 40rpx;
}
.addBtn {
  border: 1px solid #521d23;
  border-radius: 35rpx;
  color: #521d23;
  margin-right: 36rpx;
}
</style>
