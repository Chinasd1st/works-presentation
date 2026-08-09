# Deployment / 部署指南

The site deploys to GitHub Pages automatically via GitHub Actions whenever you push to `main`. 推送 `main` 分支时自动通过 GitHub Actions 部署到 GitHub Pages。

## Prerequisites / 前置条件

- GitHub account with Pages enabled 已启用 Pages 的 GitHub 账号
- Repository `chinasd1st/works-presentation` (public) 公开仓库

## How it works / 工作原理

- `.github/workflows/deploy.yml` — the workflow 工作流
- `astro.config.mjs` — `site` + `base` are set for GitHub Pages:

```js
export default defineConfig({
  site: 'https://chinasd1st.github.io',
  base: '/works-presentation/',   // must match the repo name 必须与仓库名一致
  integrations: [sitemap()],
});
```

- The official [withastro/action](https://github.com/withastro/action) builds the site; `actions/deploy-pages` publishes it 官方 Astro Action 构建 + deploy-pages 发布
- Live URL: 线上地址 **https://chinasd1st.github.io/works-presentation/**

## Deploy / 部署

```bash
git push origin main
```

Watch the workflow at **Actions → "Deploy to GitHub Pages"** (build ~2 min). 在 Actions 页查看进度。

## First-time setup (one-time) / 首次设置（只需一次）

1. Create the repository: 创建仓库
   ```bash
   gh repo create chinasd1st/works-presentation --public --source . --push
   ```
2. Enable Pages from Actions: 设置 Pages 来源为 GitHub Actions
   ```bash
   gh api repos/chinasd1st/works-presentation/pages \
     -X POST -f build_type=workflow
   ```
3. Push the workflow 推送工作流文件后自动触发首次部署。

## Custom domain / 自定义域名（可选）

1. Add a `CNAME` record pointing to `chinasd1st.github.io`. 在 DNS 服务商添加 CNAME 记录指向 `chinasd1st.github.io`。
2. Create `public/CNAME` containing your domain, e.g. `silentnrtx.com`. 创建 `public/CNAME` 文件写入你的域名。
3. In repo **Settings → Pages**, enter the custom domain. 在仓库 Settings → Pages 填写自定义域名。
4. Optional: update `site` in `astro.config.mjs` and add a `CNAME`-aware base. 可选：同步更新 astro.config.mjs 的 site 配置。

## Updating the site / 更新站点

Edit content, commit, push — the workflow rebuilds and redeploys automatically. 修改内容 → 提交 → 推送，自动重新构建部署。

```bash
git add -A && git commit -m "feat(works): add new photography work" && git push
```

## Rollback / 回滚

```bash
git revert HEAD && git push
```

The previous deployment is restored. 上一次部署会被恢复。

---

## Troubleshooting / 常见问题

| problem 问题                                        | fix 解决                                                          |
| --------------------------------------------------- | ----------------------------------------------------------------- |
| 404 on first deploy 首次部署 404                     | wait ~1 min for DNS propagation 等待 DNS 生效（约 1 分钟）          |
| workflow fails at build 构建失败                     | run `pnpm check && pnpm build` locally 本地先跑通                  |
| images 404 图片 404                                  | image must be under `public/` and path starts with `/works/...` 图片必须在 public/ 下 |
| blank page after custom domain 自定义域名后空白页     | `base` must match the subpath; for a root domain set `base: '/'` 根域名需要 base: '/' |
