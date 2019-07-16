<template>
  <div class="index1">
    <!-- 顶部导航栏 -->
    <navigation-bar :title="'首页'" :backVisible="false" :fontSize="18" :imgsrc="naviImgsrc"></navigation-bar>
    <!-- 显示返回按钮的导航栏 -->
    <!-- fontSize：标题字体大小；backVisible:是否显示返回上一页按钮；linkBack:返回上一页的地址；linkKind：上一页的类型，1为普通页面，0为tab页 -->
    <!-- <navigation-bar
      :title="'测试页'"
      :backVisible="true"
      :fontSize="18"
      :imgsrc="naviImgsrc"
      :linkBack="'/pages/index1/main'"
      :linkKind="false"
<<<<<<< HEAD
    ></navigation-bar> -->

    <!-- logo和搜索框 -->
    <search-bar :logoSrc="logoSrc" :searchSrc="searchSrc" :searchValue="searchValue"></search-bar>
   
   



   
    <a href="/pages/test/main" class="counter">测试页面</a>

=======
    ></navigation-bar>-->

    <!-- logo和搜索框 -->
    <search-bar :logoSrc="logoSrc" :searchSrc="searchSrc" :searchValue="searchValue"></search-bar>

    <!-- 导航栏页 -->
    <kind-tabbar :kindList="kindList" @pickItem="getPick"></kind-tabbar>

    <!-- 轮播页 -->
    <swiper-bar :imgUrls="imgUrls" :swiperHeight="swiperHeight" :showNow="showNow"></swiper-bar>
    <book-list></book-list>

    <a href="/pages/test/main" class="counter">测试页面</a>
>>>>>>> 完成轮播，解决选择类型下轮播的显示问题，解决导航栏固定问题，完成书籍列表的基础样式
    <button @click="show">按钮</button>
  </div>
</template>



<script>
import navigationBar from "@/components/acomponents/navigation";
import searchBar from "@/components/acomponents/searchBar";
<<<<<<< HEAD
export default {
  data() {
    return {
      logoSrc: "/static/images/user.png",
      searchSrc: "/static/images/user.jpg",
      searchValue: "",
      naviImgsrc: "/static/images/user.png"
=======
import kindTabbar from "@/components/acomponents/kindTabbar";
import swiperBar from "@/components/acomponents/swiperBar";
import bookList from "@/components/acomponents/bookList";

export default {
  mounted() {},
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
      swipFlag: true
>>>>>>> 完成轮播，解决选择类型下轮播的显示问题，解决导航栏固定问题，完成书籍列表的基础样式
    };
  },
  components: {
    navigationBar,
<<<<<<< HEAD
    searchBar
  },
  methods: {
    show() {
      console.log("url(" + this.searchSrc + ")");
=======
    searchBar,
    kindTabbar,
    swiperBar,
    bookList
  },

  methods: {
    show() {
      console.log("url(" + this.searchSrc + ")");
    },
    getPick(msg) {
      console.log("点击的类别：" + msg.typename);
>>>>>>> 完成轮播，解决选择类型下轮播的显示问题，解决导航栏固定问题，完成书籍列表的基础样式
    }
  }
};
</script>
<style scoped>
.index1 {
  height: 600px;
  background-color: #f5f5f5;
}
</style>