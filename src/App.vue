<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>

  export default {
    name: 'App',

    components: {},

    data: () => ({
      //
    }),
  };
</script>
<style>
  html {
    height: 100vh;
    overflow-y: auto!important;
  }
</style>
