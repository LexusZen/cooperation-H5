<template>
  <div class="section section-4" ref="sectionRef">
    <div class="content">
      <h2 class="section-title">深圳品质，宜居宜业</h2>

      <!-- 小标题列表 -->
      <div class="highlights-section">
        <div class="highlights-list">
          <div class="highlight-item" v-for="(item, index) in highlights" :key="index">
            <div class="dot"></div>
            <div class="text">{{ item }}</div>
          </div>
        </div>
      </div>

      <!-- 上下结构：上方民生图片轮播 + 下方交通路网 -->
      <div class="facilities-section">
        <!-- 上方：民生设施轮播 -->
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
                <div class="facility-image">
                  <img :src="facility.image" :alt="facility.title" />
                </div>
                <div class="facility-info">
                  <h4>{{ facility.title }}</h4>
                  <p>{{ facility.subtitle }}</p>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>

        <!-- 下方：交通路网图片 -->
        <div class="transport-container">
          <h3 class="transport-title">交通路网</h3>
          <div class="transport-card" @click="showTransportInfo">
            <div class="transport-image">
              <img src="/images/section4/transport.jpg" alt="深汕大道全景" />
            </div>
            <div class="transport-info">
              <p>深汕大道全景 - 畅达交通网络</p>
            </div>
          </div>
        </div>
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
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import { useAnimation } from '@/composables/useAnimation'
import { useIntersection } from '@/composables/useIntersection'

import 'swiper/css'
import 'swiper/css/pagination'

const sectionRef = ref<HTMLElement | null>(null)
const { fadeInUp, createTimeline } = useAnimation()
const activeInfo = ref<any>(null)

const carouselModules = [Autoplay, Pagination]

// 小标题数据
const highlights = [
  '广汕高铁已经通车，深汕高铁加快建设（广州40分钟、深圳30分钟生活圈加速形成）',
  '深汕西高速改扩建全线通车',
  '深圳中学高中园已招生，深职大校区2026年启用',
  '超2万套保障房落地，安居梦照进现实（"双六十"住房保障体系）',
  '深汕人民医院2025年底建成，深圳品质医疗可及',
  '"集成式改革"试点推进，治理效能持续提升'
]

// 民生设施数据
const facilities = [
  {
    title: '深圳市深汕人民医院',
    subtitle: '深圳品质医疗可及',
    image: '/images/section4/hospital.jpg',
    description: '深汕人民医院预计2025年底建成，引入深圳优质医疗资源，提供三甲医院标准的医疗服务，让深汕居民在家门口就能享受到深圳品质的医疗保障。'
  },
  {
    title: '深圳中学高中园',
    subtitle: '优质教育资源落地',
    image: '/images/section4/school.jpg',
    description: '深圳中学高中园已于2024年开始招生，深圳职业技术大学校区将于2026年启用，将深圳一流的教育资源导入深汕，为本地学子提供优质教育机会。'
  },
  {
    title: '赤河广场保障房片区',
    subtitle: '安居梦照进现实',
    image: '/images/section4/housing.jpg',
    description: '超2万套保障房陆续落地，建立"双六十"住房保障体系（60%保障性住房+60%人才住房），让深汕成为真正留得住人才、安得下家的宜居之城。'
  }
]

// 交通路网信息
const transportInfo = {
  title: '深汕大道交通网络',
  subtitle: '畅达出行，通达四方',
  description: '广汕高铁已经通车，深汕高铁加快建设，深圳30分钟、广州40分钟生活圈加速形成。深汕西高速改扩建全线通车，构建起连接粤港澳大湾区的快速交通网络。'
}

// 显示设施详情
const showFacilityInfo = (facility: any) => {
  activeInfo.value = facility
}

// 显示交通信息
const showTransportInfo = () => {
  activeInfo.value = transportInfo
}

// 监听页面可见性，触发动画
useIntersection(sectionRef, () => {
  const tl = createTimeline()
  tl.add(fadeInUp('.section-4 .section-title', { duration: 0.8 }))
    .add(fadeInUp('.section-4 .highlights-section', { duration: 0.8 }), '-=0.4')
    .add(fadeInUp('.section-4 .facilities-section', { duration: 1 }), '-=0.3')
})
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.section-4 {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(to bottom, #ffffff, #b4d8e8);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 60px 20px;

  .content {
    max-width: 1400px;
    width: 100%;
  }

  .section-title {
    font-size: clamp(32px, 5vw, 48px);
    font-weight: bold;
    text-align: center;
    color: rgb(22, 93, 255);
    margin-bottom: 40px;
  }

  // 小标题列表
  .highlights-section {
    margin-bottom: 40px;

    .highlights-list {
      background: rgba(248, 250, 252, 0.85);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
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
        }
      }
    }
  }

  // 上下结构：民生设施 + 交通路网
  .facilities-section {
    display: flex;
    flex-direction: column;
    gap: 30px;

    // 上方：民生设施轮播
    .carousel-container {
      background: rgba(248, 250, 252, 0.85);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);

      .carousel-title {
        font-size: clamp(20px, 3.5vw, 26px);
        font-weight: bold;
        color: rgb(22, 93, 255);
        margin-bottom: 25px;
        text-align: center;
      }

      .facilities-swiper {
        border-radius: 16px;

        .facility-card {
          cursor: pointer;
          transition: transform 0.3s ease;
          position: relative;
          overflow: hidden;

          &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(22, 93, 255, 0.15) 0%, transparent 70%);
            transform: translate(-50%, -50%);
            transition: width 0.6s ease, height 0.6s ease;
          }

          &:hover {
            transform: translateY(-5px);

            &::before {
              width: 500px;
              height: 500px;
            }
          }

          .facility-image {
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            margin-bottom: 20px;

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

          .facility-info {
            text-align: center;
            padding: 0 20px;

            h4 {
              font-size: clamp(18px, 3vw, 24px);
              font-weight: bold;
              color: rgb(22, 93, 255);
              margin-bottom: 8px;
            }

            p {
              font-size: clamp(14px, 2.5vw, 16px);
              color: #4b5563;
              font-weight: 500;
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

    // 下方：交通路网
    .transport-container {
      background: rgba(248, 250, 252, 0.85);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);

      .transport-title {
        font-size: clamp(20px, 3.5vw, 26px);
        font-weight: bold;
        color: rgb(22, 93, 255);
        margin-bottom: 25px;
        text-align: center;
      }

      .transport-card {
        cursor: pointer;
        transition: transform 0.3s ease;

        &:hover {
          transform: translateY(-5px);
        }

        .transport-image {
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          margin-bottom: 20px;

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

        .transport-info {
          text-align: center;
          padding: 0 20px;

          p {
            font-size: clamp(16px, 3vw, 20px);
            font-weight: 600;
            color: #1f2937;
          }
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
      background: white;
      border-radius: 20px;
      padding: 40px;
      max-width: 600px;
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

      h3 {
        font-size: clamp(20px, 4vw, 26px);
        font-weight: bold;
        color: rgb(22, 93, 255);
        margin-bottom: 15px;
      }

      .subtitle {
        font-size: clamp(16px, 3vw, 18px);
        font-weight: 600;
        color: #f59e0b;
        margin-bottom: 20px;
      }

      .description {
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
</style>

