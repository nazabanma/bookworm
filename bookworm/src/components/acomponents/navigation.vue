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
          <cover-view v-if="backVisible" class="opt opt-back" @click="backClick()">
            <cover-image class="back-image" :src="imgsrc"></cover-image>
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
  props: ["backVisible", "imgsrc", "title", "fontSize"],
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
}
/* 后退键最外层 */
.opt-back {
  display: inline-block;
  width: 100%;
  height: 100%;
  /* background-color: red; */
  vertical-align: middle;
}
/* 返回按钮图片 */
.back-image {
  display: inline-block;
  width: 100%;
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