<template>
  <div class="container">
    <!-- <view class="list" v-for="(items,index) in bookList" :key="index">

      <checkbox></checkbox>

      <view class="middle">
        <img :src="items.book_img" alt="">
        <view class="text">
          <p class="name">
            《{{items.book_name}}》
          </p>
          <p class="author">
            {{item.book_author}}
          </p>
          <p class="price">￥ {{items.book_price}}</p>
        </view>
      </view>

      <view class="right">
        <view class="count">
          <view @click="sub" :class="(islight ? 'light' : '') + ' sub'">-</view>
    <view class="num">{{items.count}}</view>-->
    <!--  -->
    <!-- <view class="add" @click="add">+</view>
        </view>
    </view>-->
    <view class="list">
      <checkbox></checkbox>
      <view class="middle">
        <img :src="book_img" alt />
        <view class="text">
          <p class="name">《items.book_name》</p>
          <p class="author">item.book_author</p>
          <p class="price">￥ items.book_price</p>
        </view>
      </view>
      <view class="right">
        <view class="count">
          <view @click="sub" :class="(islight ? 'light' : '') + ' sub'">-</view>
          <view class="num">1</view>
          <view class="add" @click="add">+</view>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
import checkbox from "@/components/lycomponents/checkbox";
// import count from "@/components/lycomponents/count";

export default {
  props: ["bookList"],
  components: {
    checkbox
    // count
  },

  data() {
    return {
      bookList: [],
      books: {
        name: "",
        author: "",
        price: "",
        count: ""
      },

      count1: 1, //商品件数
      islight: true
    };
  },

  /*-----------------------------------------------------计数器     始-----*/
  created() {
    if (this.count > 0) {
      let count1 = this.count;
    }
    this.islight = this.lightFunc();
  },

  methods: {
    // 减少数量
    sub: function() {
      if (count1 < 2) {
        return count1--;
      }
      this.islight = this.lightFunc();
    },
    // 增加数量
    add: function() {
      return count1++;
      this.islight = this.lightFunc();
    },
    lightFunc() {
      if (count1 < 2) {
        return true;
      } else {
        return false;
      }
    }
  }
  /*-----------------------------------------------------计数器     终-----*/
};
</script>

<style scoped>
.container {
  top: 0px;
  margin: 0;
  position: relative;
  width: 100%;
  padding: 0.9rem 0 0;
  background-color: #f5f5f5;
}

.list {
  display: inline-block;
  width: 700rpx;
  margin-left: 25rpx;
  margin-right: 25rpx;
  background-color: #fff;
  height: 250rpx;
  border-radius: 15rpx;
}

checkbox {
  position: relative;
  float: left;
  top: 108rpx;
  margin-left: 15rpx;
}

.middle {
  position: relative;
  float: left;
  width: 500rpx;
  height: 250rpx;
  margin-left: 60rpx;
  margin-right: 180rpx;
}

.middle img {
  float: left;
  margin-top: 25rpx;
  width: 200rpx;
  height: 200rpx;
  /* background: rgb(228, 148, 148); */
}

.text {
  float: left;
  width: 280rpx;
  height: 200rpx;
  margin-left: 20rpx;
  margin-top: 35rpx;
}

.name {
  font-size: 28rpx;
  color: #36282b;
}

.author {
  font-size: 20rpx;
  color: #797273;
  margin-top: 10rpx;
}

.price {
  font-size: 28rpx;
  color: #bc2b37;
  margin-top: 85rpx;
  /* margin-top: 120rpx;   书名没有出来时的 顶部位置*/
}

.right {
  float: none;
  width: 140rpx;
  height: 250rpx;
  /* top: 0rpx; */
  margin-left: 560rpx;
  /* background: #9b8f8f; */
}

.count {
  position: relative;
  float: left;
  color: #36282b;
  font-size: 35rpx;
  text-align: center;
  width: 140rpx;
  min-height: 40rpx;
  margin-top: -62rpx;
  background: rgb(228, 148, 148);
}

.sub {
  float: left;
  width: 40rpx;
  margin-top: 0rpx;
  font-weight: bold;
}

.num {
  float: left;
  width: 60rpx;
  margin-top: 0rpx;
}

.add {
  float: left;
  width: 40rpx;
  font-weight: bold;
  margin-top: 0rpx;
}
</style>