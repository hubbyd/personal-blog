import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from "lucide-react";
import { useTranslation } from "../i18n/useTranslation";
import { useNavigate, useParams } from "react-router-dom";

function BlogDetail() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { articleId } = useParams<{ articleId: string }>();
  
  const article = t.blog.articleList.find(
    (a) => a.title.toLowerCase().replace(/\s+/g, "-") === articleId
  );

  if (!article) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Article Not Found</h2>
          <button
            onClick={() => navigate("/blog")}
            className="px-6 py-3 bg-gradient-primary rounded-xl text-white font-medium"
          >
            Back to Blog
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button
          onClick={() => navigate("/blog")}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Articles
        </motion.button>

        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-8 md:p-12"
        >
          <div className="mb-8">
            <span className="px-4 py-2 bg-primary-500/20 rounded-full text-sm text-primary-400 font-medium mb-4 inline-block">
              {article.tag}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {article.title}
            </h1>
            <p className="text-primary-400 text-lg mb-6">{article.subtitle}</p>
          </div>

          <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-500">
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {article.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {article.readTime} read
            </span>
            <span className="flex items-center gap-2">
              <Tag className="w-5 h-5" />
              {article.tag}
            </span>
            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors ml-auto">
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="text-gray-400 leading-relaxed text-lg mb-6">
              {article.description}
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              This article dives deep into the concepts and practical applications of {article.tag}.
              We'll explore core principles, best practices, and real-world examples that will help
              you become proficient in this area.
            </p>

            <h3 className="text-xl font-semibold text-white mb-4">Key Concepts</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 text-gray-400">
                <span className="w-6 h-6 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center flex-shrink-0 text-sm">1</span>
                <span>Understanding the fundamental concepts and architecture</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <span className="w-6 h-6 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center flex-shrink-0 text-sm">2</span>
                <span>Implementing best practices for optimal performance</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <span className="w-6 h-6 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center flex-shrink-0 text-sm">3</span>
                <span>Building scalable and maintainable applications</span>
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-4">Code Example</h3>
            <div className="bg-black/40 rounded-xl p-4 mb-6 overflow-x-auto">
              <pre className="text-sm text-gray-300">
                <code>{`// Sample ${article.tag} code
const example = () => {
  const result = processData();
  return result;
};

export default example;`}</code>
              </pre>
            </div>

            <h3 className="text-xl font-semibold text-white mb-4">Conclusion</h3>
            <p className="text-gray-400 leading-relaxed">
              By applying these concepts and techniques, you'll be able to build better applications
              and improve your skills as a developer. Remember to keep learning and experimenting
              with new approaches.
            </p>
          </div>
        </motion.article>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 glass-card rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Related Articles</h3>
          <div className="space-y-3">
            {t.blog.articleList
              .filter((a) => a.tag !== article.tag)
              .slice(0, 3)
              .map((related) => (
                <a
                  key={related.title}
                  href={`/blog/${related.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <span className="px-3 py-1 bg-primary-500/20 rounded-full text-xs text-primary-400">
                    {related.tag}
                  </span>
                  <span className="text-gray-300 hover:text-white transition-colors">
                    {related.title}
                  </span>
                </a>
              ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default BlogDetail;