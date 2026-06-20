/**
 * 访客追踪与数据存储工具
 * 支持 localStorage 本地存储和可扩展的后端同步
 */

const STORAGE_KEY = "rement_blog_stats";
const VISITOR_ID_KEY = "rement_visitor_id";
const LAST_SYNC_KEY = "rement_last_sync";

// 数据结构
interface VisitorStats {
  views: number;
  visitors: number;
  logins: number;
  uniqueUsers: number;
  todayViews: number;
  todayVisitors: number;
  yesterdayViews: number;
  lastVisit: string;
  visitorIds: string[];
  loginRecords: LoginRecord[];
  dailyStats: DailyStats[];
  lastSync: string;
}

interface LoginRecord {
  id: string;
  timestamp: string;
  email?: string;
}

interface DailyStats {
  date: string;
  views: number;
  visitors: number;
  logins: number;
}

// 生成唯一访客ID
function generateVisitorId(): string {
  return "v_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 9);
}

// 生成登录记录ID
function generateLoginId(): string {
  return "l_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 9);
}

// 获取今日日期字符串
function getTodayString(): string {
  return new Date().toISOString().split("T")[0];
}

// 获取昨日日期字符串
function getYesterdayString(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split("T")[0];
}

// 获取或创建访客ID
function getOrCreateVisitorId(): string {
  let visitorId = localStorage.getItem(VISITOR_ID_KEY);
  if (!visitorId) {
    visitorId = generateVisitorId();
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }
  return visitorId;
}

// 获取统计数据
function getStats(): VisitorStats {
  const stored = localStorage.getItem(STORAGE_KEY);
  const defaultStats: VisitorStats = {
    views: 0,
    visitors: 0,
    logins: 0,
    uniqueUsers: 0,
    todayViews: 0,
    todayVisitors: 0,
    yesterdayViews: 0,
    lastVisit: new Date().toISOString(),
    visitorIds: [],
    loginRecords: [],
    dailyStats: [],
    lastSync: new Date().toISOString(),
  };

  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // 确保所有字段都存在
      return { ...defaultStats, ...parsed };
    } catch {
      return defaultStats;
    }
  }
  return defaultStats;
}

// 保存统计数据
function saveStats(stats: VisitorStats): void {
  stats.lastSync = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

// 更新每日统计
function updateDailyStats(stats: VisitorStats, date: string): void {
  const today = getTodayString();
  
  // 如果是今天，更新今日统计
  if (date === today) {
    stats.todayViews = stats.views;
    stats.todayVisitors = stats.visitors;
  }
  
  // 如果是昨天，更新昨日统计
  if (date === getYesterdayString()) {
    stats.yesterdayViews = stats.views;
  }
  
  // 查找或创建当日统计记录
  let dayStat = stats.dailyStats.find((d) => d.date === date);
  if (!dayStat) {
    dayStat = { date, views: 0, visitors: 0, logins: 0 };
    stats.dailyStats.push(dayStat);
  }
  
  // 保持最近30天的统计数据
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const cutoffDate = thirtyDaysAgo.toISOString().split("T")[0];
  stats.dailyStats = stats.dailyStats.filter((d) => d.date >= cutoffDate);
}

// 追踪页面浏览
export function trackPageView(): void {
  const stats = getStats();
  const today = getTodayString();
  const visitorId = getOrCreateVisitorId();

  // 增加浏览量
  stats.views += 1;

  // 如果是新的访客
  if (!stats.visitorIds.includes(visitorId)) {
    stats.visitorIds.push(visitorId);
    stats.visitors += 1;
    stats.uniqueUsers += 1;
  }

  // 更新每日统计
  updateDailyStats(stats, today);

  stats.lastVisit = new Date().toISOString();
  saveStats(stats);
}

// 追踪登录
export function trackLogin(email?: string): string {
  const stats = getStats();
  const today = getTodayString();
  const loginId = generateLoginId();

  // 创建登录记录
  const record: LoginRecord = {
    id: loginId,
    timestamp: new Date().toISOString(),
    email: email,
  };

  stats.loginRecords.push(record);
  stats.logins += 1;

  // 保持最近100条登录记录
  if (stats.loginRecords.length > 100) {
    stats.loginRecords = stats.loginRecords.slice(-100);
  }

  // 更新每日统计
  updateDailyStats(stats, today);

  saveStats(stats);
  return loginId;
}

// 获取登录记录
export function getLoginRecords(limit: number = 10): LoginRecord[] {
  const stats = getStats();
  return stats.loginRecords.slice(-limit).reverse();
}

// 获取统计数据
export function getVisitorStats(): {
  views: number;
  visitors: number;
  logins: number;
  uniqueUsers: number;
  todayViews: number;
  todayVisitors: number;
  yesterdayViews: number;
} {
  const stats = getStats();
  const today = getTodayString();

  // 如果今天的统计还没有初始化，进行更新
  if (stats.todayViews === 0 && stats.views > 0) {
    updateDailyStats(stats, today);
    saveStats(stats);
  }

  return {
    views: stats.views,
    visitors: stats.visitors,
    logins: stats.logins,
    uniqueUsers: stats.uniqueUsers,
    todayViews: stats.todayViews,
    todayVisitors: stats.todayVisitors,
    yesterdayViews: stats.yesterdayViews,
  };
}

// 获取每日统计（最近7天）
export function getWeeklyStats(): DailyStats[] {
  const stats = getStats();
  const today = getTodayString();
  
  // 确保今日统计已更新
  updateDailyStats(stats, today);
  saveStats(stats);

  // 获取最近7天的数据
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const cutoffDate = sevenDaysAgo.toISOString().split("T")[0];

  return stats.dailyStats
    .filter((d) => d.date >= cutoffDate)
    .sort((a, b) => a.date.localeCompare(b.date));
}

// 获取浏览量趋势（用于图表）
export function getViewTrend(days: number = 7): { date: string; views: number }[] {
  const stats = getStats();
  const result: { date: string; views: number }[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    
    const dayStat = stats.dailyStats.find((d) => d.date === dateStr);
    result.push({
      date: dateStr,
      views: dayStat?.views || 0,
    });
  }

  return result;
}

// 重置所有统计（谨慎使用）
export function resetAllStats(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(VISITOR_ID_KEY);
  localStorage.removeItem(LAST_SYNC_KEY);
}

// 导出统计数据（用于备份或调试）
export function exportStats(): string {
  const stats = getStats();
  return JSON.stringify(stats, null, 2);
}

// 同步状态
export function getSyncStatus(): {
  lastSync: string;
  pendingSync: boolean;
} {
  const stats = getStats();
  const lastSyncTime = new Date(stats.lastSync).getTime();
  const now = Date.now();
  const syncInterval = 5 * 60 * 1000; // 5分钟

  return {
    lastSync: stats.lastSync,
    pendingSync: now - lastSyncTime > syncInterval,
  };
}

// 初始化 - 在应用启动时调用
export function initTracking(): void {
  // 追踪一次页面浏览
  trackPageView();
}

// 获取实时在线人数（模拟）
export function getOnlineCount(): number {
  const stats = getStats();
  const now = Date.now();
  const fiveMinutesAgo = new Date(now - 5 * 60 * 1000).toISOString();
  
  // 简单模拟：最近5分钟有操作的访客视为"在线"
  const recentVisits = stats.loginRecords.filter(
    (r) => r.timestamp > fiveMinutesAgo
  ).length;
  
  // 返回1 + 模拟的在线人数（实际项目中需要后端支持）
  return Math.min(recentVisits + Math.floor(Math.random() * 5) + 1, 99);
}