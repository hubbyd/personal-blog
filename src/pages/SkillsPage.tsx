import { motion } from "framer-motion";
import { Code, Database, Cloud, Brain, Terminal, GitBranch, Layers, Cpu } from "lucide-react";
import { useTranslation } from "../i18n/useTranslation";

function SkillsPage() {
  const { t } = useTranslation();

  const skillDetails = [
    {
      category: t.skillsPage.frontend,
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      image: "/assets/photo.jpg",
      skills: [
        { name: "HTML5/CSS3", level: 95, years: 3 },
        { name: "JavaScript", level: 90, years: 3 },
        { name: "TypeScript", level: 85, years: 2 },
        { name: "React", level: 90, years: 2 },
        { name: "Vue.js", level: 80, years: 2 },
        { name: "Tailwind CSS", level: 90, years: 1 },
      ],
    },
    {
      category: t.skillsPage.backend,
      icon: Terminal,
      color: "from-green-500 to-emerald-500",
      image: "/assets/photo.jpg",
      skills: [
        { name: "Node.js", level: 80, years: 2 },
        { name: "Python", level: 75, years: 2 },
        { name: "Java", level: 70, years: 2 },
        { name: "C/C++", level: 65, years: 2 },
        { name: "Next.js", level: 75, years: 1 },
        { name: "Express.js", level: 75, years: 1 },
      ],
    },
    {
      category: t.skillsPage.database,
      icon: Database,
      color: "from-purple-500 to-pink-500",
      image: "/assets/photo.jpg",
      skills: [
        { name: "MySQL", level: 80, years: 2 },
        { name: "SQLite", level: 85, years: 2 },
        { name: "PostgreSQL", level: 70, years: 1 },
        { name: "MongoDB", level: 75, years: 1 },
      ],
    },
    {
      category: t.skillsPage.ai,
      icon: Brain,
      color: "from-red-500 to-orange-500",
      image: "/assets/photo.jpg",
      skills: [
        { name: "TensorFlow", level: 70, years: 1 },
        { name: "PyTorch", level: 65, years: 1 },
        { name: "OpenAI API", level: 85, years: 1 },
        { name: "LangChain", level: 80, years: 1 },
        { name: "Prompt Engineering", level: 90, years: 1 },
        { name: "Hugging Face", level: 70, years: 1 },
      ],
    },
    {
      category: t.skillsPage.devops,
      icon: Cloud,
      color: "from-yellow-500 to-amber-500",
      image: "/assets/photo.jpg",
      skills: [
        { name: "Git", level: 90, years: 3 },
        { name: "Docker", level: 70, years: 1 },
        { name: "Kubernetes", level: 60, years: 1 },
        { name: "AWS", level: 65, years: 1 },
        { name: "Firebase", level: 75, years: 1 },
      ],
    },
    {
      category: t.skillsPage.other,
      icon: Layers,
      color: "from-indigo-500 to-violet-500",
      image: "/assets/photo.jpg",
      skills: [
        { name: "Vite", level: 85, years: 2 },
        { name: "Webpack", level: 70, years: 1 },
        { name: "Jest", level: 75, years: 1 },
        { name: "Cypress", level: 70, years: 1 },
        { name: "Figma", level: 65, years: 1 },
      ],
    },
  ];

  const tools = [
    { name: "VS Code", icon: Cpu, category: t.skillsPage.ide },
    { name: "GitHub", icon: GitBranch, category: t.skillsPage.versionControl },
    { name: "Postman", icon: Terminal, category: t.skillsPage.apiTesting },
    { name: "Figma", icon: Layers, category: t.skillsPage.design },
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
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{t.skillsPage.title}</h1>
          <p className="text-gray-400 text-lg mb-8">{t.skillsPage.subtitle}</p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillDetails.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden"
            >
              <div className="relative h-24 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.category}
                  className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}>
                    <category.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{category.category}</h3>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-300 font-medium">{skill.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 text-sm">{skill.level}%</span>
                          <span className="text-gray-600 text-xs">• {skill.years}y</span>
                        </div>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: catIndex * 0.1 + skillIndex * 0.05 }}
                          className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">{t.skillsPage.tools}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
                  <tool.icon className="w-8 h-8 text-gray-400 group-hover:text-primary-400 transition-colors" />
                </div>
                <h3 className="text-white font-semibold mb-1">{tool.name}</h3>
                <p className="text-gray-500 text-sm">{tool.category}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-16 glass-card rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">{t.skillsPage.learningRoadmap}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-white/5 rounded-xl">
              <h3 className="text-primary-400 font-semibold mb-2">{t.skillsPage.currentFocus}</h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• {t.skillsPage.advancedReact}</li>
                <li>• {t.skillsPage.aiIntegration}</li>
                <li>• {t.skillsPage.systemDesign}</li>
              </ul>
            </div>
            <div className="p-4 bg-white/5 rounded-xl">
              <h3 className="text-accent-400 font-semibold mb-2">{t.skillsPage.nextGoals}</h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• {t.skillsPage.fullstack}</li>
                <li>• {t.skillsPage.cloudArchitecture}</li>
                <li>• {t.skillsPage.devopsPractices}</li>
              </ul>
            </div>
            <div className="p-4 bg-white/5 rounded-xl">
              <h3 className="text-purple-400 font-semibold mb-2">{t.skillsPage.futureVision}</h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• {t.skillsPage.aiProducts}</li>
                <li>• {t.skillsPage.openSource}</li>
                <li>• {t.skillsPage.techLeadership}</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default SkillsPage;