import { createClient } from '@supabase/supabase-js'

// Supabase 配置 - 请替换为您自己的项目凭证
// 访问 https://supabase.com 创建项目并获取以下信息
const supabaseUrl = 'https://your-project.supabase.co'
const supabaseAnonKey = 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 如果您还没有设置 Supabase，可以使用以下方式：
// 1. 注册 supabase.com
// 2. 创建一个新项目
// 3. 在 SQL Editor 中运行下面的建表语句
// 4. 复制 Project URL 和 anon public key 到这里

/*
-- 在 Supabase SQL Editor 中运行以下语句建表：

CREATE TABLE site_stats (
  id BIGSERIAL PRIMARY KEY,
  stat_key TEXT UNIQUE NOT NULL DEFAULT 'main',
  views BIGINT DEFAULT 0,
  visitors BIGINT DEFAULT 0,
  logins BIGINT DEFAULT 0,
  registered_users BIGINT DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 初始化一条记录
INSERT INTO site_stats (stat_key, views, visitors, logins, registered_users) 
VALUES ('main', 0, 0, 0, 0);

-- 启用 RLS
ALTER TABLE site_stats ENABLE ROW LEVEL SECURITY;

-- 允许公开读写
CREATE POLICY "Allow public access" ON site_stats
  FOR ALL USING (true) WITH CHECK (true);

-- 创建一个函数来原子性增加浏览量
CREATE OR REPLACE FUNCTION increment_views()
RETURNS BIGINT AS $$
DECLARE
  new_views BIGINT;
BEGIN
  UPDATE site_stats SET views = views + 1, updated_at = CURRENT_TIMESTAMP WHERE stat_key = 'main'
  RETURNING views INTO new_views;
  RETURN new_views;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION increment_visitors()
RETURNS BIGINT AS $$
DECLARE
  new_visitors BIGINT;
BEGIN
  UPDATE site_stats SET visitors = visitors + 1, updated_at = CURRENT_TIMESTAMP WHERE stat_key = 'main'
  RETURNING visitors INTO new_visitors;
  RETURN new_visitors;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION increment_logins()
RETURNS BIGINT AS $$
DECLARE
  new_logins BIGINT;
BEGIN
  UPDATE site_stats SET logins = logins + 1, updated_at = CURRENT_TIMESTAMP WHERE stat_key = 'main'
  RETURNING logins INTO new_logins;
  RETURN new_logins;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION increment_registered_users()
RETURNS BIGINT AS $$
DECLARE
  new_count BIGINT;
BEGIN
  UPDATE site_stats SET registered_users = registered_users + 1, updated_at = CURRENT_TIMESTAMP WHERE stat_key = 'main'
  RETURNING registered_users INTO new_count;
  RETURN new_count;
END;
$$ LANGUAGE plpgsql;
*/
