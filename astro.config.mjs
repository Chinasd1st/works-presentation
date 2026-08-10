// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// sharp + Node 24 on Windows hits a libuv assertion (UV_HANDLE_CLOSING)
// with the default thread pool during image generation; limit concurrency.
// sharp 在 Windows + Node 24 下默认线程池会触发 libuv 断言崩溃，限制并发。
process.env.SHARP_CONCURRENCY ||= '1';

// https://astro.build/config
export default defineConfig({
  site: 'https://silentnrtx.top',
  base: '/works-presentation/',
  integrations: [sitemap()],
});
