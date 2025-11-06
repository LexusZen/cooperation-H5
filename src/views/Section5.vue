<template>
  <div class="section section-5" ref="sectionRef">
    <div class="content">
      <h2 class="section-title">以城带乡，振兴共富</h2>

      <!-- 小标题+图片列表 -->
      <div class="highlights-container">
        <div class="highlight-card" v-for="(item, index) in highlights" :key="index">
          <!-- 文字内容（左侧，占大部分空间） -->
          <div class="text-section">
            <div class="number-badge">{{ String(index + 1).padStart(2, '0') }}</div>
            <p class="highlight-description">{{ item.description }}</p>
          </div>

          <!-- 配图（右侧，小图） -->
          <div class="image-section">
            <div class="image-wrapper">
              <img :src="item.image" alt="村容新貌" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getImageUrl } from '@/utils/assets'
import { useAnimation } from '@/composables/useAnimation'
import { useIntersection } from '@/composables/useIntersection'

const sectionRef = ref<HTMLElement | null>(null)
const { fadeInUp, createTimeline } = useAnimation()

// 3个小标题，每个配一张图（只有小标题，没有大标题）
const highlights = [
  {
    title: '',
    description:
      '9个行政村迈入"百万俱乐部"，1个行政村勇闯"千万大关"。明热村成为深汉首个集体收入破千万的行政村，引领乡村振兴新标杆，村民钱袋子越来越鼓。',
    image: getImageUrl('/images/section5/mingre-village.jpg')
  },
  {
    title: '',
    description:
      '建成四好农村路50.9公里，完成42公里自然村通村道路硬化。建成4个镇（街）级生活垃圾转运站，187个自然村实现污水集中处理，39个行政村（社区）5G全覆盖。',
    image: getImageUrl('/images/section5/baian-village.jpg')
  },
  {
    title: '',
    description:
      '红罗村、田心村入选第三批全国乡村治理示范村，治理模式获国家认可。11个惠民公园建成开放，提升村民幸福感，五光十色示范带加快建设，美丽圩镇焕新颜。',
    image: getImageUrl('/images/section5/hongluo-village.jpg')
  }
]

// 监听页面可见性，触发动画
useIntersection(sectionRef, () => {
  const tl = createTimeline()
  tl.add(fadeInUp('.section-5 .section-title', { duration: 0.8, delay: 0 }))
    .add(fadeInUp('.section-5 .highlights-container', { duration: 0.8 }), '-=0.4')
})
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.section-5 {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(to bottom, rgb(229, 238, 255), #b4d8e8);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-left: 15px;
  padding-right: 15px;

  .content {
    max-width: 100%;
    width: 100%;
  }

  .section-title {
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    color: rgb(22, 93, 255);
    margin-bottom: 25px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
    padding: 0 10px;
    opacity: 1;
  }

  .highlights-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 10px;
    opacity: 1;
  }

  // 每个小标题卡片（移动端优先，左文右小图）
  .highlight-card {
    background: rgba(229, 238, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 12px;
    padding: 18px 15px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }

    // 左侧文字（占主要空间）
    .text-section {
      flex: 1;
      display: flex;
      gap: 10px;
      align-items: flex-start;

      .number-badge {
        width: 40px;
        height: 40px;
        min-width: 40px;
        background: linear-gradient(135deg, rgb(22, 93, 255) 0%, rgb(99, 150, 255) 100%);
        color: white;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-weight: bold;
        box-shadow: 0 3px 10px rgba(22, 93, 255, 0.3);
        flex-shrink: 0;
      }

      .highlight-description {
        flex: 1;
        font-size: 14px;
        color: #4b5563;
        line-height: 1.6; // 更紧凑的行高
        text-align: justify;
        margin: 0;
      }
    }

    // 右侧图片（与文字齐高）
    .image-section {
      flex-shrink: 0;
      display: flex;
      align-items: stretch;

      .image-wrapper {
        width: 120px;
        height: 100%;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        &:hover img {
          transform: scale(1.08);
        }
      }
    }
  }

  // 平板适配（480px以上）
  @media (min-width: 480px) {
    padding-left: 20px;
    padding-right: 20px;

    .section-title {
      font-size: 32px;
      margin-bottom: 30px;
    }

    .highlights-container {
      gap: 22px;
      padding: 0 15px;
    }

    .highlight-card {
      padding: 20px 18px;
      gap: 15px;

      .text-section {
        gap: 12px;

        .number-badge {
          width: 45px;
          height: 45px;
          min-width: 45px;
          font-size: 20px;
        }

        .highlight-description {
          font-size: 15px;
          line-height: 1.6;
        }
      }

      .image-section {
        .image-wrapper {
          width: 140px;
        }
      }
    }
  }

  // PC端适配（768px以上）
  @media (min-width: 768px) {
    padding-left: 30px;
    padding-right: 30px;

    .content {
      max-width: 1200px;
    }

    .section-title {
      font-size: 38px;
      margin-bottom: 40px;
    }

    .highlights-container {
      gap: 28px;
      padding: 0;
    }

    .highlight-card {
      padding: 25px 22px;
      gap: 18px;

      .text-section {
        gap: 14px;

        .number-badge {
          width: 50px;
          height: 50px;
          min-width: 50px;
          font-size: 22px;
        }

        .highlight-description {
          font-size: 16px;
          line-height: 1.65;
        }
      }

      .image-section {
        .image-wrapper {
          width: 160px;
        }
      }
    }
  }

  // 大屏优化（1024px以上）
  @media (min-width: 1024px) {
    padding-left: 40px;
    padding-right: 40px;

    .section-title {
      font-size: 44px;
      margin-bottom: 50px;
    }

    .highlights-container {
      gap: 32px;
    }

    .highlight-card {
      padding: 28px 25px;
      gap: 20px;

      .text-section {
        gap: 16px;

        .number-badge {
          width: 55px;
          height: 55px;
          min-width: 55px;
          font-size: 24px;
        }

        .highlight-description {
          font-size: 17px;
          line-height: 1.7;
        }
      }

      .image-section {
        .image-wrapper {
          width: 180px;
        }
      }
    }
  }
}
</style>
