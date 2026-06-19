import { motion } from "framer-motion";
import { Trophy, Medal, Star, Award, Crown, Sparkles } from "lucide-react";

function Awards() {

  const awards = [
    {
      name: "三创赛校级一等奖",
      category: "创新创业",
      date: "2024",
      level: "校级",
      icon: Crown,
      color: "from-yellow-500 to-orange-500",
      image: "/assets/photo.jpg",
    },
    {
      name: "计算机设计大赛西北赛区三等奖",
      category: "学科竞赛",
      date: "2024",
      level: "区域",
      icon: Trophy,
      color: "from-blue-500 to-cyan-500",
      image: "/assets/photo.jpg",
    },
    {
      name: "优秀共青团员",
      category: "荣誉称号",
      date: "2024",
      level: "校级",
      icon: Medal,
      color: "from-red-500 to-pink-500",
      image: "/assets/photo.jpg",
    },
    {
      name: "优秀学生干部",
      category: "荣誉称号",
      date: "2024",
      level: "校级",
      icon: Star,
      color: "from-purple-500 to-pink-500",
      image: "/assets/photo.jpg",
    },
    {
      name: "校级三等奖学金",
      category: "奖学金",
      date: "2024",
      level: "校级",
      icon: Award,
      color: "from-green-500 to-emerald-500",
      image: "/assets/photo.jpg",
    },
    {
      name: "博学杯校级三等奖",
      category: "学科竞赛",
      date: "2024",
      level: "校级",
      icon: Trophy,
      color: "from-indigo-500 to-blue-500",
      image: "/assets/photo.jpg",
    },
    {
      name: "国创赛校级三等奖",
      category: "创新创业",
      date: "2024",
      level: "校级",
      icon: Sparkles,
      color: "from-teal-500 to-cyan-500",
      image: "/assets/photo.jpg",
    },
    {
      name: "挑战杯校级三等奖",
      category: "学科竞赛",
      date: "2024",
      level: "校级",
      icon: Trophy,
      color: "from-orange-500 to-yellow-500",
      image: "/assets/photo.jpg",
    },
  ];

  const stats = [
    { number: "8", label: "Total Awards" },
    { number: "2", label: "First Prizes" },
    { number: "2", label: "Core Papers" },
    { number: "1", label: "Years Active" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Awards & Honors</h1>
          <p className="text-gray-400 text-lg mb-8">Recognition and Achievements</p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <div className="text-4xl font-black text-gradient mb-2">{stat.number}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="group glass-card rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10"
            >
              <div className="relative h-32 overflow-hidden">
                <img
                  src={award.image}
                  alt={award.name}
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] to-transparent" />
                <div className={`absolute top-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br ${award.color} flex items-center justify-center shadow-lg`}>
                  <award.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gradient transition-all">
                  {award.name}
                </h3>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400">
                    {award.category}
                  </span>
                  <span className="px-3 py-1 bg-primary-500/20 rounded-full text-xs text-primary-400">
                    {award.level}
                  </span>
                </div>
                
                <p className="text-gray-500 text-sm">{award.date}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 glass-card rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Crown className="w-6 h-6 text-primary-400" />
            Academic Publications
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-xl">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-white font-semibold">
                  《基于改进FCM和注意力机制的点云语义分割算法》
                </h3>
                <span className="px-3 py-1 bg-primary-500/20 rounded-full text-xs text-primary-400">
                  北大核心
                </span>
              </div>
              <p className="text-gray-500 text-sm">武汉科技大学学报</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-white font-semibold">
                  《结合CBAM注意力与混合采样的恶意软件二分类方法》
                </h3>
                <span className="px-3 py-1 bg-accent-500/20 rounded-full text-xs text-accent-400">
                  核心期刊
                </span>
              </div>
              <p className="text-gray-500 text-sm">信息工程大学学报</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Awards;