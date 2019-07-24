<template>
  <div class="searchPanel">
    <!-- ==================================================     组件：搜索框     ======================================================= -->
    <view class="searchPanel">
      <view class="container">
        <view :style="{display:'table-cell',verticalAlign:'top',paddingRight:'0.25rem'}">
          <img class="logo" :src="logoSrc" />
        </view>&nbsp;
        <view :style="{display:'table-cell',verticalAlign:'top'}">
          <input type="text" class="search_input" :value="searchValue" @change="onChange" />
          <!-- 搜索框图标 -->
          <img class="searchImg" :src="searchSrc" />
        </view>
      </view>
    </view>
  </div>
</template>


<script>
export default {
  props: ["logoSrc", "searchSrc", "searchValue"],
  data() {
    return {
      // logoSrc: "",
      // searchSrc: "",
      // searchValue: ""
      //searchSrc: ""
    };
  },

  methods: {
    onChange(event) {
      this.value = event.mp.detail;
      console.log(this.value);
    },
    show() {
      console.log(this.searchSrc);
    }
  }
};
</script>
<style scoped>
.searchPanel {
  display: block;
  position: relative;
  z-index: 99999;
}
.container {
  display: table;
  width: 100%;
  height: 0.8rem;
  padding: 0.15rem 0.25rem;
  vertical-align: middle;
}
.logo {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 0.25rem;
  padding: 0;
  margin-top: 0.04rem;
  background-color: #ffffff;
}
.search_input {
  width: 5.4rem;
  height: 0.58rem;
  border-radius: 0.25rem;
  padding: 0.02rem 0.2rem 0.02rem 0.6rem;
  margin: 0;
  font-size: 14px;
  background-color: #ffffff;
  color: #787172;
}
.searchImg {
  width: 0.35rem;
  height: 0.35rem;
  position: absolute;
  margin: -0.475rem 0.15rem;
}
</style>