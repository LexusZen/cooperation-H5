<template>
  <div class="section section-4" ref="sectionRef">
    <div class="content">
      <h2 class="section-title">深圳品质，宜居宜业</h2>

      <!-- 民生设施轮播（图片+标题） -->
      <div class="carousel-container">
        <h3 class="carousel-title">民生设施展示</h3>
        <swiper
          :modules="carouselModules"
          :slides-per-view="1"
          :space-between="20"
          :loop="true"
          :autoplay="{ delay: 4000, disableOnInteraction: false }"
          :pagination="{ clickable: true }"
          class="facilities-swiper"
        >
          <swiper-slide v-for="(facility, index) in facilities" :key="index">
            <div class="facility-card" @click="showFacilityInfo(facility)">
              <!-- 图片 -->
              <div class="facility-image">
                <img :src="facility.image" :alt="facility.title" />
              </div>

              <!-- 标题（图片下方） -->
              <div class="facility-caption">
                <h4>{{ facility.title }}</h4>
                <p class="caption-text">{{ displayTexts[index] || '' }}</p>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>

      <!-- 交通路网（图片+标题） -->
      <div class="transport-container">
        <h3 class="transport-title">交通路网</h3>
        <swiper
          :modules="carouselModules"
          :slides-per-view="1"
          :space-between="20"
          :loop="true"
          :autoplay="{ delay: 4500, disableOnInteraction: false }"
          :pagination="{ clickable: true }"
          class="transport-swiper"
        >
          <swiper-slide v-for="(transport, index) in transportData" :key="index">
            <div class="transport-card" @click="showTransportInfo(transport)">
              <!-- 图片 -->
              <div class="transport-image">
                <img :src="transport.image" :alt="transport.title" />
              </div>

              <!-- 标题（图片下方） -->
              <div class="transport-caption">
                <h4>{{ transport.title }}</h4>
                <p class="caption-text">{{ transportDisplayTexts[index] || '' }}</p>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>

      <!-- 点击弹出详细介绍 -->
      <div class="info-modal" v-if="activeInfo" @click="activeInfo = null">
        <div class="modal-content" @click.stop>
          <button class="close-btn" @click="activeInfo = null">×</button>
          <h3>{{ activeInfo.title }}</h3>
          <p class="subtitle">{{ activeInfo.subtitle }}</p>
          <p class="description">{{ activeInfo.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getImageUrl } from '@/utils/assets'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import { useIntersection } from '@/composables/useIntersection'
import { useTypewriter } from '@/composables/useTypewriter'
import { useAnimation } from '@/composables/useAnimation'

// 导入 Swiper 样式
import 'swiper/swiper-bundle.css'

const sectionRef = ref<HTMLElement | null>(null)
const activeInfo = ref<any>(null)
const displayTexts = ref<string[]>(['', '', ''])
const transportDisplayTexts = ref<string[]>(['', '', ''])

const { typeText } = useTypewriter()
const { createTimeline } = useAnimation()

const carouselModules = [Autoplay, Pagination]

// 民生设施数据
const facilities = [
  {
    title: '深圳市深汕人民医院',
    subtitle: '深圳品质医疗可及',
    image: getImageUrl('/images/section4/hospital.jpg'),
    caption: '深汕人民医院2025年底建成，深圳品质医疗可及',
    description: '深汕人民医院预计2025年底建成，引入深圳优质医疗资源，提供三甲医院标准的医疗服务，让深汕居民在家门口就能享受到深圳品质的医疗保障。'
  },
  {
    title: '深圳中学高中园',
    subtitle: '优质教育资源落地',
    image: getImageUrl('/images/section4/school.jpg'),
    caption: '深圳中学高中园已招生，深职大校区2026年启用',
    description: '深圳中学高中园已于2024年开始招生，深圳职业技术大学校区将于2026年启用，将深圳一流的教育资源导入深汕，为本地学子提供优质教育机会。'
  },
  {
    title: '赤河广场保障房片区',
    subtitle: '安居梦照进现实',
    image: getImageUrl('/images/section4/housing.jpg'),
    caption: '超2万套保障房落地，安居梦照进现实（"双六十"住房保障体系）',
    description: '超2万套保障房陆续落地，建立"双六十"住房保障体系（60%保障性住房+60%人才住房），让深汕成为真正留得住人才、安得下家的宜居之城。'
  }
]

// 交通路网数据
const transportData = [
  {
    title: '广汕高铁深汕站',
    subtitle: '高铁时代来临',
    image: getImageUrl('/images/section4/train.jpg'),
    caption: '广汕高铁已经通车，深汕高铁加快建设（广州40分钟、深圳30分钟生活圈加速形成）',
    description: '广汕高铁已经通车，深汕高铁加快建设，深圳30分钟、广州40分钟生活圈加速形成，构建起连接粤港澳大湾区的快速交通网络。'
  },
  {
    title: '深汕西高速',
    subtitle: '畅达交通网络',
    image: getImageUrl('/images/section4/highway.jpg'),
    caption: '深汕西高速改扩建全线通车',
    description: '深汕西高速改扩建全线通车，大幅缩短深汕与粤港澳大湾区核心城市的时空距离，为产业发展和人员往来提供便利。'
  },
  {
    title: '通港大道',
    subtitle: '集成式改革试点',
    image: getImageUrl('/images/section4/main-road.jpg'),
    caption: '"集成式改革"试点推进，治理效能持续提升',
    description: '通港大道项目是深汕特别合作区集成式改革试点的重要成果，通过创新机制和高效治理，打造连接港口与城区的现代化交通大动脉，展现深汕治理效能的持续提升。'
  }
]

// 显示设施详情
const showFacilityInfo = (facility: any) => {
  activeInfo.value = facility
}

// 显示交通信息
const showTransportInfo = (transport: any) => {
  activeInfo.value = transport
}

// 监听页面可见性，触发动画和打字机效果
useIntersection(sectionRef, () => {
  const tl = createTimeline()

  // 标题动画
  tl.add(() => {
    // 民生设施文字打字机
    facilities.forEach((facility, index) => {
      setTimeout(() => {
        typeText(
          facility.caption,
          (displayText) => {
            displayTexts.value[index] = displayText
          },
          {
            speed: 30,
            delay: 0
          }
        )
      }, index * 1000)
    })
  }, '+=0.5')

  // 交通设施文字打字机（延迟启动）
  tl.add(() => {
    transportData.forEach((transport, index) => {
      setTimeout(() => {
        typeText(
          transport.caption,
          (displayText) => {
            transportDisplayTexts.value[index] = displayText
          },
          {
            speed: 30,
            delay: 0
          }
        )
      }, index * 1000)
    })
  }, '+=2')
}, { threshold: 0.2 })
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.section-4 {
  width: 100%;
  min-height: 100vh;
  background: rgba(37, 32, 126, 0.95);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 80px 20px 60px;

  .content {
    max-width: 1200px;
    width: 100%;
  }


  // 民生设施轮播容器
  .carousel-container {
    margin-bottom: 30px;

    .carousel-title {
      font-size: clamp(18px, 3vw, 22px);
      font-weight: bold;
      color: rgb(16, 224, 248);
      text-shadow: 0 0 15px rgba(16, 224, 248, 0.5);
      margin-bottom: 20px;
      text-align: center;
    }

    .facilities-swiper {
      border-radius: 16px;

      .facility-card {
        cursor: pointer;
        transition: transform 0.3s ease;
        position: relative;
        overflow: hidden;

        &:hover {
          transform: translateY(-5px);
        }

        .facility-image {
          border-radius: 16px 16px 0 0;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);

          img {
            width: 100%;
            height: auto;
            aspect-ratio: 20 / 9;
            object-fit: cover;
            display: block;
            transition: transform 0.3s ease;
          }

          &:hover img {
            transform: scale(1.05);
          }
        }

        // 标题（图片下方）
        .facility-caption {
          background: rgba(229, 238, 255, 0.6);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          padding: 18px;
          border-radius: 0 0 16px 16px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);

          h4 {
            font-size: clamp(16px, 2.8vw, 19px);
            font-weight: bold;
            color: rgb(16, 224, 248);
            text-shadow: 0 0 10px rgba(16, 224, 248, 0.4);
            margin-bottom: 8px;
            text-align: center;
          }

          .caption-text {
            font-size: clamp(12px, 2.2vw, 14px);
            color: white;
            line-height: 1.6;
            text-align: center;
            min-height: 40px;
          }
        }
      }

      // 自定义轮播分页器
      :deep(.swiper-pagination) {
        bottom: 0;
      }

      :deep(.swiper-pagination-bullet) {
        background: rgba(22, 93, 255, 0.5);
        width: 10px;
        height: 10px;

        &.swiper-pagination-bullet-active {
          background: rgb(22, 93, 255);
          width: 30px;
          border-radius: 5px;
        }
      }
    }
  }

  // 交通路网容器
  .transport-container {
    margin-bottom: 20px;

    .transport-title {
      font-size: clamp(18px, 3vw, 22px);
      font-weight: bold;
      color: rgb(16, 224, 248);
      text-shadow: 0 0 15px rgba(16, 224, 248, 0.5);
      margin-bottom: 20px;
      text-align: center;
    }

    .transport-swiper {
      border-radius: 16px;

      .transport-card {
        cursor: pointer;
        transition: transform 0.3s ease;

        &:hover {
          transform: translateY(-5px);
        }

        .transport-image {
          border-radius: 16px 16px 0 0;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);

          img {
            width: 100%;
            height: auto;
            aspect-ratio: 16 / 9;
            object-fit: cover;
            display: block;
            transition: transform 0.3s ease;
          }

          &:hover img {
            transform: scale(1.05);
          }
        }

        // 标题（图片下方）
        .transport-caption {
          background: rgba(229, 238, 255, 0.6);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          padding: 20px;
          border-radius: 0 0 16px 16px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);

          h4 {
            font-size: clamp(18px, 3vw, 22px);
            font-weight: bold;
            color: rgb(16, 224, 248);
            text-shadow: 0 0 10px rgba(16, 224, 248, 0.4);
            margin-bottom: 10px;
            text-align: center;
          }

          .caption-text {
            font-size: clamp(13px, 2.5vw, 15px);
            color: white;
            line-height: 1.6;
            text-align: center;
            min-height: 48px;
          }
        }
      }

      // 自定义轮播分页器
      :deep(.swiper-pagination) {
        bottom: 0;
      }

      :deep(.swiper-pagination-bullet) {
        background: rgba(22, 93, 255, 0.5);
        width: 10px;
        height: 10px;

        &.swiper-pagination-bullet-active {
          background: rgb(22, 93, 255);
          width: 30px;
          border-radius: 5px;
        }
      }
    }
  }

  // 弹出层样式
  .info-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease;

    .modal-content {
      background: rgba(229, 238, 255, 0.6);
      backdrop-filter: blur(15px);
      -webkit-backdrop-filter: blur(15px);
      border-radius: 20px;
      padding: 40px;
      max-width: 600px;
      width: 90%;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      position: relative;
      animation: slideUp 0.3s ease;

      @media (max-width: 768px) {
        padding: 30px 20px;
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

      h3 {
        font-size: clamp(20px, 4vw, 26px);
        font-weight: bold;
        color: rgb(16, 224, 248);
        text-shadow: 0 0 15px rgba(16, 224, 248, 0.5);
        margin-bottom: 15px;
      }

      .subtitle {
        font-size: clamp(16px, 3vw, 18px);
        font-weight: 600;
        color: rgb(16, 224, 248);
        text-shadow: 0 0 15px rgba(16, 224, 248, 0.5);
        margin-bottom: 20px;
      }

      .description {
        font-size: clamp(14px, 2.5vw, 16px);
        color: white;
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

// 小屏手机优化
@media (max-width: 480px) {
  .section-4 {
    .facility-card,
    .transport-card {
      .facility-caption,
      .transport-caption {
        padding: 15px;

        h4 {
          font-size: 16px;
          margin-bottom: 8px;
        }

        .caption-text {
          font-size: 12px;
          min-height: 40px;
        }
      }
    }
  }
}
</style>
