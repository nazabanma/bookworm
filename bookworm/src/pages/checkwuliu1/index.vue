<template>
  <div class="index1">
    <!-- 顶部导航栏 -->
    <navigation-bar
      :title="'查看物流'"
      :backVisible="true"
      :fontSize="18"
      :imgsrc="naviImgsrc"
      :titleColor="'#521d23'"
<<<<<<< HEAD
    ></navigation-bar>
    <!-- :linkKind="true" -->
=======
      :linkBack="'/pages/myorder3/main'"
      :linkKind="true"
    ></navigation-bar>
>>>>>>> 1eda815ab7bedfb55b4e0b845964db1eb0834c2e
    <view>
      <img :src="ImgSrc" class="img" mode="widthFix" />
    </view>
  </div>
</template>

<script>
import navigationBar from "@/components/acomponents/navigation";
export default {
  data() {
    return {
      naviImgsrc: "/static/images/left.png",
      ImgSrc: this.GLOBAL.serverSrc + "/static/images/wuliu.jpg"
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
.img {
  width: 100%;
}
</style>
