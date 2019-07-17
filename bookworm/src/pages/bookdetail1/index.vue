<template>
  <div>
    <!-- 显示返回按钮的导航栏 -->
    <!-- fontSize：标题字体大小；backVisible:是否显示返回上一页按钮；linkBack:返回上一页的地址；linkKind：上一页的类型，1为普通页面，0为tab页 -->
    <navigation-bar
      :title="'商品详情'"
      :backVisible="true"
      :fontSize="18"
      :imgsrc="naviImgsrc"
      :linkBack="'/pages/index1/main'"
      :linkKind="false"
    ></navigation-bar>
  </div>
</template>

<script>
import navigationBar from "@/components/acomponents/navigation";
export default {
  data() {
    return {
      naviImgsrc: "/static/images/左@3x.png"
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
</style>
