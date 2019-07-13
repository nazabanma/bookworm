<template>
  <div>
    <!-- <template>
      <div class="container">
        <frames></frames>
      </div>
    </template> -->
    <card></card>
  </div>
</template>
    </div>
</template>

<script>
// import frames from "@/components/acomponents/navigation";
import frames from "@/components/card";
export default {
  components: {
    // frames,
    card
  },
  data() {
    return {
      videoTitle: "自定义标题"
    };
  }
};
</script>
<style lang="scss" scoped>
.content {
  width: 100vw;
  height: 150vh;
  border: 1px solid red;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 150rpx;
}
</style>