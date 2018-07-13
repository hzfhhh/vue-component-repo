<template>
  <!-- 轮播图 -->
  <div class="swiper">
    <img src="https://uploads.codesandbox.io/uploads/user/82e0864e-4213-4d6c-a67d-cde3dedc92a2/q2mC-swiper-left.png" class="swiper-left" :class="{allow: swiperActiveIndex!==0}" @click="swiperLeft(1)" alt="">
    <img src="https://uploads.codesandbox.io/uploads/user/82e0864e-4213-4d6c-a67d-cde3dedc92a2/M8Ub-swiper-right.png" class="swiper-right" @click="swiperRight(1)" :class="{allow: swiperActiveIndex!==2}" alt="">
    <div class="swiper-content">
      <!--div class="swiper-item" style="transform: translateX(0) scale(1)" ref="swiper-item-0">
        <img class="swiper-item" src="https://uploads.codesandbox.io/uploads/user/82e0864e-4213-4d6c-a67d-cde3dedc92a2/o98p-swiper-img-1.jpg" alt="">
        <div class="text">描述文案
        </div>
      </div>
      <div class="swiper-item" style="transform: translateX(this.swiperWidthpx) scale(1)" ref="swiper-item-1">
        <img class="swiper-item" src="https://uploads.codesandbox.io/uploads/user/82e0864e-4213-4d6c-a67d-cde3dedc92a2/FEsR-swiper-img-2.jpg" alt="">
        <div class="text">描述文案
        </div>
      </div>
      <div class="swiper-item" style="transform: translateX(1920px) scale(1)" ref="swiper-item-2">
        <img class="swiper-item" src="https://uploads.codesandbox.io/uploads/user/82e0864e-4213-4d6c-a67d-cde3dedc92a2/dGn3-swiper-img-3.jpg" alt="">
        <div class="text">描述文案
        </div>
      </div -->
      <div class="swiper-item" v-for="(item, index) in swiperList" :key="index" :style="`transform: translateX(${swiperWidth*index}px) scale(1)`" :ref="`swiper-item-${index}`">
        <img class="swiper-img" :src="item.url" alt="">
        <div class="text">{{item.text}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "swiper",
  props: {
    swiperOptoins: Object
  },
  computed: {
    swiperList() {
      return this.swiperOptoins.swiperList;
    }
  },
  data() {
    return {
      swiperActiveIndex: 0,
      last_swiperActiveIndex: 0,
      swiperWidth: 960
    };
  },
  mounted() {
    this.swiperWidth = document.querySelector(".swiper-img").width;
  },
  methods: {
    swiperRight(isClick) {
      if (this.swiperActiveIndex === 2) {
        return;
      }
      if (isClick) {
        clearInterval(this.interval);
      }
      for (let i = 0; i < 3; i++) {
        let itemIndex = "swiper-item-" + i;
        let initX = this.$refs[itemIndex][0].style.transform
          .replace(/(scale\(\d+\))/g, "")
          .replace(/[^0-9\-,]/g, "");
        let changeX = -this.swiperWidth;
        // 循环滚动
        // if (this.swiperActiveIndex === 2) {
        //   changeX = 1920
        // } else {
        //   changeX = -this.swiperWidth
        // }
        this.$refs[itemIndex][0].style.transform = `translateX(${+initX +
          changeX}px) scale(1)`;
      }
      // 循环滚动
      // if (this.swiperActiveIndex == 2) {
      //   this.swiperActiveIndex = 0
      // } else {
      //   ++this.swiperActiveIndex
      // }
      this.last_swiperActiveIndex = this.swiperActiveIndex;
      ++this.swiperActiveIndex;
      if (isClick) {
        // this.autoSwiper();
      }
    },
    swiperLeft(isClick) {
      if (this.swiperActiveIndex === 0) {
        return;
      }
      if (isClick) {
        clearInterval(this.interval);
      }
      for (let i = 0; i < 3; i++) {
        let itemIndex = "swiper-item-" + i;
        let initX = this.$refs[itemIndex][0].style.transform
          .replace(/(scale\(\d+\))/g, "")
          .replace(/[^0-9\-,]/g, "");
        let changeX = this.swiperWidth;
        // 循环滚动
        // if (this.swiperActiveIndex === 0) {
        //   changeX = -1920
        // } else {
        //   changeX = this.swiperWidth
        // }
        this.$refs[itemIndex][0].style.transform = `translateX(${+initX +
          changeX}px) scale(1)`;
      }
      // 循环滚动
      // if (this.swiperActiveIndex == 0) {
      //   this.swiperActiveIndex = 2
      // } else {
      //   --this.swiperActiveIndex
      // }
      this.last_swiperActiveIndex = this.swiperActiveIndex;
      --this.swiperActiveIndex;
      if (isClick) {
        // this.autoSwiper();
      }
    },
    autoSwiper() {
      this.interval = setInterval(() => {
        if (this.swiperActiveIndex === 0) {
          this.swiperRight();
        } else if (this.swiperActiveIndex === 2) {
          this.swiperLeft();
        } else if (this.swiperActiveIndex === 1) {
          if (this.last_swiperActiveIndex < this.swiperActiveIndex) {
            this.swiperRight();
          } else {
            this.swiperLeft();
          }
        }
      }, 2000);
    }
  }
};
</script>

<style lang="less" scoped>
.swiper {
  position: relative;
  margin: auto;
  height: 373px;
  width: 1200px;
  .swiper-left {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    cursor: pointer;
    width: 50px;
    height: 166px;
  }
  .swiper-right {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    cursor: pointer;
    width: 50px;
    height: 166px;
  }
  .allow {
    &:hover {
      background-color: #d2d6da;
    }
  }
  .swiper-content {
    width: 960px;
    height: 100%;
    margin: auto;
    color: #243a56;
    box-shadow: 0 0 30px #f1eded;
    position: relative;
    overflow: hidden;
    .swiper-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      transform: scale(1);
      transition: all 0.5s linear;
      .swiper-img {
        height: 100%;
        width: 100%;
      }
      .dot-left {
        position: absolute;
        top: 53px;
        left: 210px;
      }
      .dot-right {
        position: absolute;
        bottom: 53px;
        right: 37px;
      }
      .text {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 20px;
        margin: auto;
      }
    }
  }
}
</style>
