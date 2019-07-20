<template>
  <div>
     <!-- ==================================================     组件：商品详情页面底部的按钮组合     ======================================================= -->
   
    <cover-view @blur="blurs" class="tabbar">
      <cover-view class="collect">
        <cover-image
          v-if="collectType"
          class="collect_image"
          :src="'/static/images/collected.png'"
          @click="collect()"
        ></cover-image>
        <cover-image
          v-else
          class="collect_image"
          :src="'/static/images/collect.png'"
          @click="collect()"
        ></cover-image>
        <cover-view class="collect_text">收藏</cover-view>
      </cover-view>
      <cover-view class="addToCart" @click="addToCart">
        <cover-image class="back_image" :src="'/static/images/backbtn2.png'"></cover-image>
        <button>加入购物车</button>
      </cover-view>
      <cover-view class="Buy" @click="BuyNow">
        <cover-image class="back_image" :src="'/static/images/backbtn1.png'"></cover-image>
        <button>立即购买</button>
      </cover-view>
    </cover-view>
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      // imgsrc1: "/static/images/收藏——未选中@3x.png",
      // imgsrc2: "/static/images/收藏——选中@3x.png",
      // backSrc: "/static/images/圆角矩形3拷贝@3x.png",
      // backSrc2: "/static/images/圆角矩形3@3x.png",
      collectType: 0
    };
  },
  mounted() {
    if (!this.collectType) {
      this.imgsrc = this.imgsrc1;
    } else {
      this.imgsrc = this.imgsrc2;
    }
  },
  methods: {
    blurs() {
      window.scroll(0, 0);
    },
    collect() {
      this.collectType = !this.collectType;
      console.log("collect");
    },
    addToCart() {
      console.log("addToCart");
    },
    BuyNow() {
      console.log("BuyNow");
    }
  }
};
</script>
<style scoped>
.tabbar {
  height: 1rem;
  width: 100%;
  transform: none;
  position: fixed;
  bottom: 0;
  z-index: 999;
  background-color: white;
  display: -webkit-flex;
  display: flex;
}
.collect {
  flex: 1;
  line-height: 1rem;
  color: #36282b;
  font-size: 10px;
}
.collect_image {
  display: block;
  width: 0.64rem;
  height: 0.5rem;
  margin: 0.04rem auto 0.1rem;
}
.collect_text {
  display: block;
  width: 2em;
  height: 1rem;
  left: 50%;
  right: 50%;
  margin: auto;
  text-align: center;
}
/* ------------------------------------清除button所有默认样式 */
button,
.button-hover {
  color: unset;
  background-color: unset;
  padding: unset;
  font-size: unset;
  line-height: unset;
  border-radius: unset;
  -webkit-tap-highlight-color: unset;
  overflow: hidden;
}
button::after {
  display: none;
}
/* ------------------------------------清除结束 */
.addToCart,
.Buy {
  line-height: 1rem;
  flex: 2;
  color: white;
}
.addToCart button,
.Buy button {
  width: 100%;
  height: 100%;
}
.back_image {
  z-index: -1;
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>