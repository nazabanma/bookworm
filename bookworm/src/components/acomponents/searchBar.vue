<template>
  <div>
    <view class="container">
      <view :style="{display:'table-cell',verticalAlign:'top',paddingRight:'0.25rem'}">
        <img class="logo" :src="searchSrc" />
      </view>&nbsp;
      <view :style="{display:'table-cell',verticalAlign:'top'}">
        <input
          type="text"
          class="search_input"
          :style="{backgoundImage:'url('+searchSrc+')'}"
          :value="searchValue"
          @change="onChange"
        />
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
      searchSrc: ""
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
.index1 {
  height: 1000px;
  background-color: #f5f5f5;
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
  background-color: #ffffff;
}
.search_input {
  width: 5.8rem;
  height: 0.58rem;
  border-radius: 0.25rem;
  padding: 0.02rem 0.2rem;
  margin: 0;
  font-size: 14px;
  background-size: "100% 100%";
  background-repeat: "no-repeat";
  /* background-color: #ffffff; */
}
</style>