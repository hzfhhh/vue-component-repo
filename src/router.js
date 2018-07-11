import Vue from "vue";
import Router from "vue-router";
import catalog from "./components/catalog";
import mLoading from "./components/m-loading";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "catalog",
      component: catalog
    },
    {
      path: "/mloading",
      name: "mLoading",
      component: mLoading
    }
  ]
});
