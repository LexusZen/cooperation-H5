<template>
  <div class="section section-3" ref="sectionRef">
    <!-- 背景图 -->
    <div class="bg-image" :style="{ backgroundImage: `url(${getImageUrl('/images/section3/bg-industry.jpg')})` }"></div>

    <div class="content">
      <h2 class="section-title">深汕智造，通达全球</h2>

      <!-- 三个柱状图模块（纵向排列） -->
      <div class="chart-modules">
        <div
          v-for="(module, moduleIndex) in chartModules"
          :key="module.id"
          class="chart-module"
          :class="{ visible: visibleModules >= moduleIndex }"
        >
          <!-- 模块标题 -->
          <div class="module-header">
            <h3 class="module-title">{{ module.title }}</h3>
          </div>

          <!-- 左右布局容器 -->
          <div class="module-content">
            <!-- 左侧：柱状图 -->
            <div class="chart-side">
              <div class="chart-wrapper">
                <div class="chart-bars">
                  <div
                    v-for="(item, barIndex) in module.data"
                    :key="item.year"
                    class="bar-item"
                    :class="{ 'bar-visible': (visibleBars[moduleIndex] ?? -1) >= barIndex }"
                    @click="showBarDetail(item, module)"
                  >
                    <!-- 柱子 -->
                    <div class="bar-wrapper">
                      <div
                        class="bar"
                        :style="{
                          height: (item.value / getMaxValue(module.data) * 100) + '%',
                          background: item.color
                        }"
                      >
                        <span class="bar-value">{{ formatValue(item.value, module.unit) }}</span>
                      </div>
                    </div>

                    <!-- 年份标签 -->
                    <div class="bar-label">{{ item.year }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 右侧：文字介绍 -->
            <div class="text-side">
              <div class="text-content">
                <!-- 主要描述 -->
                <p class="description">
                  {{ displayTexts[moduleIndex] || '' }}
                </p>

                <!-- 关键亮点 -->
                <div v-if="module.highlights" class="highlights">
                  <div
                    v-for="(highlight, hIndex) in module.highlights"
                    :key="hIndex"
                    class="highlight-item"
                  >
                    <span class="highlight-dot">•</span>
                    <span class="highlight-text">{{ highlight }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 点击柱子弹出的弹窗 -->
    <transition name="fade">
      <div v-if="activeBar" class="bar-tooltip" @click="activeBar = null">
        <div class="tooltip-content" @click.stop>
          <button class="close-btn" @click="activeBar = null">×</button>
          <div class="tooltip-header">
            <h4>{{ activeBar.title }}</h4>
          </div>
          <p class="tooltip-year">{{ activeBar.year }}</p>
          <p class="tooltip-value">{{ activeBar.value }}{{ activeBar.unit }}</p>
          <p class="tooltip-detail">{{ activeBar.detail }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useIntersection } from '@/composables/useIntersection'
import { useAnimation } from '@/composables/useAnimation'
import { useTypewriter } from '@/composables/useTypewriter'
import { getImageUrl } from '@/utils/assets'
import type { ChartModule, ChartDataItem } from '@/types'

const sectionRef = ref<HTMLElement | null>(null)
const visibleModules = ref(-1)
const visibleBars = ref<number[]>([-1, -1, -1])
const activeBar = ref<any>(null)
const displayTexts = ref<string[]>(['', '', ''])

const { createTimeline } = useAnimation()
const { typeText } = useTypewriter()

// 三个柱状图模块数据
const chartModules: ChartModule[] = [
  {
    id: 'car-production',
    title: '汽车年生产量',
    unit: '万辆',
    icon: '🚗',
    description: '深汕合作区依托比亚迪等龙头企业，汽车产量实现爆发式增长。2023年达100万辆，2024年突破130万辆，2025年预计达150万辆，成为全球新能源汽车制造重镇。',
    highlights: [
      '2024年产量同比增长30%',
      '全球首家1300万辆下线工厂',
      '汽车制造业增加值增长621.1%'
    ],
    data: [
      {
        year: '2023',
        value: 100,
        color: 'linear-gradient(to top, #3b82f6, #60a5fa)',
        detail: '2023年是深汕汽车产业的起飞之年，比亚迪深圳号工厂全面投产，实现年产100万辆的里程碑，标志着深汕合作区正式迈入汽车制造重镇行列。'
      },
      {
        year: '2024',
        value: 130,
        color: 'linear-gradient(to top, #10b981, #34d399)',
        detail: '2024年产量同比增长30%，达到130万辆。比亚迪二期项目投产，汽车制造业增加值增长621.1%，深汕成为华南地区最重要的新能源汽车生产基地之一。'
      },
      {
        year: '2025',
        value: 150,
        color: 'linear-gradient(to top, #f59e0b, #fbbf24)',
        detail: '2025年预计产量达150万辆，全球首家达成第1300万辆新能源汽车下线里程碑的工厂诞生于此，深汽车产业进入世界级制造集群。'
      }
    ]
  },
  {
    id: 'tech-companies',
    title: '高科技企业数量',
    unit: '家',
    icon: '🏢',
    description: '围绕新能源汽车产业链，深汕合作区吸引了速腾聚创、壁虎科技等近30家创新型企业入驻，形成完整的产业生态链，企业数量年均增长40%以上。',
    highlights: [
      '涵盖整车制造到零部件全产业链',
      '速腾聚创、壁虎科技等龙头企业',
      '年均增长率超过40%'
    ],
    data: [
      {
        year: '2023',
        value: 120,
        color: 'linear-gradient(to top, #8b5cf6, #a78bfa)',
        detail: '2023年已有120家规模以上工业企业落户，涵盖整车制造、零部件、智能驾驶等领域，初步形成产业集聚效应。'
      },
      {
        year: '2024',
        value: 180,
        color: 'linear-gradient(to top, #ec4899, #f472b6)',
        detail: '2024年企业数量突破180家，同比增长50%。产业集群效应显现，配套产业链日趋完善，吸引力持续增强。'
      },
      {
        year: '2025',
        value: 250,
        color: 'linear-gradient(to top, #f59e0b, #fbbf24)',
        detail: '2025年预计达250家，深汕成为粤港澳大湾区新能源汽车产业的核心承载地之一，产业生态更加完善。'
      }
    ]
  },
  {
    id: 'car-exports',
    title: '汽车出口量',
    unit: '万辆',
    icon: '🌍',
    description: '依托小漠国际物流港，深汕实现"出厂即出海"。开通11条国际航线，产品远销欧洲、南美、东南亚、非洲等70多个国家和地区，出口量年均增长超过100%。',
    highlights: [
      '5分钟极速集港效率全球领先',
      '11条国际航线通达全球',
      '澳大利亚最快10天抵达'
    ],
    data: [
      {
        year: '2023',
        value: 30,
        color: 'linear-gradient(to top, #06b6d4, #22d3ee)',
        detail: '2023年出口量达30万辆，主要出口至东南亚和非洲市场，出口增速全国领先，"出厂即出海"模式初步形成。'
      },
      {
        year: '2024',
        value: 65,
        color: 'linear-gradient(to top, #10b981, #34d399)',
        detail: '2024年出口量翻倍增长至65万辆，欧洲和南美市场实现突破，5分钟极速集港效率全球领先，国际影响力显著提升。'
      },
      {
        year: '2025',
        value: 90,
        color: 'linear-gradient(to top, #f59e0b, #fbbf24)',
        detail: '2025年出口量预计达90万辆，产品出口至澳大利亚最快仅需10天抵达，深汕成为中国新能源汽车出口的重要门户。'
      }
    ]
  }
]

// 计算每个模块的最大值
const getMaxValue = (data: ChartDataItem[]) => {
  return Math.max(...data.map(item => item.value))
}

// 格式化数值显示
const formatValue = (value: number, unit: string) => {
  if (unit === '万辆' || unit === '家') {
    return value.toString()
  }
  return value.toString()
}

// 显示柱子详情
const showBarDetail = (bar: ChartDataItem, module: ChartModule) => {
  activeBar.value = {
    ...bar,
    unit: module.unit,
    icon: module.icon,
    title: module.title
  }
}

// 监听可见性，逐模块显示
useIntersection(sectionRef, () => {
  const tl = createTimeline()

  // 逐个模块显示
  chartModules.forEach((module, moduleIndex) => {
    tl.add(() => {
      visibleModules.value = moduleIndex

      // 该模块的柱子逐条显示
      setTimeout(() => {
        animateBars(moduleIndex)
      }, 300)

      // 打字机效果显示文字
      setTimeout(() => {
        typeText(
          module.description,
          (displayText) => {
            displayTexts.value[moduleIndex] = displayText
          },
          {
            speed: 30,
            delay: 0
          }
        )
      }, 800)
    }, `+=${moduleIndex === 0 ? 0.5 : 1.5}`)
  })
}, { threshold: 0.2 })

// 柱子逐条动画
const animateBars = (moduleIndex: number) => {
  const module = chartModules[moduleIndex]
  if (!module) return

  module.data.forEach((_, barIndex) => {
    setTimeout(() => {
      visibleBars.value[moduleIndex] = barIndex
    }, barIndex * 400) // 每条柱子间隔400ms
  })
}
</script>

<style scoped lang="scss">
.section-3 {
  position: relative;
  width: 100%;
  min-height: 100vh;
  color: white;
  padding: 80px 20px 60px;
  display: flex;
  flex-direction: column;

  .bg-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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
      background: rgba(37, 32, 126, 0.5);
    }
  }

  .content {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: 0 auto;
  }


  // 柱状图模块容器（纵向排列）
  .chart-modules {
    display: flex;
    flex-direction: column;
    gap: 15px;
    flex: 1;
    overflow-y: auto; // 允许滚动
    overflow-x: hidden;

    // 自定义滚动条
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(16, 224, 248, 0.5);
      border-radius: 3px;

      &:hover {
        background: rgba(16, 224, 248, 0.7);
      }
    }

    @media (max-width: 768px) {
      gap: 12px;
    }

    // 单个模块
    .chart-module {
      background: rgba(229, 238, 255, 0.5);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-radius: 16px;
      padding: 15px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.8s ease;

      &.visible {
        opacity: 1;
        transform: translateY(0);
      }

      @media (max-width: 768px) {
        padding: 12px;
        display: flex;
        flex-direction: column;
      }

      // 模块头部
      .module-header {
        margin-bottom: 12px;

        .module-title {
          font-size: clamp(16px, 2.8vw, 20px);
          font-weight: bold;
          color: rgb(16, 224, 248);
          margin: 0;
        }
      }

      // 左右布局容器
      .module-content {
        display: grid;
        grid-template-columns: 45% 55%;
        gap: 20px;
        align-items: center;

        @media (max-width: 768px) {
          grid-template-columns: 40% 60%;
          gap: 12px;
          flex: 1;
        }

        // 左侧：柱状图
        .chart-side {
          display: flex;
          align-items: center;
          justify-content: center;

          .chart-wrapper {
            width: 100%;

            .chart-bars {
              display: flex;
              justify-content: space-around;
              align-items: flex-end;
              height: 130px;
              gap: 8px;
              padding: 0 8px;
              border-bottom: 3px solid #e5e7eb;
              position: relative;

              @media (max-width: 768px) {
                height: 110px;
                gap: 6px;
                padding: 0 5px;
              }

              .bar-item {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                cursor: pointer;
                opacity: 0;
                transform: scaleY(0);
                transform-origin: bottom;
                transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);

                &.bar-visible {
                  opacity: 1;
                  transform: scaleY(1);
                }

                &:hover {
                  transform: scaleY(1.05) translateY(-5px);

                  .bar {
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
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
                    max-width: 50px;
                    min-height: 30px;
                    border-radius: 8px 8px 0 0;
                    display: flex;
                    align-items: flex-start;
                    justify-content: center;
                    padding-top: 8px;
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
                    position: relative;
                    transition: all 0.3s ease;

                    @media (max-width: 768px) {
                      max-width: 35px;
                      padding-top: 6px;
                    }

                    // 顶部高光
                    &::before {
                      content: '';
                      position: absolute;
                      top: 0;
                      left: 0;
                      right: 0;
                      height: 4px;
                      background: rgba(255, 255, 255, 0.6);
                      border-radius: 8px 8px 0 0;
                    }

                    .bar-value {
                      font-size: clamp(10px, 2vw, 13px);
                      font-weight: bold;
                      color: white;
                      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
                      line-height: 1.2;
                      text-align: center;
                    }
                  }
                }

                .bar-label {
                  margin-top: 8px;
                  font-size: clamp(11px, 2vw, 13px);
                  font-weight: 600;
                  color: white;

                  @media (max-width: 768px) {
                    margin-top: 6px;
                    font-size: 10px;
                  }
                }
              }
            }
          }
        }

        // 右侧：文字介绍
        .text-side {
          display: flex;
          align-items: center;
          padding: 15px;
          background: rgba(22, 93, 255, 0.05);
          border-radius: 12px;
          border-left: 4px solid rgb(22, 93, 255);
          height: 100%;

          @media (max-width: 768px) {
            padding: 10px;
          }

          .text-content {
            width: 100%;

            .description {
              font-size: clamp(11px, 2vw, 13px);
              color: white;
              line-height: 1.6;
              text-align: justify;
              margin-bottom: 10px;

              @media (max-width: 768px) {
                font-size: 10px;
                line-height: 1.5;
                margin-bottom: 6px;
              }
            }

            // 关键亮点列表
            .highlights {
              display: flex;
              flex-direction: column;
              gap: 4px;

              .highlight-item {
                display: flex;
                align-items: flex-start;
                gap: 8px;
                font-size: clamp(10px, 2vw, 12px);
                color: rgba(255, 255, 255, 0.9);
                line-height: 1.5;

                @media (max-width: 768px) {
                  font-size: 10px;
                  gap: 6px;
                }

                .highlight-dot {
                  color: rgb(22, 93, 255);
                  font-weight: bold;
                  flex-shrink: 0;
                }

                .highlight-text {
                  flex: 1;
                }
              }
            }
          }
        }
      }
    }
  }

  // 弹窗样式
  .bar-tooltip {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;

    .tooltip-content {
      background: rgba(229, 238, 255, 0.6);
      backdrop-filter: blur(15px);
      -webkit-backdrop-filter: blur(15px);
      border-radius: 20px;
      padding: 35px;
      max-width: 500px;
      width: 90%;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      position: relative;
      animation: slideUp 0.3s ease;

      @media (max-width: 768px) {
        padding: 25px;
      }

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
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          background: rgb(22, 93, 255);
          color: white;
          transform: rotate(90deg);
        }
      }

      .tooltip-header {
        margin-bottom: 15px;

        h4 {
          font-size: clamp(18px, 3vw, 22px);
          font-weight: bold;
          color: rgb(16, 224, 248);
          text-shadow: 0 0 15px rgba(16, 224, 248, 0.5);
          margin: 0;
        }
      }

      .tooltip-year {
        font-size: 16px;
        font-weight: 600;
        color: rgb(16, 224, 248);
        text-shadow: 0 0 10px rgba(16, 224, 248, 0.5);
        margin-bottom: 10px;
      }

      .tooltip-value {
        font-size: clamp(28px, 5vw, 36px);
        font-weight: bold;
        color: rgb(16, 224, 248);
        text-shadow: 0 0 20px rgba(16, 224, 248, 0.5);
        margin-bottom: 15px;
      }

      .tooltip-detail {
        font-size: clamp(14px, 2.5vw, 16px);
        color: white;
        line-height: 1.8;
      }
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
