/**
 * rehype plugin: rewrite site-root image srcs (`/works/...`) to include
 * the `base` prefix so markdown bodies render under GitHub Pages subpaths.
 *
 * rehype 插件：为 markdown 正文中的站点根路径图片（/works/...）加上 base 前缀，
 * 使其在 GitHub Pages 子路径下正常显示。
 */
import type { Root } from 'hast';
import type { Plugin } from 'unified';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const rehypeAssetBase: Plugin<[], Root> = () => (tree) => {
  console.error('[rehypeAssetBase] plugin running, base =', base);
  const visit = (node: Root | any) => {
    if (node.type === 'element' && node.tagName === 'img' && node.properties?.src) {
      const src = String(node.properties.src);
      if (
        !src.startsWith('http') &&
        !src.startsWith('data:') &&
        !src.startsWith(base) &&
        src.startsWith('/')
      ) {
        node.properties.src = `${base}${src}`;
      }
    }
    if (node.children) node.children.forEach(visit);
  };
  visit(tree);
};
