import { motion } from "framer-motion";
import { GraduationCap, Code, BookOpen, Award } from "lucide-react";
import { useTranslation } from "../i18n/useTranslation";

function About() {
  const { t } = useTranslation();

  const achievements = [
    { icon: GraduationCap, title: t.about.achievements.school, desc: t.about.achievements.major },
    { icon: Code, title: t.about.achievements.frontend, desc: t.about.achievements.tech },
    { icon: BookOpen, title: t.about.achievements.courses, desc: t.about.achievements.courseList },
    { icon: Award, title: t.about.achievements.awards, desc: t.about.achievements.awardList },
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

        <div className="grid lg:grid-cols-2 gap-12 items-center">
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
                      <span className="text-5xl font-bold text-white">Z</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Zhang Hehao</h3>
                    <p className="text-gray-400 mt-1">Frontend Developer</p>
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
              {achievements.map((item, index) => (
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
      </div>
    </section>
  );
}

export default About;