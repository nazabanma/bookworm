<template>
  <div>
    <view v-if="show" class="popPanel">
      <view class="btnLable">
        <view class="btn2" @click="moreKind">
          <img class="btnImg2" :src="btnSrc2" />
        </view>
      </view>
      <view class="pop">
        <view class="kindBtns" v-for="(item, index) in BtnList" :key="index">
          <view class="btnTr">
            <block v-for="(i,k) in item" :key="k">
              <a class="btnTd" @click="linkType(i)">{{i.typename}}</a>
            </block>
          </view>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
export default {
  props: ["kindList"],
  data() {
    return {
      btnSrc2: "/static/images/上@3x.png",
      BtnList: [],
      show: true
    };
  },
  mounted() {
    // 数组分割
    let length = this.kindList.length;
    for (let i = 0; i < length; i += 4) {
      this.BtnList.push(this.kindList.slice(i, i + 4));
    }
    //console.log(this.BtnList);
  },
  methods: {
    linkType(item) {
      this.$emit("pickItem", item);
    },
    moreKind() {
      this.show = !this.show;
    }
  }
};
</script>
<style scoped>
/* --------------------------------------------
    选择类型按钮
--------------------------------------------- */
/* 最外层view */
.popPanel {
  display: block;
  /* float: none;
  clear: both; */
  width: 100%;
  height: auto;
  padding: 0;
  /* zoom: 1; */
  overflow: hidden;
  background-color: white;
  position: absolute;
  z-index: 2;
}
/* 存放按钮，对按钮进行布局 */
.pop {
  display: table;
  width: 100%;
  height: auto;
  vertical-align: middle;
  border-collapse: collapse;
  overflow-x: hidden;
  padding: 0;
  border-collapse: separate;
  border-spacing: 0.2rem 0.1rem;
}

/* 按钮遍历:按行 */
.btnTr {
  display: table-row;
  float: left;
  padding: 0;
}
/* 按钮 */
.btnTd {
  display: table-cell;
  width: 1.5rem;
  height: 0.6rem;
  font-size: 15px;
  text-align: center;
  padding: 0;
  line-height: 0.6rem;
  box-sizing: none;
  border-radius: 0;
  margin: 0;
  border: 1px solid rgba(245, 245, 245, 1);
}
.btnLable {
  display: block;
  width: 100%;
  height: 0.3rem;
}
/* 右侧更多类型按钮 */
.btn2 {
  display: inline-block;
  width: 0.4rem;
  height: 0.2rem;
  /* box-shadow: 0 0 0.1rem 0.1rem rgba(245, 245, 245, 0.95); */
  position: relative;
  margin-top: 0.1rem;
  margin-left: 6.8rem;
  /* right: rem;  */
  text-align: center;
  border-radius: 0.05rem;
  z-index: 99;
  vertical-align: top;
}

/* 更多类型按钮图片 */
.btnImg2 {
  width: 0.26rem;
  height: 0.16rem;
  display: block;
  position: relative;
  top: 0.02rem;
  left: 0.07rem;
}
</style>