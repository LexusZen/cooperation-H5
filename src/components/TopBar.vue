<template>
  <div class="top-bar">
    <div class="logo-section">
      <img src="/images/section6/logo.png" alt="深汕合作区" class="logo" />
    </div>
    <div class="text-section">
      <span class="title">深汕合作区</span>
    </div>
  </div>
</template>

<script setup lang="ts">
// 顶部信息栏组件
</script>

<style scoped lang="scss">
.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 1000;

  .logo-section {
    display: flex;
    align-items: center;
    animation: floatUpDown 3s ease-in-out infinite;

    .logo {
      height: 40px;
      width: auto;
      object-fit: contain;
    }
  }

  .text-section {
    animation: floatUpDown 3s ease-in-out infinite;

    .title {
      font-size: 18px;
      font-weight: bold;
      color: rgb(16, 224, 248);
      letter-spacing: 2px;
      text-shadow: 0 0 15px rgba(16, 224, 248, 0.5);
      font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
    }
  }

  // 平板适配
  @media (min-width: 480px) {
    height: 65px;
    padding: 0 30px;

    .logo-section {
      .logo {
        height: 45px;
      }
    }

    .text-section {
      .title {
        font-size: 20px;
        letter-spacing: 2.5px;
      }
    }
  }

  // PC端适配
  @media (min-width: 768px) {
    height: 70px;
    padding: 0 40px;

    .logo-section {
      .logo {
        height: 50px;
      }
    }

    .text-section {
      .title {
        font-size: 24px;
        letter-spacing: 3px;
      }
    }
  }
}

@keyframes floatUpDown {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
