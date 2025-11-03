import { onMounted, onUnmounted, type Ref } from 'vue'

/**
 * Intersection Observer 组合函数
 * 用于监听元素进入视口
 */
export function useIntersection(
  target: Ref<Element | null>,
  callback: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit
) {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!target.value) return

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry)
        }
      })
    }, options || { threshold: 0.3 })

    observer.observe(target.value)
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  })

  return {
    observer
  }
}
