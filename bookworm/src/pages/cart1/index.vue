<template>
  <div class="index1">
    <!------------------------------------------------------ 顶部导航栏 -->
    <navigation-bar
      :title="'购物车'"
      :backVisible="false"
      :fontSize="16"
      :imgsrc="'/static/images/left.png'"
    ></navigation-bar>
    <!------------------------------------------------------ 吐司 -->
    <toast-bar :isShow="toast.show" :txt="toast.txt"></toast-bar>
    <!-- :linkBack="''"
    :linkKind="false"-->
    <view class="head">
      <view class="logo">
        <image class="logo_img" :src="logoSrc" />
        <image class="logoTitle_img" :src="logotitleSrc" />
      </view>
      <view class="head_title" v-if="emptyFlag!=1" v-model="manageFlag" @click="manageCart">
        <view v-if="manageFlag" @click="changeFlag">管理</view>
        <view v-else @click="changeFlag">完成</view>
      </view>
    </view>
    <!------------------------------------------------------ 我的收藏列表 -->
    <router-view v-if="isRouterAlive">
      <view class="cartPanel">
        <view class="cartList" v-for="(item,index) in cartList" :key="index">
          <!-- 某个收藏 -->
          <view class="cartItem">
            <view class="cart_left" @click="pickThis(index)">
              <view class="cart_area">
                <view class="circle" :class="{' active':checkMsg[index]}"></view>
              </view>
            </view>
            <view class="cart_right">
              <view class="cart_content__left" @click="linkTo(item.book_id)">
                <image class="cart_img" :src="item.book_cover" />
              </view>
              <view class="cart_content__right">
                <view class="cart_content__right_top" @click="linkTo(item.book_id)">
                  <view class="cart_content__name">《{{item.book_name}}》</view>
                  <view class="cart_content__num">{{item.book_author}}</view>
                </view>
                <view class="cart_content__footer">
                  <view class="cart_content__price">￥{{item.book_price}}</view>
                  <view class="cart_content__count">
                    <view class="cart_count_dec" @click="decCount(index)">-</view>
                    <view class="cart_count_num">{{item.count}}</view>
                    <view class="cart_count_inc" @click="incCount(index)">+</view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </router-view>
    <view v-if="emptyFlag==1" class="emptyPanel">
      <image class="empty_img" mode="widthFix" :src="emptyImg" />
      <view>清空购物车，您就又能见奴家了~</view>
    </view>

    <view v-if="emptyFlag!=1" class="empty"></view>
    <!-- ==================================================     管理按钮组合     ======================================================= -->
    <view v-if="emptyFlag!=1&&!manageFlag" class="foot_tabbar">
      <view class="cart">
        <view class="cart_area">
          <view
            class="circle"
            @click="checkAll"
            v-model="checkedAll"
            :class="{'active':checkedAll}"
          ></view>
        </view>
        <view class="cart_text">全选</view>
      </view>
      <view class="btnLine">
        <!----------------------------------------------- 清空购物车 -->
        <view class="clear" @click="cancelcartAll">
          <image class="clear_img" :src="clearSrc" />
          <view class="clear_title">清空</view>
        </view>
        <view class="cancelBtn" @click="addToCollect">移入收藏夹</view>
        <view class="addBtn" @click="deleCart">删除</view>
      </view>
    </view>
    <!-- ==================================================     默认按钮组合     ======================================================= -->
    <view v-if="emptyFlag!=1&&manageFlag" class="foot_tabbar">
      <view class="cart">
        <view class="cart_area">
          <view
            class="circle"
            @click="checkAll"
            v-model="checkedAll"
            :class="{'active':checkedAll}"
          ></view>
        </view>
        <view class="cart_text">全选</view>
      </view>
      <view class="btnLine">
        <view class="sumCart">
          合计：
          <view class="sumNum" v-model="sumCart">￥{{sumCart}}</view>
        </view>
        <view class="subBtn" @click="subCart">结算</view>
      </view>
    </view>
  </div>
</template>

<script>
import { globalBus } from "@/components/globalBus";
import navigationBar from "@/components/acomponents/navigation";
import toastBar from "@/components/acomponents/toastBar";
export default {
  provide() {
    return {
      reload: this.reload
    };
  },
  inject: ["reload"],
  data() {
    return {
      isRouterAlive: true, //刷新当前页
      toast: { show: false, txt: "" },
      // isRouterAlive: "",
      manageFlag: 1,
      emptyFlag: -1,
      logoSrc: "/static/images/store.png",
      logotitleSrc: "/static/images/logoTitle.png",
      clearSrc: "/static/images/clear.png",
      emptyImg:
        this.GLOBAL.serverSrc + "/static/images/msg_empty_shopping_cart.png",
      //pick_item: 1,
      checkedAll: false,
      checkedCount: 0,
      cartList: [], //获取到的数据列表
      pickList: [], //选中的列表
      checkMsg: [], //添加样式的列表
      sumList: [], //存放单个的总价
      sumCart: "0.00",
      dataList: [] //存放用于提交到确定订单页面的数据数组
    };
  },

  components: {
    navigationBar,
    toastBar
  },
  mounted() {
    // let _this = this;
    // for (let i = 0; i < _this.checkMsg.length; i++) {
    //   if (_this.checkMsg[i] == 1) {
    //   }
    // }
  },
  // filters: {
  //   priceFilter: function(value) {
  //     // value = value.toString();
  //     if (!value) return "";
  //     value = value.toString();
  //     let result = parseFloat(value).toFixed(2);
  //     console.log(result);
  //     result = result.toString();
  //     return result;
  //   }
  // },
  onShow() {
    this.checkMsg = [];
  },

  methods: {
    //================================================   刷新当前页
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
      //console.log("刷新");
      // if (getCurrentPages().length != 0) {
      //   //刷新当前页面的数据
      //   getCurrentPages()[getCurrentPages().length - 1].onShow();
      // }
    },
    changeFlag() {
      this.checkMsg = [];
      this.checkedAll = false;
      this.checkedCount = 0;
      this.sumCart = 0;
      this.reload();
      this.manageFlag = !this.manageFlag;
    },
    //=========================================================    获取购物车数据
    getData() {
      let _this = this;
      wx.request({
        url: _this.GLOBAL.serverSrc + "/cart/shopCart/" + _this.GLOBAL.userId,
        method: "GET",
        success(res) {
          // 获取data数据
          let data = res.data.data;
          //获取data长度，判断是否为空
          let code_msg = data.length;
          console.log("数据长度" + code_msg);
          //获取数据，不为空
          if (code_msg) {
            _this.cartList = data;
            for (let i = 0; i < data.length; i++) {
              _this.checkMsg.push(0);
            }
            _this.emptyFlag = 0;
          } else {
            _this.emptyFlag = 1;
          }
        }
      });
    },
    //=========================================================    计算金额
    cartSum() {
      let _this = this;
      this.sumCart = 0;
      for (let i = 0; i < _this.checkMsg.length; i++) {
        if (_this.checkMsg[i] == 1) {
          _this.sumCart =
            _this.sumCart +
            _this.cartList[i].book_price * _this.cartList[i].count;
        }
      }
      _this.sumCart = parseFloat(_this.sumCart).toFixed(2);
      // console.log(_this.checkMsg);
      // console.log(_this.checkMsg);
      // console.log(_this.sumCart);
      //  _this.sumCart=this.priceFilter|_this.sumCart;
    },
    //=========================================================    数量
    decCount(i) {
      //this.cartList[i].count--;
      let _this = this;
      if (_this.cartList[i].count > 1) {
        _this.cartList[i].count -= 1;
        _this.cartSum();
        wx.request({
          url: _this.GLOBAL.serverSrc + "/cart/cartUpdate",
          method: "POST",
          data: {
            cart_id: _this.cartList[i].shop_cart_id,
            count: _this.cartList[i].count
          },
          success(res) {
            console.log("decCount");
          }
        });
      }
    },
    incCount(i) {
      let _this = this;
      this.cartList[i].count++;
      _this.cartSum();
      wx.request({
        url: _this.GLOBAL.serverSrc + "/cart/cartUpdate",
        method: "POST",
        data: {
          cart_id: _this.cartList[i].shop_cart_id,
          count: _this.cartList[i].count
        },
        success(res) {
          console.log("incCount");
        }
      });
    },

    //=========================================================    点击
    pickThis(i) {
      let _this = this;

      if (!this.checkMsg[i]) {
        _this.checkMsg[i] = 1;
        _this.checkedCount++;
      } else {
        _this.checkMsg[i] = 0;
        _this.checkedCount--;
        _this.sumList[i] = 0;
      }
      // //判断是否全选
      // if (_this.checkedCount == this.cartList.length) {
      //   _this.checkedAll = true;
      // } else {
      //   _this.checkedAll = false;
      // }
      this.checkMsg.push();
      this.cartSum();
      console.log(this.checkMsg);
      //  console.log(this.checkMsg);
    },
    //=========================================================    全选
    checkAll() {
      this.checkMsg = [];
      let _this = this;
      if (this.checkedAll) {
        //选中
        this.cartList.forEach(function(item, index) {
          _this.checkMsg[index] = 0;
          _this.checkMsg.push(index);
        });
      } else {
        this.cartList.forEach(function(item, index) {
          _this.checkMsg[index] = 1;
          _this.checkMsg.push(index);
        });
      }
      _this.cartSum();
      _this.checkedAll = !_this.checkedAll;
    },
    //=========================================================    点击跳转
    linkTo(bookID) {
      wx.navigateTo({
        url: "/pages/bookdetail1/main"
      });
      globalBus.$emit("bookID", bookID);
    },
    //=========================================================    获取选中的列表,返回选中的id
    //msg为判断是否全选，主要用于提交时，数据假删除以及数据提交url的区分
    getList(msg) {
      let _this = this;
      _this.pickList = [];
      for (let i = 0; i < _this.checkMsg.length; i++) {
        if (_this.checkMsg[i] == 1) {
          _this.pickList.push(_this.cartList[i].book_id);

          // console.log(_this.pickList);
          // tmpList = _this.pickList;
          if (msg && _this.pickList) {
            _this.cartList.splice(i, 1);
            _this.checkMsg = [];
            wx.showToast({
              title: "删除成功",
              duration: 800
            });
          } else {
            this.toast.show = true;
            this.toast.txt = "请选择宝贝";
            if (this.toast.show) {
              setTimeout(function() {
                //toast消失
                _this.toast.show = false;
              }, 1500);
            }
          }
        }
      }
      if (!_this.pickList.length) {
        this.toast.show = true;
        this.toast.txt = "请选择宝贝";
        if (this.toast.show) {
          setTimeout(function() {
            //toast消失
            _this.toast.show = false;
          }, 1500);
        }
        return;
      }
      //console.log(_this.pickList);
      return _this.pickList;
    },
    //=========================================================    多选
    cancelcartArr() {
      // 选中部分
      let _this = this;
      let cartsList = this.getList(1);
      let jsonArr = JSON.stringify(cartsList);
      if (cartsList) {
        //数组中有数据再进行提交
        wx.request({
          url: _this.GLOBAL.serverSrc + "/cart/cartDelete",
          method: "POST",
          data: {
            carts: jsonArr
          },
          success(res) {
            _this.reload();
            //console.log("cancelcartArr");
          }
        });
      } else {
        this.toast.show = true;
        this.toast.txt = "请选择宝贝";
        if (this.toast.show) {
          setTimeout(function() {
            //toast消失
            _this.toast.show = false;
          }, 1500);
        }
      }
    },
    //=========================================================    全选
    cancelcartAll() {
      // 全选时
      let _this = this;
      wx.request({
        url: _this.GLOBAL.serverSrc + "/cart/cartDeleteAll",
        method: "POST",
        data: {
          user_id: _this.GLOBAL.userId
        },
        success(res) {
          _this.toast.show = true;
          _this.toast.txt = "删除成功";
          if (_this.toast.show) {
            setTimeout(function() {
              //toast消失
              _this.toast.show = false;
            }, 1500);
            _this.cartList = [];
            _this.checkMsg = [];
            _this.checkedAll = false;
            _this.reload();
          }

          // console.log("cancelcartAll");
        }
      });
    },
    //=========================================================    提交时根据checkedAll判断  选择类型 ，从而分类提交
    deleCart() {
      let _this = this;
      if (_this.checkedAll) {
        _this.cancelcartAll();
      } else {
        _this.cancelcartArr();
      }
    },
    //=========================================================   添加到收藏
    addToCollect() {
      let _this = this;
      let cartsList = this.getList(0);
      if (cartsList.length) {
        //数组中有数据再进行提交
        let jsonArr = JSON.stringify(cartsList);
        wx.request({
          url: _this.GLOBAL.serverSrc + "/cart/removeToCollect",
          method: "POST",
          data: {
            user_id: _this.GLOBAL.userId,
            carts: jsonArr
          },
          success(res) {
            _this.toast.show = true;
            _this.toast.txt = "收藏成功";
            if (_this.toast.show) {
              setTimeout(function() {
                //toast消失
                _this.toast.show = false;
              }, 1500);
            }
            _this.checkMsg = [];
          }
        });
      }
    },
    //=========================================================   结算，跳转到确认订单页
    subCart() {
      let _this = this;
      _this.dataList = [];
      let dataCreateList = [];
      //let getIdList = this.getList();
      //console.log(getIdList);
      for (let i = 0; i < _this.checkMsg.length; i++) {
        if (_this.checkMsg[i] == 1) {
          let data = {
            book_id: "",
            book_name: "",
            book_author: "",
            book_cover: "",
            count: 0,
            book_price: 0
          };
          let dataCreate = {
            book_id: "",
            count: 0,
            price: 0
          };
          // 用于确认订单时传数据
          data.book_id = _this.cartList[i].book_id;
          data.book_name = _this.cartList[i].book_name;
          data.book_author = _this.cartList[i].book_author;
          data.book_cover = _this.cartList[i].book_cover;
          data.count = _this.cartList[i].count;
          data.book_price = _this.cartList[i].book_price;
          _this.dataList.push(data);
          //this.GLOBAL.globalConfirmOrder.orderList.push(data);
          // 用于创建订单时传数据
          dataCreate.book_id = _this.cartList[i].book_id;
          dataCreate.count = _this.cartList[i].count;
          dataCreate.price = _this.cartList[i].book_price;
          dataCreateList.push(dataCreate);
        }
      }
      if (!_this.dataList.length || !dataCreateList.length) {
        // wx.showToast({
        //   title: "请选择宝贝",
        //   icon: "",
        //   duration: 1500
        // });
        this.toast.show = true;
        this.toast.txt = "请选择宝贝";
        if (this.toast.show) {
          setTimeout(function() {
            //toast消失
            _this.toast.show = false;
          }, 1500);
        }
      } else {
        console.log(_this.dataList);
        this.GLOBAL.globalConfirmOrder.orderList = [];
        this.GLOBAL.globalConfirmOrder.orderList = _this.dataList;
        //全局变量数据
        this.GLOBAL.globalConfirmOrder.createOrderList = [];
        this.GLOBAL.globalConfirmOrder.createOrderList = dataCreateList;
        wx.navigateTo({
          url: "/pages/order_submit1/main"
        });
      }
      console.log("_this.dataList" + _this.dataList);
      //全局变量订单

      //console.log(this.GLOBAL.globalConfirmOrder.orderList);
    }
  },
  watch: {
    sumCart: {
      handler: function(newVal, oldVal) {}
    },
    checkMsg: {
      handler: function(newVal, oldVal) {}
    },
    //checkedAll: { handler: function(newVal, oldVal) {} },
    checkedCount: {
      handler: function(newVal, oldVal) {
        //判断是否全选
        // console.log("this.cartList.length" + this.cartList.length);
        // console.log("this.cartList.length" + newVal);
        if (newVal == this.cartList.length) {
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
/* -------------------------------------------------------------------------------------
                                      默认与空处理
---------------------------------------------------------------------------------------*/
.index1 {
  /*Firefox*/
  min-height: -moz-calc(94vh);
  /*chrome safari*/
  min-height: -webkit-calc(94vh);
  /*Standard */
  min-height: calc(94vh);
  background-color: #f5f5f5;
}
.empty {
  height: 1rem;
  display: block;
  width: 100%;
  position: relative;
  background: #f5f5f5;
}
.emptyPanel {
  display: block;
  width: 100%;
  height: 100%;
  font-size: 12px;
  color: #787172;
  text-align: center;
  /*Firefox*/
  height: -moz-calc(83vh);
  /*chrome safari*/
  height: -webkit-calc(83vh);
  /*Standard */
  height: calc(83vh);
}
.empty_img {
  display: inline-block;
  margin-bottom: 1rem;
}
/* -------------------------------------------------------------------------------------
                                      头部
---------------------------------------------------------------------------------------*/
.head {
  display: -webkit-flex;
  display: flex;
  padding: 0.2rem 0.36rem 0.2rem 0.9rem;
}
.logo {
  height: 46rpx;
  flex-basis: 160rpx;
}
/* 图片 */
.logo_img,
.logoTitle_img {
  display: inline-block;
  height: 46rpx;
}
.logo_img {
  width: 50rpx;
}
.logoTitle_img {
  width: 110rpx;
}
.head_title {
  display: inline-block;
  flex: 1;
  width: 120rpx;
  height: 46rpx;
  font-size: 12px;
  color: #36282b;
  vertical-align: middle;
  line-height: 46rpx;
  text-align: right;
}

/* -------------------------------------------------------------------------------------
                                      卡片
---------------------------------------------------------------------------------------*/

.cartPanel {
  display: block;
  /* width: 100%; */
  height: auto;
  overflow: hidden;
  padding: 0 0.3rem 0.1rem;
}
.cartList {
  /* width: 100%; */
  height: 2.5rem;
  /* border-bottom: 1px solid red; */
  /* padding: 0.1rem 0.3rem; */
  border-radius: 20rpx;
  /* margin-top: 20rpx; */
  /* background-color: red; */
}
.cartItem {
  display: -webkit-flex;
  display: flex;
  height: 2.5rem;
  border-radius: 20rpx;
  margin-top: 20rpx;
  background-color: white;
}
/* ---------------------------------------------------
卡片左侧，选择框
------------------------------------------------------*/
.cart_left {
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
.cart_area {
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
/* ---------------------------------------------------
卡片右侧，数据
------------------------------------------------------*/
.cart_right {
  flex: 7;
  width: 1rem;
  /* background:  red; */
  overflow: hidden;
}
/* ---------------------
内容左侧
-----------------------*/
.cart_content__left {
  display: table-cell;
  /* border: 1px solid gold; */
  /* line-height: 2rem; */
  vertical-align: middle;
  text-align: center;
  width: 2rem;
  height: 2.5rem;
}
.cart_img {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  margin: 0 auto;
  max-width: 2rem;
  max-height: 2rem;
  /* border: 1px solid blue; */
}
/* ---------------------
内容右侧 
-----------------------*/
.cart_content__right {
  /* background: red; */
  display: table-cell;
  width: 4rem;
  height: 100%;
  padding: 0.2rem 0.2rem 0.2rem 0.4rem;
}
.cart_content__right_top {
  padding-bottom: 0.8rem;
}
.cart_content__name {
  display: block;
  color: #36282b;
  font-size: 15px;
  margin-top: 0.05rem;
  margin-left: -0.5em;
}
.cart_content__num {
  display: block;
  color: #787172;
  font-size: 11px;
  margin-top: 0.1rem;
}
/* -------------
底部价格和数量 
---------------*/
.cart_content__footer {
  display: -webkit-flex;
  display: flex;
  /* margin-top: 0.8rem; */
  height: 40rpx;
  overflow: hidden;
  vertical-align: middle;
}
.cart_content__price {
  display: inline-block;
  flex: 2;
  height: 100%;
  /* background: red; */
  color: #bc2b37;
  font-size: 15px;
  vertical-align: middle;
}
.cart_content__count {
  display: inline-block;
  flex: 1;
  flex-basis: 110rpx;
  /* max-width: 1.3rem; */
  width: 1.1rem;
  height: 100%;
  text-align: right;
  padding-right: 10rpx;
  vertical-align: middle;
  /* background: blue; */
}

.cart_count_dec,
.cart_count_num,
.cart_count_inc {
  display: inline-block;
  color: #787172;
  font-size: 14px;
  text-align: center;
  vertical-align: middle;
  line-height: 14px;
}
.cart_count_num {
  margin-left: 10rpx;
  margin-right: 10rpx;
}
.cart_count_dec {
  /* background: red; */
  width: 0.4rem;
  height: 0.4rem;
}
.cart_count_inc {
  /* background: blue; */
  width: 0.4rem;
  height: 0.4rem;
}
/* -------------------------------------------------------------------------------------
                                      底部
---------------------------------------------------------------------------------------*/
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
  background-color: white;
  display: -webkit-flex;
  display: flex;
}
/*  */
.cart {
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
.cart .cart_area {
  /* flex: 1; */
  min-width: 100rpx;
  max-width: 100rpx;
}

/*  */
.cart_text {
  display: inline-block;
  color: #36282b;
  font-size: 12px;
}

/*  */
.btnLine {
  flex: 3;
  /* display: inline-block; */
  /* width: 4.5rem; */
  min-width: 4.5rem;
  height: 1rem;
  /* background: red; */
  align-items: center; /*垂直居中*/
  vertical-align: middle;
  /* line-height: 1rem; */
  /* background-color: red; */
  padding: 0 0.36rem 0 0;
  /* padding-top: 0.15rem; */
  text-align: right;
}

.cancelBtn,
.addBtn,
.subBtn {
  margin-top: 0.15rem;
  display: inline-block;
  max-height: 0.6rem;
  /* padding: 15rpx 20rpx; */
  font-size: 15px;
  background-color: transparent;
}
.clear {
  /* height: 1rem; */
  display: inline-block;
  font-size: 12px;
  color: #36282b;
  margin-right: 20rpx;
  vertical-align: middle;
  line-height: 12px;
  align-items: center; /*垂直居中*/
  vertical-align: middle;
}
.clear_img {
  display: inline-block;
  width: 30rpx;
  height: 40rpx;
  /* top: 0.25rem; */
  margin-right: 10rpx;
}
.clear_title {
  display: inline-block;
  height: 40rpx;
  vertical-align: middle;
  line-height: 12px;
  /* width: 30rpx; */
  /* margin-top: -0.15rem; */
}
/* 移入收藏夹 */
.cancelBtn {
  border: 1rpx solid #d2ac6e;
  border-radius: 17px;
  color: #d2ac6e;
  /* margin-left: 80px; */
  margin-right: 20rpx;
  /* padding: 15rpx 20rpx; */
  padding: 15rpx 40rpx;
}
/* 删除 */
.addBtn {
  border: 1px solid #521d23;
  border-radius: 35rpx;
  color: #521d23;
  /* margin-right: 36rpx; */
  padding: 15rpx 40rpx;
}
/* 结算 */
.subBtn {
  padding: 15rpx 70rpx;
  border: 1rpx solid #d2ac6e;
  border-radius: 20px;
  font-size: 18px;
  color: white;
  background-color: #521d23;
  border: 1px solid #521d23;
}
.sumCart {
  display: inline-block;
  height: 24rpx;
  padding: 0;
  margin: 0;
  margin-right: 0.5rem;
  margin-top: -0.15rem;
  color: #36282b;
  font-size: 24rpx;
  vertical-align: middle;
  line-height: 24rpx;
}
.sumNum {
  display: inline-block;
  height: 24rpx;
  padding: 0;
  color: #d2ac6e;
  font-size: 24rpx;
  line-height: 24rpx;
}
</style>