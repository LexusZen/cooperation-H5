<template>
  <div class="section section-4" ref="sectionRef">
    <div class="content">
      <h2 class="section-title">深圳品质，宜居宜业</h2>
      <div class="categories">
        <div class="category-item">
          <div class="category-icon">🚄</div>
          <h3>交通提速</h3>
          <ul>
            <li>广汕高铁已通车</li>
            <li>深汕高铁加快建设</li>
            <li>深圳30分钟、广州40分钟生活圈</li>
            <li>深汕西高速改扩建全线通车</li>
          </ul>
        </div>
        <div class="category-item">
          <div class="category-icon">🏫</div>
          <h3>优质教育</h3>
          <ul>
            <li>深圳中学高中园已招生</li>
            <li>深职大校区2026年启用</li>
            <li>导入深圳优质教育资源</li>
          </ul>
        </div>
        <div class="category-item">
          <div class="category-icon">🏥</div>
          <h3>医疗保障</h3>
          <ul>
            <li>深汕人民医院2025年底建成</li>
            <li>深圳品质医疗可及</li>
            <li>同质基本公共服务</li>
          </ul>
        </div>
        <div class="category-item">
          <div class="category-icon">🏘️</div>
          <h3>安居工程</h3>
          <ul>
            <li>超2万套保障房落地</li>
            <li>"双六十"住房保障体系</li>
            <li>安居梦照进现实</li>
          </ul>
        </div>
      </div>
      <div class="governance">
        <p class="governance-text">"集成式改革"试点推进，治理效能持续提升</p>
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

useIntersection(sectionRef, () => {
  const tl = createTimeline()
  tl.add(fadeInUp('.section-title', { duration: 0.8 }))
    .add(fadeInUp('.category-item', { duration: 0.6, delay: 0.1 }), '-=0.4')
    .add(fadeInUp('.governance', { duration: 0.8 }), '-=0.3')
})
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.section-4 {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(to bottom, #fef3c7, #fde68a);
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

  .categories {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    margin-bottom: 50px;

    .category-item {
      background: #fff;
      padding: 30px;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .category-icon {
        font-size: 48px;
        margin-bottom: 15px;
      }

      h3 {
        font-size: 24px;
        font-weight: bold;
        color: $primary-color;
        margin-bottom: 20px;
      }

      ul {
        list-style: none;

        li {
          font-size: 16px;
          color: #4b5563;
          line-height: 2;
          padding-left: 20px;
          position: relative;

          &::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #10b981;
            font-weight: bold;
          }
        }
      }
    }
  }

  .governance {
    background: linear-gradient(135deg, $primary-color, #3b82f6);
    padding: 40px;
    border-radius: 16px;
    text-align: center;

    .governance-text {
      font-size: 20px;
      color: #fff;
      font-weight: 500;
      line-height: 1.8;
    }
  }
}
</style>
