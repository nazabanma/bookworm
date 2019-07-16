<template>
  <div class="index1">
    <!-- 显示返回按钮的导航栏 -->
    <navigation-bar
      :title="'测试页'"
      :backVisible="true"
      :fontSize="18"
      :imgsrc="naviImgsrc"
      :linkBack="'/pages/index1/main'"
      :linkKind=false
    ></navigation-bar>

    <!-- logo和搜索框 -->
    <search-bar :logoSrc="logoSrc" :searchSrc="searchSrc" :searchValue="searchValue"></search-bar>
    <a href="/pages/test1/main" class="counter">测试页面2</a>
  </div>
</template>



<script>
import navigationBar from "@/components/acomponents/navigation";
import searchBar from "@/components/acomponents/searchBar";
export default {
  data() {
    return {
      logoSrc: "/static/images/user.png",
      searchSrc: "/static/images/user.jpg",
      searchValue: "",
      naviImgsrc: "/static/images/user.png"
    };
  },
  components: {
    navigationBar,
    searchBar
  },
  methods: {
    show() {
      console.log("url(" + this.searchSrc + ")");
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