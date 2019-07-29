<template name="toast">
  <view class="toast-in" v-if="isShow">
    <view class="toast-txt">{{txt}}</view>
  </view>
</template>

<script>
export default {
  props: ["isShow", "txt"],
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>
.toast-out {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.toast-in {
  min-width: 100px;
  background: rgba(0, 0, 0, 0.7);
  padding: 6px;
  text-align: center;
  color: white;
}
/* .toast-in span {
  font-size: 30px;
} */
.toast-in .toast-txt {
  font-size: 14px;
}
</style>