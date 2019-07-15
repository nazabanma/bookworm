<template>
  <div class="index1">
    <!-- 顶部导航栏 -->
    <navigation-my :title="'首页'" :backVisible="false" :fontSize="18" :imgsrc="naviImgsrc"></navigation-my>
    <img class="logo" :src="logoSrc" />
    <search-bar :logoSrc="logoSrc" :searchSrc="searchSrc" :searchValue="searchValue"></search-bar>
  </div>
</template>

 

<script>
import navigationMy from "@/components/acomponents/navigation";
import searchBar from "@/components/acomponents/searchBar";
export default {
  data() {
    return {
      logoSrc: "@/static/images/user.png",
      searchSrc: require('../../../static/images/user.png'),
      searchValue: "",
      naviImgsrc: ""
    };
  },
  components: {
    navigationMy,
    searchBar
  },
  methods: {}
};
</script>
<style scoped>
.index1 {
  height: 600px;
  background-color: #f5f5f5;
}
</style>