// auto-deploy.cjs - CommonJS format for deployment
const https = require('https');
const { exec } = require('child_process');

const GITHUB_USERNAME = 'hubbyd';
const REPO_NAME = 'personal-blog';

console.log('🚀 Personal Blog 一键部署脚本');
console.log('=' .repeat(50));

const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.log('\n❌ 错误: 未找到 GitHub Token');
  process.exit(1);
}

function createRepo() {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      name: REPO_NAME,
      description: 'My personal portfolio blog - React + TypeScript + Tailwind CSS',
      private: false,
      auto_init: false
    });

    const options = {
      hostname: 'api.github.com',
      path: '/user/repos',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'Personal-Blog-Auto-Deploy',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 201) {
          resolve(JSON.parse(data));
        } else if (res.statusCode === 422) {
          console.log('⚠️  仓库已存在，跳过创建步骤...');
          resolve({ already_exists: true });
        } else {
          reject(new Error(`创建仓库失败: ${res.statusCode}`));
        }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function runGit(cmd) {
  return new Promise((resolve) => {
    exec(cmd, { encoding: 'utf8' }, (error, stdout, stderr) => {
      if (error && !stderr?.includes('Everything up-to-date')) {
        console.log(`   ${stderr || error.message}`);
      }
      resolve(stdout);
    });
  });
}

async function deploy() {
  try {
    console.log('\n📦 正在创建 GitHub 仓库...');
    const repo = await createRepo();
    console.log('✅ GitHub 仓库准备完成!');

    console.log('\n🔗 设置 Git 远程仓库...');
    const remoteUrl = `https://${GITHUB_USERNAME}:${token}@github.com/${GITHUB_USERNAME}/${REPO_NAME}.git`;
    await runGit(`git remote set-url origin ${remoteUrl}`);
    console.log('✅ 远程仓库设置完成!');

    console.log('\n📤 正在推送到 GitHub...');
    await runGit('git push -u origin main --force');
    console.log('✅ 代码推送成功!');

    console.log('\n' + '='.repeat(50));
    console.log('🎉 部署准备完成!');
    console.log('\n📋 下一步操作:');
    console.log(`   1. 打开: https://vercel.com/new`);
    console.log('   2. 点击 "Import Git Repository"');
    console.log(`   3. 选择仓库: ${GITHUB_USERNAME}/${REPO_NAME}`);
    console.log('   4. 点击 "Deploy"');
    console.log('   5. 等待 30 秒，完成！');
    console.log('\n🌐 博客地址:');
    console.log(`   https://${REPO_NAME}-${GITHUB_USERNAME}.vercel.app`);
    console.log('='.repeat(50));

  } catch (error) {
    console.error('\n❌ 部署失败:', error.message);
  }
}

deploy();