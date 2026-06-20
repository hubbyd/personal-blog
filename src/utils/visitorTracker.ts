import { supabase } from './supabase'

const LOCAL_STORAGE_KEY = 'rement_blog_stats_local'

interface VisitorStats {
  views: number
  visitors: number
  logins: number
  registeredUsers: number
  lastVisit: string
  localVisitorId: string
}

interface RemoteStats {
  views: number
  visitors: number
  logins: number
  registered_users: number
}

function generateLocalVisitorId(): string {
  return 'visitor_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9)
}

function getLocalStats(): VisitorStats {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (stored) {
    return JSON.parse(stored)
  }
  const newStats: VisitorStats = {
    views: 0,
    visitors: 0,
    logins: 0,
    registeredUsers: 0,
    lastVisit: new Date().toISOString(),
    localVisitorId: generateLocalVisitorId(),
  }
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newStats))
  return newStats
}

function saveLocalStats(stats: VisitorStats): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stats))
}

// 获取远程统计数据
export async function fetchRemoteStats(): Promise<RemoteStats | null> {
  try {
    const { data, error } = await supabase
      .from('site_stats')
      .select('views, visitors, logins, registered_users')
      .eq('stat_key', 'main')
      .single()

    if (error) {
      console.warn('Supabase fetch error:', error)
      return null
    }
    return data
  } catch (err) {
    console.warn('Supabase connection error:', err)
    return null
  }
}

// 增加浏览量
export async function trackPageView(): Promise<number> {
  const stats = getLocalStats()
  const today = new Date().toDateString()
  const lastVisitDate = new Date(stats.lastVisit).toDateString()

  // 本地浏览量 +1
  stats.views += 1
  stats.lastVisit = new Date().toISOString()

  // 如果是新的一天，增加访客数
  if (today !== lastVisitDate) {
    stats.visitors += 1
  }

  saveLocalStats(stats)

  // 尝试同步到远程
  try {
    await supabase.rpc('increment_views')
  } catch (err) {
    console.warn('Failed to sync views to remote:', err)
  }

  return stats.views
}

// 追踪登录
export async function trackLogin(): Promise<void> {
  const stats = getLocalStats()
  stats.logins += 1
  saveLocalStats(stats)

  try {
    await supabase.rpc('increment_logins')
  } catch (err) {
    console.warn('Failed to sync logins to remote:', err)
  }
}

// 追踪注册
export async function trackRegister(): Promise<void> {
  const stats = getLocalStats()
  stats.registeredUsers += 1
  saveLocalStats(stats)

  try {
    await supabase.rpc('increment_registered_users')
  } catch (err) {
    console.warn('Failed to sync registered users to remote:', err)
  }
}

// 获取合并后的统计数据（本地 + 远程，取最大值保证一致性）
export async function getMergedStats(): Promise<{ views: number; visitors: number; logins: number; registeredUsers: number }> {
  const localStats = getLocalStats()
  
  // 先尝试获取远程数据
  const remoteStats = await fetchRemoteStats()

  if (remoteStats) {
    // 远程数据更可信，使用远程值
    return {
      views: Math.max(localStats.views, remoteStats.views),
      visitors: Math.max(localStats.visitors, remoteStats.visitors),
      logins: Math.max(localStats.logins, remoteStats.logins),
      registeredUsers: Math.max(localStats.registeredUsers, remoteStats.registered_users),
    }
  }

  // 无法获取远程数据，使用本地数据
  return {
    views: localStats.views,
    visitors: localStats.visitors,
    logins: localStats.logins,
    registeredUsers: localStats.registeredUsers,
  }
}

// 获取本地统计数据（用于离线或快速读取）
export function getLocalOnlyStats(): { views: number; visitors: number; logins: number; registeredUsers: number } {
  const stats = getLocalStats()
  return {
    views: stats.views,
    visitors: stats.visitors,
    logins: stats.logins,
    registeredUsers: stats.registeredUsers,
  }
}

// 重置本地统计（谨慎使用）
export function resetLocalStats(): void {
  localStorage.removeItem(LOCAL_STORAGE_KEY)
}
