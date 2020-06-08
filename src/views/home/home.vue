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
            <v-list-item-subtitle>{{activeMenu}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </transition>
      <el-menu
          :default-active="activeMenu"
          class="el-menu-vertical-demo u_scrollBar"
          @open="handleOpen"
          @close="handleClose"
          @select="handleSelect"
          background-color="#304156"
          text-color="#bfcbd9"
          active-text-color="#409EFF"
          :collapse="isCollapse">
        <el-menu-item index="/">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-submenu index="/Article">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>文章</span>
          </template>
          <el-menu-item index="/ArticleList">文章列表</el-menu-item>
          <el-menu-item index="/ArticleAdd">文章新增</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <el-container>
      <el-header>
        <v-btn icon @click="isCollapse=!isCollapse">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        isCollapse: false
      }
    },
    computed: {
      activeMenu() {
        const route = this.$route
        const {meta, path} = route
        console.log(meta);
        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
          return meta.activeMenu
        }
        return path
      },
    },
    mounted() {
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.$router.push({
          path: key
        })
      },
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

  .el-header {
    display: flex;
    align-items: center;
  }
</style>
