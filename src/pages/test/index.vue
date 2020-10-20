<template>
  <div class="wrapper" @click="test">
  </div>
</template>

<script>
  import contributions from "../../api/contributions";
  import utils from '../../utils'

  function Node() {

  }

  export default {
    data() {
      return {}
    },

    methods: {
      test() {
        contributions.getContributions('micro-world').then(resp => {
          utils.alert("", "a", "a")
        }).catch(resp => {
          console.log(resp)
        })
      }
    },

    created() {
      // let app = getApp()
    }
  }
</script>

<style scoped>
  .wrapper {
    flex: 1;
    height: 700px;
    width: 750px;
    background-color: forestgreen;
  }

</style>
