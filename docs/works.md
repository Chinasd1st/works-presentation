# Adding & Editing Works / 添加与编辑作品

Every work lives as one Markdown file in `src/content/works/`. Adding a work takes two steps: copy a template and drop in an image.

每个作品对应 `src/content/works/` 下的一个 Markdown 文件。添加作品只需两步：复制模板 + 放入图片。

## 1. Add a work / 添加作品

```bash
# copy the template 复制模板
cp docs/templates/works.md src/content/works/my-work.md
```

Fill in the frontmatter 填写 frontmatter:

```yaml
---
title: "Work Title"           # required 必填
category: photography         # required 必填: photography | design | illustration | other
date: 2026-01-01              # required 必填: YYYY-MM-DD
cover: /works/my-work.jpg     # required 必填: image under public/works/
featured: false               # optional 可选: true → homepage "Selected Works"
tags: [tag1, tag2]            # optional 可选
location: "Shanghai"          # optional 可选: where it was shot (photography)
description: "One-line summary shown on cards"  # optional 可选
---
```

Write the body in Markdown below the `---` — it renders on the detail page. 在 `---` 下方用 Markdown 写正文，会渲染到详情页。

## 2. Add the image / 放入图片

Put the cover image in `public/works/` (or any path under `public/`), then reference it in `cover:`. Recommended: `1600px` wide, JPEG/WebP, `< 500 KB`.

封面图放在 `public/works/`（或 `public/` 下任意路径），在 `cover:` 中引用路径。建议：宽 1600px、JPEG/WebP 格式、小于 500KB。

For extra images inside the body: 正文中的附加图片：

```markdown
![alt text](/works/my-work-2.jpg)
*Caption 图注*
```

## 3. Fields / 字段说明

| field 字段    | type 类型     | required 必填 | notes 说明                                        |
| ------------- | ------------- | ------------- | ------------------------------------------------- |
| `title`       | string        | yes           | work title 作品标题                               |
| `category`    | enum          | yes           | `photography` / `design` / `illustration` / `other` — also drives the card aspect ratio (photography 3:2, design 1:1) 同时决定卡片图片比例 |
| `date`        | date          | yes           | `YYYY-MM-DD`, used for sorting 用于排序            |
| `cover`       | path          | yes           | `/works/xxx.jpg` — relative to `public/`          |
| `featured`    | boolean       | no            | `true` → homepage "Selected Works" grid 首页精选  |
| `tags`        | string[]      | no            | shown on the detail page 详情页标签                |
| `location`    | string        | no            | shooting location, shown on cards 拍摄地点         |
| `description` | string        | no            | card summary + SEO description 卡片简介            |

## 4. Batch operations / 批量操作

- **Reorder** 排序: works sort by `date` descending automatically. 作品自动按日期倒序排列。
- **Featured** 精选: set `featured: true` on up to 4 works. 最多 4 件作品可设精选。
- **Rename** 重命名: rename the file; the URL slug follows the filename. 重命名文件即改变 URL。
- **Delete** 删除: remove the file. 删除文件即可下架作品。

> Invalid frontmatter (wrong category, missing title) fails the build with a clear error — run `pnpm check` locally to validate. 无效的 frontmatter（错误分类、缺标题）会导致构建失败——本地运行 `pnpm check` 即可验证。

## 5. Site-wide settings / 站点配置

Edit `src/site.config.ts`: 修改站点名称、标语、导航、社交链接都在这一个文件：

```ts
export const siteConfig = {
  title: 'Silentnrtx',          // brand name — also the hero headline 品牌名（也是首页大字）
  tagline: 'Photography & Design Portfolio',
  description: '...',           // SEO description
  copyright: 'Silentnrtx',      // footer 页脚版权
  nav: [{ label: 'Works', href: '/works/' }],
  social: [],                   // external links 外部链接
};
```

The hero headline is generated from `title` (letter-by-letter spans). 首页大字由 `title` 逐字母生成。
