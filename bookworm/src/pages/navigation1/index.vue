<template>
  <div class="index1">
    <!-- 顶部导航栏 -->
    <navigation-bar :title="'首页'" :backVisible="false" :fontSize="18" :imgsrc="naviImgsrc"></navigation-bar>

    <!-- logo和搜索框 -->
    <search-bar :logoSrc="logoSrc" :searchSrc="searchSrc" :searchValue="searchValue"></search-bar>

    <!-- 导航栏页 -->
    <kind-tabbar :kindList="kindList" @pickItem="getPick"></kind-tabbar>

    <a href="/pages/test/main" class="counter">测试页面</a>

    <button @click="show">按钮</button>
  </div>
</template>



<script>
import navigationBar from "@/components/acomponents/navigation";
import searchBar from "@/components/acomponents/searchBar";
import kindTabbar from "@/components/acomponents/kindTabbar";
export default {
  data() {
    return {
      logoSrc: "/static/images/user.png",
      searchSrc: "/static/images/user.jpg",
      searchValue: "",
      naviImgsrc: "/static/images/user.png",
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
      pickItem:''
    };
  },
  components: {
    navigationBar,
    searchBar,
    kindTabbar
  },
  methods: {
    show() {
      console.log("url(" + this.searchSrc + ")");
    },
    getPick(msg) {
      console.log("点击的类别："+msg.typename);
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