<template>
  <div class="home">
    <el-button @click="javaAPI()">javaAPI</el-button>
  </div>
</template>

<script>

  export default {
    name: 'Home',
    components: {},
    data() {
      return {};
    },
    mounted() {
      this.getUserList()
    },
    methods: {
      getUserList() {
        let that = this
        that.$store.dispatch("user/userList").then(res => {
          console.log(res);

        });
      },
      javaAPI() {
        let that = this
        return that.request
          .javaAPI()
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            that.fetchError = error;
          });
      }
    }
  }
</script>
