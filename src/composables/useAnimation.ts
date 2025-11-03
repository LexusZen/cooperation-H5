import { gsap } from 'gsap'
import type { AnimationConfig } from '@/types'

/**
 * GSAP动画组合函数
 */
export function useAnimation() {
  // 淡入动画
  const fadeIn = (target: string | Element, config?: AnimationConfig) => {
    return gsap.from(target, {
      opacity: 0,
      duration: config?.duration || 1,
      delay: config?.delay || 0,
      ease: config?.ease || 'power2.out'
    })
  }

  // 上滑淡入
  const fadeInUp = (target: string | Element, config?: AnimationConfig) => {
    return gsap.from(target, {
      opacity: 0,
      y: 50,
      duration: config?.duration || 1,
      delay: config?.delay || 0,
      ease: config?.ease || 'power2.out'
    })
  }

  // 缩放进入
  const scaleIn = (target: string | Element, config?: AnimationConfig) => {
    return gsap.from(target, {
      opacity: 0,
      scale: 0.8,
      duration: config?.duration || 1,
      delay: config?.delay || 0,
      ease: config?.ease || 'back.out(1.7)'
    })
  }

  // 数字滚动动画
  const animateNumber = (element: Element, endValue: number, duration = 2) => {
    const obj = { value: 0 }
    return gsap.to(obj, {
      value: endValue,
      duration,
      ease: 'power1.out',
      onUpdate: () => {
        element.textContent = Math.floor(obj.value).toLocaleString()
      }
    })
  }

  // 时间轴动画
  const createTimeline = (config?: gsap.TimelineVars) => {
    return gsap.timeline(config)
  }

  return {
    fadeIn,
    fadeInUp,
    scaleIn,
    animateNumber,
    createTimeline
  }
}
