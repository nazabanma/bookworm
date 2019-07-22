<template>
  <!-- <div :style="{marginTop:swiperTop+'rpx'}"> -->
  <div>
    <!-- ==================================================     组件：轮播，首页+商品详情页    ======================================================= -->
    <view>
      <swiper
        v-if="swipFlag"
        class="swiperPanel"
        :indicator-dots="indicatorDots"
        :autoplay="autoplay"
        :interval="interval"
        :duration="duration"
        :style="{height:swiperHeight+'px'}"
      >
        <block v-for="(item,index) in imgUrls" :key="index">
          <swiper-item class="swiperItem">
            <image :src="item" class="slide-image" />
            <view v-if="showNow" class="showBar">
              <span>{{index+1}}/{{imgUrls.length}}</span>
            </view>
          </swiper-item>
        </block>
      </swiper>
    </view>
  </div>
</template>

<script>
import { globalBus } from "@/components/globalBus";
export default {
  props: ["imgUrls", "swiperHeight", "showNow", "swiperTop"],
  created() {
    this.showFlag();
  },
  data() {
    return {
      //   imgUrls: [
      //   'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      //   'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      //   'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
      // ],
      indicatorDots: false,
      autoplay: true,
      interval: 2000,
      duration: 500,
      swipFlag: true
    };
  },
  mounted() {},
  methods: {
    showFlag() {
      globalBus.$on("swiperFlag", swiperFlag => {
        this.swipFlag = swiperFlag;
        //console.log("显示情况" + this.swipFlag);
      });
    }
  }
};
</script>
<style scoped>
.swiperPanel {
  position: relative;
  display: block;
  width: 100%;
  overflow: hidden;
}
.swiperItem {
  display: block;
  height: 100%;
}
.slide-image {
  display: block;
  width: 100%;
  height: 100% !important;
}
.showBar {
  background-color: rgba(204, 204, 204, 0.7);
  color: white;
  font-size: 14px;
  font-weight: 100;
  height: 0.4rem;
  width: 0.5rem;
  border-radius: 0.2rem;
  padding-left: 0.1rem;
  padding-right: 0.1rem;
  text-align: center;
  vertical-align: middle;
  position: absolute;
  bottom: 0.3rem;
  right: 0.2rem;
  letter-spacing: 4rpx;
  z-index: 99;
}
</style>