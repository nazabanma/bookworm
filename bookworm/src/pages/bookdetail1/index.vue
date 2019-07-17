<template>
  <div :style="{background:'#f5f5f5'}">
    <!-- 显示返回按钮的导航栏 -->
    <!-- fontSize：标题字体大小；backVisible:是否显示返回上一页按钮；linkBack:返回上一页的地址；linkKind：上一页的类型，1为普通页面，0为tab页 -->
    <navigation-bar
      :title="'商品详情'"
      :backVisible="true"
      :fontSize="18"
      :imgsrc="naviImgsrc"
      :linkBack="'/pages/index1/main'"
      :linkKind="false"
    ></navigation-bar>
    <view class="linkTabs">
      <a class="tabA active">详情</a>
      <a class="tabA" @click="Link">评价</a>
    </view>
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
  </div>
</template>

<script>
import navigationBar from "@/components/acomponents/navigation";
export default {
  data() {
    return {
      naviImgsrc: "/static/images/左@3x.png",
      book: {
        formAddress: "上海",
        deliverCase: "0.00",
        saleMonth: "30",
        ensure: "正品保证·极速退款·退货运费险·七天退换",
        parameter: "ISBN编号 书名"
      }
    };
  },
  components: {
    navigationBar
  },

  methods: {
    Link(id) {
      wx.navigateTo({
        url: "/pages/bookcomment1/main?book_id=" + id
      });
    }
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style scoped>
/* --------------------------------------------
    选择tabbar
--------------------------------------------- */
.linkTabs {
  width: 100%;
  padding: 0.2rem 0 0.15rem;
  display: flex;
  justify-content: space-evenly;
}
.tabA {
  display: inline-block;
  /* flex: 1; */
  flex-grow: 1;
  flex-basis: 0.8rem;
  max-width: 0.88rem;
  font-size: 15px;
  text-align: center;
  vertical-align: middle;
  color: #36282b;
}
/* 选中之后的样式 */
/* .tabA:after, */
.tabA:visited:after,
.tabA:hover:after,
.tabA:active:after,
.tabA.active:after {
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
/* --------------------------------------------
    书籍详情
--------------------------------------------- */
.bookShow {
  padding: 0rem 0.4rem;
  background-color: white;
  font-size: 10px;
  word-spacing: 0.08rem;
  border: 1px solid red;
}
.showItem {
  margin: 0.3rem 0;
}
.showItem.index {
  display: flex;
}
.title {
  color: #787172;
}
.showItem.index .title {
  display: inline-block;
  text-align: center;
  flex: 1;
}
.showItem.index .title:first-child {
  text-align: left;
}
.title span {
  color: #521d23;
}
</style>
