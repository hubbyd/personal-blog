import { motion } from "framer-motion";
import { Calendar, ArrowRight, Globe, Clock } from "lucide-react";
import { useTranslation } from "../i18n/useTranslation";

function Blog() {
  const { t } = useTranslation();

  return (
    <section id="blog" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 font-medium tracking-wider text-sm uppercase">{t.blog.subtitle}</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4">{t.blog.title}</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mt-6 rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-12 flex-wrap"
        >
          <Globe className="w-5 h-5 text-accent-400" />
          <span className="text-gray-400 text-sm">Supported Languages:</span>
          <div className="flex flex-wrap gap-2">
            {t.blog.languages.map((lang, index) => (
              <motion.span
                key={lang}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="px-4 py-2 bg-white/5 rounded-full text-sm text-gray-300 border border-white/10 hover:bg-white/10 transition-colors"
              >
                {lang}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.blog.articleList.map((article, index) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group glass-card rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary-500/10"
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-primary rounded-xl text-white font-bold hover:shadow-lg hover:shadow-primary-500/30 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t.blog.viewAll}
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default Blog;