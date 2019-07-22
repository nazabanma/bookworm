<template>
  <div class="index">
    <!-- fontSize：标题字体大小；backVisible:是否显示返回上一页按钮；linkBack:返回上一页的地址；linkKind：上一页的类型，1为普通页面，0为tab页 -->
    <navigation-bar
      :title="'商品详情'"
      :backVisible="true"
      :fontSize="16"
      :imgsrc="'/static/images/left.png'"
      :linkBack="'/pages/index1/main'"
      :linkKind="false"
    ></navigation-bar>

    <!-- 轮播页 -->
    <swiper-bar
      :imgUrls="imgUrls"
      :swiperHeight="swiperHeight"
      :showNow="true"
      :swiperTop="swiperTop"
    ></swiper-bar>

    <!-- 显示的书籍信息 -->
    <view class="bookShow_detail">
      <view class="bookDescribe">{{bookData.book_detail}}</view>
      <view class="bookShow_price_name">
        <view class="bookPrice">￥{{bookData.book_price}}</view>
        <view class="bookName">—《{{bookData.book_name}}》—</view>
      </view>
    </view>

    <!-- 切换按钮 -->
    <view class="linkTabs">
      <a class="tabA" :class="{ 'active': linkType }" @click="Link">详情</a>
      <a class="tabA" :class="{ 'active': !linkType }" @click="Link">评价</a>
    </view>

    <!-- <view></view> -->
    <!-- <book-detail :formAddress="bookData." :saleMonth="bookData." ></book-detail> -->
    <!-- 详情 -->
    <book-detail v-if="linkType"></book-detail>

    <!-- 评论 -->
    <book-comment
      v-else
      :commentList="commentData"
      :likeIcon="likeIconData"
      :commentArr="commentImgs"
      :likeImg="likeImg"
      :comImg="comImg"
      :anonymousImg="anonymousImg"
      :deleArr="deleArr"
      :commentShowList="commentShowList"
      :newInput="commentInput"
    ></book-comment>

    <!-- 底部按钮 -->
    <!-- 补空位 -->
    <view class="empty"></view>
    <bottom-tabbar :collectType="ifCollect" :bookId="bookId"></bottom-tabbar>
  </div>
</template>

<script>
import { globalBus } from "@/components/globalBus";
import navigationBar from "@/components/acomponents/navigation";
import swiperBar from "@/components/acomponents/swiperBar";
import bookDetail from "@/components/acomponents/bookDetail";
import bookComment from "@/components/acomponents/bookComment";
import bottomTabbar from "@/components/acomponents/bottomTabbar";
export default {
  data() {
    return {
      naviImgsrc: "/static/images/left.png",
      bookId: "",
      swiperHeight: "",
      swiperTop: "",
      imgUrls: [], //商品详情轮播图片
      bookData: [], //书籍基本信息
      ifCollect: "", //标识书籍是否收藏
      linkType: false, //tab页类型，true为详情，false为评价
      commentData: [], //存放获取到的评价信息
      commentInput: [], //存放没条评价的输入框值
      commentImgs: [], //存放评价图片
      likeIconData: [], //存放评价点赞图标,
      deleArr: [], //标识是否删除
      commentShowList: [], //标识是否显示回复
      likeImg: ["/static/images/good.png", "/static/images/good2.png"],
      comImg: "/static/images/commons.png",
      anonymousImg: this.GLOBAL.serverSrc + "/static/images/icon2.png"
    };
  },
  components: {
    navigationBar,
    swiperBar,
    bookDetail,
    bookComment,
    bottomTabbar
  },

  mounted() {
    // globalBus.$on("bookID", bookID => {
    //   this.bookId = bookID;
    //   console.log("显示情况" + this.bookId);
    // });
    this.getSrceenWidth();
    this.getData();
    //获取隔壁组件传来的id
  },
  created() {
    globalBus.$on("bookID", bookID => {
      this.bookId = bookID;
      console.log("显示情况" + this.bookId);
    });
    this.getSwiperTop();
  },
  methods: {
    //-----------------------------------------------------   评论
    Link() {
      let _this = this;
      wx.navigateTo({
        url: "/pages/bookcomment1/main"
      });
    },
    //-----------------------------------------------------   获取当前屏幕的宽度，作为轮播图片的高度
    getSrceenWidth() {
      const _this = this;
      wx.getSystemInfo({
        success(system) {
          _this.swiperHeight = system.windowWidth;
          console.log(system);
        }
      });
    },
    //-----------------------------------------------------   获取navigation的高度，作为轮播图片的margin-top
    getSwiperTop() {
      globalBus.$on("swiperTop", getswiperTop => {
        this.swiperTop = getswiperTop;
        //console.log("距离顶部" + this.swiperTop);
      });
    },

    //-----------------------------------------------------   获取数据
    getData() {
      let _this = this;
      //=========================================================    获取书籍信息
      wx.request({
        url: _this.GLOBAL.serverSrc + "/book/bookDetail",
        method: "POST",
        data: { user_id: _this.GLOBAL.userId, book_id: _this.bookId },
        success(res) {
          _this.bookData = res.data.data;
          let Imgarry = res.data.data.book_img.split(";");
          _this.imgUrls = Imgarry;
          _this.ifCollect = res.data.data.ifCollect;
          console.log(_this.ifCollect);
        }
      });

      //=========================================================    获取评论数据
      wx.request({
        url:
          _this.GLOBAL.serverSrc +
          "/evaluate/evaluateList?book_id=" +
          _this.bookId +
          "&user_id=" +
          _this.GLOBAL.userId,
        method: "POST",
        success(res) {
          _this.commentData = res.data.data;
          _this.commentShow;
          // console.log(res.data.data);
          for (let i = 0; i < res.data.data.length; i++) {
            let Imgarry = res.data.data[i].img.split(";");
            _this.commentImgs.push(Imgarry);
            Imgarry = "";

            _this.commentShowList.push(0);
            _this.commentInput.push("");
            // console.log(_this.commentShowList[i]);

            // console.log(_this.commentImgs);
            if (res.data.data[i].if_like) {
              _this.likeIconData[i] = _this.likeImg[1];
            } else {
              _this.likeIconData[i] = _this.likeImg[0];
            }
          }
        }
      });
    },
    Link() {
      this.linkType = !this.linkType;
    }
  }
};
</script>

<style scoped>
.index {
  background-color: #f5f5f5;
}
/* --------------------------------------------
    选择tabbar
--------------------------------------------- */
.linkTabs {
  width: 100%;
  padding: 0.2rem 0 0.15rem;
  display: flex;
  justify-content: space-evenly;
}
.tabA {
  display: inline-block;
  /* flex: 1; */
  flex-grow: 1;
  flex-basis: 0.8rem;
  max-width: 0.88rem;
  font-size: 15px;
  text-align: center;
  vertical-align: middle;
  color: #36282b;
}
/* 选中之后的样式 */
/* .tabA:after, */
.tabA:visited:after,
.tabA:hover:after,
.tabA:active:after,
.tabA.active:after {
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
/* --------------------------------------------
    书籍详情
--------------------------------------------- */

.bookShow_detail {
  padding: 0.3rem 0.4rem;
  background-color: white;
  font-size: 10px;
  word-spacing: 0.08rem;
  border-bottom: 1px solid rgba(204, 204, 204, 0.8);
}

.showItem {
  margin-top: 0.3rem;
}
.showItem:first-child {
  margin-top: 0;
}

.showItem.index {
  display: flex;
}
.title {
  color: #b9abaa;
}
.showItem.index .title {
  display: inline-block;
  text-align: center;
  flex: 1;
}
/* 第一行后的竖线 */
.showItem.index .title::before {
  position: relative;
  display: inline-block;
  content: "";
  width: 2rpx;
  margin: 0 auto;
  height: 80%;
  top: 10%;
  bottom: 0;
  right: 0.5rem;
  background: #b9abaa;
  border-radius: 2rpx;
}
.showItem.index .title:first-child {
  text-align: left;
  border-left: none;
}
.showItem.index .title:first-child::before {
  display: none;
}
.title span {
  color: #787172;
}
/* --------------------------------------------
    最上面的书籍详情
--------------------------------------------- */
.bookShow_detail {
  display: block;
  padding: 0.3rem 0.36rem;
  color: #36282b;
  text-align: center;
}
.bookDescribe {
  text-indent: 2em;
  word-wrap: wrap;
  margin: 0 0.4rem;
  font-size: 10px;
  line-height: 2em;
  text-align: left;
}
.bookShow_price_name {
  margin-top: 0.25rem;
  display: block;
  width: 100%;
}
.bookPrice {
  display: block;
  position: absolute;
  color: #bc2b37;
  margin-top: 0;
  margin-left: 0;
  font-size: 15px;
}
.bookName {
  display: inline-block;
  font-size: 15px;
}
/* --------------------------------------------
    书籍详情
--------------------------------------------- */
.detailImg {
  margin-top: 0.3rem;
  text-align: center;
  position: relative;
  width: 100%;
  background-color: white;
}
.detailImg image {
  width: 100%;
  display: block;
}
.empty {
  height: 1.4rem;
  display: block;
  width: 100%;
  position: relative;
  background: #f5f5f5;
}
</style>
