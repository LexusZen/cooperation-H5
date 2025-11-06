#!/bin/bash
# 批量修复图片路径脚本

echo "正在修复图片路径..."

# 修复 Section3.vue
echo "修复 Section3.vue..."
sed -i "s|url('/images/|url(getImageUrl('/images/|g" src/views/Section3.vue

# 修复 Section4.vue
echo "修复 Section4.vue..."
sed -i "s|url('/images/|url(getImageUrl('/images/|g" src/views/Section4.vue
sed -i "s|'/images/|getImageUrl('/images/|g" src/views/Section4.vue

# 修复 Section5.vue
echo "修复 Section5.vue..."
sed -i "s|'/images/|getImageUrl('/images/|g" src/views/Section5.vue

# 修复 HomeView.vue
echo "修复 HomeView.vue..."
sed -i "s|'/images/|getImageUrl('/images/|g" src/views/HomeView.vue

# 修复 InterviewCard.vue
echo "修复 InterviewCard.vue..."
sed -i "s|'/images/|getImageUrl('/images/|g" src/components/InterviewCard.vue

echo "完成!"
