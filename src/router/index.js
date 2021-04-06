import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import SignUp from "@/views/SignUp";
import SampleInput from "@/views/SampleInput";
import SampleInfoUpdate from "@/views/SampleInfoUpdate";
import DetectionDataInput from "@/views/DetectionDataInput";
import Index from "@/views/Index";
import InfoEdit from "@/views/InfoEdit";
import InfoShow from "@/views/InfoShow";

Vue.use(VueRouter)

const routes = [
  {
    path: '/Index',
    name: 'Index',
    component: Index
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/SampleInput',
    name: 'SampleInput',
    component: SampleInput
  },
  {
    path: '/SampleInfoUpdate/:AcceptanceNumber',
    name: 'SampleInfoUpdate',
    component: SampleInfoUpdate
  },
  {
    path: '/InfoShow/:AcceptanceNumber',
    name: 'InfoShow',
    component: InfoShow
  },
  {
    path: '/DetectionDataInput',
    name: 'DetectionDataInput',
    component: DetectionDataInput
  },

  //  审核样品的功能暂时取消
 /* {
    path: '/DetectionDataReview',
    name: 'DetectionDataReview',
    component: DetectionDataReview
  },*/
  {
    path: '/DetectionDataInput/:AcceptanceNumber',
    name: 'DetectionDataInput',
    component: DetectionDataInput
  },
  {
    path: '/InfoEdit/:AcceptanceNumber',
    name: 'InfoEdit',
    component: InfoEdit
  },
  /*{
    path: '/DetectionDataReview/:AcceptanceNumber',
    name: 'DetectionDataReview',
    component: DetectionDataReview,
    // meta:{
    //   requireAuth: true
    // }
  },*/
  {
    path: '/',
    name: 'Login',
    component: Login,
    // redirect: {name: "Blogs"}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
