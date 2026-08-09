/**
 * Build a site-root-relative URL that includes the `base` prefix
 * (e.g. "/works-presentation"). Astro does NOT rewrite string-literal
 * URLs like `/works/foo.jpg`, so every asset reference must go through
 * this helper (or the rehype plugin for markdown bodies).
 *
 * 生成带 base 前缀的站点资源 URL。Astro 不会自动改写字符串字面量路径，
 * 因此组件中的资源引用必须经过此函数（markdown 正文由 rehype 插件处理）。
 */
export function assetUrl(path: string): string {
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
