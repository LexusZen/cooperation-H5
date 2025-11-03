<template>
  <div class="section section-6" ref="sectionRef">
    <div class="content">
      <h2 class="section-title">新起点，再出发</h2>
      <div class="goals-container">
        <div class="goal-item" v-for="(item, index) in goals" :key="index">
          <div class="goal-number">{{ String(index + 1).padStart(2, '0') }}</div>
          <p class="goal-text">{{ item }}</p>
        </div>
      </div>
      <div class="future-vision">
        <div class="vision-icon">🌅</div>
        <h3>深汕加速度 奋进新征程</h3>
        <p class="vision-desc">
          深汕枢纽设计获批复，深圳30分钟、广州40分钟生活圈即将实现。
          导入深圳优质教育、医疗资源，居民可享受同质基本公共服务。
        </p>
      </div>
      <div class="footer-logo">
        <div class="logo-placeholder">深汕特别合作区 LOGO</div>
        <p class="slogan">深汕加速度 奋进新征程</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAnimation } from '@/composables/useAnimation'
import { useIntersection } from '@/composables/useIntersection'

const sectionRef = ref<HTMLElement | null>(null)
const { fadeInUp, fadeIn, createTimeline } = useAnimation()

const goals = [
  '深圳新一代世界一流汽车城核心承载区',
  '东部板块高质量发展战略引擎',
  '全力打造现代化的滨海新区、产业新城、田园都市',
  '规划建设17个保障房项目，已建成9个，构建"双六十"住房保障体系'
]

useIntersection(sectionRef, () => {
  const tl = createTimeline()
  tl.add(fadeIn('.section-title', { duration: 1 }))
    .add(fadeInUp('.goal-item', { duration: 0.6, delay: 0.1 }), '-=0.5')
    .add(fadeInUp('.future-vision', { duration: 1 }), '-=0.3')
    .add(fadeIn('.footer-logo', { duration: 1 }), '-=0.5')
})
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.section-6 {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: $text-light;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%);
  }

  .content {
    max-width: 1000px;
    width: 100%;
    position: relative;
    z-index: 1;
  }

  .section-title {
    font-size: 48px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 60px;
    letter-spacing: 2px;
  }

  .goals-container {
    display: grid;
    gap: 25px;
    margin-bottom: 60px;

    .goal-item {
      display: flex;
      align-items: flex-start;
      gap: 20px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      padding: 25px 30px;
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateX(10px);
      }

      .goal-number {
        font-size: 36px;
        font-weight: bold;
        color: #fbbf24;
        flex-shrink: 0;
      }

      .goal-text {
        font-size: 18px;
        line-height: 1.8;
        padding-top: 8px;
      }
    }
  }

  .future-vision {
    text-align: center;
    padding: 50px 40px;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(15px);
    border-radius: 20px;
    margin-bottom: 60px;
    border: 2px solid rgba(255, 255, 255, 0.2);

    .vision-icon {
      font-size: 80px;
      margin-bottom: 20px;
      animation: sunrise 3s ease-in-out infinite;
    }

    h3 {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 20px;
      color: #fbbf24;
    }

    .vision-desc {
      font-size: 18px;
      line-height: 2;
      max-width: 800px;
      margin: 0 auto;
      opacity: 0.95;
    }
  }

  .footer-logo {
    text-align: center;
    padding-top: 40px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);

    .logo-placeholder {
      display: inline-block;
      background: rgba(255, 255, 255, 0.15);
      padding: 30px 60px;
      border-radius: 12px;
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 20px;
      border: 2px dashed rgba(255, 255, 255, 0.4);
    }

    .slogan {
      font-size: 24px;
      font-weight: bold;
      color: #fbbf24;
      letter-spacing: 3px;
    }
  }
}

@keyframes sunrise {
  0%, 100% {
    transform: translateY(0);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-10px);
    opacity: 1;
  }
}
</style>
