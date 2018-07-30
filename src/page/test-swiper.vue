<template>
  <div class="test-swiper">
    <router-link to="/">
      <div class="back">返回</div>
    </router-link>
    <swiper :swiperOptoins="swiperOptoins"></swiper>
  </div>
</template>

<script>
import swiper from "../components/swiper";
export default {
	components: {
		swiper
	},
	data() {
		return {
			swiperOptoins: {
				autoPlay: true,
				textColor: "",
				swiperWidth: 600,
				swiperHeight: 300,
				swiperList: [
					{
						url:
							"https://uploads.codesandbox.io/uploads/user/82e0864e-4213-4d6c-a67d-cde3dedc92a2/o98p-swiper-img-1.jpg",
						text: "文案1"
					},
					{
						url:
							"https://uploads.codesandbox.io/uploads/user/82e0864e-4213-4d6c-a67d-cde3dedc92a2/FEsR-swiper-img-2.jpg",
						text: "文案2"
					},
					{
						url:
							"https://uploads.codesandbox.io/uploads/user/82e0864e-4213-4d6c-a67d-cde3dedc92a2/dGn3-swiper-img-3.jpg",
						text: "文案3"
					}
				]
			}
		};
	}
};
</script>
