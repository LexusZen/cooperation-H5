/**
 * 获取正确的图片路径
 * 在开发环境返回 /images/xxx
 * 在生产环境返回 /cooperation-H5/images/xxx
 */
export function getImageUrl(path: string): string {
  // 如果路径已经包含 base,直接返回
  if (path.startsWith(import.meta.env.BASE_URL)) {
    return path
  }

  // 如果路径以 / 开头,移除它
  const cleanPath = path.startsWith('/') ? path.slice(1) : path

  // 返回带 base 的完整路径
  return `${import.meta.env.BASE_URL}${cleanPath}`
}
