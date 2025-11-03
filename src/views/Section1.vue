<template>
  <div class="section section-1" ref="sectionRef">
    <div class="bg-image"></div>
    <div class="content">
      <h1 class="main-title">山海新城，产业高地</h1>
      <div class="subtitle-group">
        <p class="subtitle">地区生产总值奋力跃升</p>
        <p class="highlight">以30%的高增速领跑</p>
      </div>
      <div class="data-cards">
        <div class="data-card" v-for="(item, index) in dataList" :key="index">
          <div class="year">{{ item.year }}</div>
          <div class="value" :ref="el => numberRefs[index] = el as HTMLElement">0</div>
          <div class="label">{{ item.label }}</div>
        </div>
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
import { useAnimation } from '@/composables/useAnimation'

const sectionRef = ref<HTMLElement | null>(null)
const numberRefs = ref<HTMLElement[]>([])
const { fadeIn, fadeInUp, animateNumber, createTimeline } = useAnimation()

const dataList = [
  { year: '2024年', value: 242.15, label: 'GDP(亿元) 增长74.2%' },
  { year: '2024年', value: 207.5, label: '工业增加值增长(%)' },
  { year: '2025上半年', value: 137.38, label: 'GDP(亿元) 增长12.4%' }
]

onMounted(() => {
  const tl = createTimeline()

  tl.add(fadeIn('.main-title', { duration: 1.2 }))
    .add(fadeInUp('.subtitle-group', { duration: 1 }), '-=0.5')
    .add(fadeInUp('.data-cards', { duration: 1 }), '-=0.3')

  // 数字滚动动画
  setTimeout(() => {
    numberRefs.value.forEach((el, index) => {
      if (el) {
        animateNumber(el, dataList[index].value, 2)
      }
    })
  }, 1500)
})
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.section-1 {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $text-light;
  overflow: hidden;

  .bg-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    // 替换为实际图片
    // background-image: url('@/assets/images/section1-bg.jpg');
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
      background: $bg-overlay;
    }
  }

  .content {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 0 20px;
    max-width: 1200px;
  }

  .main-title {
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 30px;
    letter-spacing: 2px;

    @media (max-width: 768px) {
      font-size: 36px;
    }
  }

  .subtitle-group {
    margin-bottom: 60px;

    .subtitle {
      font-size: 20px;
      margin-bottom: 10px;
    }

    .highlight {
      font-size: 24px;
      font-weight: bold;
      color: #fbbf24;
    }
  }

  .data-cards {
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;
    margin-bottom: 80px;

    .data-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      padding: 30px;
      border-radius: 16px;
      min-width: 200px;
      border: 1px solid rgba(255, 255, 255, 0.2);

      .year {
        font-size: 14px;
        opacity: 0.8;
        margin-bottom: 10px;
      }

      .value {
        font-size: 36px;
        font-weight: bold;
        color: #fbbf24;
        margin-bottom: 10px;
      }

      .label {
        font-size: 14px;
        line-height: 1.5;
      }
    }
  }

  .scroll-indicator {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    animation: bounce 2s infinite;

    .arrow {
      font-size: 24px;
      display: block;
      margin-bottom: 5px;
    }

    p {
      font-size: 14px;
      opacity: 0.8;
    }
  }
}
</style>
