<template>
  <div class="home-container">
    <swiper
      :modules="modules"
      :direction="'vertical'"
      :slides-per-view="1"
      :space-between="0"
      :mousewheel="true"
      :speed="800"
      :pagination="{ clickable: true }"
      @slide-change="onSlideChange"
      class="home-swiper"
    >
      <swiper-slide>
        <Section1 />
      </swiper-slide>
      <swiper-slide>
        <Section2 />
      </swiper-slide>
      <swiper-slide>
        <Section3 />
      </swiper-slide>
      <swiper-slide>
        <Section4 />
      </swiper-slide>
      <swiper-slide>
        <Section5 />
      </swiper-slide>

      <!-- 采访板块 -->
      <swiper-slide>
        <div class="interview-section">
          <h2 class="interview-title">他们说</h2>
          <div class="interview-grid">
            <InterviewCard
              v-for="person in interviewPeople"
              :key="person.id"
              :person="person"
            />
          </div>
        </div>
      </swiper-slide>

      <swiper-slide>
        <Section6 />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Mousewheel, Pagination } from 'swiper/modules'
import type { InterviewPerson } from '@/types'

import Section1 from './Section1.vue'
import Section2 from './Section2.vue'
import Section3 from './Section3.vue'
import Section4 from './Section4.vue'
import Section5 from './Section5.vue'
import Section6 from './Section6.vue'
import InterviewCard from '@/components/InterviewCard.vue'

// 导入 Swiper 样式
import 'swiper/css'
import 'swiper/css/pagination'

const modules = [Mousewheel, Pagination]

const interviewPeople: InterviewPerson[] = [
  {
    id: 1,
    name: '张总',
    role: '新能源汽车产业链企业家',
    avatar: '',
    quote: '产业全链条都本地化，项目当年动工当年投产，在这里投资省时省力又省心。'
  },
  {
    id: 2,
    name: '李阿姨',
    role: '大安村村民',
    avatar: '',
    quote: '"百千万工程"让我们村变了样！以前是守着绿水青山过穷日子，现在路通了、网快了、环境美了，家门口就能就业增收，这日子真有奔头！'
  },
  {
    id: 3,
    name: '王先生',
    role: '来深建设者',
    avatar: '',
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
}

// 自定义分页器样式
:deep(.swiper-pagination) {
  right: 20px !important;
  left: auto !important;
  width: auto !important;

  .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 1;
    transition: all 0.3s ease;

    &.swiper-pagination-bullet-active {
      width: 8px;
      height: 24px;
      border-radius: 4px;
      background: #fff;
    }
  }
}

// 采访板块样式
.interview-section {
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  overflow-y: auto;

  .interview-title {
    font-size: 48px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 50px;
    text-align: center;
  }

  .interview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    max-width: 1200px;
    width: 100%;
  }
}
</style>
