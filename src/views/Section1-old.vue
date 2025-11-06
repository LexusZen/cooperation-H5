<template>
  <div class="section section-1" ref="sectionRef">
    <!-- 主背景图 -->
    <div class="bg-image"></div>

    <div class="content">
      <h1 class="main-title">山海新城，产业高地</h1>
      <div class="subtitle-group">
        <p class="subtitle">地区生产总值奋力跃升</p>
        <p class="highlight">以30%的高增速领跑</p>
      </div>

      <!-- 小标题列表 -->
      <div class="highlights-section">
        <div class="highlights-grid">
          <div class="highlight-item" v-for="(item, index) in highlights" :key="index">
            <div class="dot"></div>
            <div class="text">{{ item }}</div>
          </div>
        </div>
      </div>

      <!-- 产业地标轮播图 -->
      <div class="landmark-carousel">
        <swiper
          :modules="carouselModules"
          :slides-per-view="1"
          :space-between="20"
          :loop="true"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
          :pagination="{ clickable: true }"
          :effect="'coverflow'"
          :coverflow-effect="{
            rotate: 30,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
          }"
          class="landmark-swiper"
        >
          <swiper-slide v-for="(img, index) in landmarkImages" :key="index">
            <div class="landmark-item">
              <img :src="img.src" :alt="img.alt" />
              <div class="landmark-label">{{ img.label }}</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <div class="scroll-indicator">
        <span class="arrow">↓</span>
        <p>向下滑动</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules'
import { useAnimation } from '@/composables/useAnimation'

// 导入 Swiper 样式
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

const sectionRef = ref<HTMLElement | null>(null)
const numberRefs = ref<HTMLElement[]>([])
const { fadeIn, fadeInUp, animateNumber, createTimeline } = useAnimation()

const carouselModules = [Autoplay, Pagination, EffectCoverflow]

// 小标题数据
const highlights = [
  '规模以上工业增加值增长52%',
  '汽车制造业增加值增长18977.1%',
  '2024年：地区生产总值242.15亿元，同比增长74.2%',
  '规模以上工业增加值增长207.5%',
  '汽车制造业增加值增长621.1%',
  '2025年上半年：地区生产总值为137.38亿元，同比增长12.4%',
  '规模以上工业增加值增长22%',
  '汽车制造业增加值增长21.3%'
]

// 产业地标图片
const landmarkImages = [
  {
    src: '/images/section1/landmark-1.jpg',
    alt: '比亚迪深圳号',
    label: '比亚迪深圳号 - 出厂即出海'
  },
  {
    src: '/images/section1/landmark-2.jpg',
    alt: '深汕比亚迪二期工程',
    label: '深汕比亚迪二期 - 高速建设'
  },
  {
    src: '/images/section1/landmark-3.jpg',
    alt: '小漠国际物流港',
    label: '小漠国际物流港 - 5分钟极速集港'
  }
]

onMounted(() => {
  const tl = createTimeline()

  tl.add(fadeIn('.main-title', { duration: 1.2 }))
    .add(fadeInUp('.subtitle-group', { duration: 1 }), '-=0.5')
    .add(fadeInUp('.highlights-section', { duration: 1 }), '-=0.3')
    .add(fadeInUp('.landmark-carousel', { duration: 1 }), '-=0.5')
})
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.section-1 {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $text-light;

  .bg-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/images/section1/bg-main.jpg');
    background-size: cover;
    background-position: center;
    z-index: 0;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
    }
  }

  .content {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 40px 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-height: 100%;

    @media (max-width: 768px) {
      padding: 30px 15px;
    }
  }

  .main-title {
    font-size: clamp(28px, 5vw, 48px);
    font-weight: bold;
    margin-bottom: 15px;
    letter-spacing: 2px;
    padding: 0 10px;
    color: rgb(22, 93, 255);
  }

  .subtitle-group {
    margin-bottom: 20px;

    .subtitle {
      font-size: clamp(16px, 3vw, 20px);
      margin-bottom: 8px;
    }

    .highlight {
      font-size: clamp(18px, 3.5vw, 24px);
      font-weight: bold;
      color: #fbbf24;
    }
  }

  // 小标题列表区域
  .highlights-section {
    width: 100%;
    max-width: 900px;
    margin: 0 auto 30px;
    padding: 0 20px;

    .highlights-grid {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%);
      backdrop-filter: blur(15px);
      border-radius: 24px;
      padding: 35px;
      box-shadow: 0 15px 50px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.6);
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(22, 93, 255, 0.08), transparent);
        animation: shimmerSlide 3s infinite;
      }

      .highlight-item {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px 10px;
        border-bottom: 1px solid rgba(22, 93, 255, 0.08);
        position: relative;
        transition: all 0.3s ease;

        &:hover {
          background: rgba(22, 93, 255, 0.05);
          transform: translateX(8px);
          padding-left: 18px;
        }

        &:last-child {
          border-bottom: none;
        }

        .dot {
          width: 14px;
          height: 14px;
          background: linear-gradient(135deg, rgb(22, 93, 255), rgb(59, 130, 246));
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 12px rgba(22, 93, 255, 0.5), 0 0 20px rgba(22, 93, 255, 0.3);
          animation: dotPulse 2s ease-in-out infinite;
          position: relative;

          &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 6px;
            height: 6px;
            background: white;
            border-radius: 50%;
            opacity: 0.8;
          }
        }

        .text {
          flex: 1;
          font-size: clamp(13px, 2.5vw, 16px);
          color: #1f2937;
          line-height: 1.7;
          font-weight: 500;
        }
      }
    }

    @media (max-width: 768px) {
      padding: 0 15px;

      .highlights-grid {
        padding: 20px 15px;

        .highlight-item {
          gap: 10px;
          padding: 10px 0;

          .dot {
            width: 10px;
            height: 10px;
          }

          .text {
            font-size: clamp(12px, 3vw, 14px);
          }
        }
      }
    }
  }

  // 产业地标轮播图
  .landmark-carousel {
    width: 90%;
    max-width: 900px;
    margin: 0 auto 20px;
    display: flex;
    align-items: center;

    .landmark-swiper {
      width: 100%;
      padding: 20px 10px;

      .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: center;
        height: auto;
      }

      .landmark-item {
        position: relative;
        width: 100%;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
        transition: transform 0.3s ease;

        &:hover {
          transform: scale(1.02);
        }

        img {
          width: 100%;
          height: auto;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          display: block;
          max-height: 350px;
        }

        .landmark-label {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent);
          padding: 20px 15px 12px;
          color: #fff;
          font-size: clamp(13px, 2.5vw, 16px);
          font-weight: 500;
          text-align: center;
        }
      }

      // 自定义轮播分页器
      :deep(.swiper-pagination) {
        bottom: 5px;
        z-index: 10;

        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.6);
          opacity: 1;
          margin: 0 5px;

          &.swiper-pagination-bullet-active {
            background: #fbbf24;
            width: 30px;
            border-radius: 5px;
          }
        }
      }
    }

    // 移动端优化
    @media (max-width: 768px) {
      width: 95%;
      margin-bottom: 15px;

      .landmark-swiper {
        padding: 15px 5px;

        .landmark-item {
          border-radius: 12px;

          img {
            aspect-ratio: 4 / 3;
            max-height: 250px;
          }

          .landmark-label {
            font-size: clamp(12px, 3vw, 14px);
            padding: 15px 12px 10px;
          }
        }

        :deep(.swiper-pagination) {
          bottom: 3px;

          .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            margin: 0 4px;

            &.swiper-pagination-bullet-active {
              width: 24px;
            }
          }
        }
      }
    }

    // 小屏手机优化
    @media (max-width: 480px) {
      .landmark-swiper {
        padding: 10px 3px;

        .landmark-item img {
          aspect-ratio: 1 / 1;
          max-height: 200px;
        }
      }
    }
  }

  .scroll-indicator {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    animation: bounce 2s infinite;
    z-index: 100;

    .arrow {
      font-size: clamp(20px, 4vw, 24px);
      display: block;
      margin-bottom: 5px;
    }

    p {
      font-size: clamp(12px, 2.5vw, 14px);
      opacity: 0.8;
    }

    @media (max-width: 768px) {
      bottom: 15px;
    }
  }
}

@keyframes shimmerSlide {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

@keyframes dotPulse {
  0%, 100% {
    box-shadow: 0 0 12px rgba(22, 93, 255, 0.5), 0 0 20px rgba(22, 93, 255, 0.3);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 20px rgba(22, 93, 255, 0.8), 0 0 30px rgba(22, 93, 255, 0.5);
    transform: scale(1.1);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0) translateX(-50%);
  }
  40% {
    transform: translateY(-15px) translateX(-50%);
  }
  60% {
    transform: translateY(-8px) translateX(-50%);
  }
}
</style>
