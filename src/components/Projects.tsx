import { motion } from "framer-motion";
import { Github, ExternalLink, Folder, ArrowRight, Brain, MessageSquare, Wrench, Globe } from "lucide-react";
import { useTranslation } from "../i18n/useTranslation";

const projectIcons: Record<string, typeof Brain> = {
  "AI Prompt Lab": Brain,
  "AI Chat Pro": MessageSquare,
  "AI Toolkit": Wrench,
  "Personal Portfolio": Globe,
};

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

        <div className="grid md:grid-cols-2 gap-8">
          {t.projects.projectList.map((project, index) => {
            const IconComponent = projectIcons[project.title] || Folder;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group glass-card rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10"
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex items-center gap-3">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 glass-card rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                      <motion.a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 glass-card rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                        whileHover={{ scale: 1.1 }}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </motion.a>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-gradient transition-all duration-300">
                      {project.title}
                    </h3>
                    <p className="text-primary-400 text-sm">{project.subtitle}</p>
                  </div>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="text-xs text-gray-500 mb-6 bg-black/20 rounded-lg p-3">
                    <span className="text-gray-400">Tech Stack: </span>{project.tech}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-white/5 rounded-full text-sm text-gray-300 border border-white/10 hover:bg-white/10 transition-colors group-hover:border-primary-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary-400 font-medium group/link"
                  >
                    {t.projects.viewDetails}
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <motion.a
            href="https://github.com/hubbyd"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 glass-card rounded-xl text-white font-bold hover:bg-white/10 transition-all hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-6 h-6" />
            {t.projects.viewMore}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;