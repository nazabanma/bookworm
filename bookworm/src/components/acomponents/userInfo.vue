<template>
  <div>
    <!-- ==================================================     组件：首页分类点击切换     ======================================================= -->
  </div>
</template>

<script>
import { globalBus } from "@/components/globalBus";
export default {
  data() {
    return {
      user_Id: "",
      user_name: ""
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      let _this = this;
      wx.request({
        url: serverSrc + "/user/userInfo/" + userId,
        method: "GET",
        success(res) {
          console.log(res);
          // console.log(this);
          _this.user_name = res.data.data.nick_name;
        }
      });
      //globalBus.$emit("user_Id", this.user_Id);
      globalBus.$emit("user_name", this.user_name);
    }
  }
};
</script>