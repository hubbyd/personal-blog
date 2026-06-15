# Vercel 部署指南

## 步骤 1: 访问 Vercel

1. 打开浏览器访问 [vercel.com](https://vercel.com)
2. 点击 "Sign Up" 注册账号
3. **推荐使用 GitHub 登录**（最简单的方式）

## 步骤 2: 导入 GitHub 仓库

1. 登录后，点击 "Add New..." → "Project"
2. 在 "Import Git Repository" 页面找到你的仓库：`hubbyd/2431271221-`
3. 点击 "Import" 导入

## 步骤 3: 配置项目

Vercel 会自动检测到这是 Vite + React 项目并配置好构建命令。你只需要：

1. **Framework Preset**: 会自动选择 `Vite`
2. **Build Command**: 会自动显示 `npm run build`
3. **Output Directory**: 会自动显示 `dist`

确保这些设置正确：
```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

## 步骤 4: 部署

1. 点击 "Deploy" 按钮
2. 等待部署完成（通常 30-60 秒）
3. 部署成功后，你会获得一个 URL，如：`your-project.vercel.app`

## 步骤 5: 自定义域名（可选）

1. 在项目设置中，点击 "Domains"
2. 输入你想要的域名
3. 按照提示配置 DNS 记录
4. Vercel 会自动配置免费的 SSL 证书

## 常见问题

### Q: 联系表单能正常工作吗？
A: Vercel 免费版支持静态页面和 API 函数。联系表单目前是前端演示，可以后续接入邮件服务。

### Q: 网站访问速度如何？
A: Vercel 使用全球 CDN，访问速度很快。

### Q: 如何更新网站？
A: 只需将代码推送到 GitHub，Vercel 会自动重新部署！

```
git add .
git commit -m "Update blog"
git push
```

## 你的仓库信息

- **GitHub 仓库**: https://github.com/hubbyd/2431271221-
- **部署后访问**: https://your-project.vercel.app
