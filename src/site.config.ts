/**
 * Site-wide configuration — edit everything here in one place.
 * 站点全局配置 —— 所有需要自定义的信息集中在这里修改。
 */
export const siteConfig = {
  // Site title shown in header, footer and browser tab
  // 站点标题（页头、页脚、浏览器标签页）
  title: 'Silentnrtx',
  // Short tagline under the hero title
  // 首页大标题下的副标语
  tagline: 'Photography & Design Portfolio',
  // SEO description
  description: 'Portfolio of Silentnrtx — photography and design works.',
  // The name used for the copyright line
  copyright: 'Silentnrtx',
  // Links shown in the header and footer
  // 页头页脚链接
  nav: [
    { label: 'Works', href: '/works/' },
    { label: 'About', href: '/about/' },
  ],
  // External links (social / contact)
  // 外部链接
  social: [
    { label: 'Blog', href: 'https://silentnrtx.top' },
    { label: 'Bilibili', href: 'https://space.bilibili.com/?spm_id_from=333.1007.0.0' },
    { label: 'GitHub', href: 'https://github.com/chinasd1st' },
  ],
} as const;
