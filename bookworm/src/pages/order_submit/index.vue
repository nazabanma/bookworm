<template>
  <div class="index1">
    <!-- 顶部导航栏 -->
    <navigation-bar
      :title="'确认订单'"
      :backVisible="true"
      :fontSize="15"
      :imgsrc="naviImgsrc"
      :titleColor="'#521d23'"
    ></navigation-bar>
  </div>
</template>

<script>
import navigationBar from "@/components/acomponents/navigation";
export default {
  data() {
    return {
       naviImgsrc: "/static/images/left.png",
    };
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
  min-height: -moz-calc(100vh);
  /*chrome safari*/
  min-height: -webkit-calc(100vh);
  /*Standard */
  min-height: calc(100vh);
  background-color: #f5f5f5;
}
</style>
