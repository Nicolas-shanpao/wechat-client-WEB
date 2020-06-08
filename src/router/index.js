import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
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
        component: () => import( '../views/dashboard/DashBoard.vue'),
      },
      {
        path: 'ArticleAdd',
        name: 'ArticleAdd',
        component: () => import( '../views/article/ArticleAdd.vue'),
      },
      {
        path: 'ArticleList',
        name: 'ArticleList',
        component: () => import( '../views/article/ArticleList.vue'),
        children:[
          {
            path: '',
            name: 'ArticlePage',
            component: () => import( '../views/article/ArticlePage.vue'),
          },
        ]
      },
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
