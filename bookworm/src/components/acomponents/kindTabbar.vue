<template>
  <div>
    <view v-if="!show" class="container">
      <view
        class="kindItems"
        v-for="(item, index) in showList"
        :key="index"
        @click="linkType(item)"
      >
        <a class="kindItem">{{item.typename}}</a>
      </view>
      <view class="btn" @click="moreKind">
        <img class="btnImg" :src="btnSrc" />
      </view>
    </view>

    <view v-if="show" class="popPanel">
      <view class="btnLable">
        <view class="btn2" @click="moreKind">
          <img class="btnImg2" :src="btnSrc" />
        </view>
      </view>
      <view class="pop">
        <view class="kindBtns" v-for="(item, index) in BtnList" :key="index">
          <view class="btnTr">
            <block v-for="(i,k) in item" :key="k">
              <a class="btnTd" @click="print(i)">{{i.typename}}</a>
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
      btnSrc: "/static/images/user.png",
      showItem: true,
      showList: [],
      BtnList: [],
      show: true
      // kindList: [],
    };
  },
  mounted() {
    //console.log(this.kindList[1]);
    //console.log(this.kindList.length);
    let length = this.kindList.length;
    for (let i = 0; i < 6; i++) {
      // this.showList.splice(i, 0);
      let item = this.kindList[i];
      this.showList.push(item);
    }

    for (let i = 0; i < length; i += 4) {
      this.BtnList.push(this.kindList.slice(i, i + 4));
    }
    // for(let i=0;i<4;i++){
    //   let item = this.kindList[i];
    //   this.BtnList.push(item);
    // }
    console.log(this.BtnList);
  },
  methods: {
    linkType(item) {
      this.pickItem = item;
      // 从组件传递数据到页面
      this.$emit("pickItem", this.pickItem);
    },
    moreKind() {
      this.show = !this.show;
    },
    print(e) {
      // console.log(e);
      this.pickItem = e;
      this.$emit("pickItem", this.pickItem);
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
  /* display: table-row;对padding不敏感，这里只能用table进行限制 */
  width: 100%;
  height: 0.5rem;
  padding: 0 0 0 0.3rem;
  vertical-align: middle;
}
/* 类型列表 */
.kindItems {
  display: table-cell;
  /* display: -webkit-flex; */
  word-break: break-all;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-start;
  align-content: flex-start;
  /* background-color: antiquewhite; */
  vertical-align: middle;
}
/* 单个类型： a */
.kindItem {
  flex-grow: 1;
  flex-basis: 0.4rem;
  /* max-width: 1.2rem; */
  font-size: 15px;
  text-align: center;
  vertical-align: middle;
  /* border: 1px solid red; */
}
/* 选中之后的样式 */
.kindItem.active:after,
.kindItem:active:after,
.kindItem:focus:after,
.kindItem:visited:after,
.kindItem:link:after {
  position: relative;
  display: block;
  content: "";
  width: 80%;
  margin: 0 auto;
  height: 4rpx;
  left: 0;
  top: 0.1rem;
  bottom: 0;
  background: red;
  border-radius: 2rpx;
}
/* 右侧更多类型按钮 */
.btn {
  display: block;
  width: 0.4rem;
  height: 0.2rem;
  background-color: rgba(245, 245, 245, 0.9);
  box-shadow: 0 0 0.1rem 0.1rem rgba(245, 245, 245, 0.95);
  position: relative;
  top: 0.15rem;
  right: 0.3rem;
  z-index: 2;
  text-align: center;
  border-radius: 0.05rem;
}
/* 更多类型按钮图片 */
.btnImg {
  width: 0.26rem;
  height: 0.16rem;
  display: block;
  position: relative;
  top: 0.02rem;
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
  padding:0;
  /* zoom: 1; */
  overflow: hidden;
  background-color: white;
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
  width:100%;
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