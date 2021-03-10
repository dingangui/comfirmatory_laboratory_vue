import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import SignUp from "@/views/SignUp";
import SampleInput from "@/views/SampleInput";
import SampleInfoUpdate from "@/views/SampleInfoUpdate";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
