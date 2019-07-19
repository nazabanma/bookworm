<template>
  <div :style="{background:'#f5f5f5'}">
    <!-- ==================================================      详情:书籍信息        ======================================================= -->
    <!-- 最外层view -->
    <view class="evaluationtList" v-for="(item,index) in commentList" :key="index">
      <!-- 单条评价 -->
      <view class="evaluationt">
        <view class="evaluationt_left">
          <image class="evaluationt_icon" :src="anonymousImg" />
        </view>
        <view class="evaluationt_right">
          <view class="evaluationt_head">
            <view class="evaluationt_name">{{item.name}}</view>
            <view class="evaluationt_time">{{item.time}}</view>
          </view>
          <view class="evaluationt_content">{{item.content}}</view>
          <view class="evaluationt_imgs">
            <image class="evaluationt_img" />
          </view>
          <view>
            <view class="likes_comment">
              <view class="eval_likes">
                <image class="likes_imgs" :src="likeImg[0]" />
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
        </view>
      </view>
      <view></view>
    </view>
  </div>
</template>

<script>
export default {
  props: ["commentList", "likeImg", "comImg", "anonymousImg"],
  data() {
    return {
      // evalIcon: this.GLOBAL.serverSrc + "/static/images/icon2.png",
    };
  },
  methods: {},

  created() {
    // let app = getApp()
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
  padding: 0 10px;
  flex: 7;
}
.comment_right {
  padding: 0 10px;
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
.evaluationt_imgs {
  margin-top: 0.2rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.evaluationt_img {
  flex-basis: 80px;
  height: 80px;
  background-color: red;
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
  margin-right: 0.3rem;
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
</style>
