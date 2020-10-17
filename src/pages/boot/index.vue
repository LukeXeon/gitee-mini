<template>
  <div class="wrapper">
    <div style="flex: 1;align-items: center;justify-content: center">
      <div style="flex-direction: column;align-items: center">
        <image class="image"
               style="margin-top: 250rpx"
               :src="logo"/>
        <text style="margin-top: 40rpx;font-size: 30rpx">{{text}}</text>
      </div>
    </div>
    <div class="operations">
      <button class="button" v-if="buttonEnable"
              @click="onClick">{{buttonText}}</button>
    </div>
  </div>
</template>

<script>
  import utils from "../../utils";
  import gitee from "../../api";
  import image from '../../resouces/logo.png'

  export default {
    name: "boot",
    async created() {
      if (await gitee.checkLogin()) {
        await utils.redirectTo('pages/index/main')
      } else {
        this.buttonEnable = true
      }
    },
    methods: {
      async onClick() {
        let first = await utils.getValue('first-boot')
        if (first === null) {
          const reps = await utils.alert("这是一个开源项目", "它不会收集任何信息，甚至连自己得服务器都没有，请放心授权此APP。", "我已确认")
        } else {

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
    width: 750rpx;
    align-items: center;
    background-color: white;
  }

  .image {
    width: 429rpx;
    height: 135rpx;
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
    border-radius: 10rpx;
    height: 100rpx;
    width: 600rpx;
    background-color: #238FFF;
    color: white;
    font-size: 35rpx
  }
</style>
