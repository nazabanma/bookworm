<template>
  <div class="index1">
    <!-- 顶部导航栏 -->
    <navigation-bar :title="'首页'" :backVisible="false" :fontSize="18" :imgsrc="naviImgsrc" :titleColor="'#521d23'"></navigation-bar>
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
    <search-bar :logoSrc="logoSrc" :searchSrc="searchSrc" :searchValue="searchValue"></search-bar>

    <!-- 导航栏页 -->
    <kind-tabbar :kindList="kindList" @pickItem="getPick"></kind-tabbar>

    <!-- 轮播页 -->
    <swiper-bar :imgUrls="imgUrls" :swiperHeight="swiperHeight" :showNow="showNow"></swiper-bar>
    <book-list v-if="booksData" :bookList="booksData"></book-list>

    <a href="/pages/test/main" class="counter">测试页面</a>
    <button @click="show">按钮</button>
  </div>
</template>



<script>
import navigationBar from "@/components/acomponents/navigation";
import searchBar from "@/components/acomponents/searchBar";
import kindTabbar from "@/components/acomponents/kindTabbar";
import swiperBar from "@/components/acomponents/swiperBar";
import bookList from "@/components/acomponents/bookList";

export default {
  created() {
    let _this = this;
    this.$nextTick(function() {
      wx.request({
        url: "http://api.ec.com:8087/user/bookList/0",
        method: "GET",
        success(res) {
          _this.booksData = res.data.data;
          // console.log("获取到的书籍成功，数据");
          //console.log(_this.booksData);
        }
      });
    });
  },
  data() {
    return {
      logoSrc: "/static/images/logo@3x.png",
      searchSrc: "/static/images/搜索@3x.png",
      searchValue: "",
      naviImgsrc: "/static/images/左@3x.png",
      // 类型
      kindList: [
        { id: "1", typename: "推荐" },
        { id: "2", typename: "图书" },
        { id: "3", typename: "电子书" },
        { id: "4", typename: "听书" },
        { id: "5", typename: "网络文学" },
        { id: "6", typename: "二手书" },
        { id: "7", typename: "其他1" },
        { id: "8", typename: "其他2" },
        { id: "9", typename: "其他3" },
        { id: "10", typename: "其他4" },
        { id: "11", typename: "其他5" },
        { id: "12", typename: "其他6" },
        { id: "13", typename: "其他7" },
        { id: "14", typename: "其他8" }
      ],
      pickItem: "",
      imgUrls: [
        "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640",
        "https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640",
        "https://images.unsplash.com/photo-1551446591-142875a901a1?w=640"
      ],
      swiperHeight: 300,
      showNow: false,
      swipFlag: true,
      booksData: ''
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
    show() {
      // console.log("url(" + this.searchSrc + ")");
      //console.log("获取到的书籍列表:" + this.booksData);
    },
    getPick(msg) {
      console.log("点击的类别：" + msg.typename);
    }
  }
};
</script>
<style scoped>
.index1 {
  /* height: 600px; */
  background-color: #f5f5f5;
}
</style>