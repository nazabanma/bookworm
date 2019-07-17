<template>
  <div>
    <swiper
      v-if="swipFlag"
      class="swiperPanel"
      :indicator-dots="indicatorDots"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
      :style="{height:swiperHeight+'rpx'}"
    >
      <block v-for="(item,index) in imgUrls" :key="index">
        <swiper-item>
          <image :src="item" class="slide-image" />
          <view v-if="showNow" class="showBar">{{index+1}}/{{imgUrls.length}}</view>
        </swiper-item>
      </block>
    </swiper>
  </div>
</template>

<script>
import { globalBus } from "@/components/globalBus";
export default {
  props: ["imgUrls", "swiperHeight", "showNow"],
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
  width: 100%;
}
.slide-image {
  width: 100%;
  height: 100%;
}
.showBar {
  background-color: rgb(204, 204, 204);
  color: white;
  font-size: 14px;
  height: 0.4rem;
  width: 0.5rem;
  border-radius: 0.2rem;
  z-index: 99;
  padding: 0.05rem 0.1rem;
  text-align: center;
  vertical-align: middle;
  position: absolute;
  bottom: 0.3rem;
  right: 0.2rem;
}
</style>