import { motion } from "framer-motion";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { useTranslation } from "../i18n/useTranslation";

const posts = [
  {
    title: "Getting Started with React 18",
    excerpt: "This article introduces the new features and core concepts of React 18, suitable for frontend beginners.",
    date: "2024-01-15",
    tag: "React",
    readTime: "8 min",
  },
  {
    title: "TypeScript Type Gymnastics",
    excerpt: "Deep dive into TypeScript type system, master advanced type techniques to improve code quality.",
    date: "2024-01-10",
    tag: "TypeScript",
    readTime: "12 min",
  },
  {
    title: "Tailwind CSS Best Practices",
    excerpt: "Share tips and project configuration experience for efficient development with Tailwind CSS.",
    date: "2024-01-05",
    tag: "CSS",
    readTime: "6 min",
  },
];

function Blog() {
  const { t } = useTranslation();

  return (
    <section id="blog" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group glass-card rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-primary-500/20 rounded-full text-sm text-primary-400">
                  {post.tag}
                </span>
                <span className="text-gray-500 text-sm flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-gradient transition-all">
                {post.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {post.readTime}
                </span>
                <span className="text-primary-400 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  {t.blog.readMore}
                  <ArrowRight className="w-4 h-4" />
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
          className="text-center mt-12"
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-primary rounded-xl text-white font-bold hover:shadow-lg hover:shadow-primary-500/30 transition-all"
            whileHover={{ scale: 1.05 }}
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