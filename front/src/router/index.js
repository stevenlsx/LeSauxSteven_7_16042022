import { createRouter, createWebHistory } from "vue-router";
import UserConnect from "@/components/UserConnect";
import Home from "@/components/Home.vue";
import MyPost from "@/components/MyPost";

const routes = [
  {
    path: "/",
    name: "UserConnect",
    component: UserConnect,
  },
  {
    path: "/Home",
    name: "Home",
    component: Home,
  },

  {
    path: "/MyPost",
    name: "MyPost",
    component: MyPost,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
