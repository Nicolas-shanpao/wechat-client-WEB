<template>
  <div class="home">
    <v-navigation-drawer
        v-model="drawer"
        :color="color"
        absolute
        dark
        app
    >
      <v-list
          dense
          nav
          class="py-0"
      >
        <v-list-item
            two-line
            class="px-0">
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>大前端知识点</v-list-item-title>
            <v-list-item-subtitle>技术</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item active-class="pink--text">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <!-- -->
      <v-btn icon @click="showMenu()">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content class="main">

      <!-- Provides the application the proper gutter -->
      <v-container fluid>

        <!-- If using vue-router -->
        {{activeGroup}}
        <router-view></router-view>
      </v-container>
    </v-content>
  </div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        drawer: true,
        items: [
          {title: '工作台', icon: 'mdi-view-dashboard', path: '/'},
          {title: '文章', icon: 'mdi-view-dashboard', path: '/articleList'},
          {title: '录入', icon: 'mdi-view-dashboard', path: '/add'},
        ],
        color: 'blue',
        colors: [
          'primary',
          'blue',
          'success',
          'red',
          'teal',
        ],
        permanent: false,
        temporary: false,
        miniVariant: false,
        activeGroup: 0,
        admins: [
          ['Management', 'people_outline'],
          ['Settings', 'settings'],
        ],
        cruds: [
          ['Create', 'add'],
          ['Read', 'insert_drive_file'],
          ['Update', 'update'],
          ['Delete', 'delete'],
        ],
      }
    },
    computed: {},
    mounted() {
    },
    methods: {
      showMenu() {
        this.drawer = !this.drawer
      },
      changeMenu(v) {
        console.log(v);
        this.$router.push(
          {
            path: v.path
          }
        )
      }
    }
  }
</script>

<style scoped>
  .home {
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }

  .main {
    height: 100%;
    overflow: hidden;
  }
</style>
