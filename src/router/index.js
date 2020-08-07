import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store';
Vue.use(Router)
const Home = () => import("views/home/Home")
// const FeaturePage = () => import("views/home/FeaturePage")
const Category = () => import("views/category/Category")
// const Cart = () => import("views/cart/Cart")
const Cart = () => import("views/cart/Cart1")
const Proflie = () => import("views/profile/Profile")
const Jx = () => import("views/jx/Jx")
const Search = () => import("views/search/Search")
const KeyWords = () => import("views/search/Keywords")
const Details = () => import('views/details/Details')
const Login = () => import('views/login/Login')
const routes = [
  {
    path: '',
    redirect: "/home"
  },
  {
    path: "/home",//首页
    mata: {
      title: "首页"
    },
    component: Home,
  },
  {
    path: "/category",//分类
    mata: {
      title: "首页"
    },
    component: Category
  },
  {
    path: "/cart",//购物车
    mata: {
      title: "购物车"
    },
    component: Cart
  },
  {
    path: "/profile",// 我的
    mata: {
      title: "我的"
    },
    component: Proflie
  },
  {
    path: "/jx",// 惊喜
    mata: {
      title: "惊喜"
    },
    component: Jx,
  },
  {
    path: '/search',
    mata: {
      title: "搜索"
    },
    component: Search
  },
  {
    path: '/keywords',
    mata: {
      title: "关键字"
    },
    component: KeyWords
  },
  {
    path: '/details/:id',
    meta: {
      title: "详情"
    },
    component: Details,
  },
  {
    path: '/login',
    meta: {
      title: "登录"
    },
    component: Login
  }
]

const routers = new Router({
  routes,
  mode: 'history',//可以修改模式
})
routers.beforeEach((to, from, next) => {
  // 每次路由在执行的时候，记录一下进入页面的路由地址，后期用于判断 tabbar被重复点击
  store.state.SKnavigation = to.path
  if(to.path == from.path) return
  for (let item in store.state.TabBar) {
    console.log(item);
    store.state.TabBar[item] = false
  }
  if (to.path == '/home' || to.path == '/category' || to.path == '/cart') store.state.TabBar.is_jd_TabBar = true
  else if (to.path.lastIndexOf('/jx') != -1)  store.state.TabBar.is_jx_TabBar = true
  next();
})
export default routers
