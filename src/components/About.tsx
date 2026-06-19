import { motion } from "framer-motion";
import { GraduationCap, Code, BookOpen, Award, FileText, Trophy, Star } from "lucide-react";
import { useTranslation } from "../i18n/useTranslation";

function About() {
  const { t } = useTranslation();

  const achievements = [
    { icon: GraduationCap, title: t.about.achievements.school, desc: t.about.achievements.major },
    { icon: Code, title: t.about.achievements.frontend, desc: t.about.achievements.tech },
    { icon: BookOpen, title: t.about.achievements.courses, desc: t.about.achievements.courseList },
    { icon: Award, title: t.about.achievements.awards, desc: t.about.achievements.awardList },
    { icon: FileText, title: t.about.achievements.papers, desc: t.about.achievements.paperList },
  ];

  const awardList = [
    { name: "优秀共青团员", type: "荣誉称号" },
    { name: "优秀学生干部", type: "荣誉称号" },
    { name: "校级三等奖学金", type: "奖学金" },
    { name: "博学杯校级三等奖", type: "学科竞赛" },
    { name: "国创赛校级三等奖", type: "学科竞赛" },
    { name: "挑战杯校级三等奖", type: "学科竞赛" },
    { name: "计算机设计大赛西北赛区三等奖", type: "学科竞赛" },
    { name: "三创赛校级一等奖", type: "学科竞赛" },
  ];

  const paperList = [
    { title: "基于改进FCM和注意力机制的点云语义分割算法", journal: "武汉科技大学学报", level: "北大核心" },
    { title: "结合CBAM注意力与混合采样的恶意软件二分类方法", journal: "信息工程大学学报", level: "核心期刊" },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 font-medium tracking-wider text-sm uppercase">{t.about.subtitle}</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4">{t.about.title}</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-primary rounded-2xl opacity-20 blur-xl" />
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden glass-card">
                <div className="w-full h-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                      <span className="text-5xl font-bold text-white">R</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">rement</h3>
                    <p className="text-gray-400 mt-1">{t.about.achievements.enrollYear}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">My Story</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              {t.about.story}
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              {t.about.story2}
            </p>

            <div className="grid grid-cols-2 gap-4">
              {achievements.slice(0, 4).map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="glass-card rounded-xl p-4 hover:bg-white/10 transition-colors"
                >
                  <item.icon className="w-6 h-6 text-primary-400 mb-3" />
                  <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-6 h-6 text-accent-400" />
            <h3 className="text-2xl font-bold text-white">{t.about.achievements.awards}</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {awardList.map((award, index) => (
              <motion.div
                key={award.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card rounded-xl p-4 hover:bg-white/10 transition-colors group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-accent-400 group-hover:text-accent-300 transition-colors" />
                  <span className="text-xs text-primary-400">{award.type}</span>
                </div>
                <h4 className="text-white font-semibold text-sm">{award.name}</h4>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-primary-400" />
            <h3 className="text-2xl font-bold text-white">{t.about.achievements.papers}</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {paperList.map((paper, index) => (
              <motion.div
                key={paper.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
                className="glass-card rounded-xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-primary-500/20 text-primary-400 text-xs font-medium rounded-full">
                    {paper.level}
                  </span>
                </div>
                <h4 className="text-white font-semibold mb-2">{paper.title}</h4>
                <p className="text-gray-500 text-sm">{paper.journal}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;