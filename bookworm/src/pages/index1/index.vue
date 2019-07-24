<template>
  <div class="index1">
    <!-- 顶部导航栏 -->
    <navigation-bar
      :title="'首页'"
      :backVisible="false"
      :fontSize="18"
      :imgsrc="naviImgsrc"
      :titleColor="'#521d23'"
    ></navigation-bar>
    <!-- 显示返回按钮的导航栏 -->
    <!-- fontSize：标题字体大小；backVisible:是否显示返回上一页按钮；linkBack:返回上一页的地址；linkKind：上一页的类型，1为普通页面，0为tab页 -->
    <!-- <navigation-bar
      :title="'测试页'"
      :backVisible="true"
      :fontSize="18"
      :imgsrc="naviImgsrc"
      :linkBack="'/pages/index1/main'"
      :linkKind="false"
    ></navigation-bar>-->

    <!-- logo和搜索框 -->
    <!-- <search-bar :logoSrc="logoSrc" :searchSrc="searchSrc" :searchValue="searchValue"></search-bar> -->

    <view class="searchPanel">
      <view class="container">
        <view :style="{display:'table-cell',verticalAlign:'top',paddingRight:'0.25rem'}">
          <img class="logo" :src="logoSrc" />
        </view>&nbsp;
        <view :style="{display:'table-cell',verticalAlign:'top'}">
          <input type="text" class="search_input" :value="searchValue" @change="onChange" />
          <!-- 搜索框图标 -->
          <img class="searchImg" :src="searchSrc" />
        </view>
      </view>
    </view>

    <!-- 导航栏页 -->
    <kind-tabbar :kindList="kindList" @pickItem="getPick"></kind-tabbar>

    <!-- 轮播页 -->
    <swiper-bar :imgUrls="imgUrls" :swiperHeight="swiperHeight" :showNow="showNow"></swiper-bar>
    <book-list v-if="booksData" :bookList="booksData"></book-list>

    <!-- <a href="/pages/test/main" class="counter">测试页面</a>
    <button @click="show">按钮</button>-->
  </div>
</template>



<script>
import navigationBar from "@/components/acomponents/navigation";
import searchBar from "@/components/acomponents/searchBar";
import kindTabbar from "@/components/acomponents/kindTabbar";
import swiperBar from "@/components/acomponents/swiperBar";
import bookList from "@/components/acomponents/bookList";

export default {
  provide() {
    return {
      reload: this.reload
    };
  },
  inject: ["reload"],

  data() {
    return {
      logoSrc: "/static/images/logo.png",
      searchSrc: "/static/images/search.png",
      searchValue: "",
      naviImgsrc: "/static/images/left.png",
      // 类型
      kindList: [
        // { id: "1", typename: "推荐" },
        // { id: "2", typename: "图书" },
        // { id: "3", typename: "电子书" },
        // { id: "4", typename: "听书" },
        // { id: "5", typename: "网络文学" },
        // { id: "6", typename: "二手书" },
        // { id: "7", typename: "其他1" },
        // { id: "8", typename: "其他2" },
        // { id: "9", typename: "其他3" },
        // { id: "10", typename: "其他4" },
        // { id: "11", typename: "其他5" },
        // { id: "12", typename: "其他6" },
        // { id: "13", typename: "其他7" },
        // { id: "14", typename: "其他8" }
      ],
      pickItem: 0,
      imgUrls: [
        this.GLOBAL.serverSrc + "/static/images/banner1.png",
        this.GLOBAL.serverSrc + "/static/images/banner2.png",
        this.GLOBAL.serverSrc + "/static/images/banner3.png"
      ],
      swiperHeight: 150,
      showNow: false,
      swipFlag: true,
      booksData: ""
    };
  },
  components: {
    navigationBar,
    searchBar,
    kindTabbar,
    swiperBar,
    bookList
  },

  methods: {
    //================================================   刷新当前页
    reload() {
      this.isRouterAlive = false;
      console.log("刷新");
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    getBookData(pick) {
      let _this = this;
      this.$nextTick(function() {
        // -----------------------------  获取书籍列表
        wx.request({
          url: this.GLOBAL.serverSrc + "/book/bookList/" + pick,
          method: "GET",
          success(res) {
            _this.booksData = res.data.data;
            // console.log("获取到的书籍成功，数据");
            //console.log(_this.booksData);
          }
        });
      });
    },
    show() {
      // console.log("url(" + this.searchSrc + ")");
      //console.log("获取到的书籍列表:" + this.booksData);
    },
    getPick(msg) {
      console.log("点击的类别：" + msg);
      this.pickItem = msg;
      this.reload();
      this.getBookData(msg);
    }
  },
  created() {
    wx.showLoading({
      title: "加载中"
    });

    this.getBookData(this.pickItem);
    let _this = this;
    this.$nextTick(function() {
      // ----------------------------------------  获取书籍类型
      wx.request({
        url: this.GLOBAL.serverSrc + "/book/bookType",
        method: "GET",
        success(res) {
          _this.kindList = res.data.data;
          console.log(_this.kindList);
          //console.log(_this.booksData);
          wx.hideLoading();
        }
      });
    });
    //this.getBookData(this.pickItem);
  },
  // 搜索框
  onChange(event) {
    this.value = event.mp.detail;
    console.log(this.value);
  }
};
</script>
<style scoped>
.index1 {
  /* height: 600px; */
  background-color: #f5f5f5;
}
/* --------------------------------------------------------------   搜索框*/
.searchPanel {
  display: block;
  position: relative;
  z-index: 99999;
}
.container {
  display: table;
  width: 100%;
  height: 0.8rem;
  padding: 0.15rem 0.25rem;
  vertical-align: middle;
}
.logo {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 0.25rem;
  padding: 0;
  margin-top: 0.04rem;
  background-color: #ffffff;
}
.search_input {
  width: 5.4rem;
  height: 0.58rem;
  border-radius: 0.25rem;
  padding: 0.02rem 0.2rem 0.02rem 0.6rem;
  margin: 0;
  font-size: 14px;
  background-color: #ffffff;
  color: #787172;
}
.searchImg {
  width: 0.35rem;
  height: 0.35rem;
  position: absolute;
  margin: -0.475rem 0.15rem;
}
</style>