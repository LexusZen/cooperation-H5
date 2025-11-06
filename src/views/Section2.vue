<template>
  <div class="section section-2" ref="sectionRef">
    <div class="content">
      <h2 class="section-title">深汕速度，跨越发展</h2>

      <!-- 竖向时间轴 -->
      <div class="timeline-vertical">
        <!-- 中心连接线 -->
        <div class="timeline-line"></div>

        <!-- 时间节点 -->
        <div
          class="timeline-node"
          v-for="(item, index) in timelineData"
          :key="index"
          :class="{
            'node-left': index % 2 === 0,
            'node-right': index % 2 === 1,
            active: visibleNodes >= index
          }"
        >
          <!-- 年份标签 -->
          <div class="year-badge">{{ item.year }}</div>

          <!-- 中心圆点 -->
          <div class="timeline-dot"></div>

          <!-- 内容卡片 -->
          <div class="timeline-card">
            <div class="card-image">
              <img :src="item.image" :alt="item.year" />
            </div>
            <div class="card-content">
              <h4>{{ item.title }}</h4>
              <p>{{ displayTexts[index] || '' }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 重点项目展示（保留） -->
      <div class="key-projects">
        <h3 class="projects-title">重点项目实景</h3>
        <div class="projects-grid">
          <div
            class="project-card"
            v-for="(project, index) in projects"
            :key="index"
          >
            <div class="project-image">
              <img :src="project.image" :alt="project.title" />
            </div>
            <div class="project-info">
              <div class="project-badge">{{ project.badge }}</div>
              <h4 class="project-title">{{ project.title }}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useIntersection } from '@/composables/useIntersection'
import { useTypewriter } from '@/composables/useTypewriter'

const sectionRef = ref<HTMLElement | null>(null)
const visibleNodes = ref(-1)
const displayTexts = ref<string[]>(['', '', ''])

const { typeText } = useTypewriter()

// 时间轴数据
const timelineData = [
  {
    year: '2022年4月',
    title: '起步阶段',
    desc: '深汕合作区启动基础设施建设，招商引资全面展开',
    image: '/images/section2/timeline-2022.jpg'
  },
  {
    year: '2023年5月',
    title: '加速发展',
    desc: '比亚迪二期项目启动，从动工到投产仅10个月',
    image: '/images/section2/timeline-2023.jpg'
  },
  {
    year: '2025年5月',
    title: '跨越突破',
    desc: '四期电池包项目从签约到投产仅半年，深汕速度创新高',
    image: '/images/section2/timeline-2025.jpg'
  }
]

// 重点项目数据
const projects = [
  {
    badge: '10个月',
    title: '深汕比亚迪汽车工业园二期东地块从动工到投产仅10个月',
    image: '/images/section2/timeline-2023.jpg'
  },
  {
    badge: '半年',
    title: '深汕比亚迪汽车工业园四期电池包PACK项目从签约到投产仅半年',
    image: '/images/section2/timeline-2025.jpg'
  },
  {
    badge: '2025年',
    title: '1-7月基础设施投资增长31.5%，基建提速赋能发展强化',
    image: '/images/section2/timeline-2022.jpg'
  }
]

// 监听可见性，逐个显示节点
useIntersection(sectionRef, () => {
  timelineData.forEach((item, index) => {
    setTimeout(() => {
      visibleNodes.value = index

      // 节点出现后，文字打字机效果
      setTimeout(() => {
        typeText(
          item.desc,
          (displayText) => {
            displayTexts.value[index] = displayText
          },
          {
            speed: 30,
            delay: 0
          }
        )
      }, 500)
    }, index * 800)
  })
}, { threshold: 0.2 })
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.section-2 {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(to bottom, rgb(229, 238, 255), #e0f2fe);
  padding: 60px 20px;

  .content {
    max-width: 1000px;
    margin: 0 auto;
  }

  .section-title {
    font-size: clamp(28px, 5vw, 42px);
    font-weight: bold;
    text-align: center;
    color: rgb(22, 93, 255);
    margin-bottom: 60px;
  }

  // 竖向时间轴
  .timeline-vertical {
    position: relative;
    padding: 40px 0;
    margin-bottom: 60px;

    // 中心连接线
    .timeline-line {
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 4px;
      background: linear-gradient(to bottom, #3b82f6, #93c5fd);
      transform: translateX(-50%);

      @media (max-width: 768px) {
        left: 30px;
      }
    }

    // 时间节点
    .timeline-node {
      position: relative;
      margin-bottom: 60px;
      opacity: 0;
      transform: scale(0.8);
      transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);

      &:last-child {
        margin-bottom: 0;
      }

      &.active {
        opacity: 1;
        transform: scale(1);
      }

      // 年份标签
      .year-badge {
        position: absolute;
        top: 0;
        background: linear-gradient(135deg, #3b82f6, #1e40af);
        color: white;
        padding: 10px 24px;
        border-radius: 30px;
        font-size: clamp(14px, 2.5vw, 16px);
        font-weight: bold;
        box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
        white-space: nowrap;
        z-index: 2;
      }

      // 中心圆点
      .timeline-dot {
        position: absolute;
        top: 8px;
        width: 20px;
        height: 20px;
        background: #fbbf24;
        border: 4px solid white;
        border-radius: 50%;
        box-shadow: 0 0 0 4px rgba(251, 191, 36, 0.3), 0 0 20px rgba(251, 191, 36, 0.5);
        z-index: 3;
        animation: pulse 2s ease-in-out infinite;
      }

      // 内容卡片
      .timeline-card {
        width: 70%;
        max-width: 400px;
        background: rgba(229, 238, 255, 0.95);
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
        }

        .card-image {
          width: 100%;
          height: 180px;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
          }

          &:hover img {
            transform: scale(1.1);
          }
        }

        .card-content {
          padding: 20px;

          h4 {
            font-size: clamp(16px, 3vw, 18px);
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 10px;
          }

          p {
            font-size: clamp(13px, 2.5vw, 14px);
            color: #6b7280;
            line-height: 1.6;
            min-height: 40px;
          }
        }
      }

      // 左侧节点
      &.node-left {
        display: flex;
        justify-content: flex-end;
        padding-right: calc(50% + 40px);

        .year-badge {
          right: calc(50% + 60px);
        }

        .timeline-dot {
          left: calc(50% - 10px);
        }

        @media (max-width: 768px) {
          justify-content: flex-start;
          padding-right: 0;
          padding-left: 70px;

          .year-badge {
            left: 70px;
            right: auto;
          }

          .timeline-dot {
            left: 20px;
          }
        }
      }

      // 右侧节点
      &.node-right {
        display: flex;
        justify-content: flex-start;
        padding-left: calc(50% + 40px);

        .year-badge {
          left: calc(50% + 60px);
        }

        .timeline-dot {
          right: calc(50% - 10px);
        }

        @media (max-width: 768px) {
          padding-left: 70px;

          .year-badge {
            left: 70px;
          }

          .timeline-dot {
            left: 20px;
            right: auto;
          }
        }
      }
    }
  }

  // 重点项目展示
  .key-projects {
    .projects-title {
      font-size: clamp(22px, 4vw, 28px);
      font-weight: bold;
      color: $text-dark;
      text-align: center;
      margin-bottom: 30px;
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 25px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }

      .project-card {
        background: rgba(229, 238, 255, 0.95);
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;

        &:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
        }

        .project-image {
          width: 100%;
          height: 180px;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
          }

          &:hover img {
            transform: scale(1.1);
          }
        }

        .project-info {
          padding: 20px;

          .project-badge {
            display: inline-block;
            background: linear-gradient(135deg, $primary-color, $secondary-color);
            color: white;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: clamp(12px, 2.5vw, 14px);
            font-weight: bold;
            margin-bottom: 12px;
          }

          .project-title {
            font-size: clamp(14px, 3vw, 16px);
            line-height: 1.6;
            color: $text-dark;
            font-weight: 500;
          }
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
    transform: scale(1.2);
    box-shadow: 0 0 0 6px rgba(251, 191, 36, 0.4), 0 0 30px rgba(251, 191, 36, 0.6);
  }
}

// 小屏手机优化
@media (max-width: 480px) {
  .section-2 {
    .timeline-vertical {
      .timeline-node {
        margin-bottom: 40px;

        .timeline-card {
          width: 85%;
          max-width: 100%;

          .card-image {
            height: 140px;
          }

          .card-content {
            padding: 15px;

            h4 {
              font-size: 14px;
              margin-bottom: 8px;
            }

            p {
              font-size: 12px;
              min-height: 36px;
            }
          }
        }
      }
    }

    .key-projects {
      .projects-grid {
        gap: 20px;

        .project-card {
          .project-image {
            height: 150px;
          }

          .project-info {
            padding: 15px;
          }
        }
      }
    }
  }
}
</style>
