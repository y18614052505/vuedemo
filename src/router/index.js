import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Home = () => import("views/home/Home")
const Category = () => import("views/category/Category")
const Cart = () => import("views/cart/Cart")
const Proflie = () => import("views/profile/Profile")


export default new Router({
  routes: [
    {
      path:'',
      redirect:"/home"
    },
    {
      path:"/home",//首页
      component:Home
    },
    {
      path:"/category",//分类
      component:Category
    },
    {
      path:"/cart",//购物车
      component:Cart
    },
    {
      path:"/profile",// 我的
      component:Proflie
    }
  ]
})
