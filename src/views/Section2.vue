<template>
  <div class="section section-2" ref="sectionRef">
    <div class="content">
      <h2 class="section-title">深汕速度，跨越发展</h2>
      <div class="timeline">
        <div class="timeline-item" v-for="(item, index) in timelineData" :key="index">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="timeline-badge">{{ item.badge }}</div>
            <h3>{{ item.title }}</h3>
            <p class="desc">{{ item.desc }}</p>
          </div>
        </div>
      </div>
      <div class="achievement">
        <div class="achievement-item">
          <span class="number">31.5</span>
          <span class="unit">%</span>
          <p class="label">2025年1-7月基础设施投资增长</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAnimation } from '@/composables/useAnimation'
import { useIntersection } from '@/composables/useIntersection'

const sectionRef = ref<HTMLElement | null>(null)
const { fadeInUp, createTimeline } = useAnimation()

const timelineData = [
  {
    badge: '10个月',
    title: '深汕比亚迪汽车工业园二期东地块',
    desc: '从动工到投产仅10个月'
  },
  {
    badge: '半年',
    title: '深汕比亚迪四期电池包PACK项目',
    desc: '从签约到投产仅半年'
  }
]

useIntersection(sectionRef, () => {
  const tl = createTimeline()
  tl.add(fadeInUp('.section-title', { duration: 0.8 }))
    .add(fadeInUp('.timeline-item', { duration: 0.8, delay: 0.2 }), '-=0.4')
    .add(fadeInUp('.achievement', { duration: 0.8 }), '-=0.4')
})
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.section-2 {
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom, #f3f4f6, #ffffff);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;

  .content {
    max-width: 1000px;
    width: 100%;
  }

  .section-title {
    font-size: 42px;
    font-weight: bold;
    text-align: center;
    color: $text-dark;
    margin-bottom: 60px;
  }

  .timeline {
    position: relative;
    padding-left: 40px;
    margin-bottom: 60px;

    &::before {
      content: '';
      position: absolute;
      left: 10px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(to bottom, $primary-color, $secondary-color);
    }

    .timeline-item {
      position: relative;
      margin-bottom: 40px;

      .timeline-dot {
        position: absolute;
        left: -34px;
        top: 5px;
        width: 16px;
        height: 16px;
        background: $primary-color;
        border-radius: 50%;
        border: 3px solid #fff;
        box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.2);
      }

      .timeline-content {
        background: #fff;
        padding: 24px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

        .timeline-badge {
          display: inline-block;
          background: $secondary-color;
          color: #fff;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 12px;
        }

        h3 {
          font-size: 20px;
          color: $text-dark;
          margin-bottom: 8px;
        }

        .desc {
          font-size: 16px;
          color: #6b7280;
          line-height: 1.6;
        }
      }
    }
  }

  .achievement {
    text-align: center;
    padding: 40px;
    background: linear-gradient(135deg, $primary-color, $secondary-color);
    border-radius: 16px;
    color: #fff;

    .achievement-item {
      .number {
        font-size: 64px;
        font-weight: bold;
      }

      .unit {
        font-size: 36px;
        font-weight: bold;
        margin-left: 5px;
      }

      .label {
        font-size: 18px;
        margin-top: 10px;
        opacity: 0.95;
      }
    }
  }
}
</style>
