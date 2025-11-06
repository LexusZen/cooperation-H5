<template>
  <div class="section section-3" ref="sectionRef">
    <!-- 背景图 -->
    <div class="bg-image"></div>

    <div class="content">
      <h2 class="section-title">深汕智造，通达全球</h2>

      <!-- 小标题列表 -->
      <div class="highlights-section">
        <div class="highlights-list">
          <div class="highlight-item" v-for="(item, index) in highlights" :key="index">
            <div class="dot"></div>
            <div class="text">{{ item }}</div>
          </div>
        </div>
      </div>

      <!-- 版面翻页设计：左侧图表 + 右侧说明 -->
      <div class="data-display-section">
        <!-- 左侧：动态图表 -->
        <div class="chart-container">
          <h3 class="chart-title">核心经济数据</h3>
          <div class="chart-wrapper">
            <div class="chart-bars">
              <div
                class="bar-item"
                v-for="(item, index) in chartData"
                :key="index"
                @click="showTooltip(item)"
              >
                <div class="bar-wrapper">
                  <div
                    class="bar"
                    :style="{
                      height: (item.value / maxValue * 100) + '%',
                      background: item.color
                    }"
                  >
                    <span class="bar-value">{{ item.value }}{{ item.unit }}</span>
                  </div>
                </div>
                <div class="bar-label">{{ item.label }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：文字说明 -->
        <div class="description-container">
          <div class="description-card">
            <h3>产业发展亮点</h3>
            <div class="desc-item" v-for="(desc, index) in descriptions" :key="index">
              <div class="desc-icon">{{ desc.icon }}</div>
              <div class="desc-content">
                <h4>{{ desc.title }}</h4>
                <p>{{ desc.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 数据条点击弹出注释 -->
      <div class="tooltip" v-if="activeTooltip" :class="{ show: activeTooltip }">
        <div class="tooltip-content" @click.stop>
          <button class="close-btn" @click="activeTooltip = null">×</button>
          <h4>{{ activeTooltip.label }}</h4>
          <p class="tooltip-value">{{ activeTooltip.value }}{{ activeTooltip.unit }}</p>
          <p class="tooltip-desc">{{ activeTooltip.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAnimation } from '@/composables/useAnimation'
import { useIntersection } from '@/composables/useIntersection'

const sectionRef = ref<HTMLElement | null>(null)
const { fadeInUp, createTimeline } = useAnimation()
const activeTooltip = ref<any>(null)

// 小标题数据
const highlights = [
  '全球首家达成第1300万辆新能源汽车下线里程碑的工厂',
  '速腾聚创、壁虎科技等近30家企业汇聚',
  '5分钟极速集港，出厂即出海🌍',
  '11条国际航线，通达欧洲、南美、东南亚、非洲等地区',
  '出口至澳大利亚，最快仅需10天即可抵达'
]

// 图表数据（核心经济数据）
const chartData = [
  {
    label: '工业产值',
    value: 850,
    unit: '亿元',
    color: 'linear-gradient(to top, #3b82f6, #60a5fa)',
    description: '2024年规模以上工业总产值达850亿元，同比增长68.5%，主要由汽车制造业驱动'
  },
  {
    label: '出口总额',
    value: 320,
    unit: '亿元',
    color: 'linear-gradient(to top, #10b981, #34d399)',
    description: '2024年出口总额320亿元，同比增长125%，产品远销全球70多个国家和地区'
  },
  {
    label: '企业数量',
    value: 180,
    unit: '家',
    color: 'linear-gradient(to top, #f59e0b, #fbbf24)',
    description: '已入驻规模以上工业企业180家，形成完整的新能源汽车产业链生态'
  },
  {
    label: '就业人数',
    value: 42000,
    unit: '人',
    color: 'linear-gradient(to top, #8b5cf6, #a78bfa)',
    description: '园区提供就业岗位超4.2万个，带动周边地区经济发展和人员就业'
  },
  {
    label: '航运吞吐量',
    value: 280,
    unit: '万标箱',
    color: 'linear-gradient(to top, #ec4899, #f472b6)',
    description: '小漠国际物流港年吞吐量达280万标准箱，5分钟极速集港效率全球领先'
  }
]

// 计算最大值用于柱状图高度
const maxValue = computed(() => {
  const values = chartData.map(item => item.value)
  return Math.max(...values)
})

// 右侧文字说明
const descriptions = [
  {
    icon: '🏭',
    title: '产业集群优势',
    text: '深汕合作区已形成以新能源汽车为核心的完整产业链，涵盖整车制造、零部件生产、物流配套等全产业链条。'
  },
  {
    icon: '🌏',
    title: '全球化布局',
    text: '依托小漠国际物流港，开通11条国际航线，产品快速通达欧洲、南美、东南亚、非洲等全球市场。'
  },
  {
    icon: '⚡',
    title: '高效物流体系',
    text: '创新"港厂联动"模式，实现5分钟极速集港，出厂即出海，大幅缩短物流时间，降低企业成本。'
  },
  {
    icon: '🚀',
    title: '创新发展动力',
    text: '汇聚速腾聚创、壁虎科技等近30家创新型企业，持续推动产业转型升级和技术创新突破。'
  }
]

// 显示提示框
const showTooltip = (item: any) => {
  activeTooltip.value = item
}

// 监听页面可见性，触发动画
useIntersection(sectionRef, () => {
  const tl = createTimeline()
  tl.add(fadeInUp('.section-3 .section-title', { duration: 0.8 }))
    .add(fadeInUp('.section-3 .highlights-section', { duration: 0.8 }), '-=0.4')
    .add(fadeInUp('.section-3 .data-display-section', { duration: 1 }), '-=0.3')
})
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.section-3 {
  position: relative;
  width: 100%;
  min-height: 100vh;
  color: $text-light;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 60px 20px;
  overflow: hidden;

  // 背景图
  .bg-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/images/section3/bg-industry.jpg');
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
      background: rgba(0, 0, 0, 0.2);
    }
  }

  .content {
    position: relative;
    z-index: 1;
    max-width: 1400px;
    width: 100%;
  }

  .section-title {
    font-size: clamp(32px, 5vw, 48px);
    font-weight: bold;
    text-align: center;
    margin-bottom: 40px;
    color: rgb(22, 93, 255);
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  }

  // 小标题列表
  .highlights-section {
    margin-bottom: 40px;

    .highlights-list {
      background: rgba(248, 250, 252, 0.85);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      max-width: 1200px;
      margin: 0 auto;

      .highlight-item {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 12px 0;
        border-bottom: 1px solid rgba(22, 93, 255, 0.1);

        &:last-child {
          border-bottom: none;
        }

        .dot {
          width: 12px;
          height: 12px;
          background: rgb(22, 93, 255);
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 8px rgba(22, 93, 255, 0.5);
        }

        .text {
          flex: 1;
          font-size: clamp(13px, 2.5vw, 16px);
          color: #1f2937;
          line-height: 1.6;
          font-weight: 500;
        }
      }

      @media (max-width: 768px) {
        padding: 20px 15px;

        .highlight-item {
          gap: 10px;
          padding: 10px 0;

          .dot {
            width: 10px;
            height: 10px;
          }
        }
      }
    }
  }

  // 版面翻页设计：左侧图表 + 右侧说明
  .data-display-section {
    display: grid;
    grid-template-columns: 42% 58%;
    gap: 22px;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    // 左侧图表容器
    .chart-container {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%);
      backdrop-filter: blur(15px);
      border-radius: 24px;
      padding: 30px;
      box-shadow: 0 15px 50px rgba(0, 0, 0, 0.35), 0 5px 15px rgba(22, 93, 255, 0.1);
      border: 2px solid rgba(255, 255, 255, 0.5);
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(45deg, transparent, rgba(22, 93, 255, 0.15), transparent);
        border-radius: 24px;
        z-index: -1;
        animation: borderRotate 3s linear infinite;
      }

      .chart-title {
        font-size: clamp(20px, 3.5vw, 26px);
        font-weight: bold;
        color: rgb(22, 93, 255);
        margin-bottom: 30px;
        text-align: center;
      }

      .chart-wrapper {
        .chart-bars {
          display: flex;
          justify-content: space-around;
          align-items: flex-end;
          height: 280px;
          gap: 12px;

          @media (max-width: 768px) {
            height: 240px;
            gap: 8px;
          }

          .bar-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover {
              transform: translateY(-5px);

              .bar {
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
              }
            }

            .bar-wrapper {
              flex: 1;
              width: 100%;
              display: flex;
              align-items: flex-end;
              justify-content: center;

              .bar {
                width: 100%;
                max-width: 45px;
                min-height: 40px;
                border-radius: 8px 8px 0 0;
                position: relative;
                display: flex;
                align-items: flex-start;
                justify-content: center;
                padding-top: 10px;
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25), inset 0 2px 4px rgba(255, 255, 255, 0.3);
                transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);

                &::before {
                  content: '';
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  height: 3px;
                  background: rgba(255, 255, 255, 0.6);
                  border-radius: 8px 8px 0 0;
                }

                &::after {
                  content: '';
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  right: 0;
                  height: 100%;
                  background: inherit;
                  filter: brightness(0.9);
                  z-index: -1;
                  border-radius: 8px 8px 0 0;
                }

                @media (max-width: 768px) {
                  max-width: 35px;
                }

                .bar-value {
                  font-size: clamp(10px, 2vw, 12px);
                  font-weight: bold;
                  color: white;
                  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
                }
              }
            }

            .bar-label {
              margin-top: 10px;
              font-size: clamp(11px, 2vw, 13px);
              color: #1f2937;
              font-weight: 600;
              text-align: center;
              line-height: 1.3;
            }
          }
        }
      }
    }

    // 右侧文字说明容器
    .description-container {
      background: rgba(248, 250, 252, 0.85);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);

      .description-card {
        h3 {
          font-size: clamp(20px, 3.5vw, 26px);
          font-weight: bold;
          color: rgb(22, 93, 255);
          margin-bottom: 25px;
          text-align: center;
        }

        .desc-item {
          display: flex;
          gap: 18px;
          margin-bottom: 25px;
          padding: 20px;
          background: rgba(22, 93, 255, 0.05);
          border-radius: 12px;
          border-left: 4px solid rgb(22, 93, 255);
          transition: all 0.3s ease;

          &:hover {
            background: rgba(22, 93, 255, 0.1);
            transform: translateX(5px);
          }

          &:last-child {
            margin-bottom: 0;
          }

          .desc-icon {
            font-size: 32px;
            flex-shrink: 0;
            line-height: 1;
          }

          .desc-content {
            flex: 1;

            h4 {
              font-size: clamp(16px, 2.5vw, 19px);
              font-weight: bold;
              color: #1f2937;
              margin-bottom: 10px;
              line-height: 1.4;
            }

            p {
              font-size: clamp(14px, 2vw, 16px);
              color: #4b5563;
              line-height: 1.8;
            }
          }
        }
      }
    }
  }

  // 提示框样式
  .tooltip {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    animation: fadeIn 0.3s ease forwards;

    &.show {
      opacity: 1;
    }

    .tooltip-content {
      background: white;
      border-radius: 20px;
      padding: 30px;
      max-width: 500px;
      width: 90%;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      position: relative;
      animation: slideUp 0.3s ease;

      .close-btn {
        position: absolute;
        top: 15px;
        right: 15px;
        width: 35px;
        height: 35px;
        border: none;
        background: rgba(22, 93, 255, 0.1);
        border-radius: 50%;
        font-size: 24px;
        color: rgb(22, 93, 255);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;

        &:hover {
          background: rgb(22, 93, 255);
          color: white;
          transform: rotate(90deg);
        }
      }

      h4 {
        font-size: clamp(18px, 3vw, 22px);
        font-weight: bold;
        color: rgb(22, 93, 255);
        margin-bottom: 15px;
      }

      .tooltip-value {
        font-size: clamp(24px, 4vw, 32px);
        font-weight: bold;
        color: #1f2937;
        margin-bottom: 15px;
      }

      .tooltip-desc {
        font-size: clamp(14px, 2.5vw, 16px);
        color: #4b5563;
        line-height: 1.8;
      }
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes borderRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
