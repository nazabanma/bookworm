<template>
  <div>
    <view v-for="(i,k) in evaluate_list" :key="k">
      <p>{{i.name}}</p>
      <view class="picture_list">
        <view v-for="(item,index) in img_list[k]" class="picture_item" :key="index">
          <image
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
    <button @tap="submit" class="yes-upload">确定上传图片</button>
  </div>
</template>

<script>
// Use Vuex

export default {
  data() {
    return {
      list: "",
      img_list: [],  //存放图片路径集合
      imgString: "", //图片url字符串（字符串由图片url拼接，用分号连接）
      evaluate_list: [
        {
          order_item_id: 1,
          content: "这本书很好看",
          img: ""
        },
        {
          order_item_id: 2,
          content: "这本书非常好看",
          img: ""
        },
         {
          order_item_id: 3,
          content: "这本书好啊",
          img: ""
        }
      ]
    };
  },



  //初始化图片数组长度和评价的长度一致
  mounted() {
    for (var i = 0; i < this.evaluate_list.length; i++) {
      this.img_list.push([]);
    }
  },

  methods: {
    
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
      let img_item = _this.img_list[index];  //图片数组的每个元素是一个物品的评价图片路径数组
       
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
                img_item.push(tempFilePaths[i]);  //图片临时路径
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
        "http://localhost/user/upLoadImg", //后端接收图片的接口
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
                  i++;  //下一个物品
                  j = 0;  //第一张图片开始
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
            i++;  //下一个物品
            j = 0;  //第一张图片开始
            _this.uploadToServer(url, img_list, i, j); //递归
          }
        }
      }
    },
  
  //向后端提交评价数组
    evaluateSubmit(list) {
      let _this=this;
      let evaluate_list=JSON.stringify(list); //转为json
      wx.request({
        url: "http://localhost/user/evaluate", //提交评价的接口
        method: "POST",
        data: { 
          user_id:1,
          evaluate_list:evaluate_list  //评价数组
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
    },
  }
};
</script>

<style>
.counter-warp {
  text-align: center;
  margin-top: 100px;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.add-image,
.up-pic image {
  margin-top: 2%;
  margin-left: 2%;
  width: 150rpx;
  height: 150rpx;
  color: #ddd;
  font-size: 144rpx;
  line-height: 95%;
  text-align: center;
  background-color: #fff;
  cursor: pointer;
  border-radius: 10rpx;
}

.picture_list {
  padding: 20rpx;
  margin-left: 12%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
}

.picture_item {
  margin: 10px;
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
</style>
