<template>
  <div>
    <!-- ==================================================     组件：首页分类点击切换     ======================================================= -->
    <view class="container">
      <swiper
        class="kindItems"
        :indicator-dots="false"
        :autoplay="false"
        :display-multiple-items="6"
      >
        <swiper-item class="kindSwiper" v-for="(item,index) in kindList" :key="index">
          <a
            class="kindItem"
            @click="linkType(item.id)"
            :class="{ 'active': (pick_item==item.id) }"
          >{{item.name}}</a>
        </swiper-item>
      </swiper>
    </view>
  </div>
</template>

<script>
import { globalBus } from "@/components/globalBus";
export default {
  props: ["kindList"],
  data() {
    return {
      btnSrc: "/static/images/down.png",
<<<<<<< HEAD
      pick_item: 0
=======
      showItem: true,
      pick_item: 0,
      showList: [],
      btnSrc2: "/static/images/up.png",
      BtnList: [],
      show: true
>>>>>>> 1eda815ab7bedfb55b4e0b845964db1eb0834c2e
      // kindList: [],
    };
  },

  watch: {
    kindList: {
      handler: function(newVal, oldVal) {
        wx.hideLoading();
      }
    }
  },
  onShow() {
    console.log("this.kindList" + this.kindList[0].name);
    if (this.kindList.length == 0) {
      wx.showLoading({
        title: "加载中"
      });
    }
    //console.log("按钮数组："+this.BtnList);
  },
  methods: {
    linkType(itemId) {
      
      this.pick_item = itemId;
      this.$emit("pickItem", itemId);
    }
  }
};
</script>
<style scoped>
/* --------------------------------------------
    选择类型tabbar
--------------------------------------------- */
/* 最外层view */
.container {
  display: table;
  position: relative;
  /* display: table-row;对padding不敏感，这里只能用table进行限制 */
  width: 100%;
  height: 0.6rem;
  padding: 0.1rem 0 0;
  /* margin-top:0.1rem; */
  vertical-align: middle;
  overflow: hidden;
  /* background-color: red; */
  /* background-color: blue; */
}
/* 类型列表 */
.kindItems {
  height: 0.6rem;
  display: table-cell;
  /* display: -webkit-flex; */
  word-break: break-all;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-start;
  align-content: flex-start;
  /* background-color: antiquewhite; */
  vertical-align: middle;
  /* background-color: red; */
}
/* .kindSwiper {
  display: table-cell;
  transform: unset;
  position: relative;
  background-color: red;
} */
/* 单个类型： a */
.kindItem {
  flex-grow: 1;
  flex-basis: 0.3rem;
  /* max-width: 1.2rem; */
  font-size: 15px;
  text-align: center;
  vertical-align: middle;
  color: #36282b;
  /* border: 1px solid red; */
}
/* 选中之后的样式 */
/* .kindItem:after , */

.kindItem.active:after {
  position: relative;
  display: block;
  content: "";
  width: 80%;
  margin: 0 auto;
  height: 4rpx;
  left: 0;
  top: 0.1rem;
  bottom: 0.3rem;
  background: #521d23;
  border-radius: 2rpx;
  color: #521d23;
}
/* 右侧更多类型按钮 */
.btn {
  display: block;
  width: 0.4rem;
  height: 0.4rem;
  background-color: rgba(245, 245, 245, 0.9);
  box-shadow: 0 0 0.1rem 0.1rem rgba(245, 245, 245, 0.95);
  position: relative;
  top: 0.1rem;
  right: 0.2rem;
  z-index: 2;
  text-align: center;
  border-radius: 0.05rem;
  /* background-color: red; */
}
/* 更多类型按钮图片 */
.btnImg {
  width: 0.26rem;
  height: 0.16rem;
  display: block;
  position: relative;
  top: 0.08rem;
  left: 0.07rem;
  z-index: 3;
}
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
  border: 1px solid #d2ac6e;
  color: #d2ac6e;
  border-radius: 0.1rem;
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
  height: 100%;
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