<template>
  <el-container class="home">
    <div class="home-aside">
      <transition name="el-fade-in-linear">
        <v-list-item two-line :class="isCollapse && 'px-1'" class="aside-avatar">
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg">
          </v-list-item-avatar>

          <v-list-item-content v-show="!isCollapse">
            <v-list-item-title>Application</v-list-item-title>
            <v-list-item-subtitle>Subtext</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </transition>
      <el-menu
          default-active="2"
          class="el-menu-vertical-demo u_scrollBar"
          @open="handleOpen"
          @close="handleClose"
          background-color="#304156"
          text-color="#bfcbd9"
          active-text-color="#409EFF"
          :collapse="isCollapse">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>

      </el-menu>
    </div>
    <el-container>
      <el-header>
        <v-btn icon @click="isCollapse=!isCollapse">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        isCollapse: true
      }
    },
    computed: {},
    mounted() {
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  .home {
    height: 100vh;
    overflow: hidden;
  }

  .home-aside {
    /*overflow: hidden;*/
    padding-top: 72px;
    position: relative;
    background-color: #304156
  }

  .el-menu-vertical-demo {
    padding-left: 0px;
    border-right: none;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 300px;
    overflow-y: scroll;
    height: calc(100% - 72px);
  }

  .aside-avatar {
    position: absolute;
    top: 0;
  }
</style>
