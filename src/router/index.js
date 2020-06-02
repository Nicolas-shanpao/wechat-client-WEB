import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login/login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login/signup.vue')
  },
  {
    path: '/',
    component: () => import( '../views/home/home.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import( '../views/dashboard/DashBoard.vue'),
      },
      {
        path: 'articleList',
        name: 'articleList',
        component: () => import( '../views/articlelist/ArticleList.vue')
      }
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
