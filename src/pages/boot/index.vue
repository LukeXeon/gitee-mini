<template>
  <div class="wrapper" style="flex-grow: 1">
    <div style="flex: 1;align-items: center;justify-content: center">
      <div style="flex-direction: column;align-items: center">
        <image class="image"
               style="margin-top: 250px"
               :src="logo">
        </image>
        <text style="margin-top: 40px;font-size: 30px">{{text}}</text>
      </div>
    </div>
    <div class="operations">
      <div class="button" v-if="this.buttonEnable" @click="onClick">
        <text style="color: white;font-size: 35px">{{buttonText}}</text>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from "@/libs/utils";
  import gitee from "@/libs/gitee";
  import image from '../../resouces/logo.png'

  export default {
    name: "boot",
    async created() {
      if (await gitee.checkLogin()) {
//                utils.jumpTo('index')
      } else {
        this.buttonEnable = true
      }
    },
    methods: {
      async onClick() {
        let first = await utils.getValue('first-boot')
        if (first === null) {
          const reps = await utils.confirm("", "gitee-mini是一个开源项目，它不会收集任何信息，甚至连服务器都没有，请放心授权此APP。", "我已确认", "取消")
          console.log(reps);
        }
      }
    },
    data() {
      return {
        buttonEnable: false,
        text: "使用支付宝小程序开发",
        buttonText: "登录Gitee",
        logo: image
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    flex: 1;
    width: 750 rpx;
    background-color: white;
  }

  .image {
    width: 429 rpx;
    height: 135 rpx;
  }

  .operations {
    height: 400px;
    flex: 0;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .button {
    align-items: center;
    justify-content: center;
    border-radius: 10 rpx;
    height: 100 rpx;
    width: 600 rpx;
    background-color: #238FFF;
  }
</style>
