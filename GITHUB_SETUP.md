# GitHub 仓库创建指南

## 如果你还没有创建 GitHub 仓库，请按以下步骤操作：

### 步骤 1: 创建新的 GitHub 仓库

1. 打开 GitHub 网站: https://github.com
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 填写仓库信息：
   - **Repository name**: `personal-blog` (或你喜欢的名字)
   - **Description**: `My personal portfolio blog - React + TypeScript`
   - 选择 **Public**（公开）
   - **不要**勾选 "Add a README file"（因为我们已经有了）
4. 点击 "Create repository"

### 步骤 2: 更新本地 Git 仓库的远程地址

创建仓库后，GitHub 会显示仓库的 URL，看起来像这样：
```
https://github.com/YOUR_USERNAME/personal-blog.git
```

然后在终端运行以下命令（替换成你的实际 URL）：

```powershell
# 如果仓库名是 personal-blog
git remote set-url origin https://github.com/hubbyd/personal-blog.git

# 或者如果你的仓库名不同，用这个格式
git remote set-url origin https://github.com/hubbyd/YOUR_REPO_NAME.git
```

### 步骤 3: 推送代码到 GitHub

```powershell
git push -u origin main
```

### 步骤 4: 在 Vercel 部署

1. 访问 https://vercel.com
2. 使用 GitHub 账号登录
3. 点击 "Import Project"
4. 选择你刚创建的仓库 `personal-blog`
5. Vercel 会自动检测配置，点击 "Deploy"
6. 等待部署完成，你将获得一个 `.vercel.app` 域名

## 你的下一步操作

请在 GitHub 上创建仓库后告诉我，我会帮你完成后续的推送和部署！

**重要提示**: 
- 确保选择 **Public** 仓库（Vercel 免费版需要）
- 不要勾选 "Initialize this repository with a README"（除非你想从头开始）
