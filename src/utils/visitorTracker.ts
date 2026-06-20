const STORAGE_KEY = "rement_blog_stats";

interface VisitorStats {
  views: number;
  visitors: number;
  logins: number;
  lastVisit: string;
  visitorIds: string[];
}

function generateVisitorId(): string {
  return "visitor_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9);
}

function getStats(): VisitorStats {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    views: 0,
    visitors: 0,
    logins: 0,
    lastVisit: new Date().toISOString(),
    visitorIds: [],
  };
}

function saveStats(stats: VisitorStats): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

export function trackVisitor(isLogin: boolean = false, _username?: string): void {
  const stats = getStats();
  const today = new Date().toDateString();
  const lastVisitDate = new Date(stats.lastVisit).toDateString();

  stats.views += 1;

  if (today !== lastVisitDate) {
    const visitorId = generateVisitorId();
    if (!stats.visitorIds.includes(visitorId)) {
      stats.visitorIds.push(visitorId);
      stats.visitors += 1;
    }
  }

  if (isLogin) {
    stats.logins += 1;
  }

  stats.lastVisit = new Date().toISOString();
  saveStats(stats);
}

export function getVisitorStats(): { views: number; visitors: number; logins: number } {
  const stats = getStats();
  return {
    views: stats.views,
    visitors: stats.visitors,
    logins: stats.logins,
  };
}

export function resetStats(): void {
  localStorage.removeItem(STORAGE_KEY);
}
