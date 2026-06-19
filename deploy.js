#!/usr/bin/env node
// Auto-create GitHub repository and deploy to Vercel

const { execSync } = require('child_process');
const https = require('https');
const readline = require('readline');

const repoName = 'personal-blog';
const githubUsername = 'hubbyd';

function exec(command) {
  console.log(`Executing: ${command}`);
  try {
    return execSync(command, { encoding: 'utf-8', stdio: 'pipe' });
  } catch (error) {
    console.error(`Error executing: ${command}`);
    console.error(error.message);
    return null;
  }
}

function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });
    req.on('error', reject);
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function createGitHubRepo(token) {
  console.log('\n📦 Creating GitHub repository...');
  
  const options = {
    hostname: 'api.github.com',
    path: '/user/repos',
    method: 'POST',
    headers: {
      'Authorization': `token ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'Personal-Blog-Deployer'
    }
  };

  const result = await makeRequest(options, {
    name: repoName,
    description: 'My personal portfolio blog - React + TypeScript',
    private: false,
    auto_init: false
  });

  if (result.status === 201 || result.status === 200) {
    console.log('✅ GitHub repository created successfully!');
    return true;
  } else {
    console.log(`❌ Failed to create repository: ${JSON.stringify(result.data)}`);
    return false;
  }
}

async function main() {
  console.log('🚀 Personal Blog Deployment Script');
  console.log('================================\n');

  // Check if GitHub token is provided
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    console.log('\n❌ GitHub Token not found!');
    console.log('\n📋 To get a GitHub Token:');
    console.log('1. Go to https://github.com/settings/tokens');
    console.log('2. Click "Generate new token (classic)"');
    console.log('3. Select scopes: repo, workflow');
    console.log('4. Copy the token');
    console.log('\nThen run:');
    console.log('  $env:GITHUB_TOKEN = "your-token-here"');
    console.log('  node deploy.js');
    return;
  }

  // Create GitHub repo
  const repoCreated = await createGitHubRepo(token);
  
  if (!repoCreated) {
    console.log('\n⚠️  Repository might already exist, continuing...');
  }

  // Set up git remote
  console.log('\n🔗 Setting up Git remote...');
  exec(`git remote set-url origin https://${githubUsername}:${token}@github.com/${githubUsername}/${repoName}.git`);
  
  // Push to GitHub
  console.log('\n📤 Pushing to GitHub...');
  exec('git push -u origin main --force');

  console.log('\n✅ Deployment preparation complete!');
  console.log('\n📋 Next steps:');
  console.log('1. Go to https://vercel.com');
  console.log('2. Log in with GitHub');
  console.log('3. Import your repository');
  console.log('4. Deploy!');
}

main().catch(console.error);
