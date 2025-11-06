<template>
  <div class="section section-6" ref="sectionRef">
    <div class="content">
      <h2 class="section-title">新起点，再出发</h2>

      <!-- 核心定位目标（要点形式） -->
      <div class="goals-list">
        <div class="goal-item" v-for="(goal, index) in goals" :key="index">
          <div class="goal-number">{{ String(index + 1).padStart(2, '0') }}</div>
          <p class="goal-text">{{ goal }}</p>
        </div>
      </div>

      <!-- 城市效果图 -->
      <div class="city-design">
        <img
          src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800"
          alt="深汕城市设计效果图"
        />
        <p class="image-caption">深汕城市设计效果图</p>
      </div>

      <!-- 底部logo和标语 -->
      <div class="footer-section">
        <div class="logo-wrapper">
          <img src="/images/section6/logo.png" alt="深汕特别合作区" class="logo" />
        </div>
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
const { fadeInUp, createTimeline } = useAnimation()

// 核心定位目标
const goals = [
  '深圳新一代世界一流汽车城核心承载区',
  '东部板块高质量发展战略引擎',
  '全力打造现代化的滨海新区、产业新城、田园都市，规划建设17个保障房项目，已建成9个。加快构建"双六十"住房保障体系。',
  '深汕特别合作区推动经济社会与资源环境协调发展。深汕枢纽设计获批复，深圳30分钟、广州40分钟生活圈即将实现。导入深圳优质教育、医疗资源，居民可享受同质基本公共服务。'
]

// 监听页面可见性，触发动画
useIntersection(sectionRef, () => {
  const tl = createTimeline()
  tl.add(fadeInUp('.section-6 .section-title', { duration: 0.8 }))
    .add(fadeInUp('.section-6 .goals-list', { duration: 0.8 }), '-=0.4')
    .add(fadeInUp('.section-6 .city-design', { duration: 0.8 }), '-=0.3')
    .add(fadeInUp('.section-6 .slogan', { duration: 0.8 }), '-=0.3')

  // Logo特殊动画：延迟后缩放+旋转出现
  setTimeout(() => {
    const logo = document.querySelector('.section-6 .logo')
    if (logo) {
      logo.classList.add('logo-animate')
    }
  }, 2000)
})
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.section-6 {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(to bottom, rgb(229, 238, 255), #b4d8e8);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 15px;
  position: relative;

  .content {
    max-width: 100%;
    width: 100%;
    position: relative;
    z-index: 1;
  }

  .section-title {
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    color: #fff;
    margin-bottom: 30px;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
    letter-spacing: 2px;
  }

  // 目标列表
  .goals-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 30px;
    padding: 0 10px;

    .goal-item {
      display: flex;
      gap: 12px;
      align-items: flex-start;
      background: linear-gradient(135deg, rgba(229, 238, 255, 0.98) 0%, rgba(229, 238, 255, 0.95) 100%);
      backdrop-filter: blur(15px);
      padding: 20px 18px;
      border-radius: 16px;
      border: 2px solid rgba(255, 255, 255, 0.6);
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.8);
      transition: all 0.5s ease;
      position: relative;
      overflow: hidden;
      perspective: 1000px;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);
        transform: translate(-50%, -50%) scale(0);
        border-radius: 50%;
        transition: transform 0.6s ease;
      }

      &:hover {
        background: linear-gradient(135deg, rgba(229, 238, 255, 1) 0%, rgba(229, 238, 255, 1) 100%);
        transform: translateX(8px) rotateY(5deg);
        box-shadow: 0 10px 35px rgba(0, 0, 0, 0.25), 0 0 20px rgba(102, 126, 234, 0.3);
        border-color: rgba(102, 126, 234, 0.4);

        &::before {
          transform: translate(-50%, -50%) scale(2);
        }
      }

      .goal-number {
        width: 45px;
        height: 45px;
        min-width: 45px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: #fff;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4), 0 0 0 0 rgba(102, 126, 234, 0.4);
        flex-shrink: 0;
        position: relative;
        animation: breathingGlow 3s ease-in-out infinite;

        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 12px;
          background: inherit;
          filter: blur(8px);
          opacity: 0.5;
          z-index: -1;
        }
      }

      .goal-text {
        flex: 1;
        font-size: 14px;
        color: #1f2937;
        line-height: 1.7;
        margin: 0;
      }
    }
  }

  // 城市效果图
  .city-design {
    margin-bottom: 30px;
    padding: 0 10px;

    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
      margin-bottom: 10px;
    }

    .image-caption {
      text-align: center;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.9);
      font-weight: 500;
    }
  }

  // 底部logo和标语
  .footer-section {
    text-align: center;
    padding: 30px 20px 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);

    .logo-wrapper {
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      align-items: center;

      .logo {
        max-width: 180px;
        height: auto;
        filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
        display: block;
        opacity: 0;
        transform: scale(0) rotate(-180deg);
        transition: all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);

        &.logo-animate {
          opacity: 1;
          transform: scale(1) rotate(0deg);
          filter: drop-shadow(0 8px 20px rgba(251, 191, 36, 0.6));
          animation: logoPulse 2s ease-in-out infinite;
        }
      }
    }

    .slogan {
      font-size: 20px;
      font-weight: bold;
      color: #fbbf24;
      letter-spacing: 3px;
      text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
      margin: 0;
    }
  }

  // 平板适配（480px以上）
  @media (min-width: 480px) {
    padding: 50px 20px;

    .section-title {
      font-size: 36px;
      margin-bottom: 35px;
    }

    .goals-list {
      gap: 18px;
      margin-bottom: 35px;
      padding: 0 15px;

      .goal-item {
        padding: 20px 18px;
        gap: 15px;

        .goal-number {
          width: 45px;
          height: 45px;
          min-width: 45px;
          font-size: 20px;
        }

        .goal-text {
          font-size: 15px;
          line-height: 1.7;
        }
      }
    }

    .city-design {
      margin-bottom: 35px;
      padding: 0 15px;

      img {
        height: 250px;
      }

      .image-caption {
        font-size: 15px;
      }
    }

    .footer-section {
      padding: 35px 20px 25px;

      .logo-wrapper .logo {
        max-width: 200px;
      }

      .slogan {
        font-size: 22px;
      }
    }
  }

  // PC端适配（768px以上）
  @media (min-width: 768px) {
    padding: 60px 30px;

    .content {
      max-width: 1200px;
    }

    .section-title {
      font-size: 42px;
      margin-bottom: 45px;
    }

    .goals-list {
      gap: 22px;
      margin-bottom: 45px;
      padding: 0;

      .goal-item {
        padding: 25px 22px;
        gap: 18px;

        .goal-number {
          width: 50px;
          height: 50px;
          min-width: 50px;
          font-size: 22px;
        }

        .goal-text {
          font-size: 16px;
          line-height: 1.75;
        }
      }
    }

    .city-design {
      margin-bottom: 45px;
      padding: 0;

      img {
        height: 300px;
      }

      .image-caption {
        font-size: 16px;
        margin-top: 12px;
      }
    }

    .footer-section {
      padding: 45px 30px 30px;

      .logo-wrapper .logo {
        max-width: 220px;
      }

      .slogan {
        font-size: 26px;
      }
    }
  }

  // 大屏优化（1024px以上）
  @media (min-width: 1024px) {
    padding: 80px 40px;

    .section-title {
      font-size: 48px;
      margin-bottom: 55px;
    }

    .goals-list {
      gap: 25px;
      margin-bottom: 55px;

      .goal-item {
        padding: 28px 25px;
        gap: 20px;

        .goal-number {
          width: 55px;
          height: 55px;
          min-width: 55px;
          font-size: 24px;
        }

        .goal-text {
          font-size: 17px;
          line-height: 1.8;
        }
      }
    }

    .city-design {
      margin-bottom: 55px;

      img {
        height: 350px;
      }

      .image-caption {
        font-size: 17px;
        margin-top: 15px;
      }
    }

    .footer-section {
      padding: 50px 40px 35px;

      .logo-wrapper .logo {
        max-width: 250px;
      }

      .slogan {
        font-size: 28px;
        letter-spacing: 4px;
      }
    }
  }

  // Logo脉冲动画
  @keyframes logoPulse {
    0%,
    100% {
      transform: scale(1) rotate(0deg);
      filter: drop-shadow(0 8px 20px rgba(251, 191, 36, 0.6));
    }
    50% {
      transform: scale(1.1) rotate(0deg);
      filter: drop-shadow(0 12px 30px rgba(251, 191, 36, 0.9));
    }
  }

  // 呼吸光晕动画
  @keyframes breathingGlow {
    0%, 100% {
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4), 0 0 15px rgba(102, 126, 234, 0.3);
    }
    50% {
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.6), 0 0 30px rgba(102, 126, 234, 0.5);
    }
  }
}
</style>
