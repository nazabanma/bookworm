<template>
  <div :style="{background:'#f5f5f5'}">
    <!-- ==================================================     组件：详情:书籍信息     ======================================================= -->
    <view class="bookShow">
      <view class="showItem index">
        <span class="title">
          发货：
          <span>{{book.formAddress}}</span>
        </span>
        <span class="title">
          快递：
          <span>{{book.deliverCase}}</span>
        </span>
        <span class="title">
          月销：
          <span>{{book.saleMonth}}</span>
        </span>
      </view>
      <view class="showItem">
        <span class="title">
          保障：
          <span>{{book.ensure}}</span>
        </span>
      </view>
      <view class="showItem">
        <span class="title">
          参数：
          <span>{{book.parameter}}</span>
        </span>
      </view>
    </view>
    <view class="detailImg">
      <image mode="widthFix" :src="book.detailImg" />
    </view>
    <!-- <view></view>
    <view></view>-->
  </div>
</template>

<script>
export default {
  props: ["saleMonth", "formAddress"],
  data() {
    return {
      naviImgsrc: "/static/images/左@3x.png",
      book: {
        deliverCase: "0.00",
        ensure: "正品保证·极速退款·退货运费险·七天退换",
        parameter: "ISBN编号 书名",
        detailImg: ""
      }
    };
  },
  methods: {

  },

  created() {
    // let app = getApp()
  }
};
</script>

<style scoped>
/* --------------------------------------------
    书籍详情
--------------------------------------------- */
.bookShow {
  padding: 0.3rem 0.4rem;
  background-color: white;
  font-size: 10px;
  word-spacing: 0.08rem;
  /* border: 1px solid red; */
}

.showItem {
  margin-top: 0.3rem;
}
.showItem:first-child {
  margin-top: 0;
}

.showItem.index {
  display: flex;
}
.title {
  color: #b9abaa;
}
.showItem.index .title {
  display: inline-block;
  text-align: center;
  flex: 1;
}
/* 第一行后的竖线 */
.showItem.index .title::before {
  position: relative;
  display: inline-block;
  content: "";
  width: 2rpx;
  margin: 0 auto;
  height: 80%;
  top: 10%;
  bottom: 0;
  right: 0.5rem;
  background: #b9abaa;
  border-radius: 2rpx;
}
.showItem.index .title:first-child {
  text-align: left;
  border-left: none;
}
.showItem.index .title:first-child::before {
  display: none;
}
.title span {
  color: #787172;
}
/* --------------------------------------------
    书籍详情图片
--------------------------------------------- */
.detailImg {
  margin-top: 0.3rem;
  text-align: center;
  position: relative;
  width: 100%;
  /* background-color: white; */
  background-color: red;
}
.detailImg image {
  width: 100%;
  display: block;
}
</style>
