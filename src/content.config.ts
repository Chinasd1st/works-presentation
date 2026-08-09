import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Works collection — one Markdown file per work.
 * 作品集合 —— 每个作品一个 Markdown 文件。
 *
 * Adding a work (批量添加作品):
 *   1. copy src/content/works/_template.md to src/content/works/<slug>.md
 *   2. fill in the frontmatter fields
 *   3. drop the cover image into public/works/<slug>.jpg (optional)
 *
 * Frontmatter fields (frontmatter 字段):
 *   title       — work title 作品标题
 *   category    — photography | design | illustration | other
 *   date        — completion date 完成日期
 *   cover       — cover image path under /public 封面图路径
 *   featured    — show on homepage hero grid 是否在首页精选展示
 *   tags        — keywords 标签
 *   location    — where it was shot / made (photography) 拍摄地点
 *   description — one-line summary shown on cards 卡片上的单行简介
 *   body        — full description, rendered on the detail page 详情页正文
 */
export const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['photography', 'design', 'illustration', 'other']),
    date: z.coerce.date(),
    cover: z.string().default('/works/placeholder.svg'),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    location: z.string().optional(),
    description: z.string().optional(),
  }),
});

// Register all collections here (Astro 7 requires a `collections` export)
// 在此注册所有集合（Astro 7 要求导出 collections 对象）
export const collections = { works };
