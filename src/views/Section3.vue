<template>
  <div class="section section-3" ref="sectionRef">
    <div class="content">
      <h2 class="section-title">深汕智造，通达全球</h2>
      <div class="features-grid">
        <div class="feature-card" v-for="(item, index) in features" :key="index">
          <div class="icon">{{ item.icon }}</div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </div>
      </div>
      <div class="world-map">
        <div class="map-container">
          <div class="map-icon">🌍</div>
          <h3>11条国际航线</h3>
          <p class="routes">通达欧洲、南美、东南亚、非洲等地区</p>
          <div class="shipping-info">
            <span class="badge">出口至澳大利亚，最快仅需10天</span>
          </div>
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

const features = [
  {
    icon: '🏭',
    title: '全球首家第1300万辆',
    desc: '新能源汽车下线里程碑工厂'
  },
  {
    icon: '🏢',
    title: '近30家企业汇聚',
    desc: '速腾聚创、壁虎科技等产业链企业'
  },
  {
    icon: '⚡',
    title: '5分钟极速集港',
    desc: '出厂即出海，港厂联动'
  }
]

useIntersection(sectionRef, () => {
  const tl = createTimeline()
  tl.add(fadeInUp('.section-title', { duration: 0.8 }))
    .add(scaleIn('.feature-card', { duration: 0.6, delay: 0.1 }), '-=0.4')
    .add(fadeInUp('.world-map', { duration: 1 }), '-=0.3')
})
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.section-3 {
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  color: $text-light;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  overflow-y: auto;

  .content {
    max-width: 1200px;
    width: 100%;
  }

  .section-title {
    font-size: 42px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 60px;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    margin-bottom: 60px;

    .feature-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      padding: 40px 30px;
      border-radius: 16px;
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
      }

      .icon {
        font-size: 48px;
        margin-bottom: 20px;
      }

      h3 {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 12px;
        color: #fbbf24;
      }

      p {
        font-size: 16px;
        line-height: 1.6;
        opacity: 0.9;
      }
    }
  }

  .world-map {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    padding: 50px;
    border-radius: 20px;
    text-align: center;
    border: 2px solid rgba(255, 255, 255, 0.2);

    .map-container {
      .map-icon {
        font-size: 80px;
        margin-bottom: 20px;
        animation: pulse 2s ease-in-out infinite;
      }

      h3 {
        font-size: 32px;
        font-weight: bold;
        margin-bottom: 15px;
        color: #fbbf24;
      }

      .routes {
        font-size: 18px;
        margin-bottom: 25px;
        opacity: 0.9;
      }

      .shipping-info {
        .badge {
          display: inline-block;
          background: $secondary-color;
          color: #fff;
          padding: 10px 25px;
          border-radius: 30px;
          font-size: 16px;
          font-weight: 500;
        }
      }
    }
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}
</style>
