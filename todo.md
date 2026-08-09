# Todo — 优化方向

个人摄影/设计作品集（Astro + Geist，黑白灰单色调，hoshimiyatoto 式极简）。

## 视觉与交互

- [ ] hero 标题：考虑在 scrambleText 解码完成后加入逐字母交错淡入/上浮（anime.js `stagger`），避免解码结束即停的突兀感
- [ ] 作品卡片 hover：除图片 `scale(1.03)` 外，可加 meta 文字色变化或标题下划线展开动画
- [ ] 首页 Selected Works / Latest 网格：全宽容器下 2 列卡片偏大，可尝试 3 列（摄影 3:2 横图观感更佳）或按分类混合列数
- [ ] 灯箱增强：加入上一张/下一张切换（`works-body` 多图时）、双击缩放、滚动切换
- [ ] 滚动驱动动画：section 进入视口时的淡入（`anime.js` `onScroll` 或原生 IntersectionObserver），仅在 `prefers-reduced-motion: no-preference` 下启用
- [ ] 主题切换：图标化按钮（Sun/Moon，simple-icons 已有对应图标），并给 `--bg`/`--fg` 切换加 150ms 过渡
- [ ] 移动端侧栏：当前折叠为顶栏后 theme 按钮被隐藏，考虑在移动端放回导航内或增加底部固定按钮

## 内容与信息架构

- [ ] 关于页（about）：将 Contact 链接区与 bio 对齐设计语言（当前行高/字号与页面略不一致）；bio 文案确认后移除占位性质
- [ ] 首页 description：中英两段已在，可加"查看全部作品 ↓"锚点链接至 works
- [ ] 作品详情页：正文 section title "About this work" 可配置（每篇 md 可覆盖）；`work-body` 图注（figcaption）样式与灯箱联动
- [ ] 归档/分页：作品数量增多后（>20）增加按年份归档页或分页
- [ ] 404 页：自定义 404.astro（当前无），带返回首页链接，风格统一

## 性能

- [ ] 图片优化：接入 Astro `Image` 组件（`astro:assets`）做响应式尺寸 + AVIF/WebP，当前全部原图直出（guangzhou-scenery 的 DSC 图约 300KB）
- [ ] 字体：Geist Variable 按 latin 子集裁剪，当前包含 cyrillic/vietnamese 子集（可 `@fontsource/geist/latin-400.css` 等按需引入）
- [ ] anime.js 按需引入：目前 `import { animate, scrambleText } from 'animejs'` 打包约 34KB，确认无 tree-shaking 残留
- [ ] 预加载关键图片：hero 下方首屏卡片 cover 加 `fetchpriority="high"`
- [ ] 构建产物：检查 `dist` 中未使用的 CSS 类（`--radius`、`.nowrap` 等是否仍被引用）

## 可访问性

- [ ] 灯箱：`role="dialog"` + `aria-modal` + 焦点圈定（focus trap），当前仅 Esc/点击关闭
- [ ] 滚动条样式：`scrollbar-gutter: stable` 已防偏移，但 Firefox `scrollbar-width: thin` 下 hover 反馈不可见，保持可接受
- [ ] 键盘导航：hero 字母 span `aria-hidden`，确认 h1 的 `aria-label` 在动态乱码期间不被读屏中断
- [ ] 对比度：`--fg-faint`（#a3a3a3 浅色 / #6b6b6b 深色）在正文小字号下对比度偏低，检查正文是否误用 `faint`
- [ ] `prefers-reduced-motion` 全覆盖：灯箱淡入、hover scale 等 CSS 动画也应在 reduced 下禁用

## 工程

- [ ] `astro check` 的 4 个既有类型错误（`rehypeAssetBase.ts` 的 `hast`/`unified` 类型缺失、`[slug].astro` 的 `render` 签名）——修复并纳入 CI
- [ ] `lint`/`format` 命令纳入 pre-commit（husky + lint-staged）
- [ ] CI：GitHub Actions 构建 + 部署到 GitHub Pages（当前有 `.github/` 但确认 workflow 与 `base: /works-presentation/` 匹配）
- [ ] `works/` 顶层目录用途确认（当前为未跟踪内容），与 `public/works/` 的图片资产目录统一
- [ ] 图片文件命名规范：统一小写扩展名（`DSC09663.jpg`），避免 Windows 大小写不敏感导致的构建 `ImageNotFound`
