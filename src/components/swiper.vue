<template>
  <!-- 轮播图 -->
  <div class="swiper" :style="{width: `${swiperWidth}px`, height: `${swiperHeight}px`}">
    <img src="https://uploads.codesandbox.io/uploads/user/82e0864e-4213-4d6c-a67d-cde3dedc92a2/q2mC-swiper-left.png" class="swiper-left allow" @click="swiperLeft(1)" alt="">
    <img src="https://uploads.codesandbox.io/uploads/user/82e0864e-4213-4d6c-a67d-cde3dedc92a2/M8Ub-swiper-right.png" class="swiper-right allow" @click="swiperRight(1)" alt="">
    <div class="swiper-content">
      <div class="swiper-item" v-for="(item, index) in swiperList" :key="index" :ref="`swiper-item-${index}`" :style="{'visibility': swiperActiveIndex===index?'initial':'hidden'}">
        <img class="swiper-img" :src="item.url" alt="">
        <div class="text" :style="{color: textColor}">{{item.text}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	name: "swiper",
	props: {
		swiperOptions: Object
	},
	computed: {
		swiperList() {
			return this.swiperOptions.swiperList;
		}
	},
	data() {
		return {
			swiperActiveIndex: 0,
			last_swiperActiveIndex: 0,
			swiperWidth: 600,
			swiperHeight: 300,
			textColor: "#101010",
			interval: ''
		};
	},
	mounted() {
		for (let i = 0; i < this.swiperList.length; i++) {
			let itemIndex = "swiper-item-" + i;
			if (i===this.swiperList.length-1) {
				this.$refs[itemIndex][0].style.transform = `translateX(${-this.swiperWidth}px) scale(1)`;
			} else {
				this.$refs[itemIndex][0].style.transform = `translateX(${this.swiperWidth*i}px) scale(1)`;
			}
		}
		this.swiperWidth = this.swiperOptions.swiperWidth
			? this.swiperOptions.swiperWidth
			: this.swiperWidth;
		this.swiperHeight = this.swiperOptions.swiperHeight
			? this.swiperOptions.swiperHeight
			: this.swiperHeight;
		this.textColor = this.swiperOptions.textColor
			? this.swiperOptions.textColor
			: this.textColor;
		if (this.swiperOptions.autoPlay) {
			this.autoSwiper();
		}
	},
	beforeDestroy() {
		if (this.swiperOptions.autoPlay) {
			clearInterval(this.interval);
		}
	},
	methods: {
		swiperRight(isClick) {
			// if (this.swiperActiveIndex === this.swiperList.length - 1) {
			// 	return;
			// }
			if (isClick) {
				clearInterval(this.interval);
			}
			for (let i = 0; i < this.swiperList.length; i++) {
				let itemIndex = "swiper-item-" + i;
				if (this.swiperActiveIndex===0) {
					//当前显示的轮播图为第一张
					if (i === this.swiperList.length-1) {
						//最后一张图移动到最后面
						this.$refs[itemIndex][0].style.transform = `translateX(${this.swiperWidth * (this.swiperList.length-2)}px) scale(1)`;
					}  else {
						//其它图片向左移动一个身位
						let initX = this.$refs[itemIndex][0].style.transform
						.replace(/(scale\(\d+\))/g, "")
						.replace(/[^0-9\-,]/g, "");
						let changeX = -this.swiperWidth;
						this.$refs[itemIndex][0].style.transform = `translateX(${+initX + changeX}px) scale(1)`;
						}
					} else if (this.swiperActiveIndex===this.swiperList.length-1) {
						//当前显示的轮播图为最后一张
						if (i===this.swiperList.length-1) {
							//最后一张图片移动到显示位置的左边
							this.$refs[itemIndex][0].style.transform = `translateX(${-this.swiperWidth}px) scale(1)`;
						} else {
							//其它图片重新排序
							this.$refs[itemIndex][0].style.transform = `translateX(${i*this.swiperWidth}px) scale(1)`;
						}
					} else if (this.swiperActiveIndex===this.swiperList.length-2) {
						//当前显示为倒数第二张图片时
						if (i===0) {
							//第一张图片移动到显示位置的右边
							this.$refs[itemIndex][0].style.transform = `translateX(${this.swiperWidth}px) scale(1)`;
						} else {
							//其它图片往左移动一个身位
							let initX = this.$refs[itemIndex][0].style.transform
						.replace(/(scale\(\d+\))/g, "")
						.replace(/[^0-9\-,]/g, "");
						let changeX = -this.swiperWidth;
						this.$refs[itemIndex][0].style.transform = `translateX(${+initX + changeX}px) scale(1)`;
						}
					} else {
						//其它情况下，所有图片往左移动一个身位
						let initX = this.$refs[itemIndex][0].style.transform
						.replace(/(scale\(\d+\))/g, "")
						.replace(/[^0-9\-,]/g, "");
						let changeX = -this.swiperWidth;
						this.$refs[itemIndex][0].style.transform = `translateX(${+initX + changeX}px) scale(1)`;
					}
				}
			this.last_swiperActiveIndex = this.swiperActiveIndex;
			if (this.swiperActiveIndex===this.swiperList.length-1) {
				this.swiperActiveIndex = 0
			} else {
			++this.swiperActiveIndex;
			}
			if (isClick && this.swiperOptions.autoPlay) {
				this.autoSwiper();
			}
		},
		swiperLeft(isClick) {
			if (isClick) {
				clearInterval(this.interval);
			}
			for (let i = 0; i < this.swiperList.length; i++) {
				let itemIndex = "swiper-item-" + i;
				if (this.swiperActiveIndex===0) {
					if (i===0) {
						this.$refs[itemIndex][0].style.transform = `translateX(${this.swiperWidth}px) scale(1)`;
					} else {
						this.$refs[itemIndex][0].style.transform = `translateX(${(i - this.swiperList.length + 1) * this.swiperWidth}px) scale(1)`;
					}
				} else if (this.swiperActiveIndex === this.swiperList.length - 1) {
					if (i===0) {
						this.$refs[itemIndex][0].style.transform = `translateX(${(2 - this.swiperList.length) * this.swiperWidth}px) scale(1)`;
					} else {
						let initX = this.$refs[itemIndex][0].style.transform.replace(/(scale\(\d+\))/g, "").replace(/[^0-9\-,]/g, "");
						this.$refs[itemIndex][0].style.transform = `translateX(${+initX + this.swiperWidth}px) scale(1)`;
					}
				} else if (this.swiperActiveIndex===1) {
					if (i===this.swiperList.length - 1) {
						this.$refs[itemIndex][0].style.transform = `translateX(${-this.swiperWidth}px) scale(1)`;
					} else {
						let initX = this.$refs[itemIndex][0].style.transform.replace(/(scale\(\d+\))/g, "").replace(/[^0-9\-,]/g, "");
						this.$refs[itemIndex][0].style.transform = `translateX(${+initX + this.swiperWidth}px) scale(1)`;
					}
				} else {
					let initX = this.$refs[itemIndex][0].style.transform.replace(/(scale\(\d+\))/g, "").replace(/[^0-9\-,]/g, "");
						this.$refs[itemIndex][0].style.transform = `translateX(${+initX + this.swiperWidth}px) scale(1)`;
				}
			}
			this.last_swiperActiveIndex = this.swiperActiveIndex;
			if (this.swiperActiveIndex===0) {
				this.swiperActiveIndex = this.swiperList.length-1
			} else {
			--this.swiperActiveIndex;
			}
			if (isClick && this.swiperOptions.autoPlay) {
				this.autoSwiper();
			}
		},
		autoSwiper() {
			this.interval = setInterval(() => {
				// 不能无限循环的情况
				// if (this.swiperActiveIndex === 0) {
				// 	this.swiperRight();
				// } else if (this.swiperActiveIndex === this.swiperList.length - 1) {
				// 	this.swiperLeft();
				// } else {
				// 	if (this.last_swiperActiveIndex < this.swiperActiveIndex) {
				// 		this.swiperRight();
				// 	} else {
				// 		this.swiperLeft();
				// 	}
				// }
				this.swiperRight()
			}, 2000);
		}
	}
};
</script>

<style lang="less" scoped>
.swiper {
	position: relative;
	margin: auto;
	.swiper-left {
		position: absolute;
		left: -65px;
		top: 0;
		bottom: 0;
		margin: auto;
		cursor: pointer;
		width: 50px;
		height: 166px;
	}
	.swiper-right {
		position: absolute;
		right: -65px;
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
		width: 100%;
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
				color: #101010;
			}
		}
	}
}
</style>
