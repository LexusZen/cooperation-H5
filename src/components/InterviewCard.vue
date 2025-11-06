<template>
  <div class="interview-card">
    <!-- 画布容器 -->
    <div class="canvas-container">
      <!-- 上半部分：背景图 -->
      <div class="background-section">
        <img :src="person.background || '/images/section1/bg-main.jpg'" :alt="person.name" />
      </div>

      <!-- 下半部分：人物信息和引文 -->
      <div class="info-section">
        <!-- 头像和姓名职位（左右结构） -->
        <div class="header-info">
          <div class="avatar">
            <img v-if="person.avatar" :src="person.avatar" :alt="person.name" />
            <div v-else class="avatar-placeholder">{{ person.name[0] }}</div>
          </div>

          <div class="person-info">
            <h3 class="name">{{ person.name }}</h3>
            <p class="role">{{ person.role }}</p>
          </div>
        </div>

        <!-- 引文内容 -->
        <div class="quote-section">
          <p class="quote-text">{{ person.quote }}</p>
        </div>
      </div>
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
.interview-card {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: rgb(229, 238, 255);
  padding: 20px;

  // 画布容器
  .canvas-container {
    width: 100%;
    max-width: 1200px;
    height: calc(100vh - 130px); // 减去顶部20px + 底部导航90px + 额外20px
    max-height: 900px;
    background: rgb(229, 238, 255);
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  // 上半部分：背景图
  .background-section {
    width: 100%;
    height: 65%;
    position: relative;
    overflow: hidden;
    border-radius: 20px 20px 0 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  // 下半部分：人物信息
  .info-section {
    width: 100%;
    height: 35%;
    background: rgb(229, 238, 255);
    display: flex;
    flex-direction: column;
    padding: 20px;
    position: relative;

    // 头像和姓名（左右结构）
    .header-info {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 15px;

      .avatar {
        width: 70px;
        height: 70px;
        min-width: 70px;
        border-radius: 8px;
        overflow: hidden;
        border: 3px solid #fff;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        background: #fff;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .avatar-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 32px;
          font-weight: bold;
        }
      }

      .person-info {
        flex: 1;
        text-align: left;

        .name {
          font-size: 24px;
          font-weight: bold;
          color: #1f2937;
          margin: 0 0 6px 0;
        }

        .role {
          font-size: 15px;
          color: #4b5563;
          margin: 0;
          font-weight: 500;
          line-height: 1.4;
        }
      }
    }

    // 引文内容
    .quote-section {
      flex: 1;
      width: 100%;
      display: flex;
      align-items: flex-start;
      overflow-y: auto;

      .quote-text {
        font-size: 15px;
        line-height: 1.8;
        color: #1f2937;
        margin: 0;
        text-align: justify;
        position: relative;
        padding-left: 15px;
        border-left: 3px solid rgba(102, 126, 234, 0.4);

        &::before {
          content: '"';
          position: absolute;
          left: -8px;
          top: -10px;
          font-size: 50px;
          color: rgba(102, 126, 234, 0.2);
          font-family: Georgia, serif;
          line-height: 1;
        }
      }
    }
  }

  // 平板适配（480px以上）
  @media (min-width: 480px) {
    padding: 25px;

    .canvas-container {
      height: calc(100vh - 145px); // 减去顶部25px + 底部导航95px + 额外25px
      border-radius: 24px;
    }

    .background-section {
      height: 65%;
      border-radius: 24px 24px 0 0;
    }

    .info-section {
      height: 35%;
      padding: 25px 30px;

      .header-info {
        gap: 18px;
        margin-bottom: 18px;

        .avatar {
          width: 80px;
          height: 80px;
          min-width: 80px;
          border-radius: 10px;
        }

        .person-info {
          .name {
            font-size: 22px;
          }

          .role {
            font-size: 15px;
          }
        }
      }

      .quote-section {
        .quote-text {
          font-size: 16px;
          line-height: 1.8;
        }
      }
    }
  }

  // PC端适配（768px以上）
  @media (min-width: 768px) {
    padding: 30px;

    .canvas-container {
      height: calc(100vh - 160px); // 减去顶部30px + 底部导航100px + 额外30px
      border-radius: 28px;
    }

    .background-section {
      height: 68%;
      border-radius: 28px 28px 0 0;
    }

    .info-section {
      height: 32%;
      padding: 30px 40px;

      .header-info {
        gap: 20px;
        margin-bottom: 20px;

        .avatar {
          width: 90px;
          height: 90px;
          min-width: 90px;
          border-radius: 12px;
        }

        .person-info {
          .name {
            font-size: 24px;
            margin-bottom: 8px;
          }

          .role {
            font-size: 16px;
          }
        }
      }

      .quote-section {
        .quote-text {
          font-size: 17px;
          line-height: 1.85;
          padding-left: 18px;

          &::before {
            font-size: 55px;
          }
        }
      }
    }
  }
}
</style>
