<template>
  <div class="comp-navbar">
    <!-- ==================================================     组件：导航栏     ======================================================= -->

    <!-- 占位栏 -->
    <!-- 这里是因为导航栏是fixed的，不占具体的页面位置，添加占位符避免页面中最顶上的元素被覆盖 -->
    <cover-view class="placeholder-bar" :style="{height: navBarHeight + 'px'}"></cover-view>

    <!--------------- 自定义导航栏=状态栏+导航栏 ------------->
    <cover-view
      @blur="blurs"
      class="navbar"
      :style="{height: navBarHeight + 'px',backgroundColor:navBackgroundColor}"
      @click="backClick()"
    >
      <!-- 状态栏 -->
      <cover-view class="nav-statusbar" :style="{height: statusBarHeight + 'px'}"></cover-view>
      <!-- 标题栏 -->
      <cover-view class="nav-titlebar" :style="{height: titleBarHeight + 'px' }">
        <!-- home及后退键 -->
        <cover-view class="bar-options">
          <cover-view v-if="backVisible" class="opt opt-back" v-model="linkBack">
            <cover-image class="back-image" :src="imgsrc" v-model="linkKind"></cover-image>
          </cover-view>
          <!-- 返回home图标，不做使用 -->
          <!-- <cover-view class="line" v-if="backVisible && homePath"></cover-view> -->
          <!-- <cover-view v-if="homePath" class="opt opt-home" @click="homeClick()">
            <cover-image class="home-image" src></cover-image>
          </cover-view>-->
        </cover-view>
        <!-- 标题 -->
        <cover-view class="titleBar">
          <cover-view
            class="bar-title"
            :style="{color:titleColor,fontSize:fontSize+'px',lineHeight:titleBarHeight+'px',height: titleBarHeight + 'px'}"
          >{{title}}</cover-view>
          <!-- <cover-view
          class="bar-title"
          :style="{color:titleColor,fontSize:fontSize+'px',height: titleBarHeight + 'px'}"
          >{{title}}</cover-view>-->
        </cover-view>
      </cover-view>
    </cover-view>
  </div>
</template>

<script>
import { globalBus } from "@/components/globalBus";
export default {
  props: [
    "backVisible",
    "imgsrc",
    "title",
    "titleColor",
    "fontSize",
    "linkBack",
    "linkKind",
    "tabKind"
  ],
  data() {
    return {
      navBarHeight: "",
      statusBarHeight: "",
      platform: "",
      titleBarHeight: "",
      navBackgroundColor: "white",
      homePath: "",
      imgsrc: ""
    };
  },
  beforeMount() {
    const self = this;
    wx.getSystemInfo({
      success(system) {
        //console.log("system:", system);
        self.statusBarHeight = system.statusBarHeight;
        //console.log("statusBarHeight:", self.statusBarHeight);
        self.platform = system.platform;
        let platformReg = /ios/i;
        if (platformReg.test(system.platform)) {
          self.titleBarHeight = 44;
        } else {
          self.titleBarHeight = 48;
        }
        // console.log("platform:", self.platform);
        self.navBarHeight = self.statusBarHeight + self.titleBarHeight;
        //console.log("navBarHeight:", self.navBarHeight);
        globalBus.$emit("swiperTop", self.navBarHeight);
      }
    });
  },
  methods: {
    backClick() {
      if (this.linkKind) {
        if (this.tabKind) {
          wx.switchTab({
            url: this.linkBack
          });
        } else {
          wx.navigateTo({
            url: this.linkBack
          });
        }
      } else {
        let pages = getCurrentPages(); // 获取页面栈
        let currPage = pages[pages.length - 1]; // 当前页面
        let prevPage = ""; //上一页
        let preUrl = ""; //上一页的url
        let preKind = 0; //上一页的类型，1为普通页面，0为tab页
        let tabUrl = [
          "pages/index1/main",
          "pages/cart1/main",
          "pages/mine1/main"
        ]; //存储tabbar页，记得删掉pages前面的"/"
        if (pages.length > 1) {
          prevPage = pages[pages.length - 2];
          preUrl = prevPage.route;
          //console.log(preUrl);

          if (preUrl) {
            for (let i = 0; i < tabUrl.length; i++) {
              if (preUrl == tabUrl[i]) {
                preKind = 1;
              }
            }
          }
          if (!preKind) {
            // wx.navigateTo({
            //   url: "/"+preUrl
            // });
            wx.navigateBack({
              delta: 1
            });
          } else {
            //console.log(preUrl);
            wx.switchTab({
              // 必须加/
              url: "/" + preUrl
            });
          }
        }
      }
    },
    blurs() {
      window.scroll(0, 0);
    }
  }
};
</script>
<style scoped>
/*---------------  最外层div*/
/* .comp-navbar {
  background-color:rebeccapurple;
} */
/* 测试简单导航栏用 */
/* .placeholder-bar {
  background-color: red;
} */
* {
  padding-left: 0;
  padding-right: 0;
}
/*---------------  顶部状态栏*/
.nav-statusbar {
  width: 100%;
  background-color: white;
}
/*---------------  导航栏内容*/
.navbar {
  width: 100%;
  transform: none;
  position: fixed;
  top: 0;
  z-index: 999;
  /* background-color: white; */
}

/* 标题栏 */
.nav-titlebar {
  display: table;
  vertical-align: middle;
  width: 100%;
  /* background-color: blue; */
}

/*---------------  home及后退键最外层*/
.bar-options {
  display: table-cell;
  /* display: inline-block; */
  width: 36rpx;
  height: 100%;
  vertical-align: middle;
  text-align: center;
}
/* 后退键最外层 */
.opt-back {
  display: inline-block;
  width: 100%;
  height: 100%;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  padding: 0;
}
/* 返回按钮图片 */
.back-image {
  display: block;
  width: 15rpx;
  height: 30rpx;
  margin: 0 10rpx 0 20rpx;
}
/* .titleBar {
  height: 100%;
  display: block;

  background-color: red;
} */
/*---------------  标题*/
.bar-title {
  display: table-cell;
  line-height: 46px;
  /*按照单元格的样式显示元素*/
  vertical-align: bottom;
  /* vertical-align: middle; */
  /* display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center; */
}
</style>