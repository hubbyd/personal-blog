import { motion } from "framer-motion";
import { useTranslation } from "../i18n/useTranslation";

const skills = [
  { name: "HTML5", level: 95, color: "#e34f26" },
  { name: "CSS3", level: 90, color: "#1572b6" },
  { name: "JavaScript", level: 85, color: "#f7df1e" },
  { name: "TypeScript", level: 80, color: "#3178c6" },
  { name: "React", level: 85, color: "#61dafb" },
  { name: "Vue", level: 75, color: "#42b883" },
  { name: "Tailwind CSS", level: 90, color: "#06b6d4" },
  { name: "Node.js", level: 70, color: "#339933" },
];

const tools = [
  "Git", "GitHub", "VS Code", "Webpack", "Vite", "npm", "Figma", "Postman"
];

function Skills() {
  const { t } = useTranslation();

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 font-medium tracking-wider text-sm uppercase">{t.skills.subtitle}</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4">{t.skills.title}</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">{t.skills.techStack}</h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300 font-medium">{skill.name}</span>
                    <span className="text-gray-500 text-sm">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">{t.skills.tools}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="glass-card rounded-xl p-4 text-center hover:bg-white/10 transition-colors"
                >
                  <span className="text-gray-300 font-medium">{tool}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 glass-card rounded-xl p-6"
            >
              <h4 className="text-xl font-bold text-white mb-4">{t.skills.progress}</h4>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">{t.skills.frontend}</span>
                <span className="text-white font-medium">85%</span>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "85%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-primary rounded-full"
                />
              </div>
              <p className="text-gray-500 text-sm mt-4">
                {t.skills.progressText}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Skills;