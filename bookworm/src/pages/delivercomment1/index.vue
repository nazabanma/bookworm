<template>
  <div class="index1">
    <!------------------------------------------------------ 顶部导航栏 -->
    <navigation-bar
      :title="'发表评价'"
      :backVisible="true"
      :fontSize="16"
      :imgsrc="'/static/images/left.png'"
    ></navigation-bar>
    <!-- :linkBack="'/pages/myorder3/main'"
    :linkKind="false"-->
    <view class="commentPanel">
      <view class="commentList" v-for="(i,k) in evaluate_list" :key="k">
        <p class="bookname">《{{i.bookname}}》</p>
        <span class="tips">宝贝满足你的期待吗？说说它的优点和美中不足的地方吧</span>
        <textarea class="commentText" v-model="i.content"></textarea>
        <view class="picture_list">
          <view class="picture_item" v-for="(item,index) in img_list[k]" :key="index">
            <image
              class="picture"
              mode="aspectFill"
              :src="item"
              :data-index="index"
              :data-src="item"
              :data-list="img_list[k]"
              @tap="previewImg"
            />
            <image />
            <text
              class="del"
              @tap="deleteImg($event,k)"
              :data-src="item"
              :data-list="img_list[k]"
              :data-index="index"
            >&times;</text>
          </view>
          <view class="picture_item">
            <view class="add-image" @tap="upLoadImg(k)">
              <text>+</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="checkView">
      <view class="check_area" @click="pickThis">
        <view class="circle" :class="{' active':pickFlag}"></view>
      </view>
      <view class="check_lable">匿名评价</view>
    </view>
    <view class="empty"></view>
    <button @tap="submit" class="submit">发布</button>
  </div>
</template>

<script>
import navigationBar from "@/components/acomponents/navigation";
export default {
  data() {
    return {
      naviImgsrc: "/static/images/left.png",
      list: "",
      img_list: [], //存放图片路径集合
      imgString: "", //图片url字符串（字符串由图片url拼接，用分号连接）
      pickFlag: false,
      // evaluate_list: [
      //   {
      //     bookname: "很好的书",
      //     order_item_id: 1,
      //     content: "",
      //     img: ""
      //   },
      //   {
      //     bookname: "朝花夕拾",
      //     order_item_id: 2,
      //     content: "",
      //     img: ""
      //   },
      //   {
      //     bookname: "四世同堂",
      //     order_item_id: 3,
      //     content: "",
      //     img: ""
      //   }
      // ]
      evaluate_list: []
    };
  },
  components: {
    navigationBar
  },
  //初始化图片数组长度和评价的长度一致
  mounted() {
    // console.log(this.GLOBAL.globalConfirmOrder.commentList);
    this.evaluate_list = this.GLOBAL.globalConfirmOrder.commentList;
    for (var i = 0; i < this.evaluate_list.length; i++) {
      this.img_list.push([]);
    }
  },

  methods: {
    pickThis() {
      this.pickFlag = !this.pickFlag;
    },
    // =================================================================   上传图片
    //预览图片
    previewImg(event) {
      var src = event.currentTarget.dataset.src; //获取data-src
      var list = event.currentTarget.dataset.list; //获取data-list
      //图片预览
      wx.previewImage({
        current: src, // 当前显示图片的url
        urls: list // 需要预览的图片url数组
      });
    },

    //添加图片,index为选中的物品索引
    upLoadImg(index) {
      let _this = this;
      let img_item = _this.img_list[index]; //图片数组的每个元素是一个物品的评价图片路径数组

      //超过3张不能添加
      if (img_item.length == 3) {
        wx.showToast({
          title: "图片穿过3张!", //标题
          icon: "none"
        });
      } else {
        //选择图片
        wx.chooseImage({
          count: 3, //多选的上限值
          sizeType: ["compressed"],
          sourceType: ["album", "camera"],
          success: function(res) {
            let tempFilePaths = res.tempFilePaths; //图片路径
            let tempFiles = res.tempFiles; //图片文件

            //把选择的图片 添加到集合里
            for (var i in tempFilePaths) {
              console.log(tempFiles[i]);
              console.log(tempFiles[i].size); //图片大小

              //图片小于或者等于2M时 可以获取图片
              if (tempFiles[i].size <= 2097152) {
                img_item.push(tempFilePaths[i]); //图片临时路径
              } else {
                //图片大于2M，弹出一个提示框
                wx.showToast({
                  title: "上传图片不能大于2M!", //标题
                  icon: "none"
                });
              }
            }
            //显示
            _this.img_list[index] = img_item;
          },
          fail: function(res) {
            wx.showToast({
              title: "上传失败!", //标题
              icon: "none"
            });
          }
        });
      }
    },

    // 删除图片,k为选中图片对应的物品索引
    deleteImg(e, k) {
      let _this = this;
      let index = e.currentTarget.dataset.index; //获取删除的索引值
      //删除图片数组的元素
      _this.img_list[k].splice(index, 1); //根据索引删除图片数组的对应图片
    },

    //点击上传事件
    submit() {
      let _this = this;
      //第一个参数上传图片接口
      //第二个参数临时图片数组
      //第三个参数表示第几个物品，0表示第一个物品的评价
      //第四个参数表示每个物品的图片，0表示第一张图片
      _this.uploadToServer(
        _this.GLOBAL.serverSrc + "/user/upLoadImg", //后端接收图片的接口
        _this.img_list, //存放图片路径的数组
        0, //表示第几张图片，0表示从第一张开始上传
        0
      );
    },

    //第一个参数上传图片接口
    //第二个参数临时图片数组
    //第三个参数表示第几个物品，0表示第一个物品
    //第四个参数表示每个物品的图片，0表示第一张图片
    //上传图片到服务器
    uploadToServer(url, img_list, i, j) {
      let _this = this;
      //当i小于物品总数量执行上传
      if (i < img_list.length) {
        //当j小于物品i的图片总数量执行上传
        if (j < img_list[i].length) {
          wx.uploadFile({
            url: url,
            filePath: img_list[i][j],
            name: "file",

            //下面进行对后端返回的图片url进行拼接
            success: function(res) {
              //上传完一张图片后会返回图片url，是json格式
              let data = JSON.parse(res.data);
              console.log(data);

              //当图片上传完后获取该物品所有图片url拼接成的url字符串
              if (j + 1 == img_list[i].length) {
                //最后一张图片不需要加分号
                _this.imgString += data.name;
                console.log(_this.imgString);
                //评价数组对应的索引的图片为该图片字符串
                _this.evaluate_list[i].img = _this.imgString;
                //图片字符串变为空
                _this.imgString = "";

                //当上传完所有图片后，向后端提交评价数组
                if (i + 1 == img_list.length) {
                  _this.evaluateSubmit(_this.evaluate_list);
                } else {
                  i++; //下一个物品
                  j = 0; //第一张图片开始
                  _this.uploadToServer(url, img_list, i, j); //递归
                }
              }

              //当还没上传完一个物品所有图片，拼接图片url，用分号间隔
              else {
                _this.imgString += data.name + ";";
                console.log(_this.imgString);
                j++;
                _this.uploadToServer(url, img_list, i, j); //递归
              }
            }
          });
        }

        //当出现中间物品的评价图片为空时，还需要继续上传图片，否则会导致后面图片无法上传
        else {
          //当上传完所有图片后，向后端提交评价数组
          if (i + 1 == img_list.length) {
            _this.evaluateSubmit(_this.evaluate_list);
          } else {
            i++; //下一个物品
            j = 0; //第一张图片开始
            _this.uploadToServer(url, img_list, i, j); //递归
          }
        }
      }
    },

    //向后端提交评价数组
    evaluateSubmit(list) {
      let _this = this;
      let evaluate_list = JSON.stringify(list); //转为json
      let if_anonymous = this.pickFlag;
      wx.request({
        url: _this.GLOBAL.serverSrc + "/evaluate/evaluateOrder", //提交评价的接口
        method: "POST",
        data: {
          user_id: _this.GLOBAL.userId,
          if_anonymous: if_anonymous,
          evaluate_list: evaluate_list //评价数组
        },
        success(res) {
          console.log(res.data);
          if (res.data.statusCode == 200) {
            wx.showToast({
              title: "评价成功!", //标题
              icon: "none"
            });
            _this.img_list = []; //上传完后清空
          } else {
            wx.showToast({
              title: "上传失败!", //标题
              icon: "none"
            });
          }
        }
      });
    }
  }
};
</script>

<style>
/* -------------------------------------------------------------------------------------
                                      默认与空处理
---------------------------------------------------------------------------------------*/
.index1 {
  /*Firefox*/
  min-height: -moz-calc(94vh);
  /*chrome safari*/
  min-height: -webkit-calc(94vh);
  /*Standard */
  min-height: calc(94vh);
  background-color: #f5f5f5;
}
.empty {
  height: 1rem;
  display: block;
  width: 100%;
  position: relative;
  background: #f5f5f5;
}
.emptyPanel {
  display: block;
  width: 100%;
  height: 100%;
  font-size: 12px;
  color: #787172;
  text-align: center;
  /*Firefox*/
  height: -moz-calc(83vh);
  /*chrome safari*/
  height: -webkit-calc(83vh);
  /*Standard */
  height: calc(83vh);
}
.empty_img {
  display: inline-block;
  margin-bottom: 1rem;
}
.commentPanel {
  border-top: 1px solid #f5f5ff;
  padding: 0.2rem 0.36rem;
  background-color: white;
}
.commentList {
  margin-bottom: 0.36rem;
}
/* -------------------------------------------------- */
.bookname {
  font-size: 14px;
  color: #36282b;
}
.tips {
  font-size: 10px;
  color: #d2ac6e;
  letter-spacing: 2rpx;
  text-indent: 1rem;
  margin-left: 10rpx;
}
.commentText {
  /* height: 0.8rem; */
  min-height: 0.8rem;
  padding: 10rpx 0.5em;
  color: #787172;
  font-size: 12px;
  line-height: 1.5em;
}
/* -------------------------------------------------- */

.submit {
  height: 1rem;
  width: 100%;
  transform: none;
  position: fixed;
  bottom: 0;
  z-index: 999;
  font-size: 18px;
  color: white;
  border-radius: 0;
  background-color: #d2ac6e;
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  align-items: center; /*垂直居中*/
  justify-content: center; /*水平居中*/
}
.submit:after,
.submit:before {
  display: none;
}
.add-image,
.up-pic image {
  flex: 1;
  display: inline-block;
  margin: 20rpx 30rpx;
  width: 150rpx;
  height: 150rpx;
  max-width: 160rpx;
  max-height: 160rpx;
  color: #ddd;
  font-size: 144rpx;
  line-height: 95%;
  text-align: center;
  background-color: #fff;
  border: 1px solid #f5f5ff;
  cursor: pointer;
  border-radius: 10rpx;
}

.picture_list {
  padding: 20rpx 0;
  /* margin-left: 12%; */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
}

.picture_item {
  margin-left: 0;
  position: relative;
  width: 160rpx;
  height: 160rpx;
}

.picture_item .del {
  position: absolute;
  top: -11rpx;
  right: -11rpx;
  color: #fff;
  border-radius: 50%;
  width: 40rpx;
  height: 40rpx;
  z-index: 2;
  line-height: 35rpx;
  text-align: center;
  background-color: rgb(34, 33, 33);
}

.upload_progress {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.7;
  border-radius: 8rpx;
  background-color: #000;
  color: #fff;
  width: 160rpx;
  height: 160rpx;
  text-align: center;
  line-height: 160rpx;
  font-size: 12px;
}

.picture_item image {
  width: 160rpx;
  height: 160rpx;
}
/* -------------选择匿名 */

/* 选择匿名 */
.checkView {
  display: block;
  /* background-color: red; */
  height: 60rpx;
  color: #787172;
  /* vertical-align: top; */
  padding: 0.15rem 0 0.15rem 0.2rem;
  display: flex;
  flex-direction: row;
  align-items: center; /*垂直居中*/
  text-align: left;
  background-color: white;
  border: 1px solid #f5f5f5;
}
.check_area {
  flex: 1;
  /* background-color: blue; */
  display: inline-block;
  width: 60rpx;
  height: 60rpx;
  margin: 0 20rpx auto 0;
  max-width: 60rpx;
  /* vertical-align: top; */
  /* background-color: #f5f5f5; */
  text-align: left;
}
.check_lable {
  flex: 4;
  /* background-color: blue; */
  display: inline-block;
  /* width: 60rpx; */
  /* height: 60rpx; */
  margin: 0 auto;
  font-size: 10px;
  line-height: 10px;
  /* vertical-align: top; */
  text-align: left;
}
.circle {
  display: block;
  position: relative;
  width: 30rpx;
  height: 30rpx;
  margin: 13rpx auto;
  /* left: 0;
  right: 0; */
  border-radius: 20rpx;
  border: 1px solid #b9abaa;
}

.circle.active:after {
  position: relative;
  display: block;
  content: "";
  width: 14rpx;
  height: 14rpx;
  margin: 0 auto;
  left: 0rpx;
  top: 6rpx;
  /* bottom: 0.3rem; */
  background: #521d23;
  border: 1px solid #521d23;
  border-radius: 50%;
  color: #521d23;
  /* transform: translate(-50%, -50%) scale(1);
  -webkit-transform: translate(-50%, -50%) scale(1); */
}
</style>
