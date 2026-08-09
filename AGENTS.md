# AGENTS.md — LLM 协作规范

本文件约束 AI 助手在本仓库中的行为。所有改动须遵守下述规则，未经用户确认不得偏离。

## 项目概览

- Astro 7 静态站：个人摄影/设计作品集（Silentnrtx）。
- 部署：GitHub Pages，`base: /works-presentation/`（`astro.config.mjs`）。
- 技术栈：Astro + TypeScript；anime.js（仅 hero scramble 与入场动画）；simple-icons（页脚 SNS 品牌图标）；@fontsource Geist。
- 参考风格：hoshimiyatoto.com（黑白灰极简、超大标题、左侧固定侧栏）。

## 设计系统（严格遵守）

- **颜色**：黑白灰（`--bg/--fg/--fg-secondary/--fg-faint/--line`）+ 唯一强调色 `--accent` 蓝青 `#467fff`（深浅主题统一）。`--accent` 仅用作小装饰（如 `.eyebrow::before` 像素点），禁止大面积使用。禁止引入其他色调。
- **反色变量**：`--invert-bg/--invert-fg/--invert-fg-secondary`。仅首页侧栏与 `MarqueeStrip` 跑马灯条使用。
- **字体**：仅 Geist Variable（`--font-sans`）。禁止引入/使用 mono、pixel 字体（历史遗留，已移除）。
- **边框**：全站禁止可见 `1px solid` 边框（含 hover 态）。分隔靠留白与反色块。
- **遮罩**：图片上的文字遮罩用纯色 `color-mix(in srgb, var(--bg) 60%, transparent)`，禁止渐变遮罩。
- **容器**：近乎全宽（`--container: 1800px`，`padding-inline: clamp(20px, 4vw, 64px)`）。
- **布局**：`body` grid = 220px 左侧 sticky 侧栏 + 内容列；`≤900px` 侧栏折叠为顶栏（theme 按钮隐藏）。
- **动效**：
  - 只用 anime.js 官方 API（如 `scrambleText`，函数式 tween，作用于 `innerHTML`）。
  - 图片晶格化入场：canvas 近邻采样，粗→细 `[48,24,12,6,3]`，总 152ms，结束立即移除 canvas。仅首页作品卡片（`.work-card .thumb img`）。
  - 所有动效必须 `prefers-reduced-motion: reduce` 降级。
- **Emoji**：全站禁用。

## 工程规范

- **提交**：conventional commits（`feat/fix/style/refactor/chore/docs/ci`），scope 可省略；一次一逻辑；不得合并未经请求的文件。
- **组件拆分**：页面 <300 行；可复用 UI 放 `src/components/*.astro`；样式 scoped，仅动态创建元素用 `:global()`。
- **命令**：`pnpm dev` / `pnpm build` / `pnpm check` / `pnpm lint`。改动后必须 `pnpm build` 验证。
- **编码（Windows）**：文件写入一律用编辑工具（保持 UTF-8）。**禁用 PowerShell 进行文件操作/批量替换**（`-replace`/`Set-Content` 曾破坏 UTF-8 中文注释，见历史事故）；确需批量替换时用 **node 脚本**（读文件为 Buffer/UTF-8，写回时保持 UTF-8 无 BOM）。
- **拍摄日期**：创建作品 markdown 时，拍摄时间优先读图片 EXIF（DateTimeOriginal）；无 EXIF 时用文件创建时间；不得凭主观猜测。
- **路径**：所有资源引用须拼 `import.meta.env.BASE_URL`（见现有组件写法）。public 下文件名统一小写扩展名（Windows 大小写不敏感会导致构建 `ImageNotFound`）。
- **已知预存错误（勿擅自修改）**：`src/lib/rehypeAssetBase.ts` 的 `hast`/`unified` 类型缺失；`src/pages/works/[slug].astro` 的 `render()` 双参签名。除非用户明确要求修复。
- **内容**：`todo.md` 中的优化项需用户确认后才实施；正文/文案占位不得编造（无素材时用占位并明示）。

## 不变量

- 不新增依赖，除非用户明确要求。
- 不提交用户未要求的文件（如 `works/` 草稿目录，已入 `.gitignore` 的 `/works/`）。
- 不擅自 push；仅当用户要求时提交/推送。
