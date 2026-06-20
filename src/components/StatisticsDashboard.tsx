import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Eye,
  Users,
  Heart,
  TrendingUp,
  Clock,
  Calendar,
  Activity,
  RefreshCw,
  Globe,
  CheckCircle,
} from "lucide-react";
import {
  getVisitorStats,
  getViewTrend,
  getOnlineCount,
  exportStats,
  trackPageView,
} from "../utils/visitorTracker";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
}

function StatCard({ title, value, icon, color, subtitle }: StatCardProps) {
  return (
    <motion.div
      className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-purple-200/60 text-xs mb-1">{title}</p>
          <p className="text-2xl font-bold text-white">{value.toLocaleString()}</p>
          {subtitle && (
            <p className="text-purple-200/40 text-xs mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
      </div>
    </motion.div>
  );
}

interface ChartBarProps {
  date: string;
  views: number;
  maxViews: number;
}

function ChartBar({ date, views, maxViews }: ChartBarProps) {
  const height = maxViews > 0 ? (views / maxViews) * 100 : 0;
  const dayName = new Date(date).toLocaleDateString("zh-CN", {
    weekday: "short",
  });

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-full h-24 bg-white/5 rounded-lg relative overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-pink-500/50 to-purple-500/50 rounded-lg"
          initial={{ height: 0 }}
          animate={{ height: `${height}%` }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <div className="absolute inset-0 flex items-end justify-center pb-1">
          <span className="text-white/60 text-xs">{views}</span>
        </div>
      </div>
      <span className="text-purple-200/60 text-xs">{dayName}</span>
    </div>
  );
}

export default function StatisticsDashboard() {
  const [stats, setStats] = useState({
    views: 0,
    visitors: 0,
    logins: 0,
    uniqueUsers: 0,
    todayViews: 0,
    todayVisitors: 0,
    yesterdayViews: 0,
  });
  const [weeklyData, setWeeklyData] = useState<
    { date: string; views: number }[]
  >([]);
  const [onlineCount, setOnlineCount] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = () => {
    setIsRefreshing(true);
    const visitorStats = getVisitorStats();
    const weekly = getViewTrend(7);
    const online = getOnlineCount();

    setStats(visitorStats);
    setWeeklyData(weekly);
    setOnlineCount(online);
    setLastUpdate(new Date());

    setTimeout(() => setIsRefreshing(false), 500);
  };

  useEffect(() => {
    loadData();

    // 模拟实时更新
    const interval = setInterval(() => {
      trackPageView();
      loadData();
    }, 30000); // 每30秒更新一次

    return () => clearInterval(interval);
  }, []);

  const maxViews = Math.max(...weeklyData.map((d) => d.views), 1);

  const handleExport = () => {
    const data = exportStats();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `blog-stats-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">数据统计</h2>
          <p className="text-purple-200/60 text-sm mt-1">
            实时访客数据与浏览统计
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-sm font-medium">
              {onlineCount} 在线
            </span>
          </div>
          <motion.button
            onClick={loadData}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={isRefreshing ? { rotate: 360 } : {}}
            transition={{ duration: 0.5 }}
          >
            <RefreshCw className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="总浏览量"
          value={stats.views}
          icon={<Eye className="w-5 h-5 text-cyan-400" />}
          color="bg-cyan-500/20"
          subtitle={`今日 ${stats.todayViews}`}
        />
        <StatCard
          title="独立访客"
          value={stats.visitors}
          icon={<Users className="w-5 h-5 text-pink-400" />}
          color="bg-pink-500/20"
          subtitle={`今日 ${stats.todayVisitors}`}
        />
        <StatCard
          title="登录次数"
          value={stats.logins}
          icon={<Heart className="w-5 h-5 text-red-400" />}
          color="bg-red-500/20"
        />
        <StatCard
          title="昨日浏览"
          value={stats.yesterdayViews}
          icon={<TrendingUp className="w-5 h-5 text-green-400" />}
          color="bg-green-500/20"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Trend */}
        <motion.div
          className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-400" />
              <h3 className="text-white font-medium">近7天浏览趋势</h3>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {weeklyData.map((data) => (
              <ChartBar
                key={data.date}
                date={data.date}
                views={data.views}
                maxViews={maxViews}
              />
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-purple-400" />
            <h3 className="text-white font-medium">数据概览</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-cyan-400" />
                <span className="text-purple-200/80 text-sm">独立用户</span>
              </div>
              <span className="text-white font-bold">{stats.uniqueUsers}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-purple-200/80 text-sm">今日浏览</span>
              </div>
              <span className="text-white font-bold">{stats.todayViews}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-pink-400" />
                <span className="text-purple-200/80 text-sm">在线人数</span>
              </div>
              <span className="text-white font-bold">{onlineCount}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-purple-200/40 text-xs">
        <span>数据更新时间: {lastUpdate.toLocaleTimeString()}</span>
        <div className="flex items-center gap-4">
          <button
            onClick={handleExport}
            className="hover:text-white transition-colors"
          >
            导出数据
          </button>
          <span>|</span>
          <span>基于 localStorage 存储</span>
        </div>
      </div>
    </div>
  );
}