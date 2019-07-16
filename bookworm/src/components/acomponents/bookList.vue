<style scoped>
.bookListPanel {
  margin: 0;
  padding: 0;
  position: relative;
}
.bookCard {
  display: block;
  width: 3.5rem;
  /* height: auto; */
  border: 1px solid aqua;
  background-color: white;
  text-align: center;
  /* position: absolute; */
}
.bookImg {
  display: block;
  width: 3rem;
  margin: 0.3rem auto;
  /* height: auto; */
}
.bookName {
  font-size: 12px;
  color: #333333;
}
.bookAuthor {
  margin-top: 0.12rem;
  font-size: 10px;
  color: #666666;
}
.bookPrice {
  font-size: 12px;
  color: #f27070;
}
.delPrice {
  font-size: 12px;
  color: #999999;
  margin-left: 0.2rem;
  text-decoration: line-through;
  /* 文字划掉效果 */
}
</style>
<template>
  <div class="bookListPanel">
    <view class="bookList" v-for="(item,index) in bookList" :key="index">
      <view class="bookCard">
        <img class="bookImg" :src="item.img" />
        <view class="bookName">
          <span>《{{item.title}}》</span>
        </view>
        <view class="bookAuthor">
          <span>——{{item.detail}}——</span>
        </view>
        <block>
          <span class="bookPrice">￥{{item.price}}</span>
          <span v-if="item.oriPrice" class="delPrice">￥{{item.oriPrice}}</span>
        </block>
      </view>
      <!-- <view></view>
      <view></view>
      <view></view>
      <view></view>-->
    </view>
  </div>
</template>

<script>
export default {
  props: ["bookList"],
  data() {
    return {
      bookList: [
        {
          book_id: "1",
          title: "好书",
          price: "100.00",
          oriPrice: "46.00",
          detail: "很好看的书",
          img: "/static/images/书1@3x.png",
          book_type_id: "1",
          shop_id: null
        },
        {
          book_id: "2",
          title: "很好的书",
          price: "200.00",
          detail: "非常好的书",
          img: "/static/images/书2@3x.png",
          book_type_id: "2",
          shop_id: null
        },
        {
          book_id: "3",
          title: "非常好的书",
          price: "3000.00",
          detail: "非常棒的书",
          img: "/static/images/书3@3x.png",
          book_type_id: "66",
          shop_id: null
        },
        {
          book_id: "4",
          title: "超厉害的书",
          price: "10000.00",
          detail: "很牛逼",
          img: "/static/images/书4@3x.png",
          book_type_id: "66",
          shop_id: null
        },
        {
          book_id: "5",
          title: "好书",
          price: "100.00",
          detail: "很好看的书",
          img: "/static/images/书5@3x.png",
          book_type_id: "1",
          shop_id: null
        },
        {
          book_id: "6",
          title: "很好的书",
          price: "200.00",
          detail: "非常好的书",
          img: "/static/images/书6@3x.png",
          book_type_id: "2",
          shop_id: null
        },
        {
          book_id: "7",
          title: "非常好的书",
          price: "3000.00",
          detail: "非常棒的书",
          img: "/static/images/书7@3x.png",
          book_type_id: "66",
          shop_id: null
        }
      ]
    };
  },
  mounted() {},
  methods: {}
};
</script>