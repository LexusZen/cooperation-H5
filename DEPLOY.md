# GitHub Pages 部署说明

## 📦 项目信息

- **仓库**: https://github.com/LexusZen/cooperation-H5
- **GitHub Pages 地址**: https://lexuszen.github.io/cooperation-H5/

## 🚀 部署方式

本项目支持两种部署方式:

### 方式一: GitHub Actions 自动部署 (推荐)

每次推送到 `master` 分支时会自动触发部署。

#### 初次配置步骤:

1. **在 GitHub 仓库中开启 GitHub Pages**:
   - 进入仓库: https://github.com/LexusZen/cooperation-H5
   - 点击 `Settings` → `Pages`
   - 在 `Source` 下选择 `GitHub Actions`

2. **推送代码触发部署**:
   ```bash
   git add .
   git commit -m "配置 GitHub Pages 部署"
   git push origin master
   ```

3. **查看部署进度**:
   - 进入仓库的 `Actions` 标签页
   - 查看 "部署到 GitHub Pages" 工作流运行状态
   - 部署成功后访问: https://lexuszen.github.io/cooperation-H5/

### 方式二: 手动部署 (可选)

如果需要手动部署,可以使用 `gh-pages` 包:

1. **安装 gh-pages**:
   ```bash
   npm install -D gh-pages
   ```

2. **执行部署命令**:
   ```bash
   npm run deploy
   ```

## 📝 配置说明

### vite.config.ts

已配置 `base` 路径为 `/cooperation-H5/`,确保所有资源能正确加载:

```typescript
export default defineConfig({
  base: '/cooperation-H5/', // GitHub Pages 部署路径
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
```

### package.json

添加了部署脚本:

```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

## 🔍 故障排查

### 问题 1: 页面显示 404

**原因**: GitHub Pages 可能还未启用或者配置错误

**解决方案**:
1. 检查仓库 Settings → Pages 是否选择了 `GitHub Actions`
2. 确认 vite.config.ts 中的 `base` 路径是否为 `/cooperation-H5/`
3. 等待几分钟,GitHub Pages 部署需要时间

### 问题 2: 资源加载失败 (CSS/JS 404)

**原因**: base 路径配置不正确

**解决方案**:
1. 确认 vite.config.ts 中 `base: '/cooperation-H5/'`
2. 重新构建: `npm run build`
3. 重新部署: `git push origin master`

### 问题 3: 图片无法显示

**原因**: 图片路径问题

**解决方案**:
1. 确保图片放在 `public/` 目录下
2. 使用绝对路径引用: `/images/xxx.jpg` (会自动添加 base 前缀)
3. 避免使用相对路径 `./images/xxx.jpg`

## 📱 本地预览生产版本

部署前可以本地预览生产版本:

```bash
npm run build
npm run preview
```

然后访问显示的本地地址 (通常是 http://localhost:4173/cooperation-H5/)

## 🔄 更新部署

修改代码后,只需推送到 master 分支即可自动部署:

```bash
git add .
git commit -m "更新内容描述"
git push origin master
```

等待 GitHub Actions 工作流完成后,访问 https://lexuszen.github.io/cooperation-H5/ 查看更新。

## 📞 技术支持

如遇到部署问题,可以:
1. 查看 GitHub Actions 工作流日志
2. 检查仓库 Settings → Pages 配置
3. 参考 [GitHub Pages 官方文档](https://docs.github.com/en/pages)
