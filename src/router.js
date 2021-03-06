import Vue from "vue";
import Router from "vue-router";
import catalog from "./page/catalog";
import testMLoading from "./page/test-mLoading";
import testPagination from "./page/test-pagination";
import testSlider from "./page/test-slider";
import testSwiperOut from "./page/test-swiper-out";
import testSwiper from "./page/test-swiper";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "catalog",
      component: catalog
    },
    {
      path: "/test-mLoading",
      name: "testMLoading",
      component: testMLoading
    },
    {
      path: "/test-pagination",
      name: "testPagination",
      component: testPagination
    },
    {
      path: "/test-slider",
      name: "testSlider",
      component: testSlider
    },
    {
      path: "/test-swiper-out",
      name: "testSwiperOut",
      component: testSwiperOut
    },
    {
      path: "/test-swiper",
      name: "testSwiper",
      component: testSwiper
    }
  ]
});
