import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, Calendar, Users, Star } from "lucide-react";
import { useTranslation } from "../i18n/useTranslation";
import { useNavigate, useParams } from "react-router-dom";

function ProjectDetail() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  
  const project = t.projects.projectList.find(
    (p) => p.title.toLowerCase().replace(/\s+/g, "-") === projectId
  );

  if (!project) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Project Not Found</h2>
          <button
            onClick={() => navigate("/projects")}
            className="px-6 py-3 bg-gradient-primary rounded-xl text-white font-medium"
          >
            Back to Projects
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-24"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button
          onClick={() => navigate("/projects")}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-5 h-5" />
          {t.projects.viewMore}
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row md:items-start gap-8 mb-8">
            <div className="w-24 h-24 bg-gradient-primary rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-4xl font-bold text-white">
                {project.title.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {project.title}
              </h1>
              <p className="text-primary-400 text-lg mb-4">{project.subtitle}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  2026
                </span>
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Individual Project
                </span>
                <span className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  100+ Stars
                </span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">About This Project</h2>
            <p className="text-gray-400 leading-relaxed text-lg">{project.description}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Tech Stack</h2>
            <div className="bg-black/20 rounded-xl p-4">
              <code className="text-gray-300 text-sm">{project.tech}</code>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Features</h2>
            <ul className="space-y-3">
              {[
                "User authentication and authorization",
                "Real-time data synchronization",
                "Responsive design for all devices",
                "Performance optimization",
                "Error handling and logging",
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-400">
                  <span className="w-2 h-2 bg-primary-500 rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-white/5 rounded-full text-sm text-gray-300 border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-primary rounded-xl text-white font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </motion.a>
            <motion.a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 glass-card rounded-xl text-white font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-5 h-5" />
              Live Demo
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ProjectDetail;