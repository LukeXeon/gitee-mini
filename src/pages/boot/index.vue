<template>
  <div class="wrapper">
    <image class="image"
           :src="logo"/>
    <text class="text">{{text}}</text>
    <div class="button-wrapper">
      <button class="button" v-if="buttonEnable"
              @click="onClick">{{buttonText}}
      </button>
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
        await utils.redirectTo('/pages/index/main')
      } else {
        this.buttonEnable = true
      }
    },
    methods: {
      async onClick() {
        let first = await utils.getValue('first-boot')
        if (first === null) {
          const reps = await utils.alert(
            "这是一个开源项目",
            "它不会收集任何信息，甚至连自己得服务器都没有，请放心授权此APP。",
            "我已确认"
          )
          if (!reps) {
            return
          }
        }
        await utils.redirectTo('/pages/login/main')
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
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 750px;
    align-items: center;
    flex-direction: column;
    background-color: white;
  }

  .image {
    width: 429px;
    height: 135px;
    margin-top: 200px
  }

  .text {
    margin-top: 40px;
    font-size: 30px
  }

  .button-wrapper {
    flex: 1;
    width: 750px;
    align-items: center;
    justify-content: flex-end;
  }

  .button {
    margin-bottom: 200px;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    height: 100px;
    width: 600px;
    background-color: #238FFF;
    color: white;
    font-size: 35px
  }
</style>
