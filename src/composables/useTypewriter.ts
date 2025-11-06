import { ref } from 'vue'

export interface TypewriterOptions {
  speed?: number // 打字速度（ms/字符）
  delay?: number // 开始前延迟（ms）
  cursor?: boolean // 是否显示光标
  onComplete?: () => void // 完成回调
}

/**
 * 打字机效果组合函数
 */
export function useTypewriter() {
  const isTyping = ref(false)

  /**
   * 单行文本打字机效果
   * @param text 要显示的文本
   * @param callback 每次更新时的回调
   * @param options 配置选项
   */
  const typeText = (
    text: string,
    callback: (displayText: string) => void,
    options: TypewriterOptions = {}
  ) => {
    const {
      speed = 50,
      delay = 0,
      cursor = false,
      onComplete
    } = options

    isTyping.value = true
    let currentIndex = 0

    setTimeout(() => {
      const timer = setInterval(() => {
        if (currentIndex <= text.length) {
          const displayText = text.slice(0, currentIndex)
          callback(cursor && currentIndex < text.length ? displayText + '|' : displayText)
          currentIndex++
        } else {
          clearInterval(timer)
          isTyping.value = false
          onComplete?.()
        }
      }, speed)
    }, delay)
  }

  /**
   * 逐行打字机效果
   * @param lines 文本行数组
   * @param callback 每行更新时的回调 (lineIndex, displayText, isComplete)
   * @param options 配置选项
   */
  const typeLines = (
    lines: string[],
    callback: (lineIndex: number, displayText: string, isComplete: boolean) => void,
    options: TypewriterOptions = {}
  ) => {
    const { speed = 50, delay = 0 } = options

    let currentLineIndex = 0

    const typeNextLine = () => {
      if (currentLineIndex >= lines.length) {
        return
      }

      const line = lines[currentLineIndex]
      if (!line) return // 防止undefined

      const lineIndex = currentLineIndex

      typeText(
        line,
        (displayText) => {
          callback(lineIndex, displayText, false)
        },
        {
          speed,
          delay: currentLineIndex === 0 ? delay : 300, // 行间间隔300ms
          cursor: true,
          onComplete: () => {
            callback(lineIndex, line, true) // 完成时移除光标
            currentLineIndex++
            typeNextLine()
          }
        }
      )
    }

    typeNextLine()
  }

  /**
   * 使用 requestAnimationFrame 的高性能打字机效果
   * @param text 要显示的文本
   * @param callback 每次更新时的回调
   * @param options 配置选项
   */
  const typeTextRAF = (
    text: string,
    callback: (displayText: string) => void,
    options: TypewriterOptions = {}
  ) => {
    const { speed = 50, delay = 0, onComplete } = options

    isTyping.value = true
    let currentIndex = 0
    let lastTime = Date.now()
    let rafId: number

    const animate = () => {
      const now = Date.now()
      const delta = now - lastTime

      if (delta >= speed) {
        if (currentIndex <= text.length) {
          callback(text.slice(0, currentIndex))
          currentIndex++
          lastTime = now
        } else {
          isTyping.value = false
          onComplete?.()
          return
        }
      }

      if (currentIndex <= text.length) {
        rafId = requestAnimationFrame(animate)
      }
    }

    setTimeout(() => {
      rafId = requestAnimationFrame(animate)
    }, delay)

    // 返回取消函数
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }

  /**
   * 根据文本长度自动调整速度
   */
  const getAdaptiveSpeed = (textLength: number): number => {
    if (textLength > 100) return 20 // 快速
    if (textLength > 50) return 30 // 中速
    return 50 // 慢速
  }

  return {
    typeText,
    typeLines,
    typeTextRAF,
    getAdaptiveSpeed,
    isTyping
  }
}
