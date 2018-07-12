<template>
  <div class="test">
    <h3>在移动端打开</h3>
    <swiper-out :list="list"></swiper-out>
  </div>
</template>

<script>
import swiperOut from "../components/swiper-out";
export default {
  components: {
    swiperOut
  },
  data() {
    return {
      list: [
        {
          title: "Chrome更新了",
          imgUrl:
            "https://uploads.codesandbox.io/uploads/user/82e0864e-4213-4d6c-a67d-cde3dedc92a2/OXkQ-Chrome.png",
          tips: "不再支持Flash视频播放",
          time: "上午 8:30"
        },
        {
          title: "电影新资讯",
          imgUrl:
            "https://uploads.codesandbox.io/uploads/user/82e0864e-4213-4d6c-a67d-cde3dedc92a2/hNN8-Sina.png",
          tips:
            "电影《红海行动》上映以来票房暴涨，很多国人表示对国产电影有了新的改观",
          time: "上午 12:00"
        },
        {
          title: "聚焦两会·共筑中国梦",
          imgUrl:
            "https://uploads.codesandbox.io/uploads/user/82e0864e-4213-4d6c-a67d-cde3dedc92a2/EvE_-video.png",
          tips: "习近平代表的两会故事",
          time: "下午 17:45"
        },
        {
          title: "微信团队",
          imgUrl:
            "https://uploads.codesandbox.io/uploads/user/82e0864e-4213-4d6c-a67d-cde3dedc92a2/tDu2-Wechat.png",
          tips: "您的帐号有异常登录，如非本人操作，请及时修改密码",
          time: "昨天"
        }
      ]
    };
  }
};
</script>

<style scoped>

</style>
