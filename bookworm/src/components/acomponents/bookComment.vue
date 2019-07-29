<template>
  <div :style="{background:'#f5f5f5'}">
    <view v-if="!emptyFlag">
      <router-view v-if="isRouterAlive">
        <!-- ==================================================      详情:书籍信息        ======================================================= -->
        <!-- 最外层view -->
        <view class="evaluationtList" v-for="(item,index) in commentList" :key="index">
          <!-- 单条评价 -->
          <view class="evaluationt">
            <view class="evaluationt_left">
              <image class="evaluationt_icon" v-if="item.if_anonymous" :src="anonymousImg" />
              <image class="evaluationt_icon" v-else :src="item.head_img" />
            </view>
            <view class="evaluationt_right">
              <view class="evaluationt_head">
                <view class="evaluationt_head_left">
                  <view class="evaluationt_name" v-if="item.if_anonymous">淘书斋用户</view>
                  <view class="evaluationt_name" v-else>{{item.name}}</view>
                  <view class="evaluationt_time">{{item.time}}</view>
                </view>
                <view
                  class="deleteAll"
                  v-if="item.if_me"
                  @click="deleteAll(index,item.order_item_id)"
                >删除</view>
              </view>
              <view class="evaluationt_content">{{item.content}}</view>
              <!-- 评价图片 -->
              <view class="evaluationt_imgsPanel">
                <view class="evaluationt_imgs" v-for="(i,k) in commentArr[index]" :key="k">
                  <!-- <image class="evaluationt_imgs" :src="i" /> -->
                  <image
                    class="evaluationt_imgs"
                    :src="i"
                    @tap="previewImg"
                    :data-list="commentArr[index]"
                    :data-src="i"
                  />
                </view>
              </view>
              <!-------------------------------------- 点赞、回复 -------------------->
              <view :style="{marginTop:'0.1rem'}">
                <view class="likes_comment">
                  <view class="eval_likes" @click="Likeadd(index)">
                    <image class="likes_imgs" :src="likeIcon[index]" />
                    {{item.like_count}}
                  </view>
                  <!-- 点击控制回复的显示隐藏 -->
                  <view class="eval_comment" @click="CommentShow($key)">
                    <image class="comment_imgs" :src="comImg" />
                    {{item.comment.length}}
                  </view>
                </view>
              </view>
            </view>
          </view>
          <!-- 单条评价的评论列表 -->
          <view v-if="item.comment.length">
            <!-- <view v-if="ThiscommentShow"> -->
            <view v-show="$key!=hidFlag">
              <view class="comment" v-for="(i,k) in item.comment" :key="k">
                <!-- 单条评论 -->
                <view class="commentList">
                  <view class="comment_left">
                    <!-- <image class="comment_icon" :src="comIcon" /> -->
                  </view>
                  <view class="comment_right">
                    <view class="comment_name">{{i.name}}</view>
                    <view class="comment_time">{{i.time}}</view>
                    <view
                      class="delete"
                      v-if="i.if_me"
                      @click="deleteComment(index,k)"
                      :data-index="k"
                    >删除</view>
                    <view class="comment_content">{{i.content}}</view>
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view class="evaluationt">
            <view class="evaluationt_left"></view>
            <view class="evaluationt_right">
              <input class="commentInput" v-model="newInput[index]" />
              <view class="sendView">
                <img class="sendImg" src="/static/images/send.png" @click="submitComment(index)" />
              </view>
            </view>
          </view>
        </view>
      </router-view>
    </view>
    <view v-else class="emptyData">暂无评论</view>
  </div>
</template>

<script>
export default {
  // anonymousImg:匿名头像
  // commentList:获取到的数据
  // likeImg:点赞图标路径
  // comImg:评论图标路径
  props: [
    "emptyFlag",
    "commentList",
    "newInput",
    "likeIcon",
    "likeImg",
    "comImg",
    "anonymousImg",
    "commentArr",
    "deleArr",
    "commentShowList"
  ],
  provide() {
    return {
      reload: this.reload
    };
  },
  inject: ["reload"],
  data() {
    return {
      isRouterAlive: true, //刷新当前页
      newComment: { name: "", time: "", content: "", if_me: "" },
      newCommentContent: "",
      // newComment: { name: "", time: "", content: "", if_me: "" },
      ThiscommentShow: "",
      hidFlag: -1
      // likeType: 0,
      //likeIcon: []
      //evalIcon: this.GLOBAL.serverSrc + "/static/images/icon2.png",
    };
  },

  mounted() {
    console.log("this.GLOBAL.userId：" + this.GLOBAL.userId);
    //     menus = this.map(menu=>{
    //     menu.isShow = false;
    //         return menu;
    // })
  },
  methods: {
    //================================================   图片预览
    previewImg(event) {
      var src = event.currentTarget.dataset.src; //获取data-src
      var imgList = event.currentTarget.dataset.list; //获取data-list
      //图片预览
      wx.previewImage({
        current: src, // 当前显示图片的http链接
        urls: imgList // 需要预览的图片http链接列表
      });
    },

    //================================================   刷新当前页
    reload() {
      this.isRouterAlive = false;
      console.log("刷新");
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    //评论图片剪切成数组
    commentImg(commentList) {
      let Imgarry = commentList.data.data.book_img.split(";");
      _this.imgUrls = Imgarry;
    },
    //================  点赞
    Likeadd(i) {
      let _this = this;
      if (_this.commentList[i].like_count <= 0) {
        _this.commentList[i].like_count = +1;
        _this.likeIcon[i] = _this.likeImg[1];
        _this.commentList[i].if_like = !_this.commentList[i].if_like;
      } else {
        if (_this.commentList[i].if_like) {
          _this.commentList[i].like_count -= 1;
          _this.likeIcon[i] = _this.likeImg[0];
          _this.commentList[i].if_like = !_this.commentList[i].if_like;
        } else {
          _this.commentList[i].like_count += 1;
          _this.likeIcon[i] = _this.likeImg[1];
          _this.commentList[i].if_like = !_this.commentList[i].if_like;
        }
      }
      //点赞|取消点赞
      wx.request({
        url:
          _this.GLOBAL.serverSrc +
          "/evaluate/evaluateLike?evaluate_id=" +
          this.commentList[i].evaluate_id +
          "&user_id=" +
          _this.GLOBAL.userId,
        method: "POST",
        success(res) {
          console.log(res.data);
        }
      });
    },
    //================ 点击控制回复的显示隐藏
    CommentShow(index) {
      this.commentShowList[index] = !this.commentShowList[index];
      // this.ThiscommentShow = this.commentShowList[index];
      this.hidFlag = index;
      console.log(this.hidFlag);
      // console.log(index);
      console.log(this.commentShowList[index]);
      console.log("this.hidFlag" + this.hidFlag);
      // console.log(this.ThiscommentShow);
    },
    //================================================   进行评论
    submitComment(i) {
      // 全局动态变量
      this.newComment.name = this.GLOBAL.globalData.userName;
      this.newComment.time = this.getTime();
      this.newComment.if_me = true;
      this.newComment.content = this.newInput[i];
      // console.log(this.newComment.content);
      // console.log(this.commentList[i].comment);
      this.commentList[i].comment.push(this.newComment);
      //console.log(this.commentList[i].comment);
      //提交评论
      let _this = this;
      wx.request({
        url: _this.GLOBAL.serverSrc + "/evaluate/evaluate",
        data: {
          order_item_id: _this.commentList[i].order_item_id,
          user_id: _this.GLOBAL.userId,
          time: _this.newComment.time,
          content: _this.newComment.content
        },
        method: "POST",
        success(res) {
          console.log(res.data);
        }
      });
      //this.reload();
      this.newInput[i] = "";
      this.newComment = { name: "", time: "", content: "", if_me: "" };
    },
    //================================================   删除评论
    //================   添加删除按钮
    // addDelete(index, i) {
    //   console.log(this.GLOBAL.userId);
    //   console.log(this.commentList[index].comment[i].user_id);
    //   if (this.GLOBAL.userId == this.commentList[index].comment[i].user_id) {
    //    this.deleFlag[index][i] = 1;
    //   } else {
    //     console.log(0);
    //     this.deleFlag[index][i] = 0;
    //   }
    // },

    //================ 进行删除操作,删除所有评价
    deleteAll(index, data) {
      //进行删除
      console.log(this.commentList[index].order_item_id);
      let _this = this;
      wx.showModal({
        content: "是否删除",
        showCancel: true,
        cancelText: "取消",
        cancelColor: "#787172",
        confirmText: "删除",
        confirmColor: "#bc2b37",
        success(res) {
          if (res.confirm) {
            wx.request({
              url:
                _this.GLOBAL.serverSrc +
                "/evaluate/evaluateDeleteAll?order_item_id=" +
                _this.commentList[index].order_item_id,
              data: {
                order_item_id: _this.commentList[index].order_item_id
              },
              method: "POST",
              success(res) {
                console.log(res.data);
              }
            });
            _this.commentList.splice(index, 1);
            _this.reload();
          } else if (res.cancel) {
            // console.log("用户点击取消");
          }
        }
      });
    },
    //================ 进行删除操作,index:平价下标，i:回复下标
    deleteComment(index, i) {
      //进行删除
      let _this = this;
      wx.request({
        url:
          _this.GLOBAL.serverSrc +
          "/evaluate/evaluateDelete?evaluate_id=" +
          _this.commentList[index].comment[i].evaluate_id,
        data: {
          evaluate_id: _this.commentList[index].comment[i].evaluate_id
        },
        method: "POST",
        success(res) {
          //console.log(res.data);
          wx.showToast({
            title: "删除成功",
            duration: 800
          });
          _this.commentList[index].comment.splice(i, 1);
        }
      });
    },
    getTime() {
      let date = new Date();
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    }
  }
};
</script>

<style scoped>
.emptyData {
  display: block;
  width: 100%;
  height: 4rem;
  line-height: 4rem;
  background-color: white;
  text-align: center;
  font-size: 14px;
  color: #36282b;
  /* padding-top: 0.3rem; */
}
/*-----------------  评价 */
.evaluationtList {
  background-color: white;
  padding: 0.36rem 0;
}
.evaluationt {
  display: flex;
}
.evaluationt_left,
.comment_left {
  text-align: center;
  flex: 1;
}
.evaluationt_right {
  padding: 0 20px auto 10px;
  flex: 7;
}
.comment_right {
  padding: 0 20px auto 10px;
  flex: 7;
}
.evaluationt_icon {
  margin: 0 auto;
  display: block;
  width: 25px;
  height: 25px;
  border-radius: 13px;
}

.evaluationt_head {
  color: #36282b;
  vertical-align: middle;
}
.evaluationt_head_left {
  display: inline-block;
  width: 85%;
}
/*-----------------  删除 */
.deleteAll {
  display: inline-block;
  /* width: 2.5em; */
  top: 2px;
  right: 0rem;
  /* margin-left: 1.5rem; */
  font-size: 12px;
}
.evaluationt_name {
  display: inline;
  margin-right: 0.4rem;
  font-size: 16px;
}
.evaluationt_time {
  display: inline;
  font-size: 11px;
}
.evaluationt_content {
  margin-top: 0.1rem;
  margin-right: 0.5rem;
  font-size: 14px;
  color: #36282b;
}
/*-----------------  评价图片 */
.evaluationt_imgsPanel {
  width: 100%;
  margin-top: 0.2rem;
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
  /* justify-content: space-between; */
  flex-wrap: nowrap;
}
.evaluationt_imgs {
  display: inline-block;
  flex: 1;
  width: 80px;
  max-width: 100px;
  height: 80px;
  /* background-color: #f5f5f5; */
  text-align: center;
  /* background-color: red; */
}
.evaluationt_img {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.likes_comment {
  display: block;
  width: 100%;
  text-align: right;
  font-size: 14px;
  color: #787172;
}
.eval_likes,
.eval_comment {
  display: inline;
  margin-right: 0.5rem;
}
.likes_imgs,
.comment_imgs {
  width: 14px;
  height: 13px;
}
/*-----------------  评论 */
.commentList {
  margin-top: 0.1rem;
  display: flex;
  color: #787172;
}

.comment_icon {
  margin: 0 auto;
  display: block;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 0.2rem;
  background-color: #787172;
}
.comment_name {
  display: inline-block;
  font-size: 12px;
}
.comment_time {
  display: inline-block;
  margin-top: 4px;
  margin-left: 0.2rem;
  font-size: 10px;
}
.comment_content {
  /* display: block; */
  max-width: 100%;
  margin-top: 6px;
  padding: 0;
  margin-right: 0.5rem;
  font-size: 12px;
  color: #36282b;
  /* 首行缩进两字符 */
  /* text-indent: 2em; */
  /* 强制换行 */
  word-wrap: break-word;
  word-break: break-all;
  /* 控制三行显示 */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
/* 评价输入框 */
.commentInput {
  display: block;
  /* width: 100%; */
  height: 0.3rem;
  margin: 0.3rem 0.5rem auto 0;
  padding: 0.15rem 0.6rem 0.15rem 0.25rem;
  background: #f5f5f5;
  color: #787172;
  font-size: 14px;
}
.sendView {
  width: 0.35rem;
  height: 0.6rem;
  position: absolute;
  right: 0.7rem;
  margin-top: -0.5rem;
  text-align: center;
}

.sendImg {
  width: 0.4rem;
  height: 0.32rem;
  display: inline-block;
}
/*-----------------  删除 */

.delete {
  display: inline-block;
  width: 3em;
  margin-left: 2.5rem;
  font-size: 12px;
}
</style>
