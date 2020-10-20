<template>
  <div>
    <div>
      <div>
        <div v-for="(tab,index) in tabs">
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        tabs: []
      }
    },

    methods: {},

    created() {
      // let app = getApp()
    }
  }
</script>

<style scoped>
  .wrapper{

  }
</style>
