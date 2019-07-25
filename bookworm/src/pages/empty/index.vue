<template>
  <div class="index1">
    <!-- 顶部导航栏 -->
    <navigation-bar
      :title="'购物车'"
      :backVisible="false"
      :fontSize="18"
      :imgsrc="naviImgsrc"
      :titleColor="'#521d23'"
    ></navigation-bar>

    
  </div>
</template>

<script>
import navigationBar from "@/components/acomponents/navigation";
export default {
  data() {
    return {};
  },

  components: {
    navigationBar
  },

  methods: {},

  created() {
    // let app = getApp()
  }
};
</script>

<style scoped>
.index1 {
  /*Firefox*/
  min-height: -moz-calc(94vh);
  /*chrome safari*/
  min-height: -webkit-calc(94vh);
  /*Standard */
  min-height: calc(94vh);
  background-color: #f5f5f5;
}
</style>
