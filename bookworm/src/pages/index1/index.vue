<template>
  <div>
    <!-- 载入字体 -->
    <!-- <div :class="[isTest?'career':'']">
    ssssss
    <button @click="fontfamily">加载字体</button>
    </div>-->
    <button @click="fontfamily">加载字体</button>
  </div>
</template>

<script>
import card from "@/components/card";

export default {
  data() {
    return {
      motto: "Hello miniprograme",
      fontFamily: "Bitstream Vera Serif Bold",
      loaded: false,
      isTest: true
    };
  },

  components: {
    card
  },

  methods: {
    fontfamily() {
      wx.loadFontFace({
        family: "Bitstream Vera Serif Bold",
        source: 'url("https://sungd.github.io/Pacifico.ttf")',
        success(res) {
          console.log(res.status);
          this.loaded = true;
        },
        fail: function(res) {
          console.log(res.status);
        },
        complete: function(res) {
          console.log(res.status);
        }
      });
    }
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style scoped>
.career {
  font-family: "Bitstream Vera Serif Bold";
}
</style>
