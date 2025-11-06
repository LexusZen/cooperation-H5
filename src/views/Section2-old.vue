<template>
  <div class="section section-2" ref="sectionRef">
    <div class="content">
      <h2 class="section-title">深汕速度，跨越发展</h2>

      <!-- 时间轴图片展示 - 水平布局 -->
      <div class="timeline-container">
        <div class="timeline-horizontal-line"></div>
        <div class="timeline-items">
          <div
            class="timeline-item"
            v-for="(item, index) in timelineImages"
            :key="index"
            :class="{ active: currentImageIndex >= index }"
          >
            <div class="timeline-node">
              <div class="year-badge">{{ item.year }}</div>
              <div class="timeline-dot"></div>
            </div>
            <div class="timeline-image">
              <img :src="item.image" :alt="item.year" />
            </div>
          </div>
        </div>
      </div>

      <!-- 动态数据图表 - 分组柱状图 -->
      <div class="data-charts">
        <h3 class="chart-title">核心指标增长轨迹 (2022-2024)</h3>

        <!-- 图例 -->
        <div class="chart-legend">
          <div class="legend-item" v-for="(indicator, index) in indicators" :key="index">
            <span class="legend-color" :style="{ background: indicator.color }"></span>
            <span class="legend-name">{{ indicator.name }}</span>
          </div>
        </div>

        <!-- 统一柱状图 -->
        <div class="unified-bar-chart">
          <div class="chart-content">
            <div class="y-axis">
              <div class="y-label" v-for="n in 6" :key="n">{{ (maxValue - (n - 1) * (maxValue / 5)).toFixed(1) }}</div>
            </div>

            <div class="bars-container">
              <div class="year-group" v-for="(year, yearIndex) in years" :key="yearIndex">
                <div class="bars-wrapper">
                  <div
                    class="bar"
                    v-for="(indicator, indIndex) in indicators"
                    :key="indIndex"
                    :style="{
                      height: (year.values[indIndex] / maxValue * 100) + '%',
                      background: indicator.color
                    }"
                  >
                    <span class="bar-value">{{ year.values[indIndex] }}</span>
                  </div>
                </div>
                <div class="year-label">{{ year.year }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 重点项目展示 -->
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
import { ref, onMounted } from 'vue'
import { useAnimation } from '@/composables/useAnimation'

const sectionRef = ref<HTMLElement | null>(null)
const currentImageIndex = ref(-1)
const { fadeInUp, createTimeline } = useAnimation()

// 时间轴图片数据
const timelineImages = [
  {
    year: '2022年4月',
    image: '/images/section2/timeline-2022.jpg'
  },
  {
    year: '2023年5月',
    image: '/images/section2/timeline-2023.jpg'
  },
  {
    year: '2025年5月',
    image: '/images/section2/timeline-2025.jpg'
  }
]

// 分组柱状图数据 - 每年显示4个指标
const indicators = [
  { name: '工业产值(百亿)', color: '#93c5fd' },
  { name: '新能源汽车产量(十万辆)', color: '#fbbf24' },
  { name: '固定资产投资(百亿)', color: '#f97316' },
  { name: '基建投资增长率(%)', color: '#3b82f6' }
]

const years = [
  {
    year: '2022',
    values: [3.2, 3.5, 1.8, 18.5]  // 对应上面4个指标
  },
  {
    year: '2023',
    values: [5.8, 7.5, 3.1, 25.2]
  },
  {
    year: '2024',
    values: [8.5, 12, 4.2, 31.5]
  }
]

const maxValue = 12  // Y轴最大值

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

onMounted(() => {
  // 使用 Intersection Observer 监听板块是否可见
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 当板块进入视口时，开始播放动画
          startAnimations()
          // 动画开始后取消监听，避免重复触发
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.2 // 当板块20%可见时触发
    }
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})

const startAnimations = () => {
  const tl = createTimeline()

  // 标题动画
  tl.add(fadeInUp('.section-2 .section-title', { duration: 1 }))

  // 时间轴图片逐个显示 - 延长间隔
  tl.add(() => {
    currentImageIndex.value = 0
  }, '+=0.5')

  tl.add(() => {
    currentImageIndex.value = 1
  }, '+=1.2')

  tl.add(() => {
    currentImageIndex.value = 2
  }, '+=1.2')

  // 图表动画
  tl.add(fadeInUp('.section-2 .data-charts', { duration: 1 }), '+=0.5')

  // 项目卡片动画
  tl.add(fadeInUp('.section-2 .key-projects', { duration: 1 }), '+=0.3')
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.section-2 {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(to bottom, #ffffff, #b4d8e8);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 60px 20px;

  .content {
    max-width: 1200px;
    width: 100%;
  }

  .section-title {
    font-size: clamp(28px, 5vw, 42px);
    font-weight: bold;
    text-align: center;
    color: rgb(22, 93, 255);
    margin-bottom: 40px;
    letter-spacing: 2px;
  }

  // 时间轴图片展示 - 水平布局
  .timeline-container {
    position: relative;
    margin-bottom: 60px;
    padding: 40px 20px;

    // 水平时间线
    .timeline-horizontal-line {
      position: absolute;
      left: 50px;
      right: 50px;
      top: 70px;
      height: 4px;
      background: linear-gradient(to right, rgb(22, 93, 255), #3b82f6);
      z-index: 0;

      @media (max-width: 1024px) {
        left: 20px;
        right: 20px;
      }
    }

    .timeline-items {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 20px;
      position: relative;

      @media (max-width: 768px) {
        flex-direction: column;
        gap: 50px;
      }
    }

    .timeline-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      opacity: 0;
      transform: scale(0.9) translateY(20px);
      transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);

      &.active {
        opacity: 1;
        transform: scale(1) translateY(0);
      }

      // 时间节点区域
      .timeline-node {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        margin-bottom: 20px;
        z-index: 2;

        .year-badge {
          background: linear-gradient(135deg, rgb(22, 93, 255), #3b82f6);
          color: white;
          padding: 8px 20px;
          border-radius: 20px;
          font-size: clamp(14px, 2.5vw, 16px);
          font-weight: bold;
          box-shadow: 0 4px 12px rgba(22, 93, 255, 0.3);
          white-space: nowrap;
          transition: all 0.3s ease;
        }

        .timeline-dot {
          width: 20px;
          height: 20px;
          background: rgb(22, 93, 255);
          border: 4px solid white;
          border-radius: 50%;
          box-shadow: 0 0 0 4px rgba(22, 93, 255, 0.2);
          transition: all 0.3s ease;
          position: relative;

          &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            background: inherit;
            border-radius: 50%;
            opacity: 0;
          }
        }
      }

      &.active .timeline-node {
        .year-badge {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(22, 93, 255, 0.4);
        }

        .timeline-dot {
          background: #fbbf24;
          box-shadow: 0 0 0 4px rgba(251, 191, 36, 0.3),
                      0 0 20px rgba(251, 191, 36, 0.5);
          animation: pulse 2s ease-in-out infinite;

          &::before {
            animation: particle-burst 2s ease-out infinite;
          }

          &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 8px;
            height: 8px;
            background: white;
            border-radius: 50%;
            box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
          }
        }
      }

      // 实景图片
      .timeline-image {
        width: 100%;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        background: white;
        padding: 10px;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
        }

        img {
          width: 100%;
          height: auto;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          display: block;
          border-radius: 12px;
          transition: transform 0.3s ease;
        }

        &:hover img {
          transform: scale(1.05);
        }
      }

    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.3);
    }
  }

  @keyframes particle-burst {
    0% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(3);
    }
  }

  // 动态数据图表 - 分组柱状图
  .data-charts {
    background: white;
    border-radius: 20px;
    padding: 40px 30px;
    margin-bottom: 50px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);

    @media (max-width: 768px) {
      padding: 30px 20px;
    }

    .chart-title {
      font-size: clamp(22px, 4vw, 28px);
      font-weight: bold;
      color: $text-dark;
      text-align: center;
      margin-bottom: 25px;
    }

    // 图例
    .chart-legend {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 20px;
      margin-bottom: 30px;

      .legend-item {
        display: flex;
        align-items: center;
        gap: 8px;

        .legend-color {
          width: 16px;
          height: 16px;
          border-radius: 3px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .legend-name {
          font-size: clamp(12px, 2.5vw, 14px);
          color: #6b7280;
        }
      }
    }

    // 统一柱状图
    .unified-bar-chart {
      width: 100%;
      overflow-x: auto;

      .chart-content {
        position: relative;
        min-width: 500px;
        height: 400px;
        display: flex;
        flex-direction: column;
        padding-left: 50px;
        padding-bottom: 30px;

        @media (max-width: 768px) {
          height: 350px;
        }

        // Y轴
        .y-axis {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 60px;
          width: 45px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-right: 2px solid #e5e7eb;

          .y-label {
            font-size: clamp(10px, 2vw, 12px);
            color: #9ca3af;
            text-align: right;
            padding-right: 8px;
            line-height: 1;
            transform: translateY(-50%);
          }
        }

        // 柱子容器
        .bars-container {
          display: flex;
          justify-content: space-around;
          align-items: flex-end;
          padding: 0 20px;
          gap: 40px;
          position: relative;
          height: calc(100% - 30px);
          border-bottom: 2px solid #e5e7eb;

          @media (max-width: 768px) {
            gap: 20px;
            padding: 0 10px;
          }

          .year-group {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            max-width: 200px;
            height: 100%;

            .bars-wrapper {
              width: 100%;
              flex: 1;
              display: flex;
              justify-content: center;
              align-items: flex-end;
              gap: 8px;
              margin-bottom: 0;

              @media (max-width: 768px) {
                gap: 4px;
              }

              .bar {
                flex: 1;
                max-width: 45px;
                min-width: 30px;
                border-radius: 6px 6px 0 0;
                position: relative;
                transition: height 1.8s cubic-bezier(0.34, 1.56, 0.64, 1);
                box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
                display: flex;
                align-items: flex-start;
                justify-content: center;
                padding-top: 6px;

                @media (max-width: 768px) {
                  max-width: 35px;
                  min-width: 25px;
                }

                &:hover {
                  transform: translateY(-3px);
                  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.15);
                }

                .bar-value {
                  font-size: clamp(9px, 1.8vw, 11px);
                  font-weight: bold;
                  color: #1f2937;
                  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);
                }
              }
            }

            .year-label {
              position: absolute;
              bottom: -30px;
              font-size: clamp(13px, 2.8vw, 15px);
              color: $text-dark;
              font-weight: 600;
            }
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
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 25px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }

      .project-card {
        background: white;
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
          height: 200px;
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

@keyframes shimmer {
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>
