<template>
  <div class="section section-1" ref="sectionRef">
    <!-- Stage 1: Welcome Screen (0-3s) -->
    <transition name="fade">
      <div v-if="currentStage === 1" class="welcome-screen">
        <div class="welcome-content">
          <h1 class="welcome-title">深汕焕新 奋战百千万</h1>
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
            <!-- 序言打字机动画 -->
            <div class="panorama-preface">
              <p class="preface-line" v-for="(_line, index) in prefaceLines" :key="index" :class="{ visible: visiblePanoramaPreface >= index }">
                {{ displayPanoramaPreface[index] || '' }}
              </p>
            </div>
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
          <h2 class="section-title">深汕焕新 奋战百千万</h2>

          <!-- 小标题列表 -->
          <div class="highlights-section">
            <div class="highlights-grid">
              <div
                class="highlight-item"
                v-for="(_item, index) in highlights"
                :key="index"
                :class="{ visible: visibleHighlights >= index }"
              >
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

// 导入 Swiper 样式
import 'swiper/swiper-bundle.css'

const sectionRef = ref<HTMLElement | null>(null)
const { typeText } = useTypewriter()

// Stage control
const currentStage = ref(1)
const loadingProgress = ref(0)

// Content display
// 全景阶段序言
const displayPanoramaPreface = ref<string[]>(['', '', '', ''])
const visiblePanoramaPreface = ref(-1)
// 主内容阶段数据
const displayHighlights = ref<string[]>([])
const visibleHighlights = ref(-1)

const cubeModules = [Autoplay]

// 序言数据
const prefaceLines = [
  '这里，是"百千万工程"的实践热土；',
  '这里，以车兴产、以产促城、产城融合、',
  '以工哺农；于山海之间，崛起一座汽车新城，',
  '绘就了区域协调新画卷。'
]

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

// Stage 2: Panorama Display (with preface animation)
const startStage2 = () => {
  currentStage.value = 2

  // 序言打字机效果
  setTimeout(() => {
    prefaceLines.forEach((line, index) => {
      setTimeout(() => {
        visiblePanoramaPreface.value = index

        setTimeout(() => {
          typeText(line, (text) => {
            displayPanoramaPreface.value[index] = text
          }, { speed: 40 })
        }, 100)
      }, index * 800)
    })
  }, 500)

  // 序言完成后进入轮播阶段
  setTimeout(() => {
    startStage3()
  }, prefaceLines.length * 800 + 2000) // 等待序言完成后2秒
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

  // 小标题列表打字机效果
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
  }, 500)
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
  background: rgba(37, 32, 126, 0.98);
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
      color: rgb(16, 224, 248);
      text-shadow: 0 0 20px rgba(16, 224, 248, 0.5);
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
      background: rgba(37, 32, 126, 0.3);
    }

    .panorama-title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, calc(-50% - 220px));
      text-align: center;
      color: white;
      z-index: 1;
      animation: panoramaTitleFadeIn 1s ease 0.5s both;
      width: 90%;
      max-width: 1200px;

      h2 {
        font-size: clamp(36px, 7vw, 64px);
        font-weight: bold;
        margin-bottom: 20px;
        letter-spacing: 4px;
        color: rgb(16, 224, 248);
        text-shadow: 0 0 25px rgba(16, 224, 248, 0.6);
        white-space: nowrap;

        @media (max-width: 768px) {
          white-space: normal;
          font-size: clamp(28px, 8vw, 48px);
          letter-spacing: 2px;
          line-height: 1.4;
        }
      }

      p {
        font-size: clamp(18px, 3.5vw, 28px);
        letter-spacing: 2px;
        opacity: 0.9;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
      }

      .panorama-preface {
        margin-top: 25px;

        @media (max-width: 768px) {
          margin-top: 15px;
          padding: 0 10px;
        }

        .preface-line {
          font-size: clamp(16px, 3vw, 24px);
          line-height: 1.8;
          letter-spacing: 2px;
          color: white;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.5s ease;
          min-height: 1.8em;

          @media (max-width: 768px) {
            font-size: clamp(14px, 4vw, 20px);
            line-height: 1.6;
            letter-spacing: 1px;
          }

          &.visible {
            opacity: 1;
            transform: translateY(0);
          }
        }
      }

      @media (max-width: 768px) {
        transform: translate(-50%, calc(-50% - 120px));
        width: 95%;
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
  background: rgba(37, 32, 126, 0.98);
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
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
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
      background: rgba(37, 32, 126, 0.4);
    }
  }

  .content {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 80px 20px 40px; // 顶部留足空间给TopBar
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-height: 100vh;

    @media (max-width: 768px) {
      padding: 80px 20px 40px; // 移动端保持一致
    }
  }


  // 序言区域
  .preface-section {
    max-width: 800px;
    margin: 0 auto 40px;
    padding: 25px;
    background: linear-gradient(135deg, rgba(229, 238, 255, 0.6) 0%, rgba(229, 238, 255, 0.5) 100%);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.5);

    @media (max-width: 768px) {
      padding: 20px 15px;
      margin: 0 15px 30px;
    }

    .preface-line {
      font-size: clamp(15px, 3vw, 20px);
      line-height: 2;
      color: white;
      text-align: center;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.5s ease;
      margin-bottom: 8px;

      &.visible {
        opacity: 1;
        transform: translateY(0);
      }

      .preface-text {
        display: inline-block;
        font-weight: 500;
        letter-spacing: 1px;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  // 小标题列表区域
  .highlights-section {
    width: 100%;
    max-width: 900px;
    margin: 0 auto 30px;
    padding: 0 20px;

    .highlights-grid {
      background: transparent;
      padding: 35px;
      position: relative;
      overflow: hidden;

      .highlight-item {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px 10px;
        position: relative;
        transition: all 0.3s ease;
        opacity: 0;
        transform: translateX(-20px);

        &.visible {
          opacity: 1;
          transform: translateX(0);
        }

        &:hover {
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
          font-size: clamp(18px, 3vw, 22px);
          color: white;
          line-height: 1.7;
          font-weight: 600;
          min-height: 22px;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
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
            font-size: clamp(15px, 3.5vw, 18px);
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
    transform: translate(-50%, calc(-50% - 250px));
  }
  100% {
    opacity: 1;
    transform: translate(-50%, calc(-50% - 220px));
  }
}

// 移动端动画
@media (max-width: 768px) {
  @keyframes panoramaTitleFadeIn {
    0% {
      opacity: 0;
      transform: translate(-50%, calc(-50% - 150px));
    }
    100% {
      opacity: 1;
      transform: translate(-50%, calc(-50% - 120px));
    }
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
