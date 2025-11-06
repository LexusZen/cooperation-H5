<template>
  <div class="section section-1" ref="sectionRef">
    <!-- Stage 1: Welcome Screen (0-3s) -->
    <transition name="fade">
      <div v-if="currentStage === 1" class="welcome-screen">
        <div class="welcome-content">
          <h1 class="welcome-title">深汕焕新 奋战百千万</h1>
          <p class="welcome-subtitle">Shenzhen-Shanwei Special Cooperation Zone</p>
          <div class="loading-bar">
            <div class="loading-progress" :style="{ width: loadingProgress + '%' }"></div>
          </div>
          <p class="loading-text">{{ loadingProgress }}%</p>
        </div>
      </div>
    </transition>

    <!-- Stage 2: Panorama Full Screen (3-6s) -->
    <transition name="fade">
      <div v-if="currentStage === 2" class="panorama-stage">
        <div class="panorama-image" :style="{ backgroundImage: `url(${getImageUrl('/images/section1/bg-main.jpg')})` }">
          <div class="panorama-overlay"></div>
          <div class="panorama-title">
            <h2>深汕焕新 奋战百千万</h2>
            <p>山海新城·产业高地</p>
          </div>
        </div>
      </div>
    </transition>

    <!-- Stage 3: 3D Cube Carousel (6-~13.5s) -->
    <transition name="fade">
      <div v-if="currentStage === 3" class="cube-carousel-stage">
        <div class="cube-carousel-container">
          <swiper
            :modules="cubeModules"
            :effect="'slide'"
            :speed="800"
            :autoplay="{
              delay: 2500,
              disableOnInteraction: false
            }"
            :loop="false"
            @slideChange="onSlideChange"
            @reachEnd="onCarouselEnd"
            class="cube-swiper"
          >
            <swiper-slide v-for="(img, index) in landmarkImages" :key="index">
              <div class="cube-slide">
                <img :src="img.src" :alt="img.alt" />
                <div class="cube-label">{{ img.label }}</div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </transition>

    <!-- Stage 4: Content Display (auto-enter after carousel) -->
    <transition name="fade">
      <div v-if="currentStage === 4" class="content-stage">
        <div class="bg-image" :style="{ backgroundImage: `url(${getImageUrl('/images/section1/bg-main.jpg')})` }"></div>

        <div class="content">
          <h1 class="main-title">山海新城，产业高地</h1>

          <div class="subtitle-group">
            <div class="car-outline-bg">
              <div class="car-content">
                <div class="dot"></div>
                <div class="text">{{ displaySubtitle1 }}</div>
              </div>
            </div>
          </div>

          <!-- 小标题列表 -->
          <div class="highlights-section">
            <div class="highlights-grid">
              <div
                class="highlight-item"
                v-for="(_item, index) in highlights"
                :key="index"
                :class="{ visible: visibleHighlights >= index }"
              >
                <div class="dot"></div>
                <div class="text">{{ displayHighlights[index] || '' }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import { useTypewriter } from '@/composables/useTypewriter'
import { getImageUrl } from '@/utils/assets'

// Swiper 12+ 不需要单独导入CSS

const sectionRef = ref<HTMLElement | null>(null)
const { typeText } = useTypewriter()

// Stage control
const currentStage = ref(1)
const loadingProgress = ref(0)

// Content display
const displaySubtitle1 = ref('')
const displaySubtitle2 = ref('')
const displayHighlights = ref<string[]>([])
const visibleHighlights = ref(-1)

const cubeModules = [Autoplay]

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
    src: getImageUrl('/images/section1/landmark-1.jpg'),
    alt: '比亚迪深圳号',
    label: '比亚迪深圳号 - 出厂即出海'
  },
  {
    src: getImageUrl('/images/section1/landmark-2.jpg'),
    alt: '深汕比亚迪二期工程',
    label: '深汕比亚迪二期 - 高速建设'
  },
  {
    src: getImageUrl('/images/section1/landmark-3.jpg'),
    alt: '小漠国际物流港',
    label: '小漠国际物流港 - 5分钟极速集港'
  }
]

// Stage 1: Loading animation (0-3s)
const startStage1 = () => {
  currentStage.value = 1
  const interval = setInterval(() => {
    if (loadingProgress.value < 100) {
      loadingProgress.value += 2
    } else {
      clearInterval(interval)
      setTimeout(() => {
        startStage2()
      }, 300)
    }
  }, 30) // 100% in 3 seconds (100 * 30ms = 3000ms)
}

// Stage 2: Panorama Display (3-6s)
const startStage2 = () => {
  currentStage.value = 2
  setTimeout(() => {
    startStage3()
  }, 3000) // 3s for panorama
}

// Stage 3: Slide Carousel (6-~13.5s, plays once)
const startStage3 = () => {
  currentStage.value = 3
  // Will auto-proceed when carousel ends (via onCarouselEnd event)
}

// Carousel slide change handler
const onSlideChange = (swiper: any) => {
  console.log('Slide changed to:', swiper.activeIndex)
}

// Carousel end handler - auto-enter stage 4
const onCarouselEnd = () => {
  console.log('Carousel ended, entering stage 4')
  setTimeout(() => {
    enterPage()
  }, 1500) // Wait 1.5s on last slide before transitioning
}

// Stage 4: Content Display (auto-enter after carousel)
const enterPage = () => {
  currentStage.value = 4

  // Typewriter for subtitles
  setTimeout(() => {
    typeText('地区生产总值奋力跃升', (text) => {
      displaySubtitle1.value = text
    }, { speed: 50 })
  }, 500)

  setTimeout(() => {
    typeText('以30%的高增速领跑', (text) => {
      displaySubtitle2.value = text
    }, { speed: 50 })
  }, 2000)

  // Show highlights one by one with typewriter
  setTimeout(() => {
    highlights.forEach((highlight, index) => {
      setTimeout(() => {
        visibleHighlights.value = index

        setTimeout(() => {
          typeText(highlight, (text) => {
            displayHighlights.value[index] = text
          }, { speed: 30 })
        }, 300)
      }, index * 800)
    })
  }, 3500)
}

onMounted(() => {
  startStage1()
})
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.section-1 {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #000;
  overflow: hidden;
}

// Stage 1: Welcome Screen
.welcome-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  z-index: 10;

  .welcome-content {
    text-align: center;
    color: white;
    padding: 20px;

    .welcome-title {
      font-size: clamp(32px, 6vw, 56px);
      font-weight: bold;
      margin-bottom: 15px;
      letter-spacing: 3px;
      background: linear-gradient(135deg, #60a5fa, #3b82f6, #2563eb);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .welcome-subtitle {
      font-size: clamp(14px, 2.5vw, 18px);
      margin-bottom: 40px;
      opacity: 0.8;
      letter-spacing: 1px;
    }

    .loading-bar {
      width: 300px;
      max-width: 80%;
      height: 6px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 10px;
      margin: 0 auto 15px;
      overflow: hidden;

      .loading-progress {
        height: 100%;
        background: linear-gradient(90deg, #3b82f6, #60a5fa, #3b82f6);
        background-size: 200% 100%;
        border-radius: 10px;
        transition: width 0.3s ease;
        animation: shimmer 1.5s infinite;
      }
    }

    .loading-text {
      font-size: clamp(16px, 3vw, 20px);
      font-weight: bold;
      color: #60a5fa;
    }
  }
}

// Stage 2: Panorama Full Screen
.panorama-stage {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;

  .panorama-image {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    position: relative;
    animation: panoramaZoom 3s ease-out;

    .panorama-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
    }

    .panorama-title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, calc(-50% - 40px));
      text-align: center;
      color: white;
      z-index: 1;
      animation: panoramaTitleFadeIn 1s ease 0.5s both;

      h2 {
        font-size: clamp(36px, 7vw, 64px);
        font-weight: bold;
        margin-bottom: 15px;
        letter-spacing: 4px;
        text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
      }

      p {
        font-size: clamp(18px, 3.5vw, 28px);
        letter-spacing: 2px;
        opacity: 0.9;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
      }
    }
  }
}

// Stage 3: Slide Carousel
.cube-carousel-stage {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, rgb(229, 238, 255), #b4d8e8);
  z-index: 8;

  .cube-carousel-container {
    width: 80%;
    max-width: 600px;
    aspect-ratio: 1 / 1;

    @media (max-width: 768px) {
      width: 90%;
      max-width: 400px;
    }

    .cube-swiper {
      width: 100%;
      height: 100%;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      perspective: 1000px;

      .cube-slide {
        position: relative;
        width: 100%;
        height: 100%;
        background: rgba(229, 238, 255, 0.95);
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        transform: translate3d(0, 0, 0);
        will-change: transform;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .cube-label {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent);
          padding: 25px 20px 15px;
          color: white;
          font-size: clamp(14px, 2.5vw, 18px);
          font-weight: bold;
          text-align: center;
        }
      }
    }
  }
}

// Stage 4: Content Display
.content-stage {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  z-index: 7;

  .bg-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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

    @media (max-width: 768px) {
      padding: 30px 15px;
    }
  }

  .main-title {
    font-size: clamp(28px, 5vw, 48px);
    font-weight: bold;
    margin-bottom: 25px;
    letter-spacing: 2px;
    padding: 0 10px;
    color: rgb(22, 93, 255);
    text-shadow: 0 2px 10px rgba(22, 93, 255, 0.3);
  }

  .subtitle-group {
    max-width: 700px;
    margin: 0 auto 30px;
    padding: 0 15px;
  }

  // 小标题列表区域
  .highlights-section {
    width: 100%;
    max-width: 900px;
    margin: 0 auto 30px;
    padding: 0 20px;

    .highlights-grid {
      background: linear-gradient(135deg, rgba(229, 238, 255, 0.98) 0%, rgba(229, 238, 255, 0.95) 100%);
      backdrop-filter: blur(15px);
      border-radius: 24px;
      padding: 35px;
      box-shadow: 0 15px 50px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(229, 238, 255, 0.8);
      border: 1px solid rgba(229, 238, 255, 0.6);
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
        opacity: 0;
        transform: translateX(-20px);

        &.visible {
          opacity: 1;
          transform: translateX(0);
        }

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
          min-height: 22px;
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
    color: white;

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

// Animations
@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

@keyframes panoramaZoom {
  0% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes panoramaTitleFadeIn {
  0% {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

@keyframes breathe {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 10px 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(59, 130, 246, 0.3);
  }
  50% {
    transform: scale(1.03);
    box-shadow: 0 15px 40px rgba(59, 130, 246, 0.6), 0 0 80px rgba(59, 130, 246, 0.4);
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

// Transitions
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.button-appear-enter-active {
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.button-appear-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.8);
}
</style>
