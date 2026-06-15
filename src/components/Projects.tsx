import { motion } from "framer-motion";
import { Github, ExternalLink, Folder, ArrowRight } from "lucide-react";
import { useTranslation } from "../i18n/useTranslation";

const projects = [
  {
    title: "Personal Blog System",
    description: "A modern blog platform built with React + TypeScript + Tailwind CSS, supporting Markdown editing and code highlighting.",
    tags: ["React", "TypeScript", "Tailwind", "Node.js"],
    github: "https://github.com",
    demo: "#",
  },
  {
    title: "E-commerce Frontend",
    description: "An e-commerce platform frontend based on Vue3 with complete features including product display, cart, and order management.",
    tags: ["Vue3", "Pinia", "Vite", "Element Plus"],
    github: "https://github.com",
    demo: "#",
  },
  {
    title: "Data Visualization Dashboard",
    description: "Interactive data visualization dashboard using ECharts with multiple chart types and real-time data updates.",
    tags: ["React", "ECharts", "TypeScript", "Ant Design"],
    github: "https://github.com",
    demo: "#",
  },
  {
    title: "Todo Application",
    description: "A clean and elegant todo management application with task categorization and data persistence.",
    tags: ["React", "LocalStorage", "Tailwind", "Framer Motion"],
    github: "https://github.com",
    demo: "#",
  },
];

function Projects() {
  const { t } = useTranslation();

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 font-medium tracking-wider text-sm uppercase">{t.projects.subtitle}</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4">{t.projects.title}</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group glass-card rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform duration-300">
                    <Folder className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 glass-card rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Github className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 glass-card rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </motion.a>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gradient transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-5 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-white/5 rounded-full text-sm text-gray-400 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-primary-400 font-medium group/link"
                >
                  {t.projects.viewDetails}
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 glass-card rounded-xl text-white font-bold hover:bg-white/10 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <Github className="w-5 h-5" />
            {t.projects.viewMore}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;
