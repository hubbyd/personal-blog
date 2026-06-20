import { motion } from "framer-motion";
import { Trophy, Medal, Star, Award, Crown, Sparkles } from "lucide-react";
import { useTranslation } from "../i18n/useTranslation";

function Awards() {
  const { t } = useTranslation();

  const categoryMap: Record<string, string> = {
    innovation: t.awards.catInnovation,
    competition: t.awards.catCompetition,
    honor: t.awards.catHonor,
    scholarship: t.awards.catScholarship,
  };

  const levelMap: Record<string, string> = {
    school: t.awards.levelSchool,
    regional: t.awards.levelRegional,
  };

  const awards = [
    {
      name: t.about.awards.items.sanchuang,
      category: "innovation",
      date: "2024",
      level: "school",
      icon: Crown,
      color: "from-yellow-500 to-orange-500",
      image: "/assets/photo.jpg",
    },
    {
      name: t.about.awards.items.computerDesign,
      category: "competition",
      date: "2024",
      level: "regional",
      icon: Trophy,
      color: "from-blue-500 to-cyan-500",
      image: "/assets/photo.jpg",
    },
    {
      name: t.about.awards.items.excellentLeague,
      category: "honor",
      date: "2024",
      level: "school",
      icon: Medal,
      color: "from-red-500 to-pink-500",
      image: "/assets/photo.jpg",
    },
    {
      name: t.about.awards.items.excellentStudent,
      category: "honor",
      date: "2024",
      level: "school",
      icon: Star,
      color: "from-purple-500 to-pink-500",
      image: "/assets/photo.jpg",
    },
    {
      name: t.about.awards.items.thirdScholarship,
      category: "scholarship",
      date: "2024",
      level: "school",
      icon: Award,
      color: "from-green-500 to-emerald-500",
      image: "/assets/photo.jpg",
    },
    {
      name: t.about.awards.items.boxueCup,
      category: "competition",
      date: "2024",
      level: "school",
      icon: Trophy,
      color: "from-indigo-500 to-blue-500",
      image: "/assets/photo.jpg",
    },
    {
      name: t.about.awards.items.guochuang,
      category: "innovation",
      date: "2024",
      level: "school",
      icon: Sparkles,
      color: "from-teal-500 to-cyan-500",
      image: "/assets/photo.jpg",
    },
    {
      name: t.about.awards.items.challengeCup,
      category: "competition",
      date: "2024",
      level: "school",
      icon: Trophy,
      color: "from-orange-500 to-yellow-500",
      image: "/assets/photo.jpg",
    },
  ];

  const stats = [
    { number: "8", label: t.awards.totalAwards },
    { number: "2", label: t.awards.firstPrizes },
    { number: "2", label: t.awards.corePapers },
    { number: "1", label: t.awards.yearsActive },
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
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{t.awards.title}</h1>
          <p className="text-gray-400 text-lg mb-8">{t.awards.subtitle}</p>
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
                    {categoryMap[award.category] || award.category}
                  </span>
                  <span className="px-3 py-1 bg-primary-500/20 rounded-full text-xs text-primary-400">
                    {levelMap[award.level] || award.level}
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
            {t.awards.academicPublications}
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-xl">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-white font-semibold">
                  {t.about.papers.items.paper1.title}
                </h3>
                <span className="px-3 py-1 bg-primary-500/20 rounded-full text-xs text-primary-400">
                  {t.about.papers.items.paper1.level}
                </span>
              </div>
              <p className="text-gray-500 text-sm">{t.about.papers.items.paper1.journal}</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-white font-semibold">
                  {t.about.papers.items.paper2.title}
                </h3>
                <span className="px-3 py-1 bg-accent-500/20 rounded-full text-xs text-accent-400">
                  {t.about.papers.items.paper2.level}
                </span>
              </div>
              <p className="text-gray-500 text-sm">{t.about.papers.items.paper2.journal}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Awards;