import { motion } from "framer-motion";
import { Code, Database, Cloud, Brain, Zap } from "lucide-react";
import { useTranslation } from "../i18n/useTranslation";

const skillCategories = [
  {
    icon: Code,
    title: "前端开发",
    skills: [
      { name: "JavaScript", level: 90, color: "#f7df1e" },
      { name: "TypeScript", level: 85, color: "#3178c6" },
      { name: "React", level: 90, color: "#61dafb" },
      { name: "Vue", level: 80, color: "#42b883" },
      { name: "HTML5", level: 95, color: "#e34f26" },
      { name: "CSS3", level: 90, color: "#1572b6" },
      { name: "Tailwind CSS", level: 90, color: "#06b6d4" },
      { name: "Sass", level: 75, color: "#cc6699" },
    ]
  },
  {
    icon: Zap,
    title: "后端开发",
    skills: [
      { name: "Node.js", level: 80, color: "#339933" },
      { name: "Python", level: 75, color: "#3776ab" },
      { name: "Java", level: 70, color: "#ed8b00" },
      { name: "C/C++", level: 65, color: "#00599c" },
      { name: "Next.js", level: 75, color: "#000000" },
      { name: "Nuxt.js", level: 70, color: "#00c58e" },
      { name: "Vite", level: 85, color: "#646cff" },
      { name: "Webpack", level: 70, color: "#8dd6f9" },
    ]
  },
  {
    icon: Database,
    title: "数据库",
    skills: [
      { name: "MySQL", level: 80, color: "#4479a1" },
      { name: "SQLite", level: 85, color: "#003b57" },
      { name: "PostgreSQL", level: 70, color: "#4169e1" },
      { name: "MongoDB", level: 75, color: "#47a248" },
    ]
  },
  {
    icon: Brain,
    title: "AI 技术",
    skills: [
      { name: "TensorFlow", level: 70, color: "#ff6f00" },
      { name: "PyTorch", level: 65, color: "#ee4c2c" },
      { name: "OpenAI API", level: 85, color: "#10a37f" },
      { name: "LangChain", level: 80, color: "#1c3fa8" },
      { name: "Prompt Engineering", level: 90, color: "#8b5cf6" },
      { name: "Hugging Face", level: 70, color: "#f5a623" },
    ]
  },
];

const devOpsTools = [
  "Git", "GitHub", "Docker", "Kubernetes", "AWS", "Firebase",
  "Jest", "Cypress", "VS Code", "Figma", "Postman"
];

function Skills() {
  const { t } = useTranslation();

  return (
    <section id="skills" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 font-medium tracking-wider text-sm uppercase">{t.skills.subtitle}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-4">{t.skills.title}</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <category.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-400" />
                <h3 className="text-lg sm:text-xl font-bold text-white">{category.title}</h3>
              </div>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: catIndex * 0.1 + skillIndex * 0.05 }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400 text-sm font-medium">{skill.name}</span>
                      <span className="text-gray-500 text-xs">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: catIndex * 0.1 + skillIndex * 0.05 }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}66)` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <Cloud className="w-5 h-5 sm:w-6 sm:h-6 text-accent-400" />
            <h3 className="text-xl sm:text-2xl font-bold text-white">{t.skills.tools}</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
            {devOpsTools.map((tool, index) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-card rounded-xl p-3 sm:p-4 text-center hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10 group"
              >
                <span className="text-gray-300 text-xs sm:text-sm font-medium group-hover:text-white transition-colors">{tool}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;