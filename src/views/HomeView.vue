<template>
  <div class="home-container">
    <!-- 全局顶部信息栏 -->
    <TopBar />

    <swiper
      :modules="modules"
      :direction="'vertical'"
      :slides-per-view="1"
      :space-between="0"
      :mousewheel="false"
      :allowTouchMove="false"
      :speed="400"
      :resistance="true"
      :resistance-ratio="0"
      :css-mode="false"
      :lazy="true"
      :preload-images="false"
      :pagination="{
        clickable: true,
        renderBullet: renderCustomBullet
      }"
      @swiper="onSwiperInit"
      @slide-change="onSlideChange"
      class="home-swiper"
      ref="swiperRef"
    >
      <swiper-slide class="slide-container">
        <div class="slide-content">
          <Section1 />
        </div>
      </swiper-slide>
      <swiper-slide class="slide-container">
        <div class="slide-content">
          <Section2 />
        </div>
      </swiper-slide>
      <swiper-slide class="slide-container">
        <div class="slide-content">
          <Section3 />
        </div>
      </swiper-slide>
      <swiper-slide class="slide-container">
        <div class="slide-content">
          <Section4 />
        </div>
      </swiper-slide>
      <swiper-slide class="slide-container">
        <div class="slide-content">
          <Section5 />
        </div>
      </swiper-slide>

      <swiper-slide class="slide-container">
        <div class="slide-content">
          <Section6 />
        </div>
      </swiper-slide>

      <!-- 采访板块 -->
      <swiper-slide class="slide-container">
        <div class="slide-content interview-wrapper">
          <swiper
            :modules="[Pagination]"
            :slides-per-view="1"
            :space-between="0"
            :pagination="{ clickable: true }"
            class="interview-swiper"
          >
            <swiper-slide v-for="person in interviewPeople" :key="person.id">
              <InterviewCard :person="person" />
            </swiper-slide>
          </swiper>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import type { InterviewPerson } from '@/types'
import { getImageUrl } from '@/utils/assets'

import Section1 from './Section1.vue'
import Section2 from './Section2.vue'
import Section3 from './Section3.vue'
import Section4 from './Section4.vue'
import Section5 from './Section5.vue'
import Section6 from './Section6.vue'
import InterviewCard from '@/components/InterviewCard.vue'
import TopBar from '@/components/TopBar.vue'

// Swiper 12+ 不需要单独导入CSS

const modules = [Pagination]

// 自定义分页器图标（汽车主题）
const sectionIcons = ['🚗', '🏎️', '🚙', '🚕', '🚐', '💬', '🚀']

const renderCustomBullet = (index: number, className: string) => {
  return `<span class="${className}">
    <span class="bullet-icon">${sectionIcons[index]}</span>
  </span>`
}

const onSwiperInit = () => {
  // 板块切换现在完全通过点击分页器来实现
}

const interviewPeople: InterviewPerson[] = [
  {
    id: 1,
    name: '张总',
    role: '新能源汽车产业链企业家',
    avatar: getImageUrl('/images/interview/avatar1.jpg'),
    quote: '产业全链条都本地化，项目当年动工当年投产，在这里投资省时省力又省心。'
  },
  {
    id: 2,
    name: '李阿姨',
    role: '大安村村民',
    avatar: getImageUrl('/images/interview/avatar2.jpg'),
    quote: '"百千万工程"让我们村变了样！以前是守着绿水青山过穷日子，现在路通了、网快了、环境美了，家门口就能就业增收，这日子真有奔头！'
  },
  {
    id: 3,
    name: '王先生',
    role: '来深建设者',
    avatar: getImageUrl('/images/interview/avatar3.jpg'),
    quote: '我选择深汕，看中的是这里的未来潜力与宜居本色。这里是半城山水半城产业，既能追逐梦想，也能安放生活，完美诠释了什么是"产城融合"。'
  }
]

const onSlideChange = (swiper: any) => {
  console.log('当前页面:', swiper.activeIndex + 1)
}
</script>

<style scoped lang="scss">
.home-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.home-swiper {
  width: 100%;
  height: 100%;

  :deep(.swiper-wrapper) {
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  :deep(.swiper-slide) {
    will-change: transform;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;

    // 非激活的 slide 降低渲染优先级
    &:not(.swiper-slide-active) {
      visibility: hidden;
      pointer-events: none;
    }

    &.swiper-slide-active,
    &.swiper-slide-next,
    &.swiper-slide-prev {
      visibility: visible;
      pointer-events: auto;
    }
  }
}

// 滑动容器样式 - 允许每个板块内部滚动
.slide-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
  will-change: transform;
  contain: layout style paint;
}

.slide-content {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translateZ(0);
  backface-visibility: hidden;
  contain: layout style;

  // 隐藏滚动条但保持滚动功能
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

// 覆盖 Swiper 垂直分页器默认样式 - 只针对主导航
.home-swiper {
  :deep(.swiper-vertical > .swiper-pagination-bullets),
  :deep(.swiper-pagination-vertical.swiper-pagination-bullets) {
    top: auto !important;
    right: auto !important;
    bottom: 0 !important;
    left: 0 !important;
    transform: none !important;
    width: 100% !important;
  }

  // 自定义主导航分页器样式 - 底部横向布局，带背景容器
  > :deep(.swiper-pagination) {
    bottom: 0 !important;
    left: 0 !important;
    transform: none !important;
    width: 100% !important;
    top: auto !important;
    right: auto !important;
    display: flex;
    flex-direction: row;
    gap: 18px;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    background: linear-gradient(to top, rgba(173, 216, 230, 0.85), rgba(173, 216, 230, 0.75));
    backdrop-filter: blur(15px);
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);

    // 左右留白效果
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      width: 20px;
      pointer-events: none;
    }

    &::before {
      left: 0;
      background: linear-gradient(to right, rgba(173, 216, 230, 0.85), transparent);
    }

    &::after {
      right: 0;
      background: linear-gradient(to left, rgba(173, 216, 230, 0.85), transparent);
    }

    .swiper-pagination-bullet {
      width: 42px;
      height: 42px;
      background: rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(10px);
      border-radius: 8px;
      opacity: 1;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid rgba(255, 255, 255, 0.5);
      margin: 0 !important;
      cursor: pointer;

      .bullet-icon {
        font-size: 20px;
        filter: grayscale(100%) opacity(0.6);
        transition: all 0.3s ease;
      }

      &:hover {
        transform: scale(1.1) translateY(-2px);
        background: rgba(255, 255, 255, 0.5);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

        .bullet-icon {
          filter: grayscale(0%) opacity(1);
        }
      }

      &.swiper-pagination-bullet-active {
        width: 48px;
        height: 48px;
        background: rgba(229, 238, 255, 0.95);
        border-color: rgba(229, 238, 255, 1);
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
        transform: translateY(-3px);

        .bullet-icon {
          font-size: 24px;
          filter: grayscale(0%) opacity(1);
          transform: scale(1.1);
        }
      }
    }

    // 移动端响应式
    @media (max-width: 768px) {
      padding: 18px 0;
      gap: 14px;

      .swiper-pagination-bullet {
        width: 36px;
        height: 36px;
        border-width: 1.5px;
        border-radius: 6px;

        .bullet-icon {
          font-size: 17px;
        }

        &.swiper-pagination-bullet-active {
          width: 42px;
          height: 42px;

          .bullet-icon {
            font-size: 20px;
          }
        }
      }
    }

    // 小屏手机
    @media (max-width: 480px) {
      padding: 15px 0;
      gap: 10px;

      .swiper-pagination-bullet {
        width: 32px;
        height: 32px;
        border-radius: 5px;

        .bullet-icon {
          font-size: 15px;
        }

        &.swiper-pagination-bullet-active {
          width: 36px;
          height: 36px;

          .bullet-icon {
            font-size: 17px;
          }
        }
      }
    }
  }
}

// 采访板块样式
.interview-wrapper {
  padding: 0 !important;
  overflow: hidden;

  .interview-swiper {
    width: 100%;
    height: 100vh;

    :deep(.swiper-pagination) {
      bottom: 20px;

      .swiper-pagination-bullet {
        width: 10px;
        height: 10px;
        background: rgba(255, 255, 255, 0.5);
        opacity: 1;

        &.swiper-pagination-bullet-active {
          background: rgba(229, 238, 255, 1);
          width: 30px;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
