<template>
  <div :style="{background:'#f5f5f5'}">
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
            <view class="evaluationt_name" v-if="item.if_anonymous">淘书斋用户</view>
            <view class="evaluationt_name" v-else>{{item.name}}</view>
            <view class="evaluationt_time">{{item.time}}</view>
          </view>
          <view class="evaluationt_content">{{item.content}}</view>
          <!-- 评价图片 -->
          <view class="evaluationt_imgsPanel">
            <view class="evaluationt_imgs" v-for="(i,k) in commentArr[index]" :key="k">
              <image class="evaluationt_imgs" :src="i" />
            </view>
          </view>
          <!-- 点赞、回复 -->
          <view :style="{marginTop:'0.1rem'}">
            <view class="likes_comment">
              <view class="eval_likes" @click="Likeadd(index)">
                <image class="likes_imgs" :src="likeIcon[index]" />
                {{item.like_count}}
              </view>
              <view class="eval_comment">
                <image class="comment_imgs" :src="comImg" />
                {{item.comment.length}}
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- 单条评价的评论列表 -->
      <view v-if="item.comment.length">
        <view class="comment" v-for="(i,k) in item.comment" :key="k">
          <!-- 单条评论 -->
          <view class="commentList">
            <view class="comment_left">
              <!-- <image class="comment_icon" :src="comIcon" /> -->
            </view>
            <view class="comment_right">
              <view class="comment_name">{{i.name}}</view>
              <view class="comment_time">{{i.time}}</view>
              <view class="comment_content">{{i.content}}</view>
            </view>
            <div v-if="addDelete(index,i)" class="delete" @click="deleteComment(index,k)" :data-index="k">删除</div>
          </view>
        </view>

        <!-- 进行评论 -->
        <!-- <view v-if="temporaryComment" class="commentList">
          <view class="comment_left"></view>
          <view class="comment_right">
            <view class="comment_name">{{temporaryComment.name}}</view>
            <view class="comment_time">{{temporaryComment.time}}</view>
            <view class="comment_content">{{temporaryComment.content}}</view>
          </view>
        </view>-->
      </view>
      <view class="evaluationt">
        <view class="evaluationt_left"></view>
        <view class="evaluationt_right">
          <input class="commentInput" @change="submitComment(index)" v-model="newComment.content" />
        </view>
      </view>
    </view>
  </div>
</template>

<script>
export default {
  // anonymousImg:匿名头像
  // commentList:获取到的数据
  // likeImg:点赞图标路径
  // comImg:评论图标路径
  props: [
    "commentList",
    "likeIcon",
    "likeImg",
    "comImg",
    "anonymousImg",
    "commentArr"
  ],
  data() {
    return {
      newComment: { name: "", time: "", content: "" }
      // likeType: 0,
      //likeIcon: []
      //evalIcon: this.GLOBAL.serverSrc + "/static/images/icon2.png",
    };
  },
  filters: {
    formatDate: function(value) {}
  },
  mounted() {
    console.log("this.GLOBAL.userId：" + this.GLOBAL.userId);
    // console.log("this.GLOBAL.userName：" + this.GLOBAL.userName);
  },
  methods: {
    //获取数据
    setData() {},
    //评论图片剪切成数组
    commentImg(commentList) {
      let Imgarry = commentList.data.data.book_img.split(";");
      _this.imgUrls = Imgarry;
    },
    //点赞
    Likeadd(i) {
      let _this = this;
      if (this.commentList[i].like_count <= 0) {
        this.commentList[i].like_count = +1;
        this.likeIcon[i] = this.likeImg[1];
        this.commentList[i].if_like = !this.commentList[i].if_like;
      } else {
        if (this.commentList[i].if_like) {
          this.commentList[i].like_count -= 1;
          this.likeIcon[i] = this.likeImg[0];
          this.commentList[i].if_like = !this.commentList[i].if_like;
        } else {
          this.commentList[i].like_count += 1;
          this.likeIcon[i] = this.likeImg[1];
          this.commentList[i].if_like = !this.commentList[i].if_like;
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
    //================================================   进行评论
    submitComment(i) {
      // 全局动态变量
      this.newComment.name = this.GLOBAL.globalData.userName;
      this.newComment.time = this.getTime();
      console.log(this.newComment.time);
      this.commentList[i].comment.push(this.newComment);

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
          _this.newComment = { name: "", time: "", content: "" };
          console.log(res.data);
        }
      });
    },
    //================================================   删除评论
    addDelete(index,i) {
      console.log(this.commentList[index].comment[i]);
      if (this.GLOBAL.globalData.userName == this.commentList[index].comment[i].name) {
        return true;
      }
      else{
         return false;
      }
    },
    deleteComment(index, i) {
      this.commentList[index].comment.splice(i, 1);
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
  margin-top: 6px;
  font-size: 12px;
  color: #36282b;
}
/* 评价输入框 */
.commentInput {
  display: block;
  /* width: 100%; */
  height: 0.3rem;
  margin: 0.3rem 0.5rem auto 0;
  padding: 0.15rem 0.25rem;
  background: #f5f5f5;
  color: #787172;
  font-size: 14px;
}
</style>
