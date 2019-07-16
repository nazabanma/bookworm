<template>
  <div class="comp-navbar">
    <!-- 占位栏 -->
    <!-- <cover-view class="placeholder-bar" :style="{height: navBarHeight + 'px'}"></cover-view> -->
    <!--------------- 自定义导航栏=状态栏+导航栏 ------------->
    <cover-view
      class="navbar"
      :style="{height: navBarHeight + 'px',backgroundColor:navBackgroundColor}"
    >
      <!-- 状态栏 -->
      <cover-view class="nav-statusbar" :style="{height: statusBarHeight + 'px'}"></cover-view>
      <!-- 标题栏 -->
      <cover-view class="nav-titlebar" :style="{height: titleBarHeight + 'px' }">
        <!-- home及后退键 -->
        <cover-view class="bar-options">
          <cover-view v-if="backVisible" class="opt opt-back" v-model="linkBack">
            <cover-image class="back-image" :src="imgsrc" @click="backClick()" v-model="linkKind"></cover-image>
          </cover-view>
          <!-- 返回home图标，不做使用 -->
          <!-- <cover-view class="line" v-if="backVisible && homePath"></cover-view> -->
          <!-- <cover-view v-if="homePath" class="opt opt-home" @click="homeClick()">
            <cover-image class="home-image" src></cover-image>
          </cover-view>-->
        </cover-view>
        <!-- 标题 -->
        <cover-view class="bar-title" :style="{color:titleColor,fontSize:fontSize+'px'}">{{title}}</cover-view>
      </cover-view>
    </cover-view>
  </div>
</template>

<script>
export default {
  props: ["backVisible", "imgsrc", "title", "fontSize", "linkBack","linkKind"],
  data() {
    return {
      navBarHeight: "",
      statusBarHeight: "",
      platform: "",
      titleBarHeight: "",
      navBackgroundColor: "white",
      homePath: "",
      titleColor: "#333333",
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
      }
    });
  },
  methods: {
    backClick() {
      // let pages = getCurrentPages(); // 获取页面栈
      // let currPage = pages[pages.length - 1]; // 当前页面
      // let prevPage = pages[pages.length - 2];
      // if (pages.length > 1) {
      //   prevPage = pages[pages.length - 2];
      // }
      // console.log("数组" + pages + "当前" + currPage + "上一页" + prevPage);
      if (this.linkKind) {
        wx.navigateTo({
          url: this.linkBack
        });
      } else {
        wx.switchTab({
          url: this.linkBack
        });
      }
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
  background-color: white;
}
/*---------------  导航栏内容*/
.navbar {
  background-color: white;
}

/* 标题栏 */
.nav-titlebar {
  display: table;
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
  /* display: table-cell;
  vertical-align: middle;
  text-align: center; */
}
/* 返回按钮图片 */
.back-image {
  display: inline-block;
  width: 30rpx;
  height: 30rpx;
  margin-left: 3rpx;
  vertical-align: middle;
}

/*---------------  标题*/
.bar-title {
  height: 100%;
  /* background-color: greenyellow; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10rpx;
  font-size: 36rpx;
}
</style>