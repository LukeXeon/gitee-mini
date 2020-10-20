<template>
  <div class="wrapper">
    <image class="image"
           :src="image"/>
    <div class="input-group-super-wrapper">
      <div class="input-group-wrapper">
        <div class="input-group">
          <text class="input-group-text">账号</text>
          <input class="input-group-content"
                 controlled="true"
                 v-model="username">
        </div>
        <div class="line">
        </div>
        <div class="input-group">
          <text class="input-group-text">密码</text>
          <input class="input-group-content"
                 v-model="password"
                 password="true">
        </div>
      </div>
    </div>
    <div class="button-wrapper">
      <button class="button"
              @click="login">登录
      </button>
    </div>
  </div>
</template>

<script>
  import api from '../../api'
  import utils from '../../utils'
  import image from '../../resouces/logo.png'

  export default {
    data() {
      return {
        username: null,
        password: null,
        image,
      }
    },
    component: {},

    methods: {
      async login() {
        if (this.username && this.password) {
          await api.login(this.username, this.password);
          await utils.setValue('last_login_username', this.username);
          await utils.redirectTo('/pages/index/main');
        }
      }
    },

    async created() {
      const res = await utils.getValue('last_login_username');
      console.log(res);
      this.username = res.data;
    }
  }
</script>

<style scoped>
  .image {
    width: 429px;
    height: 135px;
    margin-top: 200px
  }

  .wrapper {
    flex: 1;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 750px;
    align-items: center;
    background-color: white;
  }

  .input-group-super-wrapper {
    width: 750px;
    height: 180px;
    margin-top: 100px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .line {
    border-color: gainsboro;
    border-width: 1px;
    height: 1px;
  }

  .input-group-wrapper {
    flex: 1;
    border-color: gainsboro;
    border-width: 1px;
    border-radius: 10px;
    flex-direction: column;
    margin-left: 50px;
    margin-right: 50px;
  }

  .input-group {
    padding-left: 20px;
    padding-right: 20px;
    width: 600px;
    flex: 1;
    flex-direction: row;
    align-items: center;
  }

  .input-group-text {
    color: gray;
  }

  .input-group-content {
    margin-left: 10px;
    flex: 1;
  }

  .button-wrapper {
    flex: 1;
    justify-content: flex-end;
    align-items: center;
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
