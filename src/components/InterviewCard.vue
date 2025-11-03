<template>
  <div class="interview-card">
    <div class="card-header">
      <div class="avatar">
        <img v-if="person.avatar" :src="person.avatar" :alt="person.name" />
        <div v-else class="avatar-placeholder">{{ person.name[0] }}</div>
      </div>
      <div class="person-info">
        <h4>{{ person.name }}</h4>
        <p class="role">{{ person.role }}</p>
      </div>
    </div>
    <div class="quote-content">
      <div class="quote-mark">"</div>
      <p class="quote-text">{{ person.quote }}</p>
      <div class="quote-mark closing">"</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { InterviewPerson } from '@/types'

defineProps<{
  person: InterviewPerson
}>()
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.interview-card {
  background: #fff;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;

    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      flex-shrink: 0;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .avatar-placeholder {
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, $primary-color, $secondary-color);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 24px;
        font-weight: bold;
      }
    }

    .person-info {
      h4 {
        font-size: 18px;
        font-weight: bold;
        color: $text-dark;
        margin-bottom: 5px;
      }

      .role {
        font-size: 14px;
        color: #6b7280;
      }
    }
  }

  .quote-content {
    position: relative;
    padding: 0 20px;

    .quote-mark {
      position: absolute;
      font-size: 48px;
      color: $primary-color;
      opacity: 0.3;
      font-family: Georgia, serif;
      line-height: 1;

      &:not(.closing) {
        top: -10px;
        left: 0;
      }

      &.closing {
        bottom: -30px;
        right: 0;
      }
    }

    .quote-text {
      font-size: 16px;
      line-height: 1.8;
      color: #374151;
      font-style: italic;
      padding: 10px 0;
    }
  }
}
</style>
