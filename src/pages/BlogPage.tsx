import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Search, Filter } from "lucide-react";
import { useTranslation } from "../i18n/useTranslation";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BlogPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const allTags = [...new Set(t.blog.articleList.map((a) => a.tag))];

  const filteredArticles = t.blog.articleList.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || article.tag === selectedTag;
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
            {t.blog.subtitle}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mt-4">
            {t.blog.title}
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
              placeholder="Search articles..."
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
              All
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group glass-card rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/blog/${article.title.toLowerCase().replace(/\s+/g, "-")}`)}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1.5 bg-primary-500/20 rounded-full text-xs font-medium text-primary-400">
                  {article.tag}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gradient transition-all line-clamp-2">
                {article.title}
              </h3>
              <p className="text-primary-400 text-xs mb-3">{article.subtitle}</p>

              <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                {article.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-3 text-gray-500 text-xs">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {article.date.split("-").slice(1).join("/")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>
                <span className="text-primary-400 text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
                  {t.blog.readMore}
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <motion.button
            className="px-8 py-4 bg-gradient-primary rounded-xl text-white font-bold hover:shadow-lg hover:shadow-primary-500/30 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Load More Articles
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default BlogPage;