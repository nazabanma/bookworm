<template>
  <div class="index1">
    <!-- 顶部导航栏 -->
    <navigation-bar :title="'首页'" :backVisible="false" :fontSize="18" :imgsrc="naviImgsrc"></navigation-bar>
    <search-bar :logoSrc="logoSrc" :searchSrc="searchSrc" :searchValue="searchValue"></search-bar>
    <view
      :style="{backgoundImage:'url('+searchSrc+')',border:'1px solid red',height:'100px',width:'100px'}"
    ></view>
  </div>
</template>

 

<script>
import navigationBar from "@/components/acomponents/navigation";
import searchBar from "@/components/acomponents/searchBar";
export default {
  data() {
    return {
      logoSrc: "/static/images/user.png",
      searchSrc: require("../../../static/images/user.png"),
      searchValue: "",
      naviImgsrc: "/static/images/user.png"
    };
  },
  components: {
    navigationBar,
    searchBar
  },
  methods: {
  show(){}
  }
};
</script>
<style scoped>
.index1 {
  height: 600px;
  background-color: #f5f5f5;
}
</style>