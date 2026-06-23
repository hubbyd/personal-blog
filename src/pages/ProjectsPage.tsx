import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowRight, Filter, Search, Loader2 } from "lucide-react";
import { useTranslation } from "../i18n/useTranslation";
import { useState, useEffect } from "react";

interface GithubRepo {
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  pushed_at: string;
  homepage: string | null;
}

function ProjectsPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [projects, setProjects] = useState<GithubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://api.github.com/users/hubbyd/repos?sort=updated&direction=desc");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data: GithubRepo[] = await response.json();
      setProjects(data);
    } catch (err) {
      setError("Failed to load projects from GitHub");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const allTags = [...new Set(projects.flatMap((p) => p.topics))];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (project.description || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || project.topics.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

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
          <span className="text-primary-400 font-medium tracking-wider text-sm uppercase">
            {t.projects.subtitle}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mt-4">
            {t.projects.title}
          </h1>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mt-6 rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-12"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder={t.projectsPage.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
            />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-gray-500 flex-shrink-0" />
            <button
              onClick={() => setSelectedTag("")}
              className={`px-4 py-4 rounded-xl text-sm font-medium transition-all flex-shrink-0 ${
                selectedTag === ""
                  ? "bg-gradient-primary text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 border border-gray-700"
              }`}
            >
              {t.projectsPage.all}
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-4 rounded-xl text-sm font-medium transition-all flex-shrink-0 ${
                  selectedTag === tag
                    ? "bg-gradient-primary text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 border border-gray-700"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-16"
            >
              <Loader2 className="w-12 h-12 text-primary-400 mx-auto animate-spin mb-4" />
              <p className="text-gray-400 text-lg">{t.projectsPage.loading}</p>
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-16"
            >
              <p className="text-gray-500 text-lg">{error}</p>
              <button
                onClick={fetchProjects}
                className="mt-4 px-6 py-3 bg-gradient-primary rounded-xl text-white font-medium"
              >
                {t.projectsPage.retry}
              </button>
            </motion.div>
          ) : (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.full_name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group glass-card rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {project.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <motion.a
                        href={project.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 glass-card rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                      {project.homepage && (
                        <motion.a
                          href={project.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-11 h-11 glass-card rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                          whileHover={{ scale: 1.1 }}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gradient transition-all">
                    {project.name}
                  </h3>
                  <p className="text-primary-400 text-sm mb-4">
                    {project.language || "Project"}
                  </p>
                  <p className="text-gray-400 mb-6 leading-relaxed line-clamp-3">
                    {project.description || t.projectsPage.noDescription}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.topics.length > 0 ? (
                      project.topics.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 bg-white/5 rounded-full text-xs text-gray-300 border border-white/10"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="px-3 py-1.5 bg-white/5 rounded-full text-xs text-gray-500 border border-white/10">
                        {t.projectsPage.noTags}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-yellow-500" />
                        {project.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        {project.forks_count}
                      </span>
                    </div>
                    <motion.a
                      href={project.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary-400 text-sm font-medium"
                      whileHover={{ x: 5 }}
                    >
                      {t.projectsPage.viewDetails}
                      <ArrowRight className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-500 text-lg">{t.projectsPage.noProjectsFound}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default ProjectsPage;