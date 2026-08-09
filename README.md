# Silentnrtx — Portfolio / 作品集网站

A minimal personal portfolio built with [Astro](https://astro.build) — photography & design works, deployed to GitHub Pages.

基于 [Astro](https://astro.build) 的极简个人作品集网站（摄影/设计），部署到 GitHub Pages。

Design reference: [hoshimiyatoto.com](https://hoshimiyatoto.com/) — monochrome, oversized typography, generous whitespace. 设计参照：黑白灰极简、超大字号对比、大留白。

![tech](https://img.shields.io/badge/Astro-7.2-black) ![deploy](https://img.shields.io/badge/GitHub%20Pages-Actions-black)

---

## Features / 特性

- **Monochrome design system** 黑白灰设计系统 — Geist font, light/dark theme toggle (follows system, persisted)
- **Content collections** 内容集合 — each work is one Markdown file; adding works is copy-and-paste
- **Category filter** 分类筛选 — photography / design / illustration / other
- **View Transitions** — smooth page transitions between works
- **SEO** — sitemap, meta description, OG tags, per-page titles
- **Quality gates** 质量关卡 — `astro check` (type-safe content), ESLint, Prettier
- **Deployed via GitHub Actions** 自动化部署 — push to `main` publishes to GitHub Pages

## Quick start / 快速开始

```bash
pnpm install
pnpm dev          # local dev server 本地开发 http://localhost:4321
pnpm check        # type check 类型检查
pnpm lint         # eslint
pnpm format       # prettier --write
pnpm build        # production build 生产构建 → dist/
```

Requires Node.js ≥ 20 and pnpm. 需要 Node.js ≥ 20 与 pnpm。

## Project structure / 项目结构

```
src/
├── content.config.ts   # works collection schema 作品集合定义（字段校验）
├── site.config.ts      # site-wide settings 站点配置（名称/导航/社交链接）
├── content/works/      # one .md per work 每个作品一个 Markdown 文件
├── layouts/Layout.astro
├── components/WorkCard.astro
├── pages/
│   ├── index.astro          # homepage: hero + featured 首页
│   ├── works/index.astro    # all works + filter 全部作品
│   ├── works/[slug].astro   # work detail 作品详情
│   └── about.astro
public/works/           # work images 作品图片
docs/                   # documentation 文档
.github/workflows/      # GitHub Pages deployment 部署
```

## Documentation / 文档

- [docs/works.md](docs/works.md) — How to add / edit works (中英双语)
- [docs/deploy.md](docs/deploy.md) — Deployment & domain setup (中英双语)

## Tech decisions / 技术决策

- **pnpm** — package manager (pnpm 11; settings live in `pnpm-workspace.yaml`)
- **ESLint (not Biome)** — `eslint-plugin-astro` is the mature Astro-ecosystem linting stack; Biome's `.astro` support is still experimental (🟡 per biomejs.dev language-support page, as of Biome 2.5.x)
- **TypeScript 6.x** — Astro 7's `astro check` requires the TS 6 programmatic API; TS 7 (native) does not ship it yet
- **Astro 7 content collections** — requires `export const collections = { ... }` (single-collection exports are ignored)

## License / 许可

Content and code © Silentnrtx.
