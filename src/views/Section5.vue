<template>
  <div class="section section-5" ref="sectionRef">
    <div class="content">
      <h2 class="section-title">以城带乡，振兴共富</h2>
      <div class="achievements-grid">
        <div class="achievement-card" v-for="(item, index) in achievements" :key="index">
          <div class="achievement-number">{{ item.number }}</div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </div>
      </div>
      <div class="infrastructure">
        <h3 class="sub-title">基础设施建设</h3>
        <div class="infra-list">
          <div class="infra-item" v-for="(item, index) in infraData" :key="index">
            <div class="infra-icon">{{ item.icon }}</div>
            <p>{{ item.text }}</p>
          </div>
        </div>
      </div>
      <div class="culture-section">
        <div class="culture-card">
          <div class="culture-emoji">🎉</div>
          <h3>红罗畲族文化</h3>
          <p>文旅与生态，田园丰收季，绿美乡村示范点</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAnimation } from '@/composables/useAnimation'
import { useIntersection } from '@/composables/useIntersection'

const sectionRef = ref<HTMLElement | null>(null)
const { fadeInUp, scaleIn, createTimeline } = useAnimation()

const achievements = [
  {
    number: '6个',
    title: '村企合作项目',
    desc: '精准落地，为集体经济发展注入源头活水'
  },
  {
    number: '9个',
    title: '百万俱乐部',
    desc: '行政村迈入百万俱乐部，1个行政村勇闯千万大关'
  },
  {
    number: '5条',
    title: '都市乡村示范带',
    desc: '"五光十色"绘就示范带，美丽圩镇焕新颜'
  },
  {
    number: '2个',
    title: '全国示范村',
    desc: '村庄入选第三批全国乡村治理示范村'
  }
]

const infraData = [
  { icon: '🛣️', text: '建成四好农村路50.9公里' },
  { icon: '🏗️', text: '建成4个镇(街)级生活垃圾转运站' },
  { icon: '📡', text: '39个行政村5G全覆盖' },
  { icon: '🌐', text: '187个自然村千兆光纤全覆盖' },
  { icon: '🌳', text: '11个惠民公园建成开放' }
]

useIntersection(sectionRef, () => {
  const tl = createTimeline()
  tl.add(fadeInUp('.section-title', { duration: 0.8 }))
    .add(scaleIn('.achievement-card', { duration: 0.6, delay: 0.1 }), '-=0.4')
    .add(fadeInUp('.infrastructure', { duration: 0.8 }), '-=0.3')
    .add(fadeInUp('.culture-section', { duration: 0.8 }), '-=0.3')
})
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.section-5 {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;

  .content {
    max-width: 1200px;
    width: 100%;
  }

  .section-title {
    font-size: 42px;
    font-weight: bold;
    text-align: center;
    color: $text-dark;
    margin-bottom: 60px;
  }

  .achievements-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 25px;
    margin-bottom: 50px;

    .achievement-card {
      background: #fff;
      padding: 30px;
      border-radius: 16px;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .achievement-number {
        font-size: 48px;
        font-weight: bold;
        color: #10b981;
        margin-bottom: 15px;
      }

      h3 {
        font-size: 20px;
        font-weight: bold;
        color: $text-dark;
        margin-bottom: 10px;
      }

      p {
        font-size: 14px;
        color: #6b7280;
        line-height: 1.6;
      }
    }
  }

  .infrastructure {
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    padding: 40px;
    border-radius: 16px;
    margin-bottom: 30px;

    .sub-title {
      font-size: 28px;
      font-weight: bold;
      color: $text-dark;
      text-align: center;
      margin-bottom: 30px;
    }

    .infra-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;

      .infra-item {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px;
        background: #fff;
        border-radius: 12px;

        .infra-icon {
          font-size: 32px;
        }

        p {
          font-size: 15px;
          color: #4b5563;
          font-weight: 500;
        }
      }
    }
  }

  .culture-section {
    .culture-card {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      padding: 40px;
      border-radius: 20px;
      text-align: center;
      color: #fff;

      .culture-emoji {
        font-size: 64px;
        margin-bottom: 20px;
      }

      h3 {
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 15px;
      }

      p {
        font-size: 18px;
        line-height: 1.8;
        opacity: 0.95;
      }
    }
  }
}
</style>
