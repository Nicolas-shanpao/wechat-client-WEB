<template>
  <div>
    <v-navigation-drawer
        v-model="drawer"
        :color="color"
        absolute
        dark
        app
        :temporary="true"
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
            <v-list-item-title>Application</v-list-item-title>
            <v-list-item-subtitle>Subtext</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item-group
            v-model="activeGroup"
            active-class="deep-purple--text text--accent-4"
        >
          <v-list-item
              v-for="item in items"
              :key="item.path"
              link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <!-- -->
      <v-btn icon v-if="!drawer" @click="showMenu()">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>

        <!-- If using vue-router -->
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
          {title: '首页', icon: 'mdi-view-dashboard', path: '/'},
          {title: '首页', icon: 'mdi-view-dashboard', path: '/a'},
          {title: '首页', icon: 'mdi-view-dashboard', path: '/b'},
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
        activeGroup: null
      }
    },
    computed: {},
    mounted() {
      console.log(this.drawer);
    },
    methods: {
      showMenu() {
        this.temporary = true
        this.drawer = true
      }
    }
  }
</script>

<style scoped>

</style>
