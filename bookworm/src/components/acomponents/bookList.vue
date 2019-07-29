<template>
  <!-- :style="{width:imagewidth+'rem',height:imageheight+'rem'}" -->
  <div class="index1">
    <!-- ==================================================     组件：首页的书籍展示     ======================================================= -->
    <view class="bookListPanel" v-for="(items,index) in bookshowList" :key="index">
      <view class="bookList" v-for="(item,k) in items" :key="k">
        <view class="bookCard" @click="linkTo(item.book_id)">
          <!-- <view
          ref="card"
          @click="linkTo(item.book_id)"
          class="bookCard"
          :style="{width:cardWidth+'px',height:cardHeight+'rpx',top:cardTop+'rpx',left:cardLeft+'rpx'}"
          >-->
          <!-- <image mode="widthFix" class="bookImg" :src="this.GLOBAL.imgCutApart(item.book_img)" /> -->
          <image mode="widthFix" class="bookImg" :src="item.book_cover" />
          <view class="bookDescribe">
            <view class="bookName">
              <span>《{{item.book_name}}》</span>
            </view>
            <view class="bookAuthor">
              <span>——&nbsp;{{item.book_author}}&nbsp;——</span>
            </view>
            <block>
              <span class="bookPrice">&yen;{{item.book_price}}</span>
              <span v-if="item.oriPrice" class="delPrice">&yen;{{item.book_oriPrice}}</span>
            </block>
          </view>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
import { globalBus } from "@/components/globalBus";

// import global_ from "@/components/Global"; //引用文件
// Vue.prototype.GLOBAL = global_; //挂载到Vue实例上面
export default {
  props: ["bookList", ""],
  data() {
    return {
      bookshowList: [],
      cardWidth: "",
      cardNum: 2,
      gap: 10,
      cardTop: "",
      cardLeft: "",
      cardHeight: ""
    };
  },
  mounted() {
    this.cutApart(10); //对数据进行分割，这里是4个为一组
    this.waterfall(this.bookshowList); //瀑布流布局
    // for (let i = 0; i < this.bookshowList.length; i++) {
    //   this.bookshowList[i].book_img = this.GLOBAL.imgCutApart(
    //     this.bookshowList[i].book_img
    //   );
    // }
  },
  watch: {
    bookList: {
      handler: function(newVal, oldVal) {
        this.bookshowList = [];
        this.cutApart(10); //对数据进行分割，这里是4个为一组
        //this.waterfall(this.bookshowList); //瀑布流布局
      }
    }
  },

  methods: {
    //------------------------------------------------  跳转到商品详情页面,传值
    linkTo(bookID) {
      wx.navigateTo({
        url: "/pages/bookdetail1/main"
      });
      globalBus.$emit("bookID", bookID);
    },
    //------------------------------------------------  数据分组
    cutApart(num) {
      if (!this.bookList) {
        console.log("没有获取到数据");
        return;
      }
      let length = this.bookList.length;
      if (length < 1) {
        console.log("预处理失败");
        return;
      }
      // 数组分割
      for (let i = 0; i < length; i += num) {
        this.bookshowList.push(this.bookList.slice(i, i + num));
        // console.log(this.cardHeight);
        console.log(this.bookshowList[i]);
      }
    },
    //------------------------------------------------ 瀑布流
    waterfall(bookshowList) {
      // 获取屏幕宽度，设置大小
      // const self = this;
      // wx.getSystemInfo({
      //   success(system) {
      //     //console.log("system:", system);
      //     self.cardWidth = (system.screenWidth - 35) / self.cardNum;
      //     console.log(self.cardWidth);
      //   }
      // });
      // let arr = []; //存放各个卡片的高度
      // const colums = this.cardNum; //1、确定列数，原则上是页面的宽度/图片的宽度。这里小程序，为了适配机型，数量写死
      // for (let i = 0; i < bookshowList.length; i++) {
      //   if (i < colums) {
      //     //2、确定第一行
      //     this.top = 0;
      //     this.left = (this.cardWidth + this.gap) * i + "rpx";
      //     // arr.push(items[i].offsetHeight);
      //   }
      // }
      // this.$nextTick(function() {//获取dom元素
      //   const bookshow = this.$refs.card;
      //   console.log(this.$refs.card[i]);
      //   // https://www.cnblogs.com/liuxy0551/p/9389111.html
      // });
    }
  },
  onLoad: function(e) {},
  created(e) {}
};
</script>
<style scoped>
.index1 {
  display: block;
  top: 0px;
  margin: 0;
  position: relative;
  width: 100%;
  padding: 0;
  background-color: #f5f5f5;
  min-height: -moz-calc(100vh);
  /*chrome safari*/
  min-height: -webkit-calc(100vh);
  /*Standard */
  min-height: calc(100vh);
}
/* 最外层放瀑布流的地方 */
.bookListPanel {
  display: block;
  /* width: 100%; */
  /* max-width: 100vw;
  max-width: -moz-calc(100vw);
  max-width: -webkit-calc(100vw);
  max-width: calc(100vw); */
  margin: 0;
  padding: 20rpx;
  /* position: relative; */
  /* css假瀑布流 */
  /* -moz-column-count: 2; 
  -webkit-column-count: 2; 
  column-count: 2;
  -moz-column-gap: 20rpx;
  -webkit-column-gap: 20rpx;
  column-gap: 20rpx; */
  /* width: 100%; */
  /* padding: 0.2rem 0; */
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
.bookList {
  display: inline-block;
  /* border: 1px solid red; */
  position: relative;
  flex: 1;
  flex-basis: 330rpx;
  width: 340rpx;
  max-width: 340rpx;
}
/* 书籍卡片 */
.bookCard {
  display: inline-block;
  width: 330rpx;
  max-width: 340rpx;
  background-color: white;
  /* border: 1px solid blue; */
  text-align: center;
  margin-top: 12rpx;
  margin-bottom: 10rpx;

  /* -moz-page-break-inside: avoid; */
  /* -webkit-column-break-inside: avoid;
  break-inside: avoid; */
  /* position: absolute; */
  /* margin-right: 10rpx; */
}
/*-----------------  插入的图片 */
.bookImg {
  display: block;
  /* width: 80%; */
  width: 272rpx;
  height: 272rpx;
  min-width: 272rpx;
  max-width: 272rpx;
<<<<<<< HEAD
  min-height: 272rpx;
=======
>>>>>>> 1eda815ab7bedfb55b4e0b845964db1eb0834c2e
  max-height: 272rpx;
  margin: 10% auto;
}
/*-----------------  书籍文字信息 */
.bookDescribe {
  display: block;
  position: relative;
  margin: 0.1rem auto;
}
/* 书名 */
.bookName {
  font-size: 12px;
  color: #521d23;
}
/* 作者 */
.bookAuthor {
  margin-top: 0.12rem;
  font-size: 10px;
  color: #36282b;
}
/* 价格 */
.bookPrice {
  font-size: 12px;
  color: #bc2b37;
}
/* 原价 */
.delPrice {
  font-size: 12px;
  color: #787172;
  margin-left: 0.2rem;
  text-decoration: line-through;
  /* 文字划掉效果 */
}
</style>