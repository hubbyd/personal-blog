# 自动化部署脚本

## 方案A: 使用 GitHub Token（推荐）

### 步骤 1: 获取 GitHub Token（免费，1分钟）

1. 打开：https://github.com/settings/tokens/new
2. 填写：
   - Note: `deploy-script`
   - Expiration: `30 days`
   - 勾选: ✅ `repo` (Full control of repositories)
3. 点击 **Generate token**
4. **复制 Token**

### 步骤 2: 运行部署命令

在终端运行（把 `YOUR_TOKEN_HERE` 替换成你的 token）：

```powershell
$env:GITHUB_TOKEN = "YOUR_TOKEN_HERE"
node deploy.js
```

---

## 方案B: 手动创建 GitHub 仓库（2分钟）

### 步骤 1: 创建仓库
1. 打开 https://github.com/new
2. 填写：
   - Repository name: `personal-blog`
   - 选择 Public
   - ✅ 不要勾选 "Add a README"
3. 点击 **Create repository**

### 步骤 2: 复制仓库 URL
创建后，复制页面上的仓库 URL（类似：`https://github.com/hubbyd/personal-blog.git`）

### 步骤 3: 设置远程仓库
```powershell
git remote set-url origin https://github.com/hubbyd/personal-blog.git
git push -u origin main
```

### 步骤 4: Vercel 部署
1. 打开 https://vercel.com/new
2. 选择 "Import Git Repository"
3. 选择 `personal-blog` 仓库
4. 点击 **Deploy**
5. 等待 30 秒，完成！

---

## 方案C: 如果你已经有了 GitHub 仓库

告诉我你的 GitHub 仓库名称，我会帮你推送代码并部署！

---

**创建 Token 截图指引：**
```
[ ] repo (Full control of repositories)  ← 勾选这个！
```

只需勾选 `repo` 权限，其他都不需要！
